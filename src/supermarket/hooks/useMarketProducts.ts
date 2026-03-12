import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Product } from '../types';

/** Maps a Supabase row → frontend Product type */
function mapRow(row: any): Product {
    return {
        id: row.id,
        name: row.name,
        price: row.price,
        category: row.category,
        context: row.context as 'RETAIL' | 'WHOLESALE',
        image: row.image,
        tag: row.tag ?? undefined,
        tagColor: row.tag_color ?? undefined,
        unit: row.unit ?? undefined,
        oldPrice: row.old_price ?? undefined,
        stock: row.stock ?? undefined,
        tierInfo: row.tier_info ?? undefined,
        rating: row.rating ?? undefined,
    };
}

interface UseMarketProductsOptions {
    /** Filter by context (RETAIL / WHOLESALE). Omit to fetch all. */
    context?: 'RETAIL' | 'WHOLESALE';
    /** Filter by category names */
    categories?: string[];
}

export function useMarketProducts(options: UseMarketProductsOptions = {}) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchProducts() {
            setLoading(true);
            setError(null);

            let query = supabase
                .from('market_products')
                .select('*')
                .order('created_at', { ascending: false });

            if (options.context) {
                query = query.eq('context', options.context);
            }
            if (options.categories && options.categories.length > 0) {
                query = query.in('category', options.categories);
            }

            const { data, error: err } = await query;

            if (cancelled) return;

            if (err) {
                setError(err.message);
                setProducts([]);
            } else {
                setProducts((data || []).map(mapRow));
            }
            setLoading(false);
        }

        fetchProducts();
        return () => { cancelled = true; };
    }, [options.context, options.categories?.join(',')]);

    return { products, loading, error };
}
