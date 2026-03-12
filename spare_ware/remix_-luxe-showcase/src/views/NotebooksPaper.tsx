import React from 'react';
import { motion } from "motion/react";

export default function NotebooksPaper({ navigateTo }: { navigateTo: (view: string) => void }) {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-8">
          <button onClick={() => navigateTo('home')} className="hover:text-primary">Home</button>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <button onClick={() => navigateTo('books-stationery')} className="hover:text-primary">Books & Stationery</button>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-primary font-semibold">Notebooks & Paper</span>
        </nav>
        {/* Category Hero */}
        <header className="mb-12 relative h-64 rounded-xl overflow-hidden group">
          <img alt="Hero banner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyb4XI8-xfPPDNVOIHJ9E6bU3f1XQIDDlbmGvWEdEginsaHHPfAE4r8frZH43wlugfmY3ZiXj58yM2HuohojHgdgpmyCIpst0DcbsuNXJ4fOTB9Ae8sMz0juOOaS9i_Y61hXfcbigL9xA2VEq3wU8c4R84VS-oJyOAwcbvL12pBZDTMqF8JIls_Mt2wvD6i1TqoEtOX5EX7IHWrotkciLk3BbczhF1vyKFk-yzkiCROFb-j0iaHTXOMZRNYLQXa0XkLqXwvi6UWLrt" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-r from-background-dark/80 via-background-dark/40 to-transparent flex items-center px-12">
            <div className="max-w-md">
              <h1 className="text-4xl font-extrabold text-white mb-4">Notebooks & Fine Paper</h1>
              <p className="text-slate-200 text-lg">Elevate your thoughts with our curated collection of premium writing surfaces.</p>
            </div>
          </div>
        </header>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 space-y-8">
            {/* Main Categories */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-4">Categories</h3>
              <ul className="space-y-3">
                <li>
                  <button className="w-full flex items-center justify-between text-slate-700 dark:text-slate-300 hover:text-primary transition-colors">
                    <span>Journals & Diaries</span>
                    <span className="text-xs bg-primary/10 px-2 py-0.5 rounded-full">124</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center justify-between text-slate-700 dark:text-slate-300 hover:text-primary transition-colors font-bold text-primary">
                    <span>Notebooks</span>
                    <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">86</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center justify-between text-slate-700 dark:text-slate-300 hover:text-primary transition-colors">
                    <span>Planners</span>
                    <span className="text-xs bg-primary/10 px-2 py-0.5 rounded-full">42</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center justify-between text-slate-700 dark:text-slate-300 hover:text-primary transition-colors">
                    <span>Copy & Printer Paper</span>
                    <span className="text-xs bg-primary/10 px-2 py-0.5 rounded-full">15</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center justify-between text-slate-700 dark:text-slate-300 hover:text-primary transition-colors">
                    <span>Sticky Notes</span>
                    <span className="text-xs bg-primary/10 px-2 py-0.5 rounded-full">28</span>
                  </button>
                </li>
              </ul>
            </div>
            {/* Specialized Filters: Paper Weight */}
            <div className="pt-6 border-t border-primary/10">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-4">Paper Weight (GSM)</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input className="rounded border-primary/20 text-primary focus:ring-primary h-5 w-5" type="checkbox" />
                  <span className="text-slate-600 dark:text-slate-400 group-hover:text-primary">70 - 90 GSM (Daily)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input defaultChecked className="rounded border-primary/20 text-primary focus:ring-primary h-5 w-5" type="checkbox" />
                  <span className="text-slate-600 dark:text-slate-400 group-hover:text-primary">100 - 120 GSM (Premium)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input className="rounded border-primary/20 text-primary focus:ring-primary h-5 w-5" type="checkbox" />
                  <span className="text-slate-600 dark:text-slate-400 group-hover:text-primary">140+ GSM (Art/Sketch)</span>
                </label>
              </div>
            </div>
            {/* Specialized Filters: Binding Type */}
            <div className="pt-6 border-t border-primary/10">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-4">Binding Type</h3>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1.5 rounded-lg border border-primary/20 text-xs font-medium hover:bg-primary hover:text-white transition-all">Thread Bound</button>
                <button className="px-3 py-1.5 rounded-lg border border-primary/20 text-xs font-medium bg-primary text-white">Spiral Wire</button>
                <button className="px-3 py-1.5 rounded-lg border border-primary/20 text-xs font-medium hover:bg-primary hover:text-white transition-all">Saddle Stitch</button>
                <button className="px-3 py-1.5 rounded-lg border border-primary/20 text-xs font-medium hover:bg-primary hover:text-white transition-all">Perfect Bound</button>
              </div>
            </div>
            {/* Newsletter Side Widget */}
            <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2">Paper Lover?</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">Join our VIP list for exclusive early access to limited edition Leuchtturm releases.</p>
              <button className="w-full bg-primary text-white py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">Join Now</button>
            </div>
          </aside>
          {/* Product Grid Area */}
          <div className="flex-1">
            {/* Sorting Bar */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-primary/10">
              <p className="text-slate-500 dark:text-slate-400 text-sm">Showing <span className="font-bold text-slate-900 dark:text-slate-100">1-12</span> of 86 Notebooks</p>
              <div className="flex items-center gap-4">
                <label className="text-sm text-slate-500">Sort by:</label>
                <select className="bg-transparent border-none text-sm font-bold text-primary focus:ring-0 cursor-pointer">
                  <option>Newest Arrivals</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Best Rated</option>
                </select>
              </div>
            </div>
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {/* Product Card 1 */}
              <motion.div 
                layoutId="product-np1"
                onClick={() => onProductClick?.({
                  id: "np1",
                  brand: "Orient Heritage",
                  name: "Classic Leather Journal",
                  price: 3400,
                  rating: 4.5,
                  reviews: 124,
                  badge: "New",
                  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKMkH7OKx5stakN_QyoRCAQzlk56fxTxHX9GY9gTwKR-3QQ0gp1b2SfVXYIRXzPOmkdfSjwXVkBPq6LD3XG_ecfFJ2B9C23fA3cyWKu-VUE0PUND8Mkgl5U3pXMzYXzRB34uMSEi42E1afCgneT0CJ-xPGvS9R_wKusQgKtsPvsFPLKtYIY6PuxnA_sW5GMjO_bhIILTh1roGfFK7tzKESKhPFjXGfDHoZfUJj7Dge-ANXBBIbrFPzuMgS7DfpXJ77uu8o3lDM1Gkb"
                })}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] bg-white dark:bg-slate-800 rounded-xl overflow-hidden mb-4 shadow-sm border border-primary/5">
                  <motion.img layoutId="product-image-np1" alt="Product" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKMkH7OKx5stakN_QyoRCAQzlk56fxTxHX9GY9gTwKR-3QQ0gp1b2SfVXYIRXzPOmkdfSjwXVkBPq6LD3XG_ecfFJ2B9C23fA3cyWKu-VUE0PUND8Mkgl5U3pXMzYXzRB34uMSEi42E1afCgneT0CJ-xPGvS9R_wKusQgKtsPvsFPLKtYIY6PuxnA_sW5GMjO_bhIILTh1roGfFK7tzKESKhPFjXGfDHoZfUJj7Dge-ANXBBIbrFPzuMgS7DfpXJ77uu8o3lDM1Gkb" referrerPolicy="no-referrer" />
                  <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase">New</div>
                  <button onClick={(e) => { e.stopPropagation(); }} className="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-900/90 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                    <span className="material-symbols-outlined text-primary">add_shopping_cart</span>
                  </button>
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 mb-1 group-hover:text-primary transition-colors">Classic Leather Journal</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-3">120 GSM • Ruled • A5</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-extrabold text-slate-900 dark:text-white">$34.00</span>
                  <div className="flex text-primary">
                    <span className="material-symbols-outlined text-sm fill-current">star</span>
                    <span className="material-symbols-outlined text-sm fill-current">star</span>
                    <span className="material-symbols-outlined text-sm fill-current">star</span>
                    <span className="material-symbols-outlined text-sm fill-current">star</span>
                    <span className="material-symbols-outlined text-sm fill-current">star_half</span>
                  </div>
                </div>
              </motion.div>
              {/* Product Card 2 */}
              <motion.div 
                layoutId="product-np2"
                onClick={() => onProductClick?.({
                  id: "np2",
                  brand: "Minimalist",
                  name: "Minimalist Dot Grid",
                  price: 1850,
                  rating: 4.0,
                  reviews: 86,
                  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCz8aET3V5iVjg-X_fp3Bhi-7_sN-_l9IJ8pUrHjpUk8cI8pOxklQMlIm8BalMqeHv7nvSn4aFoAJ-cOcGOPacf65hlIWnqMOIFfYQIWdOh4R0saUu6oGs_EaKZzsbGAvWn992GrsxXFHO-W95EkA8BVeLpeI6E9hBUlTCEzK1gArctGgYDlhyaBBEv3QQFs0CBlbUNY3te3TurMa8v9CzFtgvbspBK_BbNC8wNk7zK0D3ocEtlxFKELmo8Bw8UhxHoob7yj0JHcTjg"
                })}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] bg-white dark:bg-slate-800 rounded-xl overflow-hidden mb-4 shadow-sm border border-primary/5">
                  <motion.img layoutId="product-image-np2" alt="Product" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCz8aET3V5iVjg-X_fp3Bhi-7_sN-_l9IJ8pUrHjpUk8cI8pOxklQMlIm8BalMqeHv7nvSn4aFoAJ-cOcGOPacf65hlIWnqMOIFfYQIWdOh4R0saUu6oGs_EaKZzsbGAvWn992GrsxXFHO-W95EkA8BVeLpeI6E9hBUlTCEzK1gArctGgYDlhyaBBEv3QQFs0CBlbUNY3te3TurMa8v9CzFtgvbspBK_BbNC8wNk7zK0D3ocEtlxFKELmo8Bw8UhxHoob7yj0JHcTjg" referrerPolicy="no-referrer" />
                  <button onClick={(e) => { e.stopPropagation(); }} className="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-900/90 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                    <span className="material-symbols-outlined text-primary">add_shopping_cart</span>
                  </button>
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 mb-1 group-hover:text-primary transition-colors">Minimalist Dot Grid</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-3">100 GSM • Dotted • Spiral</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-extrabold text-slate-900 dark:text-white">$18.50</span>
                  <div className="flex text-primary">
                    <span className="material-symbols-outlined text-sm fill-current">star</span>
                    <span className="material-symbols-outlined text-sm fill-current">star</span>
                    <span className="material-symbols-outlined text-sm fill-current">star</span>
                    <span className="material-symbols-outlined text-sm fill-current">star</span>
                    <span className="material-symbols-outlined text-slate-300 text-sm">star</span>
                  </div>
                </div>
              </motion.div>
            </div>
            {/* Pattern Breaker: Premium Brands */}
            <section className="my-16 bg-primary/10 rounded-2xl p-8 lg:p-12 overflow-hidden relative">
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>
              <div className="relative z-10 text-center mb-10">
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Heritage Brands</h2>
                <p className="text-slate-600 dark:text-slate-400">Trusted by writers, artists, and architects for over a century.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-70">
                <div className="text-2xl font-black text-slate-400">MOLESKINE</div>
                <div className="text-2xl font-black text-slate-400">RHODIA</div>
                <div className="text-2xl font-black text-slate-400">MIDORI</div>
                <div className="text-2xl font-black text-slate-400">CLAIREFONTAINE</div>
              </div>
            </section>
            {/* Load More / Pagination */}
            <div className="mt-16 flex flex-col items-center gap-6">
              <button className="px-12 py-4 border-2 border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-all duration-300 uppercase tracking-widest text-sm">
                Load More Products
              </button>
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold">1</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-primary/10 transition-colors font-bold">2</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-primary/10 transition-colors font-bold">3</button>
                <span className="px-2">...</span>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-primary/10 transition-colors font-bold">8</button>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Section with large image */}
        <section className="mt-24 mb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">The Art of the Handwritten Note</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">In a digital world, the feel of a premium pen on heavy-weight paper offers a tactile connection to your thoughts that a screen simply cannot replicate. Our 120 GSM thread-bound notebooks are designed to lay perfectly flat, ensuring your flow remains uninterrupted.</p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <span className="material-symbols-outlined text-primary mb-2">history_edu</span>
                  <h4 className="font-bold text-slate-900 dark:text-white">Ink Resistant</h4>
                  <p className="text-sm text-slate-500">No bleed-through even with heavy fountain ink.</p>
                </div>
                <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <span className="material-symbols-outlined text-primary mb-2">auto_stories</span>
                  <h4 className="font-bold text-slate-900 dark:text-white">Lay-Flat Tech</h4>
                  <p className="text-sm text-slate-500">180-degree opening for seamless writing.</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 rounded-2xl transform rotate-3 scale-105"></div>
                <img alt="Lifestyle image" className="relative z-10 w-full h-[500px] object-cover rounded-2xl shadow-2xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuARdWAASlUcycl9DwF9LpwHFIAhQmtQ1zJVcJjCRoTpT2PU0k7_EtRfw7533dxS-Vi5KCk0Yn3nsY79r9E27RjKBc9-H01Ai23e-2-oIE6Vrc6tJG4R9E1OcLnNjSS9L6VF0QUCXLTc8-sxMsKAQPrDqGzttkHFRC5sMkjjaLWDzEAc_MpUPsygxeLJhNRV5sH2OmiygWsT4AJkhMoCzb3AIp8mJXUAQaZAprWGUJkfhIctfeugfy5q0J4km8Hq0rqILBkekNNApUei" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-slate-900 dark:bg-black rounded-3xl p-12 text-center text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[120px] -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -ml-32 -mb-32"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block px-4 py-1 bg-primary rounded-full text-xs font-bold tracking-widest uppercase mb-6">Stay Inspired</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Join the Stationery Society</h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">Receive weekly inspiration, productivity tips, and exclusive access to our "Small Batch" artisanal paper releases.</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder:text-slate-500" placeholder="Your email address" type="email" />
              <button className="bg-primary hover:bg-primary/90 text-white font-bold px-10 py-4 rounded-full transition-all" type="submit">Subscribe</button>
            </form>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-slate-900/50 border-t border-primary/10 pt-20 pb-10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-sm">book</span>
                </div>
                <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">ORIENT</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">The region's premier destination for fine stationery, luxury writing instruments, and curated office supplies.</p>
              <div className="flex gap-4">
                <a className="w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">facebook</span></a>
                <a className="w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">photo_camera</span></a>
                <a className="w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">alternate_email</span></a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Shop</h4>
              <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
                <li><a className="hover:text-primary transition-colors" href="#">All Notebooks</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Planners 2024</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Luxury Pens</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Office Essentials</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Gift Sets</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Support</h4>
              <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
                <li><a className="hover:text-primary transition-colors" href="#">Shipping Policy</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Track Order</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Returns & Refunds</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Bulk Orders</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Visit Us</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Visit our flagship boutique in Downtown Dubai for personalized monogramming services.</p>
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <span className="material-symbols-outlined text-sm">location_on</span>
                <span>Find a Store</span>
              </div>
            </div>
          </div>
          <div className="pt-10 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-slate-400">© 2024 Orient Hypermarket. All rights reserved. Part of Orient Group.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
