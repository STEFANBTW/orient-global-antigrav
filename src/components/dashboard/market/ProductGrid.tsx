import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Search, Plus, Trash2, Copy, Edit2, ChevronLeft, ChevronRight, Download, ArrowUpDown, Eye, EyeOff, Archive, Loader2, CheckSquare } from "lucide-react";
import ProductForm from "./ProductForm";
import type { MarketProduct } from "./useMarketCMS";

const ITEMS_PER_PAGE = 12;

interface Props {
    tabId: string;
    products: MarketProduct[];
    loading: boolean;
    onRefresh: () => Promise<void>;
    onDelete: (id: string) => Promise<void>;
    onDuplicate: (p: MarketProduct) => Promise<void>;
    onUpdateStatus: (id: string, s: string) => Promise<void>;
    onBulkDelete: (ids: string[]) => Promise<void>;
    onBulkStatus: (ids: string[], s: string) => Promise<void>;
    onExportCSV: () => void;
    contextFilter?: string;
    categoryFilter?: string[];
}

export default function ProductGrid({
    tabId, products, loading, onRefresh, onDelete, onDuplicate, onUpdateStatus,
    onBulkDelete, onBulkStatus, onExportCSV, contextFilter, categoryFilter,
}: Props) {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [sortBy, setSortBy] = useState<string>("newest");
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [editingProduct, setEditingProduct] = useState<MarketProduct | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);

    const filtered = useMemo(() => {
        let items = products;
        if (contextFilter) items = items.filter(p => p.context === contextFilter);
        if (categoryFilter?.length) items = items.filter(p => categoryFilter.includes(p.category));
        if (statusFilter !== "all") items = items.filter(p => p.status === statusFilter);
        if (search) {
            const q = search.toLowerCase();
            items = items.filter(p => p.name.toLowerCase().includes(q) || p.brand?.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
        }
        items = [...items].sort((a, b) => {
            if (sortBy === "price-low") return a.price - b.price;
            if (sortBy === "price-high") return b.price - a.price;
            if (sortBy === "stock") return (a.stock ?? 999) - (b.stock ?? 999);
            if (sortBy === "name") return a.name.localeCompare(b.name);
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
        return items;
    }, [products, contextFilter, categoryFilter, statusFilter, search, sortBy]);

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    const toggleSelect = (id: string) => setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
    const selectAll = () => setSelected(new Set(paged.map(p => p.id)));
    const clearSelection = () => setSelected(new Set());

    const statusBadge = (s: string) => {
        if (s === "active") return <Badge className="bg-green-100 text-green-700 text-[9px]">Active</Badge>;
        if (s === "draft") return <Badge className="bg-amber-100 text-amber-700 text-[9px]">Draft</Badge>;
        return <Badge className="bg-red-100 text-red-700 text-[9px]">Archived</Badge>;
    };

    const stockBadge = (stock: number | null) => {
        if (stock === null) return null;
        if (stock <= 3) return <Badge className="bg-red-500 text-white text-[9px] animate-pulse">LOW: {stock}</Badge>;
        if (stock <= 10) return <Badge className="bg-amber-100 text-amber-700 text-[9px]">{stock} left</Badge>;
        return <span className="text-[10px] text-slate-400">{stock} in stock</span>;
    };

    return (
        <div className="space-y-4 max-w-7xl mx-auto">
            {/* Sticky Header Container */}
            <div className="sticky top-0 z-20 space-y-4 pt-1 pb-4" style={{ backgroundColor: 'var(--mcms-bg)' }}>
                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2">
                    <div className="relative flex-1 min-w-[180px] w-full sm:w-auto">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: 'var(--mcms-text-muted)' }} />
                        <Input
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            placeholder="Search products..."
                            className="pl-8 h-8 text-xs rounded-lg border"
                            style={{ backgroundColor: 'var(--mcms-input-bg)', color: 'var(--mcms-text)', borderColor: 'var(--mcms-card-border)' }}
                        />
                    </div>
                    <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
                        <SelectTrigger
                            className="w-[110px] h-8 text-xs rounded-lg border"
                            style={{ backgroundColor: 'var(--mcms-input-bg)', color: 'var(--mcms-text)', borderColor: 'var(--mcms-card-border)' }}
                        >
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger
                            className="w-[120px] h-8 text-xs rounded-lg border"
                            style={{ backgroundColor: 'var(--mcms-input-bg)', color: 'var(--mcms-text)', borderColor: 'var(--mcms-card-border)' }}
                        >
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="newest">Newest</SelectItem>
                            <SelectItem value="name">Name A-Z</SelectItem>
                            <SelectItem value="price-low">Price ↑</SelectItem>
                            <SelectItem value="price-high">Price ↓</SelectItem>
                            <SelectItem value="stock">Stock ↑</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={onExportCSV}
                        className="h-8 text-xs rounded-lg gap-1 border"
                        style={{ backgroundColor: 'var(--mcms-card)', color: 'var(--mcms-text)', borderColor: 'var(--mcms-card-border)' }}
                    >
                        <Download className="w-3 h-3" />CSV
                    </Button>
                    <Button
                        size="sm"
                        onClick={() => setShowAddForm(true)}
                        className="h-8 text-xs rounded-lg text-white gap-1 border-none"
                        style={{ backgroundColor: 'var(--mcms-accent)' }}
                    >
                        <Plus className="w-3 h-3" />Add
                    </Button>
                </div>

                {/* Bulk actions bar */}
                {selected.size > 0 && (
                    <div className="flex items-center gap-2 rounded-lg p-2 text-xs border" style={{ backgroundColor: 'var(--mcms-accent-soft)', borderColor: 'var(--mcms-accent)' }}>
                        <CheckSquare className="w-3.5 h-3.5" style={{ color: 'var(--mcms-accent)' }} />
                        <span className="font-medium" style={{ color: 'var(--mcms-accent)' }}>{selected.size} selected</span>
                        <div className="flex-1" />
                        <Button size="sm" variant="outline" onClick={() => onBulkStatus(Array.from(selected), "active")} className="h-6 text-[10px] rounded-full gap-1 border-green-500/30 text-green-500 hover:bg-green-500/10">Activate</Button>
                        <Button size="sm" variant="outline" onClick={() => onBulkStatus(Array.from(selected), "draft")} className="h-6 text-[10px] rounded-full gap-1 border-amber-500/30 text-amber-500 hover:bg-amber-500/10">Draft</Button>
                        <Button size="sm" variant="outline" onClick={() => onBulkStatus(Array.from(selected), "archived")} className="h-6 text-[10px] rounded-full gap-1 border-slate-500/30 text-slate-400 hover:bg-slate-500/10">Archive</Button>
                        <Button size="sm" variant="outline" onClick={() => { onBulkDelete(Array.from(selected)); clearSelection(); }} className="h-6 text-[10px] rounded-full gap-1 border-red-500/30 text-red-500 hover:bg-red-500/10">Delete</Button>
                        <Button size="sm" variant="ghost" onClick={clearSelection} className="h-6 text-[10px]" style={{ color: 'var(--mcms-text-muted)' }}>Clear</Button>
                    </div>
                )}

                {/* Count + select all */}
                <div className="flex items-center justify-between text-[10px] px-1" style={{ color: 'var(--mcms-text-micro)' }}>
                    <span>{filtered.length} products · Page {page}/{totalPages || 1}</span>
                    <Button variant="ghost" size="sm" onClick={selected.size === paged.length ? clearSelection : selectAll} className="h-5 text-[10px] hover:text-white" style={{ color: 'var(--mcms-text-muted)' }}>
                        {selected.size === paged.length ? "Deselect All" : "Select All"}
                    </Button>
                </div>
            </div>

            {/* Product grid */}
            {loading ? (
                <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin" style={{ color: 'var(--mcms-accent)' }} /></div>
            ) : paged.length === 0 ? (
                <p className="text-center text-sm py-16" style={{ color: 'var(--mcms-text-muted)' }}>No products found</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {paged.map(p => (
                        <Card
                            key={p.id}
                            className={`group overflow-hidden border transition-all hover:shadow-md ${selected.has(p.id) ? "ring-2 ring-offset-0" : ""}`}
                            style={{
                                backgroundColor: 'var(--mcms-card)',
                                borderColor: selected.has(p.id) ? 'var(--mcms-accent)' : 'var(--mcms-card-border)',
                                '--tw-ring-color': 'var(--mcms-accent)'
                            } as any}
                        >
                            <div className="relative cursor-pointer" onClick={() => toggleSelect(p.id)}>
                                <div className="absolute top-2 left-2 z-10">
                                    <Checkbox checked={selected.has(p.id)} className="border-white/60 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500" />
                                </div>
                                <img src={p.image} alt={p.name} referrerPolicy="no-referrer" className="w-full h-28 object-cover" style={{ backgroundColor: 'var(--mcms-kanban-bg)' }} onError={(e) => { (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23f1f5f9' width='100' height='100'/%3E%3Ctext x='50' y='55' text-anchor='middle' fill='%2394a3b8' font-size='12'%3ENo Image%3C/text%3E%3C/svg%3E"; }} />
                                <div className="absolute top-2 right-2 flex flex-col gap-1">
                                    {statusBadge(p.status)}
                                    {stockBadge(p.stock)}
                                </div>
                            </div>
                            <div className="p-2.5">
                                <p className="text-xs font-semibold truncate" style={{ color: 'var(--mcms-text)' }}>{p.name}</p>
                                <p className="text-[10px] mb-1" style={{ color: 'var(--mcms-text-muted)' }}>{p.category}{p.brand ? ` · ${p.brand}` : ""}</p>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-sm font-bold" style={{ color: 'var(--mcms-heading)' }}>₦{p.price.toLocaleString()}</span>
                                    {p.old_price && <span className="text-[10px] line-through" style={{ color: 'var(--mcms-text-micro)' }}>₦{p.old_price.toLocaleString()}</span>}
                                </div>
                                <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button size="sm" variant="outline" onClick={() => setEditingProduct(p)} className="h-6 text-[10px] rounded-full flex-1 gap-0.5 border" style={{ borderColor: 'var(--mcms-card-border)', color: 'var(--mcms-text)' }}><Edit2 className="w-2.5 h-2.5" />Edit</Button>
                                    <Button size="sm" variant="outline" onClick={() => onDuplicate(p)} className="h-6 text-[10px] rounded-full gap-0.5 px-2 border" style={{ borderColor: 'var(--mcms-card-border)', color: 'var(--mcms-text)' }}><Copy className="w-2.5 h-2.5" /></Button>
                                    <Button size="sm" variant="outline" onClick={() => onDelete(p.id)} className="h-6 text-[10px] rounded-full gap-0.5 px-2 text-red-500 hover:bg-red-500/10 border-red-500/20"><Trash2 className="w-2.5 h-2.5" /></Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-2">
                    <Button size="sm" variant="outline" disabled={page === 1} onClick={() => setPage(page - 1)} className="h-7 text-xs rounded-lg gap-1 border" style={{ borderColor: 'var(--mcms-card-border)', color: 'var(--mcms-text)' }}><ChevronLeft className="w-3 h-3" />Prev</Button>
                    {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                        const p = i + 1;
                        return (
                            <Button
                                key={p}
                                size="sm"
                                variant={p === page ? "default" : "outline"}
                                onClick={() => setPage(p)}
                                className={`h-7 w-7 text-xs rounded-lg p-0 ${p === page ? 'border-none' : 'border'}`}
                                style={{
                                    backgroundColor: p === page ? 'var(--mcms-accent)' : 'var(--mcms-card)',
                                    color: p === page ? '#fff' : 'var(--mcms-text)',
                                    borderColor: 'var(--mcms-card-border)'
                                }}
                            >
                                {p}
                            </Button>
                        );
                    })}
                    {totalPages > 7 && <span className="text-xs" style={{ color: 'var(--mcms-text-muted)' }}>...</span>}
                    <Button size="sm" variant="outline" disabled={page === totalPages} onClick={() => setPage(page + 1)} className="h-7 text-xs rounded-lg gap-1 border" style={{ borderColor: 'var(--mcms-card-border)', color: 'var(--mcms-text)' }}>Next<ChevronRight className="w-3 h-3" /></Button>
                </div>
            )}

            {/* Edit / Add Dialog */}
            <Dialog open={!!editingProduct || showAddForm} onOpenChange={(v) => { if (!v) { setEditingProduct(null); setShowAddForm(false); } }}>
                <DialogContent
                    className="max-w-2xl max-h-[90vh] overflow-y-auto border-none w-[95vw] sm:w-[90vw]"
                >
                    <ProductForm tabId={tabId} product={editingProduct || undefined} onSave={async () => { setEditingProduct(null); setShowAddForm(false); await onRefresh(); }} onCancel={() => { setEditingProduct(null); setShowAddForm(false); }} />
                </DialogContent>
            </Dialog>
        </div>
    );
}
