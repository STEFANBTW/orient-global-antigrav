import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Export the master 49-item menu data so it can be passed in if needed, but it lives here.
export const MENU_CATEGORIES = [
  'Boulangerie', // Artisan Breads
  'Viennoiserie', // Laminated Pastries
  'Pâtisserie Fine', // Delicate Desserts
  'Gâteaux de Voyage', // Travel Cakes
  'Traiteur', // Savory
  'Confiserie', // Confections & Chocolates
  'Beverages' // Pairings
];

export const MASTER_BAKERY_MENU = [
  // --- 1. BOULANGERIE (Artisan Breads) ---
  {
    title: "Rustic Sourdough", category: "Boulangerie", price: "₦8,000",
    desc: "Fermented for 48 hours. A thick, caramelized crust with a soft, airy crumb.",
    ingredients: "Wild Yeast Starter (Jos), Rye Flour, Whole Wheat",
    tags: ["Vegan", "Signature"]
  },
  {
    title: "French Baguette", category: "Boulangerie", price: "₦3,000",
    desc: "Traditional long thin loaf with a crisp crust and chewy texture. Baked twice daily.",
    ingredients: "Wheat Flour, Water, Sea Salt, Yeast",
    tags: ["Vegan", "Classic"]
  },
  {
    title: "Olive & Herb Ciabatta", category: "Boulangerie", price: "₦6,500",
    desc: "Airy Italian slipper bread studded with Kalamata olives and fresh rosemary.",
    ingredients: "Wheat Flour, Kalamata Olives, Extra Virgin Olive Oil",
    tags: ["Savory", "Vegan"]
  },
  {
    title: "Multigrain Seed Loaf", category: "Boulangerie", price: "₦9,000",
    desc: "Dense, nutty loaf packed with flax, sunflower, and pumpkin seeds.",
    ingredients: "Whole Wheat, 7-Grain Mix, Honey, Molasses",
    tags: ["Healthy"]
  },
  {
    title: "Roasted Garlic Focaccia", category: "Boulangerie", price: "₦5,500",
    desc: "High-hydration Italian flatbread dimpled with olive oil and sweet confit garlic.",
    ingredients: "Flour, Confit Garlic, Olive Oil, Sea Salt",
    tags: ["Vegan"]
  },
  {
    title: "NYC Sesame Bagel", category: "Boulangerie", price: "₦3,500",
    desc: "Boiled in honey water then baked. Chewy exterior, soft interior.",
    ingredients: "Malted Barley Flour, Sesame Seeds, Honey Water",
    tags: ["Classic"]
  },
  {
    title: "Dark Rye Pumpernickel", category: "Boulangerie", price: "₦7,500",
    desc: "Deep, earthy, and slightly sweet traditional German-style loaf.",
    ingredients: "Rye Flour, Molasses, Cocoa Powder, Caraway",
    tags: ["Heritage"]
  },

  // --- 2. VIENNOISERIE (Laminated Pastries) ---
  {
    title: "Butter Croissant", category: "Viennoiserie", price: "₦4,500",
    desc: "27 layers of pure bliss. Baked fresh every 2 hours to ensure maximum flake.",
    ingredients: "High-fat French Butter, Organic Wheat Flour",
    tags: ["Signature"]
  },
  {
    title: "Pain au Chocolat", category: "Viennoiserie", price: "₦4,750",
    desc: "Flaky croissant dough wrapped around two batons of 70% dark chocolate.",
    ingredients: "Butter, Flour, Valrhona Dark Chocolate",
    tags: ["Classic"]
  },
  {
    title: "Kouign-Amann", category: "Viennoiserie", price: "₦5,500",
    desc: "The crown jewel of Brittany. Caramelized, buttery dough with a crunchy sugar crust.",
    ingredients: "Salted Butter, Sugar, Laminated Dough",
    tags: ["Sweet", "Signature"]
  },
  {
    title: "Almond Croissant", category: "Viennoiserie", price: "₦5,500",
    desc: "Twice-baked croissant filled with rich almond frangipane and topped with flaked almonds.",
    ingredients: "Almond Cream, Day-old Croissant, Rum Syrup",
    tags: ["Rich"]
  },
  {
    title: "Sticky Cinnamon Roll", category: "Viennoiserie", price: "₦5,000",
    desc: "Gooey center, crispy edges. Spiced with Ceylon cinnamon and cardamom.",
    ingredients: "Ceylon Cinnamon, Brown Sugar, Cream Cheese Frosting",
    tags: ["Comfort"]
  },
  {
    title: "Pain aux Raisins", category: "Viennoiserie", price: "₦4,800",
    desc: "Spiral pastry filled with vanilla custard and rum-soaked raisins.",
    ingredients: "Laminated Dough, Crème Pâtissière, Raisins",
    tags: ["Classic"]
  },
  {
    title: "Cruffin (Vanilla Bean)", category: "Viennoiserie", price: "₦6,000",
    desc: "A croissant baked in a muffin tin, piped full of Madagascar vanilla cream.",
    ingredients: "Croissant Dough, Vanilla Custard, Sugar Dusting",
    tags: ["Modern"]
  },

  // --- 3. PÂTISSERIE FINE (Delicate Desserts) ---
  {
    title: "Forest Berry Tart", category: "Pâtisserie Fine", price: "₦6,500",
    desc: "A sweet almond crust filled with vanilla custard and topped with seasonal berries.",
    ingredients: "Vanilla Bean Custard, Berries, Almond Flour Crust",
    tags: ["Fresh"]
  },
  {
    title: "Vanilla Mille-feuille", category: "Pâtisserie Fine", price: "₦8,500",
    desc: "Three layers of caramelized puff pastry layered with whipped mascarpone cream.",
    ingredients: "Puff Pastry, Mascarpone, Vanilla Bean",
    tags: ["Signature"]
  },
  {
    title: "Dark Chocolate & Gold Éclair", category: "Pâtisserie Fine", price: "₦7,000",
    desc: "Choux pastry filled with 70% chocolate crémeux, finished with edible gold leaf.",
    ingredients: "Choux, Valrhona Chocolate, Gold Leaf",
    tags: ["Decadent"]
  },
  {
    title: "Lemon Meringue Tartlet", category: "Pâtisserie Fine", price: "₦6,000",
    desc: "Sharp, punchy lemon curd topped with beautifully toasted Italian meringue.",
    ingredients: "Lemon Juice, Butter, Eggs, Sugar",
    tags: ["Citrus"]
  },
  {
    title: "Paris-Brest", category: "Pâtisserie Fine", price: "₦8,000",
    desc: "A ring of choux pastry filled with rich, nutty praline mousseline cream.",
    ingredients: "Choux Pastry, Hazelnut Praline, Almonds",
    tags: ["Nutty"]
  },
  {
    title: "Raspberry Macaron Ispahan", category: "Pâtisserie Fine", price: "₦9,000",
    desc: "Oversized macaron filled with rose petal cream, lychee, and fresh raspberries.",
    ingredients: "Almond Flour, Rose Water, Lychee, Raspberries",
    tags: ["Floral", "Gluten-Free"]
  },
  {
    title: "Opera Cake Slice", category: "Pâtisserie Fine", price: "₦7,500",
    desc: "Layers of almond sponge soaked in espresso, espresso buttercream, and chocolate ganache.",
    ingredients: "Joconde Sponge, Coffee Syrup, Chocolate Ganache",
    tags: ["Coffee"]
  },

  // --- 4. GÂTEAUX DE VOYAGE (Travel Cakes) ---
  {
    title: "Brown Butter Financiers", category: "Gâteaux de Voyage", price: "₦4,000",
    desc: "Delicate almond cakes baked with nutty beurre noisette and a hint of orange blossom.",
    ingredients: "Brown Butter, Almond Flour, Egg Whites",
    tags: ["Nutty"]
  },
  {
    title: "Lemon Glazed Madeleine (3pcs)", category: "Gâteaux de Voyage", price: "₦3,500",
    desc: "Classic French shell-shaped sponge cakes with a zesty lemon glaze.",
    ingredients: "Butter, Flour, Eggs, Lemon Zest",
    tags: ["Classic"]
  },
  {
    title: "Double Chocolate Brownie", category: "Gâteaux de Voyage", price: "₦4,500",
    desc: "Fudgy, dense, and intensely chocolatey, made with 70% cocoa and sea salt.",
    ingredients: "Dark Chocolate, Butter, Sugar, Sea Salt Flakes",
    tags: ["Rich"]
  },
  {
    title: "Marble Pound Cake Slice", category: "Gâteaux de Voyage", price: "₦3,500",
    desc: "A buttery, tender crumb perfectly swirling vanilla and dark chocolate batters.",
    ingredients: "Butter, Sugar, Vanilla, Cocoa Powder",
    tags: ["Comfort"]
  },
  {
    title: "Pistachio Rose Loaf", category: "Gâteaux de Voyage", price: "₦5,000",
    desc: "Moist pistachio cake drizzled with a striking pink rose-water icing.",
    ingredients: "Ground Pistachios, Rose Water, Flour, Eggs",
    tags: ["Nutty", "Floral"]
  },
  {
    title: "Banana Walnut Bread", category: "Gâteaux de Voyage", price: "₦4,000",
    desc: "Caramelized overripe bananas and toasted walnuts in a beautifully moist loaf.",
    ingredients: "Bananas, Walnuts, Brown Sugar",
    tags: ["Comfort"]
  },
  {
    title: "Carrot Cake & Pecan Slice", category: "Gâteaux de Voyage", price: "₦5,500",
    desc: "Spiced carrot sponge loaded with pecans and topped with cream cheese frosting.",
    ingredients: "Carrots, Pecans, Cinnamon, Cream Cheese",
    tags: ["Spiced"]
  },

  // --- 5. TRAITEUR (Savory Bakery) ---
  {
    title: "Spinach Feta Danish", category: "Traiteur", price: "₦5,500",
    desc: "Savory puff pastry filled with creamy sautéed spinach and tangy feta cheese.",
    ingredients: "Puff Pastry, Spinach, Feta, Garlic",
    tags: ["Vegetarian"]
  },
  {
    title: "Truffled Mushroom Tart", category: "Traiteur", price: "₦6,500",
    desc: "A savory masterpiece featuring wild mushrooms, gruyère, and white truffle oil.",
    ingredients: "Wild Mushrooms, Gruyère, Truffle Oil, Shortcrust",
    tags: ["Umami", "Vegetarian"]
  },
  {
    title: "Quiche Lorraine", category: "Traiteur", price: "₦6,000",
    desc: "Classic French tart with smoked bacon, creamy egg custard, and gruyère cheese.",
    ingredients: "Bacon, Eggs, Cream, Gruyère",
    tags: ["Classic"]
  },
  {
    title: "Artisan Sausage Roll", category: "Traiteur", price: "₦4,500",
    desc: "Herbed pork sausage wrapped in golden, flaky, butter-rich puff pastry.",
    ingredients: "Pork Sausage, Fennel, Puff Pastry",
    tags: ["Hearty"]
  },
  {
    title: "Ham & Cheese Croissant", category: "Traiteur", price: "₦5,500",
    desc: "Our signature croissant baked with artisanal ham and melted swiss cheese.",
    ingredients: "Croissant Dough, Smoked Ham, Swiss Cheese",
    tags: ["Breakfast"]
  },
  {
    title: "Tomato & Basil Galette", category: "Traiteur", price: "₦5,000",
    desc: "Free-form rustic tart with heirloom tomatoes, fresh basil, and goat cheese.",
    ingredients: "Heirloom Tomatoes, Goat Cheese, Basil, Pastry",
    tags: ["Vegetarian", "Fresh"]
  },
  {
    title: "Spicy Beef Empanada", category: "Traiteur", price: "₦4,000",
    desc: "Flaky pastry pocket stuffed with spiced minced beef, onions, and bells.",
    ingredients: "Minced Beef, Spices, Shortcrust Pastry",
    tags: ["Spicy", "Hearty"]
  },

  // --- 6. CONFISERIE (Confections & Chocolates) ---
  {
    title: "Artisan Truffle Box (6pcs)", category: "Confiserie", price: "₦12,000",
    desc: "Hand-rolled dark chocolate truffles dusted with premium cocoa powder.",
    ingredients: "Dark Chocolate Ganache, Cocoa Powder",
    tags: ["Gift", "Gluten-Free"]
  },
  {
    title: "Salted Caramel Jars", category: "Confiserie", price: "₦5,000",
    desc: "Rich, deeply caramelized sugar blended with cream and sea salt flakes.",
    ingredients: "Sugar, Heavy Cream, Butter, Sea Salt",
    tags: ["Sweet"]
  },
  {
    title: "Pistachio Nougat", category: "Confiserie", price: "₦6,500",
    desc: "Soft French-style Montélimar nougat studded with roasted pistachios and honey.",
    ingredients: "Honey, Egg Whites, Sugar, Pistachios",
    tags: ["Chewy", "Gluten-Free"]
  },
  {
    title: "Raspberry Pâte de Fruits", category: "Confiserie", price: "₦4,500",
    desc: "Intense, jewel-like fruit jellies made from 100% natural raspberry purée.",
    ingredients: "Raspberry Purée, Sugar, Pectin",
    tags: ["Fruity", "Vegan"]
  },
  {
    title: "Chocolate Bark (Almond & Sea Salt)", category: "Confiserie", price: "₦7,000",
    desc: "Shattered pieces of tempered 70% dark chocolate packed with roasted almonds.",
    ingredients: "Dark Chocolate, Toasted Almonds, Sea Salt",
    tags: ["Crunchy", "Gluten-Free"]
  },
  {
    title: "Vanilla Bean Marshmallows", category: "Confiserie", price: "₦3,500",
    desc: "Pillowy, light-as-air homemade marshmallows flecked with real vanilla bean.",
    ingredients: "Sugar, Gelatin, Vanilla Bean Paste",
    tags: ["Light", "Gluten-Free"]
  },
  {
    title: "Hazelnut Praline Spread", category: "Confiserie", price: "₦8,500",
    desc: "Our luxurious, house-made alternative to commercial hazelnut spreads.",
    ingredients: "Roasted Hazelnuts, Milk Chocolate, Vanilla",
    tags: ["Rich", "Gluten-Free"]
  },

  // --- 7. BEVERAGES (Pairings) ---
  {
    title: "Single Origin Espresso", category: "Beverages", price: "₦2,500",
    desc: "A double shot of our bright, complex African blend. Perfect with sourdough.",
    ingredients: "100% Arabica Coffee Beans",
    tags: ["Hot", "Vegan"]
  },
  {
    title: "Ceremonial Matcha Latte", category: "Beverages", price: "₦4,500",
    desc: "Vibrant, earthy green tea whisked with perfectly steamed milk.",
    ingredients: "Ceremonial Grade Matcha, Milk / Oat Milk",
    tags: ["Hot", "Earthy"]
  },
  {
    title: "Nitro Cold Brew", category: "Beverages", price: "₦3,500",
    desc: "Steeped for 24 hours and infused with nitrogen for a creamy, stout-like head.",
    ingredients: "Cold Brew Coffee, Nitrogen",
    tags: ["Cold", "Vegan"]
  },
  {
    title: "Valrhona Hot Chocolate", category: "Beverages", price: "₦5,000",
    desc: "Incredibly thick, Parisian-style hot chocolate that coats the spoon.",
    ingredients: "Dark Chocolate, Whole Milk, Heavy Cream",
    tags: ["Hot", "Decadent"]
  },
  {
    title: "Fresh Squeezed Orange Juice", category: "Beverages", price: "₦3,000",
    desc: "Cold-pressed daily from locally sourced Nigerian sweet oranges.",
    ingredients: "100% Orange Juice",
    tags: ["Cold", "Vegan", "Fresh"]
  },
  {
    title: "Earl Grey Tea", category: "Beverages", price: "₦2,500",
    desc: "Premium loose-leaf black tea fragranced with bright bergamot oil.",
    ingredients: "Black Tea, Bergamot Oil",
    tags: ["Hot", "Vegan", "Floral"]
  },
  {
    title: "Iced Hibiscus Tea (Zobo)", category: "Beverages", price: "₦2,000",
    desc: "Our refined, unsweetened take on the local classic, infused with clove and ginger.",
    ingredients: "Hibiscus Leaves, Ginger, Clove",
    tags: ["Cold", "Vegan", "Local"]
  }
];

