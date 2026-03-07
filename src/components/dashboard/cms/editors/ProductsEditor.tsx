import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

type ProductItem = {
  id: string;
  name: string;
  price: string;
  image_url: string;
  description: string;
};

type ProductsPayload = {
  items: ProductItem[];
};

export function ProductsEditor({
  payload,
  onChange,
}: {
  payload: ProductsPayload;
  onChange: (p: ProductsPayload) => void;
}) {
  const items: ProductItem[] = payload.items || [];

  const updateItem = (index: number, field: keyof ProductItem, value: string) => {
    const next = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    onChange({ ...payload, items: next });
  };

  const addItem = () => {
    const newItem: ProductItem = {
      id: `prod_${Date.now()}`,
      name: '',
      price: '',
      image_url: '',
      description: '',
    };
    onChange({ ...payload, items: [...items, newItem] });
  };

  const removeItem = (index: number) => {
    onChange({ ...payload, items: items.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">
          Products / Catalog Items
        </Label>
        <Button size="sm" variant="outline" onClick={addItem} className="h-8 text-xs border-slate-200">
          <Plus className="w-3 h-3 mr-1" /> Add Item
        </Button>
      </div>

      {items.length === 0 && (
        <div className="text-center py-8 text-sm text-slate-400 border-2 border-dashed border-slate-200 rounded-lg">
          No items. Click "Add Item" to start.
        </div>
      )}

      <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
        {items.map((item, idx) => (
          <div key={item.id || idx} className="p-4 border border-slate-100 rounded-xl bg-slate-50/50 space-y-3 relative group">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => removeItem(idx)}
              className="absolute top-3 right-3 h-7 w-7 p-0 text-red-400 hover:bg-red-50 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Name</Label>
                <Input
                  value={item.name}
                  onChange={e => updateItem(idx, 'name', e.target.value)}
                  className="h-8 text-xs border-slate-200"
                  placeholder="Product Name"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Price</Label>
                <Input
                  value={item.price}
                  onChange={e => updateItem(idx, 'price', e.target.value)}
                  className="h-8 text-xs border-slate-200"
                  placeholder="₦2,500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Image URL</Label>
              <Input
                value={item.image_url}
                onChange={e => updateItem(idx, 'image_url', e.target.value)}
                className="h-8 text-xs border-slate-200 font-code"
                placeholder="https://..."
              />
            </div>

            <div className="space-y-1">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Description</Label>
              <Input
                value={item.description}
                onChange={e => updateItem(idx, 'description', e.target.value)}
                className="h-8 text-xs border-slate-200"
                placeholder="Short description..."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
