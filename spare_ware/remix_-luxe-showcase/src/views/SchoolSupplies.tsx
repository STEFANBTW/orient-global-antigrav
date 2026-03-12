import React from 'react';
import { motion } from "motion/react";

export default function SchoolSupplies({ navigateTo }: { navigateTo: (view: string) => void }) {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
      <main className="max-w-[1440px] mx-auto px-6 py-6 flex flex-col gap-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-slate-500">
          <button onClick={() => navigateTo('home')} className="hover:text-primary">Home</button>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <button onClick={() => navigateTo('books-stationery')} className="hover:text-primary">Books & Stationery</button>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-primary font-semibold">School Supplies</span>
        </nav>
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight dark:text-white">School Essentials</h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl">Equip your journey with premium durability. Discover our curated selection of high-performance stationery and gear for the modern student.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-500">Sort by:</span>
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-semibold">
              Newest Arrivals
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-72 shrink-0 space-y-8">
            {/* Category Navigation */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Categories</h3>
              <div className="space-y-1">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary text-white font-semibold shadow-lg shadow-primary/20">
                  <span className="material-symbols-outlined text-xl">backpack</span>
                  <span>Backpacks</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary/10 transition-colors text-slate-600 dark:text-slate-300">
                  <span className="material-symbols-outlined text-xl">edit_note</span>
                  <span>Writing Tools</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary/10 transition-colors text-slate-600 dark:text-slate-300">
                  <span className="material-symbols-outlined text-xl">architecture</span>
                  <span>Math Sets</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary/10 transition-colors text-slate-600 dark:text-slate-300">
                  <span className="material-symbols-outlined text-xl">lunch_dining</span>
                  <span>Lunch Boxes</span>
                </button>
              </div>
            </div>
            {/* Specialized Filter: Age Group */}
            <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Age Group</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input className="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox" />
                  <span className="text-sm group-hover:text-primary transition-colors">Elementary (6-10)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input defaultChecked className="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox" />
                  <span className="text-sm group-hover:text-primary transition-colors font-medium">Middle School (11-14)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input className="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox" />
                  <span className="text-sm group-hover:text-primary transition-colors">High School (15-18)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input className="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox" />
                  <span className="text-sm group-hover:text-primary transition-colors">University</span>
                </label>
              </div>
            </div>
            {/* Specialized Filter: Durability */}
            <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Durability Level</h3>
              <div className="flex flex-col gap-2">
                <button className="w-full text-left px-3 py-2 rounded-lg border border-primary bg-primary/5 text-xs font-bold text-primary flex justify-between items-center">
                  Heavy Duty (All-Year)
                  <span className="material-symbols-outlined text-sm">shield</span>
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-500 flex justify-between items-center">
                  Standard
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                </button>
              </div>
            </div>
            {/* Price Range */}
            <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Price Range</h3>
              <input className="w-full accent-primary" type="range" />
              <div className="flex justify-between text-xs font-bold text-slate-500">
                <span>$5</span>
                <span>$500</span>
              </div>
            </div>
          </aside>
          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Product Card 1 */}
              <motion.div 
                layoutId="product-ss1"
                onClick={() => onProductClick?.({
                  id: "ss1",
                  brand: "Titan Pro",
                  name: "Titan Pro Tech Pack",
                  price: 8999,
                  rating: 4.9,
                  reviews: 245,
                  badge: "Bestseller",
                  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjaqwj0iuLojqxsBF2ZoPHmQaoC-O1nmh_TKG06p-9U9IkbW5ZS49WsKOZnk98_kL6z2wGhu4L-hHSkmexOx65bC_dQeoGqimXi_PF5kqQOTNJcE_XuBFnPp3PFob1XV08aBx1lAyPyMPojZ6y8hIJTMfFFc3xPvNDN7SAuVkaF5RBofAI-kjN9VXLXS5TAzGkFfe3qx29520KvcOMCe9kQ95Y7hDr04eg_qbS-GO7UAyFy_nYt0HAWJaXTij_Nb8NCJh9GreUcEhW"
                })}
                className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 group hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden">
                  <motion.img layoutId="product-image-ss1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjaqwj0iuLojqxsBF2ZoPHmQaoC-O1nmh_TKG06p-9U9IkbW5ZS49WsKOZnk98_kL6z2wGhu4L-hHSkmexOx65bC_dQeoGqimXi_PF5kqQOTNJcE_XuBFnPp3PFob1XV08aBx1lAyPyMPojZ6y8hIJTMfFFc3xPvNDN7SAuVkaF5RBofAI-kjN9VXLXS5TAzGkFfe3qx29520KvcOMCe9kQ95Y7hDr04eg_qbS-GO7UAyFy_nYt0HAWJaXTij_Nb8NCJh9GreUcEhW" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="bg-primary text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest shadow-lg">Bestseller</span>
                    <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest shadow-lg">New</span>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); }} className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-slate-800/90 rounded-full text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-lg">favorite</span>
                  </button>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">Titan Pro Tech Pack</h3>
                    <div className="flex items-center gap-1 text-primary">
                      <span className="material-symbols-outlined text-sm fill-current">star</span>
                      <span className="text-xs font-black">4.9</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mb-4 line-clamp-2">Water-resistant ballistic nylon with dedicated 16" laptop sleeve and reinforced base.</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">$89.99</span>
                    <button onClick={(e) => { e.stopPropagation(); }} className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white p-2.5 rounded-lg hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-colors">
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
            {/* Pattern Breaker Banner */}
            <div className="col-span-full py-10">
              <div className="relative w-full h-[400px] rounded-3xl overflow-hidden group">
                <img className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWYCzkAzWdYj-ywziLbGnXbUvkD44NO1mMCcf5thnjR_eCzUpqaqbY0hVNv6uk6zGEO5wK_WB2ou1eDW9edo7Tn9iWcapHyTrgFSFs0Ccy8WTZDEmIs7sBW23oZyoB2S6fRPRltNzfXxsneSdRY1s11vhZiOpPs9JD4s2T3MR78AE9BO2gWux-UodfU-ciDIQ9PciMrKq-KvFXgfdsjwMImbXLTZpLpEfWGTdq_mBd0f66W2TOW8XPMq7nxlYvwYklKaGBfncuOAU2" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-r from-background-dark/90 via-background-dark/40 to-transparent flex items-center px-12">
                  <div className="max-w-md space-y-6">
                    <span className="inline-block bg-green-500/20 text-green-400 border border-green-500/30 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">Sustainability First</span>
                    <h2 className="text-5xl font-black text-white leading-none">Go Green This Semester</h2>
                    <p className="text-slate-300 text-lg">Join the movement with our Eco-Friendly supplies. Made from 100% recycled materials and sustainably sourced bamboo.</p>
                    <button className="bg-primary hover:bg-primary/80 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all shadow-xl shadow-primary/30">Explore Collection</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="mt-32 bg-slate-950 text-slate-400 py-24 border-t border-slate-900">
        <div className="max-w-[1440px] mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-3xl font-bold">package_2</span>
              <h2 className="text-xl font-extrabold tracking-tight text-white">Orient Hypermarket</h2>
            </div>
            <p className="text-sm leading-relaxed">Providing premium quality supplies for the region since 1995. Quality you can trust, service you can depend on.</p>
            <div className="flex gap-4">
              <a className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary hover:text-white transition-all" href="#"><span className="material-symbols-outlined text-lg">public</span></a>
              <a className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary hover:text-white transition-all" href="#"><span className="material-symbols-outlined text-lg">thumb_up</span></a>
              <a className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary hover:text-white transition-all" href="#"><span className="material-symbols-outlined text-lg">alternate_email</span></a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Categories</h4>
            <ul className="space-y-4 text-sm">
              <li><a className="hover:text-primary transition-colors" href="#">School Uniforms</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Digital Devices</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Art Supplies</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Office Gear</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Customer Care</h4>
            <ul className="space-y-4 text-sm">
              <li><a className="hover:text-primary transition-colors" href="#">Shipping Policy</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Return Portal</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Student Discounts</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Gift Cards</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-white font-bold">Subscribe to Offers</h4>
            <div className="relative">
              <input className="w-full bg-slate-900 border-none rounded-xl px-4 py-4 text-sm focus:ring-2 focus:ring-primary/50" placeholder="Email address" type="email" />
              <button className="absolute right-2 top-2 bottom-2 bg-primary text-white px-4 rounded-lg hover:bg-primary/80 transition-all">
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
            <p className="text-xs">Get weekly updates on new arrivals and exclusive student coupons.</p>
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto px-6 mt-24 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-widest">
          <p>© 2024 Orient Hypermarket. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
