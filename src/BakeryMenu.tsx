import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockDb } from './lib/mockDb';
import { useBakeryCms } from './lib/bakeryCmsData';

// Export the master 49-item menu data so it can be passed in if needed, but it lives here.
// Note: Categories and items are now augmented by CMS data
export const MENU_CATEGORIES = [
  { label: 'Boulangerie', image: '/images/bakery/Boulangerie_product_close_up_de108d29aa.jpeg' },
  { label: 'Pastries', image: '/images/bakery/Appealing_picture_dessert_food_67df004999.jpeg' },
  { label: 'Desserts', image: '/images/bakery/Picture_of_common_dessert_food_9aab2f82a8.jpeg' },
  { label: 'Travel Cakes', image: '/images/bakery/Cake_on_table_31e8013ade.jpeg' },
  { label: 'Savory', image: '/images/bakery/Traiteur_meal_food_magazine_d0224eb0a2.jpeg' },
  { label: 'Confections', image: 'https://images.unsplash.com/photo-1548907040-4baa42d100c9?auto=format&fit=crop&q=80&w=800' },
  { label: 'Beverages', image: '/images/bakery/Beverages_at_bakery_shop_429375363e.jpeg' }
];

const ADS = [
  {
    title: "Sourdough Secrets",
    subtitle: "Jos Wild Yeast, 48hr Fermentation.",
    cta: "Order Now",
    img: "/images/bakery/Boulangerie_product_close_up_de108d29aa.jpeg"
  },
  {
    title: "Croissant Gold",
    subtitle: "27 Layers of French Butter Mastery.",
    cta: "View Selection",
    img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=1600"
  },
  {
    title: "Artisan Desserts",
    subtitle: "Delicate creations for the discerning palette.",
    cta: "Explore More",
    img: "/images/bakery/Cake_on_table_31e8013ade.jpeg"
  },
  {
    title: "Savory Delights",
    subtitle: "Hand-crafted meat pies and savory treats.",
    cta: "View Menu",
    img: "/images/bakery/Meatpie_on_a_plate_fd64cb4d02.jpeg"
  },
  {
    title: "Fresh Beverages",
    subtitle: "The perfect pairing for your morning pastry.",
    cta: "Explore Drinks",
    img: "/images/bakery/Beverages_at_bakery_shop_429375363e.jpeg"
  },
  {
    title: "Artisan Fruit Tarts",
    subtitle: "Bursting with seasonal freshness and buttery crust.",
    cta: "Taste Today",
    img: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=1600"
  },
  {
    title: "The Macaron Box",
    subtitle: "Pure Parisian elegance in every bite.",
    cta: "Order Gift Box",
    img: "https://images.unsplash.com/photo-1558364379-3c734b41a7d6?auto=format&fit=crop&q=80&w=1600"
  },
  {
    title: "Baguette Tradition",
    subtitle: "Baked fresh every morning with French flour.",
    cta: "Shop Boulangerie",
    img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1600"
  }
];

