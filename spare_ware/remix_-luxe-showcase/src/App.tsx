import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Hub from "./views/Hub";
import Smartphones from "./views/Smartphones";
import Laptops from "./views/Laptops";
import Audio from "./views/Audio";
import TVs from "./views/TVs";
import Gaming from "./views/Gaming";
import Wearables from "./views/Wearables";
import Cameras from "./views/Cameras";
import AppliancesHub from "./views/AppliancesHub";
import LargeAppliances from "./views/LargeAppliances";
import KitchenAppliances from "./views/KitchenAppliances";
import ClimateControl from "./views/ClimateControl";
import FloorCare from "./views/FloorCare";
import BooksStationeryHub from "./views/BooksStationeryHub";
import ArtsCrafts from "./views/ArtsCrafts";
import OfficeTech from "./views/OfficeTech";
import NotebooksPaper from "./views/NotebooksPaper";
import BooksMagazines from "./views/BooksMagazines";
import SchoolSupplies from "./views/SchoolSupplies";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  ChevronRight,
  ChevronLeft,
  Star,
  Zap,
  Heart,
  Plus,
  Laptop,
  Tv,
  Apple,
  Shirt,
  Sofa,
  Dumbbell,
  Car,
  Baby,
  BookOpen,
  Coffee,
  ShoppingBag,
  HeartPulse,
  Tag,
  Flame,
  ShieldCheck,
  SlidersHorizontal,
  ChevronDown,
  Check,
  RotateCcw,
  Truck,
  Sparkles,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "./components/theme-provider";

