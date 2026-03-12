import React from 'react';
import { motion } from "motion/react";

export default function OfficeTech({ navigateTo }: { navigateTo: (view: string) => void }) {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <button onClick={() => navigateTo('home')} className="hover:text-primary">Home</button>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <button onClick={() => navigateTo('books-stationery')} className="hover:text-primary">Books & Stationery</button>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="font-semibold text-primary">Office Tech & Printers</span>
        </nav>
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black tracking-tight mb-2">Office Tech & Printers</h1>
          <p className="text-slate-500 max-w-2xl text-lg">High-performance solutions for your professional workspace. From next-gen printers to smart document management.</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              {/* Category Selection */}
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-lg">category</span> Categories
                </h3>
                <ul className="space-y-2">
                  <li><button className="w-full text-left px-3 py-2 rounded-lg bg-primary text-white font-medium flex justify-between items-center">Printers <span className="material-symbols-outlined text-sm">check</span></button></li>
                  <li><button className="w-full text-left px-3 py-2 rounded-lg hover:bg-primary/10 transition-colors">Scanners</button></li>
                  <li><button className="w-full text-left px-3 py-2 rounded-lg hover:bg-primary/10 transition-colors">Shredders</button></li>
                  <li><button className="w-full text-left px-3 py-2 rounded-lg hover:bg-primary/10 transition-colors">Calculators</button></li>
                </ul>
              </div>
              {/* Specialized Filter: Connectivity */}
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-lg">wifi</span> Connectivity
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="rounded border-primary/30 text-primary focus:ring-primary" type="checkbox" />
                    <span className="group-hover:text-primary transition-colors">Wireless (Wi-Fi)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="rounded border-primary/30 text-primary focus:ring-primary" type="checkbox" />
                    <span className="group-hover:text-primary transition-colors">Ethernet</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="rounded border-primary/30 text-primary focus:ring-primary" type="checkbox" />
                    <span className="group-hover:text-primary transition-colors">Bluetooth</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="rounded border-primary/30 text-primary focus:ring-primary" type="checkbox" />
                    <span className="group-hover:text-primary transition-colors">Cloud Print Ready</span>
                  </label>
                </div>
              </div>
              {/* Specialized Filter: Paper Size */}
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-lg">description</span> Paper Size
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="rounded border-primary/30 text-primary focus:ring-primary" type="checkbox" />
                    <span className="group-hover:text-primary transition-colors">A4 Standard</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="rounded border-primary/30 text-primary focus:ring-primary" type="checkbox" />
                    <span className="group-hover:text-primary transition-colors">A3 Professional</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="rounded border-primary/30 text-primary focus:ring-primary" type="checkbox" />
                    <span className="group-hover:text-primary transition-colors">Legal & Ledger</span>
                  </label>
                </div>
              </div>
              {/* Price Range */}
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider mb-4">Price Range</h3>
                <input className="w-full accent-primary" type="range" />
                <div className="flex justify-between text-xs mt-2 text-slate-500 font-medium">
                  <span>$99</span>
                  <span>$2,499+</span>
                </div>
              </div>
            </div>
          </aside>
          {/* Product Grid */}
          <div className="flex-1">
            {/* Sorting & View */}
            <div className="flex justify-between items-center mb-6 bg-primary/5 p-3 rounded-xl border border-primary/10">
              <p className="text-sm font-medium">Showing 1-12 of 84 products</p>
              <div className="flex gap-4">
                <select className="bg-transparent border-none text-sm font-semibold focus:ring-0 cursor-pointer">
                  <option>Sort by: Popularity</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                </select>
              </div>
            </div>
            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Product Card 1 */}
              <motion.div 
                layoutId="product-ot3"
                onClick={() => onProductClick?.({
                  id: "ot3",
                  brand: "Canon Pro-Series",
                  name: "Pixma Ultra-Link Wireless All-in-One",
                  price: 29900,
                  rating: 5.0,
                  reviews: 128,
                  badge: "Top Rated",
                  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7dinaDpM_KHgPDbYJHEQjWO2FeZub9enOGxYIjbO6TVyvLsrNwvhF2kUyZrvejrciAjtwA84M3jSoQxRnbD8qZCrDLMEIK6s1B9L6B-ZJ2Hmowi3UIhwbVTrnmTbXHnQLYtSolcm026i98lsK5LeshZZmCKKbImPdLYLZ6lSNNgDGFGKxRCVNZjb-3CUUxMc65y2XjfdPksjRUDp1SzOnLZoCfxliMeuc-cFsRzKxDyfoXDR6bL9BE6evkAqjObagoqd8Y47G0cMV"
                })}
                className="group bg-white dark:bg-background-dark/50 border border-slate-200 dark:border-primary/10 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden bg-slate-50">
                  <motion.img layoutId="product-image-ot3" alt="Professional Printer" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7dinaDpM_KHgPDbYJHEQjWO2FeZub9enOGxYIjbO6TVyvLsrNwvhF2kUyZrvejrciAjtwA84M3jSoQxRnbD8qZCrDLMEIK6s1B9L6B-ZJ2Hmowi3UIhwbVTrnmTbXHnQLYtSolcm026i98lsK5LeshZZmCKKbImPdLYLZ6lSNNgDGFGKxRCVNZjb-3CUUxMc65y2XjfdPksjRUDp1SzOnLZoCfxliMeuc-cFsRzKxDyfoXDR6bL9BE6evkAqjObagoqd8Y47G0cMV" referrerPolicy="no-referrer" />
                  <span className="absolute top-3 left-3 bg-primary text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider">Top Rated</span>
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold text-primary mb-1 uppercase">Canon Pro-Series</p>
                  <h3 className="font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors">Pixma Ultra-Link Wireless All-in-One</h3>
                  <div className="flex items-center gap-1 mb-4">
                    <span className="material-symbols-outlined text-yellow-500 text-sm fill-current">star</span>
                    <span className="material-symbols-outlined text-yellow-500 text-sm fill-current">star</span>
                    <span className="material-symbols-outlined text-yellow-500 text-sm fill-current">star</span>
                    <span className="material-symbols-outlined text-yellow-500 text-sm fill-current">star</span>
                    <span className="material-symbols-outlined text-yellow-500 text-sm fill-current">star</span>
                    <span className="text-xs text-slate-400 font-semibold ml-1">(128)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-slate-900 dark:text-slate-100">$299.00</span>
                    <button onClick={(e) => { e.stopPropagation(); }} className="bg-primary hover:bg-primary/80 text-white p-2 rounded-lg transition-colors flex items-center justify-center">
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </motion.div>
              {/* Product Card 2 */}
              <motion.div 
                layoutId="product-ot4"
                onClick={() => onProductClick?.({
                  id: "ot4",
                  brand: "Epson Elite",
                  name: "WorkForce High-Speed Document Scanner",
                  price: 45000,
                  rating: 4.0,
                  reviews: 42,
                  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD25Tsn_SHZL3Zb5PfqDdjQvCqetfV1xJYfrD7DDHSQ4wExq9tsylct3MuoQ9ROMRJkZ9B_TWbb9JMqrr8JhnIjPN0r6ksVBQYb7E_YejaibFhEDz1p5bleR7ZJ76ZuRsjqv_jXFvtzB9p2Q9lLRoMQHAMQLB9uK0ahiXn5LX6UHulesJVGAyc1vMb0d9r8jBfeRjznFE4IVFO6lxb3PFDovx7DtBZIPG2rAWDBxvLYAnMZA6pJDrS9fHTAhtj__3nYEB1TJdyJF5zy"
                })}
                className="group bg-white dark:bg-background-dark/50 border border-slate-200 dark:border-primary/10 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden bg-slate-50">
                  <motion.img layoutId="product-image-ot4" alt="Office Scanner" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD25Tsn_SHZL3Zb5PfqDdjQvCqetfV1xJYfrD7DDHSQ4wExq9tsylct3MuoQ9ROMRJkZ9B_TWbb9JMqrr8JhnIjPN0r6ksVBQYb7E_YejaibFhEDz1p5bleR7ZJ76ZuRsjqv_jXFvtzB9p2Q9lLRoMQHAMQLB9uK0ahiXn5LX6UHulesJVGAyc1vMb0d9r8jBfeRjznFE4IVFO6lxb3PFDovx7DtBZIPG2rAWDBxvLYAnMZA6pJDrS9fHTAhtj__3nYEB1TJdyJF5zy" referrerPolicy="no-referrer" />
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold text-primary mb-1 uppercase">Epson Elite</p>
                  <h3 className="font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors">WorkForce High-Speed Document Scanner</h3>
                  <div className="flex items-center gap-1 mb-4">
                    <span className="material-symbols-outlined text-yellow-500 text-sm fill-current">star</span>
                    <span className="material-symbols-outlined text-yellow-500 text-sm fill-current">star</span>
                    <span className="material-symbols-outlined text-yellow-500 text-sm fill-current">star</span>
                    <span className="material-symbols-outlined text-yellow-500 text-sm fill-current">star</span>
                    <span className="material-symbols-outlined text-slate-300 text-sm">star</span>
                    <span className="text-xs text-slate-400 font-semibold ml-1">(42)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-slate-900 dark:text-slate-100">$450.00</span>
                    <button onClick={(e) => { e.stopPropagation(); }} className="bg-primary hover:bg-primary/80 text-white p-2 rounded-lg transition-colors flex items-center justify-center">
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </motion.div>
              {/* Pattern Breaker Banner: Smart Office Setup */}
              <div className="col-span-1 md:col-span-2 xl:col-span-3 my-8 rounded-2xl bg-slate-900 relative overflow-hidden h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent z-10"></div>
                <div className="absolute inset-0 z-0 bg-cover bg-center opacity-60" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDejtZOidLww0KBi8lTEH-baA91zSdhS_JggoLSG03sr8ayTbi-H6JGBiGisWsrnxjbO7SiSbw-6rGDh4AlRpwti4L3P7l5_p47OlRmb4Rnq_32MI1Z9KNaylD3Pp94iLN6BsU1KdcQ8YQCVKpmR_--70LXyU6mwr7iyPdOuZe_oizSdb4mW1k93IQJYCyGH8qpPnMdt5OWGHOvAjx34DQJ2zA3jpT1W2yTuGGlZ62d7SFBEBR2A8dvhWbpMY61mO6xYRoDlvd8Dm_0')" }}></div>
                <div className="relative z-20 h-full flex flex-col justify-center px-12 max-w-2xl">
                  <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Business Solutions</span>
                  <h2 className="text-white text-5xl font-black mb-6 leading-tight">Elevate Your <br />Smart Office Setup</h2>
                  <p className="text-slate-300 text-lg mb-8">Integrated systems for hybrid teams. Bulk pricing available for corporate orders and startup kits.</p>
                  <div className="flex gap-4">
                    <button className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105">Get a Quote</button>
                    <button className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-lg backdrop-blur-md transition-all">Explore Bundles</button>
                  </div>
                </div>
              </div>
            </div>
            {/* Load More / Pagination */}
            <div className="mt-16 flex flex-col items-center gap-4">
              <p className="text-sm text-slate-500">You've viewed 6 of 84 items</p>
              <div className="w-64 h-2 bg-primary/10 rounded-full overflow-hidden">
                <div className="w-[8%] h-full bg-primary"></div>
              </div>
              <button className="mt-4 px-8 py-3 bg-white dark:bg-background-dark border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-all">
                Load More Products
              </button>
            </div>
          </div>
        </div>

        {/* Featured Collections Section */}
        <section className="mt-32 border-t border-primary/10 pt-20">
          <h2 className="text-3xl font-black mb-12 text-center">Shop by Professional Need</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative h-96 rounded-3xl overflow-hidden group cursor-pointer">
              <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgqSJowpJryvaOGlEPy8t0git-4GP4eUCNN3nyqvKJ7W0hJGPA7E-DRGysW4fqZqiWUwT34hQH3jLkYXUJe7z10K9O7BaFp_U5yd6_ehqa2h8RkccRYSCiDRXrrMRcVowm_0LZbyvLX66nZImlBxrx91PuW_zvnlh6bh9MHH0lF1NHTe5iIBd_NrxAfhRoBZTsQuRR6BaCdAFYFhVLycHMxex153imTIqxmLOmx_7P549urJ21IMI2um_UYKVwrXyP7vwYoa17OHHj" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                <h3 className="text-white text-3xl font-bold mb-2">The Remote Office</h3>
                <p className="text-slate-200 mb-4">Quiet, compact, and efficient tech for your home study.</p>
                <span className="text-primary font-bold flex items-center gap-2">Explore Collection <span className="material-symbols-outlined">arrow_forward</span></span>
              </div>
            </div>
            <div className="relative h-96 rounded-3xl overflow-hidden group cursor-pointer">
              <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8SMxeC-_8vp2vNspEEG9sIb-yOL3F6aT6AKB9kL6qZ554CvDOO6RCLF5U5lcykQN-rGSCFLFYZATFlxnLE6cxuFsR_DE1ILqjhr2B_NY_E8FefKWb2vBfL1EFZBl2GdWwoEna1rnxbqPRXbsV_YZAxOGqoImgj7qT33-AnPHK9HlxwYgowTDNaspuMh2RfYqdwG4Y6G0HsVLJU2mFdXXNbnHKE929rxfWmadmSHHPBcYwGbPW7qLuKLW4o6Pa1xPhU6UsPq7Jl-B3" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                <h3 className="text-white text-3xl font-bold mb-2">High-Volume Enterprise</h3>
                <p className="text-slate-200 mb-4">Heavy-duty hardware for large teams and fast output.</p>
                <span className="text-primary font-bold flex items-center gap-2">Explore Collection <span className="material-symbols-outlined">arrow_forward</span></span>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Support Section */}
        <section className="mt-32 bg-primary/5 rounded-3xl p-12 text-center border border-primary/10">
          <span className="material-symbols-outlined text-5xl text-primary mb-4">support_agent</span>
          <h2 className="text-3xl font-black mb-4">Need help choosing?</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-lg mb-8">Our office technology specialists are available to help you find the perfect match for your workflow.</p>
          <div className="flex justify-center gap-4">
            <button className="bg-slate-900 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2">
              <span className="material-symbols-outlined">chat</span> Live Chat
            </button>
            <button className="bg-primary text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2">
              <span className="material-symbols-outlined">call</span> Request Call
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-32 pb-12 border-t border-primary/10 pt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div>
              <h4 className="font-black text-slate-900 dark:text-slate-100 mb-6">Shopping</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><a className="hover:text-primary" href="#">Track Order</a></li>
                <li><a className="hover:text-primary" href="#">Delivery Info</a></li>
                <li><a className="hover:text-primary" href="#">Return Policy</a></li>
                <li><a className="hover:text-primary" href="#">Store Locator</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-slate-900 dark:text-slate-100 mb-6">Categories</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><a className="hover:text-primary" href="#">Printers</a></li>
                <li><a className="hover:text-primary" href="#">Inks & Toners</a></li>
                <li><a className="hover:text-primary" href="#">Office Furniture</a></li>
                <li><a className="hover:text-primary" href="#">Paper Supplies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-slate-900 dark:text-slate-100 mb-6">About Us</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><a className="hover:text-primary" href="#">Our Story</a></li>
                <li><a className="hover:text-primary" href="#">Careers</a></li>
                <li><a className="hover:text-primary" href="#">Press</a></li>
                <li><a className="hover:text-primary" href="#">Sustainability</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-slate-900 dark:text-slate-100 mb-6">Contact</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">mail</span> support@orient.com</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">call</span> +1 (800) 123-4567</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">location_on</span> Dubai, UAE</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-primary/5">
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-2xl">inventory_2</span>
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100">Orient Hypermarket © 2024</span>
            </div>
            <div className="flex gap-6">
              <a className="text-slate-400 hover:text-primary" href="#"><span className="material-symbols-outlined">share</span></a>
              <a className="text-slate-400 hover:text-primary" href="#"><span className="material-symbols-outlined">public</span></a>
              <a className="text-slate-400 hover:text-primary" href="#"><span className="material-symbols-outlined">thumb_up</span></a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
