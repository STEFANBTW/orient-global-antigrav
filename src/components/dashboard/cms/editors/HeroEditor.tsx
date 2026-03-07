import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function HeroEditor({ payload, onChange }: { payload: any, onChange: (newPayload: any) => void }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Hero Main Title</Label>
        <Input 
          value={payload.title || ''} 
          onChange={e => onChange({ ...payload, title: e.target.value })}
          className="font-headline text-lg border-slate-200"
          placeholder="e.g., Artisan Bakery"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Subtitle / Tagline</Label>
        <Input 
          value={payload.subtitle || ''} 
          onChange={e => onChange({ ...payload, subtitle: e.target.value })}
          className="border-slate-200"
          placeholder="e.g., Freshly baked goods daily."
        />
      </div>
      <div className="space-y-2">
        <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Background Image URL</Label>
        <Input 
          value={payload.image_url || ''} 
          onChange={e => onChange({ ...payload, image_url: e.target.value })}
          className="border-slate-200 font-code text-xs"
          placeholder="https://..."
        />
      </div>
    </div>
  );
}
