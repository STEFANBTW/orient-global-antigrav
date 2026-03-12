import React from 'react';
import { motion } from "framer-motion";

export default function BooksMagazines({ navigateTo, onProductClick }: { navigateTo: (view: string) => void, onProductClick?: (product: any) => void }) {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <main className="max-w-[1440px] mx-auto w-full px-4 md:px-10 lg:px-20 py-8">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-8 overflow-x-auto whitespace-nowrap pb-2">
              <button onClick={() => navigateTo('home')} className="hover:text-primary transition-colors">Home</button>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <button onClick={() => navigateTo('books-stationery')} className="hover:text-primary transition-colors">Books & Stationery</button>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-primary font-semibold">Books & Magazines</span>
            </nav>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Sidebar Filters */}
              <aside className="w-full lg:w-64 shrink-0 space-y-8">
                <div>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">category</span>
                    Categories
                  </h3>
                  <div className="space-y-1">
                    <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-bold">
                      <span className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[20px] fill-current">menu_book</span> Fiction
                      </span>
                      <span className="text-xs font-normal opacity-70">1.2k</span>
                    </button>
                    <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <span className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[20px]">science</span> Non-Fiction
                      </span>
                      <span className="text-xs font-normal opacity-70">850</span>
                    </button>
                    <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <span className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[20px]">school</span> Educational
                      </span>
                      <span className="text-xs font-normal opacity-70">420</span>
                    </button>
                    <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <span className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[20px]">auto_awesome</span> Lifestyle
                      </span>
                      <span className="text-xs font-normal opacity-70">310</span>
                    </button>
                  </div>
                </div>
                <div className="p-5 bg-slate-100 dark:bg-slate-800/40 rounded-2xl space-y-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Refine Search</h3>
                  <div>
                    <label className="block text-sm font-semibold mb-3">Format</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input defaultChecked className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                        <span className="text-sm group-hover:text-primary transition-colors">Hardcover</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                        <span className="text-sm group-hover:text-primary transition-colors">Paperback</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                        <span className="text-sm group-hover:text-primary transition-colors">Digital (E-Book)</span>
                      </label>
                    </div>
                  </div>
                  <hr className="border-slate-200 dark:border-slate-700" />
                  <div>
                    <label className="block text-sm font-semibold mb-3">Language</label>
                    <div className="relative">
                      <select className="w-full bg-white dark:bg-slate-900 border-none rounded-lg py-2 pl-3 pr-8 text-sm focus:ring-1 focus:ring-primary appearance-none">
                        <option>English</option>
                        <option>Arabic</option>
                        <option>French</option>
                        <option>Spanish</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">unfold_more</span>
                    </div>
                  </div>
                </div>
                {/* Mini Banner in Sidebar */}
                <div className="bg-gradient-to-br from-primary to-orange-600 rounded-2xl p-6 text-white relative overflow-hidden group">
                  <div className="relative z-10">
                    <h4 className="font-bold text-lg leading-tight mb-2">Summer Reading List</h4>
                    <p className="text-xs text-white/80 mb-4">Buy 2 Get 1 Free on all Fiction titles.</p>
                    <button className="bg-white text-primary text-xs font-bold px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors">Explore Now</button>
                  </div>
                  <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-7xl opacity-20 rotate-12 group-hover:rotate-0 transition-transform duration-500">local_library</span>
                </div>
              </aside>
              {/* Main Content Area */}
              <div className="flex-1">
                {/* Hero Section Pattern Breaker */}
                <div className="mb-10 p-1 bg-gradient-to-r from-primary/30 via-primary/5 to-transparent rounded-[2rem]">
                  <div className="bg-white dark:bg-slate-900 rounded-[1.9rem] overflow-hidden flex flex-col md:flex-row items-center">
                    <div className="md:w-1/3 h-64 md:h-auto overflow-hidden">
                      <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDowyXYy3RuVMh4wSiUxsWQeBDJSDDOXNkpzUcG5ipXRqhUbQJvTmtaihNlCYGAETwiP5amL-GqNvkRqYWPaUtqt2hzQJAAFH-5xZNebFDck50Y2kEPoJt91q2_YGch7oC3-tdVZigkGg3z-vKq-xN0ZL7R--MgzG9z5TuwhkcouTK8G6cjRhgLJjzLZfpWvlmkKWaJ1piz4wIjbvor2xA1KiFjWgtV126arLca2OIbLRsXKyLsavY0hGvZ_AOK9WBaCI5LOzDNPZGY" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-8 md:p-12 flex-1">
                      <span className="text-primary font-bold text-sm uppercase tracking-[0.2em] mb-2 block">Special Feature</span>
                      <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight text-slate-900 dark:text-white">Author of the <span className="text-primary underline decoration-primary/20 underline-offset-8">Month</span></h2>
                      <p className="text-slate-600 dark:text-slate-400 text-lg mb-6 leading-relaxed">
                        "A journey through time and space, exploring the fragility of human emotion in the digital age." Discover the complete collection of <b>Elena Vance</b>.
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-primary/30 transition-all">Shop Collection</button>
                        <button className="border border-slate-200 dark:border-slate-700 px-8 py-3 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">Read Interview</button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                  <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Books & Magazines <span className="font-normal text-slate-400 ml-2">(2,482)</span></h1>
                  <div className="flex items-center gap-4">
                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                      <button className="p-1.5 rounded-md bg-white dark:bg-slate-700 shadow-sm text-primary transition-all">
                        <span className="material-symbols-outlined text-[20px]">grid_view</span>
                      </button>
                      <button className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all">
                        <span className="material-symbols-outlined text-[20px]">list</span>
                      </button>
                    </div>
                    <select className="bg-transparent border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold focus:ring-primary py-2 px-4">
                      <option>Newest Arrivals</option>
                      <option>Price: Low to High</option>
                      <option>Most Popular</option>
                    </select>
                  </div>
                </div>
                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {/* Product Card 1 */}
                  <motion.div 
                    layoutId="product-bm1"
                    onClick={() => onProductClick?.({
                      id: "bm1",
                      brand: "James Clear",
                      name: "The Minimalist Dream",
                      price: 2499,
                      rating: 4.0,
                      reviews: 124,
                      badge: "Best Seller",
                      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrMwghKZ-fCv1aiCecdKZoxjB41F2oDbp5PQQlvLAnfRgpiOWAeybsr--288gJSO-ganfjkYC1MCAICZIiuTxYKMsmQ7pr-OUHbxHP5lRJpfYpm_hYkIhauaN5N-iPftmqPMrEOlf-1uCowAwpH8V7lqcitQt99HIhv2K4SQHkimAXfFHCl2p8cuHwEVyHIIFyEiF9vEVh6V5gZ-WDfK56m7KQg3vvh9Jgh-NG__TO6r1sddYhkL_BdjABGRo-4z-ASNKrskYodxMV"
                    })}
                    className="group bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-4 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden rounded-xl mb-4">
                      <motion.img layoutId="product-image-bm1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrMwghKZ-fCv1aiCecdKZoxjB41F2oDbp5PQQlvLAnfRgpiOWAeybsr--288gJSO-ganfjkYC1MCAICZIiuTxYKMsmQ7pr-OUHbxHP5lRJpfYpm_hYkIhauaN5N-iPftmqPMrEOlf-1uCowAwpH8V7lqcitQt99HIhv2K4SQHkimAXfFHCl2p8cuHwEVyHIIFyEiF9vEVh6V5gZ-WDfK56m7KQg3vvh9Jgh-NG__TO6r1sddYhkL_BdjABGRo-4z-ASNKrskYodxMV" referrerPolicy="no-referrer" />
                      <div className="absolute top-2 right-2">
                        <button onClick={(e) => { e.stopPropagation(); }} className="bg-white/90 backdrop-blur rounded-full p-2 text-slate-900 hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-lg">favorite</span>
                        </button>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Best Seller</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] text-primary font-bold uppercase mb-1">Fiction</p>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-1 line-clamp-1 group-hover:text-primary transition-colors">The Minimalist Dream</h3>
                      <p className="text-xs text-slate-500 mb-3">by James Clear</p>
                      <div className="flex items-center gap-1 mb-4">
                        <span className="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                        <span className="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                        <span className="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                        <span className="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                        <span className="material-symbols-outlined text-slate-300 text-sm">star</span>
                        <span className="text-[10px] text-slate-400 ml-1">(124 reviews)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-lg text-slate-900 dark:text-white">$24.99</span>
                        <button onClick={(e) => { e.stopPropagation(); }} className="bg-primary hover:bg-orange-600 p-2 rounded-lg text-white transition-all">
                          <span className="material-symbols-outlined">add_shopping_cart</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </main>
          {/* Footer */}
          <footer className="bg-background-dark text-white border-t border-slate-800 px-4 md:px-10 lg:px-20 py-16">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-primary">
                  <span className="material-symbols-outlined text-3xl">auto_stories</span>
                  <h2 className="text-2xl font-bold">Orient <span className="text-white">Hyper</span></h2>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Serving the community since 1995 with the finest collection of global literature and local discoveries.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-6 text-lg">Shop Categories</h4>
                <ul className="space-y-4 text-slate-400 text-sm">
                  <li><a className="hover:text-primary transition-colors" href="#">Fiction</a></li>
                  <li><a className="hover:text-primary transition-colors" href="#">Educational</a></li>
                  <li><a className="hover:text-primary transition-colors" href="#">Magazines</a></li>
                  <li><a className="hover:text-primary transition-colors" href="#">Children's Corner</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-6 text-lg">Customer Service</h4>
                <ul className="space-y-4 text-slate-400 text-sm">
                  <li><a className="hover:text-primary transition-colors" href="#">Help Center</a></li>
                  <li><a className="hover:text-primary transition-colors" href="#">Shipping Policy</a></li>
                  <li><a className="hover:text-primary transition-colors" href="#">Returns</a></li>
                  <li><a className="hover:text-primary transition-colors" href="#">Bulk Orders</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-6 text-lg">Download App</h4>
                <div className="space-y-4">
                  <button className="w-full bg-slate-800 hover:bg-slate-700 flex items-center gap-3 px-5 py-3 rounded-xl transition-all border border-slate-700">
                    <span className="material-symbols-outlined text-2xl">ad_units</span>
                    <div className="text-left">
                      <p className="text-[10px] text-slate-400 uppercase">Available on</p>
                      <p className="font-bold leading-none">App Store</p>
                    </div>
                  </button>
                  <button className="w-full bg-slate-800 hover:bg-slate-700 flex items-center gap-3 px-5 py-3 rounded-xl transition-all border border-slate-700">
                    <span className="material-symbols-outlined text-2xl">robot_2</span>
                    <div className="text-left">
                      <p className="text-[10px] text-slate-400 uppercase">Get it on</p>
                      <p className="font-bold leading-none">Google Play</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className="max-w-[1440px] mx-auto mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
              <p>© 2024 Orient Hypermarket. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

