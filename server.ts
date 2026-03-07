import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Mock Database ---
// We use an in-memory database to simulate the EAV/JSONB structure
// described in the Orient Global Restructure Plan.
const db = {
  divisions: [
    { id: "div_bakery", name: "Bakery", slug: "bakery", theme_config: { archetype: "Warm Organic / Cultural" }, active_status: true, nav_active: true, seo: { title: "Orient Bakery | Artisan Traditions", description: "Organic flour, natural leaven, and time-honored techniques.", keywords: "bakery, artisan, sourdough, lagos", og_image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200" } },
    { id: "div_market", name: "Market", slug: "market", theme_config: { archetype: "Clean Utility / Data Grid" }, active_status: true, nav_active: true, seo: { title: "Orient Market | Abundance at Scale", description: "Sourced directly from local farmers. Premium produce and wholesale.", keywords: "market, fresh produce, wholesale, lagos", og_image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200" } },
    { id: "div_dining", name: "Dining", slug: "dining", theme_config: { archetype: "Dark Luxury / Editorial" }, active_status: true, nav_active: true, seo: { title: "Orient Dining | The Art of the Plate", description: "Curated elegance served daily. A culinary journey from local heritage to continental mastery.", keywords: "fine dining, restaurant, luxury, gourmet", og_image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1200" } },
    { id: "div_games", name: "Games", slug: "games", theme_config: { archetype: "Brutalist / Technical Dashboard" }, active_status: true, nav_active: true, seo: { title: "Orient Games | The Final Frontier of Play", description: "Hardware that doesn't blink. The ultimate competitive gaming and VR arena.", keywords: "esports, lan center, vr games, tournament", og_image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200" } },
    { id: "div_water", name: "Water", slug: "water", theme_config: { archetype: "Atmospheric / Ultra-Minimalist" }, active_status: true, nav_active: true, seo: { title: "Orient Water | The Anatomy of Purity", description: "Water refined through seven stages of molecular purification. Zero Parts Per Million.", keywords: "premium water, reverse osmosis, purified water", og_image: "https://images.unsplash.com/photo-1602143407151-01114195bc03?w=1200" } },
    { id: "div_lounge", name: "Lounge", slug: "lounge", theme_config: { archetype: "Prestige / Immersive Media" }, active_status: true, nav_active: true, seo: { title: "Orient Lounge | The Frequency of the Night", description: "Where sophisticated mixology meets urban culture. An exclusive retreat.", theme_color: "#7209B7", keywords: "vip lounge, nightlife, mixology, exclusive", og_image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=1200" } },
    { id: "div_orient_master", name: "Orient Global", slug: "master", theme_config: { archetype: "Corporate Luxury / Authority" }, active_status: true, nav_active: false, seo: { title: "Orient Global Services | Precision at Scale", description: "We don't just operate businesses. We engineered an ecosystem for luxury and service.", keywords: "corporate, luxury holding, logistics", og_image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200" } }
  ],
  contentBlocks: [
    { id: "cb_1", division_id: "div_bakery", block_type: "hero", content_payload: { title: "Artisan Bakery", subtitle: "Freshly baked goods daily." }, order_index: 0, published_at: new Date().toISOString() },
    {
      id: "cb_games_hero",
      division_id: "div_games",
      block_type: "hero",
      content_payload: {
        title: "LEVEL UP",
        highlight: "REALITY",
        subtitle: "System Online // Initialize Sequence"
      },
      order_index: 0,
      published_at: new Date().toISOString()
    },
    {
      id: "cb_games_tournament",
      division_id: "div_games",
      block_type: "tournament",
      content_payload: {
        eventName: "Warzone Wednesdays",
        prizePool: "100,000",
        teams: 32,
        date: "Oct 25th",
        time: "20:00 WAT"
      },
      order_index: 1,
      published_at: new Date().toISOString()
    },
    {
      id: "cb_games_vr",
      division_id: "div_games",
      block_type: "vr_games",
      content_payload: {
        games: [
          {
            title: 'LAGOS NIGHTS',
            desc: 'Survive the undercity in this high-speed cyber-parkour experience.',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCE4WCbuoUrl9ihyygcdwLIFaiB4J2no4e-n4rpfiQJPK_g5VLVldHkbEggusCRxWFS1md0TP8IX7wH3mgvKWyD6lM67qFKF5KqYIsYPnheBbkh6Ft0Ag3NP6roGGajtiTqUp3KkjnajhVv050uRAp25TKnkR0I7Y6BaFcyhc-6bzs-mFTOvmo5SVtR2kZ25m0cbPH7Sc7GbhY8R6ceAA7bzUykRKBirqKHzYu8mEYjczz2iDAMLrY3IgsDYfzQzRHJDkdMEEgX-IFA',
            tags: ['OPEN WORLD', 'RATED M'],
            color: 'text-[#0df2f2]',
            borderColor: 'border-[#0df2f2]'
          },
          {
            title: 'VOID WALKER',
            desc: "Face your fears in the deep void. Don't look back.",
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPENfCNBzaLIMmAK2r-p3wgMqRwvUWuGEJjSJx9QfORIyrbtq1Wf0lbi2WuZl-o8X9Uqif06vE_vFHKN8ThOXf2vPXg1u79XhZUC0BfsGUx9EQQTmU2guGAPHUwc0B0o24SJ1L3eGS_eEPCzyur80-fyIGZa4lb19LTw-I-r5jwm4d3TOzMQQvY59HWjXfQpqO125z0zhjOf9aH75YDi9EPF2rIgfRhUwwiuR82E_fuYfIBFaV6zS-FCxcGy8Jin66Wk-BXYIhY7Zi',
            tags: ['HORROR', 'MULTIPLAYER'],
            color: 'text-red-500',
            borderColor: 'border-red-500'
          },
          {
            title: 'PIXEL STORM',
            desc: 'Relive the classics in fully immersive 3D voxel environments.',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBLzp4VE-lcqy0kNGx0lXaxgnt72LHWtr72QGbeDr0TUVlAXAIMrVOFm7luq-PtDUntTG-1AXPZ8KmK9H1Knv6VZFqztDDM0pNvmBbn1a-rDoOdCqn__jd-aMKiYA3mnGowGdt5rHaq5Rt7f7H-XYDfLedcgr3WN3qioN5wIoHgWcdNCOhjt3v_UTFSqZMF9XQQ_EDlTSbYmAYUNd8gpDMiweQq8zOHGJN57f-KLDx5wq54Vww6Hc_-qNxPRLdh0_Y1VWQ-E9sC-PD',
            tags: ['ARCADE', 'CLASSIC'],
            color: 'text-purple-500',
            borderColor: 'border-purple-500'
          }
        ]
      },
      order_index: 2,
      published_at: new Date().toISOString()
    },
    // Bakery Division Blocks
    {
      id: "cb_bakery_hero",
      division_id: "div_bakery",
      block_type: "hero",
      content_payload: {
        title: "Artisan \nTraditions",
        subtitle: "Every loaf tells a story of patience and craft. We use only organic flour, natural leaven, and time-honored techniques.",
        est: "Est. 2024",
        cta: "View Today's Menu",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
      },
      order_index: 0,
      published_at: new Date().toISOString()
    },
    {
      id: "cb_bakery_products",
      division_id: "div_bakery",
      block_type: "products",
      content_payload: {
        categories: ["Artisan Bread", "Pastries", "Cakes", "Gluten Free"],
        items: [
          { name: "Sourdough Boule", price: "$6.50", desc: "Fermented for 48 hours", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9t68yp7eD8EbfgYgN8yPh9E8fINlAf8HuLVVnTGvCD3qUc3e23T2JGun-nJP6bXRoxLvgVjcWe2ClNCdUfBufe8QcXHwnZ0OciLkZ2N8bdRmt7B9LTt6rLvk-_tylwPFTYz_ay5m83naj88w2Akuwsll5wPjike46V0BokthCbRAbULhpwLdNLYdHnfjENioDCvo1aACWNopQHcbPVAEijcfvPbTyxzofDhri5y9sDrddVVqSTvw8ukWK0tOl0fcMlOG7g3KUJAbH" },
          { name: "Pain au Chocolat", price: "$4.25", desc: "Rich dark chocolate", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCM8pKrsve-Hsj7bZJX1-9KlNRvoCWYl5G6DUmCpAQ9ePX3MZYAukyMkkQi9J0Np11wBcyHAedNaXlJ-csKMnP19WqZ21uNCFRLONd0iE8bn69EmHwUpWN7-xL3oj_ob-LsHtqc6km408cTMkvKqR2MuFlSDGyXY7j7I6YUgRTzsVuffaztzdRmCOTusY4AFpDCl5H1w0d9WR06Mb7t7B7X9TOGxGqDjaAhUI0fUjEJ3RrPUOVHwqshuARGhgZcO1uyuNpfEjzHW0H3" },
          { name: "Olive Focaccia", price: "$5.75", desc: "Rosemary & sea salt", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhQ-F9wusQ9tYzEARZ75JEBmmbjYOJu1BPLTcPrMezcQ5TrNe8SNrjrcDPKa3XtCkPk66CN3k5EaTyyLF5HE_aGWcM0oIXoaA3R0UoGUQplQhC7Rydzywu5-D6unPylNBeUdZRrGNm5WoxbBD_F9uiK38tOuKVjmmh1J7ftouqXh1TP3HtSIfozaVNzjcZx9h7xGSinlUY6Tqkm-vFBrA9EwTQ987rV052t1YVhPHwOI0NZ0rj9r7EoufEqGU4d-YqY7H5Voh5uYhc" },
          { name: "Almond Croissant", price: "$4.75", desc: "Toasted almond flakes", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdtvcfnlP4Iieg3vcHqItD-0FtFjLHCmUns6ze42h8qXWFbF2e_i3VUn56MPO8V6qcg-YYqZHxOkRiOBmAtL7pEIuUn3KAIR9r1KN_hUU68wBE6A1obJ4mWq3pnE2PFvxCTfU_53_oVzfhEds4gxVjOMq_ey0J3EB2l9xHgUED2QHTd3vIQdIQxAwWAHeq8QTUXWbNDX8Qhu3NjybSYegFz7QB1CV-whWjtHCRXo8nMNncMP_FpKsgEZLS6uw_XPA7VBTdY36tqSaC" },
        ]
      },
      order_index: 1,
      published_at: new Date().toISOString()
    },
    // Market Division Blocks (Produce & Deals)
    {
      id: "cb_produce_hero",
      division_id: "div_market",
      block_type: "produce_hero",
      content_payload: {
        title: "Farm to Table",
        subtitle: "Sourced directly from local farmers in Jos.",
        stats: [
          { label: "Fresh Items", value: "120+" },
          { label: "Local Farms", value: "15" },
          { label: "Organic", value: "100%" }
        ]
      },
      order_index: 2,
      published_at: new Date().toISOString()
    },
    {
      id: "cb_produce_bestsellers",
      division_id: "div_market",
      block_type: "produce_bestsellers",
      content_payload: {
        items: [
          { id: 'p1', name: "Fresh Spinach", price: 500, unit: "bunch", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_QO4YyqP0qXoPz8rWqU2tV9sQ4xR3yM6nO1lA2bC5dE8fG9hI0jK3mL4nP5oQ6rS7tU8vW9xY0zB1cD2eF3gH4iJ5kL6mN7oP8qR9sT0uV1wW2xY3zA4bC5dE6fG7hI8jK9lM0nO1pQ2r", rating: 4.8, reviews: 120 },
          { id: 'p2', name: "Red Tomatoes", price: 1200, unit: "kg", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnmhadoCVKHfYOfzPDp4J-6pCxjbZzTpGP75Vr_EksxMx5s-niabV7JQ0xEJAGhT6JS3uI5vilRbeFyK2EZzgvV2tCNaDGuY3AUvcd-1qmWdnf_UTBwWXlavafUaKatDnX2FVp60K_6UujA-_6AQVuHME2tSYnvfAGbqOh-74zdGtg6ddQmlBGHxLRQwJBGzO3cc0woi5qtRnAAH41xL31J5tx7UGTq9Adz2r-cl9V4BEIC4ZxsSZ_kPlJiju2gk4htfJnj3ppuzqM", rating: 4.5, reviews: 85 },
          { id: 'p3', name: "Sweet Bell Peppers", price: 800, unit: "pack", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAy-0oAZwao1WLSGC1VOrJQiwBj2NdVwZwk_gKQ4h0qNkUtaiLlYvlLil9HpoiZwlVYxQvQrPfv5-1T2QzdZGzCd7Cm6lM5g1Al6rY0AywjjIOSDxWuYyz-0ndrekG7hbkthiLq7vtP45MM7_Qruw26H5NiebjBTsMEKsemr6RsI3u64DiGKTEGl9IVvhrKExsG72Nbg-CafUrhMa7UY_DkkNwZktYjKJNlc-oezyiZxRkYH6WCgyRSTLMC4iFrZ50KgVI0RF5ZAwgm", rating: 4.9, reviews: 200 },
          { id: 'p4', name: "Organic Carrots", price: 600, unit: "bunch", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6UWHxlzXZ1fZ6YGBbT37L0xAuHSyG5BhZ9bwse3VDii426hr7S1c-HfyAe8e3yQ8NcDRTOXKRjo2Ufc3wc29_OSrYxO_MyJnBz_QS_HpxZUhr0N7aVtOYPSu8UR1hbVvS8J0cHecXDYljfh3DPNefV4iskMSlS7IXlsjbtCi2JYOlqt8iy0T-eLiVLfpWjmZHuJEmLkOm-Yw_J_jXwPk_uDmK3oH1SNX-lFqxu5AS_FVr7ddDLdjxkcHQ-qQDtQQknzrvfpaDEBi0", rating: 4.7, reviews: 150 }
        ]
      },
      order_index: 3,
      published_at: new Date().toISOString()
    },
    {
      id: "cb_produce_specials",
      division_id: "div_market",
      block_type: "produce_specials",
      content_payload: {
        items: [
          { name: "Bell Peppers 3-Pack", price: 3.49, oldPrice: 4.99, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAy5F7r7nePXG8NGmud1dxusITHs1bRYNvfGzKrcUSEPjPV0GbGAMBqixMsfkL6TkW74AsW3tc7pJCjlGtaAQ2O5T4edOomLl_ykdtZnOnEAeyWUpdmdbX36IzAldPswOVOVzmhGMDEvNFx5b9fZLw6IVxwD5AhUOlXfc3rYdymdbEvx9gf3X7jVpgigl4Z57qkg71ujGDet2pzwYUARpf42UIzcWU2kRB97YI6dSHFyM2Y1UWh9n5YMetQqLZgsoR9dnz0nEG2x_e" },
          { name: "Baby Carrots", price: 0.99, oldPrice: 1.99, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAziwwU98hSNZgMjvSEn-w4umS-8oOsp543BDdcP20dv008vBlNE12K8D0YgncHiFTWuPeKix1OhOmHxB5jKZA_TsxHrc7g_V4LO43PD1f2urJHGIRUiN32GlMo6CGti3YQ31OSMuwnf3oqKn8kIVgqtpEOdS7aTScqQLpwiF4psGuZOLk9w5u23TeWwTLdt0HjeBojUqc5nuvF3h1NhSu3kBMyL6Cq6VIWK7YqW8hyY0BcRTu4AWv4y9RX-8q72WGjz-bInNkf5eGp" }
        ]
      },
      order_index: 3,
      published_at: new Date().toISOString()
    },
    {
      id: "cb_deals_hero",
      division_id: "div_market",
      block_type: "deals_hero",
      content_payload: {
        title: "FLASH \nDEALS",
        subtitle: "Up to 70% OFF on select items.",
        tag: "Limited Time Offer",
        endTime: new Date(Date.now() + 86400000).toISOString() // 24 hours from now
      },
      order_index: 4,
      published_at: new Date().toISOString()
    },
    {
      id: "cb_deals_bogof",
      division_id: "div_market",
      block_type: "deals_bogof",
      content_payload: {
        title: "BOGOF Madness",
        items: [
          { name: "Italian Penne Pasta", price: 3500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXHoapzHeb1VAPEs6czxDQyvWwduFy91nT-Drp_8nE1SyGtHCVjAT37yLzElXag6I_iuWbvvn3rXicnFwJbZK6_saydnAr5JMl2ZAbbt-npsIKEgbZlIicshunGdLBZqV_jllJM0yZfx0ST0DcjCV9quCoxmCTuc9rl_YY47qHdhClvIqTI4MUOXqUj_YG6igsq_Y8vTNSDMW6Ns8hfeTHBVkeso2GuVsE71yVuNPrxLnmZquU1I4cQrwmOV35Ph63vhNswuB0XPz5" },
          { name: "Crunchy Honey Oats", price: 8500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXBjKg17kvDr-yZMkA48mT0lE3Xbt4JdLlpvYBXczFNBE8tetypNpxK63qyjbo4BD1q7hYNuYBuXyMnKAmdoBoJCHc3e2XEt0Zxt-1NnRMUgN4tF6M_wz5k5IglIfb5d4EYamk02-tYZmmgkrA28peT1TUqjZXXfvLB-oSob3KJSxcD_RfV2blGe4UojAy4kFgp1y40sZ_iFVNBwcE7BKn-rn_rz2ktAJ5suXl3yfKQMD0MpkzqBKZss6ejH4UDb406R4XbWhVPPm1" },
          { name: "Basmati Royal Rice", price: 12000, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJz7jDkUIg86_TDT-v0KLZPgAO2-9V1pv3RjvCTMcP2qbT01BI4V3idRe0PEcz_r2vmzFKmQW5NV-pJfbSy0LMvmpvLfACa4XrwDwqL2fvs6fl9xW0L1Q27K054mIGVnFLCOm7AqHdPBsT9eNLpjf36h9OOcJmFoPEdqwlT56Xwub4ZPB-teHtwt-C8wf2BBFKqb8E6dI8mO-Xr4rA3uX8GxYHVFrJHBhsOSIkago-Lg7IVnpVJixqjiUQ5VarxA96fq1-7BKGuqEM" },
          { name: "Napoli Pasta Sauce", price: 4500, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPS-DzsRxxDMIbFUppQkGvVi5uAk3JOnX_sonuAN2jiZ4kKJ0z8iWrWheNqy499jUiN_4J6mqQ9CmhzWJv4nsTQxiUOeEiBXjLf3_O8qZVzKlfGBMaSQG8mW496ppb1IslRyL3FtzHdTYmTwDBtc0bWKPiLG9_eoYO4Y04sTabgnC2ZL-pFuBlWdnRLMwtbztRHsLO4dmcKkcxuPnQTRWAmxQhnsb2VfigD6R8k58is0rkwXEcSDDwQ30Jcvv31OSqejf7o7vDjLRB" }
        ]
      },
      order_index: 5,
      published_at: new Date().toISOString()
    },
    // Water Division Blocks
    {
      id: "cb_water_hero",
      division_id: "div_water",
      block_type: "hero",
      content_payload: {
        title: "Purity in every drop.",
        subtitle: "Experience water refined through seven stages of molecular purification. Traceable quality, delivered to your door."
      },
      order_index: 0,
      published_at: new Date().toISOString()
    },
    {
      id: "cb_water_products",
      division_id: "div_water",
      block_type: "products",
      content_payload: {
        items: [
          { id: '1', name: '75cl Premium', description: 'Water Bottle', price: 150, image: 'https://images.unsplash.com/photo-1602143407151-01114195bc03?auto=format&fit=crop&w=400&q=80', volume: '75cl' },
          { id: '2', name: '50cl On-the-Go', description: 'Bottle', price: 100, image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=400&q=80', volume: '50cl' },
          { id: '3', name: '19L Dispenser', description: 'Refill', price: 1200, image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=400&q=80', volume: '19L' },
          { id: '4', name: 'Sachet Pack', description: '(20pcs)', price: 300, image: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=400&q=80', volume: '20pcs' }
        ]
      },
      order_index: 1,
      published_at: new Date().toISOString()
    },
    // Dining Division Blocks
    {
      id: "cb_dining_hero",
      division_id: "div_dining",
      block_type: "hero",
      content_payload: {
        title: "Taste the Orient",
        subtitle: "A culinary journey from the vibrant markets of Jos to the heart of fine dining. Experience the soul of local heritage and continental mastery."
      },
      order_index: 0,
      published_at: new Date().toISOString()
    },
    {
      id: "cb_dining_menu",
      division_id: "div_dining",
      block_type: "menu",
      content_payload: {
        local: [
          {
            title: "Egusi & Pounded Yam",
            price: "₦8,500",
            desc: "Melon seeds ground by hand, cooked with Ugu leaves sourced fresh daily. Served with fluffy pounded yam.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsmge_bfRyIGopUVEnS6shdZ9SeZEVyWB85cTrbhNVkDXahcYX09WiAmbgLkavPK43j8znzWlzlAT5XgUFb_pzpD_BGWVf3GHam1gbEJg4z9Qes36I2I3tlfgjxAu9SiZMBJlHEeN2QAgty4ARBBBfRTbiVZR1OhS5FDQ5qT9RBA0B2S6nNZheVCUEPNxvQ72uyvph42b2zT75OtODqHLay0gMqK1Xgssion7PmxRT6DFnvg5UnbwQCybLPSW2QWs8HmsapjBithVj"
          },
          {
            title: "Goat Meat Peppersoup",
            price: "₦6,000",
            desc: "Spicy and aromatic.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJp9HQEPf5o-T9Y1Bn6xTr3JK2mRg7j9LApCBSqWQaKS2wHDuZmId-PvTjCuxWv50FMIoemhW-n8gjizDI1xKOTfg1UbZwRyEDHudHJpih1oi1MzW9n0_F_1v15Y5ij68CRv1VxHsK0ovjOvq-miamYh-YZyOk3LkJOc-NhhxLAFE6T5EPIUF2izicAntaXgnhJHgYBuNx0m9PGclMaDuR67yIafAltPIvLf246-RFj-CUuCQH2IxQ4pVvYhKBOtXFzZxn_ueZQGtD"
          },
          {
            title: "Amala & Ewedu",
            price: "₦7,500",
            desc: "Classic Yoruba dish.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwUi_mtMYqNSDZq97aHbzfrDEDEhm-6K9Yv5QhPUQYq2Bohni2LPtPPJXcAHrOFYQ_7ZZaOQSIDm_dvT-f6sSnJbtJcSCU86FWANTgaQv3IRC9Z-m9jfhjCPwm4P_to0FHYttIXgWltiLE6Nb6W3TEPl1HDtbpMJ633TDnIxCVK7dbWOj4UlGj0kILGsqLXn-sdM-r_HE-i04F7tAJzJES1U8m_BLkOK3Qp734lMlLoG9q40oRxVRIwAFm0B6vxNlgxx-9cK2wQAhd"
          }
        ],
        continental: [
          {
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJap3fXE_-LAdH0QfaiTF2r9Py-7tNLD6ssInL-l-OIHDOTdDNQmdeb21Jk1ZXB_lkOmUy5bPvBNydSpECvm8URH4_JFuNP8mDicaPWGPY5avGORluHwh6ydn6a9h_fW5VgyTMEyLr64_ibMPbEAXI2c8O9ydslkWlmffsMiJPj5zKsxcgm2E149UrlRE5BxM2iqQ8Br234suzM_8cF7wShsHg4yKIYwSlOZhwlRBRXs9sDkpV3u63NWKEegv9TaG9r4r_peoDQYV7",
            tag: "Steakhouse",
            title: "Ribeye Steak",
            desc: "300g Prime Cut, Garlic Butter, Seasonal Veg.",
            price: "₦22,000"
          },
          {
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtnYwGAiRuz3K0IZDApQ91sRhp_bVlAaK5AyOO4WTEAwzlyvkBeDiz3f57mE4A9Usz0y-wca4GiU0x3wlj_uen1is7aL4_fRZy7kd0O-fXZTOs6tu5cO8-4eVMYd8qsv-sArW0ui8ekVR1bXnAmA65MHH-P1aToZhY28-T06AbFsQJ30DRnqGmCB-VYqqmPCykDhsyE1mMwBeEzscQ9A6ux5otmjQyAAH5cOKuVV_CMh5pQybHO0FWG67R1tqbRMNSZqQ7ywBrsh6r",
            tag: "Pasta",
            title: "Truffle Alfredo",
            desc: "House-made Fettuccine, Parmesan Cream, Black Truffle.",
            price: "₦14,000"
          },
          {
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1M4xE404bzpC55LlH_3ZUuI9bIqzWkvdTZ_0BwGqFyKwViKcWAzV3KISCmFMPykOqOlQ2kFnp2sI8obLd-VjRoae5ZkCtUYjzdkC9wdwRGKzaP6NvUvm-KpUGboOTCa00yKhmBD1WDmFNzFvkWtTMwA9TT1gdg3V-0wmT4jDNxy82JxEX9IKyhQxlOXCQMj3QCf9z2RNsuL7DBwn-EPheswG5gsc6P-ZNeLr_0VWvh0V-HgSFlSESOWEHUh-qd9LCulpOvV2Lela8",
            tag: "Pizza",
            title: "Margherita D.O.P",
            desc: "San Marzano Tomato, Buffalo Mozzarella, Fresh Basil.",
            price: "₦9,000"
          },
          {
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-FJz5l7GHKKr8o7BXlzawS-L0N7477ODshk732bkaj00La7y3200flRI9rNYPekcS_k3qfb7rM7rOaYK24-tbw9Lpnig3N9p5SZEstwqPPyKtZcMjN_jhBXFTE-b3Zz7_J0p38DopCNAt1bFKp9fBIxp_dmpPLKrHi7WFJ1Rcq5kOKnUJ-bUuuO9soD7BC3PnDYoW7kxaQbTa4hxX7BUWa1xBZJ-f9rMpeSG900Ug9wm7JggEDOa7YWU5B5LrxpRUiuYin-mE0OkY",
            tag: "Grill",
            title: "Lamb Cutlets",
            desc: "Mint Jus, Mashed Potato, Charred Broccolini.",
            price: "₦24,000"
          },
          {
            image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop",
            tag: "American",
            title: "Gourmet Burger",
            desc: "Double patty, brioche bun, aged cheddar, secret sauce.",
            price: "₦8,500"
          },
          {
            image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=2070&auto=format&fit=crop",
            tag: "Seafood",
            title: "Pan-Seared Salmon",
            desc: "Atlantic salmon, lemon butter sauce, asparagus.",
            price: "₦21,000"
          }
        ],
        grill: [
          {
            title: "T-Bone Steak (500g)",
            desc: "Best of both worlds, served with pepper sauce.",
            price: "₦28,000"
          },
          {
            title: "BBQ Pork Ribs",
            desc: "Slow cooked for 6 hours, glazed with honey BBQ.",
            price: "₦18,000"
          },
          {
            title: "Grilled Lobster Tail",
            desc: "Garlic butter, herbs, served with rice.",
            price: "₦35,000"
          }
        ],
        drinks: [
          {
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqLpHNswKiH96bwbRUdeuFdiJR9bKeq6i1_BsTGiZJNbUi61oDtJxHZa2jzUqBGgAIbbkxRqMRP5_Kfysc8NTHdggFZKP3Y_pqtHsQh0lAeeXDSCnGkb-jeKtnwG-lDapHGrRpo413J6nyJepnvqsQlVpfeLmHeeCOChbCl8IJbhLM3Ac1c1-_wInQw66b3xoSAT1f6O7U4AXHXLCYm9aPyMC62ATOYNCrrBMS75rXbfLxdJg3eGJN5i2McSE-GPSTBr8RXiXLddDV",
            title: "Zobo",
            type: "local"
          },
          {
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDF7XYzUwLvNjamGS4zRiLfYW-TjEXWH9CFiPzXPm6vXZ13pSLogceueZd3vGIJIpaTK-wvqr4en_OQMT6DCjk7EBlu3oJnSL1SotWlEE6qLMkKuiWXcwUp94OxJkFSDmzWe9YtPV_uOsEJsUhrObY5V1ez5To7quHLqTDtoEy6zMO4KStZXo-zohuuuzOZct7MuyS6yOibBAwZV96CGys8dQQUbgHBtY5D8CxZrEPaAYbyXADsbplAVSLvRlBgbvB3_W-A9bXhQ6ST",
            title: "Kunu",
            type: "local"
          },
          {
            image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop",
            title: "Mixology",
            type: "alcoholic"
          },
          {
            image: "https://images.unsplash.com/photo-1474722883778-792e7990302f?q=80&w=2137&auto=format&fit=crop",
            title: "Cellar",
            type: "alcoholic"
          }
        ],
        desserts: [
          {
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIAE5nhwgemaBaagT8RvyfAo6CEqxaWHux1zbCvcoQGKZbnC7eH76j5K8P0IEzrHbql7YgCX0Dgj0sg3XUTimuFiYC2cllzIlVILzogFoggAJESKGsZs1qTE7MvM30tbCCtQymdhMcGHI2Y4_816GmRBjESXdWCHTH0GneUKNNwg4Ftpfldde4Gp2HbCabcNjUX7eMCwueNdcJVR1rUDBsDYhMDXRN8mHU9ZmlC9BD3Hzm_17YoRnxaKrn5LZMTX2bZFaEyf7k9GEB",
            title: "Signature Puff Puff",
            desc: "Drizzled with honey butter and cinnamon dust. Soft, airy, and warm.",
            price: "₦2,500"
          },
          {
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnFqo-v6kZfqipNB5nC5yneiUtxa8cna3MaLnQvQisVW2dR2UXKrQd1SLlkyiBIIsP5HtavjkXOz7YOC4tqU8wdx0klikVHfSKt9WAP-hMuJjwG7U1YnOLW4vESKUSjZhYfq7tpVynKI8tVZJ7rRzwsXoFnOeBqyK0kvyksb3iuYliyh9gP42TNo5TIkBT88hE1URaJa0IarX8WfaOm1EY4AO8-KZVSbfSkksAJL_j-OJFIWvVwIpxZuCG-Epi_dohhaTCgJr3amwQ",
            title: "Molten Chocolate Fondant",
            desc: "Dark chocolate cake with a gooey center. Served with vanilla bean ice cream.",
            price: "₦4,500"
          },
          {
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1elPEEd-FyXNncj6d3DeLNcTQuYYpMondzTci2gShfrirvR9vu2IgveCfBCwKZB_AuEv5-Joo-PJBL77G__EmUjrrVL0nqH9cIWugYMtg02Ny_MKpdTX-k-s4jvTwieCxmrAIcHx0gMLTurhRglOtdW1w1wOmAnHyhUjhlrr-TVd85gpmLUkZev5eG6wqKo6wxOqObfh6Kvbku_H81D_td6H98ypqyjcs--TkmVeVqVA1wnmliEc8uP0TJ8VC0hiLHXmGTXLQ8y2K",
            title: "Jos Meat Pie",
            desc: "Flaky pastry filled with minced beef, potatoes, and carrots.",
            price: "₦1,500"
          },
          {
            image: "https://images.unsplash.com/photo-1551024601-564d6e68e21d?q=80&w=2070&auto=format&fit=crop",
            title: "Cheesecake",
            desc: "Classic New York style with a berry compote.",
            price: "₦3,500"
          },
          {
            image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=2070&auto=format&fit=crop",
            title: "Fruit Platter",
            desc: "Seasonal tropical fruits served with a honey yogurt dip.",
            price: "₦2,000"
          }
        ]
      },
      order_index: 1,
      published_at: new Date().toISOString()
    },
    // Market Division Blocks
    {
      id: "cb_market_hero",
      division_id: "div_market",
      block_type: "hero",
      content_payload: {
        slides: [
          {
            id: 1,
            tag: "SEASONAL",
            title: "Freshness\nRedefined.",
            desc: "Get the season's best produce delivered straight to your door. Back to School bundles now 20% off.",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAy-0oAZwao1WLSGC1VOrJQiwBj2NdVwZwk_gKQ4h0qNkUtaiLlYvlLil9HpoiZwlVYxQvQrPfv5-1T2QzdZGzCd7Cm6lM5g1Al6rY0AywjjIOSDxWuYyz-0ndrekG7hbkthiLq7vtP45MM7_Qruw26H5NiebjBTsMEKsemr6RsI3u64DiGKTEGl9IVvhrKExsG72Nbg-CafUrhMa7UY_DkkNwZktYjKJNlc-oezyiZxRkYH6WCgyRSTLMC4iFrZ50KgVI0RF5ZAwgm",
            bg: "from-black/70 to-transparent",
            btn: "Shop Bundles",
            navTarget: 'Deals'
          },
          {
            id: 2,
            tag: "WHOLESALE",
            title: "Bulk Savings\nBig Profits.",
            desc: "Exclusive wholesale pricing for registered partners. Stock up on rice, grains, and pantry staples.",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6UWHxlzXZ1fZ6YGBbT37L0xAuHSyG5BhZ9bwse3VDii426hr7S1c-HfyAe8e3yQ8NcDRTOXKRjo2Ufc3wc29_OSrYxO_MyJnBz_QS_HpxZUhr0N7aVtOYPSu8UR1hbVvS8J0cHecXDYljfh3DPNefV4iskMSlS7IXlsjbtCi2JYOlqt8iy0T-eLiVLfpWjmZHuJEmLkOm-Yw_J_jXwPk_uDmK3oH1SNX-lFqxu5AS_FVr7ddDLdjxkcHQ-qQDtQQknzrvfpaDEBi0",
            bg: "from-blue-900/80 to-transparent",
            btn: "Go to Portal",
            navTarget: 'Wholesale'
          },
          {
            id: 3,
            tag: "BAKERY",
            title: "Oven Fresh\nDaily.",
            desc: "Our artisan breads and pastries are baked fresh every morning. Smell the difference.",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnmhadoCVKHfYOfzPDp4J-6pCxjbZzTpGP75Vr_EksxMx5s-niabV7JQ0xEJAGhT6JS3uI5vilRbeFyK2EZzgvV2tCNaDGuY3AUvcd-1qmWdnf_UTBwWXlavafUaKatDnX2FVp60K_6UujA-_6AQVuHME2tSYnvfAGbqOh-74zdGtg6ddQmlBGHxLRQwJBGzO3cc0woi5qtRnAAH41xL31J5tx7UGTq9Adz2r-cl9V4BEIC4ZxsSZ_kPlJiju2gk4htfJnj3ppuzqM",
            bg: "from-yellow-900/70 to-transparent",
            btn: "View Bakery",
            navTarget: 'Bakery'
          },
          {
            id: 4,
            tag: "DRINKS",
            title: "Quench Your\nThirst.",
            desc: "From sparkling water to premium wines. Refreshment delivered in minutes.",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6yO9YpD7WzXoPz8rWqU2tV9sQ4xR3yM6nO1lA2bC5dE8fG9hI0jK3mL4nP5oQ6rS7tU8vW9xY0zB1cD2eF3gH4iJ5kL6mN7oP8qR9sT0uV1wW2xY3zA4bC5dE6fG7hI8jK9lM0nO1pQ2r",
            bg: "from-purple-900/70 to-transparent",
            btn: "Shop Drinks",
            navTarget: 'Aisles'
          }
        ]
      },
      order_index: 0,
      published_at: new Date().toISOString()
    },
    {
      id: "cb_market_deal",
      division_id: "div_market",
      block_type: "deal",
      content_payload: {
        product: {
          id: 'deal-coffee',
          name: 'Premium Arabica Coffee Beans (1kg)',
          price: 12990,
          category: 'Beverages',
          context: 'RETAIL',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1wZpJFJka3FlypGKUsr0BoyDreoSK1yO0HNItuIXwL45jTS5sMWtJDX0xA05wzVKWEcdMe1SOjWb69PBje0fItEcORGH36VHdOesDWcLXtQBkh8La1nnsZScU27G8OcoTKxo7cd4zC8zzD1znfAXSzlVSQq57xNupl-rWunYkpDK1Y_BCzhN_AD2ML0NXdxUY6-hQUG9tyuCXWZ-Q-S4_Aqh-WhDlYgbDQE7EKXAWmmlxMZcK9DNUkIa8eQkEjH15ny70tqJDUwlo'
        }
      },
      order_index: 1,
      published_at: new Date().toISOString()
    },
    // Lounge Division Blocks
    {
      id: "cb_lounge_hero",
      division_id: "div_lounge",
      block_type: "hero",
      content_payload: {
        title: "Velvet Nights",
        subtitle: "Where sophistication meets urban culture. An exclusive retreat for the discerning palate.",
        backgroundVideo: ""
      },
      order_index: 0,
      published_at: new Date().toISOString()
    },
    {
      id: "cb_lounge_menu",
      division_id: "div_lounge",
      block_type: "menu",
      content_payload: {
        categories: ["Signature Cocktails", "Bottle Service", "Small Plates"],
        items: [
          { name: "Velvet Negroni", price: "₦8,500", desc: "Our signature twist on the classic, aged in oak barrels.", category: "Signature Cocktails", image: "" },
          { name: "Zobo Spritz", price: "₦5,500", desc: "Hibiscus-infused aperitif with prosecco and orange peel.", category: "Signature Cocktails", image: "" },
          { name: "Dom Perignon", price: "₦250,000", desc: "Vintage Champagne, table service.", category: "Bottle Service", image: "" },
          { name: "Hennessy XO", price: "₦180,000", desc: "Premium cognac, served on crystal.", category: "Bottle Service", image: "" },
          { name: "Truffle Fries", price: "₦6,000", desc: "Triple-cooked with parmesan and truffle oil.", category: "Small Plates", image: "" },
          { name: "Wagyu Sliders", price: "₦12,000", desc: "Miniature wagyu beef burgers with caramelized onion.", category: "Small Plates", image: "" }
        ]
      },
      order_index: 1,
      published_at: new Date().toISOString()
    },
    {
      id: "cb_lounge_lab",
      division_id: "div_lounge",
      block_type: "lab_drinks",
      content_payload: {
        drinks: [
          { id: "lab-1", name: "Zobo Infusion v2", status: "testing", teaserText: "Hibiscus meets cold nitrogen.", themeColor: "#FF00FF", animationSpeed: "pulse" },
          { id: "lab-2", name: "Palm Wine Redux", status: "featured", teaserText: "Traditional palm wine, molecular gastronomy style.", themeColor: "#FFD700", animationSpeed: "slow" },
          { id: "lab-3", name: "Lagos Midnight", status: "testing", teaserText: "Activated charcoal, espresso, dark rum.", themeColor: "#1a1a2e", animationSpeed: "rapid" }
        ]
      },
      order_index: 2,
      published_at: new Date().toISOString()
    },
    {
      id: "cb_lounge_events",
      division_id: "div_lounge",
      block_type: "events",
      content_payload: {
        events: [
          { id: "evt-1", name: "Jazz Fridays", description: "Live jazz ensemble every Friday from 9PM.", date: "Every Friday", image: "" },
          { id: "evt-2", name: "Whiskey Masterclass", description: "Learn the art of whiskey tasting with our sommelier.", date: "March 15, 2026", image: "" }
        ]
      },
      order_index: 3,
      published_at: new Date().toISOString()
    }
  ],
  mediaAssets: [
    { id: "dam_pdf_1", filename: "dining-menu-v2.pdf", size: "2.4MB", active: true, type: "pdf", url: "/assets/dining-menu-v2.pdf", downloads: 142 },
    { id: "dam_svg_1", filename: "orient-brand-kit.zip", size: "18.1MB", active: true, type: "archive", url: "/assets/orient-brand-kit.zip", downloads: 890 }
  ],
  weeklyUpdates: [],
  announcements: [
    { id: "ann_1", text: "Grand Opening Special: 20% off all services this week!", active: true, semantic_token: "Success Green", target_route: "global", active_until: new Date(Date.now() + 86400000 * 7).toISOString() },
    { id: "ann_2", text: "Buy 1 Get 1 Free Croissants - Today Only!", active: true, semantic_token: "Brand Orange", target_route: "/bakery", active_until: new Date(Date.now() + 86400000).toISOString() }
  ],
  // Global site settings — editable from CMS
  globalSettings: {
    policies: {
      privacy_policy: "Orient Global Services takes your privacy seriously. We collect minimal data rigorously required for transactions and analytics...",
      terms_and_conditions: "By using any Orient division service, you agree to our comprehensive logistics and purchase terms...",
      refund_policy: "Perishable goods from the Bakery and Market divisions cannot be returned once delivered...",
      cookie_policy: "We use strictly necessary cookies to manage session states and shopping carts..."
    },
    crmRoutes: {
      wholesale_inquiries: "logistics@orient.com",
      vip_reservations: "concierge@orient.com",
      general_support: "support@orient.com",
      careers: "careers@orient.com"
    },
    navigationMatrix: [
      { id: "nav_water", label: "Water", route: "/water", active: true, nested: [] },
      { id: "nav_bakery", label: "Bakery", route: "/bakery", active: true, nested: [] },
      { id: "nav_market", label: "Market", route: "/supermarket", active: true, nested: [] },
      { id: "nav_dining", label: "Dining", route: "/dining", active: true, nested: [] },
      { id: "nav_lounge", label: "Lounge", route: "/lounge", active: true, nested: [] },
      { id: "nav_games", label: "Games", route: "/games", active: true, nested: [] }
    ],
    homepage: {
      heroTitle: "Welcome to Orient",
      heroSubtitle: "Experience the pinnacle of luxury and service.",
      announcement: {
        active: true,
        text: "Grand Opening Special: 20% off all services this week!"
      }
    },
    about: {
      mission: "To redefine luxury and service in every interaction.",
      story: "Founded in 2024, Orient has grown from a humble bakery to a multi-faceted lifestyle brand encompassing dining, entertainment, retail, and wellness.",
      values: ["Excellence", "Integrity", "Innovation"]
    },
    contact: {
      email: "contact@orient.com",
      phone: "+234 800 ORIENT",
      address: "123 Luxury Lane, Victoria Island, Lagos",
      social: {
        twitter: "@orient_ng",
        instagram: "@orient_ng",
        linkedin: "Orient Group"
      }
    },
    footer: {
      copyright: "© 2026 Orient Global Services. All rights reserved.",
      tagline: "Luxury. Redefined."
    }
  },
  products: [
    { id: 'p1', name: "Fresh Spinach", price: 500, unit: "bunch", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_QO4YyqP0qXoPz8rWqU2tV9sQ4xR3yM6nO1lA2bC5dE8fG9hI0jK3mL4nP5oQ6rS7tU8vW9xY0zB1cD2eF3gH4iJ5kL6mN7oP8qR9sT0uV1wW2xY3zA4bC5dE6fG7hI8jK9lM0nO1pQ2r", category: "Produce", stock: 50 },
    { id: 'p2', name: "Red Tomatoes", price: 1200, unit: "kg", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnmhadoCVKHfYOfzPDp4J-6pCxjbZzTpGP75Vr_EksxMx5s-niabV7JQ0xEJAGhT6JS3uI5vilRbeFyK2EZzgvV2tCNaDGuY3AUvcd-1qmWdnf_UTBwWXlavafUaKatDnX2FVp60K_6UujA-_6AQVuHME2tSYnvfAGbqOh-74zdGtg6ddQmlBGHxLRQwJBGzO3cc0woi5qtRnAAH41xL31J5tx7UGTq9Adz2r-cl9V4BEIC4ZxsSZ_kPlJiju2gk4htfJnj3ppuzqM", category: "Produce", stock: 120 },
    { id: 'p3', name: "Sweet Bell Peppers", price: 800, unit: "pack", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAy-0oAZwao1WLSGC1VOrJQiwBj2NdVwZwk_gKQ4h0qNkUtaiLlYvlLil9HpoiZwlVYxQvQrPfv5-1T2QzdZGzCd7Cm6lM5g1Al6rY0AywjjIOSDxWuYyz-0ndrekG7hbkthiLq7vtP45MM7_Qruw26H5NiebjBTsMEKsemr6RsI3u64DiGKTEGl9IVvhrKExsG72Nbg-CafUrhMa7UY_DkkNwZktYjKJNlc-oezyiZxRkYH6WCgyRSTLMC4iFrZ50KgVI0RF5ZAwgm", category: "Produce", stock: 80 },
    { id: 'p4', name: "Organic Carrots", price: 600, unit: "bunch", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6UWHxlzXZ1fZ6YGBbT37L0xAuHSyG5BhZ9bwse3VDii426hr7S1c-HfyAe8e3yQ8NcDRTOXKRjo2Ufc3wc29_OSrYxO_MyJnBz_QS_HpxZUhr0N7aVtOYPSu8UR1hbVvS8J0cHecXDYljfh3DPNefV4iskMSlS7IXlsjbtCi2JYOlqt8iy0T-eLiVLfpWjmZHuJEmLkOm-Yw_J_jXwPk_uDmK3oH1SNX-lFqxu5AS_FVr7ddDLdjxkcHQ-qQDtQQknzrvfpaDEBi0", category: "Produce", stock: 60 },
    { id: 'p5', name: "Italian Penne Pasta", price: 3500, unit: "pack", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXHoapzHeb1VAPEs6czxDQyvWwduFy91nT-Drp_8nE1SyGtHCVjAT37yLzElXag6I_iuWbvvn3rXicnFwJbZK6_saydnAr5JMl2ZAbbt-npsIKEgbZlIicshunGdLBZqV_jllJM0yZfx0ST0DcjCV9quCoxmCTuc9rl_YY47qHdhClvIqTI4MUOXqUj_YG6igsq_Y8vTNSDMW6Ns8hfeTHBVkeso2GuVsE71yVuNPrxLnmZquU1I4cQrwmOV35Ph63vhNswuB0XPz5", category: "Pantry", stock: 200 },
    { id: 'p6', name: "Basmati Royal Rice", price: 12000, unit: "bag", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJz7jDkUIg86_TDT-v0KLZPgAO2-9V1pv3RjvCTMcP2qbT01BI4V3idRe0PEcz_r2vmzFKmQW5NV-pJfbSy0LMvmpvLfACa4XrwDwqL2fvs6fl9xW0L1Q27K054mIGVnFLCOm7AqHdPBsT9eNLpjf36h9OOcJmFoPEdqwlT56Xwub4ZPB-teHtwt-C8wf2BBFKqb8E6dI8mO-Xr4rA3uX8GxYHVFrJHBhsOSIkago-Lg7IVnpVJixqjiUQ5VarxA96fq1-7BKGuqEM", category: "Pantry", stock: 150 }
  ]
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- Public API Routes ---

  // GET /api/v1/content/:division_slug - Fetches all active content blocks for a division.
  app.get("/api/v1/content/:division_slug", (req, res) => {
    const division = db.divisions.find(d => d.slug === req.params.division_slug);
    if (!division) return res.status(404).json({ error: "Division not found" });

    const blocks = db.contentBlocks.filter(b => b.division_id === division.id && b.published_at !== null);
    res.json({ division, blocks });
  });

  // GET /api/v1/menu/:division_slug - Fetches structured menu/product data.
  app.get("/api/v1/menu/:division_slug", (req, res) => {
    const division = db.divisions.find(d => d.slug === req.params.division_slug);
    if (!division) return res.status(404).json({ error: "Division not found" });

    const menuBlocks = db.contentBlocks.filter(b => b.division_id === division.id && b.block_type === "menu" && b.published_at !== null);
    res.json({ menu: menuBlocks });
  });

  // GET /api/v1/announcements - Fetches global cross-division announcements.
  app.get("/api/v1/announcements", (req, res) => {
    res.json({ announcements: db.announcements.filter(a => a.active) });
  });

  // --- Admin API Protected Routes ---

  // GET /api/admin/divisions - Get all divisions
  app.get("/api/admin/divisions", (req, res) => {
    res.json({ divisions: db.divisions });
  });

  // GET /api/admin/content - Get all content blocks (including drafts)
  app.get("/api/admin/content", (req, res) => {
    res.json({ contentBlocks: db.contentBlocks });
  });

  // POST /api/admin/content - Create new content block.
  app.post("/api/admin/content", (req, res) => {
    const { division_id, block_type, content_payload, order_index } = req.body;
    const newBlock = {
      id: `cb_${Date.now()}`,
      division_id,
      block_type,
      content_payload,
      order_index: order_index || 0,
      published_at: null // Draft by default
    };
    db.contentBlocks.push(newBlock);

    // Create a weekly update draft
    db.weeklyUpdates.push({
      id: `wu_${Date.now()}`,
      division_id,
      title: `New ${block_type} block added`,
      status: "draft",
      scheduled_for: null,
      changeset: { action: "create", block_id: newBlock.id }
    });

    res.status(201).json(newBlock);
  });

  // PUT /api/admin/content/:id - Update existing block.
  app.put("/api/admin/content/:id", (req, res) => {
    const { id } = req.params;
    const { content_payload, order_index } = req.body;

    const blockIndex = db.contentBlocks.findIndex(b => b.id === id);
    if (blockIndex === -1) return res.status(404).json({ error: "Block not found" });

    db.contentBlocks[blockIndex] = {
      ...db.contentBlocks[blockIndex],
      content_payload: content_payload || db.contentBlocks[blockIndex].content_payload,
      order_index: order_index !== undefined ? order_index : db.contentBlocks[blockIndex].order_index,
      published_at: null // Reverts to draft upon edit
    };

    // Create a weekly update draft
    db.weeklyUpdates.push({
      id: `wu_${Date.now()}`,
      division_id: db.contentBlocks[blockIndex].division_id,
      title: `Block ${id} updated`,
      status: "draft",
      scheduled_for: null,
      changeset: { action: "update", block_id: id }
    });

    res.json(db.contentBlocks[blockIndex]);
  });

  // GET /api/admin/updates - Get all weekly updates (drafts, pending, published)
  app.get("/api/admin/updates", (req, res) => {
    res.json({ updates: db.weeklyUpdates });
  });

  // POST /api/admin/publish - Triggers cache invalidation and moves drafts to live.
  app.post("/api/admin/publish", (req, res) => {
    const { update_ids } = req.body; // Array of WeeklyUpdate IDs to publish

    if (!update_ids || !Array.isArray(update_ids)) {
      return res.status(400).json({ error: "update_ids array is required" });
    }

    const publishedBlocks: string[] = [];

    update_ids.forEach(uid => {
      const update = db.weeklyUpdates.find(u => u.id === uid);
      if (update && update.status !== "published") {
        update.status = "published";

        // Find the associated block and mark it published
        const blockId = update.changeset.block_id;
        const block = db.contentBlocks.find(b => b.id === blockId);
        if (block) {
          block.published_at = new Date().toISOString();
          publishedBlocks.push(block.id);
        }
      }
    });

    // In a real app, we would flush Redis cache here
    res.json({ message: "Updates published successfully", publishedBlocks });
  });

  // --- Product Management Routes ---

  // GET /api/admin/products
  app.get("/api/admin/products", (req, res) => {
    res.json({ products: db.products });
  });

  // POST /api/admin/products
  app.post("/api/admin/products", (req, res) => {
    const newProduct = {
      id: `p${Date.now()}`,
      ...req.body
    };
    db.products.push(newProduct);
    res.status(201).json(newProduct);
  });

  // PUT /api/admin/products/:id
  app.put("/api/admin/products/:id", (req, res) => {
    const { id } = req.params;
    const index = db.products.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).json({ error: "Product not found" });

    db.products[index] = { ...db.products[index], ...req.body };
    res.json(db.products[index]);
  });

  // DELETE /api/admin/products/:id
  app.delete("/api/admin/products/:id", (req, res) => {
    const { id } = req.params;
    const index = db.products.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).json({ error: "Product not found" });

    db.products.splice(index, 1);
    res.json({ message: "Product deleted" });
  });

  // --- Division-Scoped Content Fetching ---

  // GET /api/admin/division/:slug/blocks - Get all blocks for a specific division
  app.get("/api/admin/division/:slug/blocks", (req, res) => {
    const division = db.divisions.find(d => d.slug === req.params.slug);
    if (!division) return res.status(404).json({ error: "Division not found" });

    const blocks = db.contentBlocks.filter(b => b.division_id === division.id);
    res.json({ division, blocks });
  });

  // --- Automation & Webhooks ---

  const sseClients: express.Response[] = [];

  // GET /api/admin/sse - SSE Endpoint for Real-time Dashboard Updates
  app.get("/api/admin/sse", (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    sseClients.push(res);

    req.on('close', () => {
      const index = sseClients.indexOf(res);
      if (index !== -1) {
        sseClients.splice(index, 1);
      }
    });
  });

  // POST /api/webhooks/pos/transaction
  // Zero-Touch Automation: Decrements stock automatically based on physical/digital sales
  app.post("/api/webhooks/pos/transaction", (req, res) => {
    const { sku, qty_sold, timestamp } = req.body;

    if (!sku || !qty_sold) {
      return res.status(400).json({ error: "Missing required fields: sku, qty_sold" });
    }

    // Find the product in the master DB
    // In our mock DB, we use 'id' as 'sku' for products
    const productIndex = db.products.findIndex(p => p.id === sku);

    if (productIndex === -1) {
      return res.status(404).json({ error: "SKU not found in inventory." });
    }

    const product = db.products[productIndex];
    if (product.stock !== undefined) {
      product.stock = Math.max(0, product.stock - qty_sold);

      // Low stock alert thresholds internally
      if (product.stock < 20) {
        console.warn(`[SYSTEM ALERT] Low Stock Warning for ${product.name} (SKU: ${sku}). Remaining: ${product.stock}`);
        // In a real app we'd dispatch an email/slack alert to the HOD here
      }

      // Simulate a SSE broadcast or websocket emit here to update dashboards immediately
      console.log(`[POS WEBHOOK] Successfully decremented ${qty_sold} units of ${product.name}. New Stock: ${product.stock}`);

      const eventPayload = JSON.stringify({ type: 'stock_update', sku, new_stock: product.stock, product_name: product.name });
      sseClients.forEach(client => {
        client.write(`data: ${eventPayload}\n\n`);
      });

      res.json({ message: "Stock decremented successfully", new_stock: product.stock, sku });
    } else {
      res.status(400).json({ error: "Product does not track stock" });
    }
  });

  // --- Field-Level Block Updates ---

  // PUT /api/admin/content/:id/fields - Update specific fields within a content block's payload
  app.put("/api/admin/content/:id/fields", (req, res) => {
    const { id } = req.params;
    const updates = req.body; // { field1: value1, field2: value2, ... }

    const blockIndex = db.contentBlocks.findIndex(b => b.id === id);
    if (blockIndex === -1) return res.status(404).json({ error: "Block not found" });

    // Merge the field updates into the existing payload
    db.contentBlocks[blockIndex].content_payload = {
      ...db.contentBlocks[blockIndex].content_payload,
      ...updates
    };

    // Create a weekly update draft
    db.weeklyUpdates.push({
      id: `wu_${Date.now()}`,
      division_id: db.contentBlocks[blockIndex].division_id,
      title: `Fields updated on block ${id}`,
      status: "draft" as const,
      scheduled_for: null,
      changeset: { action: "field_update", block_id: id, fields: Object.keys(updates) }
    });

    res.json(db.contentBlocks[blockIndex]);
  });

  // --- Global Settings API ---

  // GET /api/admin/global - Get global site settings
  app.get("/api/admin/global", (req, res) => {
    res.json({ settings: (db as any).globalSettings });
  });

  // PUT /api/admin/global - Update global site settings
  app.put("/api/admin/global", (req, res) => {
    const { section, data } = req.body; // e.g. { section: 'homepage', data: { heroTitle: 'New Title' } }

    if (!section || !data) {
      return res.status(400).json({ error: "section and data are required" });
    }

    const globalSettings = (db as any).globalSettings;
    if (!globalSettings[section]) {
      return res.status(404).json({ error: `Section '${section}' not found` });
    }

    globalSettings[section] = { ...globalSettings[section], ...data };

    res.json({ message: `Global ${section} updated`, settings: globalSettings });
  });

  // GET /api/v1/global - Public endpoint for global settings
  app.get("/api/v1/global", (req, res) => {
    res.json({ settings: (db as any).globalSettings });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
