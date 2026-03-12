import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { Save, Loader2, Package, Image, Tag, DollarSign, FolderOpen, Star, Box, Percent, Calendar } from "lucide-react";
import type { MarketProduct } from "./useMarketCMS";

const ALL_CATEGORIES = [
    "Pantry", "Dairy", "Bakery", "Groceries", "Cleaning", "Beverages", "Condiments",
    "Luxe", "Fashion", "Furniture", "Health", "Baby",
    "Flash Sale", "Deals", "Produce", "Grains",
];

interface Props {
    tabId: string;
    product?: MarketProduct;
    onSave: () => Promise<void>;
    onCancel: () => void;
}

export default function ProductForm({ tabId, product, onSave, onCancel }: Props) {
    const isEdit = !!product;
    const [saving, setSaving] = useState(false);
    const [name, setName] = useState(product?.name || "");
    const [price, setPrice] = useState(product?.price?.toString() || "");
    const [oldPrice, setOldPrice] = useState(product?.old_price?.toString() || "");
    const [category, setCategory] = useState(product?.category || "");
    const [subCategory, setSubCategory] = useState(product?.sub_category || "");
    const [image, setImage] = useState(product?.image || "");
    const [brand, setBrand] = useState(product?.brand || "");
    const [unit, setUnit] = useState(product?.unit || "");
    const [tag, setTag] = useState(product?.tag || "");
    const [badge, setBadge] = useState(product?.badge || "");
    const [rating, setRating] = useState(product?.rating?.toString() || "");
    const [stock, setStock] = useState(product?.stock?.toString() || "");
    const [tierInfo, setTierInfo] = useState(product?.tier_info || "");
    const [status, setStatus] = useState(product?.status || "active");
    const [dealStarts, setDealStarts] = useState(product?.deal_starts_at?.slice(0, 16) || "");
    const [dealEnds, setDealEnds] = useState(product?.deal_ends_at?.slice(0, 16) || "");
    const context = tabId === "wholesale" ? "WHOLESALE" : "RETAIL";

    const handleSubmit = async () => {
        if (!name || !price || !category || !image) {
            toast({ variant: "destructive", title: "Missing Fields", description: "Name, Price, Category, and Image are required." });
            return;
        }
        setSaving(true);
        const payload = {
            name, price: parseFloat(price), old_price: oldPrice ? parseFloat(oldPrice) : null,
            category, sub_category: subCategory || null, image, brand: brand || null,
            unit: unit || null, tag: tag || null, badge: badge || null,
            rating: rating ? parseFloat(rating) : null, stock: stock ? parseInt(stock) : null,
            tier_info: tierInfo || null, context, status,
            deal_starts_at: dealStarts || null, deal_ends_at: dealEnds || null,
        };
        let error;
        if (isEdit) ({ error } = await supabase.from("market_products").update(payload).eq("id", product!.id));
        else ({ error } = await supabase.from("market_products").insert(payload));
        setSaving(false);
        if (error) toast({ variant: "destructive", title: "Save Failed", description: error.message });
        else { toast({ title: isEdit ? "Updated" : "Created", description: `${name} saved.` }); await onSave(); }
    };

    const inputClass = "h-11 px-3 rounded-lg border bg-transparent transition-all duration-200 focus:ring-2 focus:ring-offset-0";
    const labelClass = "text-xs font-semibold uppercase tracking-wider mb-1.5 block";
    const groupClass = "space-y-1.5";

    return (
        <div className="mcms">
            <DialogHeader className="mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
                <DialogTitle className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--mcms-heading)' }}>
                    {isEdit ? (
                        <>
                            <Package className="w-5 h-5" />
                            Edit Product
                        </>
                    ) : (
                        <>
                            <Package className="w-5 h-5" />
                            Add New Product
                        </>
                    )}
                </DialogTitle>
                <DialogDescription className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {isEdit ? "Update product details below" : "Fill in the product information to add it to your inventory"}
                </DialogDescription>
            </DialogHeader>

            <div className="space-y-5">
                {/* Image Preview */}
                {image && (
                    <div className="relative h-32 rounded-xl overflow-hidden border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50">
                        <img src={image} alt="Preview" referrerPolicy="no-referrer" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-center pb-3">
                            <span className="text-white text-xs font-medium">Image Preview</span>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-5">
                    {/* Name - Full Width */}
                    <div className={groupClass}>
                        <Label className={labelClass} style={{ color: 'var(--mcms-text-muted)' }}>
                            <span className="flex items-center gap-1.5">
                                <Package className="w-3 h-3" />
                                Product Name <span className="text-red-500">*</span>
                            </span>
                        </Label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter product name"
                            className={inputClass}
                            style={{
                                backgroundColor: 'var(--mcms-input-bg)',
                                color: 'var(--mcms-text)',
                                borderColor: 'var(--mcms-card-border)'
                            }}
                        />
                    </div>

                    {/* Price Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className={groupClass}>
                            <Label className={labelClass} style={{ color: 'var(--mcms-text-muted)' }}>
                                <span className="flex items-center gap-1.5">
                                    <DollarSign className="w-3 h-3" />
                                    Price (₦) <span className="text-red-500">*</span>
                                </span>
                            </Label>
                            <Input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="0.00"
                                className={inputClass}
                                style={{
                                    backgroundColor: 'var(--mcms-input-bg)',
                                    color: 'var(--mcms-text)',
                                    borderColor: 'var(--mcms-card-border)'
                                }}
                            />
                        </div>
                        <div className={groupClass}>
                            <Label className={labelClass} style={{ color: 'var(--mcms-text-muted)' }}>
                                <span className="flex items-center gap-1.5">
                                    <Tag className="w-3 h-3" />
                                    Old Price (₦)
                                </span>
                            </Label>
                            <Input
                                type="number"
                                value={oldPrice}
                                onChange={(e) => setOldPrice(e.target.value)}
                                placeholder="0.00"
                                className={inputClass}
                                style={{
                                    backgroundColor: 'var(--mcms-input-bg)',
                                    color: 'var(--mcms-text)',
                                    borderColor: 'var(--mcms-card-border)'
                                }}
                            />
                        </div>
                    </div>

                    {/* Category Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className={groupClass}>
                            <Label className={labelClass} style={{ color: 'var(--mcms-text-muted)' }}>
                                <span className="flex items-center gap-1.5">
                                    <FolderOpen className="w-3 h-3" />
                                    Category <span className="text-red-500">*</span>
                                </span>
                            </Label>
                            <Select value={category} onValueChange={setCategory}>
                                <SelectTrigger
                                    className={inputClass}
                                    style={{
                                        backgroundColor: 'var(--mcms-input-bg)',
                                        color: 'var(--mcms-text)',
                                        borderColor: 'var(--mcms-card-border)'
                                    }}
                                >
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {ALL_CATEGORIES.map((c) => (
                                        <SelectItem key={c} value={c}>{c}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className={groupClass}>
                            <Label className={labelClass} style={{ color: 'var(--mcms-text-muted)' }}>
                                <span className="flex items-center gap-1.5">
                                    <FolderOpen className="w-3 h-3" />
                                    Sub-category
                                </span>
                            </Label>
                            <Input
                                value={subCategory}
                                onChange={(e) => setSubCategory(e.target.value)}
                                placeholder="Optional sub-category"
                                className={inputClass}
                                style={{
                                    backgroundColor: 'var(--mcms-input-bg)',
                                    color: 'var(--mcms-text)',
                                    borderColor: 'var(--mcms-card-border)'
                                }}
                            />
                        </div>
                    </div>

                    {/* Image URL */}
                    <div className={groupClass}>
                        <Label className={labelClass} style={{ color: 'var(--mcms-text-muted)' }}>
                            <span className="flex items-center gap-1.5">
                                <Image className="w-3 h-3" />
                                Image URL <span className="text-red-500">*</span>
                            </span>
                        </Label>
                        <Input
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            className={inputClass}
                            style={{
                                backgroundColor: 'var(--mcms-input-bg)',
                                color: 'var(--mcms-text)',
                                borderColor: 'var(--mcms-card-border)'
                            }}
                        />
                    </div>

                    {/* Brand & Unit Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className={groupClass}>
                            <Label className={labelClass} style={{ color: 'var(--mcms-text-muted)' }}>Brand</Label>
                            <Input
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                placeholder="Brand name"
                                className={inputClass}
                                style={{
                                    backgroundColor: 'var(--mcms-input-bg)',
                                    color: 'var(--mcms-text)',
                                    borderColor: 'var(--mcms-card-border)'
                                }}
                            />
                        </div>
                        <div className={groupClass}>
                            <Label className={labelClass} style={{ color: 'var(--mcms-text-muted)' }}>Unit</Label>
                            <Input
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}
                                placeholder="per lb, 500g, 1kg"
                                className={inputClass}
                                style={{
                                    backgroundColor: 'var(--mcms-input-bg)',
                                    color: 'var(--mcms-text)',
                                    borderColor: 'var(--mcms-card-border)'
                                }}
                            />
                        </div>
                    </div>

                    {/* Tag & Badge Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className={groupClass}>
                            <Label className={labelClass} style={{ color: 'var(--mcms-text-muted)' }}>Tag</Label>
                            <Input
                                value={tag}
                                onChange={(e) => setTag(e.target.value)}
                                placeholder="SALE, BOGOF, NEW"
                                className={inputClass}
                                style={{
                                    backgroundColor: 'var(--mcms-input-bg)',
                                    color: 'var(--mcms-text)',
                                    borderColor: 'var(--mcms-card-border)'
                                }}
                            />
                        </div>
                        <div className={groupClass}>
                            <Label className={labelClass} style={{ color: 'var(--mcms-text-muted)' }}>Badge</Label>
                            <Input
                                value={badge}
                                onChange={(e) => setBadge(e.target.value)}
                                placeholder="Best Seller, Featured"
                                className={inputClass}
                                style={{
                                    backgroundColor: 'var(--mcms-input-bg)',
                                    color: 'var(--mcms-text)',
                                    borderColor: 'var(--mcms-card-border)'
                                }}
                            />
                        </div>
                    </div>

                    {/* Rating & Stock Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className={groupClass}>
                            <Label className={labelClass} style={{ color: 'var(--mcms-text-muted)' }}>
                                <span className="flex items-center gap-1.5">
                                    <Star className="w-3 h-3" />
                                    Rating (0-5)
                                </span>
                            </Label>
                            <Input
                                type="number"
                                step="0.1"
                                min="0"
                                max="5"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                placeholder="4.5"
                                className={inputClass}
                                style={{
                                    backgroundColor: 'var(--mcms-input-bg)',
                                    color: 'var(--mcms-text)',
                                    borderColor: 'var(--mcms-card-border)'
                                }}
                            />
                        </div>
                        <div className={groupClass}>
                            <Label className={labelClass} style={{ color: 'var(--mcms-text-muted)' }}>
                                <span className="flex items-center gap-1.5">
                                    <Box className="w-3 h-3" />
                                    Stock
                                </span>
                            </Label>
                            <Input
                                type="number"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                placeholder="0"
                                className={inputClass}
                                style={{
                                    backgroundColor: 'var(--mcms-input-bg)',
                                    color: 'var(--mcms-text)',
                                    borderColor: 'var(--mcms-card-border)'
                                }}
                            />
                        </div>
                    </div>

                    {/* Status & Tier Info Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className={groupClass}>
                            <Label className={labelClass} style={{ color: 'var(--mcms-text-muted)' }}>Status</Label>
                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger
                                    className={inputClass}
                                    style={{
                                        backgroundColor: 'var(--mcms-input-bg)',
                                        color: 'var(--mcms-text)',
                                        borderColor: 'var(--mcms-card-border)'
                                    }}
                                >
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="archived">Archived</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className={groupClass}>
                            <Label className={labelClass} style={{ color: 'var(--mcms-text-muted)' }}>
                                <span className="flex items-center gap-1.5">
                                    <Percent className="w-3 h-3" />
                                    Tier Info
                                </span>
                            </Label>
                            <Input
                                value={tierInfo}
                                onChange={(e) => setTierInfo(e.target.value)}
                                placeholder="-10% @ 10+ units"
                                className={inputClass}
                                style={{
                                    backgroundColor: 'var(--mcms-input-bg)',
                                    color: 'var(--mcms-text)',
                                    borderColor: 'var(--mcms-card-border)'
                                }}
                            />
                        </div>
                    </div>

                    {/* Deal Dates - Conditional */}
                    {(tabId === "flash-sales" || category === "Flash Sale" || category === "Deals") && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-700">
                            <div className={groupClass}>
                                <Label className={labelClass} style={{ color: 'var(--mcms-text-muted)' }}>
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="w-3 h-3" />
                                        Deal Starts
                                    </span>
                                </Label>
                                <Input
                                    type="datetime-local"
                                    value={dealStarts}
                                    onChange={(e) => setDealStarts(e.target.value)}
                                    className={inputClass}
                                    style={{
                                        backgroundColor: 'var(--mcms-input-bg)',
                                        color: 'var(--mcms-text)',
                                        borderColor: 'var(--mcms-card-border)'
                                    }}
                                />
                            </div>
                            <div className={groupClass}>
                                <Label className={labelClass} style={{ color: 'var(--mcms-text-muted)' }}>
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="w-3 h-3" />
                                        Deal Ends
                                    </span>
                                </Label>
                                <Input
                                    type="datetime-local"
                                    value={dealEnds}
                                    onChange={(e) => setDealEnds(e.target.value)}
                                    className={inputClass}
                                    style={{
                                        backgroundColor: 'var(--mcms-input-bg)',
                                        color: 'var(--mcms-text)',
                                        borderColor: 'var(--mcms-card-border)'
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <DialogFooter className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 gap-3">
                <Button
                    variant="outline"
                    onClick={onCancel}
                    className="h-10 px-4 rounded-lg border flex-1 sm:flex-none"
                    style={{ borderColor: 'var(--mcms-card-border)', color: 'var(--mcms-text)' }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    disabled={saving}
                    className="h-10 px-6 rounded-lg text-white flex-1 sm:flex-none gap-2"
                    style={{ backgroundColor: 'var(--mcms-accent)' }}
                >
                    {saving ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Save className="w-4 h-4" />
                    )}
                    {isEdit ? "Update Product" : "Add Product"}
                </Button>
            </DialogFooter>
        </div>
    );
}
