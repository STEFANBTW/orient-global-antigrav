import React from 'react';
import { LayoutGrid, Search, ShoppingCart, Heart, ChevronRight, Filter, Star, Hammer, Recycle, ShieldCheck } from 'lucide-react';

export default function LargeAppliances({ navigateTo }: { navigateTo: (view: string) => void }) {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-primary/10 px-6 lg:px-40 py-3">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-primary cursor-pointer" onClick={() => navigateTo('home')}>
              <LayoutGrid className="size-8" />
              <h1 className="text-slate-900 dark:text-slate-100 text-xl font-extrabold tracking-tight">Orient <span className="text-primary">Hyper</span></h1>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a className="text-slate-700 dark:text-slate-300 text-sm font-semibold hover:text-primary transition-colors cursor-pointer" onClick={() => navigateTo('home')}>Home</a>
              <a className="text-slate-700 dark:text-slate-300 text-sm font-semibold hover:text-primary transition-colors border-b-2 border-primary cursor-pointer" onClick={() => navigateTo('appliances')}>Appliances</a>
              <a className="text-slate-700 dark:text-slate-300 text-sm font-semibold hover:text-primary transition-colors cursor-pointer" onClick={() => navigateTo('hub')}>Electronics</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-primary/60" />
              <input className="bg-primary/5 border-none rounded-lg pl-10 pr-4 py-2 w-64 focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Search appliances..." type="text" />
            </div>
            <button className="p-2 hover:bg-primary/10 rounded-lg text-slate-700 dark:text-slate-300">
              <ShoppingCart className="size-5" />
            </button>
            <button className="p-2 hover:bg-primary/10 rounded-lg text-slate-700 dark:text-slate-300">
              <Heart className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto w-full px-6 lg:px-10 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <a className="hover:text-primary cursor-pointer" onClick={() => navigateTo('home')}>Home</a>
          <ChevronRight className="size-4" />
          <a className="hover:text-primary cursor-pointer" onClick={() => navigateTo('appliances')}>Home Appliances</a>
          <ChevronRight className="size-4" />
          <span className="text-primary font-medium">Large Appliances</span>
        </nav>

        <div className="mb-10">
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Large Appliances</h2>
          <p className="text-slate-500 mt-2 text-lg max-w-2xl">Modern efficiency for your home. Explore our curated selection of high-performance refrigerators, smart washers, and high-capacity dryers.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filter */}
          <aside className="w-full lg:w-72 shrink-0 space-y-8">
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-primary/10 shadow-sm">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Filter className="size-5 text-primary" /> Filters
              </h3>
              
              <div className="mb-6">
                <p className="font-semibold text-sm mb-3 text-slate-700 dark:text-slate-300">Product Type</p>
                <div className="space-y-2">
                  {['Fridges', 'Washers', 'Dryers'].map(type => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer group">
                      <input className="rounded border-primary/30 text-primary focus:ring-primary/20" type="checkbox" />
                      <span className="text-sm group-hover:text-primary">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6 border-t border-primary/5 pt-6">
                <p className="font-semibold text-sm mb-3 text-slate-700 dark:text-slate-300">Brand</p>
                <div className="space-y-2">
                  {['Samsung Elite', 'LG Signature', 'Orient Pro', 'Bosch Max'].map(brand => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                      <input className="rounded border-primary/30 text-primary focus:ring-primary/20" type="checkbox" />
                      <span className="text-sm group-hover:text-primary">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6 border-t border-primary/5 pt-6">
                <p className="font-semibold text-sm mb-3 text-slate-700 dark:text-slate-300">Energy Rating</p>
                <div className="flex flex-wrap gap-2">
                  {['A+++', 'A++', 'A+', 'B'].map(rating => (
                    <button key={rating} className={`px-3 py-1 rounded-lg border border-primary/20 text-xs font-bold transition-all ${rating === 'A++' ? 'bg-primary text-white' : 'hover:bg-primary hover:text-white'}`}>
                      {rating}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-primary p-6 rounded-xl text-white relative overflow-hidden group">
              <div className="relative z-10">
                <p className="text-xs font-bold uppercase tracking-widest opacity-80">Season Sale</p>
                <h4 className="text-xl font-bold mt-1">Up to 30% Off</h4>
                <p className="text-sm mt-2 opacity-90">On all Side-by-Side Fridges this week.</p>
                <button className="mt-4 bg-white text-primary px-4 py-2 rounded-lg text-xs font-bold">Shop Sale</button>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6 bg-white dark:bg-slate-900/50 p-4 rounded-xl border border-primary/10">
              <span className="text-sm font-medium text-slate-500">Showing <span className="text-slate-900 dark:text-slate-100">1-12 of 48</span> products</span>
              <select className="text-sm border-none bg-transparent focus:ring-0 cursor-pointer">
                <option>Sort by: Popularity</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <ProductCard 
                brand="Samsung Elite"
                name="Smart Bespoke French Door Refrigerator"
                price={2499}
                originalPrice={3199}
                rating={4.8}
                reviews={124}
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuDRpI-5QDA4DahXbJ53_MNpCbdHXf8GX2VGkyZ0IoZN4-XcO51JqfBzl-3DWJOXBEfREISQ00bTaoP7YtYMAcVMUlT6G4BDGgD-bEp3n9fMp_yeOPBjJAOZfCHAXkNMSfCu8Llf6Fc168WqPc6TAPsXXY51bB1lpyQHxFq87f4CHH1ZkhwsCMwx-FQUYvnLAjjDWxiIOiA-cdFCnMvg9ApHqTLQIQSadvtl7YRiRUPVhSz5pgDzWc2aasWuGNJRuhWRYUYKRinzm75Q"
                badges={['Eco-friendly', 'Best Seller']}
              />
              <ProductCard 
                brand="LG Signature"
                name="AI Powered Front Load Washer 12kg"
                price={899}
                originalPrice={1099}
                rating={5.0}
                reviews={89}
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuCMhaMVQn4YQQCs3EtY0Bj0GReAjJ0AX-j4nWREYbapa3oqySQg9Pfw6dIDPAJJEUm6hI1sUIUN6TgzMnp_m70CCMUxB_6cZ4APmjc7rQm8tFnyye-9uM3tkPAxl81SgeYNC1q_RG0sgJz-DiyVRRv175_iep1e90NyIrWgw-rPjJFL5UZnLPoKyP7H_0SpSPwCxCX-nXKqDUDr4bjtrnEMJLUyU8SDJZ1OWVuGtvDvy7MO3ckilgftfdy7ZcWw1EMXvA34Izu5PMqT"
                badges={['Smart Tech']}
              />
              <ProductCard 
                brand="Orient Pro"
                name="Midnight Series Bottom Mount Fridge"
                price={1299}
                originalPrice={1599}
                rating={4.5}
                reviews={56}
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuAK3Rwyc25tavHmCSsCwyFept-dXKRE4oa0rPPMgkSDuCb6PvI8WJ5SUoReHwioCFkb0v94ltdlESM1MYKJkHSJDCkzHbiVW6UqiqgpUZ1ZLICwCdKhDinR1pYZsiRejbre_0vhtmY_IMKkdYSLByOaGryvLe0DbqRKaHyB7RBpJSx1r9SUHKfdFk07eIN_CfA8viGWJ8yscgLb2r5cpmwPA4SkmhWOApx93rmpVw7wxcgUJutIooHDJbHgbNOWjnN8kb6RQgD7yB9_"
                badges={['Orient Exclusive']}
              />
            </div>

            {/* Compare Section */}
            <section className="mt-20">
              <div className="mb-8">
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Compare Top Appliances</h2>
                <p className="text-slate-500">Quickly compare key specifications of our highest-rated models.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white dark:bg-slate-900/50 rounded-xl overflow-hidden border border-primary/10">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="p-4 text-left">Features</th>
                      <th className="p-4 text-center">Samsung Elite X</th>
                      <th className="p-4 text-center">LG Signature Pro</th>
                      <th className="p-4 text-center">Bosch Max 500</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {[
                      { label: 'Energy Rating', v1: 'A+++', v2: 'A+++', v3: 'A++' },
                      { label: 'Capacity', v1: '640 Liters', v2: '601 Liters', v3: '540 Liters' },
                      { label: 'Smart Connect', v1: true, v2: true, v3: false },
                      { label: 'Warranty', v1: '10 Years', v2: '10 Years', v3: '5 Years' },
                    ].map((row, i) => (
                      <tr key={i} className={`border-b border-primary/5 ${i % 2 !== 0 ? 'bg-primary/5' : ''}`}>
                        <td className="p-4 font-bold text-slate-700 dark:text-slate-300">{row.label}</td>
                        <td className="p-4 text-center">{typeof row.v1 === 'boolean' ? (row.v1 ? '✓' : '✗') : row.v1}</td>
                        <td className="p-4 text-center">{typeof row.v2 === 'boolean' ? (row.v2 ? '✓' : '✗') : row.v2}</td>
                        <td className="p-4 text-center">{typeof row.v3 === 'boolean' ? (row.v3 ? '✓' : '✗') : row.v3}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Installation Banner */}
            <section className="mt-20 bg-slate-900 rounded-3xl p-10 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
              <div className="relative z-10 flex-1">
                <h2 className="text-3xl font-black text-white leading-tight">Expert Installation & <span className="text-primary">Free Recycling.</span></h2>
                <p className="text-slate-400 mt-4 max-w-md">Our certified technicians will handle everything from setup to hauling away your old appliance at no extra cost.</p>
                <div className="flex gap-8 mt-8">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary"><Hammer className="size-6" /></div>
                    <span className="text-xs text-white font-bold">Pro Setup</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary"><Recycle className="size-6" /></div>
                    <span className="text-xs text-white font-bold">Eco-Recycle</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary"><ShieldCheck className="size-6" /></div>
                    <span className="text-xs text-white font-bold">Guaranteed</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

interface ProductCardProps {
  brand: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badges?: string[];
}

function ProductCard({ brand, name, price, originalPrice, rating, reviews, image, badges }: ProductCardProps) {
  return (
    <div className="group bg-white dark:bg-slate-900/50 rounded-xl border border-primary/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="relative h-64 overflow-hidden bg-slate-50 flex items-center justify-center p-8">
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {badges?.map((b: string) => (
            <span key={b} className={`text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase ${b === 'Eco-friendly' ? 'bg-emerald-500' : 'bg-primary'}`}>{b}</span>
          ))}
        </div>
        <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart className="size-4" />
        </button>
        <img src={image} alt={name} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
      </div>
      <div className="p-5">
        <p className="text-xs text-primary font-bold uppercase tracking-wider">{brand}</p>
        <h3 className="font-bold text-slate-900 dark:text-slate-100 mt-1 line-clamp-1">{name}</h3>
        <div className="flex items-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`size-3.5 ${i < Math.floor(rating) ? 'fill-primary text-primary' : 'text-slate-300'}`} />
          ))}
          <span className="text-xs text-slate-400 ml-1">({reviews} reviews)</span>
        </div>
        <div className="flex items-end gap-2 mt-4">
          <span className="text-2xl font-black text-slate-900 dark:text-slate-100">${price}</span>
          {originalPrice && <span className="text-sm text-slate-400 line-through mb-1">${originalPrice}</span>}
        </div>
        <button className="w-full mt-5 bg-primary/10 hover:bg-primary text-primary hover:text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
          <ShoppingCart className="size-4" /> Add to Cart
        </button>
      </div>
    </div>
  );
}
