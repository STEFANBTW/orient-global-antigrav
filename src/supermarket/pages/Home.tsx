import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalCart } from '../../context/GlobalCartContext';
import { useMarketProducts } from '../hooks/useMarketProducts';
import { Product } from '../types';
import { useCMS } from '../../hooks/useCMS';

interface HomeProps {
  onNavigate: (page: any) => void;
  onOpenSmartPaste?: () => void;
  onSearchOutOfView?: (out: boolean) => void;
  extSearchTerm?: string;
  onExtSearchChange?: (term: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate, onOpenSmartPaste, onSearchOutOfView, extSearchTerm = '', onExtSearchChange }) => {
  const [internalSearchTerm, setInternalSearchTerm] = useState('');
  const searchTerm = extSearchTerm || internalSearchTerm;
  const setSearchTerm = onExtSearchChange || setInternalSearchTerm;

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(200000);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortOption, setSortOption] = useState('relevance');
  const searchRef = React.useRef<HTMLDivElement>(null);

  // States for interactive elements
  const [isMicListening, setIsMicListening] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ sender: 'user' | 'bot', text: string }[]>([
    { sender: 'bot', text: "Hi! I noticed you're buying pasta. Need tomato sauce?" }
  ]);

  // Flash Deals Slides
  const FLASH_DEALS = [
    {
      id: 'deal-coffee',
      name: 'Premium Arabica Coffee Beans (1kg)',
      price: 12990,
      oldPrice: 24000,
      category: 'Beverages',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1wZpJFJka3FlypGKUsr0BoyDreoSK1yO0HNItuIXwL45jTS5sMWtJDX0xA05wzVKWEcdMe1SOjWb69PBje0fItEcORGH36VHdOesDWcLXtQBkh8La1nnsZScU27G8OcoTKxo7cd4zC8zzD1znfAXSzlVSQq57xNupl-rWunYkpDK1Y_BCzhN_AD2ML0NXdxUY6-hQUG9tyuCXWZ-Q-S4_Aqh-WhDlYgbDQE7EKXAWmmlxMZcK9DNUkIa8eQkEjH15ny70tqJDUwlo',
      discount: '-45%',
      context: 'RETAIL' as const,
      unit: '1kg pack',
      rating: 4.8
    },
    {
      id: 'deal-pasta',
      name: 'Artisan Fusilli Pasta (5kg)',
      price: 8500,
      oldPrice: 15000,
      category: 'Pantry',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfoq8Qt1i7X_77OeMmegd2_Pq0DTvro1D9LRM41EHPXBvfhGfBUFUH9Hxz6iRXpsKH0WopOq6O_kC6qnviNMVijikGIXmg2_kEoGYs1dpOg2jDHPARVYUD9l8q5TSbVWMd66a8oJEmxm4TKvrUgiDQSj9NVd1rcUAE7R5dxHnKIrs9TFbKXLxgjuA6DVPTbfZ01F1DuQ5dl6lAIl20nZh9Y_PpPo159YTLemPsPv9zW0IBTa5E5lL9qd5UMd_feG8lscDICVmlTxgD',
      discount: '-43%',
      context: 'WHOLESALE' as const,
      unit: '5kg bag',
      rating: 4.7
    },
    {
      id: 'deal-oil',
      name: 'Extra Virgin Olive Oil (2L)',
      price: 15990,
      oldPrice: 28000,
      category: 'Pantry',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJz7jDkUIg86_TDT-v0KLZPgAO2-9V1pv3RjvCTMcP2qbT01BI4V3idRe0PEcz_r2vmzFKmQW5NV-pJfbSy0LMvmpvLfACa4XrwDwqL2fvs6fl9xW0L1Q27K054mIGVnFLCOm7AqHdPBsT9eNLpjf36h9OOcJmFoPEdqwlT56Xwub4ZPB-teHtwt-C8wf2BBFKqb8E6dI8mO-Xr4rA3uX8GxYHVFrJHBhsOSIkago-Lg7IVnpVJixqjiUQ5VarxA96fq1-7BKGuqEM',
      discount: '-42%',
      context: 'RETAIL' as const,
      unit: '2L bottle',
      rating: 4.9
    }
  ];
  const [currentDealSlide, setCurrentDealSlide] = useState(0);

  const { addToCart, cart, updateQuantity } = useGlobalCart();
  const { products: MARKET_PRODUCTS, loading: productsLoading } = useMarketProducts({ context: 'RETAIL' });

  const allCategories = Array.from(new Set(MARKET_PRODUCTS.map(p => p.category)));

  const { content: cmsData, loading } = useCMS('market');

  const heroBlock = cmsData?.hero || {
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

  const dealBlock = cmsData?.deal || {
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

  // Search Bar Visibility Tracking
  useEffect(() => {
    if (!searchRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        onSearchOutOfView?.(!entry.isIntersecting);
      },
      { threshold: 0 }
    );
    observer.observe(searchRef.current);
    return () => observer.disconnect();
  }, [onSearchOutOfView]);

  // Deal Slider Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDealSlide(prev => (prev + 1) % FLASH_DEALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    return MARKET_PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesPrice = product.price <= maxPrice;
      const matchesRating = (product.rating || 0) >= minRating;
      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    }).sort((a, b) => {
      if (sortOption === 'price-low') return a.price - b.price;
      if (sortOption === 'price-high') return b.price - a.price;
      if (sortOption === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0;
    });
  }, [MARKET_PRODUCTS, searchTerm, selectedCategories, maxPrice, minRating, sortOption]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      category: product.category,
      image: product.image,
      division: 'market'
    });
  };

  const getProductQtyInCart = (productId: string) => {
    const item = cart.find(i => i.id === productId && i.division === 'market');
    return item ? item.quantity : 0;
  };

  const getCartItem = (productId: string) => {
    return cart.find(i => i.id === productId && i.division === 'market');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setMaxPrice(200000);
    setMinRating(0);
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

    const newHistory = [...chatHistory, { sender: 'user' as const, text: chatMessage }];
    setChatHistory(newHistory);
    setChatMessage('');

    // Simulate bot response
    setTimeout(() => {
      setChatHistory(prev => [...prev, { sender: 'bot', text: "I can help you find that. Check aisle 4 or click below to add it to your cart." }]);
    }, 1000);
  };

  const handleSimulateTransfer = async () => {
    try {
      const res = await fetch('/api/webhooks/pos/transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sku: 'p2', qty_sold: 5, timestamp: new Date().toISOString() })
      });
      if (res.ok) {
        alert("Transfer Verified! 5 units of 'Red Tomatoes' were sold to a customer via Bank Transfer.\\n\\nCheck the Market Admin Dashboard to see the stock decrement automatically (Zero-Touch!).");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to simulate transfer.");
    }
  };

  const isFiltering = searchTerm !== '' || selectedCategories.length > 0 || maxPrice < 200000 || minRating > 0;

  const fadeInUp: any = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.03 } }
  };

  const dealQty = getProductQtyInCart(DEAL_PRODUCT.id);

  return (
    <div className="font-sans text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <main className="max-w-[1800px] mx-auto px-4 lg:px-8 py-4 space-y-6">
        {/* Search & Smart Paste */}
        <section className="relative z-30" ref={searchRef}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-stone-900 rounded-full shadow-lg border border-stone-100 dark:border-stone-800 p-1 flex items-center max-w-4xl mx-auto transition-all duration-300 hover:shadow-2xl"
          >
            <div className="flex-1 flex items-center px-6 py-2">
              <span className="material-icons text-stone-400 mr-3 text-xl">search</span>
              <input
                type="text"
                placeholder={isMicListening ? "Listening..." : "Search fresh ingredients, wholesale bulk items, or flash deals..."}
                className="bg-transparent border-none focus:ring-0 w-full placeholder-stone-400 text-base font-sans font-medium text-stone-900 dark:text-stone-100"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 mx-2">
                  <span className="material-icons">close</span>
                </button>
              )}
              <div className="flex items-center gap-2 border-l border-stone-200 dark:border-stone-700 pl-4 ml-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleMicClick}
                  className={`p-2 rounded-full transition-colors ${isMicListening ? 'bg-orange-100 text-[var(--color-accent-light)] animate-pulse' : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400'}`}
                >
                  <span className="material-icons">{isMicListening ? 'mic_off' : 'mic'}</span>
                </motion.button>
              </div>
            </div>
            {/* Smart Paste & Simulate Transfer triggers */}
            <div className="flex items-center gap-2 ml-2 pr-1">
              <motion.button
                onClick={handleSimulateTransfer}
                whileHover={{ backgroundColor: "rgba(252, 231, 243, 1)", color: "#db2777" }}
                whileTap={{ scale: 0.98 }}
                className="bg-pink-50 text-pink-700 font-bold text-[11px] uppercase tracking-wider px-5 py-3.5 rounded-full flex items-center gap-2 transition-colors shadow-sm whitespace-nowrap"
              >
                <span className="material-icons text-[16px]">receipt_long</span>
                <span className="hidden md:inline">Simulate Transfer</span>
              </motion.button>
              <motion.button
                onClick={onOpenSmartPaste}
                whileHover={{ backgroundColor: "rgba(245, 245, 244, 1)" }}
                whileTap={{ scale: 0.98 }}
                className="bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-200 font-bold text-[11px] uppercase tracking-wider px-5 py-3.5 rounded-full flex items-center gap-2 transition-colors shadow-sm whitespace-nowrap"
              >
                <span className="material-icons text-stone-900 dark:text-white text-base">content_paste</span>
                <span className="hidden md:inline">Smart Paste</span>
              </motion.button>
            </div>
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
            <div className="lg:col-span-2 relative bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl min-h-[60vh] group border border-white/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img src={HERO_SLIDES[currentSlide].img} className="w-full h-full object-cover opacity-70 transform hover:scale-105 transition-transform duration-[10s] ease-linear" alt="Hero Slide" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/40 to-transparent"></div>
                  <div className={`absolute inset-0 flex flex-col justify-end p-12 md:p-16 text-white`}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center gap-2 mb-6"
                    >
                      <span className="px-4 py-1.5 bg-orange-600/90 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg">
                        {HERO_SLIDES[currentSlide].tag}
                      </span>
                      <div className="h-px w-12 bg-white/20"></div>
                    </motion.div>
                    <motion.h2
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, type: "spring", damping: 12 }}
                      className="text-[clamp(2.5rem,6vw,5rem)] font-sans font-black mb-6 leading-[0.95] tracking-tight whitespace-pre-line"
                    >
                      {HERO_SLIDES[currentSlide].title}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-slate-300 text-lg md:text-xl font-sans font-light mb-8 max-w-xl leading-relaxed opacity-90"
                    >
                      {HERO_SLIDES[currentSlide].desc}
                    </motion.p>
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      onClick={() => onNavigate(HERO_SLIDES[currentSlide].navTarget)}
                      className="group bg-white text-slate-950 px-8 py-4 text-xs font-black uppercase tracking-[0.15em] hover:bg-[var(--color-accent-light)] hover:text-white w-fit flex items-center gap-3 transition-all rounded-full shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] hover:shadow-[#ff6a00]/30 hover:-translate-y-1 active:translate-y-0"
                    >
                      {HERO_SLIDES[currentSlide].btn}
                      <span className="material-icons text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slider Controls */}
              <div className="absolute top-10 right-10 flex flex-col gap-3 z-10">
                {HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentSlide ? 'w-12 bg-[var(--color-accent-light)]' : 'w-4 bg-white/30 hover:bg-white/50'}`}
                  />
                ))}
              </div>
            </div>

            {/* Deal of Hour - Vertical Carousel */}
            <div className="lg:col-span-1 bg-[#1a1c1e] dark:bg-slate-900 rounded-[2.5rem] relative flex flex-col min-h-[60vh] border border-white/5 overflow-hidden group shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-600 z-20"></div>

              <div className="p-8 pb-0 z-10 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    <h3 className="font-sans font-black text-xs uppercase tracking-[0.2em] text-white/50">Flash Deals</h3>
                  </div>
                  <h4 className="text-2xl font-black text-white leading-tight underline decoration-orange-500 decoration-4 underline-offset-4">Top Offers</h4>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentDealSlide(prev => (prev - 1 + FLASH_DEALS.length) % FLASH_DEALS.length)}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors border border-white/10"
                  >
                    <span className="material-icons text-sm">north</span>
                  </button>
                  <button
                    onClick={() => setCurrentDealSlide(prev => (prev + 1) % FLASH_DEALS.length)}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors border border-white/10"
                  >
                    <span className="material-icons text-sm">south</span>
                  </button>
                </div>
              </div>

              <div className="flex-1 relative overflow-hidden">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={currentDealSlide}
                    initial={{ y: 200, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: -200, opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 flex flex-col p-8"
                  >
                    <div className="relative flex-1 flex items-center justify-center mb-8">
                      <div className="absolute inset-0 bg-white/5 rounded-full blur-[60px] scale-75"></div>
                      <img
                        src={FLASH_DEALS[currentDealSlide].image}
                        className="h-56 object-contain z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-700"
                        alt="Deal"
                      />
                      <span className="absolute top-0 right-0 bg-[var(--color-accent-light)] text-white px-4 py-2 text-sm font-black rounded-2xl shadow-xl rotate-12">{FLASH_DEALS[currentDealSlide].discount}</span>
                    </div>

                    <div className="z-10">
                      <h4 className="font-sans font-black text-xl text-white mb-2 leading-tight line-clamp-2">{FLASH_DEALS[currentDealSlide].name}</h4>
                      <div className="flex items-center gap-1 mb-2">
                        <span className="material-icons text-[var(--color-accent-light)] text-sm">star</span>
                        <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">{FLASH_DEALS[currentDealSlide].rating || '4.5'}</span>
                      </div>
                      <div className="flex items-baseline gap-3 mb-6">
                        <span className="text-3xl font-black text-[var(--color-accent-light)] font-sans">₦{FLASH_DEALS[currentDealSlide].price.toLocaleString()}</span>
                        <span className="text-sm text-white/30 line-through font-sans">₦{FLASH_DEALS[currentDealSlide].oldPrice.toLocaleString()}</span>
                      </div>
                      <button
                        onClick={() => addToCart({
                          id: FLASH_DEALS[currentDealSlide].id,
                          name: FLASH_DEALS[currentDealSlide].name,
                          price: FLASH_DEALS[currentDealSlide].price,
                          quantity: 1,
                          category: FLASH_DEALS[currentDealSlide].category,
                          image: FLASH_DEALS[currentDealSlide].image,
                          division: 'market'
                        })}
                        className="group w-full bg-white text-slate-950 py-4 rounded-3xl text-xs font-black uppercase tracking-[0.2em] hover:bg-[var(--color-accent-light)] hover:text-white transition-all shadow-[0_15px_30px_-5px_rgba(0,0,0,0.3)] flex items-center justify-center gap-3"
                      >
                        <span className="material-icons text-sm group-hover:rotate-12 transition-transform">bolt</span> Claim Deal
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.section>
        )}
        {/* Main Content */}
        <section className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-72 flex-shrink-0 lg:sticky lg:top-36 h-fit space-y-8 z-10">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] border border-slate-100 dark:border-slate-800 transition-all hover:shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-sans font-black text-xl text-slate-950 dark:text-white tracking-tight">Refine</h3>
                {isFiltering && (
                  <button
                    onClick={clearFilters}
                    className="text-[10px] font-black text-[var(--color-accent-light)] hover:text-orange-700 uppercase tracking-[0.2em] transition-colors"
                  >
                    Reset
                  </button>
                )}
              </div>

              <div className="space-y-10">
                <div>
                  <h4 className="font-black text-[10px] uppercase tracking-[0.25em] text-slate-400 mb-6">Explore Sections</h4>
                  <div className="space-y-2">
                    {allCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => toggleCategory(cat)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all group ${selectedCategories.includes(cat) ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-xl' : 'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                      >
                        <span className={`text-xs font-bold ${selectedCategories.includes(cat) ? '' : 'group-hover:text-slate-950 dark:group-hover:text-white'}`}>{cat}</span>
                        {selectedCategories.includes(cat) ? (
                          <span className="material-icons text-sm">remove_circle</span>
                        ) : (
                          <span className="material-icons text-sm opacity-0 group-hover:opacity-100 transition-opacity">add_circle</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-black text-[10px] uppercase tracking-[0.25em] text-slate-400 mb-6">Price Budget</h4>
                  <div className="px-2">
                    <input
                      type="range"
                      min="0"
                      max="200000"
                      step="1000"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#ff6a00]"
                    />
                    <div className="flex justify-between mt-4">
                      <span className="text-[10px] font-bold text-slate-400">₦0</span>
                      <span className="text-xs font-black text-slate-950 dark:text-white bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-100 dark:border-slate-700">₦{maxPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-black text-[10px] uppercase tracking-[0.25em] text-slate-400 mb-6">Min. Rating</h4>
                  <div className="flex items-center gap-1.5 justify-between bg-slate-50 dark:bg-slate-800/50 p-2 rounded-2xl border border-slate-100 dark:border-slate-700">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setMinRating(star === minRating ? 0 : star)}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${minRating >= star ? 'bg-slate-950 dark:bg-white text-[var(--color-accent-light)] shadow-lg' : 'text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                      >
                        <span className="material-icons text-base">star</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 flex justify-center">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{minRating > 0 ? `${minRating}+ Stars Only` : 'Show All Ratings'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[var(--color-accent-light)] to-red-600 rounded-[2rem] p-8 text-white shadow-2xl overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              <h3 className="text-xl font-black mb-2 relative z-10">Loyalty Rewards</h3>
              <p className="text-xs text-white/80 mb-6 font-medium relative z-10">Earn 5% back on every fresh produce bunch. Platinum members get free delivery.</p>
              <button onClick={() => onNavigate('Loyalty')} className="w-full bg-slate-950/20 backdrop-blur-md border border-white/30 text-white py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-slate-950 transition-all relative z-10">View Benefits</button>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8 sticky top-[132px] lg:top-[188px] z-20 bg-slate-50 dark:bg-slate-950 py-4 transition-colors">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight">Market Fresh</h2>
                <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{filteredProducts.length} Items</span>
              </div>
              <div className="relative group">
                <select
                  className="appearance-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-3.5 pr-10 text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-[var(--color-accent-light)] cursor-pointer shadow-xl hover:shadow-2xl transition-all text-slate-950 dark:text-white"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="relevance">Relevance</option>
                  <option value="rating">Top Rated</option>
                  <option value="price-low">Price: Low-High</option>
                  <option value="price-high">Price: High-Low</option>
                </select>
                <span className="material-icons absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-base">swap_vert</span>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 border-dashed">
                <div className="w-16 h-16 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center mb-5">
                  <span className="material-icons text-3xl text-stone-300">inventory_2</span>
                </div>
                <h3 className="text-sm font-sans font-bold text-slate-900 dark:text-white mb-0.5">No Items Found</h3>
                <p className="text-stone-500 text-xs mb-5">Try adjusting your filters or search term.</p>
                <button onClick={clearFilters} className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent-light)] hover:text-orange-700 border-b-2 border-orange-600 pb-0.5">Reset Filters</button>
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
                        className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] relative group hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-slate-800 flex flex-col hover:-translate-y-1"
                        onClick={(e) => handleAddToCart(e, product)}
                      >
                        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                          {product.context === 'WHOLESALE' && (
                            <span className="bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest shadow-lg">BULK</span>
                          )}
                          {product.oldPrice && (
                            <span className="bg-[var(--color-accent-light)] text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest shadow-lg">DEAL</span>
                          )}
                        </div>

                        {/* Top Right Actions */}
                        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 shadow-lg text-slate-400 hover:text-red-500 transition-colors flex items-center justify-center border border-slate-100 dark:border-slate-700">
                            <span className="material-icons text-base">favorite_border</span>
                          </button>
                        </div>

                        <div className="relative h-48 mb-6 flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-3xl overflow-hidden group-hover:bg-white dark:group-hover:bg-slate-800 transition-all duration-500">
                          <img
                            src={product.image}
                            className="h-32 object-contain mix-blend-multiply dark:mix-blend-normal transform group-hover:scale-110 transition-transform duration-700 ease-out"
                            alt={product.name}
                          />
                          {qty === 0 && (
                            <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <div className="bg-white text-slate-950 text-[10px] font-black uppercase tracking-[0.2em] px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <span className="material-icons text-sm">add</span> Add Fast
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex-1 flex flex-col">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-1 mb-1">
                                <span className="material-icons text-orange-400 text-xs">star</span>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{product.rating || '4.5'}</span>
                              </div>
                              <h3 className="font-sans font-black text-slate-950 dark:text-white text-base leading-tight line-clamp-2 group-hover:text-[var(--color-accent-light)] transition-colors">{product.name}</h3>
                            </div>
                          </div>

                          <div className="mt-auto flex items-center justify-between pt-2">
                            <div className="flex flex-col">
                              <span className={`text-2xl font-black font-sans tracking-tight ${product.oldPrice ? 'text-[var(--color-accent-light)]' : 'text-slate-950 dark:text-white'}`}>
                                ₦{product.price.toLocaleString()}
                              </span>
                              {product.oldPrice && (
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-slate-400 line-through font-bold opacity-60">₦{product.oldPrice.toLocaleString()}</span>
                                  <span className="text-[9px] font-black text-white bg-green-500 px-1.5 py-0.5 rounded-md">SAVE 40%</span>
                                </div>
                              )}
                            </div>

                            {qty > 0 ? (
                              <div className="flex items-center bg-slate-950 dark:bg-white rounded-2xl p-1 shadow-xl" onClick={(e) => e.stopPropagation()}>
                                <button
                                  onClick={() => updateQuantity(cartItem!.id, qty - 1)}
                                  className="w-8 h-8 flex items-center justify-center text-white/50 dark:text-slate-400 hover:text-white dark:hover:text-slate-950 transition-colors"
                                >
                                  <span className="material-icons text-sm">remove</span>
                                </button>
                                <span className="w-8 text-center font-sans text-xs font-black text-white dark:text-slate-950">{qty}</span>
                                  <button
                                  onClick={() => addToCart({
                                    id: product.id,
                                    name: product.name,
                                    price: product.price,
                                    quantity: 1,
                                    category: product.category,
                                    image: product.image,
                                    division: 'market'
                                  })}
                                  className="w-8 h-8 flex items-center justify-center text-white/50 dark:text-slate-400 hover:text-white dark:hover:text-slate-950 transition-colors"
                                >
                                  <span className="material-icons text-sm">add</span>
                                </button>
                              </div>
                            ) : (
                              <div className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300 group-hover:bg-[var(--color-accent-light)] group-hover:text-white transition-all transform group-hover:rotate-90">
                                <span className="material-icons text-lg">add</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
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
            <p className="text-sm text-slate-700 dark:text-slate-200 font-sans">Hi! I noticed you're buying pasta. Need <span className="font-bold text-[var(--color-accent-light)]">tomato sauce</span>?</p>
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
          <span className="absolute top-0 right-0 w-3 h-3 bg-[var(--color-accent-light)] border-2 border-white rounded-full animate-ping"></span>
          <span className="absolute top-0 right-0 w-3 h-3 bg-[var(--color-accent-light)] border-2 border-white rounded-full"></span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Home;