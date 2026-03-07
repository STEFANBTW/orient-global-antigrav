import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function TextEditor({ payload, onChange }: { payload: any; onChange: (p: any) => void }) {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Section Title</Label>
                <Input
                    value={payload.title || ''}
                    onChange={e => onChange({ ...payload, title: e.target.value })}
                    className="border-slate-200"
                    placeholder="e.g., Our Story"
                />
            </div>
            <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Body Content</Label>
                <Textarea
                    value={payload.content || ''}
                    onChange={e => onChange({ ...payload, content: e.target.value })}
                    className="border-slate-200 min-h-[200px] text-sm leading-relaxed"
                    placeholder="Write your content here..."
                />
            </div>
        </div>
    );
}
