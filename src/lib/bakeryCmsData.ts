import { useState, useEffect } from 'react';

// Default values for the Bakery CMS
const DEFAULT_BAKERY_CMS = {
  home: {
    heroTitle: "Artisanal Perfection, Daily.",
    heroSubtext: "Experience the finest pastries and sourdough in Plateau State.",
    btn1Text: "Order Fresh Now",
    btn1Link: "/menu",
    heroImage: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop",
    newsHeadline: "🔥 HOT NOW: Fresh batch of Butter Croissants just came out of the oven!",
    cakeOfWeek: {
      name: "Dark Chocolate Truffle Tart",
      desc: "A rich, decadent tart made with 70% single-origin cocoa and an all-butter crust.",
      image: "https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=800&auto=format&fit=crop",
      show: true
    },
    pairings: [
      { title: "Morning Rush", desc: "Espresso + Almond Croissant", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop", link: "/menu/combos" }
    ]
  },
  inventory: [
    // Boulangerie
    { id: 1, name: "Rustic Sourdough", category: "Boulangerie", price: 8000, stock: 15, desc: "Fermented for 48 hours. A thick, caramelized crust with a soft, airy crumb.", ingredients: "Wild Yeast Starter (Jos), Rye Flour, Whole Wheat" },
    { id: 2, name: "French Baguette", category: "Boulangerie", price: 3000, stock: 40, desc: "Traditional long thin loaf with a crisp crust and chewy texture. Baked twice daily.", ingredients: "Wheat Flour, Water, Sea Salt, Yeast" },
    { id: 3, name: "Olive & Herb Ciabatta", category: "Boulangerie", price: 6500, stock: 12, desc: "Airy Italian slipper bread studded with Kalamata olives and fresh rosemary.", ingredients: "Wheat Flour, Kalamata Olives, Extra Virgin Olive Oil" },
    { id: 4, name: "Multigrain Seed Loaf", category: "Boulangerie", price: 9000, stock: 10, desc: "Dense, nutty loaf packed with flax, sunflower, and pumpkin seeds.", ingredients: "Whole Wheat, 7-Grain Mix, Honey, Molasses" },
    { id: 5, name: "Roasted Garlic Focaccia", category: "Boulangerie", price: 5500, stock: 18, desc: "High-hydration Italian flatbread dimpled with olive oil and sweet confit garlic.", ingredients: "Flour, Confit Garlic, Olive Oil, Sea Salt" },
    { id: 6, name: "NYC Sesame Bagel", category: "Boulangerie", price: 3500, stock: 25, desc: "Boiled in honey water then baked. Chewy exterior, soft interior.", ingredients: "Malted Barley Flour, Sesame Seeds, Honey Water" },
    { id: 7, name: "Dark Rye Pumpernickel", category: "Boulangerie", price: 7500, stock: 8, desc: "Deep, earthy, and slightly sweet traditional German-style loaf.", ingredients: "Rye Flour, Molasses, Cocoa Powder, Caraway" },

    // Viennoiserie
    { id: 8, name: "Butter Croissant", category: "Viennoiserie", price: 4500, stock: 30, desc: "27 layers of pure bliss. Baked fresh every 2 hours to ensure maximum flake.", ingredients: "High-fat French Butter, Organic Wheat Flour" },
    { id: 9, name: "Pain au Chocolat", category: "Viennoiserie", price: 4750, stock: 25, desc: "Flaky croissant dough wrapped around two batons of 70% dark chocolate.", ingredients: "Butter, Flour, Valrhona Dark Chocolate" },
    { id: 10, name: "Kouign-Amann", category: "Viennoiserie", price: 5500, stock: 12, desc: "The crown jewel of Brittany. Caramelized, buttery dough with a crunchy sugar crust.", ingredients: "Salted Butter, Sugar, Laminated Dough" },
    { id: 11, name: "Almond Croissant", category: "Viennoiserie", price: 5500, stock: 15, desc: "Twice-baked croissant filled with rich almond frangipane and topped with flaked almonds.", ingredients: "Almond Cream, Day-old Croissant, Rum Syrup" },
    { id: 12, name: "Sticky Cinnamon Roll", category: "Viennoiserie", price: 5000, stock: 20, desc: "Gooey center, crispy edges. Spiced with Ceylon cinnamon and cardamom.", ingredients: "Ceylon Cinnamon, Brown Sugar, Cream Cheese Frosting" },
    { id: 13, name: "Pain aux Raisins", category: "Viennoiserie", price: 4800, stock: 18, desc: "Spiral pastry filled with vanilla custard and rum-soaked raisins.", ingredients: "Laminated Dough, Crème Pâtissière, Raisins" },
    { id: 14, name: "Cruffin (Vanilla Bean)", category: "Viennoiserie", price: 6000, stock: 22, desc: "A croissant baked in a muffin tin, piped full of Madagascar vanilla cream.", ingredients: "Croissant Dough, Vanilla Custard, Sugar Dusting" },

    // Pâtisserie Fine
    { id: 15, name: "Forest Berry Tart", category: "Pâtisserie Fine", price: 6500, stock: 10, desc: "A sweet almond crust filled with vanilla custard and topped with seasonal berries.", ingredients: "Vanilla Bean Custard, Berries, Almond Flour Crust" },
    { id: 16, name: "Vanilla Mille-feuille", category: "Pâtisserie Fine", price: 8500, stock: 8, desc: "Three layers of caramelized puff pastry layered with whipped mascarpone cream.", ingredients: "Puff Pastry, Mascarpone, Vanilla Bean" },
    { id: 17, name: "Dark Chocolate & Gold Éclair", category: "Pâtisserie Fine", price: 7000, stock: 12, desc: "Choux pastry filled with 70% chocolate crémeux, finished with edible gold leaf.", ingredients: "Choux, Valrhona Chocolate, Gold Leaf" },
    { id: 18, name: "Lemon Meringue Tartlet", category: "Pâtisserie Fine", price: 6000, stock: 15, desc: "Sharp, punchy lemon curd topped with beautifully toasted Italian meringue.", ingredients: "Lemon Juice, Butter, Eggs, Sugar" },
    { id: 19, name: "Paris-Brest", category: "Pâtisserie Fine", price: 8000, stock: 6, desc: "A ring of choux pastry filled with rich, nutty praline mousseline cream.", ingredients: "Choux Pastry, Hazelnut Praline, Almonds" },
    { id: 20, name: "Raspberry Macaron Ispahan", category: "Pâtisserie Fine", price: 9000, stock: 5, desc: "Oversized macaron filled with rose petal cream, lychee, and fresh raspberries.", ingredients: "Almond Flour, Rose Water, Lychee, Raspberries" },
    { id: 21, name: "Opera Cake Slice", category: "Pâtisserie Fine", price: 7500, stock: 10, desc: "Layers of almond sponge soaked in espresso, espresso buttercream, and chocolate ganache.", ingredients: "Joconde Sponge, Coffee Syrup, Chocolate Ganache" },

    // Gâteaux de Voyage
    { id: 22, name: "Brown Butter Financiers", category: "Gâteaux de Voyage", price: 4000, stock: 20, desc: "Delicate almond cakes baked with nutty beurre noisette and a hint of orange blossom.", ingredients: "Brown Butter, Almond Flour, Egg Whites" },
    { id: 23, name: "Lemon Glazed Madeleine (3pcs)", category: "Gâteaux de Voyage", price: 3500, stock: 25, desc: "Classic French shell-shaped sponge cakes with a zesty lemon glaze.", ingredients: "Butter, Flour, Eggs, Lemon Zest" },
    { id: 24, name: "Double Chocolate Brownie", category: "Gâteaux de Voyage", price: 4500, stock: 15, desc: "Fudgy, dense, and intensely chocolatey, made with 70% cocoa and sea salt.", ingredients: "Dark Chocolate, Butter, Sugar, Sea Salt Flakes" },
    { id: 25, name: "Marble Pound Cake Slice", category: "Gâteaux de Voyage", price: 3500, stock: 18, desc: "A buttery, tender crumb perfectly swirling vanilla and dark chocolate batters.", ingredients: "Butter, Sugar, Vanilla, Cocoa Powder" },
    { id: 26, name: "Pistachio Rose Loaf", category: "Gâteaux de Voyage", price: 5000, stock: 12, desc: "Moist pistachio cake drizzled with a striking pink rose-water icing.", ingredients: "Ground Pistachios, Rose Water, Flour, Eggs" },
    { id: 27, name: "Banana Walnut Bread", category: "Gâteaux de Voyage", price: 4000, stock: 15, desc: "Caramelized overripe bananas and toasted walnuts in a beautifully moist loaf.", ingredients: "Bananas, Walnuts, Brown Sugar" },
    { id: 28, name: "Carrot Cake & Pecan Slice", category: "Gâteaux de Voyage", price: 5500, stock: 10, desc: "Spiced carrot sponge loaded with pecans and topped with cream cheese frosting.", ingredients: "Carrots, Pecans, Cinnamon, Cream Cheese" },

    // Traiteur
    { id: 29, name: "Spinach Feta Danish", category: "Traiteur", price: 5500, stock: 15, desc: "Savory puff pastry filled with creamy sautéed spinach and tangy feta cheese.", ingredients: "Puff Pastry, Spinach, Feta, Garlic" },
    { id: 30, name: "Truffled Mushroom Tart", category: "Traiteur", price: 6500, stock: 12, desc: "A savory masterpiece featuring wild mushrooms, gruyère, and white truffle oil.", ingredients: "Wild Mushrooms, Gruyère, Truffle Oil, Shortcrust" },
    { id: 31, name: "Quiche Lorraine", category: "Traiteur", price: 6000, stock: 10, desc: "Classic French tart with smoked bacon, creamy egg custard, and gruyère cheese.", ingredients: "Bacon, Eggs, Cream, Gruyère" },
    { id: 32, name: "Artisan Sausage Roll", category: "Traiteur", price: 4500, stock: 20, desc: "Herbed pork sausage wrapped in golden, flaky, butter-rich puff pastry.", ingredients: "Pork Sausage, Fennel, Puff Pastry" },
    { id: 33, name: "Ham & Cheese Croissant", category: "Traiteur", price: 5500, stock: 15, desc: "Our signature croissant baked with artisanal ham and melted swiss cheese.", ingredients: "Croissant Dough, Smoked Ham, Swiss Cheese" },
    { id: 34, name: "Tomato & Basil Galette", category: "Traiteur", price: 5000, stock: 12, desc: "Free-form rustic tart with heirloom tomatoes, fresh basil, and goat cheese.", ingredients: "Heirloom Tomatoes, Goat Cheese, Basil, Pastry" },
    { id: 35, name: "Spicy Beef Empanada", category: "Traiteur", price: 4000, stock: 25, desc: "Flaky pastry pocket stuffed with spiced minced beef, onions, and bells.", ingredients: "Minced Beef, Spices, Shortcrust Pastry" },

    // Confiserie
    { id: 36, name: "Artisan Truffle Box (6pcs)", category: "Confiserie", price: 12000, stock: 8, desc: "Hand-rolled dark chocolate truffles dusted with premium cocoa powder.", ingredients: "Dark Chocolate Ganache, Cocoa Powder" },
    { id: 37, name: "Salted Caramel Jars", category: "Confiserie", price: 5000, stock: 15, desc: "Rich, deeply caramelized sugar blended with cream and sea salt flakes.", ingredients: "Sugar, Heavy Cream, Butter, Sea Salt" },
    { id: 38, name: "Pistachio Nougat", category: "Confiserie", price: 6500, stock: 12, desc: "Soft French-style Montélimar nougat studded with roasted pistachios and honey.", ingredients: "Honey, Egg Whites, Sugar, Pistachios" },
    { id: 39, name: "Raspberry Pâte de Fruits", category: "Confiserie", price: 4500, stock: 20, desc: "Intense, jewel-like fruit jellies made from 100% natural raspberry purée.", ingredients: "Raspberry Purée, Sugar, Pectin" },
    { id: 40, name: "Chocolate Bark (Almond & Sea Salt)", category: "Confiserie", price: 7000, stock: 18, desc: "Shattered pieces of tempered 70% dark chocolate packed with roasted almonds.", ingredients: "Dark Chocolate, Toasted Almonds, Sea Salt" },
    { id: 41, name: "Vanilla Bean Marshmallows", category: "Confiserie", price: 3500, stock: 25, desc: "Pillowy, light-as-air homemade marshmallows flecked with real vanilla bean.", ingredients: "Sugar, Gelatin, Vanilla Bean Paste" },
    { id: 42, name: "Hazelnut Praline Spread", category: "Confiserie", price: 8500, stock: 10, desc: "Our luxurious, house-made alternative to commercial hazelnut spreads.", ingredients: "Roasted Hazelnuts, Milk Chocolate, Vanilla" },

    // Beverages
    { id: 43, name: "Single Origin Espresso", category: "Beverages", price: 2500, stock: 50, desc: "A double shot of our bright, complex African blend. Perfect with sourdough.", ingredients: "100% Arabica Coffee Beans" },
    { id: 44, name: "Ceremonial Matcha Latte", category: "Beverages", price: 4500, stock: 35, desc: "Vibrant, earthy green tea whisked with perfectly steamed milk.", ingredients: "Ceremonial Grade Matcha, Milk / Oat Milk" },
    { id: 45, name: "Nitro Cold Brew", category: "Beverages", price: 3500, stock: 30, desc: "Steeped for 24 hours and infused with nitrogen for a creamy, stout-like head.", ingredients: "Cold Brew Coffee, Nitrogen" },
    { id: 46, name: "Valrhona Hot Chocolate", category: "Beverages", price: 5000, stock: 25, desc: "Incredibly thick, Parisian-style hot chocolate that coats the spoon.", ingredients: "Dark Chocolate, Whole Milk, Heavy Cream" },
    { id: 47, name: "Fresh Squeezed Orange Juice", category: "Beverages", price: 3000, stock: 40, desc: "Cold-pressed daily from locally sourced Nigerian sweet oranges.", ingredients: "100% Orange Juice" },
    { id: 48, name: "Earl Grey Tea", category: "Beverages", price: 2500, stock: 45, desc: "Premium loose-leaf black tea fragranced with bright bergamot oil.", ingredients: "Black Tea, Bergamot Oil" },
    { id: 49, name: "Iced Hibiscus Tea (Zobo)", category: "Beverages", price: 2000, stock: 50, desc: "Our refined, unsweetened take on the local classic, infused with clove and ginger.", ingredients: "Hibiscus Leaves, Ginger, Clove" },
  ],
  orders: [
    { id: "ORD-089", name: "Esther Dalyop", items: "2x Croissant, 1x Sourdough", total: 4900, status: "Pending" },
    { id: "ORD-088", name: "Musa Ibrahim", items: "1x Custom Birthday Cake", total: 25000, status: "Preparing" },
    { id: "ORD-087", name: "Dr. Pam", items: "5x Baguette, Wholesale", total: 5000, status: "Ready" },
  ],
  wholesale: {
    title: "Partner With Orient Bakery",
    subtitle: "Supply your cafe or restaurant with Jos's finest baked goods.",
    ctaText: "Apply for Wholesale",
    metrics: { daily: "5,000+", partners: "42", rating: "4.9/5", delivery: "Before 7 AM" },
    moq: "20 Loaves / 50 Pastries",
    discount: "25%"
  },
  story: {
    bakerName: "Chef Antoine",
    bio: "Master Baker with 15 years of experience bringing authentic French techniques to the heart of Nigeria.",
    image: "https://images.unsplash.com/photo-1583338917451-face2751d8d5?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://youtube.com/watch?v=orient-bakery",
    showcaseTitle: "The Sourdough Bloom",
    showcaseGif: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=800&auto=format&fit=crop"
  },
  settings: {
    metaTitle: "Orient Bakery | Fresh Artisanal Bread in Jos",
    metaDesc: "Order fresh bread, pastries, and custom cakes from Orient Bakery. Hot from the oven delivery available.",
    holidayPreset: "default",
    goldenHour: false
  }
};

const STORAGE_KEY = 'orient_bakery_cms_data';

export const cmsData = {
  getBakeryData: () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_BAKERY_CMS;
  },
  saveBakeryData: (data: any) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    // Dispatch custom event for real-time updates across the app
    window.dispatchEvent(new Event('cms-data-updated'));
  }
};

export const useBakeryCms = () => {
  const [data, setData] = useState(cmsData.getBakeryData());

  useEffect(() => {
    const handleUpdate = () => setData(cmsData.getBakeryData());
    window.addEventListener('cms-data-updated', handleUpdate);
    return () => window.removeEventListener('cms-data-updated', handleUpdate);
  }, []);

  return { data, setData };
};
