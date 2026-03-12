import React from 'react';
import { Wind, Search, ShoppingCart, Heart, ChevronRight, Star, Thermometer, Zap, Info } from 'lucide-react';

export default function ClimateControl({ navigateTo }: { navigateTo: (view: string) => void }) {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 text-primary cursor-pointer" onClick={() => navigateTo('home')}>
                <Wind className="size-8 font-bold" />
                <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 uppercase">Orient</h1>
              </div>
              <nav className="hidden md:flex space-x-8">
                <a className="text-sm font-semibold hover:text-primary transition-colors cursor-pointer" onClick={() => navigateTo('home')}>Home</a>
                <a className="text-sm font-semibold text-primary cursor-pointer" onClick={() => navigateTo('appliances')}>Appliances</a>
                <a className="text-sm font-semibold hover:text-primary transition-colors cursor-pointer" onClick={() => navigateTo('hub')}>Electronics</a>
                <a className="text-sm font-semibold hover:text-primary transition-colors cursor-pointer">Offers</a>
              </nav>
            </div>
            <div className="flex items-center gap-4 flex-1 justify-end max-w-md">
              <div className="relative w-full hidden sm:block">
                <Search className="absolute inset-y-0 left-0 pl-3 flex items-center text-primary/60 size-5" />
                <input className="block w-full pl-10 pr-3 py-2 border-none bg-primary/5 rounded-lg text-sm focus:ring-2 focus:ring-primary/20" placeholder="Search appliances..." type="text" />
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                  <Heart className="size-5" />
                </button>
                <button className="p-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors relative">
                  <ShoppingCart className="size-5" />
                  <span className="absolute -top-1 -right-1 bg-background-dark text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-background-light">3</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex py-4 text-slate-500 text-sm">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center"><a className="hover:text-primary cursor-pointer" onClick={() => navigateTo('home')}>Home</a></li>
            <li><div className="flex items-center"><ChevronRight className="size-4 mx-1" /><a className="hover:text-primary cursor-pointer" onClick={() => navigateTo('appliances')}>Home Appliances</a></div></li>
            <li><div className="flex items-center"><ChevronRight className="size-4 mx-1" /><span className="text-primary font-semibold">Climate Control</span></div></li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-2xl mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent z-10"></div>
          <img alt="Climate Control Hero" className="w-full h-[400px] object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD88SItHfJlVHaF6FxrRUK-eebat7znjZ8faUdEkwcxnk9I7cDb6DarTtAxu4Z9hc3G1owW6-3WFKueHWctnJrERtifLXIObtcBthxNHSUbRahdDrTA2tFCPLJIwRG7IIbAEKU0FqNiQzyJTh6U2_3I-ehkI83IzqdAwwX4BfTTZvk5ONjuHoruXbAM14VjgdixJl3q9aFNZYldA1mZyF99UOI_A2-FDRp_-2NYCd303mmTESZ4l0X7biWOlOWTb7GYbWUk1bFa-yk5" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 z-20 flex flex-col justify-center px-12 max-w-2xl text-white">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-bold uppercase tracking-widest mb-4">Summer Collection 2024</span>
            <h2 className="text-5xl font-black leading-tight mb-6">Pure Air,<br />Perfect Temperature</h2>
            <p className="text-lg text-white/90 mb-8 font-medium">Experience the fusion of advanced filtration and intelligent cooling. Breathe cleaner, live cooler.</p>
            <div className="flex gap-4">
              <button className="px-8 py-3 bg-white text-primary font-bold rounded-lg hover:shadow-xl transition-all">Explore Range</button>
              <button className="px-8 py-3 bg-transparent border-2 border-white/40 text-white font-bold rounded-lg hover:bg-white/10 transition-all">Watch Technology</button>
            </div>
          </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">Filters</h3>
                <div className="mb-6">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Product Type</h4>
                  <div className="space-y-2">
                    {['Air Conditioners', 'Air Purifiers', 'Smart Fans', 'Dehumidifiers'].map(type => (
                      <label key={type} className="flex items-center gap-3 group cursor-pointer">
                        <input className="w-4 h-4 border-primary/20 text-primary focus:ring-primary rounded" type="checkbox" />
                        <span className="text-sm font-medium group-hover:text-primary transition-colors">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <ProductCard 
                name="Arctic Breeze Pro Inverter AC"
                specs="18,000 BTU • A+++ Rating • Wi-Fi"
                price={899}
                originalPrice={1199}
                rating={4.5}
                reviews={128}
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuBHzMH73k2Ocvk1tPM_dL3qsh2PHODnHObRWibNsWXQkyGN8Ib9xjdii--BmjreNviHwNF4ev4BVs0LGFLKD9Dz11j7iuuS49iIX4gI1_h_e_26yCaIpu9GUrUEdU8VsQAsO0jIOpjExDaKNnESs02WuuvI7tn0_8zovp9MYmdpXO2REpPfbQUT9oh0YwZGqIS5t17Kt4sgnw4zjH4GaDKlMFwOjRITl9tU7Oq1eE1tUtqMYv8BLDOnxbuMrPZLD-nGeC8Yn5xxMsa7"
                badge="Best Seller"
              />
              <ProductCard 
                name="PureFlow 360 Air Purifier"
                specs="H13 HEPA • 450 m³/h CADR • Silent Mode"
                price={349}
                rating={5.0}
                reviews={42}
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuASIqGu_dK43u6X6PcxcgBCTaRTAEbX7IT7Q5uUnQRVQ4QTMisP6CCQis_A60xZsfcUqqsmKbAgSpuMsqnb7g_ikip34lYI9iuJMGELjU5USEXSQLiHnHSEU1hge3ZVpjpjIAGnhGmK6JyWXr_8E8isp9IZXjx9ORZ17CcJaSfH5m5-UVnMOf_oE6K0JudsSnziMYneRBLQH6fOrFUgJkyhwv9f3f7qvvM-_ZQtx13AZG-hx345nxbY-wQ2MQt-uHbTL6-d-z4ruOIO"
                badge="Eco Choice"
              />
              <ProductCard 
                name="Mist-Cool Oscillating Tower"
                specs="8 Speeds • 12h Timer • Remote Control"
                price={129}
                rating={4.0}
                reviews={89}
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuCFEbGB4SleyxPlphNBskTMq2C7iZEA7L4f46vK3eAq1h2QozLm82Ik3toXPxz8dFFmqTsS40JDo5a_g47Zg3zwLB7JYjJUuTgUeZKRsjDZ1e3cHlbmjghxN-QkSxQdyHyUbGWFa4VAk9iRidlSMxerrBqHqbgw-fqOBxFRiG10a3eOAT6ddonKhkqObQXgCamyy58LCZ1tijfHHUp3dZZOLHEJRcJOGvmeTguPRyW39kPZ4A9PzHtPYeZccqYkLEqXh1aUIi53G7Dz"
              />
            </div>
          </div>
        </div>

        {/* Technical Benchmarks */}
        <section className="mt-24 py-16 border-t border-primary/10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-black mb-4">Technical Benchmarks</h2>
            <p className="text-slate-500 font-medium">We test our products beyond industry standards to ensure maximum safety, efficiency, and longevity.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <BenchmarkCard icon={<Thermometer className="size-8" />} title="Thermal Stability" desc="±0.2°C variance maintained even in extreme ambient temperatures of up to 55°C." value="99.8%" />
            <BenchmarkCard icon={<Wind className="size-8" />} title="Filtration Grade" desc="Dual HEPA H13 layers capturing 99.97% of particles down to 0.3 microns." value="Grade A+" />
            <BenchmarkCard icon={<Info className="size-8" />} title="Acoustic Engineering" desc="Ultra-quiet brushless motors delivering high performance at library-level decibels." value="19dB" />
            <BenchmarkCard icon={<Zap className="size-8" />} title="Energy Index" desc="Innovative AI algorithms that optimize power consumption based on room occupancy." value="-40%" />
          </div>
        </section>
      </main>
    </div>
  );
}

interface ProductCardProps {
  name: string;
  specs: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
}

function ProductCard({ name, specs, price, originalPrice, rating, reviews, image, badge }: ProductCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800/40 rounded-xl overflow-hidden group border border-primary/5 hover:border-primary/20 transition-all hover:shadow-2xl">
      <div className="relative h-64 bg-slate-100 dark:bg-slate-700 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
        {badge && <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-black uppercase px-2 py-1 rounded">{badge}</span>}
        <button className="absolute top-4 right-4 bg-white/80 backdrop-blur p-2 rounded-full text-slate-400 hover:text-red-500 transition-colors">
          <Heart className="size-5" />
        </button>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`size-3.5 ${i < Math.floor(rating) ? 'fill-primary text-primary' : 'text-slate-300'}`} />
          ))}
          <span className="text-xs text-slate-400 font-bold ml-1">({reviews})</span>
        </div>
        <h4 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{name}</h4>
        <p className="text-xs text-slate-500 font-medium mb-4 uppercase tracking-tighter">{specs}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-black">${price}.00</span>
            {originalPrice && <span className="text-sm text-slate-400 line-through ml-2">${originalPrice}</span>}
          </div>
          <button className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
            <ShoppingCart className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

interface BenchmarkCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  value: string;
}

function BenchmarkCard({ icon, title, desc, value }: BenchmarkCardProps) {
  return (
    <div className="p-6 bg-white dark:bg-slate-800/20 rounded-xl border border-primary/5 text-center">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
        {icon}
      </div>
      <h5 className="text-xl font-bold mb-2">{title}</h5>
      <p className="text-sm text-slate-500">{desc}</p>
      <div className="mt-4 text-primary font-black text-2xl tracking-tighter">{value}</div>
    </div>
  );
}