export interface Product {
  id: string;
  brand: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  badge?: string;
  image: string;
  [key: string]: unknown;
}

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [currentView, setCurrentView] = useState("home"); // "home" or "groceries"
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { theme, setTheme } = useTheme();

  const addToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  const navigateTo = (view: string) => {
    setCurrentView(view);
    window.scrollTo(0, 0); // Scroll to top on navigation
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      {/* Hide scrollbar utility & Marquee Animation */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        /* Custom Checkbox */
        .custom-checkbox input:checked + div {
          background-color: #f97316;
          border-color: #f97316;
        }
        .custom-checkbox input:checked + div svg {
          opacity: 1;
        }
      `,
        }}
      />

      <motion.div
        animate={{
          filter: selectedProduct ? "blur(12px)" : "blur(0px)",
          scale: selectedProduct ? 0.98 : 1,
          opacity: selectedProduct ? 0.4 : 1,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="min-h-screen"
      >
        {/* --- 0. TOP NAVBAR --- */}
      {["home", "groceries"].includes(currentView) && (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 gap-4">
              {/* Logo & Mobile Menu */}
              <div className="flex items-center gap-3">
                <button className="p-2 -ml-2 text-slate-600 hover:text-orange-600 lg:hidden">
                  <Menu size={24} />
                </button>
                <div
                  className="flex items-center gap-2 cursor-pointer group"
                  onClick={() => navigateTo("home")}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-700 rounded-lg flex items-center justify-center font-black text-white text-sm shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
                    OG
                  </div>
                  <span className="font-black text-xl tracking-tight hidden sm:block">
                    Orient<span className="text-orange-500">.</span>
                  </span>
                </div>
              </div>

              {/* Search Bar (Desktop) */}
              <div className="flex-1 max-w-2xl hidden md:block relative">
                <input
                  type="text"
                  placeholder="Search groceries, electronics, fashion..."
                  className="w-full bg-slate-100 border-transparent focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl py-2.5 pl-12 pr-4 text-sm transition-all outline-none"
                />
                <Search
                  size={18}
                  className="absolute left-4 top-3 text-slate-400"
                />
                <button className="absolute right-2 top-1.5 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-orange-500 transition-colors">
                  Search
                </button>
              </div>

              {/* Right Icons */}
              <div className="flex items-center gap-2 sm:gap-4">
                <button
                  className="p-2 text-slate-600 hover:text-orange-600 transition-colors"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
                </button>
                <button className="p-2 text-slate-600 hover:text-orange-600 md:hidden">
                  <Search size={24} />
                </button>
                <button className="p-2 text-slate-600 hover:text-orange-600 hidden sm:block">
                  <User size={24} />
                </button>
                <button
                  className="p-2 text-slate-600 hover:text-orange-600 relative group"
                  onClick={() => {}}
                >
                  <ShoppingCart size={24} />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white shadow-sm transform scale-100 group-hover:scale-110 transition-transform">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* ========================================== */}
      {/* VIEW: HOME STOREFRONT                      */}
      {/* ========================================== */}
      {currentView === "home" && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12 fade-in">
          {/* --- 1. QUICK JUMP HUB --- */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest">
                Explore Departments
              </h2>
            </div>
            <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-4 snap-x">
              {categories.map((cat, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    if (cat.name === "Groceries") navigateTo("groceries");
                    if (cat.name === "Electronics") navigateTo("hub");
                    if (cat.name === "Appliances") navigateTo("appliances");
                    if (cat.name === "Books & Stationery") navigateTo("books-stationery");
                  }}
                  className="flex flex-col items-center gap-2 min-w-[72px] sm:min-w-[80px] snap-start cursor-pointer group"
                >
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center shadow-sm border transition-all duration-300 group-hover:scale-105 ${cat.active ? "bg-orange-50 border-orange-200 text-orange-600" : "bg-white border-slate-100 text-slate-500 group-hover:border-orange-200 group-hover:text-orange-500"}`}
                  >
                    {cat.icon}
                  </div>
                  <span
                    className={`text-[10px] font-bold text-center leading-tight ${cat.active ? "text-orange-600" : "text-slate-600"}`}
                  >
                    {cat.name}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* --- 2. HEAVYWEIGHT CATEGORY: GROCERIES --- */}
          <section>
            <div className="flex items-end justify-between mb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                  Groceries & Fresh Food
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Farm-fresh produce and everyday essentials.
                </p>
              </div>
              <button
                onClick={() => navigateTo("groceries")}
                className="hidden sm:flex items-center gap-1 text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors"
              >
                Explore All <ChevronRight size={16} />
              </button>
            </div>

            <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-6 pb-2">
              {[
                "All",
                "Fresh Produce",
                "Meat & Poultry",
                "Dairy & Chilled",
                "Pantry Staples",
                "Snacks",
              ].map((sub, idx) => (
                <button
                  key={idx}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${idx === 0 ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"}`}
                >
                  {sub}
                </button>
              ))}
            </div>

            <div className="flex overflow-x-auto hide-scrollbar gap-5 pb-6 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0">
              {groceriesData.slice(0, 5).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={addToCart}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
              <div className="min-w-[150px] flex items-center justify-center snap-start">
                <button
                  onClick={() => navigateTo("groceries")}
                  className="flex flex-col items-center gap-2 text-orange-500 hover:text-orange-600 group"
                >
                  <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                    <ChevronRight size={24} />
                  </div>
                  <span className="text-xs font-bold">View All</span>
                </button>
              </div>
            </div>
          </section>

          {/* --- 3. PATTERN BREAKER 1: PROMO BANNER --- */}
          <section>
            <div className="w-full bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl shadow-orange-600/20 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-8">
              <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-10 -mb-10 w-40 h-40 bg-yellow-400/20 rounded-full blur-2xl"></div>

              <div className="relative z-10 text-center sm:text-left max-w-xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                  <Zap size={12} className="text-yellow-300" /> Golden Hour
                  Active
                </div>
                <h2 className="text-3xl sm:text-5xl font-black mb-4 leading-tight">
                  30% Off Premium Appliances.
                </h2>
                <p className="text-white/80 text-sm sm:text-base font-medium mb-6">
                  Upgrade your kitchen and home with top brands. Sale ends in 2
                  hours.
                </p>
                <button className="bg-white text-orange-600 px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-slate-50 hover:scale-105 transition-all">
                  Shop the Sale
                </button>
              </div>

              <div className="relative z-10 w-48 h-48 sm:w-64 sm:h-64 shrink-0 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-2xl">
                <Tv size={80} className="text-white drop-shadow-lg" />
                <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-slate-900 w-20 h-20 rounded-full flex flex-col items-center justify-center font-black rotate-12 shadow-xl border-4 border-orange-600">
                  <span className="text-xl leading-none">-30%</span>
                  <span className="text-[10px] uppercase">Off</span>
                </div>
              </div>
            </div>
          </section>

          {/* --- 4. HEAVYWEIGHT CATEGORY: ELECTRONICS --- */}
          <section>
            <div className="flex items-end justify-between mb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                  Electronics & Gadgets
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  The latest tech, smartphones, and home entertainment.
                </p>
              </div>
              <button
                onClick={() => navigateTo("hub")}
                className="hidden sm:flex items-center gap-1 text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors"
              >
                Explore All <ChevronRight size={16} />
              </button>
            </div>

            <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-6 pb-2">
              {[
                "All",
                "Smartphones",
                "Laptops",
                "Audio",
                "Gaming",
                "Wearables",
              ].map((sub, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (sub === "All") navigateTo("hub");
                    if (sub === "Smartphones") navigateTo("smartphones");
                    if (sub === "Laptops") navigateTo("laptops");
                    if (sub === "Audio") navigateTo("audio");
                    if (sub === "Gaming") navigateTo("gaming");
                    if (sub === "Wearables") navigateTo("wearables");
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${idx === 0 ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"}`}
                >
                  {sub}
                </button>
              ))}
            </div>

            <div className="flex overflow-x-auto hide-scrollbar gap-5 pb-6 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0">
              {electronicsData.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={addToCart}
                  onClick={() => setSelectedProduct(product)}
                  large
                />
              ))}
              <div className="min-w-[150px] flex items-center justify-center snap-start">
                <button
                  onClick={() => navigateTo("hub")}
                  className="flex flex-col items-center gap-2 text-orange-500 hover:text-orange-600 group"
                >
                  <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                    <ChevronRight size={24} />
                  </div>
                  <span className="text-xs font-bold">View All</span>
                </button>
              </div>
            </div>
          </section>

          {/* --- 5. PATTERN BREAKER 2: FLASH SALE STRIP --- */}
          <section className="bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-white flex flex-col xl:flex-row gap-8 items-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="w-full xl:w-1/4 shrink-0 text-center xl:text-left z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/20 text-red-400 rounded-full text-xs font-black uppercase tracking-widest mb-4">
                <Flame size={14} fill="currentColor" /> Limited Time
              </div>
              <h2 className="text-3xl font-black mb-2">Flash Deals</h2>
              <p className="text-slate-400 text-sm mb-6">
                Incredible discounts across all categories. Prices drop back
                soon.
              </p>

              <div className="flex justify-center xl:justify-start gap-3">
                <div className="bg-slate-800 rounded-lg p-3 w-16 text-center shadow-inner border border-slate-700">
                  <div className="text-xl font-black text-orange-400">02</div>
                  <div className="text-[9px] uppercase tracking-wider text-slate-500 mt-1">
                    Hours
                  </div>
                </div>
                <div className="text-2xl font-black text-slate-600 self-center">
                  :
                </div>
                <div className="bg-slate-800 rounded-lg p-3 w-16 text-center shadow-inner border border-slate-700">
                  <div className="text-xl font-black text-orange-400">45</div>
                  <div className="text-[9px] uppercase tracking-wider text-slate-500 mt-1">
                    Mins
                  </div>
                </div>
                <div className="text-2xl font-black text-slate-600 self-center">
                  :
                </div>
                <div className="bg-slate-800 rounded-lg p-3 w-16 text-center shadow-inner border border-slate-700">
                  <div className="text-xl font-black text-red-400 animate-pulse">
                    10
                  </div>
                  <div className="text-[9px] uppercase tracking-wider text-slate-500 mt-1">
                    Secs
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full xl:w-3/4 flex overflow-x-auto hide-scrollbar gap-4 pb-4 snap-x z-10">
              {flashSaleData.map((product) => (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="min-w-[160px] sm:min-w-[200px] bg-slate-800 border border-slate-700 rounded-2xl p-3 flex flex-col snap-start group cursor-pointer hover:border-orange-500 transition-colors"
                >
                  <div className="relative h-32 sm:h-40 bg-white rounded-xl overflow-hidden mb-3">
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded z-10">
                      -
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100,
                      )}
                      %
                    </div>
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-semibold text-slate-200 text-xs line-clamp-2 mb-2">
                    {product.name}
                  </h3>
                  <div className="mt-auto flex items-end justify-between">
                    <div>
                      <div className="font-black text-orange-400 text-sm sm:text-base">
                        ₦{product.price.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-500 line-through">
                        ₦{product.originalPrice.toLocaleString()}
                      </div>
                    </div>
                    <button
                      onClick={addToCart}
                      className="w-7 h-7 rounded-full bg-slate-700 text-white flex items-center justify-center hover:bg-orange-500 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* --- 6. LIGHTWEIGHT ROW: FASHION --- */}
          <section>
            <div className="flex items-end justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                  <Shirt size={20} />
                </div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                  Fashion & Apparel
                </h2>
              </div>
              <button className="text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors flex items-center gap-1">
                View All <ChevronRight size={16} />
              </button>
            </div>
            <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-4 snap-x -mx-4 px-4 sm:mx-0 sm:px-0">
              {fashionData.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={addToCart}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          </section>

          {/* --- 7. LIGHTWEIGHT ROW: HOME & FURNITURE --- */}
          <section>
            <div className="flex items-end justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                  <Sofa size={20} />
                </div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                  Home & Furniture
                </h2>
              </div>
              <button className="text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors flex items-center gap-1">
                View All <ChevronRight size={16} />
              </button>
            </div>
            <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-4 snap-x -mx-4 px-4 sm:mx-0 sm:px-0">
              {furnitureData.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={addToCart}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          </section>

          {/* --- 8. PATTERN BREAKER 3: THE BENTO BOX --- */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-auto lg:h-[400px]">
            <div className="lg:col-span-2 relative rounded-3xl overflow-hidden group cursor-pointer h-64 lg:h-full">
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200&auto=format&fit=crop"
                alt="Kitchen Setup"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex flex-col justify-end p-6 sm:p-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest mb-3 w-max">
                  Home Makeover
                </div>
                <h3 className="text-2xl sm:text-4xl font-black text-white mb-2 leading-tight">
                  Upgrade Your Kitchen
                  <br />
                  for the Holidays.
                </h3>
                <p className="text-slate-300 text-sm max-w-md mb-4 hidden sm:block">
                  Discover our new collection of premium blenders, smart
                  fridges, and elegant dining ware.
                </p>
                <button className="bg-white text-slate-900 text-sm font-bold px-6 py-2.5 rounded-xl w-max hover:bg-orange-500 hover:text-white transition-colors">
                  Shop Appliances
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:h-full">
              <div className="relative rounded-3xl overflow-hidden group cursor-pointer h-48 lg:h-[calc(50%-0.5rem)]">
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop"
                  alt="Sneakers"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex flex-col justify-end p-5">
                  <h3 className="text-lg font-black text-white leading-tight">
                    Streetwear
                    <br />
                    Essentials
                  </h3>
                  <div className="text-orange-400 text-xs font-bold mt-1 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Explore <ChevronRight size={12} />
                  </div>
                </div>
              </div>
              <div className="relative rounded-3xl overflow-hidden group cursor-pointer h-48 lg:h-[calc(50%-0.5rem)]">
                <img
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop"
                  alt="Skincare"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex flex-col justify-end p-5">
                  <h3 className="text-lg font-black text-white leading-tight">
                    Premium
                    <br />
                    Skincare
                  </h3>
                  <div className="text-orange-400 text-xs font-bold mt-1 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Shop Beauty <ChevronRight size={12} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* --- 9. LIGHTWEIGHT ROW: HEALTH & BEAUTY --- */}
          <section>
            <div className="flex items-end justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                  <HeartPulse size={20} />
                </div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                  Health & Beauty
                </h2>
              </div>
              <button className="text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors flex items-center gap-1">
                View All <ChevronRight size={16} />
              </button>
            </div>
            <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-4 snap-x -mx-4 px-4 sm:mx-0 sm:px-0">
              {healthData.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={addToCart}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          </section>

          {/* --- 10. PATTERN BREAKER 4: BRAND MARQUEE --- */}
          <section className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center gap-6 overflow-hidden">
            <div className="shrink-0 flex items-center gap-2 pr-6 sm:border-r border-slate-100">
              <ShieldCheck size={24} className="text-orange-500" />
              <div>
                <h3 className="font-black text-slate-800 text-sm leading-tight">
                  Official Partners
                </h3>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                  100% Authentic
                </p>
              </div>
            </div>

            <div className="w-full overflow-hidden flex relative">
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

              <div className="animate-marquee gap-12 sm:gap-20 items-center">
                {brandNames.map((brand, i) => (
                  <span
                    key={i}
                    className="text-2xl sm:text-3xl font-black text-slate-300 hover:text-slate-800 transition-colors cursor-pointer select-none"
                  >
                    {brand}
                  </span>
                ))}
                {/* Duplicate for seamless looping */}
                {brandNames.map((brand, i) => (
                  <span
                    key={`dup-${i}`}
                    className="text-2xl sm:text-3xl font-black text-slate-300 hover:text-slate-800 transition-colors cursor-pointer select-none"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* --- 11. LIGHTWEIGHT ROW: BABY & TOYS --- */}
          <section>
            <div className="flex items-end justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                  <Baby size={20} />
                </div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                  Baby & Toys
                </h2>
              </div>
              <button className="text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors flex items-center gap-1">
                View All <ChevronRight size={16} />
              </button>
            </div>
            <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-4 snap-x -mx-4 px-4 sm:mx-0 sm:px-0">
              {babyData.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={addToCart}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          </section>
        </main>
      )}

      {/* ========================================== */}
      {/* VIEW: CATEGORY LISTING PAGE (GROCERIES)    */}
      {/* ========================================== */}
      {currentView === "groceries" && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 fade-in">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6">
            <span
              className="cursor-pointer hover:text-orange-600 transition-colors"
              onClick={() => navigateTo("home")}
            >
              Home
            </span>
            <ChevronRight size={12} />
            <span className="text-slate-900 font-bold">
              Groceries & Fresh Food
            </span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* --- LEFT PANEL: SMART FILTER BAR --- */}
            <aside className="w-full lg:w-64 shrink-0 hidden lg:block space-y-8 sticky top-24 h-max">
              {/* Filter Section: Sub-categories */}
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">
                  Categories
                </h3>
                <ul className="space-y-2.5">
                  {[
                    "All Groceries",
                    "Fresh Produce",
                    "Meat & Poultry",
                    "Dairy & Eggs",
                    "Pantry Staples",
                    "Snacks & Sweets",
                    "Frozen Foods",
                  ].map((cat, i) => (
                    <li key={i}>
                      <button
                        className={`text-sm hover:text-orange-600 transition-colors w-full text-left flex justify-between items-center ${i === 0 ? "font-bold text-orange-600" : "text-slate-600 font-medium"}`}
                      >
                        {cat}
                        <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                          {Math.floor((i * 17) % 100) + 10}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="h-px w-full bg-slate-200"></div>

              {/* Filter Section: Dietary Needs */}
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">
                  Dietary & Lifestyle
                </h3>
                <div className="space-y-3">
                  <FilterCheckbox label="Organic" count="45" />
                  <FilterCheckbox label="Gluten-Free" count="28" />
                  <FilterCheckbox label="Vegan / Plant-Based" count="64" />
                  <FilterCheckbox label="Halal" count="112" />
                  <FilterCheckbox label="Sugar-Free / Keto" count="19" />
                </div>
              </div>

              <div className="h-px w-full bg-slate-200"></div>

              {/* Filter Section: Sourcing */}
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">
                  Sourcing & Origin
                </h3>
                <div className="space-y-3">
                  <FilterCheckbox
                    label="Plateau Sourced (Local)"
                    count="89"
                    checked
                  />
                  <FilterCheckbox label="Made in Nigeria" count="240" />
                  <FilterCheckbox label="Imported" count="156" />
                </div>
              </div>

              <div className="h-px w-full bg-slate-200"></div>

              {/* Filter Section: Price Range */}
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">
                  Price Range
                </h3>
                <div className="flex items-center gap-2">
                  <div className="relative w-full">
                    <span className="absolute left-3 top-2.5 text-slate-400 text-sm">
                      ₦
                    </span>
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-7 pr-3 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                    />
                  </div>
                  <span className="text-slate-400">-</span>
                  <div className="relative w-full">
                    <span className="absolute left-3 top-2.5 text-slate-400 text-sm">
                      ₦
                    </span>
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-7 pr-3 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="h-px w-full bg-slate-200"></div>

              {/* Filter Section: Brand */}
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">
                  Brand
                </h3>
                <div className="relative mb-3">
                  <Search
                    size={14}
                    className="absolute left-3 top-2.5 text-slate-400"
                  />
                  <input
                    type="text"
                    placeholder="Search brands..."
                    className="w-full bg-slate-100 border-transparent rounded-lg py-2 pl-9 pr-3 text-xs focus:bg-white focus:border-orange-500 outline-none"
                  />
                </div>
                <div className="space-y-3 max-h-40 overflow-y-auto custom-scrollbar pr-2">
                  <FilterCheckbox label="Farm Fresh" count="34" />
                  <FilterCheckbox label="Orient Bakery" count="12" />
                  <FilterCheckbox label="Dangote" count="45" />
                  <FilterCheckbox label="Nestle" count="28" />
                  <FilterCheckbox label="Kellogg's" count="15" />
                </div>
              </div>
            </aside>

            {/* --- RIGHT PANEL: PRODUCT GRID --- */}
            <div className="flex-1">
              {/* Category Header & Tools */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2 relative z-10">
                  Groceries & Fresh Food
                </h1>
                <p className="text-slate-500 max-w-2xl relative z-10">
                  Stock up on farm-fresh produce sourced directly from Plateau
                  farmers, alongside premium pantry staples and daily
                  essentials.
                </p>
              </div>

              {/* Mobile Filter Button & Sort Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <button className="lg:hidden flex items-center justify-center gap-2 w-full sm:w-auto bg-slate-900 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-sm">
                  <SlidersHorizontal size={16} /> Filters (3)
                </button>

                <div className="text-sm font-medium text-slate-500 hidden lg:block">
                  Showing <span className="font-bold text-slate-900">1-12</span>{" "}
                  of <span className="font-bold text-slate-900">1,240</span>{" "}
                  products
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <span className="text-sm font-medium text-slate-500 whitespace-nowrap">
                    Sort by:
                  </span>
                  <div className="relative w-full sm:w-48">
                    <select className="w-full appearance-none bg-white border border-slate-200 rounded-xl py-2.5 pl-4 pr-10 text-sm font-semibold text-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none cursor-pointer">
                      <option>Recommended</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Newest Arrivals</option>
                      <option>Top Rated</option>
                    </select>
                    <ChevronDown
                      size={16}
                      className="absolute right-3 top-3 text-slate-500 pointer-events-none"
                    />
                  </div>
                </div>
              </div>

              {/* The Massive Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {/* Reusing and duplicating mock data for grid effect */}
                {[...groceriesData, ...groceriesData, ...groceriesData]
                  .slice(0, 12)
                  .map((product, idx) => (
                    <ProductCard
                      key={`${product.id}-${idx}`}
                      product={product}
                      onAdd={addToCart}
                      onClick={() => setSelectedProduct(product)}
                      gridMode
                    />
                  ))}
              </div>

              {/* Pagination Mock */}
              <div className="flex justify-center mt-12">
                <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
                  <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors cursor-not-allowed opacity-50">
                    <ChevronLeft size={18} />
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-orange-500 text-white font-bold shadow-sm">
                    1
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-700 font-bold transition-colors">
                    2
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-700 font-bold transition-colors">
                    3
                  </button>
                  <span className="w-8 flex items-center justify-center text-slate-400">
                    ...
                  </span>
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-700 font-bold transition-colors">
                    24
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center text-slate-700 hover:text-orange-600 transition-colors">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {currentView === "hub" && <Hub navigateTo={navigateTo} onProductClick={setSelectedProduct} />}
      {currentView === "smartphones" && <Smartphones navigateTo={navigateTo} onProductClick={setSelectedProduct} />}
      {currentView === "laptops" && <Laptops navigateTo={navigateTo} onProductClick={setSelectedProduct} />}
      {currentView === "audio" && <Audio navigateTo={navigateTo} onProductClick={setSelectedProduct} />}
      {currentView === "tvs" && <TVs navigateTo={navigateTo} onProductClick={setSelectedProduct} />}
      {currentView === "gaming" && <Gaming navigateTo={navigateTo} onProductClick={setSelectedProduct} />}
      {currentView === "wearables" && <Wearables navigateTo={navigateTo} onProductClick={setSelectedProduct} />}
      {currentView === "cameras" && <Cameras navigateTo={navigateTo} onProductClick={setSelectedProduct} />}
      {currentView === "appliances" && <AppliancesHub navigateTo={navigateTo} onProductClick={setSelectedProduct} />}
      {currentView === "large-appliances" && <LargeAppliances navigateTo={navigateTo} onProductClick={setSelectedProduct} />}
      {currentView === "kitchen-appliances" && <KitchenAppliances navigateTo={navigateTo} onProductClick={setSelectedProduct} />}
      {currentView === "climate-control" && <ClimateControl navigateTo={navigateTo} onProductClick={setSelectedProduct} />}
      {currentView === "floor-care" && <FloorCare navigateTo={navigateTo} onProductClick={setSelectedProduct} />}
      {currentView === "books-stationery" && <BooksStationeryHub navigateTo={navigateTo} onProductClick={setSelectedProduct} />}
      {currentView === "arts-crafts" && <ArtsCrafts navigateTo={navigateTo} onProductClick={setSelectedProduct} />}
      {currentView === "office-tech" && <OfficeTech navigateTo={navigateTo} onProductClick={setSelectedProduct} />}
      {currentView === "notebooks-paper" && <NotebooksPaper navigateTo={navigateTo} onProductClick={setSelectedProduct} />}
      {currentView === "books-magazines" && <BooksMagazines navigateTo={navigateTo} onProductClick={setSelectedProduct} />}
      {currentView === "school-supplies" && <SchoolSupplies navigateTo={navigateTo} onProductClick={setSelectedProduct} />}
      </motion.div>

      <AnimatePresence>
        {selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAdd={() => {
              addToCart();
              setSelectedProduct(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// --- COMPONENTS ---

function ProductDetail({ product, onClose, onAdd }: { product: Product; onClose: () => void; onAdd: () => void }) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [isAdding, setIsAdding] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const colors = [
    { name: "Obsidian Black", hex: "#1a1a1a" },
    { name: "Lunar Silver", hex: "#e2e8f0" },
    { name: "Desert Sand", hex: "#dcb796" },
  ];
  const sizes = ["S", "M", "L", "XL"];

  const handleAddToCart = () => {
    if (navigator.vibrate) {
      navigator.vibrate(50); // Haptic feedback
    }
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
      onAdd();
    }, 1500);
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  // Mock data for gallery
  const gallery = [
    { type: "3d", url: "" },
    { type: "image", url: product.image },
    { type: "image", url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop" },
    { type: "image", url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(20px)", scale: 1.05 }}
      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      exit={{ opacity: 0, filter: "blur(20px)", scale: 1.05 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl overflow-y-auto pb-24 lg:pb-0"
    >
      {/* Sticky Header / Context Anchor */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 py-3 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Breadcrumbs on Left */}
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <button onClick={onClose} className="hover:text-slate-900 transition-colors">Home</button>
            <ChevronRight size={14} />
            <button onClick={onClose} className="hover:text-slate-900 transition-colors">{product.brand || "Category"}</button>
            <ChevronRight size={14} />
            <span className="text-slate-900 truncate max-w-[120px] sm:max-w-xs">{product.name}</span>
          </div>

          {/* Back Button on Right */}
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium transition-colors group"
          >
            <span className="text-sm tracking-wide">Back</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* ZONE 1: The Visual Hook (Media Gallery) */}
          <div className="flex flex-col gap-4 lg:sticky lg:top-24 self-start">
            <div className="relative w-full aspect-square bg-slate-50 rounded-2xl overflow-hidden flex items-center justify-center group">
              {gallery[activeTab].type === "3d" ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100">
                  <RotateCcw size={48} className="text-slate-300 mb-4 animate-[spin_10s_linear_infinite]" />
                  <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Interactive 3D View</span>
                  <span className="text-xs text-slate-400 mt-2">Drag to rotate</span>
                </div>
              ) : (
                <img
                  src={gallery[activeTab].url}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain p-8"
                />
              )}
              {product.badge && (
                <div className="absolute top-4 left-4 bg-orange-500 text-white text-[10px] font-semibold px-3 py-1.5 rounded-lg shadow-sm uppercase tracking-widest">
                  {product.badge}
                </div>
              )}
            </div>
            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto hide-scrollbar snap-x">
              {gallery.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 snap-start border-2 transition-all ${activeTab === idx ? "border-slate-900" : "border-transparent hover:border-slate-200"}`}
                >
                  {item.type === "3d" ? (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                      <RotateCcw size={20} className="text-slate-400" />
                    </div>
                  ) : (
                    <img src={item.url} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover bg-slate-50" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ZONE 1 & 3: The Buy Box & Information Architecture */}
          <div className="flex flex-col">
            <div className="mb-8">
              <div className="flex justify-between items-start mb-3">
                <div className="text-sm font-medium text-orange-600 uppercase tracking-wider">
                  {product.brand}
                </div>
                <button className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-full hover:bg-slate-50 -mt-2 -mr-2">
                  <Heart size={22} />
                </button>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-slate-900 leading-tight mb-4 tracking-tight">
                {product.name}
              </h1>
              
              {/* Social Proof Snapshot */}
              <a href="#reviews" className="flex items-center gap-2 mb-6 group cursor-pointer w-max">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${i < Math.floor(product.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-slate-200"}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-slate-500 group-hover:text-slate-900 transition-colors underline decoration-slate-300 underline-offset-4">
                  {product.rating} ({product.reviews} Reviews)
                </span>
              </a>

              {/* Price & Urgency */}
              <div className="flex items-baseline gap-4 mb-2">
                <div className="text-3xl font-semibold text-slate-900">
                  ₦{product.price.toLocaleString()}
                </div>
                {product.originalPrice && (
                  <div className="text-lg text-slate-400 line-through font-medium">
                    ₦{product.originalPrice.toLocaleString()}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-red-500 mb-8">
                <Flame size={16} className="fill-red-500" />
                High Demand: Only 2 left in stock.
              </div>

              {/* Variant Selectors (Visual Swatches) */}
              <div className="space-y-6 mb-10">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-slate-900 uppercase tracking-wider">Color</span>
                    <span className="text-sm text-slate-500">{colors[selectedColor].name}</span>
                  </div>
                  <div className="flex gap-3">
                    {colors.map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedColor(idx);
                          setActiveTab(1); // Slide to image on color change
                        }}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${selectedColor === idx ? "ring-2 ring-offset-2 ring-slate-900" : "ring-1 ring-slate-200 hover:ring-slate-400"}`}
                      >
                        <div className="w-10 h-10 rounded-full shadow-inner" style={{ backgroundColor: color.hex }} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-slate-900 uppercase tracking-wider">Size</span>
                    <span className="text-sm font-medium text-orange-500 cursor-pointer hover:underline">Size Guide</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[3rem] px-4 py-3 rounded-xl text-sm font-semibold transition-all ${selectedSize === size ? "bg-slate-900 text-white shadow-md" : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-slate-900"}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Primary CTA (Desktop) */}
              <div className="hidden lg:block mb-6">
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-3 ${isAdding ? "bg-emerald-500 text-white shadow-md shadow-emerald-200" : "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg hover:shadow-orange-200 hover:-translate-y-0.5"}`}
                >
                  {isAdding ? (
                    <>
                      <Check size={22} className="animate-bounce" />
                      Added! ✓
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={22} />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center justify-between py-4 border-y border-slate-100 mb-8">
                <div className="flex flex-col items-center gap-1 text-slate-500">
                  <ShieldCheck size={20} strokeWidth={1.5} />
                  <span className="text-[10px] font-medium uppercase tracking-wider">Secured by Paystack</span>
                </div>
                <div className="w-px h-8 bg-slate-100" />
                <div className="flex flex-col items-center gap-1 text-slate-500">
                  <Truck size={20} strokeWidth={1.5} />
                  <span className="text-[10px] font-medium uppercase tracking-wider">Fast Delivery</span>
                </div>
                <div className="w-px h-8 bg-slate-100" />
                <div className="flex flex-col items-center gap-1 text-slate-500">
                  <RotateCcw size={20} strokeWidth={1.5} />
                  <span className="text-[10px] font-medium uppercase tracking-wider">30-Day Returns</span>
                </div>
              </div>

              {/* Information Architecture */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-2">The SoriKyo Experience</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Elevate your daily routine with a design that merges brutalist aesthetics with unparalleled ergonomic comfort. Engineered to make a statement while seamlessly integrating into your lifestyle.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">Technical Specs</h3>
                  <ul className="space-y-2">
                    {[
                      "Premium aerospace-grade aluminum chassis",
                      "Weight: 1.2kg (Ultra-lightweight)",
                      "Dimensions: 45cm x 30cm x 15cm",
                      "Care: Wipe clean with a damp microfiber cloth",
                    ].map((spec, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Accordions */}
                <div className="border-t border-slate-200 pt-2">
                  <div className="border-b border-slate-200">
                    <button
                      onClick={() => toggleAccordion("shipping")}
                      className="w-full flex items-center justify-between py-4 text-left focus:outline-none group"
                    >
                      <span className="text-sm font-medium text-slate-900 uppercase tracking-wider group-hover:text-orange-600 transition-colors">Shipping & Delivery</span>
                      <ChevronDown size={18} className={`text-slate-400 transition-transform ${openAccordion === "shipping" ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {openAccordion === "shipping" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm text-slate-600 pb-4 leading-relaxed">
                            1-2 days delivery within Jos. 3-5 days to Lagos and Abuja. All shipments are fully insured and tracked.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="border-b border-slate-200">
                    <button
                      onClick={() => toggleAccordion("returns")}
                      className="w-full flex items-center justify-between py-4 text-left focus:outline-none group"
                    >
                      <span className="text-sm font-medium text-slate-900 uppercase tracking-wider group-hover:text-orange-600 transition-colors">Returns Policy</span>
                      <ChevronDown size={18} className={`text-slate-400 transition-transform ${openAccordion === "returns" ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {openAccordion === "returns" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm text-slate-600 pb-4 leading-relaxed">
                            We offer a 30-day money-back guarantee. If you are not completely satisfied, return the item in its original packaging for a full refund. No questions asked.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ZONE 4: Trust & Validation (Reviews) */}
        <div id="reviews" className="mt-16 pt-12 border-t border-slate-200">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-2">Customer Reviews</h2>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-base font-medium text-slate-900">4.9 out of 5</span>
                <span className="text-sm text-slate-500">Based on {product.reviews} reviews</span>
              </div>
            </div>
            <button className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium rounded-xl transition-colors text-sm">
              Write a Review
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((review) => (
              <div key={review} className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-medium text-slate-500">
                      {review === 1 ? "JD" : "AO"}
                    </div>
                    <div>
                      <div className="font-medium text-sm text-slate-900">{review === 1 ? "John Doe" : "Amina O."}</div>
                      <div className="flex items-center gap-1 text-emerald-600 text-[10px] font-semibold uppercase tracking-wider">
                        <Check size={10} strokeWidth={3} /> Verified Buyer
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
                <h4 className="font-medium text-sm text-slate-900 mb-1.5">Absolutely stunning quality.</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  I was hesitant at first, but the build quality is incredible. The haptic feedback on the buttons feels so premium. Definitely worth the investment.
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ZONE 5: Revenue Multiplier (Upsell) */}
        <div className="mt-16 pt-12 border-t border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-900">Frequently Bought Together</h2>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-20 h-20 bg-white rounded-xl p-2 shadow-sm border border-slate-100">
                <img src={product.image} alt="" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
              </div>
              <Plus size={20} className="text-slate-300" />
              <div className="w-20 h-20 bg-white rounded-xl p-2 shadow-sm border border-slate-100">
                <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=400&auto=format&fit=crop" alt="" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-base font-semibold text-slate-900 mb-1">The Ultimate Bundle</h3>
              <p className="text-sm text-slate-500 mb-3">Add the Premium Care Kit to your order and save 15%.</p>
              <div className="flex items-center justify-center md:justify-start gap-4">
                <span className="text-xl font-semibold text-slate-900">₦{(product.price + 15000).toLocaleString()}</span>
                <button className="px-5 py-2 bg-slate-900 hover:bg-orange-500 text-white font-medium text-sm rounded-xl transition-colors">
                  Add Bundle
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-12 border-t border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-900">You May Also Like</h2>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-1">
              <Sparkles size={12} /> Semantic Match
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Mocking 4 items for the semantic vibe grid */}
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="w-full aspect-square bg-slate-50 rounded-2xl mb-3 overflow-hidden border border-slate-100 group-hover:border-orange-200 transition-colors p-4 flex items-center justify-center">
                  <img src={`https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop&sig=${item}`} alt="" referrerPolicy="no-referrer" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Brand {item}</div>
                <h4 className="font-medium text-slate-900 text-sm mb-1.5 group-hover:text-orange-600 transition-colors line-clamp-2">Aesthetic Companion Product {item}</h4>
                <div className="font-semibold text-slate-900 text-sm">₦45,000</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ZONE 2: Thumb-First Sticky Bar (Mobile Crucial) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 p-4 z-50 flex items-center gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="flex-1">
          <div className="text-xs font-medium text-slate-500 truncate">{product.name}</div>
          <div className="text-lg font-semibold text-slate-900">₦{product.price.toLocaleString()}</div>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${isAdding ? "bg-emerald-500 text-white shadow-md shadow-emerald-200" : "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md shadow-orange-200 active:scale-95"}`}
        >
          {isAdding ? (
            <>
              <Check size={18} />
              Added!
            </>
          ) : (
            <>
              <ShoppingCart size={18} />
              Add
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

function FilterCheckbox({ label, count, checked = false }: { label: string; count?: string | number; checked?: boolean }) {
  return (
    <label className="flex items-center justify-between group cursor-pointer custom-checkbox">
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center">
          <input type="checkbox" className="sr-only" defaultChecked={checked} />
          <div className="w-4 h-4 border-2 border-slate-300 rounded text-transparent flex items-center justify-center transition-colors group-hover:border-orange-400">
            <Check
              size={12}
              strokeWidth={4}
              className="text-white opacity-0 transition-opacity"
            />
          </div>
        </div>
        <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
          {label}
        </span>
      </div>
      {count && <span className="text-xs text-slate-400">{count}</span>}
    </label>
  );
}

function ProductCard({ product, onAdd, onClick, gridMode = false }: { product: Product; onAdd: () => void; onClick: () => void; gridMode?: boolean }) {
  // If gridMode is true, we remove the strict min-width so it fills the grid column
  const widthClass = gridMode
    ? "w-full"
    : "min-w-[200px] w-[200px] sm:min-w-[220px]";

  return (
    <motion.div
      layoutId={`product-${product.id}`}
      onClick={onClick}
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all duration-300 group flex flex-col snap-start overflow-hidden cursor-pointer ${widthClass}`}
    >
      {/* Image Area */}
      <div className="relative h-48 sm:h-56 bg-slate-50 flex items-center justify-center overflow-hidden p-4">
        {product.badge && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded shadow-sm z-10 flex items-center gap-1">
            <Tag size={10} /> {product.badge}
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute top-3 right-3 p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-slate-400 hover:text-red-500 hover:bg-white shadow-sm z-10 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
        >
          <Heart size={16} />
        </button>
        <motion.img
          layoutId={`product-image-${product.id}`}
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-1">
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
          {product.brand}
        </div>
        <h3 className="font-bold text-slate-800 text-sm leading-tight line-clamp-2 mb-2 group-hover:text-orange-600 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mb-3 mt-auto">
          <Star size={12} className="text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-bold text-slate-700">
            {product.rating}
          </span>
          <span className="text-[10px] text-slate-400">
            ({product.reviews})
          </span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
          <div>
            <div className="font-black text-lg text-slate-900">
              ₦{product.price.toLocaleString()}
            </div>
            {product.originalPrice && (
              <div className="text-[10px] text-slate-400 line-through">
                ₦{product.originalPrice.toLocaleString()}
              </div>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }}
            className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-orange-500 hover:scale-110 transition-all shadow-md active:scale-95"
            aria-label="Add to cart"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// --- MOCK DATA ---

const categories = [
  {
    name: "Groceries",
    icon: <Apple size={24} strokeWidth={1.5} />,
    active: true,
  },
  { name: "Electronics", icon: <Laptop size={24} strokeWidth={1.5} /> },
  { name: "Appliances", icon: <Zap size={24} strokeWidth={1.5} /> },
  { name: "Furniture", icon: <Sofa size={24} strokeWidth={1.5} /> },
  { name: "Fashion", icon: <Shirt size={24} strokeWidth={1.5} /> },
  { name: "Health", icon: <HeartPulse size={24} strokeWidth={1.5} /> },
  { name: "Baby & Kids", icon: <Baby size={24} strokeWidth={1.5} /> },
  { name: "Books & Stationery", icon: <BookOpen size={24} strokeWidth={1.5} /> },
  { name: "Household", icon: <ShoppingBag size={24} strokeWidth={1.5} /> },
  { name: "Sports", icon: <Dumbbell size={24} strokeWidth={1.5} /> },
  { name: "Hardware", icon: <Car size={24} strokeWidth={1.5} /> },
  { name: "Beverages", icon: <Coffee size={24} strokeWidth={1.5} /> },
];

const groceriesData = [
  {
    id: "g1",
    brand: "Farm Fresh",
    name: "Organic Plateau Tomatoes (1kg)",
    price: 1500,
    originalPrice: 1800,
    rating: 4.8,
    reviews: 124,
    badge: "Local",
    image:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "g2",
    brand: "Orient Bakery",
    name: "Artisanal Sourdough Loaf",
    price: 2500,
    rating: 4.9,
    reviews: 89,
    badge: "Hot",
    image:
      "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "g3",
    brand: "Prime Cuts",
    name: "Premium Beef Steak (500g)",
    price: 4500,
    rating: 4.7,
    reviews: 56,
    image:
      "https://images.unsplash.com/photo-1603048297172-c92544798d5e?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "g4",
    brand: "Kellogg's",
    name: "Corn Flakes Breakfast Cereal",
    price: 3200,
    originalPrice: 3500,
    rating: 4.5,
    reviews: 210,
    badge: "-10%",
    image:
      "https://images.unsplash.com/photo-1552422535-c45813c61732?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "g5",
    brand: "Fresh Greens",
    name: "Hydroponic Lettuce Pack",
    price: 1200,
    rating: 4.6,
    reviews: 34,
    image:
      "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?q=80&w=400&auto=format&fit=crop",
  },
];

const electronicsData = [
  {
    id: "e1",
    brand: "Samsung",
    name: '65" Class QLED 4K Smart TV',
    price: 850000,
    originalPrice: 950000,
    rating: 4.9,
    reviews: 412,
    badge: "Sale",
    image:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "e2",
    brand: "Apple",
    name: "iPhone 15 Pro Max - 256GB, Titanium",
    price: 1450000,
    rating: 4.9,
    reviews: 856,
    badge: "Trending",
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "e3",
    brand: "Sony",
    name: "WH-1000XM5 Wireless Noise Cancelling Headphones",
    price: 320000,
    originalPrice: 350000,
    rating: 4.8,
    reviews: 231,
    image:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "e4",
    brand: "HP",
    name: 'Spectre x360 14" 2-in-1 Laptop, Intel Core i7',
    price: 1100000,
    rating: 4.7,
    reviews: 145,
    image:
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=400&auto=format&fit=crop",
  },
];

const flashSaleData = [
  {
    id: "fs1",
    brand: "LG",
    name: "Double Door Refrigerator - 310L",
    price: 450000,
    originalPrice: 600000,
    image:
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "fs2",
    brand: "Binatone",
    name: 'Standing Fan 18" with Remote',
    price: 35000,
    originalPrice: 50000,
    image:
      "https://images.unsplash.com/photo-1616235121307-8ec9103e390c?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "fs3",
    brand: "Sony",
    name: "PlayStation 5 Console - Disc Edition",
    price: 850000,
    originalPrice: 950000,
    image:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "fs4",
    brand: "Nike",
    name: "Air Max 270 Sneakers - Men's",
    price: 120000,
    originalPrice: 160000,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop",
  },
];

const fashionData = [
  {
    id: "f1",
    brand: "Zara",
    name: "Classic Denim Jacket - Blue",
    price: 45000,
    rating: 4.6,
    reviews: 88,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "f2",
    brand: "Nike",
    name: "Dri-FIT Running T-Shirt",
    price: 25000,
    originalPrice: 30000,
    rating: 4.8,
    reviews: 156,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "f3",
    brand: "Ray-Ban",
    name: "Aviator Classic Sunglasses",
    price: 110000,
    rating: 4.9,
    reviews: 342,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "f4",
    brand: "H&M",
    name: "Pleated Midi Skirt - Beige",
    price: 32000,
    rating: 4.5,
    reviews: 45,
    image:
      "https://images.unsplash.com/photo-1582142339809-ce4ea043d839?q=80&w=400&auto=format&fit=crop",
  },
];

const furnitureData = [
  {
    id: "furn1",
    brand: "Nordic",
    name: "Minimalist Velvet Sofa - Emerald",
    price: 350000,
    rating: 4.8,
    reviews: 42,
    badge: "Premium",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "furn2",
    brand: "Lumina",
    name: "Modern Arc Floor Lamp",
    price: 45000,
    rating: 4.6,
    reviews: 18,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "furn3",
    brand: "Oakwood",
    name: "Solid Wood Dining Table (6 Seater)",
    price: 280000,
    originalPrice: 320000,
    rating: 4.9,
    reviews: 67,
    badge: "Sale",
    image:
      "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "furn4",
    brand: "SleepWell",
    name: "Orthopedic Memory Foam Mattress - King",
    price: 210000,
    rating: 4.7,
    reviews: 112,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=400&auto=format&fit=crop",
  },
];

const healthData = [
  {
    id: "h1",
    brand: "L'Oréal",
    name: "Revitalift Hyaluronic Acid Serum",
    price: 18500,
    rating: 4.8,
    reviews: 340,
    badge: "Best Seller",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "h2",
    brand: "Nature's Bounty",
    name: "Vitamin C 1000mg - 100 Capsules",
    price: 12000,
    rating: 4.9,
    reviews: 856,
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "h3",
    brand: "Dior",
    name: "Sauvage Eau de Parfum - 100ml",
    price: 95000,
    originalPrice: 110000,
    rating: 4.9,
    reviews: 1240,
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "h4",
    brand: "CeraVe",
    name: "Hydrating Facial Cleanser",
    price: 14000,
    rating: 4.7,
    reviews: 210,
    image:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=400&auto=format&fit=crop",
  },
];

const babyData = [
  {
    id: "b1",
    brand: "Pampers",
    name: "Premium Care Diapers - Size 4 (60 count)",
    price: 18000,
    rating: 4.8,
    reviews: 512,
    badge: "Essential",
    image:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "b2",
    brand: "Chicco",
    name: "Bravo Trio Travel System Stroller",
    price: 280000,
    originalPrice: 310000,
    rating: 4.9,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "b3",
    brand: "Fisher-Price",
    name: "Deluxe Kick & Play Piano Gym",
    price: 45000,
    rating: 4.7,
    reviews: 234,
    image:
      "https://images.unsplash.com/photo-1566006014517-db5ca052e464?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "b4",
    brand: "Avent",
    name: "Natural Baby Bottle 260ml - 2 Pack",
    price: 15000,
    rating: 4.8,
    reviews: 145,
    image:
      "https://images.unsplash.com/photo-1612480687158-b633bf3dcdb8?q=80&w=400&auto=format&fit=crop",
  },
];

const brandNames = [
  "SAMSUNG",
  "APPLE",
  "NIKE",
  "DANGOTE",
  "SONY",
  "NESTLE",
  "LG",
  "HP",
  "L'ORÉAL",
  "COCA-COLA",
];