export const MASTER_BAKERY_MENU = [
  // --- 1. BOULANGERIE (Artisan Breads) ---
  {
    title: "Rustic Sourdough", category: "Boulangerie", price: "₦8,000",
    desc: "Fermented for 48 hours. A thick, caramelized crust with a soft, airy crumb.",
    ingredients: "Wild Yeast Starter (Jos), Rye Flour, Whole Wheat",
    tags: ["Vegan", "Signature"]
  },
  {
    title: "French Baguette", category: "Boulangerie", price: "₦3,000",
    desc: "Traditional long thin loaf with a crisp crust and chewy texture. Baked twice daily.",
    ingredients: "Wheat Flour, Water, Sea Salt, Yeast",
    tags: ["Vegan", "Classic"]
  },
  {
    title: "Olive & Herb Ciabatta", category: "Boulangerie", price: "₦6,500",
    desc: "Airy Italian slipper bread studded with Kalamata olives and fresh rosemary.",
    ingredients: "Wheat Flour, Kalamata Olives, Extra Virgin Olive Oil",
    tags: ["Savory", "Vegan"]
  },
  {
    title: "Multigrain Seed Loaf", category: "Boulangerie", price: "₦9,000",
    desc: "Dense, nutty loaf packed with flax, sunflower, and pumpkin seeds.",
    ingredients: "Whole Wheat, 7-Grain Mix, Honey, Molasses",
    tags: ["Healthy"]
  },
  {
    title: "Roasted Garlic Focaccia", category: "Boulangerie", price: "₦5,500",
    desc: "High-hydration Italian flatbread dimpled with olive oil and sweet confit garlic.",
    ingredients: "Flour, Confit Garlic, Olive Oil, Sea Salt",
    tags: ["Vegan"]
  },
  {
    title: "NYC Sesame Bagel", category: "Boulangerie", price: "₦3,500",
    desc: "Boiled in honey water then baked. Chewy exterior, soft interior.",
    ingredients: "Malted Barley Flour, Sesame Seeds, Honey Water",
    tags: ["Classic"]
  },
  {
    title: "Dark Rye Pumpernickel", category: "Boulangerie", price: "₦7,500",
    desc: "Deep, earthy, and slightly sweet traditional German-style loaf.",
    ingredients: "Rye Flour, Molasses, Cocoa Powder, Caraway",
    tags: ["Heritage"]
  },

  // --- 2. PASTRIES (Viennoiserie) ---
  {
    title: "Butter Croissant", category: "Pastries", price: "₦4,500",
    desc: "27 layers of pure bliss. Baked fresh every 2 hours to ensure maximum flake.",
    ingredients: "High-fat French Butter, Organic Wheat Flour",
    tags: ["Signature"]
  },
  {
    title: "Pain au Chocolat", category: "Pastries", price: "₦4,750",
    desc: "Flaky croissant dough wrapped around two batons of 70% dark chocolate.",
    ingredients: "Butter, Flour, Valrhona Dark Chocolate",
    tags: ["Classic"]
  },
  {
    title: "Kouign-Amann", category: "Pastries", price: "₦5,500",
    desc: "The crown jewel of Brittany. Caramelized, buttery dough with a crunchy sugar crust.",
    ingredients: "Salted Butter, Sugar, Laminated Dough",
    tags: ["Sweet", "Signature"]
  },
  {
    title: "Almond Croissant", category: "Pastries", price: "₦5,500",
    desc: "Twice-baked croissant filled with rich almond frangipane and topped with flaked almonds.",
    ingredients: "Almond Cream, Day-old Croissant, Rum Syrup",
    tags: ["Rich"]
  },
  {
    title: "Sticky Cinnamon Roll", category: "Pastries", price: "₦5,000",
    desc: "Gooey center, crispy edges. Spiced with Ceylon cinnamon and cardamom.",
    ingredients: "Ceylon Cinnamon, Brown Sugar, Cream Cheese Frosting",
    tags: ["Comfort"]
  },
  {
    title: "Pain aux Raisins", category: "Pastries", price: "₦4,800",
    desc: "Spiral pastry filled with vanilla custard and rum-soaked raisins.",
    ingredients: "Laminated Dough, Crème Pâtissière, Raisins",
    tags: ["Classic"]
  },
  {
    title: "Cruffin (Vanilla Bean)", category: "Pastries", price: "₦6,000",
    desc: "A croissant baked in a muffin tin, piped full of Madagascar vanilla cream.",
    ingredients: "Croissant Dough, Vanilla Custard, Sugar Dusting",
    tags: ["Modern"]
  },
  // --- 3. DESSERTS (Pâtisserie Fine) ---
  {
    title: "Forest Berry Tart", category: "Desserts", price: "₦6,500",
    desc: "A sweet almond crust filled with vanilla custard and topped with seasonal berries.",
    ingredients: "Vanilla Bean Custard, Berries, Almond Flour Crust",
    tags: ["Fresh"]
  },
  {
    title: "Vanilla Mille-feuille", category: "Desserts", price: "₦8,500",
    desc: "Three layers of caramelized puff pastry layered with whipped mascarpone cream.",
    ingredients: "Puff Pastry, Mascarpone, Vanilla Bean",
    tags: ["Signature"]
  },
  {
    title: "Dark Chocolate & Gold Éclair", category: "Desserts", price: "₦7,000",
    desc: "Choux pastry filled with 70% chocolate crémeux, finished with edible gold leaf.",
    ingredients: "Choux, Valrhona Chocolate, Gold leaf",
    tags: ["Decadent"]
  },
  {
    title: "Lemon Meringue Tartlet", category: "Desserts", price: "₦6,000",
    desc: "Sharp, punchy lemon curd topped with beautifully toasted Italian meringue.",
    ingredients: "Lemon Juice, Butter, Eggs, Sugar",
    tags: ["Citrus"]
  },
  {
    title: "Paris-Brest", category: "Desserts", price: "₦8,000",
    desc: "A ring of choux pastry filled with rich, nutty praline mousseline cream.",
    ingredients: "Choux Pastry, Hazelnut Praline, Almonds",
    tags: ["Nutty"]
  },
  {
    title: "Raspberry Macaron Ispahan", category: "Desserts", price: "₦9,000",
    desc: "Oversized macaron filled with rose petal cream, lychee, and fresh raspberries.",
    ingredients: "Almond Flour, Rose Water, Lychee, Raspberries",
    tags: ["Floral", "Gluten-Free"]
  },
  {
    title: "Opera Cake Slice", category: "Desserts", price: "₦7,500",
    desc: "Layers of almond sponge soaked in espresso, espresso buttercream, and chocolate ganache.",
    ingredients: "Joconde Sponge, Coffee Syrup, Chocolate Ganache",
    tags: ["Coffee"]
  },

  // --- 4. TRAVEL CAKES (Gâteaux de Voyage) ---
  {
    title: "Brown Butter Financiers", category: "Travel Cakes", price: "₦4,000",
    desc: "Delicate almond cakes baked with nutty beurre noisette and a hint of orange blossom.",
    ingredients: "Brown Butter, Almond Flour, Egg Whites",
    tags: ["Nutty"]
  },
  {
    title: "Lemon Glazed Madeleine (3pcs)", category: "Travel Cakes", price: "₦3,500",
    desc: "Classic French shell-shaped sponge cakes with a zesty lemon glaze.",
    ingredients: "Butter, Flour, Eggs, Lemon Zest",
    tags: ["Classic"]
  },
  {
    title: "Double Chocolate Brownie", category: "Travel Cakes", price: "₦4,500",
    desc: "Fudgy, dense, and intensely chocolatey, made with 70% cocoa and sea salt.",
    ingredients: "Dark Chocolate, Butter, Sugar, Sea Salt Flakes",
    tags: ["Rich"]
  },
  {
    title: "Marble Pound Cake Slice", category: "Travel Cakes", price: "₦3,500",
    desc: "A buttery, tender crumb perfectly swirling vanilla and dark chocolate batters.",
    ingredients: "Butter, Sugar, Vanilla, Cocoa Powder",
    tags: ["Comfort"]
  },
  {
    title: "Pistachio Rose Loaf", category: "Travel Cakes", price: "₦5,000",
    desc: "Moist pistachio cake drizzled with a striking pink rose-water icing.",
    ingredients: "Ground Pistachios, Rose Water, Flour, Eggs",
    tags: ["Nutty", "Floral"]
  },
  {
    title: "Banana Walnut Bread", category: "Travel Cakes", price: "₦4,000",
    desc: "Caramelized overripe bananas and toasted walnuts in a beautifully moist loaf.",
    ingredients: "Bananas, Walnuts, Brown Sugar",
    tags: ["Comfort"]
  },
  {
    title: "Carrot Cake & Pecan Slice", category: "Travel Cakes", price: "₦5,500",
    desc: "Spiced carrot sponge loaded with pecans and topped with cream cheese frosting.",
    ingredients: "Carrots, Pecans, Cinnamon, Cream Cheese",
    tags: ["Spiced"]
  },

  // --- 5. SAVORY (Traiteur) ---
  {
    title: "Spinach Feta Danish", category: "Savory", price: "₦5,500",
    desc: "Savory puff pastry filled with creamy sautéed spinach and tangy feta cheese.",
    ingredients: "Puff Pastry, Spinach, Feta, Garlic",
    tags: ["Vegetarian"]
  },
  {
    title: "Truffled Mushroom Tart", category: "Savory", price: "₦6,500",
    desc: "A savory masterpiece featuring wild mushrooms, gruyère, and white truffle oil.",
    ingredients: "Wild Mushrooms, Gruyère, Truffle Oil, Shortcrust",
    tags: ["Umami", "Vegetarian"]
  },
  {
    title: "Quiche Lorraine", category: "Savory", price: "₦6,000",
    desc: "Classic French tart with smoked bacon, creamy egg custard, and gruyère cheese.",
    ingredients: "Bacon, Eggs, Cream, Gruyère",
    tags: ["Classic"]
  },
  {
    title: "Artisan Sausage Roll", category: "Savory", price: "₦4,500",
    desc: "Herbed pork sausage wrapped in golden, flaky, butter-rich puff pastry.",
    ingredients: "Pork Sausage, Fennel, Puff Pastry",
    tags: ["Hearty"]
  },
  {
    title: "Ham & Cheese Croissant", category: "Savory", price: "₦5,500",
    desc: "Our signature croissant baked with artisanal ham and melted swiss cheese.",
    ingredients: "Croissant Dough, Smoked Ham, Swiss Cheese",
    tags: ["Breakfast"]
  },
  {
    title: "Tomato & Basil Galette", category: "Savory", price: "₦5,000",
    desc: "Free-form rustic tart with heirloom tomatoes, fresh basil, and goat cheese.",
    ingredients: "Heirloom Tomatoes, Goat Cheese, Basil, Pastry",
    tags: ["Vegetarian", "Fresh"]
  },
  {
    title: "Spicy Beef Empanada", category: "Savory", price: "₦4,000",
    desc: "Flaky pastry pocket stuffed with spiced minced beef, onions, and bells.",
    ingredients: "Minced Beef, Spices, Shortcrust Pastry",
    tags: ["Spicy", "Hearty"]
  },

  // --- 6. CONFECTIONS (Confiserie) ---
  {
    title: "Artisan Truffle Box (6pcs)", category: "Confections", price: "₦12,000",
    desc: "Hand-rolled dark chocolate truffles dusted with premium cocoa powder.",
    ingredients: "Dark Chocolate Ganache, Cocoa Powder",
    tags: ["Gift", "Gluten-Free"]
  },
  {
    title: "Salted Caramel Jars", category: "Confections", price: "₦5,000",
    desc: "Rich, deeply caramelized sugar blended with cream and sea salt flakes.",
    ingredients: "Sugar, Heavy Cream, Butter, Sea Salt",
    tags: ["Sweet"]
  },
  {
    title: "Pistachio Nougat", category: "Confections", price: "₦6,500",
    desc: "Soft French-style Montélimar nougat studded with roasted pistachios and honey.",
    ingredients: "Honey, Egg Whites, Sugar, Pistachios",
    tags: ["Chewy", "Gluten-Free"]
  },
  {
    title: "Raspberry Pâte de Fruits", category: "Confections", price: "₦4,500",
    desc: "Intense, jewel-like fruit jellies made from 100% natural raspberry purée.",
    ingredients: "Raspberry Purée, Sugar, Pectin",
    tags: ["Fruity", "Vegan"]
  },
  {
    title: "Chocolate Bark (Almond & Sea Salt)", category: "Confections", price: "₦7,000",
    desc: "Shattered pieces of tempered 70% dark chocolate packed with roasted almonds.",
    ingredients: "Dark Chocolate, Toasted Almonds, Sea Salt",
    tags: ["Crunchy", "Gluten-Free"]
  },
  {
    title: "Vanilla Bean Marshmallows", category: "Confections", price: "₦3,500",
    desc: "Pillowy, light-as-air homemade marshmallows flecked with real vanilla bean.",
    ingredients: "Sugar, Gelatin, Vanilla Bean Paste",
    tags: ["Light", "Gluten-Free"]
  },
  {
    title: "Hazelnut Praline Spread", category: "Confections", price: "₦8,500",
    desc: "Our luxurious, house-made alternative to commercial hazelnut spreads.",
    ingredients: "Roasted Hazelnuts, Milk Chocolate, Vanilla",
    tags: ["Rich", "Gluten-Free"]
  },

  // --- 7. BEVERAGES (Pairings) ---
  {
    title: "Single Origin Espresso", category: "Beverages", price: "₦2,500",
    desc: "A double shot of our bright, complex African blend. Perfect with sourdough.",
    ingredients: "100% Arabica Coffee Beans",
    tags: ["Hot", "Vegan"]
  },
  {
    title: "Ceremonial Matcha Latte", category: "Beverages", price: "₦4,500",
    desc: "Vibrant, earthy green tea whisked with perfectly steamed milk.",
    ingredients: "Ceremonial Grade Matcha, Milk / Oat Milk",
    tags: ["Hot", "Earthy"]
  },
  {
    title: "Nitro Cold Brew", category: "Beverages", price: "₦3,500",
    desc: "Steeped for 24 hours and infused with nitrogen for a creamy, stout-like head.",
    ingredients: "Cold Brew Coffee, Nitrogen",
    tags: ["Cold", "Vegan"]
  },
  {
    title: "Valrhona Hot Chocolate", category: "Beverages", price: "₦5,000",
    desc: "Incredibly thick, Parisian-style hot chocolate that coats the spoon.",
    ingredients: "Dark Chocolate, Whole Milk, Heavy Cream",
    tags: ["Hot", "Decadent"]
  },
  {
    title: "Fresh Squeezed Orange Juice", category: "Beverages", price: "₦3,000",
    desc: "Cold-pressed daily from locally sourced Nigerian sweet oranges.",
    ingredients: "100% Orange Juice",
    tags: ["Cold", "Vegan", "Fresh"]
  },
  {
    title: "Earl Grey Tea", category: "Beverages", price: "₦2,500",
    desc: "Premium loose-leaf black tea fragranced with bright bergamot oil.",
    ingredients: "Black Tea, Bergamot Oil",
    tags: ["Hot", "Vegan", "Floral"]
  },
  {
    title: "Iced Hibiscus Tea (Zobo)", category: "Beverages", price: "₦2,000",
    desc: "Our refined, unsweetened take on the local classic, infused with clove and ginger.",
    ingredients: "Hibiscus Leaves, Ginger, Clove",
    tags: ["Cold", "Vegan", "Local"]
  }
];

