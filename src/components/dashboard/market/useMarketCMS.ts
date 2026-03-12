import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";

export interface MarketProduct {
    id: string;
    name: string;
    price: number;
    category: string;
    sub_category: string | null;
    image: string;
    context: string;
    old_price: number | null;
    unit: string | null;
    tag: string | null;
    tag_color: string | null;
    badge: string | null;
    tier_info: string | null;
    rating: number | null;
    stock: number | null;
    brand: string | null;
    reviews: number | null;
    status: string;
    deal_starts_at: string | null;
    deal_ends_at: string | null;
    created_at: string;
}

export function useMarketCMS() {
    const [products, setProducts] = useState<MarketProduct[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("market_products")
            .select("*")
            .order("created_at", { ascending: false });
        if (error) {
            toast({ variant: "destructive", title: "Database Error", description: error.message });
        } else {
            setProducts(data || []);
        }
        setLoading(false);
    };

    useEffect(() => { fetchProducts(); }, []);

    // Realtime subscription
    useEffect(() => {
        const channel = supabase
            .channel("market_products_changes")
            .on("postgres_changes", { event: "*", schema: "public", table: "market_products" }, () => {
                fetchProducts();
            })
            .subscribe();
        return () => { supabase.removeChannel(channel); };
    }, []);

    const deleteProduct = async (id: string) => {
        const { error } = await supabase.from("market_products").delete().eq("id", id);
        if (error) toast({ variant: "destructive", title: "Delete Failed", description: error.message });
        else { toast({ title: "Deleted" }); await fetchProducts(); }
    };

    const duplicateProduct = async (product: MarketProduct) => {
        const { id, created_at, ...rest } = product;
        const { error } = await supabase.from("market_products").insert({ ...rest, name: `${rest.name} (Copy)` });
        if (error) toast({ variant: "destructive", title: "Duplicate Failed", description: error.message });
        else { toast({ title: "Duplicated", description: `${product.name} copied.` }); await fetchProducts(); }
    };

    const updateStatus = async (id: string, status: string) => {
        const { error } = await supabase.from("market_products").update({ status }).eq("id", id);
        if (error) toast({ variant: "destructive", title: "Update Failed", description: error.message });
        else await fetchProducts();
    };

    const bulkDelete = async (ids: string[]) => {
        const { error } = await supabase.from("market_products").delete().in("id", ids);
        if (error) toast({ variant: "destructive", title: "Bulk Delete Failed", description: error.message });
        else { toast({ title: `Deleted ${ids.length} products` }); await fetchProducts(); }
    };

    const bulkUpdateStatus = async (ids: string[], status: string) => {
        const { error } = await supabase.from("market_products").update({ status }).in("id", ids);
        if (error) toast({ variant: "destructive", title: "Bulk Update Failed", description: error.message });
        else { toast({ title: `Updated ${ids.length} products to ${status}` }); await fetchProducts(); }
    };

    const exportCSV = () => {
        const headers = ["name", "price", "old_price", "category", "sub_category", "brand", "context", "status", "stock", "rating", "unit", "tag", "badge"];
        const csv = [headers.join(","), ...products.map(p => headers.map(h => `"${(p as any)[h] ?? ""}"`).join(","))].join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; a.download = `market_products_${new Date().toISOString().slice(0, 10)}.csv`; a.click();
        URL.revokeObjectURL(url);
        toast({ title: "Exported", description: `${products.length} products exported to CSV.` });
    };

    // Inventory alerts
    const inventoryAlerts = useMemo(() => {
        const critical = products.filter(p => p.stock !== null && p.stock <= 3 && p.status === "active");
        const low = products.filter(p => p.stock !== null && p.stock > 3 && p.stock <= 10 && p.status === "active");
        return { critical, low, total: critical.length + low.length };
    }, [products]);

    // Category stats
    const categories = useMemo(() => {
        const map: Record<string, number> = {};
        products.forEach(p => { map[p.category] = (map[p.category] || 0) + 1; });
        return Object.entries(map).sort((a, b) => b[1] - a[1]);
    }, [products]);

    return {
        products, loading, fetchProducts,
        deleteProduct, duplicateProduct, updateStatus,
        bulkDelete, bulkUpdateStatus,
        exportCSV, inventoryAlerts, categories,
    };
}
