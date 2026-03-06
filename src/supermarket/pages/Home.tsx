import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { MOCK_PRODUCTS } from '../data/mockDb';
import { Product } from '../types';
import { cmsApi } from '@/services/cmsApi';

interface HomeProps {
  onNavigate: (page: any) => void;
  onOpenSmartPaste?: () => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate, onOpenSmartPaste }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(200000);
  const [sortOption, setSortOption] = useState('relevance');
  
  // States for interactive elements
  const [isMicListening, setIsMicListening] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{sender: 'user' | 'bot', text: string}[]>([
      {sender: 'bot', text: "Hi! I noticed you're buying pasta. Need tomato sauce?"}
  ]);

  const { addToCart, cart, updateQuantity } = useCart();
  
  const allCategories = Array.from(new Set(MOCK_PRODUCTS.map(p => p.category)));

  const [cmsData, setCmsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const data = await cmsApi.getDivisionContent('market');
              setCmsData(data);
          } catch (error) {
              console.error("Failed to fetch CMS data", error);
          } finally {
              setLoading(false);
          }
      };
      fetchData();
  }, []);

  const heroBlock = cmsData?.blocks?.find((b: any) => b.block_type === 'hero')?.content_payload || {
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
      }
    ]
  };

  const dealBlock = cmsData?.blocks?.find((b: any) => b.block_type === 'deal')?.content_payload || {
    product: {
      id: 'deal-coffee',
      name: 'Premium Arabica Coffee Beans (1kg)',
      price: 12990,
      category: 'Beverages',
      context: 'RETAIL',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1wZpJFJka3FlypGKUsr0BoyDreoSK1yO0HNItuIXwL45jTS5sMWtJDX0xA05wzVKWEcdMe1SOjWb69PBje0fItEcORGH36VHdOesDWcLXtQBkh8La1nnsZScU27G8OcoTKxo7cd4zC8zzD1znfAXSzlVSQq57xNupl-rWunYkpDK1Y_BCzhN_AD2ML0NXdxUY6-hQUG9tyuCXWZ-Q-S4_Aqh-WhDlYgbDQE7EKXAWmmlxMZcK9DNUkIa8eQkEjH15ny70tqJDUwlo'
    }
  };

  const HERO_SLIDES = heroBlock.slides;
  const DEAL_PRODUCT = dealBlock.product;

  // Slider Auto-play
  useEffect(() => {
    if (HERO_SLIDES.length <= 1) return;
    const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [HERO_SLIDES.length]);

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesPrice = product.price <= maxPrice;
      return matchesSearch && matchesCategory && matchesPrice;
    }).sort((a, b) => {
      if (sortOption === 'price-low') return a.price - b.price;
      if (sortOption === 'price-high') return b.price - a.price;
      return 0; 
    });
  }, [searchTerm, selectedCategories, maxPrice, sortOption]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const getProductQtyInCart = (productId: string) => {
    const item = cart.items.find(i => i.id === productId && i.context === 'RETAIL');
    return item ? item.quantity : 0;
  };
  
  const getCartItem = (productId: string) => {
    return cart.items.find(i => i.id === productId && i.context === 'RETAIL');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setMaxPrice(200000);
    setSortOption('relevance');
  };

  const handleMicClick = () => {
    if (isMicListening) {
        setIsMicListening(false);
    } else {
        setIsMicListening(true);
        // Simulate speech recognition
        setTimeout(() => {
            setSearchTerm("Organic Apples");
            setIsMicListening(false);
        }, 2000);
    }
  };

  const handleSendChat = (e: React.FormEvent) => {
      e.preventDefault();
      if (!chatMessage.trim()) return;
      
      const newHistory = [...chatHistory, {sender: 'user' as const, text: chatMessage}];
      setChatHistory(newHistory);
      setChatMessage('');
      
      // Simulate bot response
      setTimeout(() => {
          setChatHistory(prev => [...prev, {sender: 'bot', text: "I can help you find that. Check aisle 4 or click below to add it to your cart."}]);
      }, 1000);
  };

  const isFiltering = searchTerm !== '' || selectedCategories.length > 0 || maxPrice < 200000;

  const fadeInUp: any = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.05 } }
  };

  const dealQty = getProductQtyInCart(DEAL_PRODUCT.id);

  return (
    <div className="font-sans text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <main className="max-w-[1800px] mx-auto px-4 lg:px-8 py-4 space-y-6">
        {/* Search & Smart Paste */}
        <section className="relative z-30">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-stone-900 rounded-full shadow-lg border border-stone-100 dark:border-stone-800 p-1 flex items-center max-w-3xl mx-auto transition-all duration-300 hover:shadow-xl"
          >
            <div className="flex-1 flex items-center px-4 py-1">
              <span className="material-icons text-stone-400 mr-2 text-lg">search</span>
              <input 
                type="text" 
                placeholder={isMicListening ? "Listening..." : "Search fresh inventory..."}
                className="bg-transparent border-none focus:ring-0 w-full placeholder-stone-400 text-sm font-sans text-stone-900 dark:text-stone-100"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200">
                   <span className="material-icons">close</span>
                </button>
              )}
              <div className="flex items-center gap-2 border-l border-stone-200 dark:border-stone-700 pl-4 ml-4">
                 <motion.button 
                   whileHover={{ scale: 1.1 }} 
                   whileTap={{ scale: 0.9 }} 
                   onClick={handleMicClick}
                   className={`p-2 rounded-full transition-colors ${isMicListening ? 'bg-orange-100 text-orange-600 animate-pulse' : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400'}`}
                 >
                   <span className="material-icons">{isMicListening ? 'mic_off' : 'mic'}</span>
                 </motion.button>
              </div>
            </div>
            {/* Smart Paste trigger */}
            <motion.button 
              onClick={onOpenSmartPaste}
              whileHover={{ backgroundColor: "#f5f5f4" }} 
              whileTap={{ scale: 0.98 }} 
              className="bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-200 font-bold text-[10px] uppercase tracking-wider px-6 py-3 rounded-full flex items-center gap-2 transition-colors ml-2 shadow-sm"
            >
               <span className="material-icons text-stone-900 text-xs">content_paste</span>
               <span>Smart Paste</span>
            </motion.button>
          </motion.div>
        </section>

        {/* Hero Section (Only show if not searching) */}
        {!searchTerm && !isFiltering && (
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUp}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Main Hero Slider */}
          <div className="lg:col-span-2 relative bg-slate-900 rounded-[1.5rem] overflow-hidden shadow-xl h-[280px] group">
             <AnimatePresence mode="wait">
                <motion.div 
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 w-full h-full"
                >
                   <img src={HERO_SLIDES[currentSlide].img} className="w-full h-full object-cover opacity-80" alt="Hero Slide" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                   <div className={`absolute inset-0 flex flex-col justify-end p-8 md:p-10 text-white`}>
                      <motion.span 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ delay: 0.3 }} 
                        className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white border border-white/30 text-[10px] font-bold uppercase tracking-widest w-fit mb-4 rounded-full"
                      >
                        {HERO_SLIDES[currentSlide].tag}
                      </motion.span>
                      <motion.h2 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ delay: 0.4 }} 
                        className="text-[clamp(1.75rem,4vw,3.5rem)] font-sans font-bold mb-3 leading-tight"
                      >
                        {HERO_SLIDES[currentSlide].title}
                      </motion.h2>
                      <motion.p 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ delay: 0.5 }} 
                        className="text-slate-200 text-base font-sans font-light mb-5 max-w-lg leading-relaxed"
                      >
                        {HERO_SLIDES[currentSlide].desc}
                      </motion.p>
                      <motion.button 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ delay: 0.6 }} 
                        onClick={() => onNavigate(HERO_SLIDES[currentSlide].navTarget)} 
                        className="bg-white text-slate-900 px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-100 w-fit flex items-center gap-2 transition-all rounded-full shadow-lg hover:shadow-xl hover:scale-105"
                      >
                        {HERO_SLIDES[currentSlide].btn} <span className="material-icons text-xs">arrow_forward</span>
                      </motion.button>
                   </div>
                </motion.div>
             </AnimatePresence>
             
             {/* Slider Controls */}
             <div className="absolute top-6 right-6 flex gap-1.5 z-10">
                {HERO_SLIDES.map((_, idx) => (
                    <button 
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${idx === currentSlide ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/50'}`}
                    />
                ))}
             </div>
          </div>

          {/* Deal of Hour */}
          <div className="lg:col-span-1 bg-orange-50 dark:bg-slate-800 rounded-[1.5rem] p-4 md:p-5 relative flex flex-col justify-between h-[280px] border border-orange-100 dark:border-slate-700 overflow-hidden group">
             <div className="absolute top-0 right-0 w-48 h-48 bg-orange-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
             
             <div className="flex justify-between items-start z-10">
               <div>
                 <h3 className="font-sans font-bold text-lg text-slate-900 dark:text-white mb-0.5">Flash Deal</h3>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-orange-600 mt-0.5">Limited Stock Available</p>
               </div>
               <span className="bg-stone-900 text-white px-2.5 py-1 text-[10px] font-bold rounded-full">-45%</span>
             </div>
             
             <div className="flex-1 flex items-center justify-center relative z-10 my-4">
               <motion.img 
                  src={DEAL_PRODUCT.image} 
                  className="h-40 object-contain z-10 mix-blend-multiply dark:mix-blend-normal drop-shadow-2xl group-hover:scale-110 transition-transform duration-500" 
                  alt="Coffee" 
                />
             </div>
             
             <div className="z-10">
               <h4 className="font-sans font-bold text-base text-slate-900 dark:text-slate-100 mb-1.5 truncate">{DEAL_PRODUCT.name}</h4>
               <div className="flex items-baseline gap-3 mb-4">
                 <span className="text-2xl font-bold text-orange-600 font-sans">₦{DEAL_PRODUCT.price.toLocaleString()}</span>
                 <span className="text-xs text-stone-400 line-through font-sans">₦24,000</span>
               </div>
               <button 
                 onClick={() => addToCart(DEAL_PRODUCT, 1)}
                 className="w-full bg-slate-900 text-white py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
               >
                 <span className="material-icons text-xs">shopping_bag</span> Add to Cart
               </button>
             </div>
          </div>
        </motion.section>
        )}
            {/* Main Content */}
        <section className="flex flex-col lg:flex-row gap-8">
           {/* Sidebar */}
           <aside className="w-full lg:w-64 flex-shrink-0 lg:sticky lg:top-32 h-fit space-y-6 z-10">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                 <div className="flex items-center justify-between mb-6">
                    <h3 className="font-sans font-bold text-base text-slate-900 dark:text-white">Filters</h3>
                    <div className="lg:hidden cursor-pointer" onClick={() => {
                       // Mobile toggle logic could go here
                    }}>
                       <span className="material-icons text-base">filter_list</span>
                    </div>
                    {isFiltering && (
                        <button 
                          onClick={clearFilters}
                          className="text-xs font-bold text-orange-600 hover:text-orange-700 uppercase tracking-wider"
                        >
                           Clear
                        </button>
                     )}
                 </div>

                 <div className="space-y-8">
                    <div>
                       <h4 className="font-bold text-xs uppercase tracking-widest text-stone-400 mb-4">Categories</h4>
                       <div className="space-y-1.5">
                         {allCategories.map((cat, i) => (
                           <label 
                             key={cat} 
                             className="flex items-center gap-2.5 cursor-pointer group"
                           >
                             <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${selectedCategories.includes(cat) ? 'bg-stone-900 border-stone-900' : 'border-stone-300 group-hover:border-stone-500'}`}>
                                {selectedCategories.includes(cat) && <span className="material-icons text-white text-[10px]">check</span>}
                             </div>
                             <input 
                               type="checkbox" 
                               className="hidden" 
                               checked={selectedCategories.includes(cat)}
                               onChange={() => toggleCategory(cat)}
                             />
                             <span className={`text-xs transition-colors ${selectedCategories.includes(cat) ? 'font-bold text-stone-900 dark:text-white' : 'text-stone-600 dark:text-stone-400 group-hover:text-stone-900'}`}>{cat}</span>
                           </label>
                         ))}
                       </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-[10px] uppercase tracking-widest text-stone-400 mb-3">Price Range</h4>
                      <input 
                         type="range" 
                         min="0"
                         max="200000"
                         value={maxPrice}
                         onChange={(e) => setMaxPrice(Number(e.target.value))}
                         className="w-full h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900" 
                      />
                      <div className="flex justify-between mt-1.5 font-sans text-[10px] text-stone-500">
                         <span>₦0</span>
                         <span className="font-bold text-stone-900 dark:text-white">₦{maxPrice.toLocaleString()}</span>
                      </div>
                    </div>
                 </div>
              </div>
           </aside>

           {/* Grid */}
           <div className="flex-1">
             <div className="flex justify-between items-center mb-6 sticky top-20 z-20 bg-slate-50 dark:bg-slate-950 py-3 transition-colors">
                <h2 className="text-xl font-sans font-bold text-slate-900 dark:text-white">Fresh Inventory <span className="text-slate-400 font-normal text-base ml-1.5">({filteredProducts.length})</span></h2>
                <div className="relative group">
                    <select 
                      className="appearance-none bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-full px-5 py-2.5 pr-9 text-[10px] font-bold uppercase tracking-widest focus:ring-0 cursor-pointer shadow-sm hover:shadow-md transition-all text-stone-900 dark:text-white"
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                    >
                      <option value="relevance">Sort: Relevance</option>
                      <option value="price-low">Sort: Price Low-High</option>
                      <option value="price-high">Sort: Price High-Low</option>
                    </select>
                    <span className="material-icons absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none text-sm">expand_more</span>
                </div>
             </div>

             {filteredProducts.length === 0 ? (
               <div className="flex flex-col items-center justify-center py-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 border-dashed">
                  <div className="w-16 h-16 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center mb-5">
                      <span className="material-icons text-3xl text-stone-300">inventory_2</span>
                  </div>
                  <h3 className="text-sm font-sans font-bold text-slate-900 dark:text-white mb-0.5">No Items Found</h3>
                  <p className="text-stone-500 text-xs mb-5">Try adjusting your filters or search term.</p>
                  <button onClick={clearFilters} className="text-[10px] font-bold uppercase tracking-widest text-orange-600 hover:text-orange-700 border-b-2 border-orange-600 pb-0.5">Reset Filters</button>
               </div>
             ) : (
               <motion.div 
                 layout
                 initial="hidden"
                 animate="visible"
                 variants={stagger}
                 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
               >
                  <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product, idx) => {
                    const qty = getProductQtyInCart(product.id);
                    const cartItem = getCartItem(product.id);
                    
                    return (
                    <motion.div 
                      layout
                      key={product.id} 
                      variants={fadeInUp}
                      className="bg-white dark:bg-stone-900 p-4 rounded-2xl relative group hover:shadow-xl transition-all duration-300 border border-stone-100 dark:border-stone-800"
                      onClick={(e) => handleAddToCart(e, product)}
                    >
                      <div className="absolute top-3 left-3 z-10 flex gap-1.5">
                        {product.context === 'WHOLESALE' && (
                            <span className="bg-stone-900 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">BULK</span>
                        )}
                        {product.oldPrice && (
                            <span className="bg-orange-100 text-orange-700 text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">SALE</span>
                        )}
                      </div>

                      {/* Cart Quantity Badge */}
                      {qty > 0 && (
                        <div className="absolute top-3 right-3 z-10 bg-slate-900 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-lg">
                           {qty}
                        </div>
                      )}

                      <div className="relative h-40 mb-4 flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-xl overflow-hidden group-hover:bg-white dark:group-hover:bg-slate-800 transition-colors">
                         <img 
                          src={product.image} 
                          className="h-28 object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-110 transition-transform duration-500" 
                          alt={product.name}
                        />
                         {qty === 0 && (
                         <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button className="bg-white text-slate-900 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-transform">
                                Quick Add
                            </button>
                         </div>
                         )}
                      </div>
                      
                      <div>
                         <div className="h-10 mb-1.5">
                           <h3 className="font-sans font-bold text-slate-900 dark:text-white text-base leading-tight line-clamp-2 group-hover:text-orange-600 transition-colors">{product.name}</h3>
                         </div>
                         <div className="flex items-end justify-between">
                            <div className="flex flex-col">
                               {product.oldPrice && <span className="text-xs text-stone-400 line-through font-sans">₦{product.oldPrice.toLocaleString()}</span>}
                               <span className={`text-xl font-bold font-sans ${product.oldPrice ? 'text-orange-600' : 'text-stone-900 dark:text-stone-100'}`}>₦{product.price.toLocaleString()}</span>
                            </div>
                            
                            {/* Minimal Quantity Controls */}
                            {qty > 0 && cartItem && (
                                <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-full p-0.5" onClick={(e) => e.stopPropagation()}>
                                    <button 
                                        onClick={() => updateQuantity(cartItem.cartId, qty - 1)}
                                        className="w-6 h-6 flex items-center justify-center text-stone-500 hover:bg-white dark:hover:bg-stone-700 hover:text-stone-900 rounded-full transition-colors text-xs"
                                    >
                                        -
                                    </button>
                                    <span className="w-6 text-center font-sans text-xs font-bold text-slate-900 dark:text-white">{qty}</span>
                                    <button 
                                        onClick={() => addToCart(product, 1)}
                                        className="w-6 h-6 flex items-center justify-center text-stone-500 hover:bg-white dark:hover:bg-stone-700 hover:text-stone-900 rounded-full transition-colors text-xs"
                                    >
                                        +
                                    </button>
                                </div>
                            )}
                         </div>
                      </div>
                    </motion.div>
                    )})}
                  </AnimatePresence>
               </motion.div>
             )}
           </div>
        </section>
      </main>

      {/* Floating AI Chat Assistant */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-8 z-50 w-80 bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-100 dark:border-stone-800 overflow-hidden flex flex-col pointer-events-auto"
            style={{ maxHeight: '500px' }}
          >
             <div className="bg-stone-900 p-4 flex justify-between items-center text-white">
                <div className="flex items-center gap-2">
                   <span className="material-icons">smart_toy</span>
                   <h3 className="font-sans font-bold">AI Assistant</h3>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="hover:bg-white/20 rounded-full p-1"><span className="material-icons text-sm">close</span></button>
             </div>
             <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-stone-50 dark:bg-stone-950 h-64">
                {chatHistory.map((msg, i) => (
                   <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-stone-900 text-white rounded-br-none' : 'bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-bl-none shadow-sm border border-stone-100 dark:border-stone-700'}`}>
                         {msg.text}
                      </div>
                   </div>
                ))}
             </div>
             <form onSubmit={handleSendChat} className="p-3 border-t border-stone-100 dark:border-stone-800 bg-white dark:bg-stone-900 flex gap-2">
                <input 
                   type="text" 
                   value={chatMessage}
                   onChange={(e) => setChatMessage(e.target.value)}
                   className="flex-1 border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800 rounded-full px-4 py-2 text-sm focus:ring-stone-900 focus:border-stone-900 dark:text-white"
                   placeholder="Type a message..."
                />
                <button type="submit" className="bg-stone-900 text-white p-2 rounded-full hover:bg-stone-800 transition-colors w-10 h-10 flex items-center justify-center"><span className="material-icons text-sm">send</span></button>
             </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 right-8 z-40 flex flex-col items-end gap-2 pointer-events-none"
      >
        {!isChatOpen && (
        <motion.div 
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="bg-white dark:bg-stone-900 shadow-xl rounded-2xl p-4 mb-2 max-w-xs border border-stone-100 dark:border-stone-800 relative pointer-events-auto"
        >
           <p className="text-sm text-slate-700 dark:text-slate-200 font-sans">Hi! I noticed you're buying pasta. Need <span className="font-bold text-orange-600">tomato sauce</span>?</p>
           <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-3 h-3 bg-white dark:bg-stone-900 border-r border-b border-stone-100 dark:border-stone-800"></div>
           <button onClick={() => setIsChatOpen(false)} className="absolute top-1 right-1 text-stone-400 hover:text-stone-600"><span className="material-icons text-xs">close</span></button>
        </motion.div>
        )}
        <motion.button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.9 }}
          className="bg-stone-900 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center relative pointer-events-auto hover:bg-stone-800 transition-colors"
        >
           <span className="material-icons text-2xl">smart_toy</span>
           <span className="absolute top-0 right-0 w-3 h-3 bg-orange-500 border-2 border-white rounded-full animate-ping"></span>
           <span className="absolute top-0 right-0 w-3 h-3 bg-orange-500 border-2 border-white rounded-full"></span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Home;