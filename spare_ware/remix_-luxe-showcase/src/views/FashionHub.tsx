import React from "react";
import { Search, ShoppingBag, User, Grid } from "lucide-react";

export default function FashionHub({ navigateTo }: { navigateTo: (view: string) => void }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-orange-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 md:px-10">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigateTo("home")}>
              <div className="bg-orange-500 p-1.5 rounded-lg text-white">
                <Grid size={24} />
              </div>
              <h2 className="text-xl font-extrabold tracking-tight text-slate-900 uppercase">Orient Orange</h2>
            </div>
            <nav className="hidden items-center gap-8 lg:flex">
              <a className="text-sm font-semibold hover:text-orange-500 transition-colors" href="#">Shop</a>
              <a className="text-sm font-semibold hover:text-orange-500 transition-colors" href="#">Editorial</a>
              <a className="text-sm font-semibold hover:text-orange-500 transition-colors text-orange-500" href="#">Collections</a>
              <a className="text-sm font-semibold hover:text-orange-500 transition-colors" href="#">Sale</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={20} />
              <input className="h-10 w-64 rounded-full border-none bg-orange-50 pl-10 text-sm focus:ring-2 focus:ring-orange-200" placeholder="Search collection..." type="text"/>
            </div>
            <button className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-orange-100 transition-colors">
              <ShoppingBag size={20} />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-orange-100 transition-colors">
              <User size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-[90vh] w-full overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop" alt="Fashion Hero" className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center">
          <span className="mb-4 inline-block rounded-full bg-orange-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-500 backdrop-blur-md">Autumn/Winter 2024</span>
          <h1 className="max-w-4xl text-5xl font-black leading-tight text-white md:text-8xl">REDEFINING THE <span className="text-orange-500 italic">ORANGE</span> ERA</h1>
          <p className="mt-6 max-w-xl text-lg text-slate-200">Our latest drop combines architectural silhouettes with technical materials designed for the modern metropolitan life.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button className="rounded-full bg-orange-500 px-10 py-4 text-sm font-bold text-white transition-all hover:bg-orange-600 hover:scale-105">Shop the Drop</button>
            <button className="rounded-full bg-white/10 px-10 py-4 text-sm font-bold text-white backdrop-blur-lg border border-white/20 transition-all hover:bg-white/20">View Lookbook</button>
          </div>
        </div>
      </section>

      {/* Category Links */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          <button onClick={() => navigateTo("womens-fashion")} className="p-8 bg-orange-50 rounded-2xl hover:bg-orange-100 transition-colors text-center">
            <h3 className="font-bold text-xl">Women</h3>
          </button>
          <button onClick={() => navigateTo("mens-fashion")} className="p-8 bg-orange-50 rounded-2xl hover:bg-orange-100 transition-colors text-center">
            <h3 className="font-bold text-xl">Men</h3>
          </button>
          <button onClick={() => navigateTo("fashion-accessories")} className="p-8 bg-orange-50 rounded-2xl hover:bg-orange-100 transition-colors text-center">
            <h3 className="font-bold text-xl">Accessories</h3>
          </button>
          <button onClick={() => navigateTo("kids-wear")} className="p-8 bg-orange-50 rounded-2xl hover:bg-orange-100 transition-colors text-center">
            <h3 className="font-bold text-xl">Kids</h3>
          </button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-24 pb-12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24 border-b border-white/10 pb-24">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 text-orange-500 mb-8">
              <Grid size={32} />
              <h2 className="text-xl font-extrabold tracking-tight uppercase text-white">Orient Orange</h2>
            </div>
            <p className="text-slate-400 leading-relaxed mb-8">Crafting premium, sustainable clothing for the next generation of pioneers. Designed with love, worn with joy.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
