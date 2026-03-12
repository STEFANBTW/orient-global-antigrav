import React from 'react';
import { motion } from "framer-motion";

export default function Smartphones({ navigateTo, onProductClick, onAdd }: { navigateTo: (view: string) => void, onProductClick: (product: any) => void, onAdd: (product: any) => void }) {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
      {/* Sticky Navigation Header */}
      <header className="sticky-header bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigateTo('home')}>
              <div className="text-primary">
                <svg className="size-8" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fillRule="evenodd"></path>
                  <path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fillRule="evenodd"></path>
                </svg>
              </div>
              <h1 className="text-xl font-black tracking-tight uppercase">Orient <span className="text-primary">Hyper</span></h1>
            </div>
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <a className="text-sm font-semibold hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>Smartphones</a>
              <a className="text-sm font-semibold hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>Tablets</a>
              <a className="text-sm font-semibold hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>Accessories</a>
              <a className="text-sm font-semibold text-primary" href="#" onClick={(e) => e.preventDefault()}>Deals</a>
            </nav>
            {/* Actions */}
            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block">
                <input className="bg-primary/5 border-none rounded-lg pl-10 pr-4 py-2 w-64 focus:ring-2 focus:ring-primary/50 text-sm" placeholder="Search tech..." type="text" />
                <span className="material-symbols-outlined absolute left-3 top-2 text-slate-400 text-xl">search</span>
              </div>
              <button className="p-2 hover:bg-primary/10 rounded-full transition-colors relative">
                <span className="material-symbols-outlined">shopping_cart</span>
                <span className="absolute top-1 right-1 bg-primary text-white text-[10px] font-bold px-1.5 rounded-full">3</span>
              </button>
              <button className="p-2 hover:bg-primary/10 rounded-full transition-colors">
                <span className="material-symbols-outlined">person</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[300vh]">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <a className="hover:text-primary cursor-pointer" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>Home</a>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <a className="hover:text-primary cursor-pointer" onClick={(e) => { e.preventDefault(); navigateTo('hub'); }}>Electronics</a>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="font-semibold text-slate-900 dark:text-slate-100">Smartphones &amp; Tablets</span>
        </nav>
        {/* Category Header */}
        <div className="mb-12">
          <h2 className="text-5xl font-black mb-4">Smartphones &amp; Tablets</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg">
            Explore the frontier of mobile innovation. From foldable flagships to powerful creative tablets, find your next essential companion.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">filter_list</span>
                  Filters
                </h3>
                {/* Brand */}
                <div className="border-t border-slate-200 dark:border-slate-800 py-4">
                  <h4 className="font-semibold mb-3 uppercase text-xs tracking-wider text-slate-400">Brand</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input className="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox" />
                      <span className="text-sm group-hover:text-primary transition-colors">Apple</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input defaultChecked className="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox" />
                      <span className="text-sm group-hover:text-primary transition-colors">Samsung</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input className="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox" />
                      <span className="text-sm group-hover:text-primary transition-colors">Google</span>
                    </label>
                  </div>
                </div>
                {/* OS */}
                <div className="border-t border-slate-200 dark:border-slate-800 py-4">
                  <h4 className="font-semibold mb-3 uppercase text-xs tracking-wider text-slate-400">Operating System</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input className="border-slate-300 text-primary focus:ring-primary" name="os" type="radio" />
                      <span className="text-sm group-hover:text-primary transition-colors">iOS / iPadOS</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input className="border-slate-300 text-primary focus:ring-primary" name="os" type="radio" />
                      <span className="text-sm group-hover:text-primary transition-colors">Android</span>
                    </label>
                  </div>
                </div>
                {/* Storage */}
                <div className="border-t border-slate-200 dark:border-slate-800 py-4">
                  <h4 className="font-semibold mb-3 uppercase text-xs tracking-wider text-slate-400">Storage</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="px-3 py-2 border border-slate-200 dark:border-slate-800 rounded text-xs font-semibold hover:border-primary hover:text-primary transition-all">128GB</button>
                    <button className="px-3 py-2 border border-primary bg-primary/10 rounded text-xs font-semibold text-primary">256GB</button>
                    <button className="px-3 py-2 border border-slate-200 dark:border-slate-800 rounded text-xs font-semibold hover:border-primary hover:text-primary transition-all">512GB</button>
                    <button className="px-3 py-2 border border-slate-200 dark:border-slate-800 rounded text-xs font-semibold hover:border-primary hover:text-primary transition-all">1TB</button>
                  </div>
                </div>
                {/* Price */}
                <div className="border-t border-slate-200 dark:border-slate-800 py-4">
                  <h4 className="font-semibold mb-3 uppercase text-xs tracking-wider text-slate-400">Price Range</h4>
                  <input className="w-full accent-primary" type="range" />
                  <div className="flex justify-between mt-2 text-xs font-medium text-slate-500">
                    <span>$299</span>
                    <span>$1,999+</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          {/* Product Display Area */}
          <div className="flex-1">
            {/* New Arrivals Section */}
            <section className="mb-20">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <span className="w-8 h-1 bg-primary rounded-full"></span>
                  New Arrivals
                </h3>
                <div className="flex gap-2">
                  <button className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors">
                    <span className="material-symbols-outlined">grid_view</span>
                  </button>
                  <button className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors">
                    <span className="material-symbols-outlined">list</span>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Product Card 1 */}
                <motion.div
                  layoutId="product-e2"
                  onClick={() => onProductClick({
                    id: "e2",
                    brand: "Samsung",
                    name: "Galaxy S24 Ultra",
                    price: 1299000,
                    rating: 4.9,
                    reviews: 128,
                    badge: "New",
                    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuALSkI6ThfgsY0XW6kYQbESdKRitOzmhBr1XERMcyjyuaJFZQxXdej-UGEQsvMU4EtjfqXM0PSuJUh0o2D97Wfhpl6EnCrA_NgHnp29K7yapGGMbnXKwlpZ3C1scHrpo8cw0_-1g2712uC0IGov3WM3lgPm_alCAm9t2jQ9tPvet-SBKtC50zw8aO-MvMFpECVZ0wj8581CdgZ7UdKesthw5LwhRMXskM88RRZWoLsqOut1U5OQE4_SCxiMMLes8APtTdOo_PqL2iip"
                  })}
                  className="bg-white dark:bg-slate-800/50 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 group hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative h-64 bg-slate-100 dark:bg-slate-900 overflow-hidden">
                    <motion.img
                      layoutId="product-image-e2"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuALSkI6ThfgsY0XW6kYQbESdKRitOzmhBr1XERMcyjyuaJFZQxXdej-UGEQsvMU4EtjfqXM0PSuJUh0o2D97Wfhpl6EnCrA_NgHnp29K7yapGGMbnXKwlpZ3C1scHrpo8cw0_-1g2712uC0IGov3WM3lgPm_alCAm9t2jQ9tPvet-SBKtC50zw8aO-MvMFpECVZ0wj8581CdgZ7UdKesthw5LwhRMXskM88RRZWoLsqOut1U5OQE4_SCxiMMLes8APtTdOo_PqL2iip"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest">New</div>
                    <button
                      onClick={(e) => { e.stopPropagation(); }}
                      className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span className="material-symbols-outlined text-slate-900">favorite</span>
                    </button>
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-primary font-bold uppercase tracking-widest mb-1">Samsung</p>
                    <h4 className="font-bold text-lg mb-2 line-clamp-1">Galaxy S24 Ultra</h4>
                    <div className="flex items-center gap-1 mb-4">
                      <span className="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                      <span className="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                      <span className="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                      <span className="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                      <span className="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                      <span className="text-xs text-slate-400 ml-1">(128)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-black">$1,299.00</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAdd({
                            id: "e2",
                            brand: "Samsung",
                            name: "Galaxy S24 Ultra",
                            price: 1299000,
                            category: "Luxe",
                            context: "RETAIL",
                            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuALSkI6ThfgsY0XW6kYQbESdKRitOzmhBr1XERMcyjyuaJFZQxXdej-UGEQsvMU4EtjfqXM0PSuJUh0o2D97Wfhpl6EnCrA_NgHnp29K7yapGGMbnXKwlpZ3C1scHrpo8cw0_-1g2712uC0IGov3WM3lgPm_alCAm9t2jQ9tPvet-SBKtC50zw8aO-MvMFpECVZ0wj8581CdgZ7UdKesthw5LwhRMXskM88RRZWoLsqOut1U5OQE4_SCxiMMLes8APtTdOo_PqL2iip"
                          });
                        }}
                        className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        <span className="material-symbols-outlined">add_shopping_cart</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
                {/* Product Card 2 */}
                <div className="bg-white dark:bg-slate-800/50 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 group hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                  <div className="relative h-64 bg-slate-100 dark:bg-slate-900 overflow-hidden">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="High-end professional tablet with stylus on screen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwkADNH-qTWeYGF23gFxO6-1OFb_Y0DXvP-Q_o8GM_hdc6MmZQM7w07X-T0jlnhDexJGC6I3YRmjkLFo5gyC6951oT-qbDX2Ybspycyxmvjj7TfaJiaZm3BT3rrMue-F5HTJ_B3Py1ZbeQcJAn4B2j8h6eYEGEH_NCfRrSBswCcveNKysWNVMIzHXaTOXcke49qKPHmttXWKy98nMNGD7cDs451Ne6QQjE09XWQJD4d7zzlSRRhT8ScydTu2l27SzW_c1tgZvD4oKY" referrerPolicy="no-referrer" />
                    <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-slate-900">favorite</span>
                    </button>
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-primary font-bold uppercase tracking-widest mb-1">Apple</p>
                    <h4 className="font-bold text-lg mb-2 line-clamp-1">iPad Pro 12.9" M2</h4>
                    <div className="flex items-center gap-1 mb-4">
                      <span className="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                      <span className="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                      <span className="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                      <span className="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                      <span className="material-symbols-outlined text-yellow-400 text-sm fill-current text-slate-300">star</span>
                      <span className="text-xs text-slate-400 ml-1">(89)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-black">$1,099.00</span>
                      <button className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition-colors">
                        <span className="material-symbols-outlined">add_shopping_cart</span>
                      </button>
                    </div>
                  </div>
                </div>
                {/* Product Card 3 */}
                <div className="bg-white dark:bg-slate-800/50 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 group hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                  <div className="relative h-64 bg-slate-100 dark:bg-slate-900 overflow-hidden">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Android smartphone displaying vibrant mobile interface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuaK7SZzAqFzsiKXHpli8qEZ_NfO1mpuxa5vxQU0AGZq1wXiUeh43cbvqTxmEuaEUzWZJqqsI7R3dK95yyK6uq5-j_p7ttj4SQ5i1tbcoez4foAm3paiPGgnLm3AGucvfGp0NDEdhT6G4RC80_jUE58uYHh8cXxX6pOGqjubiFuwLIpRtILQFvOt2SnQ263AibDwIztRxXXc2SbPtbTh3AxacD2bDL5JyRHTMrbfxUUokZVQ48725oCl1d2DIfXbVYyI2IWnqg7A_5" referrerPolicy="no-referrer" />
                    <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest">New</div>
                    <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-slate-900">favorite</span>
                    </button>
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-primary font-bold uppercase tracking-widest mb-1">Google</p>
                    <h4 className="font-bold text-lg mb-2 line-clamp-1">Pixel 8 Pro</h4>
                    <div className="flex items-center gap-1 mb-4">
                      <span className="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                      <span className="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                      <span className="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                      <span className="material-symbols-outlined text-yellow-400 text-sm fill-current text-slate-300">star</span>
                      <span className="material-symbols-outlined text-yellow-400 text-sm fill-current text-slate-300">star</span>
                      <span className="text-xs text-slate-400 ml-1">(52)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-black">$999.00</span>
                      <button className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition-colors">
                        <span className="material-symbols-outlined">add_shopping_cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* Best Sellers Section */}
            <section className="mb-20 pt-20 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <span className="w-8 h-1 bg-primary rounded-full"></span>
                  Best Sellers
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Horizontal Feature Card */}
                <div className="flex flex-col sm:flex-row bg-primary/5 rounded-2xl overflow-hidden group border border-transparent hover:border-primary/20 transition-all">
                  <div className="w-full sm:w-1/2 h-64 sm:h-auto overflow-hidden">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="Golden smartphone on minimalist surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAz44ZdCp9rVc2WsGttw0OKdSH_qc8P_NENidStmc-WngvtNrcfwnNukk2oXeHdnar2wkYazPG3lX0lFojkXOG37KKDwUG1qIwiXdXqdUFO5iNr4ZejKungr1o8OaqiulnR4PVabYYYSpqfy1BQWBRWnleq3KHJgO54dSElUiiEtPWIvybm13Q66rShGHkK72udTpJ01eXtFkXFyp4kKhK4LZ4Sq-Z8rAEOJCpONjVmifcoJ0kDgbALjOHRhH2kBfoj02HlWkYn1bfu" referrerPolicy="no-referrer" />
                  </div>
                  <div className="p-8 flex flex-col justify-center flex-1">
                    <span className="text-primary text-xs font-black uppercase tracking-widest mb-2">Editor's Choice</span>
                    <h4 className="text-2xl font-bold mb-4 leading-tight">iPhone 15 Pro Max</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-2">Titanium design, A17 Pro chip, and the most advanced camera system in an iPhone.</p>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-black">$1,199</span>
                      <button className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-6 py-2 rounded-full text-sm font-bold hover:bg-primary transition-colors">View Details</button>
                    </div>
                  </div>
                </div>
                {/* Horizontal Feature Card 2 */}
                <div className="flex flex-col sm:flex-row bg-primary/5 rounded-2xl overflow-hidden group border border-transparent hover:border-primary/20 transition-all">
                  <div className="w-full sm:w-1/2 h-64 sm:h-auto overflow-hidden">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="Smartphone featuring a full screen display" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhy9JGlmXVmSeJ4z4rNthK9SUgPnFFe0UxjmIyN6TWodCTNpyWeg6mzQsPhamalp9dDKqOzOX7Qv5gCPbr9hy3jl8wZ5SuNI_V6IJ-WmgR9KPXjzZkOJVNxZX8GsTj043wmNfr_6Q479LM4U0_yt_njWjZNeNJ_yFe3aI2iEPnx4HU58MQ7kESUwFMzfTeNm-iV5TU6bc4N6RKcyeAM4-FjPDxT-DjyiskQD1S-qg9WUOLigNAfw8F2EA5WW1Q-EOqOnhqCjmbqRIU" referrerPolicy="no-referrer" />
                  </div>
                  <div className="p-8 flex flex-col justify-center flex-1">
                    <span className="text-primary text-xs font-black uppercase tracking-widest mb-2">Most Popular</span>
                    <h4 className="text-2xl font-bold mb-4 leading-tight">Xiaomi 14 Ultra</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-2">Leica Summilux optical lens and 1-inch sensor for professional photography.</p>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-black">$899</span>
                      <button className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-6 py-2 rounded-full text-sm font-bold hover:bg-primary transition-colors">View Details</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* Full Product Grid Continued */}
            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pt-10">
              {/* Generic Product Items to fill page length */}
              <div className="bg-white dark:bg-slate-800/50 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 p-6 opacity-80">
                <div className="w-full aspect-square bg-slate-100 dark:bg-slate-900 rounded-lg mb-4 flex items-center justify-center">
                  <span className="material-symbols-outlined text-6xl text-slate-300">tablet_mac</span>
                </div>
                <div className="h-4 w-1/4 bg-primary/20 rounded mb-2"></div>
                <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="h-6 w-1/3 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  <div className="h-10 w-10 bg-primary/20 rounded-lg"></div>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800/50 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 p-6 opacity-80">
                <div className="w-full aspect-square bg-slate-100 dark:bg-slate-900 rounded-lg mb-4 flex items-center justify-center">
                  <span className="material-symbols-outlined text-6xl text-slate-300">smartphone</span>
                </div>
                <div className="h-4 w-1/4 bg-primary/20 rounded mb-2"></div>
                <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="h-6 w-1/3 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  <div className="h-10 w-10 bg-primary/20 rounded-lg"></div>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800/50 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 p-6 opacity-80">
                <div className="w-full aspect-square bg-slate-100 dark:bg-slate-900 rounded-lg mb-4 flex items-center justify-center">
                  <span className="material-symbols-outlined text-6xl text-slate-300">devices</span>
                </div>
                <div className="h-4 w-1/4 bg-primary/20 rounded mb-2"></div>
                <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="h-6 w-1/3 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  <div className="h-10 w-10 bg-primary/20 rounded-lg"></div>
                </div>
              </div>
            </section>
            {/* Spacer for page height */}
            <div className="h-[100vh]"></div>
          </div>
        </div>
      </main>
      {/* Global Footer Minimal */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 text-white mb-6">
              <div className="text-primary">
                <svg className="size-6" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fillRule="evenodd"></path>
                  <path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fillRule="evenodd"></path>
                </svg>
              </div>
              <h2 className="text-lg font-bold">Orient Hypermarket</h2>
            </div>
            <p className="max-w-sm mb-6 text-sm">Your premium destination for the latest technology, electronics, and lifestyle products. Quality guaranteed since 1998.</p>
            <div className="flex gap-4">
              <a className="hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}><span className="material-symbols-outlined">public</span></a>
              <a className="hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}><span className="material-symbols-outlined">alternate_email</span></a>
              <a className="hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}><span className="material-symbols-outlined">share</span></a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><a className="hover:text-white transition-colors" href="#" onClick={(e) => e.preventDefault()}>Smartphones</a></li>
              <li><a className="hover:text-white transition-colors" href="#" onClick={(e) => e.preventDefault()}>Laptops</a></li>
              <li><a className="hover:text-white transition-colors" href="#" onClick={(e) => e.preventDefault()}>Audio</a></li>
              <li><a className="hover:text-white transition-colors" href="#" onClick={(e) => e.preventDefault()}>Gaming</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a className="hover:text-white transition-colors" href="#" onClick={(e) => e.preventDefault()}>Help Center</a></li>
              <li><a className="hover:text-white transition-colors" href="#" onClick={(e) => e.preventDefault()}>Shipping</a></li>
              <li><a className="hover:text-white transition-colors" href="#" onClick={(e) => e.preventDefault()}>Returns</a></li>
              <li><a className="hover:text-white transition-colors" href="#" onClick={(e) => e.preventDefault()}>Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>© 2024 Orient Hypermarket. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a className="hover:text-white" href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            <a className="hover:text-white" href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
