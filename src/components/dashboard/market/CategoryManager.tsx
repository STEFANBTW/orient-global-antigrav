import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";
import { Edit2, Trash2, Plus, Save, X, FolderOpen, ArrowUpDown, Package } from "lucide-react";
import type { MarketProduct } from "./useMarketCMS";

interface Props {
    products: MarketProduct[];
    onRefresh: () => Promise<void>;
}

export default function CategoryManager({ products, onRefresh }: Props) {
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
        <div className="space-y-5 mcms">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-bold" style={{ color: 'var(--mcms-heading)' }}>{categories.length} Categories</h3>
                    <p className="text-[10px]" style={{ color: 'var(--mcms-text-muted)' }}>Manage product categories. Rename or archive entire groups.</p>
                </div>
                <Button
                    size="sm"
                    onClick={() => setAddingNew(true)}
                    className="text-xs rounded-full text-white gap-1 border-none"
                    style={{ backgroundColor: 'var(--mcms-accent)' }}
                >
                    <Plus className="w-3 h-3" /> New Category
                </Button>
            </div>

            {addingNew && (
                <Card className="border" style={{ backgroundColor: 'var(--mcms-accent-soft)', borderColor: 'var(--mcms-accent)' }}>
                    <div className="p-3 flex items-center gap-2">
                        <Input
                            value={newCatName}
                            onChange={(e) => setNewCatName(e.target.value)}
                            placeholder="Category name"
                            className="text-sm border"
                            autoFocus
                            style={{ backgroundColor: 'var(--mcms-input-bg)', color: 'var(--mcms-text)', borderColor: 'var(--mcms-accent)' }}
                        />
                        <p className="text-[10px] whitespace-nowrap" style={{ color: 'var(--mcms-text-muted)' }}>Products can be assigned to this category via the product form.</p>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => { setAddingNew(false); setNewCatName(""); }}
                            className="border"
                            style={{ borderColor: 'var(--mcms-accent)', color: 'var(--mcms-accent)' }}
                        >
                            <X className="w-3 h-3" />
                        </Button>
                        <Button
                            size="sm"
                            onClick={() => { toast({ title: "Category ready", description: `"${newCatName}" ready — add products with this category.` }); setAddingNew(false); setNewCatName(""); }}
                            className="text-white border-none"
                            style={{ backgroundColor: 'var(--mcms-accent)' }}
                        >
                            <Save className="w-3 h-3" />
                        </Button>
                    </div>
                </Card>
            )}

            <div className="grid gap-2">
                {categories.map(([cat, stats]) => (
                    <Card key={cat} className="border transition-colors" style={{ backgroundColor: 'var(--mcms-card)', borderColor: 'var(--mcms-card-border)' }}>
                        <div className="p-3 flex items-center justify-between">
                            <div className="flex items-center gap-3 flex-1">
                                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--mcms-kanban-bg)' }}>
                                    <FolderOpen className="w-4 h-4" style={{ color: 'var(--mcms-text-muted)' }} />
                                </div>
                                {editingCat === cat ? (
                                    <div className="flex items-center gap-2 flex-1">
                                        <Input
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                            className="text-sm h-8 border"
                                            autoFocus
                                            onKeyDown={(e) => e.key === "Enter" && renameCategory(cat)}
                                            style={{ backgroundColor: 'var(--mcms-input-bg)', color: 'var(--mcms-text)', borderColor: 'var(--mcms-accent)' }}
                                        />
                                        <Button size="sm" onClick={() => renameCategory(cat)} className="h-7 text-xs bg-green-600 text-white border-none"><Save className="w-3 h-3" /></Button>
                                        <Button size="sm" variant="outline" onClick={() => setEditingCat(null)} className="h-7 border" style={{ borderColor: 'var(--mcms-card-border)', color: 'var(--mcms-text)' }}><X className="w-3 h-3" /></Button>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="font-semibold text-sm" style={{ color: 'var(--mcms-text)' }}>{cat}</p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <Badge className="text-[9px] border-none" style={{ backgroundColor: 'var(--mcms-kanban-bg)', color: 'var(--mcms-text-muted)' }}>{stats.count} products</Badge>
                                            {stats.active > 0 && <Badge className="text-[9px] bg-green-500/10 text-green-500 border-none">{stats.active} active</Badge>}
                                            {stats.draft > 0 && <Badge className="text-[9px] bg-amber-500/10 text-amber-500 border-none">{stats.draft} draft</Badge>}
                                            {stats.archived > 0 && <Badge className="text-[9px] bg-red-500/10 text-red-500 border-none">{stats.archived} archived</Badge>}
                                        </div>
                                    </div>
                                )}
                            </div>
                            {editingCat !== cat && (
                                <div className="flex items-center gap-2">
                                    <span className="text-xs mr-2" style={{ color: 'var(--mcms-text-micro)' }}><Package className="w-3 h-3 inline mr-1" />{stats.totalStock} units</span>
                                    <Button size="sm" variant="ghost" onClick={() => { setEditingCat(cat); setNewName(cat); }} className="h-7 w-7 p-0 hover:bg-transparent">
                                        <Edit2 className="w-3 h-3" style={{ color: 'var(--mcms-text-micro)' }} />
                                    </Button>
                                    <Button size="sm" variant="ghost" onClick={() => deleteCategory(cat)} className="h-7 w-7 p-0 hover:bg-transparent">
                                        <Trash2 className="w-3 h-3 text-red-500/60 hover:text-red-500" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
