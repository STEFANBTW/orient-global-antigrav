import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// For seeding we should use the service role key if possible, but anon key works if policies permit
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// We will bring in the arrays directly from the mock file and components
import { MOCK_PRODUCTS } from './src/supermarket/data/mockDb.js';

// Currently we need to extract other arrays. This file will be appended with the arrays.
async function seedProducts() {
    console.log('Starting seed process...');
    let successCount = 0;
    let errorCount = 0;

    // Insert Mock Products
    for (const product of MOCK_PRODUCTS) {
        const { id, ...rest } = product;
        const { error } = await supabase.from('market_products').insert(rest);
        if (error) {
            console.error(`Failed to insert ${product.name}:`, error.message);
            errorCount++;
        } else {
            successCount++;
        }
    }

    console.log(`Seeding Complete! Successfully inserted ${successCount} products. Errors: ${errorCount}`);
}

seedProducts();
