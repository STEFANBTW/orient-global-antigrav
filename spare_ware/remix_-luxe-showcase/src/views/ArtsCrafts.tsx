import React from 'react';
import { motion } from "motion/react";

export default function ArtsCrafts({ navigateTo }: { navigateTo: (view: string) => void }) {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <main className="max-w-[1440px] mx-auto px-6 lg:px-10 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-8">
          <button onClick={() => navigateTo('home')} className="hover:text-primary">Home</button>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <button onClick={() => navigateTo('books-stationery')} className="hover:text-primary">Books & Stationery</button>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-slate-900 dark:text-slate-100 font-semibold">Arts & Crafts</span>
        </nav>
        {/* Category Header */}
        <div className="flex flex-col gap-4 mb-12">
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-slate-100">Arts & Crafts</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">Unleash your inner artist with our curated selection of premium tools, professional canvases, and guided community workshops.</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Filter Sidebar */}
          <aside className="w-full lg:w-72 flex-shrink-0 space-y-8">
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">category</span> Categories
              </h3>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-primary text-white font-medium shadow-lg shadow-primary/20">
                  <span className="material-symbols-outlined">palette</span> Painting
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined">edit</span> Sketching
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined">gesture</span> Knitting
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined">architecture</span> Model Building
                </button>
              </div>
            </div>
            <div className="border-t border-primary/10 pt-8">
              <h3 className="font-bold text-lg mb-4">Skill Level</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input className="rounded border-primary/30 text-primary focus:ring-primary w-5 h-5" type="checkbox" />
                  <span className="group-hover:text-primary transition-colors">Beginner</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input className="rounded border-primary/30 text-primary focus:ring-primary w-5 h-5" type="checkbox" />
                  <span className="group-hover:text-primary transition-colors">Intermediate</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input className="rounded border-primary/30 text-primary focus:ring-primary w-5 h-5" type="checkbox" />
                  <span className="group-hover:text-primary transition-colors">Professional</span>
                </label>
              </div>
            </div>
            <div className="border-t border-primary/10 pt-8">
              <h3 className="font-bold text-lg mb-4">Medium</h3>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold hover:bg-primary hover:text-white transition-all">Acrylic</button>
                <button className="px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold hover:bg-primary hover:text-white transition-all">Oil</button>
                <button className="px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold hover:bg-primary hover:text-white transition-all">Watercolor</button>
                <button className="px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold hover:bg-primary hover:text-white transition-all">Charcoal</button>
                <button className="px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold hover:bg-primary hover:text-white transition-all">Gouache</button>
              </div>
            </div>
            <div className="bg-primary/10 p-6 rounded-2xl relative overflow-hidden group">
              <div className="relative z-10">
                <h4 className="font-bold text-primary mb-2">Student Discount</h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">Get 15% off on all art supplies with a valid student ID.</p>
                <button className="text-xs font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">Apply Now <span className="material-symbols-outlined text-sm">arrow_forward</span></button>
              </div>
              <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-8xl text-primary/5 rotate-12">school</span>
            </div>
          </aside>
          {/* Product Grid */}
          <div className="flex-1 space-y-12">
            {/* Sorting & View Options */}
            <div className="flex items-center justify-between border-b border-primary/10 pb-4">
              <p className="text-sm font-medium text-slate-500">Showing 240 products</p>
              <div className="flex items-center gap-4">
                <select className="bg-transparent border-none text-sm font-semibold focus:ring-0 cursor-pointer">
                  <option>Most Popular</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest Arrivals</option>
                </select>
                <div className="h-4 w-[1px] bg-primary/20"></div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined cursor-pointer hover:text-primary">grid_view</span>
                  <span className="material-symbols-outlined cursor-pointer text-slate-400 hover:text-primary">view_list</span>
                </div>
              </div>
            </div>
            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {/* Product 1 */}
              <motion.div 
                layoutId="product-ac1"
                onClick={() => onProductClick?.({
                  id: "ac1",
                  brand: "Daler-Rowney",
                  name: "Professional Series 24 Acrylic Paint Set",
                  price: 4800,
                  rating: 4.5,
                  reviews: 1240,
                  badge: "Best Seller",
                  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBytYJ_5XltCg3-MlQhPQZqmMi_dM5_S4MQIVi-3DopE6eNyxF07F2qWt6mQq9bUSij_v1YsbO2Kl71Pm2Slv93becH14xMbq8gA77MlmqrLn74O-aUTBYk8WmxOm8oAUSCo2ARBCuJcvRvLjiAJ-LOzanDkaK46geqlyttlgNVsYcLsSE_z1EmmGf5LJ6JsI-l5Ydi2Y0UYZuvKwEMCEIKo7dE_cZ2zk8g53eX9H_tK-LScwi7ZGjZY5w3SA-wTgrkvlBAHfRuduah"
                })}
                className="group bg-white dark:bg-slate-800/50 rounded-2xl overflow-hidden border border-primary/5 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden">
                  <motion.img layoutId="product-image-ac1" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBytYJ_5XltCg3-MlQhPQZqmMi_dM5_S4MQIVi-3DopE6eNyxF07F2qWt6mQq9bUSij_v1YsbO2Kl71Pm2Slv93becH14xMbq8gA77MlmqrLn74O-aUTBYk8WmxOm8oAUSCo2ARBCuJcvRvLjiAJ-LOzanDkaK46geqlyttlgNVsYcLsSE_z1EmmGf5LJ6JsI-l5Ydi2Y0UYZuvKwEMCEIKo7dE_cZ2zk8g53eX9H_tK-LScwi7ZGjZY5w3SA-wTgrkvlBAHfRuduah" referrerPolicy="no-referrer" />
                  <button onClick={(e) => { e.stopPropagation(); }} className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">favorite</span>
                  </button>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-primary px-3 py-1 rounded-full text-white text-[10px] font-bold tracking-widest uppercase">Best Seller</span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-xs font-bold text-primary mb-1">Daler-Rowney</p>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors leading-tight">Professional Series 24 Acrylic Paint Set</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-amber-400">
                      <span className="material-symbols-outlined text-sm fill-current">star</span>
                      <span className="material-symbols-outlined text-sm fill-current">star</span>
                      <span className="material-symbols-outlined text-sm fill-current">star</span>
                      <span className="material-symbols-outlined text-sm fill-current">star</span>
                      <span className="material-symbols-outlined text-sm fill-current">star_half</span>
                    </div>
                    <span className="text-xs text-slate-400">(1,240)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-black text-slate-900 dark:text-slate-100">$48.00</p>
                    <button onClick={(e) => { e.stopPropagation(); }} className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl text-white shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </motion.div>
              {/* Product 2 */}
              <motion.div 
                layoutId="product-ac2"
                onClick={() => onProductClick?.({
                  id: "ac2",
                  brand: "Moleskine",
                  name: "Art Collection Hardcover Sketchbook (A4)",
                  price: 2950,
                  rating: 5.0,
                  reviews: 842,
                  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoy5Vc0nmOC6yH9XQG9rltZ2gh8Etx9SXQZQGLxxK5mfZeJadq-WCWqFhEG_qThi7Gjs6jrm1uZya_rC0HbTCey3V5gz-riWqQK-emSfUkiA7gE9jn2q0M41AdQA6bON-hxVeXwQPuJfAbo0W8d4YiO6h3gw0JzUHMtJmrkY1cnYfnoSPrWzagMUgRTImTI-_4Mp4u9qkQV8Y7934kpAIve6BtqBik6NI4aSc8oSFd1asTf1d8VDY8i3EUvk0cSaSgaui-ok5OOL6-"
                })}
                className="group bg-white dark:bg-slate-800/50 rounded-2xl overflow-hidden border border-primary/5 hover:border-primary/20 transition-all cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden">
                  <motion.img layoutId="product-image-ac2" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoy5Vc0nmOC6yH9XQG9rltZ2gh8Etx9SXQZQGLxxK5mfZeJadq-WCWqFhEG_qThi7Gjs6jrm1uZya_rC0HbTCey3V5gz-riWqQK-emSfUkiA7gE9jn2q0M41AdQA6bON-hxVeXwQPuJfAbo0W8d4YiO6h3gw0JzUHMtJmrkY1cnYfnoSPrWzagMUgRTImTI-_4Mp4u9qkQV8Y7934kpAIve6BtqBik6NI4aSc8oSFd1asTf1d8VDY8i3EUvk0cSaSgaui-ok5OOL6-" referrerPolicy="no-referrer" />
                  <button onClick={(e) => { e.stopPropagation(); }} className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-400">
                    <span className="material-symbols-outlined">favorite</span>
                  </button>
                </div>
                <div className="p-6">
                  <p className="text-xs font-bold text-primary mb-1">Moleskine</p>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors leading-tight">Art Collection Hardcover Sketchbook (A4)</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-amber-400">
                      <span className="material-symbols-outlined text-sm fill-current">star</span>
                      <span className="material-symbols-outlined text-sm fill-current">star</span>
                      <span className="material-symbols-outlined text-sm fill-current">star</span>
                      <span className="material-symbols-outlined text-sm fill-current">star</span>
                      <span className="material-symbols-outlined text-sm fill-current">star</span>
                    </div>
                    <span className="text-xs text-slate-400">(842)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-black text-slate-900 dark:text-slate-100">$29.50</p>
                    <button onClick={(e) => { e.stopPropagation(); }} className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl text-white">
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </motion.div>
              {/* Pattern Breaker: Community Masterclass */}
              <div className="col-span-1 md:col-span-2 xl:col-span-3 bg-slate-900 rounded-3xl overflow-hidden flex flex-col md:flex-row relative min-h-[400px]">
                <div className="flex-1 p-12 flex flex-col justify-center relative z-10 bg-gradient-to-r from-slate-900 to-transparent">
                  <span className="text-primary font-bold tracking-[0.3em] uppercase mb-4 text-xs">Learning Community</span>
                  <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">Master the Art of <br /><span className="text-primary">Oil Painting</span></h2>
                  <p className="text-slate-300 mb-8 max-w-md text-lg">Join Renowned Artist Sarah Jenkins for an exclusive 4-week digital masterclass. Live sessions every Saturday.</p>
                  <div className="flex flex-wrap gap-4">
                    <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all">Enroll Now - $129</button>
                    <button className="border border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all">Watch Preview</button>
                  </div>
                </div>
                <div className="md:w-1/2 h-full relative overflow-hidden">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsWyKcJ8bzGOoSpEzeTyBeqtFLVicxLc67Ga1zYMJ8i9ZBlFPSOV9BqrqBPjjjvOm_q528y2iAnHDbxBDfcH90LQXKK6PnjNKKmBpUpj2-WdLZrqQ1BThrLbYJ569sCg_DqNQUO1xtv9PV3yo8mPnhDh57L9IBHuE38osV8j7SfaQYHOAypjAB1uqvzasxLj3AmmjHViCB5Lm8PCuepV5VZvip8hCTVq33MESMu1TeRnEBQwMr0tf-sKLLQr6QhHtCJXx-Bwy3sCe1" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-slate-900"></div>
                </div>
              </div>
            </div>
            {/* Load More Section */}
            <div className="flex flex-col items-center py-12 border-t border-primary/10">
              <p className="text-sm text-slate-500 mb-6 font-medium">You've viewed 48 of 240 items</p>
              <div className="w-full max-w-xs h-1 bg-primary/10 rounded-full mb-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-primary w-[20%]"></div>
              </div>
              <button className="px-12 py-4 bg-background-light dark:bg-background-dark border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1">
                Show More Products
              </button>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-background-dark text-slate-400 py-20 px-10">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 text-white mb-6">
              <span className="material-symbols-outlined text-3xl text-primary">box_add</span>
              <h2 className="text-xl font-bold">Orient</h2>
            </div>
            <p className="text-sm leading-loose">Leading supplier of creative materials and household essentials since 1995. Empowering artists across the globe.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Departments</h4>
            <ul className="space-y-3 text-sm">
              <li><a className="hover:text-primary transition-colors" href="#">Fine Art</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Graphic Design</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Crafts & Hobbies</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Kids Creative</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Support</h4>
            <ul className="space-y-3 text-sm">
              <li><a className="hover:text-primary transition-colors" href="#">Shipping Info</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Return Policy</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Bulk Orders</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Find a Store</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Newsletter</h4>
            <p className="text-sm mb-4">Get creative inspiration and weekly deals.</p>
            <div className="flex gap-2">
              <input className="bg-white/5 border-white/10 rounded-lg px-4 py-2 text-sm w-full focus:ring-primary focus:border-primary" placeholder="Email" type="email" />
              <button className="bg-primary text-white p-2 rounded-lg"><span className="material-symbols-outlined">send</span></button>
            </div>
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto border-t border-white/5 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs uppercase tracking-widest font-bold">
          <p>© 2024 Orient Hypermarket. All Rights Reserved.</p>
          <div className="flex gap-8">
            <a className="hover:text-primary" href="#">Privacy</a>
            <a className="hover:text-primary" href="#">Terms</a>
            <a className="hover:text-primary" href="#">Accessibility</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
