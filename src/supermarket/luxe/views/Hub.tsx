import React from 'react';

export default function Hub({ navigateTo, onProductClick, onAdd }: { navigateTo: (view: string) => void, onProductClick?: (product: any) => void, onAdd: (product: any) => void }) {
  return (
    <div className="bg-slate-50 text-slate-900 font-display">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-8">
            {/* Logo */}
            <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => navigateTo('home')}>
              <div className="text-primary">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fillRule="evenodd"></path>
                  <path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fillRule="evenodd"></path>
                </svg>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 hidden md:block">Orient <span className="text-primary">Hypermarket</span></span>
            </div>
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">search</span>
                </div>
                <input className="block w-full pl-11 pr-4 py-2.5 bg-slate-100 border-none rounded-xl text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm" placeholder="Search for the latest gadgets, brands, or deals..." type="text" />
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-6">
              <button className="p-2 text-slate-600 hover:text-primary transition-colors hidden sm:block">
                <span className="material-symbols-outlined">favorite</span>
              </button>
              <button className="relative p-2 text-slate-600 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">shopping_cart</span>
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">3</span>
              </button>
              <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden border border-slate-200 cursor-pointer">
                <img className="h-full w-full object-cover" data-alt="User profile avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAq8rbiPuwILfRuU6tw3rD_ElniC-t-04JVX5iySN5AtxqQsH-PbyCfYA-KXMp6Re7JZFyZ90bYI8Xm5Jo2E8X5pesMaAmnU2L03QutGMBjHW8ky6iZpNIjgw1ivH_6dgIkWMlESS_E53eSMp8Efz94Ug7esftn085k25n1bO8DA8p3xzwcLwxxC8EYG4LorB8X_Aej5fnZv5WEM_-jeCPbyG6P2E4iqPv5xmnivonWZAAw_XC_GvDcZmlwkTVwSg1gIzANNOBNM7NN" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="pb-20">
        {/* Breadcrumbs */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <ol className="flex items-center space-x-2 text-sm text-slate-500">
            <li className="flex items-center">
              <a className="hover:text-primary cursor-pointer" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>Home</a>
              <span className="material-symbols-outlined text-sm ml-2">chevron_right</span>
            </li>
            <li className="font-semibold text-primary">Electronics &amp; Gadgets</li>
          </ol>
        </nav>
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="relative h-[480px] w-full rounded-3xl overflow-hidden bg-slate-900 group">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent z-10"></div>
            <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Premium sleek laptop on a dark desk with blue neon accents" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzNMQNlpRIujfAwF2zC1g7qAz3Vavckm8Y0eKKL_SicpKo4cJte6dd_owzE4ud5v_cK2LdOAVydlcvsf5tPvZU5N7U0f_GDia8iof_bW26XP9sXUne8teVh-Vp26pozzIIOQuYfAHwGuasl-BJcpnjW5s4qFv511DjP6OugU60NYM6AiPfLylLnl8RYzvH56qhR6BVxwQwsaPpMx5_1ZxS0hf2Z8UKMvKrB5XurXL7dP1WlFSRXqZpd83W2-ZehjixHK7D6SC5jckU" referrerPolicy="no-referrer" />
            <div className="relative z-20 h-full flex flex-col justify-center px-12 md:px-20 max-w-2xl">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6 w-max">New Arrivals</span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
                The Future <br /><span className="text-primary">is Here</span>
              </h1>
              <p className="text-slate-300 text-lg mb-8">
                Experience the next generation of premium tech. From foldable displays to cinematic home theaters.
              </p>
              <div className="flex gap-4">
                <button className="bg-primary text-white px-8 py-3.5 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-primary/20">Shop the Collection</button>
                <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-3.5 rounded-xl font-bold hover:bg-white/20 transition-all">Learn More</button>
              </div>
            </div>
          </div>
        </section>
        {/* Category Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Browse by Department</h2>
              <p className="text-slate-500 mt-1">Explore our curated collections of premium electronics.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {/* Smartphones */}
            <a onClick={(e) => { e.preventDefault(); navigateTo('smartphones'); }} className="cursor-pointer group relative aspect-[4/5] overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
              <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="Close up of a modern smartphone camera system" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzIEFMJxeBOrYEaJGWlhZG_KIbhyIxgbfZRXkZXAKVIXzFpX42vK1f4A4uMDVcK5-lM55cl047av0qjfumLnamY6HhTeqDfMLeqH3Zfmp2Dm8aUlJ2p_bji4T5EQW8J0umoVv25TZyVlE7BZAtu1emY_B1OELeVc95tKkzA41OUa-bPfCXdPIi-V9TbXLx9p3GvMzF2om-5O3-dBQBzJ1BnA_r2dnJlvpWPYyviOKKiIwBYNnM_px-XTPV5Wx6JAHHuoWp7-OYvhQG" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-sm font-medium opacity-80">Mobile</p>
                <h3 className="text-lg font-bold">Smartphones</h3>
              </div>
            </a>
            {/* Laptops */}
            <a onClick={(e) => { e.preventDefault(); navigateTo('laptops'); }} className="cursor-pointer group relative aspect-[4/5] overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
              <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="Aluminum laptop keyboard and trackpad" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAEAdXMX3HJ2Mk87KAc29n0RvT6N2FQLF5YTRDM4C8GaOZt68mh7c0ejF4ww3apFxwPpS2ZFmByG9yueTvLzVZSoiBVIg6LXe-25o25r7PIyBQbYe_r8g1jPDGSNRoIBODLUMWepfDDJS6zFsecHgIDpSnZiYg_QidAK5EXZDsrBCzzWb8imFqPJCsxAGysCh9oR-6QHwwfFLMR4M24Rhv5jUZP5X0MuxL1Mtx91EsH-OCx85ubKGJ9Vvj3h-Iiw4Tl3vnTcmo4nAI" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-sm font-medium opacity-80">Computing</p>
                <h3 className="text-lg font-bold">Laptops</h3>
              </div>
            </a>
            {/* Audio */}
            <a onClick={(e) => { e.preventDefault(); navigateTo('audio'); }} className="cursor-pointer group relative aspect-[4/5] overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
              <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="High-end noise cancelling headphones" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgOl8rlv5plV1DMkqnugGqeslO-P1cELU6y6kpRqUdPt7vCjv6hBf7Cz97OgLWlEywgepbgI6riSGpEwvUeXA5DSKQ7Xv7PqjjI-oKSjMOnLMjMqprXPnVD2Tqy2e65wd5p0m6EpS5YHH45CZJJt1J3sNhVgtcG0TRPuU-26QKnhX3vraxhKO331AJQToobiinmhhAolUuGSBPJxe7vOunOyD6XTcbLT5_p82FNL9n8w5Ug57znQZtLOXAkw1Z9-diCgiSjpbbahPE" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-sm font-medium opacity-80">Audio</p>
                <h3 className="text-lg font-bold">Headphones</h3>
              </div>
            </a>
            {/* TV */}
            <a onClick={(e) => { e.preventDefault(); navigateTo('tvs'); }} className="cursor-pointer group relative aspect-[4/5] overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
              <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="Ultra-thin OLED TV screen showing vibrant colors" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKW1VrCA_Qausfryr-ixn8tpSMTQMNKwfcrSPuZHFp_EdW52oyaJAief_qFIzuZA_egHu0kMs0qHO2zBD8Slx_JuLthlm_aL-7T1zBMg3i3C5sC_oks21BEG91DNWM17OK5wgpGMhFc6DX91f5bMaVyEUFblfXk__6vcebSstd8BvbJses6w3VhKtIEGaQg2GpdiC0QtRE4A6J5R1ZXQEo1Uy-MyNLcgMaBRaWvLD_wXuDGDydAqQjGZkVMWpc7wadMflIew6loKAQ" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-sm font-medium opacity-80">Entertainment</p>
                <h3 className="text-lg font-bold">TV &amp; Home</h3>
              </div>
            </a>
            {/* Gaming */}
            <a onClick={(e) => { e.preventDefault(); navigateTo('gaming'); }} className="cursor-pointer group relative aspect-[4/5] overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
              <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="Next-gen gaming controller with lighting effects" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMVfnCXBDxKoV9LXxJZLK7LlLz95WbhVoZ9WWbLH356RdOwLmZTKE4WKca2wyubGm2hAzNMJwUWbAHkv7We5OO20LBQ2N1ErWQfUUnw6aVw6Kf0ZvrSkDjVf8VDvgo0mO1kmKY0q_jawvbeIVWfhLoxFjK8hKqMGYoEi9p-Lbzw0qffmPAXo5zDkoSwtpAXIpvrdKbtlWicg39t7TcrKVRvkLAupEWXUkkC9pSlU4KhBnwyJMBRypTx0V9qeLZ7d4jbNIY7KALLqOT" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-sm font-medium opacity-80">Gaming</p>
                <h3 className="text-lg font-bold">Consoles</h3>
              </div>
            </a>
          </div>
        </section>
        {/* Featured Deals Carousel */}
        <section className="mt-20 bg-slate-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div>
                <h2 className="text-3xl font-bold text-white tracking-tight">Featured Tech Deals</h2>
                <p className="text-slate-400 mt-2">Limited time offers on this season's hottest hardware.</p>
              </div>
              <div className="flex items-center gap-2 p-1 bg-slate-800 rounded-xl">
                <button className="px-6 py-2 rounded-lg bg-primary text-white font-bold text-sm transition-all">All</button>
                <button className="px-6 py-2 rounded-lg text-slate-400 hover:text-white font-bold text-sm transition-all">New</button>
                <button className="px-6 py-2 rounded-lg text-slate-400 hover:text-white font-bold text-sm transition-all">Deals</button>
              </div>
            </div>
            <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-8 snap-x">
              {/* Product Card 1 */}
              <div className="min-w-[320px] md:min-w-[380px] snap-start bg-white rounded-3xl overflow-hidden flex flex-col group">
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Smartphone display showing vibrant colors" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBV_NccDQ9jhqBS6fBsD9cTzn1ndep3i-_8pu8tyWKHjxGSRxYkbMWccaqknscgEMkeJjD-tplXSBk2oHEKAtItxBIzYr6j6zy1zbsq4pAm6PBmMqWWJhaEL4AUmNsQAYFip5zAZYemcTATDonZ74Y8Il6O8OCdQoNR8wQqex6-6MB8U2y7RSnmAEP_SlI0OYezFLUCk48JTYjC1DX54KymZnZeEUFD92EeZCkHT3ScB1rFkMWM97DxydHz1CYNwqvUvZpH666SvXdc" />
                  <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">New Release</div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">iPhone 15 Pro Max</h3>
                  <p className="text-slate-500 text-sm mb-6 line-clamp-2">Titanium design, A17 Pro chip, a customizable Action button, and a more versatile Pro camera system.</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-slate-400 line-through text-sm">$1,199.00</span>
                      <p className="text-2xl font-black text-slate-900">$1,099.00</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAdd({
                          id: "e2_iphone",
                          brand: "Apple",
                          name: "iPhone 15 Pro Max",
                          price: 1099000,
                          category: "Luxe",
                          context: "RETAIL",
                          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBV_NccDQ9jhqBS6fBsD9cTzn1ndep3i-_8pu8tyWKHjxGSRxYkbMWccaqknscgEMkeJjD-tplXSBk2oHEKAtItxBIzYr6j6zy1zbsq4pAm6PBmMqWWJhaEL4AUmNsQAYFip5zAZYemcTATDonZ74Y8Il6O8OCdQoNR8wQqex6-6MB8U2y7RSnmAEP_SlI0OYezFLUCk48JTYjC1DX54KymZnZeEUFD92EeZCkHT3ScB1rFkMWM97DxydHz1CYNwqvUvZpH666SvXdc"
                        });
                      }}
                      className="h-12 w-12 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-primary transition-colors"
                    >
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* Product Card 2 */}
              <div className="min-w-[320px] md:min-w-[380px] snap-start bg-white rounded-3xl overflow-hidden flex flex-col group">
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="High-end studio monitor headphones on stand" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1b56a5OqTSl-r1rTYUmQM1vo9Iydw8ZRX38I0Mg1oKnanjHqqF_BgG4n_iPL4CXYqBBYy4K5KzLc5XvhzNw_J9wmvaNclR2VyvwrWFS2r_dNdCfSKfTOeqsjaL1hjLabRL2ObTBP-fYHYoZOTGYC2oNqZGcDW2Ij8znDfOeVXdjzQTAzX5529sD-1Kk_ztARDiR5J6nWx25D5j5WyP0gb31khOCY3i9DMVpnpkx6CowUtQcpPI71WW02NTTH_uByfXtDrf8EK9btN" />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">Save $50</div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Sony WH-1000XM5</h3>
                  <p className="text-slate-500 text-sm mb-6 line-clamp-2">Industry-leading noise cancellation with eight microphones and Auto NC Optimizer for the best sound.</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-slate-400 line-through text-sm">$399.00</span>
                      <p className="text-2xl font-black text-slate-900">$349.00</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAdd({
                          id: "e3_sony",
                          brand: "Sony",
                          name: "Sony WH-1000XM5",
                          price: 349000,
                          category: "Luxe",
                          context: "RETAIL",
                          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1b56a5OqTSl-r1rTYUmQM1vo9Iydw8ZRX38I0Mg1oKnanjHqqF_BgG4n_iPL4CXYqBBYy4K5KzLc5XvhzNw_J9wmvaNclR2VyvwrWFS2r_dNdCfSKfTOeqsjaL1hjLabRL2ObTBP-fYHYoZOTGYC2oNqZGcDW2Ij8znDfOeVXdjzQTAzX5529sD-1Kk_ztARDiR5J6nWx25D5j5WyP0gb31khOCY3i9DMVpnpkx6CowUtQcpPI71WW02NTTH_uByfXtDrf8EK9btN"
                        });
                      }}
                      className="h-12 w-12 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-primary transition-colors"
                    >
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* Product Card 3 */}
              <div className="min-w-[320px] md:min-w-[380px] snap-start bg-white rounded-3xl overflow-hidden flex flex-col group">
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Retro aesthetic gaming setup with modern components" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDga5ynWk5TXbo2pwFGYzODbg9jWwtecBHn0Nd5rG4SNurDqHIwoP2jTZR585vnLbbxkD_xS1hIT3BmCTaanbM2iT0YXvDGtl5DinDrkoA8_jD8gqN3ZXK8BDTM4olAroRLjuXxJobRIkQ2qSKLgRWiqVk77-e-xGTAMwl-2UmILKpNJdWgbVD6eAU8y3Livk8B-e5Fewrl1XN4xu6ch63l1Y4UUdTJPaUk8gJtB2xuwvriPTK2jeMhAGEm-9bN3fTzWMXkCY6penc-" />
                  <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">Exclusive</div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">RTX 4090 Desktop</h3>
                  <p className="text-slate-500 text-sm mb-6 line-clamp-2">The ultimate gaming PC powered by NVIDIA’s flagship GPU. Unmatched performance in 4K resolution.</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-slate-400 line-through text-sm">$2,599.00</span>
                      <p className="text-2xl font-black text-slate-900">$2,399.00</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAdd({
                          id: "e4_rtx",
                          brand: "NVIDIA",
                          name: "RTX 4090 Desktop",
                          price: 2399000,
                          category: "Luxe",
                          context: "RETAIL",
                          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDga5ynWk5TXbo2pwFGYzODbg9jWwtecBHn0Nd5rG4SNurDqHIwoP2jTZR585vnLbbxkD_xS1hIT3BmCTaanbM2iT0YXvDGtl5DinDrkoA8_jD8gqN3ZXK8BDTM4olAroRLjuXxJobRIkQ2qSKLgRWiqVk77-e-xGTAMwl-2UmILKpNJdWgbVD6eAU8y3Livk8B-e5Fewrl1XN4xu6ch63l1Y4UUdTJPaUk8gJtB2xuwvriPTK2jeMhAGEm-9bN3fTzWMXkCY6penc-"
                        });
                      }}
                      className="h-12 w-12 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-primary transition-colors"
                    >
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Tech Essentials */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Tech Essentials &amp; Accessories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Accessory 1 */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-4 hover:border-primary transition-colors cursor-pointer group">
              <div className="h-20 w-20 bg-slate-100 rounded-xl overflow-hidden shrink-0">
                <img className="h-full w-full object-cover group-hover:scale-110 transition-transform" data-alt="Portable power bank" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAh-K4ml3L7UbAy3B1fdPhVd-LUFroOylsrE3FilduQX1NCRRhYB5DuRDHgSlb5R6hCZs0juWlnmd47vzIeEA-Ag28Rpy_AyLdxFj8ZTn12Jyu7JRim0xSSNarXlmEZwR2A90pOFeDLizZdhAXYDVsxcWj0Sng36uD2QbN5zeoq0dDL8TbwBYEnNJratpEzXDgl9ctwM8wmNXZpqKSpVUqgzNCd3cl3djma9CUdJWYOWjTa0NTnkGalVDkikReapBDjhBRqkMYgSqzS" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">MagSafe Battery Pack</h4>
                <p className="text-primary font-bold mt-1">$89.00</p>
              </div>
            </div>
            {/* Accessory 2 */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-4 hover:border-primary transition-colors cursor-pointer group">
              <div className="h-20 w-20 bg-slate-100 rounded-xl overflow-hidden shrink-0">
                <img className="h-full w-full object-cover group-hover:scale-110 transition-transform" data-alt="Tablet digital pen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2RKU6qYaSCfU76cKKi0Zjafpr8ApZYtPDw_Hask0zJKztO-WzIsBFZB-oF-KG__r9L_w_bRG0tx-0UUWx6sNpHL1sKroF4uvWssFf1PMeoeY9SSou9JUUAPgMbFwGm85xoiTMwQleruEzwVnfpJc6KeUb5lMTWccVtpqwHj-ZFltjwiKds42v0IIlzQ8D82zUhcUdgJU43jn90NjMR7qi-_Fuh2HLIK8_bfF8HhKAIqTFiZY0rn_dVzq6HOl5mJUQtKG99_3WUNyS" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Apple Pencil (2nd Gen)</h4>
                <p className="text-primary font-bold mt-1">$129.00</p>
              </div>
            </div>
            {/* Accessory 3 */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-4 hover:border-primary transition-colors cursor-pointer group">
              <div className="h-20 w-20 bg-slate-100 rounded-xl overflow-hidden shrink-0">
                <img className="h-full w-full object-cover group-hover:scale-110 transition-transform" data-alt="Wireless charging pad" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4iSE0hvUBmqPl8RvftBR3HYpJH-6x9pBouEl7ZOYTCi2BiltZtVmkfOblDeC0ACRwJ4XbZe_f__rCSA33UQgimTI8IvVKJ6oC5rxYDn_cjqhIKFmLugSh4uIwN8J77PN96i59qtmogeqrzdV4c69HBgoTAJSfLGwtAOnQssy285HEDCbDuzzNeZaqQQhzGEnbjAk_BMA2zTeTuMleVOpx2WI4Ohx2CUfk6x61U6_3WMpy5_z6IG3jkGc9-N-zCLNlPQHxcPDzpUVv" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Qi Wireless Station</h4>
                <p className="text-primary font-bold mt-1">$45.00</p>
              </div>
            </div>
            {/* Accessory 4 */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-4 hover:border-primary transition-colors cursor-pointer group">
              <div className="h-20 w-20 bg-slate-100 rounded-xl overflow-hidden shrink-0">
                <img className="h-full w-full object-cover group-hover:scale-110 transition-transform" data-alt="Modern laptop mouse" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrAhQyioX67t_S6RZO1ynz36K6cRxA5LpBYUySXFKA6-vZCCAJL-Up_yo17eEJvVCB8kl8FfQZN2xKdu_Gat7rdu4Ydg9WNiWDRy9GmOKyFEOc5tkk3J0hQpBbVgpZVBZzo8eaK0pEX9_7PpcNMge6x8Tk6OX3z-f3o08hpT1hUDMCghOdjZVG3Rignu2hCyMiihOIRFe445uqWJAip8mXTSEaj4nyG6Fap79DW1ptnzabBrel5H3cfLHr3crGvK18QNqEN2geGP1R" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Logitech MX Master 3S</h4>
                <p className="text-primary font-bold mt-1">$99.00</p>
              </div>
            </div>
          </div>
        </section>
        {/* Brand Showcase */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
          <div className="border-t border-slate-200 pt-16">
            <div className="text-center mb-12">
              <h2 className="text-slate-400 font-bold uppercase tracking-widest text-xs">Our Official Brand Partners</h2>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
              <img className="h-10 w-auto" data-alt="Apple Logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCNxKSiUHiCGofzBsI9WF8imEeht6-1P4zU5pBYS6WrQLGfLZKemybz5AbObgneAmOreZGx8fTx37bYFXlESUDgriZ50mNLitNUit02R0nSpUXOY1tBSIsgVqgihlpA19h_84X4XdKL2_eVla6eNFMfXYuoqwc8VLFpk8PEpkntclbqc1mZTikOWNso3piBqSb3QbSL69ky9MNGBt7QzkYErXZ3F5PNS9GwcML868tO5nPII-Bh2LCW9Ma7XytOZ5tCcJrKCm1opR8" />
              <img className="h-6 w-auto" data-alt="Samsung Logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuChOzhgYSqt2m_5kOj_Fu26s8r8xSv6X-yuBLRMw15cBMfFF9jUG4IFgHQv_yiNIPYbkOJxTO3R0jeP8mU4_YOmOs3QUdNFmsp7YuCvUW8B35HlaIsZZvKU4wKmUCY80Kx1cQLHbwLNQZsblFriHjiHGQfrphQex1VQBSY1ild_-Mlx2RbcD1ofv3rS6VemYH7UyxF3KO92QDjMuPujrQXTqYUCUu0J9z3PTAIqnHtllSYdSmRgea88CLm3RfsKcORhjXojnfPZARYN" />
              <img className="h-6 w-auto" data-alt="Sony Logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAb8brnIZ7MT0Ze_lCiUzB3W-Vjm7yK6qcKKaMLBi4jumKdFG5QN3KuuzfIHX_NDwe6njkal4fn6eKloui9wI5h243gkKJn3qMHPv6donSq8u4eG6UJZCrXBUAXyIjmIWu2JLoy6DTNW0VL2Au9KHRZyl3uYSOXo7ljYwVhsv0q9QzAPhfeksw7Sj2iOA72r6JdirbyG8gJmgJ_YWSkcq8F_5opAb6kBD8X6ZImyuVhWC9o1LEYRR90NxM3z2nRMgqKZHBshRvmtu5N" />
              <img className="h-10 w-auto" data-alt="Dell Logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVFQL6he2B_06KXs52FvtnxYiBMaHQPNxxJKz5ogWeDJC_Qj1p2Tdso07NyJWzb3sxrdGhyFtnKmVIzS7o5xIWV64yErktTSdWhSvNkuOj4iXJgb01qd9UkNmf9MyGiyzTTbsVLkbETxWQPRUmD987SfZLAhx0z4L3pdBJrwbug-CkkkAm0KnsKvZSKxcUqqgIDQ_dYjLTM5M7Hm9vLtAi-zSxrVaC8p4EQgqRer4JclJ16r6G58MQLc4n2bIm5bRZjDjCtsYiQest" />
              <img className="h-6 w-auto" data-alt="Asus Logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgt57aBuvZSWURlSj3q3yQ0SjBqL6Kwv7sbActqfxtK8wnicVf6lMkJjLkBunEJcJp376zh7-thEikMsoYNZ1QatP5WW1rQNQ0DkLyXaHoCapPI7UfZIsLp-iTw-RJm2uVBkXaBER-pNcYODUVFNr8JyhT03ceCMGtqxQoQFsiX4gnXRa8l9lvuf4V52VvFHig9AH5OO5RYN3XgkztDrE-cKrXfkjqvvdxCj5HZft1iOHE0POVawpSxrnUiBcaKtpz9C4jCroobpVl" />
            </div>
          </div>
        </section>
        {/* Newsletter CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 mb-12">
          <div className="bg-primary rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-black text-white mb-4">Never miss a tech drop.</h2>
              <p className="text-white/80 text-lg">Sign up for our tech newsletter and get $20 off your first purchase over $200.</p>
            </div>
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
              <input className="px-6 py-4 rounded-xl border-none w-full sm:w-80 focus:ring-2 focus:ring-white" placeholder="Your email address" type="email" />
              <button className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors shrink-0">Subscribe</button>
            </div>
          </div>
        </section>
      </main>
      {/* Simple Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="text-primary">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fillRule="evenodd"></path>
                <path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
            </div>
            <p className="text-sm text-slate-500">© 2024 Orient Hypermarket. All tech rights reserved.</p>
          </div>
          <div className="flex gap-8 text-sm text-slate-500 font-medium">
            <a className="hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            <a className="hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a>
            <a className="hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>Store Locator</a>
            <a className="hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
