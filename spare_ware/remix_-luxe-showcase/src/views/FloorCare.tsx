import React from 'react';
import { LayoutGrid, Search, ShoppingCart, Heart, ChevronRight, Star, Battery, Wind, Filter, ShieldCheck } from 'lucide-react';

export default function FloorCare({ navigateTo }: { navigateTo: (view: string) => void }) {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between gap-8">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('home')}>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
                <LayoutGrid className="size-6" />
              </div>
              <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase">Orient</h2>
            </div>
            <nav className="hidden lg:flex items-center gap-8">
              <a className="text-sm font-semibold hover:text-primary transition-colors cursor-pointer">Deals</a>
              <a className="text-sm font-semibold hover:text-primary transition-colors cursor-pointer">Brands</a>
              <a className="text-sm font-semibold hover:text-primary transition-colors cursor-pointer">Stores</a>
              <a className="text-sm font-semibold hover:text-primary transition-colors cursor-pointer">Help</a>
            </nav>
            <div className="flex flex-1 items-center justify-end gap-4">
              <div className="relative hidden md:block w-full max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                <input className="w-full rounded-full border-none bg-primary/5 py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/50 outline-none" placeholder="Search appliances..." type="text" />
              </div>
              <div className="flex items-center gap-2">
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all">
                  <ShoppingCart className="size-5" />
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all">
                  <Heart className="size-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
          <a className="hover:text-primary cursor-pointer" onClick={() => navigateTo('home')}>Home</a>
          <ChevronRight className="size-4" />
          <a className="hover:text-primary cursor-pointer" onClick={() => navigateTo('appliances')}>Home Appliances</a>
          <ChevronRight className="size-4" />
          <span className="text-slate-900 dark:text-white">Vacuums & Floor Care</span>
        </nav>

        {/* Category Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white lg:text-5xl">Vacuums & Floor Care</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400 font-medium">Precision cleaning technology for every surface. From autonomous robots to powerful cordless sticks, redefine your home hygiene.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filter Panel */}
          <aside className="w-full lg:w-64 shrink-0 space-y-8">
            <div className="rounded-xl border border-primary/10 bg-white dark:bg-slate-800/50 p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 dark:text-white mb-6">Filters</h3>
              <div className="mb-8">
                <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">
                  <Battery className="size-5 text-primary" /> Battery Life
                </h4>
                <div className="space-y-3">
                  {['30+ Minutes', '60+ Minutes', '90+ Minutes'].map(opt => (
                    <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                      <input className="rounded border-slate-300 text-primary focus:ring-primary h-5 w-5" type="checkbox" />
                      <span className="text-sm font-medium group-hover:text-primary">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              <ProductCard 
                name="OmniClean Robot V10"
                desc="AI-driven navigation with auto-empty docking station and mop integration."
                price={899}
                rating={4.5}
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuCIiV569yfkR9aq54jzImRYjsZg7gAld0MZWX57m1s61zCO-3o6PiOw0gXiIxzUWK_7YYnXXtNTUlk4MSXo0HwTs_T1R6NtrLT5AERAFme-BFptD5DmGziOhhP7v7Rl0_re8bIk8lHGtPlyG9rEgr2SPpxyCyAQ6_7PUYD-eFM947q_rU5sM5SX3nTpfQ1him0Q23qIM9RFrcIeCx0z_Dvq7fYwNe-VyJR0VVLqinh01Tk76zWVkBJgwfporHf1TnieZJCIiTGZLLXK"
                badge="Bestseller"
                brand="Orient Smart Series"
              />
              <ProductCard 
                name="Titan Cordless Pro"
                desc="HEPA filtration with 120AW suction power and 75-minute runtime."
                price={549}
                originalPrice={629}
                rating={5.0}
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuCbC_Xc2MPPg39hVO0OENUzeDzqGT1W4DCqPwIJ2OfupEKBSCRc3x8gNmhY_bO5GFIKsnNZ628rRnmCYo2Vk2CnUiLhzHs9BKbcudL0Mx06SepfjjtvItS-LedspVeIzkXGn3YogWVGh3tK74vu5ryDtUHIpyhasKNH-BjbJ1zKeaPm2RiiOZz3aKnjBMNWVNICthCnTGO46skIi5zi-jPc1KdeABkbUH2gJxqT_isQ1YpfS-vi3TRRP4SvTCNwwxc2cf9i6U80O6mi"
                badge="Premium"
                brand="Elite Stick Series"
              />
              <ProductCard 
                name="DeepForce Upright Z"
                desc="Professional grade carpet deep cleaner with heat-wave technology."
                price={320}
                rating={4.0}
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuBOi_FqHBzYq7NJN8U-nNx3DvyQ5Q31MUReIFAnNoXV9fLDWjyoADPFCQCOCY-J0uf10eC9li47SGrorwVzqyKa3PWgg6KwPXG_C8SXjMZObjwRvgc4iBQ1Ple5JE6eprcwD7XqWvhsZpDuC8aD8XaVWO0g8spQwQ88OyYQI2MNQusxbrUTAkGN6wk7maotJE7kmq6Lek4ZrQ4MOwO2IuDuF_Npan_byqTyMHAAzoY0Rjbzz8uWMLHLPXntdArLiWKPhAf31RUETdR8"
                brand="Pro Power"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Feature Section */}
      <section className="mt-24 bg-slate-900 py-24 text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img alt="Tech Shot" className="relative z-10 rounded-2xl shadow-2xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMRjE0z4wviSGX35b02VDAd6TJsssRuQmkwddH8CQm22AGgiDdy1dKKnNCJX-J5id3ZlvPKzPD7I4B-wVhcAD5T9NgfQfUmoojfdej26RHqOZR3KamdpVhNk0BEnhLSI0f4si4E1g0pPEKYfegfVpWnwwb9ieRhy3u527xamzUwiP8gkiCaCQJhq2z_L_7vNrBEcdY3prSadfDZCMTaGUNmL73YSEZJ764DBt8Rx3dxELhp4gswtrWu0ag5ax8_y_xuoFbH1YJgqZ6" referrerPolicy="no-referrer" />
            </div>
            <div>
              <h2 className="text-primary text-sm font-black uppercase tracking-[0.2em] mb-4">Engineered Perfection</h2>
              <h3 className="text-4xl font-black mb-8 leading-tight">Unrivaled Suction.<br />Flawless Execution.</h3>
              <div className="space-y-8">
                <Feature icon={<Wind className="size-6" />} title="TurboVortex™ Motor" desc="120,000 RPM digital motor creates consistent, fade-free power for deep fiber penetration." />
                <Feature icon={<Filter className="size-6" />} title="5-Stage HEPA Filtration" desc="Captures 99.99% of microscopic particles and allergens down to 0.3 microns." />
                <Feature icon={<ShieldCheck className="size-6" />} title="SmartSense™ Detection" desc="Automatically adjusts suction power across different floor types to optimize battery life." />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

interface ProductCardProps {
  name: string;
  desc: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  badge?: string;
  brand: string;
}

function ProductCard({ name, desc, price, originalPrice, rating, image, badge, brand }: ProductCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 transition-all hover:shadow-xl hover:shadow-primary/10">
      <div className="aspect-square w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
        <img src={image} alt={name} className="h-full w-full object-cover object-center transition-transform group-hover:scale-110" referrerPolicy="no-referrer" />
        {badge && <span className="absolute top-4 left-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white uppercase tracking-tighter">{badge}</span>}
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-bold text-primary uppercase">{brand}</p>
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`size-3.5 ${i < Math.floor(rating) ? 'fill-yellow-400' : ''}`} />
            ))}
          </div>
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{name}</h3>
        <p className="text-sm text-slate-500 line-clamp-2 mb-4">{desc}</p>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-black text-slate-900 dark:text-white">${price}.00</span>
            {originalPrice && <span className="text-xs text-slate-400 line-through">${originalPrice}.00</span>}
          </div>
          <button className="rounded-lg bg-primary p-2 text-white hover:bg-primary/90">
            <ShoppingCart className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

function Feature({ icon, title, desc }: FeatureProps) {
  return (
    <div className="flex gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white">
        {icon}
      </div>
      <div>
        <h4 className="text-xl font-bold mb-1">{title}</h4>
        <p className="text-slate-400">{desc}</p>
      </div>
    </div>
  );
}
