import React from 'react';

export default function Laptops({ navigateTo, onProductClick }: { navigateTo: (view: string) => void, onProductClick?: (product: unknown) => void }) {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-[300vh]">
      {/* Sticky Header */}
      <header className="sticky-header bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
        <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-3 text-primary cursor-pointer" onClick={() => navigateTo('home')}>
              <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined">terminal</span>
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">Orient<span className="text-primary">.</span></h1>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a className="text-sm font-semibold hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>Categories</a>
              <a className="text-sm font-semibold hover:text-primary transition-colors text-primary" href="#" onClick={(e) => e.preventDefault()}>Laptops</a>
              <a className="text-sm font-semibold hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>Deals</a>
              <a className="text-sm font-semibold hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>Support</a>
            </nav>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative hidden lg:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg w-64 focus:ring-2 focus:ring-primary text-sm" placeholder="Search workstations, gaming rigs..." type="text"/>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-primary/10 rounded-full transition-colors relative">
                <span className="material-symbols-outlined">shopping_cart</span>
                <span className="absolute top-0 right-0 size-4 bg-primary text-white text-[10px] flex items-center justify-center rounded-full font-bold border-2 border-white">3</span>
              </button>
              <button className="p-2 hover:bg-primary/10 rounded-full transition-colors">
                <span className="material-symbols-outlined">person</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-[1440px] mx-auto px-6 py-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <a className="hover:text-primary cursor-pointer" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>Home</a>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <a className="hover:text-primary cursor-pointer" onClick={(e) => { e.preventDefault(); navigateTo('hub'); }}>Electronics</a>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-slate-900 dark:text-slate-100 font-semibold">Laptops &amp; Computing</span>
        </nav>
        {/* Page Hero */}
        <div className="relative w-full h-[300px] rounded-2xl overflow-hidden mb-12 bg-slate-900">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent z-10"></div>
          <img alt="High performance workstation laptop on a clean desk" className="absolute inset-0 w-full h-full object-cover" data-alt="Modern sleek workstation laptop on a minimal dark workspace" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB__4RH6Gp2c7J6p1q0RXXFbSR6F49ry372p6rn_JW0oj338ka5PUYpExe3nmRR21GS2dfSlSvgauvNJq2fR1LTBWMrU31uAREHr5rJg3ozqT2H1riQSc3BIiILnPKrAKLajdLr9tb0HzpH-FiNQ4T-0t2IkFvXzE3hM-c1nzGQ_LAWaL4lS93boQPPhxQV2ZAv06ORBr-VbAGxqGN98uQzfxcGbqZyPFXrc_wMxj3DAfrF2R5NQO55LRw8lC0VtXLaZzSaBAXfCuk0" referrerPolicy="no-referrer" />
          <div className="relative z-20 h-full flex flex-col justify-center px-12 max-w-2xl">
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-3">Professional Grade</span>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">Ultimate Power,<br/>Unmatched Precision</h2>
            <p className="text-slate-300 text-lg">Explore our curated selection of high-performance laptops for creators, gamers, and developers.</p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Specialized Filter Sidebar */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="sticky top-28 sidebar-scroll pr-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">filter_list</span>
                  Filters
                </h3>
                <button className="text-xs text-primary font-bold uppercase tracking-wider">Reset All</button>
              </div>
              {/* Category Type */}
              <div className="mb-8">
                <h4 className="font-bold text-sm uppercase tracking-wider text-slate-400 mb-4">Device Type</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="size-5 rounded border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center group-hover:border-primary">
                      <div className="size-3 bg-primary rounded-sm opacity-0 group-has-[:checked]:opacity-100 transition-opacity"></div>
                    </div>
                    <input defaultChecked className="hidden" type="checkbox"/>
                    <span className="text-sm font-medium">Ultrabooks</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="size-5 rounded border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center group-hover:border-primary">
                      <div className="size-3 bg-primary rounded-sm opacity-0 group-has-[:checked]:opacity-100 transition-opacity"></div>
                    </div>
                    <input className="hidden" type="checkbox"/>
                    <span className="text-sm font-medium">Gaming Rigs</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="size-5 rounded border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center group-hover:border-primary">
                      <div className="size-3 bg-primary rounded-sm opacity-0 group-has-[:checked]:opacity-100 transition-opacity"></div>
                    </div>
                    <input className="hidden" type="checkbox"/>
                    <span className="text-sm font-medium">2-in-1 Convertibles</span>
                  </label>
                </div>
              </div>
              {/* Processor */}
              <div className="mb-8">
                <h4 className="font-bold text-sm uppercase tracking-wider text-slate-400 mb-4">Processor</h4>
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold">Intel Core i9</button>
                  <button className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold hover:bg-primary/20 transition-colors">AMD Ryzen 9</button>
                  <button className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold hover:bg-primary/20 transition-colors">Apple M3 Pro</button>
                  <button className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold hover:bg-primary/20 transition-colors">Intel Core i7</button>
                </div>
              </div>
              {/* RAM */}
              <div className="mb-8">
                <h4 className="font-bold text-sm uppercase tracking-wider text-slate-400 mb-4">Memory (RAM)</h4>
                <select className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-primary">
                  <option>Any Capacity</option>
                  <option>16GB DDR5</option>
                  <option>32GB DDR5</option>
                  <option>64GB+ DDR5</option>
                </select>
              </div>
              {/* GPU */}
              <div className="mb-8">
                <h4 className="font-bold text-sm uppercase tracking-wider text-slate-400 mb-4">Graphics Card</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>NVIDIA RTX 4090</span>
                    <span className="text-slate-400">(12)</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>NVIDIA RTX 4080</span>
                    <span className="text-slate-400">(24)</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>AMD Radeon RX 7000</span>
                    <span className="text-slate-400">(8)</span>
                  </div>
                </div>
              </div>
              {/* Screen Size */}
              <div className="mb-8">
                <h4 className="font-bold text-sm uppercase tracking-wider text-slate-400 mb-4">Screen Size</h4>
                <input className="w-full accent-primary" type="range"/>
                <div className="flex justify-between text-xs font-bold mt-2">
                  <span>13"</span>
                  <span>17"+</span>
                </div>
              </div>
              {/* Price Range */}
              <div className="mb-8">
                <h4 className="font-bold text-sm uppercase tracking-wider text-slate-400 mb-4">Price Range</h4>
                <div className="flex items-center gap-2">
                  <input className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm px-3" placeholder="Min" type="text"/>
                  <span className="text-slate-400">-</span>
                  <input className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm px-3" placeholder="Max" type="text"/>
                </div>
              </div>
              <div className="p-6 bg-primary/5 rounded-xl border border-primary/10">
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">Need expert help?</p>
                <button className="w-full bg-primary text-white py-2 rounded-lg font-bold text-sm shadow-lg shadow-primary/20">Talk to a Tech Specialist</button>
              </div>
            </div>
          </aside>
          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <p className="text-slate-500 font-medium"><span className="text-slate-900 dark:text-slate-100 font-bold">148</span> Premium Laptops found</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                  <button className="p-1.5 bg-white dark:bg-slate-700 rounded-md shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">grid_view</span>
                  </button>
                  <button className="p-1.5">
                    <span className="material-symbols-outlined text-[20px]">view_list</span>
                  </button>
                </div>
                <select className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm font-bold focus:ring-primary pr-10">
                  <option>Sort by: Premium First</option>
                  <option>Price: Low to High</option>
                  <option>Newest Arrivals</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {/* Product Card 1 */}
              <div className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 flex flex-col">
                <div className="relative aspect-[4/3] bg-slate-50 dark:bg-slate-800 overflow-hidden">
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded">Bestseller</span>
                  </div>
                  <button className="absolute top-4 right-4 z-20 size-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors">
                    <span className="material-symbols-outlined text-sm">favorite</span>
                  </button>
                  <img alt="Modern silver laptop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Modern sleek laptop open showing a coding interface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuABJVjevTjRT04MLs_zILDBinWVEV2SLe-u0MAhfGtdjNojXs-yRT1MmDAGwT9aQB8XQLnkuhCINEM_esIqstjPoeGBOm_ut3RnkEpxXbI9xZHW_jFOLGlvgFPI1EDOcI536L0hfES0iq_CJ8Bsx04h4pGcSAXgMcbbvnokw7xm_3xmjeDYBwZ_DTrs89MHCVMaAkIZ-P9ipNAXufL0OOt0iLnMdTWhAs9YNSCPB2ZOcAJyZTt3iLcTHdW4v1L86JAjNIlWaBLCP3yY" referrerPolicy="no-referrer" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex gap-2 mb-3">
                    <span className="bg-slate-100 dark:bg-slate-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase text-slate-600 dark:text-slate-400">Ultrabook</span>
                    <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase">New Generation</span>
                  </div>
                  <h3 className="font-black text-xl mb-2 group-hover:text-primary transition-colors">Titan ProBook X14</h3>
                  <div className="flex items-center gap-1 mb-4">
                    <span className="material-symbols-outlined text-sm text-amber-400 fill-amber-400">star</span>
                    <span className="material-symbols-outlined text-sm text-amber-400 fill-amber-400">star</span>
                    <span className="material-symbols-outlined text-sm text-amber-400 fill-amber-400">star</span>
                    <span className="material-symbols-outlined text-sm text-amber-400 fill-amber-400">star</span>
                    <span className="material-symbols-outlined text-sm text-amber-400 fill-amber-400">star_half</span>
                    <span className="text-xs text-slate-400 ml-1">(124 Reviews)</span>
                  </div>
                  {/* Tech Spec Badges */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 bg-slate-50 dark:bg-slate-800 px-2 py-1.5 rounded">
                      <span className="material-symbols-outlined text-sm text-primary">memory</span>
                      i9-14900HK
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 bg-slate-50 dark:bg-slate-800 px-2 py-1.5 rounded">
                      <span className="material-symbols-outlined text-sm text-primary">analytics</span>
                      64GB DDR5
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 bg-slate-50 dark:bg-slate-800 px-2 py-1.5 rounded">
                      <span className="material-symbols-outlined text-sm text-primary">developer_board</span>
                      RTX 4080
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 bg-slate-50 dark:bg-slate-800 px-2 py-1.5 rounded">
                      <span className="material-symbols-outlined text-sm text-primary">speed</span>
                      2TB NVMe
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 line-through">$2,499.00</span>
                      <p className="text-2xl font-black text-slate-900 dark:text-slate-100">$1,999.99</p>
                    </div>
                    <button className="size-12 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* Product Card 2 */}
              <div className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 flex flex-col">
                <div className="relative aspect-[4/3] bg-slate-50 dark:bg-slate-800 overflow-hidden">
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded">Limited Stock</span>
                  </div>
                  <button className="absolute top-4 right-4 z-20 size-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors">
                    <span className="material-symbols-outlined text-sm">favorite</span>
                  </button>
                  <img alt="High-end gaming laptop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Professional gaming laptop with RGB keyboard and high-refresh screen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBI234WxeGEmPujVSCbmRPk_JwYux5L6suWsURwEagBGc7-bbdiG6sLR82bGwgUT6d9MjOauYaqNcFBPTR4DoG6os5jXvTfYmwi74ROrIcY__5U6wI5v6duAyjzZOTbtdIA856WSBlrbyKFx3yd_o79-lDs2vN8eIw7BQNJ9C9hhEOMbXSk1I6eP-v_9uEl3plSj3LXhi_HjDsx8m7xP9u_XYfbCnpFm22x_UQNR_FuRjVd5OsV2wY0eJMAtBrXdMyPF_jE5Qph5J3" referrerPolicy="no-referrer" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex gap-2 mb-3">
                    <span className="bg-slate-100 dark:bg-slate-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase text-slate-600 dark:text-slate-400">Gaming Rigs</span>
                  </div>
                  <h3 className="font-black text-xl mb-2 group-hover:text-primary transition-colors">AeroBlade G17 Elite</h3>
                  <div className="flex items-center gap-1 mb-4">
                    <span className="material-symbols-outlined text-sm text-amber-400 fill-amber-400">star</span>
                    <span className="material-symbols-outlined text-sm text-amber-400 fill-amber-400">star</span>
                    <span className="material-symbols-outlined text-sm text-amber-400 fill-amber-400">star</span>
                    <span className="material-symbols-outlined text-sm text-amber-400 fill-amber-400">star</span>
                    <span className="material-symbols-outlined text-sm text-slate-300">star</span>
                    <span className="text-xs text-slate-400 ml-1">(89 Reviews)</span>
                  </div>
                  {/* Tech Spec Badges */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 bg-slate-50 dark:bg-slate-800 px-2 py-1.5 rounded">
                      <span className="material-symbols-outlined text-sm text-primary">memory</span>
                      Ryzen 9 7945HX
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 bg-slate-50 dark:bg-slate-800 px-2 py-1.5 rounded">
                      <span className="material-symbols-outlined text-sm text-primary">analytics</span>
                      32GB DDR5
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 bg-slate-50 dark:bg-slate-800 px-2 py-1.5 rounded">
                      <span className="material-symbols-outlined text-sm text-primary">developer_board</span>
                      RTX 4090
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 bg-slate-50 dark:bg-slate-800 px-2 py-1.5 rounded">
                      <span className="material-symbols-outlined text-sm text-primary">display_settings</span>
                      240Hz QHD+
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-black text-slate-900 dark:text-slate-100">$3,299.00</p>
                    </div>
                    <button className="size-12 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* Product Card 3 */}
              <div className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 flex flex-col">
                <div className="relative aspect-[4/3] bg-slate-50 dark:bg-slate-800 overflow-hidden">
                  <button className="absolute top-4 right-4 z-20 size-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors">
                    <span className="material-symbols-outlined text-sm">favorite</span>
                  </button>
                  <img alt="Sleek silver thin laptop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Minimal silver ultrabook on a white marble table" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdHJK6Nsrujin30Ehu9Ma6OTA8umVoaX2cEqxyeENr32hHdy2f2_uRPpB8Ie-3ItdA1-gSaNCpvUqh_EjNNauRhUzXLxc_OuwMckt781Q0cNyLSY4xf5wiAIFiuJSB4c-A8TiwIgFq9qwmzC6Ffw3iZnXWfi-1YFM_vNsba1Uq2oVS6V5jiXYKgX6iPoq6hj3vXZtYzpvvrn_JNw6uI5r7dBb6Jv3xOkZLky2xU86r-fY6K18lU2-haJcXkArFcMvs5E_9k5qIHEu6" referrerPolicy="no-referrer" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex gap-2 mb-3">
                    <span className="bg-slate-100 dark:bg-slate-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase text-slate-600 dark:text-slate-400">2-in-1</span>
                  </div>
                  <h3 className="font-black text-xl mb-2 group-hover:text-primary transition-colors">Zenith Flex Flip</h3>
                  <div className="flex items-center gap-1 mb-4">
                    <span className="material-symbols-outlined text-sm text-amber-400 fill-amber-400">star</span>
                    <span className="material-symbols-outlined text-sm text-amber-400 fill-amber-400">star</span>
                    <span className="material-symbols-outlined text-sm text-amber-400 fill-amber-400">star</span>
                    <span className="material-symbols-outlined text-sm text-amber-400 fill-amber-400">star</span>
                    <span className="material-symbols-outlined text-sm text-amber-400 fill-amber-400">star</span>
                    <span className="text-xs text-slate-400 ml-1">(56 Reviews)</span>
                  </div>
                  {/* Tech Spec Badges */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 bg-slate-50 dark:bg-slate-800 px-2 py-1.5 rounded">
                      <span className="material-symbols-outlined text-sm text-primary">memory</span>
                      i7-1365U
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 bg-slate-50 dark:bg-slate-800 px-2 py-1.5 rounded">
                      <span className="material-symbols-outlined text-sm text-primary">analytics</span>
                      16GB LPDDR5
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 bg-slate-50 dark:bg-slate-800 px-2 py-1.5 rounded">
                      <span className="material-symbols-outlined text-sm text-primary">pen_size_2</span>
                      Stylus Incl.
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 bg-slate-50 dark:bg-slate-800 px-2 py-1.5 rounded">
                      <span className="material-symbols-outlined text-sm text-primary">screenshot</span>
                      OLED Touch
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-black text-slate-900 dark:text-slate-100">$1,449.00</p>
                    </div>
                    <button className="size-12 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* More product placeholders for the long page feel */}
              <div className="col-span-full py-12 flex flex-col items-center justify-center border-y border-slate-100 dark:border-slate-800 my-10">
                <div className="flex -space-x-4 mb-6">
                  <img alt="avatar" className="size-12 rounded-full border-2 border-white object-cover" data-alt="Tech user avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsuTFy8WJfwh9HTNA6ViN0Qg4ZyrmbOeuciUe02-8E0HPsn1VqStvCbl2YxftcLkaUlGqvPJrPHSzsA3WGckbeMocpC5tG1sn6vwUZaj3NRgpRAUADFylvJUWwvDNBZppwavCPFgRv-oxQtbtBshvZ716We0fs2CiNLp1_F4N1ZIrieLK2rE6gWvtFPyZH_AaD8fgYbX6pQlpMvjiWGmZd-g4WjK-WtiEK8IbNn0X1m06sxxc93pa2sgO2-HvWfdZ7F5bm-I34uG1m" referrerPolicy="no-referrer" />
                  <img alt="avatar" className="size-12 rounded-full border-2 border-white object-cover" data-alt="Tech user avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoSb1A0qXjIXMvMowv0UNauZoewvy7JBQ4a6Elbiwa9QwACEB61fKqY0R1NV_dcU4W1HAd8HI10HoXxTXGLxll7j__ZMUk5HOLM9Keq_ZA8uaZbPrTBpOXyWsrfFY8Xccek3bXcanImHIpHXmeQwrcsZay_8Nhtw0iaAzAnZ_DfHuncdm2RqJhCP4t4qrCa8OIjNB2x__DbStSxDlc27VRZ1a-BDZMHJO37n7PAFEC7kjUnAvJC5bkFwee6zEYeoJjovoSqHq2Q5Fj" referrerPolicy="no-referrer" />
                  <img alt="avatar" className="size-12 rounded-full border-2 border-white object-cover" data-alt="Tech user avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDH54dOGzyzMNiARjWxbgp5nYR2-ltkLn_Y4orDwgafyn-FU7EXi5Jhpk9QkyQKTcZskAc1cCWnhSknFayTCbH-1UMsxkeps9gz2pBVZbRLJQPwUj5gnhnPjwqsFeuSP-mrHzp_GQOQnswNzWniDrx0z8CdiANHd7GI2oaVpJT_22M8KRYG3rIpZNLMn1AJK5IfLxSJNnGi5QbWhq9tFBCf9hP8BcYWUyU2Cq_gH2rdtR8S5BELhCXwSW2bDuykEE55Yq1C2BKCe_Xe" referrerPolicy="no-referrer" />
                  <div className="size-12 rounded-full border-2 border-white bg-primary flex items-center justify-center text-white text-xs font-bold">+2.4k</div>
                </div>
                <h4 className="text-xl font-bold mb-2">Join the Orient Professional Community</h4>
                <p className="text-slate-500 max-w-md text-center">Exclusive access to driver updates, benchmark results, and tech workshops with our certified engineers.</p>
              </div>
              {/* Continued Product Grid... */}
              {/* Product Card 4 */}
              <div className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 flex flex-col">
                <div className="relative aspect-[4/3] bg-slate-50 dark:bg-slate-800 overflow-hidden">
                  <img alt="Premium MacBook-style laptop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Modern dark gray magnesium alloy laptop" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA720o56mGb0yCUJnpMtEyn5m5KtAe2fiM2pITKiJDEY2o04OAcfG5zIC0z2noy2X5-2g-vJkjgeCZY9mnYQQz2OqvGJxVyJlHw_bFvvMLoYLIyvAtE8zltRqWZGCoSaOHtw-CpjEfrva5XZrX-vMoDZLJlkXgmSc28Xul868r-MA251wcBA_yQ1LmO_BQjg0-X6hGZcnY58r-XjpyUFS7mqGnOTNWbur0OBD9GbFB6uTg0W1yvO0ndSsPb9JqD67Mq2kwtubw6leqr" referrerPolicy="no-referrer" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-black text-xl mb-2 group-hover:text-primary transition-colors">Quantum M-Series</h3>
                  <div className="grid grid-cols-2 gap-2 mb-6 mt-4">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 bg-slate-50 dark:bg-slate-800 px-2 py-1.5 rounded">
                      <span className="material-symbols-outlined text-sm text-primary">memory</span>
                      M3 Pro Chip
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 bg-slate-50 dark:bg-slate-800 px-2 py-1.5 rounded">
                      <span className="material-symbols-outlined text-sm text-primary">analytics</span>
                      36GB Unified
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <p className="text-2xl font-black text-slate-900 dark:text-slate-100">$2,899.00</p>
                    <button className="size-12 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary/90 transition-colors">
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Load More / Pagination */}
            <div className="mt-16 flex flex-col items-center gap-4">
              <button className="px-8 py-4 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-primary transition-colors flex items-center gap-3">
                Load More Machines
                <span className="material-symbols-outlined text-sm">keyboard_double_arrow_down</span>
              </button>
              <p className="text-xs text-slate-400 font-medium italic">Showing 1-12 of 148 products</p>
            </div>
          </div>
        </div>
        {/* Tech Comparison Section */}
        <section className="mt-24 bg-slate-900 rounded-[2rem] p-12 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/20 blur-[120px] rounded-full -mr-20 -mt-20"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">Orient Power Performance Benchmarks</h2>
              <p className="text-slate-400 text-lg mb-8">Not sure which processor fits your workflow? Compare the latest architectures and thermal performance scores across our entire lineup.</p>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold uppercase tracking-wider">
                    <span>3D Rendering Speed</span>
                    <span className="text-primary">+45% vs 2023</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold uppercase tracking-wider">
                    <span>Thermal Stability</span>
                    <span className="text-primary">-12°C cooler</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
              <button className="mt-10 px-6 py-3 border-2 border-primary text-primary rounded-lg font-bold hover:bg-primary hover:text-white transition-all">Download Detailed Specs (PDF)</button>
            </div>
            <div className="relative">
              <img alt="CPU architecture diagram" className="rounded-xl shadow-2xl rotate-3 scale-105" data-alt="High tech close up of computer circuit board and processor" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB61DcqQFC2ggzQDb9o4WmDNnuzsbS-LmYvIIsrHqdA7gp-RbSWN7PBMg2e2vfmhMsf1kNPn5Lk3PnfmqifX5Nxj2EzD4udEx9VRbliJ2nWCWnWNdOvXzsXB39maBpKMAzlua8rZK_5CUFy3JMtsvTrSkvNMPj_X_oqNtrNa0kheBgSj_67eAK4xPkqMb4jTGx5A8B5TTYjIO5v_owg_SEwVClVMZDCePKxolVdSxtgFppuJpxeFyF6Q0V-285dFD_zuAxcMUkj20Hu" referrerPolicy="no-referrer" />
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-20 mt-24">
        <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 text-white mb-6">
              <div className="size-8 bg-primary rounded flex items-center justify-center">
                <span className="material-symbols-outlined text-sm">terminal</span>
              </div>
              <h1 className="text-xl font-black tracking-tight">Orient<span className="text-primary">.</span></h1>
            </div>
            <p className="text-sm leading-relaxed">The Middle East's premier destination for high-performance computing and enterprise technology solutions since 1995.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Categories</h4>
            <ul className="space-y-4 text-sm">
              <li><a className="hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>Gaming Laptops</a></li>
              <li><a className="hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>Enterprise Workstations</a></li>
              <li><a className="hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>Creative Ultrabooks</a></li>
              <li><a className="hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>Refurbished Units</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-4 text-sm">
              <li><a className="hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>Hardware Upgrade Lab</a></li>
              <li><a className="hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>Technical Support</a></li>
              <li><a className="hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>Business Procurement</a></li>
              <li><a className="hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>Warranty Registry</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Newsletter</h4>
            <p className="text-sm mb-4">Get the first look at new arrivals and exclusive tech benchmarks.</p>
            <div className="flex gap-2">
              <input className="bg-slate-900 border-slate-800 rounded-lg py-2 px-3 text-sm focus:ring-primary flex-1" placeholder="Email address" type="email"/>
              <button className="bg-primary text-white p-2 rounded-lg">
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto px-6 border-t border-slate-900 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-widest">
          <p>© 2024 Orient Hypermarket. All rights reserved.</p>
          <div className="flex gap-8">
            <a className="hover:text-white" href="#" onClick={(e) => e.preventDefault()}>Privacy</a>
            <a className="hover:text-white" href="#" onClick={(e) => e.preventDefault()}>Terms</a>
            <a className="hover:text-white" href="#" onClick={(e) => e.preventDefault()}>Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
