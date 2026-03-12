import React from "react";
import { ChevronRight, Grid } from "lucide-react";

export default function KidsWear({ navigateTo, onProductClick }: { navigateTo: (view: string) => void, onProductClick?: (product: any) => void }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="sticky top-0 z-50 w-full border-b border-orange-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 md:px-10">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigateTo("home")}>
              <div className="bg-[var(--color-accent-light)] p-1.5 rounded-lg text-white">
                <Grid size={24} />
              </div>
              <h2 className="text-xl font-extrabold tracking-tight text-slate-900 uppercase">Orient Orange</h2>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-8">
        <button onClick={() => navigateTo("fashion")} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[var(--color-accent-light)] mb-6">
          <ChevronRight className="rotate-180" size={16} /> Back to Fashion
        </button>
        <h1 className="text-5xl font-black mb-4 tracking-tighter">Kids' Wear</h1>
        <p className="text-slate-500 text-lg max-w-2xl mb-12">Crafted for movement, designed for comfort. Our new season brings organic textiles and vibrant hues together for every milestone in their early journey.</p>
        {/* Add product grid here */}
      </main>
    </div>
  );
}

