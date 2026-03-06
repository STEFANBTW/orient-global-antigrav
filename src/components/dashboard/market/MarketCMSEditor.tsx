import React, { useState, useEffect } from 'react';
import { cmsApi } from '@/services/cmsApi';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Save, Loader2, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function MarketCMSEditor() {
  const [contentBlocks, setContentBlocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const data = await cmsApi.getDivisionContent('market');
      setContentBlocks(data.blocks || []);
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to fetch content" });
    } finally {
      setLoading(false);
    }
  };

  const updateBlock = async (blockType: string, newPayload: any) => {
    const block = contentBlocks.find(b => b.block_type === blockType);
    if (!block) {
      // Create new block if it doesn't exist
      try {
        await cmsApi.createContentBlock({
          division_id: 'div_market',
          block_type: blockType,
          content_payload: newPayload,
          order_index: 0
        });
        toast({ title: "Success", description: "Content block created" });
        fetchContent();
      } catch (error) {
        toast({ variant: "destructive", title: "Error", description: "Failed to create block" });
      }
    } else {
      // Update existing block
      try {
        await cmsApi.updateContentBlock(block.id, {
          content_payload: newPayload
        });
        toast({ title: "Success", description: "Content updated" });
        fetchContent();
      } catch (error) {
        toast({ variant: "destructive", title: "Error", description: "Failed to update block" });
      }
    }
  };

  const getBlockPayload = (blockType: string, defaultPayload: any) => {
    const block = contentBlocks.find(b => b.block_type === blockType);
    return block ? block.content_payload : defaultPayload;
  };

  // --- Hero Editor ---
  const HeroEditor = () => {
    const defaultPayload = { title: "Freshness\nGuaranteed", subtitle: "Farm Direct", stats: [] };
    const [payload, setPayload] = useState(getBlockPayload('produce_hero', defaultPayload));

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Hero Title</Label>
          <Textarea value={payload.title} onChange={(e) => setPayload({...payload, title: e.target.value})} />
        </div>
        <div className="space-y-2">
          <Label>Subtitle</Label>
          <Input value={payload.subtitle} onChange={(e) => setPayload({...payload, subtitle: e.target.value})} />
        </div>
        <Button onClick={() => updateBlock('produce_hero', payload)}><Save className="w-4 h-4 mr-2" /> Save Hero</Button>
      </div>
    );
  };

  // --- Deals Hero Editor ---
  const DealsHeroEditor = () => {
    const defaultPayload = { title: "FLASH \nDEALS", subtitle: "Up to 70% OFF", tag: "Limited Time Offer" };
    const [payload, setPayload] = useState(getBlockPayload('deals_hero', defaultPayload));

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Title</Label>
          <Textarea value={payload.title} onChange={(e) => setPayload({...payload, title: e.target.value})} />
        </div>
        <div className="space-y-2">
          <Label>Subtitle</Label>
          <Input value={payload.subtitle} onChange={(e) => setPayload({...payload, subtitle: e.target.value})} />
        </div>
        <div className="space-y-2">
          <Label>Tag</Label>
          <Input value={payload.tag} onChange={(e) => setPayload({...payload, tag: e.target.value})} />
        </div>
        <Button onClick={() => updateBlock('deals_hero', payload)}><Save className="w-4 h-4 mr-2" /> Save Deals Hero</Button>
      </div>
    );
  };

  // --- Bestsellers Editor ---
  const BestsellersEditor = () => {
    const defaultPayload = { items: [] };
    const [payload, setPayload] = useState(getBlockPayload('produce_bestsellers', defaultPayload));

    const updateItem = (index: number, field: string, value: any) => {
      const newItems = [...payload.items];
      newItems[index] = { ...newItems[index], [field]: value };
      setPayload({ ...payload, items: newItems });
    };

    const addItem = () => {
      setPayload({ ...payload, items: [...payload.items, { name: "New Item", price: "0.00", img: "" }] });
    };

    const removeItem = (index: number) => {
      const newItems = [...payload.items];
      newItems.splice(index, 1);
      setPayload({ ...payload, items: newItems });
    };

    return (
      <div className="space-y-4">
        {payload.items.map((item: any, idx: number) => (
          <div key={idx} className="border p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <Label>Item {idx + 1}</Label>
              <Button variant="ghost" size="sm" onClick={() => removeItem(idx)}><Trash2 className="w-4 h-4 text-red-500" /></Button>
            </div>
            <Input placeholder="Name" value={item.name} onChange={(e) => updateItem(idx, 'name', e.target.value)} />
            <Input placeholder="Price" value={item.price} onChange={(e) => updateItem(idx, 'price', e.target.value)} />
            <Input placeholder="Image URL" value={item.img} onChange={(e) => updateItem(idx, 'img', e.target.value)} />
          </div>
        ))}
        <Button variant="outline" onClick={addItem}><Plus className="w-4 h-4 mr-2" /> Add Item</Button>
        <Button onClick={() => updateBlock('produce_bestsellers', payload)}><Save className="w-4 h-4 mr-2" /> Save Bestsellers</Button>
      </div>
    );
  };

  // --- Home Hero Editor ---
  const HomeHeroEditor = () => {
    const defaultPayload = { slides: [] };
    const [payload, setPayload] = useState(getBlockPayload('hero', defaultPayload));

    const updateSlide = (index: number, field: string, value: any) => {
      const newSlides = [...payload.slides];
      newSlides[index] = { ...newSlides[index], [field]: value };
      setPayload({ ...payload, slides: newSlides });
    };

    const addSlide = () => {
      setPayload({ ...payload, slides: [...payload.slides, { 
        id: Date.now(), 
        tag: "NEW", 
        title: "New Slide", 
        desc: "Description", 
        img: "", 
        btn: "Shop Now",
        navTarget: "Produce"
      }] });
    };

    const removeSlide = (index: number) => {
      const newSlides = [...payload.slides];
      newSlides.splice(index, 1);
      setPayload({ ...payload, slides: newSlides });
    };

    return (
      <div className="space-y-6">
        {payload.slides.map((slide: any, idx: number) => (
          <div key={idx} className="border p-4 rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <Label className="font-bold">Slide {idx + 1}</Label>
              <Button variant="ghost" size="sm" onClick={() => removeSlide(idx)}><Trash2 className="w-4 h-4 text-red-500" /></Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tag</Label>
                <Input value={slide.tag} onChange={(e) => updateSlide(idx, 'tag', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Button Text</Label>
                <Input value={slide.btn} onChange={(e) => updateSlide(idx, 'btn', e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Title</Label>
              <Textarea value={slide.title} onChange={(e) => updateSlide(idx, 'title', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={slide.desc} onChange={(e) => updateSlide(idx, 'desc', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Image URL</Label>
              <Input value={slide.img} onChange={(e) => updateSlide(idx, 'img', e.target.value)} />
            </div>
          </div>
        ))}
        <Button variant="outline" onClick={addSlide}><Plus className="w-4 h-4 mr-2" /> Add Slide</Button>
        <Button onClick={() => updateBlock('hero', payload)}><Save className="w-4 h-4 mr-2" /> Save Home Slides</Button>
      </div>
    );
  };

  // --- Flash Deal Editor ---
  const FlashDealEditor = () => {
    const defaultPayload = { product: { name: "", price: 0, image: "" } };
    const [payload, setPayload] = useState(getBlockPayload('deal', defaultPayload));

    const updateProduct = (field: string, value: any) => {
      setPayload({ ...payload, product: { ...payload.product, [field]: value } });
    };

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Product Name</Label>
          <Input value={payload.product.name} onChange={(e) => updateProduct('name', e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Price</Label>
          <Input type="number" value={payload.product.price} onChange={(e) => updateProduct('price', Number(e.target.value))} />
        </div>
        <div className="space-y-2">
          <Label>Image URL</Label>
          <Input value={payload.product.image} onChange={(e) => updateProduct('image', e.target.value)} />
        </div>
        <Button onClick={() => updateBlock('deal', payload)}><Save className="w-4 h-4 mr-2" /> Save Flash Deal</Button>
      </div>
    );
  };

  if (loading) return <Loader2 className="w-8 h-8 animate-spin" />;

  return (
    <Tabs defaultValue="home_hero" className="w-full">
      <TabsList className="flex-wrap h-auto">
        <TabsTrigger value="home_hero">Home Slides</TabsTrigger>
        <TabsTrigger value="hero">Produce Hero</TabsTrigger>
        <TabsTrigger value="bestsellers">Best Sellers</TabsTrigger>
        <TabsTrigger value="deals">Deals Hero</TabsTrigger>
        <TabsTrigger value="flash_deal">Flash Deal</TabsTrigger>
      </TabsList>
      <Card className="mt-4">
        <CardContent className="pt-6">
          <TabsContent value="home_hero"><HomeHeroEditor /></TabsContent>
          <TabsContent value="hero"><HeroEditor /></TabsContent>
          <TabsContent value="bestsellers"><BestsellersEditor /></TabsContent>
          <TabsContent value="deals"><DealsHeroEditor /></TabsContent>
          <TabsContent value="flash_deal"><FlashDealEditor /></TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
}
