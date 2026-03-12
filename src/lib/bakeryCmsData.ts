import { useState, useEffect } from 'react';
import { supabase } from './supabase';

// Default values for the Bakery CMS (used as fallback or for initial seeding)
export const DEFAULT_BAKERY_CMS = {
  home: {
    heroTitle: "Artisanal Perfection, Daily.",
    heroSubtext: "Experience the finest pastries and sourdough in Plateau State.",
    btn1Text: "Order Fresh Now",
    btn1Link: "/menu",
    heroImage: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop",
    newsHeadline: "🔥 HOT NOW: Fresh batch of Butter Croissants just came out of the oven!",
    cakeOfWeek: {
      name: "Dark Chocolate Truffle Tart",
      desc: "A rich, decadent tart made with 70% single-origin cocoa and an all-butter crust.",
      image: "https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=800&auto=format&fit=crop",
      show: true
    }
  },
  inventory: [],
  orders: [],
  settings: {
    metaTitle: "Orient Bakery | Fresh Artisanal Bread in Jos",
    metaDesc: "Order fresh bread, pastries, and custom cakes from Orient Bakery. Hot from the oven delivery available.",
    holidayPreset: "default",
    goldenHour: false
  }
};

export const cmsApi = {
  getBakeryData: async () => {
    try {
      // 1. Fetch Products
      const { data: products } = await supabase
        .from('bakery_products')
        .select('*')
        .order('created_at', { ascending: false });
      // 2. Fetch Orders (Filtered by division)
      const { data: orders } = await supabase
        .from('unified_orders')
        .select('*')
        .eq('division', 'bakery')
        .order('created_at', { ascending: false });

      // 3. Fetch Settings (Assumes single record for now)
      const { data: settings } = await supabase
        .from('bakery_settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      // 4. Fetch Home Content
      const { data: home } = await supabase
        .from('bakery_home')
        .select('*')
        .limit(1)
        .maybeSingle();

      return {
        home: home ? {
          heroTitle: home.hero_title,
          heroSubtext: home.hero_subtext,
          btn1Text: home.btn1_text,
          btn1Link: home.btn1_link,
          heroImage: home.hero_image,
          newsHeadline: home.news_headline,
          cakeOfWeek: DEFAULT_BAKERY_CMS.home.cakeOfWeek // Keeping cakeOfWeek static for now or can add to schema
        } : DEFAULT_BAKERY_CMS.home,
        inventory: products || [],
        orders: orders?.map(o => ({
          id: o.id.toString(),
          name: o.customer_name,
          items: typeof o.items === 'string' ? o.items : JSON.stringify(o.items),
          total: o.total,
          status: o.status
        })) || [],
        settings: settings ? {
          metaTitle: settings.meta_title,
          metaDesc: settings.meta_desc,
          holidayPreset: settings.holiday_preset,
          goldenHour: settings.golden_hour
        } : DEFAULT_BAKERY_CMS.settings
      };
    } catch (error) {
      console.error('Error fetching bakery data:', error);
      return DEFAULT_BAKERY_CMS;
    }
  },

  saveBakeryData: async (data: any) => {
    try {
      // Save Settings
      await supabase
        .from('bakery_settings')
        .upsert({
          id: '00000000-0000-0000-0000-000000000001', // Fixed ID for single settings record
          meta_title: data.settings.metaTitle,
          meta_desc: data.settings.metaDesc,
          holiday_preset: data.settings.holidayPreset,
          golden_hour: data.settings.goldenHour,
          updated_at: new Date().toISOString()
        });

      // Save Home Content
      await supabase
        .from('bakery_home')
        .upsert({
          id: '00000000-0000-0000-0000-000000000002', // Fixed ID for single home record
          hero_title: data.home.heroTitle,
          hero_subtext: data.home.heroSubtext,
          btn1_text: data.home.btn1Text,
          btn1_link: data.home.btn1Link,
          hero_image: data.home.heroImage,
          news_headline: data.home.newsHeadline,
          updated_at: new Date().toISOString()
        });

      // Note: Individual product edits handle their own upserts in the CMS component,
      // but for a "Save All" approach, we would iterate here or use a RPC.

      // Update Order Statuses if any changed
      for (const order of data.orders) {
        await supabase
          .from('unified_orders')
          .update({ status: order.status })
          .eq('id', order.id);
      }
      
      return true;
    } catch (error) {
      console.error('Error saving bakery data:', error);
      return false;
    }
  },

  updateProduct: async (product: any) => {
    const { data, error } = await supabase
      .from('bakery_products')
      .upsert({
        id: product.id && product.id.length > 20 ? product.id : undefined, // Check if it's a UUID
        name: product.name,
        category: product.category,
        price: product.price,
        stock: product.stock,
        description: product.description,
        ingredients: product.ingredients,
        image: product.image,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

export const useBakeryCms = () => {
  const [data, setData] = useState<any>(DEFAULT_BAKERY_CMS);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    const result = await cmsApi.getBakeryData();
    setData(result);
    setLoading(false);
  };

  useEffect(() => {
    refresh();

    // Subscribe to all relevant tables
    const channel = supabase.channel('bakery_realtime')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'bakery_products' 
      }, refresh)
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'unified_orders',
        filter: "division=eq.bakery"
      }, refresh)
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'bakery_settings' 
      }, refresh)
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'bakery_home' 
      }, refresh)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { data, setData, loading, refresh };
};