export const BakeryMenu: React.FC<{ setCurrentView?: (v: any) => void; currentUser?: any }> = ({ setCurrentView, currentUser }) => {
  const { data: bakeryData } = useBakeryCms();
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedQty, setSelectedQty] = useState(1);

  // Pull 100% of data from CMS Inventory
  const fullMenu = [
    ...bakeryData.inventory.map(item => ({
      title: item.name,
      category: item.category,
      price: `₦${item.price.toLocaleString()}`,
      desc: item.description || item.desc || "Artisanal perfection",
      ingredients: item.ingredients || "Hand-selected ingredients",
      tags: [item.stock > 0 ? "In Stock" : "Sold Out", item.category],
      image: item.image
    }))
  ];

  const handleAddToCart = (product: any, qty: number = 1) => {
    mockDb.addToCart({
      id: product.title,
      name: product.title,
      price: parseInt(product.price.replace(/[^0-9]/g, '')),
      quantity: qty,
      category: product.category
    });
  };

  // Filter logic
  const filteredMenu = fullMenu.filter(item => {
    const matchesCategory = activeCategories.length === 0 || activeCategories.includes(item.category);
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.desc && item.desc.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleCategory = (cat: string) => {
    if (cat === 'All') {
      setActiveCategories([]);
      return;
    }
    setActiveCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="bakery-theme bg-[var(--bakery-bg)] min-h-screen text-[var(--bakery-text)] font-sans sm:pb-24 pt-0">

      {/* 1. HERO AD SLIDER (Responsive Height) */}
      <div className="h-[60vh] sm:h-[75vh] lg:h-[90vh] w-full relative overflow-hidden bg-black">
        <HeroSlider ads={ADS} />
      </div>

      {/* 2. CATEGORY TICKER (Variable-based Stacking) */}
      <div
        className="hidden sm:flex h-[280px] lg:h-[400px] 2xl:h-[500px] 3xl:h-[650px] w-full bg-[#1a1c20] relative flex-col border-y border-white/5 overflow-hidden sticky z-20 pause-on-hover transition-all duration-500"
        style={{
          top: 'calc(var(--bakery-nav-height) - (var(--ticker-height, 400px) - var(--bakery-ticker-label-height)))'
        } as React.CSSProperties}
      >
        {/* Set ticker height variable locally for calc */}
        <style dangerouslySetInnerHTML={{
          __html: `
          @media (min-width: 640px) { :root { --ticker-height: 280px; } }
          @media (min-width: 1024px) { :root { --ticker-height: 400px; } }
          @media (min-width: 1536px) { :root { --ticker-height: 500px; } }
          @media (min-width: 2500px) { :root { --ticker-height: 650px; } }
        `}} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none z-10" />
        <div className="flex-1 flex items-stretch relative overflow-hidden">
          <div className="flex gap-0 animate-marquee">
            {/* Triple the items for seamless CSS loop */}
            {[...Array(3)].map((_, i) => (
              <React.Fragment key={i}>
                {MENU_CATEGORIES.map(catItem => (
                  <CategoryTickerItem
                    key={catItem.label + i}
                    label={catItem.label}
                    image={catItem.image}
                    isSelected={activeCategories.includes(catItem.label)}
                    onClick={() => toggleCategory(catItem.label)}
                  />
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* 3. DIGITAL MENU / FILTER BAR (Dynamic Stacking) */}
      <div
        className="bg-[var(--bakery-card-bg)] border-b border-[var(--bakery-card-border)] sticky z-30 shadow-sm transition-all duration-300"
        style={{ top: 'calc(var(--bakery-nav-height) + var(--bakery-ticker-label-height))' }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-12 py-0.5 sm:py-0.5 3xl:py-1">
          {/* Mobile-Only Category Filter Chips */}
          <div className="flex sm:hidden overflow-x-auto no-scrollbar gap-2 mb-4 pb-2 border-b border-white/5">
            {MENU_CATEGORIES.map(catItem => (
              <button
                key={catItem.label}
                onClick={() => toggleCategory(catItem.label)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeCategories.includes(catItem.label)
                  ? 'bg-[var(--bakery-primary)] text-black'
                  : 'bg-white/5 text-[var(--bakery-text-muted)] border border-white/10'
                  }`}
              >
                {catItem.label}
              </button>
            ))}
          </div>

          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex items-center gap-6 overflow-hidden">
              <div className="flex items-center gap-3">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[var(--bakery-text-muted)] whitespace-nowrap">
                  {activeCategories.length} Filters Active
                </span>
                {activeCategories.length > 0 && (
                  <button onClick={() => setActiveCategories([])} className="text-xs font-black uppercase tracking-widest text-red-500 hover:text-red-400 px-2 transition-colors">Clear</button>
                )}
              </div>
              <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
                {activeCategories.length === 0 ? (
                  <span className="text-xs uppercase font-black tracking-widest text-[var(--bakery-text-muted)] italic">No active filters</span>
                ) : (
                  activeCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className="whitespace-nowrap flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--bakery-primary)]/10 border border-[var(--bakery-primary)]/20 text-[var(--bakery-text)] text-[10px] font-black uppercase tracking-widest shadow-sm transition-all group hover:bg-[var(--bakery-primary)]/20"
                    >
                      {cat}
                      <span className="material-icons text-[12px] border-l border-[var(--bakery-primary)]/20 pl-2 group-hover:scale-125 transition-transform">close</span>
                    </button>
                  ))
                )}
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex items-center gap-4">
                <div className="relative flex items-center">
                  <AnimatePresence>
                    {isSearchExpanded && (
                      <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 'clamp(200px, 25vw, 600px)', opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <input
                          autoFocus type="text" placeholder="Search products..."
                          value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                          onBlur={() => !searchQuery && setIsSearchExpanded(false)}
                          className="w-full bg-[var(--bakery-bg-soft)] border-none rounded-xl pl-4 pr-10 py-1.5 sm:py-2 3xl:py-4 text-xs sm:text-sm 3xl:text-3xl outline-none focus:ring-2 focus:ring-[var(--bakery-primary)]/50 transition-all text-[var(--bakery-text)]"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <button onClick={() => setIsSearchExpanded(!isSearchExpanded)} className={`p-3 rounded-full hover:bg-[var(--bakery-bg-soft)] transition-colors ${isSearchExpanded ? 'text-[var(--bakery-primary)]' : 'text-[var(--bakery-text-muted)]'}`}>
                    <span className="material-icons text-base">{isSearchExpanded ? 'close' : 'search'}</span>
                  </button>
                </div>
              </div>
              <div className="hidden lg:block text-right flex-shrink-0">
                <h1 className="font-['Dancing_Script',_cursive] text-2xl sm:text-4xl 3xl:text-7xl font-bold capitalize text-[var(--bakery-primary)] leading-none tracking-wide">Digital Menu</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. MAIN MENU SECTION (Natural Document Flow) */}
      <div className={`w-full py-5 sm:py-8 flex justify-center transition-all duration-500 ${selectedProduct ? 'px-6 lg:px-24 xl:px-32' : 'px-8 lg:px-32 xl:px-56'}`}>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 xl:gap-14 w-full max-w-[1800px] justify-center items-start transition-all duration-500 relative">

          {/* Product Grid Zone (Fluid & Scaling) */}
          <div className="flex-1 w-full min-w-0 transition-all duration-500">
            {filteredMenu.length === 0 ? (
              <div className="text-center py-20">
                <span className="material-icons text-4xl text-[var(--bakery-text-muted)] mb-4">search_off</span>
                <p className="text-lg font-bold">No items found</p>
                <button onClick={() => { setSearchQuery(''); setActiveCategories([]); }} className="mt-6 text-[var(--bakery-primary)] text-sm font-bold uppercase tracking-widest hover:underline">Clear Filters</button>
              </div>
            ) : (
              <div className={`grid grid-cols-2 gap-3 sm:gap-6 pb-20 transition-all duration-500 ${selectedProduct ? 'lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-4' : 'lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-5'
                }`}>
                <AnimatePresence mode="popLayout">
                  {filteredMenu.map((item, idx) => (
                    <motion.div
                      layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }}
                      key={item.title + idx} onClick={() => { setSelectedProduct(item); setSelectedQty(1); }}
                      className="bg-[var(--bakery-card-bg)] rounded-2xl border border-[var(--bakery-card-border)] flex flex-col group hover:border-[var(--bakery-primary)]/30 transition-all cursor-pointer shadow-sm hover:shadow-xl overflow-hidden"
                    >
                      <div className="flex-1 min-h-[140px] sm:min-h-[220px] 3xl:min-h-[400px] overflow-hidden bg-stone-100">
                        <img src={item.image || `https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=400`} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="p-3 sm:p-4 3xl:p-8 shrink-0 flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-1 sm:mb-3 gap-2">
                          <h3 className="font-serif text-[10px] sm:text-lg 3xl:text-5xl font-bold text-[var(--bakery-heading)] leading-tight">{item.title}</h3>
                          <span className="shrink-0 font-sans text-[10px] sm:text-sm 3xl:text-4xl font-bold text-[var(--bakery-primary)]">{item.price}</span>
                        </div>
                        <p className="text-[9px] sm:text-sm 3xl:text-3xl text-[var(--bakery-text-muted)] mt-1 mb-2 sm:mb-3 line-clamp-2 leading-relaxed">{item.desc}</p>
                        <div className="flex items-center justify-between pt-2 sm:pt-4 border-t border-[var(--bakery-card-border)]">
                          <span className="px-1.5 py-0.5 rounded bg-[var(--bakery-bg-soft)] text-[6px] sm:text-[8px] 3xl:text-xl font-black uppercase tracking-wider text-[var(--bakery-text-muted)]">{item.tags?.[0] || 'Gourmet'}</span>
                          <button onClick={(e) => { e.stopPropagation(); handleAddToCart(item); }} className="w-5 h-5 sm:w-8 sm:h-8 3xl:w-16 3xl:h-16 rounded-sm bg-[var(--bakery-bg-soft)] flex items-center justify-center hover:bg-[var(--bakery-primary)] hover:text-white transition-colors"><span className="material-icons text-[9px] sm:text-sm 3xl:text-3xl">add</span></button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Panel Zone */}
          <AnimatePresence>
            {selectedProduct && (
              <motion.div
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ type: 'spring', damping: 30, stiffness: 200 }}
                className="hidden lg:flex flex-col w-[320px] xl:w-[384px] 2xl:w-[480px] 3xl:w-[800px] flex-shrink-0 sticky top-[calc(var(--bakery-nav-height)+var(--bakery-ticker-label-height)+70px)] h-[calc(100vh-var(--bakery-nav-height)-var(--bakery-ticker-label-height)-100px)] bg-[var(--bakery-card-bg)] border border-[var(--bakery-card-border)] shadow-2xl overflow-hidden rounded-3xl transition-all"
                data-lenis-prevent
              >
                <div className="flex-1 overflow-y-auto no-scrollbar">
                  <div className="relative">
                    <button onClick={() => setSelectedProduct(null)} className="absolute top-4 left-4 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center z-10 backdrop-blur-md transition-colors hover:bg-black/60"><span className="material-icons text-sm">close</span></button>
                    <img src={selectedProduct.image} className="w-full aspect-square object-cover" />
                    <div className="p-6 xl:p-8 pb-10 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h2 className="font-serif text-2xl xl:text-3xl font-bold text-[var(--bakery-heading)] mb-2">{selectedProduct.title}</h2>
                          <div className="flex gap-1.5 flex-wrap">
                            {selectedProduct.tags?.map(tag => (
                              <span key={tag} className="px-2.5 py-0.5 rounded-full border border-[var(--bakery-primary)]/30 bg-[var(--bakery-primary)]/5 text-[9px] font-bold uppercase tracking-widest text-[var(--bakery-primary)]">{tag}</span>
                            ))}
                          </div>
                        </div>
                        <span className="text-xl xl:text-2xl font-black text-[var(--bakery-primary)]">{selectedProduct.price}</span>
                      </div>

                      <p className="text-[var(--bakery-text-muted)] text-base lg:text-lg leading-[1.8] mb-8 font-light">{selectedProduct.desc}</p>

                      <div className="mt-auto">
                        <div className="border-y border-white/10 py-5 mb-8 flex flex-col gap-4">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--bakery-text-muted)]">Quantity</span>
                            <div className="flex items-center bg-[var(--bakery-bg-soft)] rounded-full p-1 border border-white/5 shadow-inner">
                              <button onClick={() => setSelectedQty(Math.max(1, selectedQty - 1))} className="w-7 h-7 rounded-full flex items-center justify-center text-[var(--bakery-text-muted)] hover:text-white hover:bg-[var(--bakery-primary)] transition-all">-</button>
                              <span className="w-8 text-center text-sm font-bold">{selectedQty}</span>
                              <button onClick={() => setSelectedQty(selectedQty + 1)} className="w-7 h-7 rounded-full flex items-center justify-center text-[var(--bakery-text-muted)] hover:text-white hover:bg-[var(--bakery-primary)] transition-all">+</button>
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--bakery-text-muted)]">Subtotal</span>
                            <span className="text-lg font-black text-[var(--bakery-text)]">
                              ₦{(parseFloat((selectedProduct.price || '0').replace(/[^0-9]/g, '')) * selectedQty).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <button onClick={() => { handleAddToCart(selectedProduct, selectedQty); setSelectedProduct(null); }} className="w-full bg-[var(--bakery-primary)] hover:bg-white text-black font-bold py-3.5 rounded-full uppercase tracking-[0.15em] text-xs transition-all shadow-lg hover:shadow-xl shadow-[var(--bakery-primary)]/20 active:scale-[0.98]">
                          Add to Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 5. MOBILE FALLBACK */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed inset-x-0 bottom-0 top-0 bg-[var(--bakery-bg)] z-[100] lg:hidden overflow-y-auto">
            <div className="relative min-h-full flex flex-col">
              <button onClick={() => setSelectedProduct(null)} className="absolute top-4 left-4 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center z-10 backdrop-blur-md transition-colors"><span className="material-icons text-sm">close</span></button>
              <img src={selectedProduct.image || 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=400'} className="w-full aspect-square object-cover" />
              <div className="p-6 pb-12 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-[var(--bakery-heading)] mb-2">{selectedProduct.title}</h2>
                    <div className="flex gap-1.5 flex-wrap">
                      {selectedProduct.tags?.map(tag => (
                        <span key={tag} className="px-2.5 py-0.5 rounded-full border border-[var(--bakery-primary)]/30 bg-[var(--bakery-primary)]/5 text-[9px] font-bold uppercase tracking-widest text-[var(--bakery-primary)]">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <span className="text-xl font-black text-[var(--bakery-primary)]">{selectedProduct.price}</span>
                </div>

                <p className="text-[var(--bakery-text-muted)] text-sm leading-[1.8] mb-8 font-light">{selectedProduct.desc}</p>

                <div className="mt-auto">
                  <div className="border-y border-white/10 py-5 mb-8 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--bakery-text-muted)]">Quantity</span>
                      <div className="flex items-center bg-[var(--bakery-bg-soft)] rounded-full p-1 border border-white/5 shadow-inner">
                        <button onClick={() => setSelectedQty(Math.max(1, selectedQty - 1))} className="w-7 h-7 rounded-full flex items-center justify-center text-[var(--bakery-text-muted)] hover:text-white hover:bg-[var(--bakery-primary)] transition-all">-</button>
                        <span className="w-8 text-center text-sm font-bold">{selectedQty}</span>
                        <button onClick={() => setSelectedQty(selectedQty + 1)} className="w-7 h-7 rounded-full flex items-center justify-center text-[var(--bakery-text-muted)] hover:text-white hover:bg-[var(--bakery-primary)] transition-all">+</button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--bakery-text-muted)]">Subtotal</span>
                      <span className="text-lg font-black text-[var(--bakery-text)]">
                        ₦{(parseFloat((selectedProduct.price || '0').replace(/[^0-9]/g, '')) * selectedQty).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button onClick={() => { handleAddToCart(selectedProduct, selectedQty); setSelectedProduct(null); }} className="w-full bg-[var(--bakery-primary)] text-black font-bold py-3.5 rounded-full uppercase tracking-[0.15em] text-xs transition-all shadow-lg active:scale-[0.98]">
                    Add to Order
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


// --------------------------------------------------------------------------------
// NEW COMPONENTS
// --------------------------------------------------------------------------------

function HeroSlider({ ads }: { ads: any[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % ads.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [ads.length]);

  return (
    <div className="w-full h-full relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img src={ads[current].img} alt={ads[current].title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-4 sm:px-6">
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-white text-4xl sm:text-6xl md:text-8xl 3xl:text-[12rem] font-serif font-bold mb-4 sm:mb-6 tracking-tight leading-tight"
            >
              {ads[current].title}
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-white/80 text-sm sm:text-lg md:text-2xl 3xl:text-5xl font-light mb-8 sm:mb-10 max-w-[90%] sm:max-w-2xl 3xl:max-w-5xl"
            >
              {ads[current].subtitle}
            </motion.p>
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="px-6 py-3 sm:px-10 sm:py-4 3xl:px-20 3xl:py-10 bg-[#d4af37] text-black font-black uppercase tracking-[0.2em] rounded-full hover:bg-white transition-all shadow-2xl text-xs sm:text-base 3xl:text-3xl"
            >
              {ads[current].cta}
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {ads.map((_, i) => (
          <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? 'w-10 bg-[#d4af37]' : 'w-2 bg-white/30'}`} />
        ))}
      </div>
    </div>
  );
}

function CategoryTickerItem({ label, image, isSelected, onClick }: { label: string, image: string, isSelected: boolean, onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`relative w-[301.5px] h-full shrink-0 cursor-pointer group transition-all duration-500 ${isSelected ? 'z-20' : 'z-10'}`}
    >
      <div className={`absolute inset-0 transition-all duration-700 overflow-hidden ${isSelected ? 'bg-[var(--bakery-primary)]' : 'bg-[#0f1115] border-r border-white/5'}`}>
        <img
          src={image}
          alt={label}
          className={`w-full h-full object-cover transition-all duration-700 ${isSelected ? 'scale-110 opacity-70' : 'group-hover:scale-110 opacity-100'}`}
        />
        {/* Subtle gradient to ensure text readability without washing out colors */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-500 ${isSelected ? 'opacity-90' : 'opacity-60 group-hover:opacity-40'}`} />
      </div>

      <div className="absolute bottom-0 left-0 w-full px-6 text-left bg-black/60 backdrop-blur-[6px] transition-all z-20 h-[44px] sm:h-[44px] 3xl:h-[100px] flex items-center border-t border-white/10">
        <h4 className={`text-sm sm:text-base 3xl:text-4xl font-sans font-black uppercase tracking-[0.2em] text-white transition-all duration-500 ${isSelected ? 'scale-105 text-[var(--bakery-primary)]' : 'group-hover:translate-x-2'}`}>
          {label}
        </h4>
      </div>

      {/* Selection Glow Indicator */}
      {isSelected && (
        <div className="absolute top-6 right-6 w-5 h-5 rounded-full bg-[var(--bakery-primary)] shadow-[0_0_20px_rgba(212,175,55,0.8)] border-2 border-white animate-pulse" />
      )}

      {/* Decorative Border for Selected Item */}
      {isSelected && (
        <div className="absolute inset-0 border-4 border-[var(--bakery-primary)] pointer-events-none z-30" />
      )}
    </div>
  );
}
