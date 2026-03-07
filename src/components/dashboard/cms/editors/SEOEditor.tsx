import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle } from 'lucide-react';

type SEOPayload = {
    title?: string;
    meta_description?: string;
    keywords?: string;
    og_image?: string;
    twitter_description?: string;
};

export function SEOEditor({
    payload,
    onChange,
}: {
    payload: SEOPayload;
    onChange: (p: SEOPayload) => void;
}) {
    const titleLen = (payload.title || '').length;
    const descLen = (payload.meta_description || '').length;

    const titleStatus = titleLen === 0 ? 'empty' : titleLen <= 60 ? 'good' : 'long';
    const descStatus = descLen === 0 ? 'empty' : descLen <= 160 ? 'good' : 'long';

    const StatusBadge = ({ status }: { status: string }) => {
        if (status === 'good') return (
            <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[8px] uppercase tracking-widest">
                <CheckCircle className="w-2.5 h-2.5 mr-1" /> Optimal
            </Badge>
        );
        if (status === 'long') return (
            <Badge className="bg-red-500/10 text-red-600 border-red-500/20 text-[8px] uppercase tracking-widest">
                <AlertCircle className="w-2.5 h-2.5 mr-1" /> Too Long
            </Badge>
        );
        return (
            <Badge className="bg-slate-100 text-slate-500 border-slate-200 text-[8px] uppercase tracking-widest">
                Missing
            </Badge>
        );
    };

    return (
        <div className="space-y-5">
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                        Page Title
                    </Label>
                    <div className="flex items-center gap-2">
                        <StatusBadge status={titleStatus} />
                        <span className={`text-[10px] font-code font-bold ${titleLen > 60 ? 'text-red-500' : 'text-slate-400'}`}>
                            {titleLen}/60
                        </span>
                    </div>
                </div>
                <Input
                    value={payload.title || ''}
                    onChange={e => onChange({ ...payload, title: e.target.value })}
                    className="border-slate-200"
                    placeholder="Orient Bakery | Freshly Baked Daily"
                />
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                        Meta Description
                    </Label>
                    <div className="flex items-center gap-2">
                        <StatusBadge status={descStatus} />
                        <span className={`text-[10px] font-code font-bold ${descLen > 160 ? 'text-red-500' : 'text-slate-400'}`}>
                            {descLen}/160
                        </span>
                    </div>
                </div>
                <Textarea
                    value={payload.meta_description || ''}
                    onChange={e => onChange({ ...payload, meta_description: e.target.value })}
                    className="border-slate-200 resize-none min-h-[80px] text-sm"
                    placeholder="A short, compelling description for search engines..."
                />
            </div>

            <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                    Keywords <span className="font-normal text-slate-400 normal-case tracking-normal">(comma-separated)</span>
                </Label>
                <Input
                    value={payload.keywords || ''}
                    onChange={e => onChange({ ...payload, keywords: e.target.value })}
                    className="border-slate-200"
                    placeholder="artisan bread, croissants, Abuja bakery"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">OG Image URL</Label>
                    <Input
                        value={payload.og_image || ''}
                        onChange={e => onChange({ ...payload, og_image: e.target.value })}
                        className="border-slate-200 text-xs font-code"
                        placeholder="https://..."
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Twitter Description</Label>
                    <Input
                        value={payload.twitter_description || ''}
                        onChange={e => onChange({ ...payload, twitter_description: e.target.value })}
                        className="border-slate-200 text-xs"
                        placeholder="Tweet-length tagline..."
                    />
                </div>
            </div>
        </div>
    );
}
