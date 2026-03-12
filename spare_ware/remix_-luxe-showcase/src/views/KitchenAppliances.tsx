import React from 'react';
import { Search, ShoppingCart, User, ChevronRight, ArrowRight, Star, Heart, Zap } from 'lucide-react';

export default function KitchenAppliances({ navigateTo }: { navigateTo: (view: string) => void }) {
  return (
    <div className="bg-background-light text-slate-900 font-display min-h-screen">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background-light/80 backdrop-blur-md px-4 md:px-10 lg:px-20 py-3">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-8">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 text-primary cursor-pointer" onClick={() => navigateTo('home')}>
              <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <Zap className="size-5" />
              </div>
              <h2 className="text-slate-900 text-xl font-extrabold tracking-tight">Orient <span className="text-primary text-sm font-medium block leading-3">Hypermarket</span></h2>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a className="text-slate-600 hover:text-primary text-sm font-semibold transition-colors cursor-pointer" onClick={() => navigateTo('home')}>Home</a>
              <a className="text-primary text-sm font-semibold transition-colors border-b-2 border-primary cursor-pointer" onClick={() => navigateTo('appliances')}>Appliances</a>
              <a className="text-slate-600 hover:text-primary text-sm font-semibold transition-colors cursor-pointer">Deals</a>
              <a className="text-slate-600 hover:text-primary text-sm font-semibold transition-colors cursor-pointer">Support</a>
            </nav>
          </div>
          <div className="flex flex-1 justify-end items-center gap-4 lg:gap-6">
            <div className="hidden sm:flex flex-col min-w-[200px] max-w-md w-full relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
              <input className="w-full rounded-full border-none bg-slate-200/50 focus:ring-2 focus:ring-primary/20 pl-10 pr-4 py-2 text-sm placeholder:text-slate-500" placeholder="Search premium appliances..." />
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center justify-center rounded-full size-10 bg-slate-200/50 text-slate-700 hover:bg-primary hover:text-white transition-all">
                <ShoppingCart className="size-5" />
              </button>
              <button className="flex items-center justify-center rounded-full size-10 bg-slate-200/50 text-slate-700 hover:bg-primary hover:text-white transition-all">
                <User className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto w-full flex flex-col px-4 md:px-10 lg:px-20 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto whitespace-nowrap pb-2 no-scrollbar text-sm font-medium">
          <a className="text-slate-400 hover:text-primary cursor-pointer" onClick={() => navigateTo('home')}>Home</a>
          <ChevronRight className="size-4 text-slate-300" />
          <a className="text-slate-400 hover:text-primary cursor-pointer" onClick={() => navigateTo('appliances')}>Home Appliances</a>
          <ChevronRight className="size-4 text-slate-300" />
          <span className="text-slate-900">Kitchen Appliances</span>
        </div>

        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-2">Kitchen Appliances</h1>
          <p className="text-slate-500 max-w-2xl">Elevate your culinary experience with our curated selection of high-performance kitchen technology and professional-grade tools.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-slate-900">Filters</h3>
                <button className="text-primary text-xs font-bold uppercase tracking-wider">Reset</button>
              </div>
              
              <div className="space-y-6">
                <div className="border-b border-slate-200 pb-6">
                  <p className="font-semibold text-slate-800 mb-4">Category</p>
                  <div className="space-y-3">
                    {['Microwaves (42)', 'Blenders (28)', 'Air Fryers (19)', 'Coffee Makers (35)'].map(cat => (
                      <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                        <input className="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox" />
                        <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-primary p-6 text-white overflow-hidden relative group">
              <div className="relative z-10">
                <h4 className="font-bold text-xl mb-2">Smart Home Bundle</h4>
                <p className="text-white/80 text-sm mb-4">Save up to 30% on kitchen sets.</p>
                <button className="bg-white text-primary px-4 py-2 rounded-lg text-xs font-bold transition-transform group-hover:scale-105">View Offers</button>
              </div>
            </div>
          </aside>

          {/* Right Side Content */}
          <div className="flex-1">
            <section className="mb-12 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Chef's Choice: The Pro Collection</h2>
                  <p className="text-slate-600 mb-6 leading-relaxed">Hand-selected by our culinary experts, these appliances combine professional power with modern home aesthetics. Perfect for the home chef who demands precision.</p>
                  <div className="flex flex-wrap gap-4">
                    <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center gap-2">
                      Shop The Collection <ArrowRight className="size-5" />
                    </button>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCc6KjBRYFfyMDyVW1bg9WKsHv_vieuSHjoS9SUleZfajITHnrOHf_CZ8kAW_F7CK43n9-2y0Iurx_6BpluEMPBNIViCGXj6fBmyMPc1FL-8ltElXLq99UTa-LxXOFykXN8WUX7_-r9DZFMPqxFRjc0S3a55OpbgyxkqwRy9UGgrVXX83kC2k0whvObK9VWufvmryMp5eNtCxSTi0X2yOEIg-2dVxWIelfNe-0Wdsl-ZmRC_v5qic5rK1Qko3ZhjBDunj2lOXDxgn3q" alt="Kitchen" className="rounded-2xl w-full object-cover aspect-video" referrerPolicy="no-referrer" />
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              <ProductCard 
                brand="Samsung"
                name="Bespoke 1.1 cu. ft. Countertop Microwave"
                price={189.99}
                originalPrice={249.99}
                rating={4.0}
                reviews={124}
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuB4fYDG9lQwGmPRdJGseU_TTRq2VVvP4n9_aVABHjr2jMDvMPajb14WuQUTyEKHL7B3IjqObXQblc7u-rlaftGiqsMSsM0IeN_ifG8ssPF7uevSU7mMgcSvo0H9Ki0ClnGpX0VQWpO5C__CgCfwj034prodsT6DWWX-X3wC00aR0IgFG4_--o4Q1AOmUj3U-YvU3KK6ETpZpjYwWiobLi9IsfrfQfh2IiA2WYfFj5tPOEFbOk6oOm7U26_U42pYcMH99EW5_poHlRwd"
              />
              <ProductCard 
                brand="Ninja"
                name="Foodi Power Blender & Processor System"
                price={219.00}
                rating={5.0}
                reviews={456}
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuChjAioz9tCvwH_W9UG3NDE-BOmkQmfrzE4Pyi1q1G3bnyUS9NM8_SFvBEk-wEWYcs5Md7U-FNCX19LcLP0lemXB3oJddtrxHDr7X2NOQuU5VvtHEJPljBlkLGRBF1IMRglSPGxyUEjAeDpFsvea1MxzuctztAI4qEWi0we9i-zd367aGWWmNCv_jjyP26UFOA5opPiEWn_86o34lNOoS_EZ_xW_t8nqWs8eSWhPqc6dQcloaClQjwlXYuxvLCh04zj2Vt84B2MpX7S"
              />
              <ProductCard 
                brand="Philips"
                name="Essential Airfryer XL with Rapid Air Tech"
                price={149.95}
                rating={4.0}
                reviews={89}
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuC_unTUkPM9XobO5Se4ziVHRqvk6MZVcXibloZno8Suu4OVqLsIjU6f_V_uSgpK4QSYC3vP_z5Nn2Q3tyqH-Ov2neOZRg_gRjonNeWB3MsYcdYB8_LkH7jKQpuEoc9ow4aYktUDEAYt56hZOCpMINRiSb8gkbekdr_M5arZ4PXYX-0TygrWF-I0VFcUSNQeKZ5PmYmW8ZgZGPaMfOP7ceAst7RTB3VoRP1KbsEnEmoJHxDLZNBhMK48UsyoN6zYHq551leV5E5oG862"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ProductCard({ brand, name, price, originalPrice, rating, reviews, image }: { brand: string, name: string, price: number, originalPrice?: number, rating: number, reviews: number, image: string }) {
  return (
    <div className="group flex flex-col bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-square bg-slate-50 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
        <button className="absolute top-4 right-4 size-10 rounded-full bg-white/80 backdrop-blur-sm text-slate-900 flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm">
          <Heart className="size-5" />
        </button>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-1 text-primary text-xs font-bold tracking-widest uppercase">{brand}</div>
        <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">{name}</h3>
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`size-3.5 ${i < Math.floor(rating) ? 'fill-primary text-primary' : 'text-slate-300'}`} />
          ))}
          <span className="text-[11px] font-bold text-slate-400 ml-1">({reviews} Reviews)</span>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            {originalPrice && <span className="text-slate-400 text-xs line-through">${originalPrice}</span>}
            <span className="text-2xl font-black text-slate-900">${price}</span>
          </div>
          <button className="bg-primary/10 text-primary size-12 rounded-2xl flex items-center justify-center hover:bg-primary hover:text-white transition-all">
            <ShoppingCart className="size-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
