import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { GripVertical, Eye, EyeOff } from 'lucide-react';

type NavLink = {
    id: string;
    label: string;
    route: string;
    visible: boolean;
};

type NavPayload = {
    links: NavLink[];
};

export function NavigationMatrix({
    payload,
    onChange,
}: {
    payload: NavPayload;
    onChange: (p: NavPayload) => void;
}) {
    const links: NavLink[] = payload.links || [];

    const toggleVisibility = (id: string) => {
        const next = links.map(link =>
            link.id === id ? { ...link, visible: !link.visible } : link
        );
        onChange({ ...payload, links: next });
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                    Navigation Links
                </Label>
                <Badge className="text-[9px] uppercase tracking-widest bg-slate-100 text-slate-500 border-slate-200">
                    {links.filter(l => l.visible).length} of {links.length} visible
                </Badge>
            </div>

            <p className="text-xs text-slate-400">
                Toggle visibility to instantly show or hide routes from the global navigation. Drag to reorder (saved on deploy).
            </p>

            <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-2">
                {links.length === 0 && (
                    <div className="text-center py-8 text-sm text-slate-400 border-2 border-dashed border-slate-200 rounded-lg">
                        No navigation links configured.
                    </div>
                )}
                {links.map(link => (
                    <div
                        key={link.id}
                        className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${link.visible
                                ? 'bg-white border-slate-200 hover:border-primary/30'
                                : 'bg-slate-50 border-dashed border-slate-200 opacity-60'
                            }`}
                    >
                        <GripVertical className="w-4 h-4 text-slate-300 shrink-0 cursor-grab" />

                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-900 truncate">{link.label}</p>
                            <p className="text-[10px] text-slate-400 font-code truncate">{link.route}</p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                            {link.visible
                                ? <Eye className="w-3.5 h-3.5 text-emerald-500" />
                                : <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                            }
                            <Switch
                                checked={link.visible}
                                onCheckedChange={() => toggleVisibility(link.id)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