export const BakeryMenu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter logic
  const filteredMenu = MASTER_BAKERY_MENU.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#FDFBF7] dark:bg-stone-950 min-h-screen text-slate-800 dark:text-slate-200 font-sans sm:pb-24 pt-0">
      
      {/* Header Area */}
      <div className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 sticky top-12 sm:top-14 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div>
              <h1 className="font-serif text-3xl font-bold text-slate-900 dark:text-white mb-2">Digital Menu</h1>
              <p className="text-sm text-stone-500 dark:text-stone-400">Select, review ingredients, and order your favorites instantly.</p>
            </div>

            {/* Search & Actions */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">search</span>
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-stone-100 dark:bg-stone-800 border-none rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all dark:text-white"
                />
              </div>
              <button className="bg-stone-900 dark:bg-white text-white dark:text-stone-900 p-2.5 rounded-xl flex items-center justify-center relative hover:opacity-90 transition-opacity">
                <span className="material-icons text-sm">shopping_bag</span>
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
              </button>
            </div>
            
          </div>

          {/* Category Filter Pills (Horizontal Scroll on Mobile) */}
          <div className="flex items-center gap-2 mt-6 overflow-x-auto no-scrollbar pb-2 pt-1 border-stone-100 dark:border-stone-800">
            <button 
              onClick={() => setActiveCategory('All')}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                activeCategory === 'All' 
                  ? 'bg-primary text-white shadow-md shadow-primary/20' 
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              All Items
            </button>
            {MENU_CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                  activeCategory === cat 
                    ? 'bg-primary text-white shadow-md shadow-primary/20' 
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        
        {filteredMenu.length === 0 ? (
          <div className="text-center py-20">
            <span className="material-icons text-4xl text-stone-300 dark:text-stone-700 mb-4">search_off</span>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">No items found</h3>
            <p className="text-stone-500">Try adjusting your search or category filter.</p>
            <button 
              onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
              className="mt-6 text-primary text-sm font-bold uppercase tracking-widest hover:underline"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <AnimatePresence mode="popLayout">
              {filteredMenu.map((item, idx) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  key={item.title + idx}
                  className="bg-white dark:bg-stone-900 rounded-2xl p-5 sm:p-6 border border-stone-100 dark:border-stone-800 flex flex-col justify-between group hover:border-primary/30 transition-colors shadow-sm hover:shadow-md"
                >
                  <div>
                    <div className="flex justify-between items-start mb-3 gap-4">
                      <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white leading-tight">{item.title}</h3>
                      <span className="font-sans font-bold text-primary whitespace-nowrap">{item.price}</span>
                    </div>
                    
                    <p className="text-sm text-stone-500 dark:text-stone-400 mb-4 line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>

                    <div className="mb-6">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1">Contains</p>
                      <p className="text-xs text-stone-600 dark:text-stone-300 italic">{item.ingredients}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-stone-100 dark:border-stone-800 mt-auto">
                    <div className="flex gap-2">
                      {item.tags?.map(tag => (
                        <span key={tag} className="px-2 py-1 rounded bg-stone-100 dark:bg-white/5 text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-white flex items-center justify-center hover:bg-primary hover:text-white dark:hover:bg-primary transition-colors cursor-pointer group-hover:scale-110 shadow-sm">
                      <span className="material-icons text-sm">add</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

    </div>
  );
};
