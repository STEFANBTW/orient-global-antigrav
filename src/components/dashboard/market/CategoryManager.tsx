import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";
import { Edit2, Trash2, Plus, Save, X, FolderOpen, ArrowUpDown, Package, ChevronRight } from "lucide-react";
import type { MarketProduct } from "./useMarketCMS";

interface Props {
    products: MarketProduct[];
    onRefresh: () => Promise<void>;
    isDarkMode?: boolean;
}

export default function CategoryManager({ products, onRefresh, isDarkMode = true }: Props) {
    const [editingCat, setEditingCat] = useState<string | null>(null);
    const [newName, setNewName] = useState("");
    const [addingNew, setAddingNew] = useState(false);
    const [newCatName, setNewCatName] = useState("");

    const categories = useMemo(() => {
        const map: Record<string, { count: number; active: number; draft: number; archived: number; totalStock: number }> = {};
        products.forEach(p => {
            if (!map[p.category]) map[p.category] = { count: 0, active: 0, draft: 0, archived: 0, totalStock: 0 };
            map[p.category].count++;
            if (p.status === "active") map[p.category].active++;
            if (p.status === "draft") map[p.category].draft++;
            if (p.status === "archived") map[p.category].archived++;
            map[p.category].totalStock += p.stock || 0;
        });
        return Object.entries(map).sort((a, b) => b[1].count - a[1].count);
    }, [products]);

    const renameCategory = async (oldName: string) => {
        if (!newName.trim() || newName === oldName) { setEditingCat(null); return; }
        const { error } = await supabase.from("market_products").update({ category: newName }).eq("category", oldName);
        if (error) toast({ variant: "destructive", title: "Rename Failed", description: error.message });
        else { toast({ title: "Renamed", description: `${oldName} → ${newName}` }); setEditingCat(null); setNewName(""); await onRefresh(); }
    };

    const deleteCategory = async (catName: string) => {
        const count = categories.find(([c]) => c === catName)?.[1].count || 0;
        if (!confirm(`This will mark all ${count} products in "${catName}" as archived. Continue?`)) return;
        await supabase.from("market_products").update({ status: "archived" }).eq("category", catName);
        toast({ title: "Archived", description: `${count} products archived.` });
        await onRefresh();
    };

    return (
        <div className="space-y-10 mcms">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-[11px] font-black uppercase tracking-[0.2em] mb-1.5 flex items-center gap-2" style={{ color: 'var(--mcms-text-muted)' }}>
                        <ArrowUpDown className="w-4 h-4" style={{ color: 'var(--mcms-accent)' }} /> Taxonomy Management
                    </h2>
                    <p className="text-[10px] font-medium opacity-40 ml-6 uppercase tracking-wider">Organize and monitor distribution groups</p>
                </div>
                <button
                    className="h-8 text-[9px] font-black uppercase tracking-widest text-black rounded-full px-5 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-amber-500/10"
                    style={{ backgroundColor: 'var(--mcms-accent)' }}
                    onClick={() => setAddingNew(true)}
                >
                    <Plus className="w-3.5 h-3.5 mr-1.5 inline" /> Add Category
                </button>
            </div>

            {addingNew && (
                <Card className="p-4 border shadow-md animate-in slide-in-from-top-2 duration-300" style={{ backgroundColor: 'var(--mcms-card)', borderColor: 'var(--mcms-accent)' }}>
                    <div className="flex items-center gap-3">
                        <Input
                            value={newCatName}
                            onChange={(e) => setNewCatName(e.target.value)}
                            placeholder="Enter new category name..."
                            className="text-sm h-10 border-none bg-black/5 dark:bg-white/5"
                            autoFocus
                        />
                        <button
                            onClick={() => { toast({ title: "Category Placeholder", description: "In this version, categories are created when you assign a product to a new category." }); setAddingNew(false); }}
                            className="h-10 px-6 text-[10px] font-black uppercase tracking-widest bg-black text-white dark:bg-white dark:text-black rounded-lg"
                        >
                            Create
                        </button>
                        <button onClick={() => setAddingNew(false)} className="p-2 opacity-40 hover:opacity-100 transition-opacity"><X className="w-4 h-4" /></button>
                    </div>
                </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map(([cat, stats]) => (
                    <Card key={cat} className="p-5 border group shadow-sm hover:shadow-md transition-all duration-300" style={{ backgroundColor: 'var(--mcms-card)', borderColor: 'var(--mcms-card-border)' }}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 flex-1">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors" style={{ backgroundColor: 'var(--mcms-kanban-bg)' }}>
                                    <FolderOpen className="w-4 h-4" style={{ color: 'var(--mcms-text-muted)' }} />
                                </div>
                                
                                {editingCat === cat ? (
                                    <div className="flex items-center gap-2 flex-1">
                                        <Input
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                            className="text-sm h-8 border rounded-md"
                                            autoFocus
                                            onKeyDown={(e) => e.key === "Enter" && renameCategory(cat)}
                                            style={{ backgroundColor: 'var(--mcms-input-bg)', color: 'var(--mcms-text)', borderColor: 'var(--mcms-accent)' }}
                                        />
                                        <button onClick={() => renameCategory(cat)} className="h-8 px-2 text-[9px] font-black uppercase tracking-widest bg-green-500 text-white rounded-md">Save</button>
                                        <button onClick={() => setEditingCat(null)} className="h-8 px-2 text-[9px] font-black uppercase tracking-widest bg-white/5 border rounded-md" style={{ color: 'var(--mcms-text)', borderColor: 'var(--mcms-card-border)' }}>Cancel</button>
                                    </div>
                                ) : (
                                    <div className="flex-1">
                                        <h4 className="font-bold text-sm tracking-tight" style={{ color: 'var(--mcms-text)' }}>{cat}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] font-black uppercase tracking-widest opacity-30" style={{ color: 'var(--mcms-text)' }}>{stats.count} Products</span>
                                            {stats.active > 0 && <Badge className="text-[9px] font-bold bg-green-500/5 text-green-500 border-green-500/10 border">{stats.active} active</Badge>}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {editingCat !== cat && (
                                <div className="flex items-center gap-4">
                                    <div className="text-right hidden sm:block">
                                        <span className="block text-[8px] font-black uppercase tracking-widest opacity-30" style={{ color: 'var(--mcms-text)' }}>Stock</span>
                                        <span className="text-xs font-bold" style={{ color: 'var(--mcms-text)' }}>{stats.totalStock.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => { setEditingCat(cat); setNewName(cat); }} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                                            <Edit2 className="w-3.5 h-3.5 opacity-40 hover:opacity-100 transition-opacity" style={{ color: 'var(--mcms-text)' }} />
                                        </button>
                                        <button onClick={() => deleteCategory(cat)} className="p-2 hover:bg-red-500/5 rounded-lg transition-colors text-red-500/30 hover:text-red-500">
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                    <ChevronRight className="w-4 h-4 opacity-10" style={{ color: 'var(--mcms-text)' }} />
                                </div>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
