import React from "react";
import { Search, ShoppingBag, ChevronRight, Heart } from "lucide-react";

export default function WomensFashion({ navigateTo, onProductClick }: { navigateTo: (view: string) => void, onProductClick?: (product: any) => void }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-12">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo("home")}>
                <span className="text-[var(--color-accent-light)] text-3xl">✦</span>
                <h1 className="text-xl font-extrabold tracking-tighter uppercase">Luxe Boutique</h1>
              </div>
              <nav className="hidden md:flex items-center gap-8">
                <a className="text-sm font-semibold hover:text-[var(--color-accent-light)] transition-colors" href="#">New</a>
                <a className="text-sm font-semibold text-[var(--color-accent-light)] border-b-2 border-[var(--color-accent-light)]" href="#">Clothing</a>
                <a className="text-sm font-semibold hover:text-[var(--color-accent-light)] transition-colors" href="#">Accessories</a>
                <a className="text-sm font-semibold hover:text-[var(--color-accent-light)] transition-colors text-red-500" href="#">Sale</a>
              </nav>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input className="bg-slate-100 rounded-full py-2 pl-10 pr-4 text-sm w-64 focus:ring-2 focus:ring-orange-500" placeholder="Search collection..." type="text"/>
              </div>
              <button className="p-2 hover:bg-orange-100 rounded-full transition-colors">
                <Heart size={20} />
              </button>
              <button className="p-2 hover:bg-orange-100 rounded-full transition-colors relative">
                <ShoppingBag size={20} />
                <span className="absolute top-1 right-1 bg-[var(--color-accent-light)] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">2</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={() => navigateTo("fashion")} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[var(--color-accent-light)] mb-6">
          <ChevronRight className="rotate-180" size={16} /> Back to Fashion
        </button>
        <h2 className="text-5xl font-black mb-4 tracking-tighter">Women's Fashion</h2>
        <p className="text-slate-500 text-lg max-w-2xl mb-12">Discover a curated selection of premium essentials and statement pieces designed for the modern wardrobe.</p>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {/* Product 1 */}
            <div className="group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-200">
                    <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=400&auto=format&fit=crop" alt="Silk slip dress" referrerPolicy="no-referrer" />
                    <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Heart size={16} />
                    </button>
                </div>
                <div className="mt-4 flex justify-between">
                    <div>
                        <h4 className="font-bold">Silk Slip Dress</h4>
                        <p className="text-sm text-slate-500">Champagne Silk</p>
                    </div>
                    <span className="font-bold text-[var(--color-accent-light)]">$280</span>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}

