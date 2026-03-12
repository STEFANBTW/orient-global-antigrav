import React, { useState, useEffect } from "react";
import { 
  Droplets, Truck, ShoppingCart, ShieldCheck, MapPin, 
  Minus, Plus, RefreshCw, PackageSearch, Clock, ArrowRight, 
  CheckCircle2, Beaker, Zap, GlassWater, Factory, 
  ChevronRight, Phone, Mail, Instagram, Twitter, Trash2, Check, User,
  Building2, Home as HomeIcon, CalendarDays, CreditCard
} from "lucide-react";

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

export function MapNode({ top, left, label, main, pulse }: { top: string; left: string; label: string; main?: boolean; pulse?: boolean }) {
  return (
    <div className="absolute group" style={{ top, left, transform: 'translate(-50%, -50%)' }}>
      {pulse && <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-50"></div>}
      <div className={`relative flex items-center justify-center rounded-sm shadow-lg cursor-pointer transition-transform hover:scale-110 ${main ? 'size-4 bg-cyan-400 z-20' : 'size-2.5 bg-blue-500/80 z-10'}`}></div>
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-md text-[9px] font-medium text-white tracking-widest uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">
        {label}
      </div>
    </div>
  );
}

// ============================================================================
// VIEW 1: THE PURITY HUB (LANDING)
// ============================================================================

export function PurityHubView({ navigateTo }: { navigateTo: (v: any) => void }) {
  const products = [
    { name: "Sachet Premium", size: "50cl", pack: "Bag of 20", icon: <PackageSearch size={28} strokeWidth={1.5} /> },
    { name: "Personal Hydration", size: "50cl", pack: "Pack of 12", icon: <GlassWater size={28} strokeWidth={1.5} /> },
    { name: "Active Lifestyle", size: "75cl", pack: "Pack of 12", icon: <GlassWater size={32} strokeWidth={1.5} /> },
    { name: "Family Table", size: "1.5L", pack: "Pack of 6", icon: <GlassWater size={36} strokeWidth={1.5} /> },
    { name: "Dispenser Refill", size: "19L", pack: "Single", icon: <Factory size={40} strokeWidth={1.5} /> },
  ];

  return (
    <div className="fade-in bg-white">
      {/* Refined Hero */}
      <section className="relative w-full h-[85vh] bg-blue-950 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-blue-950">
          <img 
            src="https://images.unsplash.com/photo-1548839140-29a749e1abc4?q=80&w=2000&auto=format&fit=crop" 
            alt="Pure water splashing" 
            className="w-full h-full object-cover opacity-25 mix-blend-luminosity scale-105 transform animate-[slowZoom_20s_ease-in-out_infinite]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-8 max-w-4xl mx-auto -mt-20">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-cyan-500/30 bg-blue-900/40 text-cyan-300 text-[10px] font-medium tracking-[0.2em] uppercase mb-10">
            <Droplets size={12} /> Sourced from Plateau Aquifers
          </div>
          <h1 className="text-4xl md:text-6xl font-medium text-white tracking-tight leading-[1.15] mb-8">
            Pure Hydration, <br className="hidden md:block" />
            <span className="text-cyan-400 font-normal">Nationwide.</span>
          </h1>
          <p className="text-base md:text-lg text-blue-100/70 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Engineered through a 7-step reverse osmosis process. Delivering uncompromising quality to homes, offices, and distributors across Nigeria.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <button onClick={() => navigateTo('d2c')} className="w-full sm:w-auto px-10 py-3.5 bg-white text-blue-900 rounded-lg text-sm font-medium hover:bg-cyan-50 transition-all shadow-sm">
              Order for Home
            </button>
            <button onClick={() => navigateTo('b2b')} className="w-full sm:w-auto px-10 py-3.5 border border-white/20 text-white rounded-lg text-sm font-medium hover:bg-white/5 transition-all">
              Become a Distributor
            </button>
          </div>
        </div>
      </section>

      {/* Floating Product Ribbon */}
      <section className="relative z-20 max-w-[1440px] mx-auto px-8 -mt-24 mb-40">
        <div className="glass-panel bg-blue-950/40 rounded-xl p-4 shadow-2xl overflow-x-auto hide-scrollbar">
          <div className="flex min-w-max">
            {products.map((prod, idx) => (
              <div key={idx} className="flex-1 min-w-[220px] p-8 text-center group cursor-pointer border-r border-white/5 last:border-0 hover:bg-white/5 transition-colors rounded-lg">
                <div className="h-20 flex items-center justify-center text-cyan-200/80 group-hover:text-cyan-400 transition-colors duration-500 mb-6">
                  {prod.icon}
                </div>
                <h3 className="text-white font-medium text-base tracking-wide">{prod.size}</h3>
                <p className="text-cyan-200/60 text-[10px] font-medium uppercase tracking-widest mt-2 mb-1.5">{prod.name}</p>
                <p className="text-white/40 text-[9px] uppercase tracking-wider">{prod.pack}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logistics Map Section */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-[1440px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-cyan-600 font-medium uppercase tracking-[0.2em] text-[10px] mb-6 block">Our Reach</span>
            <h2 className="text-3xl md:text-4xl font-medium text-blue-950 leading-tight mb-8">
              Nationwide Distribution Hubs
            </h2>
            <p className="text-slate-500 text-base mb-10 leading-relaxed font-light max-w-lg">
              With our state-of-the-art bottling facility in Jos, Plateau State, and a dedicated fleet of 500+ logistics vehicles, we guarantee a continuous supply of premium water to every corner of the country.
            </p>
            <ul className="space-y-5 mb-12">
              {['Direct Route Optimization', 'Real-time Fleet Tracking', 'Climate-Controlled Transport'].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-sm font-medium text-slate-700">
                  <div className="size-5 rounded-md bg-cyan-100 flex items-center justify-center text-cyan-600 shrink-0">
                    <CheckCircle2 size={12} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <button onClick={() => navigateTo('b2b')} className="flex items-center gap-2 text-blue-600 text-sm font-medium hover:text-cyan-600 transition-colors">
              Explore Wholesale Logistics <ArrowRight size={16} />
            </button>
          </div>

          <div className="relative aspect-square max-w-lg mx-auto w-full bg-blue-950 rounded-xl overflow-hidden shadow-xl p-8 border border-blue-900">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0,transparent_70%)]"></div>
             <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
             
             <MapNode top="30%" left="50%" label="Jos (HQ)" main pulse />
             <MapNode top="60%" left="30%" label="Lagos Hub" />
             <MapNode top="50%" left="45%" label="Abuja Hub" />
             <MapNode top="20%" left="60%" label="Kano Hub" />
             <MapNode top="70%" left="65%" label="PH Hub" />

             <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
               <path d="M50% 30% L30% 60%" stroke="#22d3ee" strokeWidth="1" strokeDasharray="4 4" className="animate-[dash_30s_linear_infinite]" />
               <path d="M50% 30% L45% 50%" stroke="#22d3ee" strokeWidth="1" strokeDasharray="4 4" className="animate-[dash_30s_linear_infinite]" />
               <path d="M50% 30% L60% 20%" stroke="#22d3ee" strokeWidth="1" strokeDasharray="4 4" className="animate-[dash_30s_linear_infinite]" />
               <path d="M50% 30% L65% 70%" stroke="#22d3ee" strokeWidth="1" strokeDasharray="4 4" className="animate-[dash_30s_linear_infinite]" />
             </svg>
             <style>{`@keyframes dash { to { stroke-dashoffset: -1000; } }`}</style>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================================
// VIEW 2: DIRECT STORE
// ============================================================================

export function DirectStoreView({ addToCart }: { addToCart: () => void }) {
  const [shopContext, setShopContext] = useState("home"); // 'home' or 'corporate'
  const [activeProductId, setActiveProductId] = useState("1.5l");

  useEffect(() => {
    if (shopContext === "corporate") setActiveProductId("19l");
    else setActiveProductId("1.5l");
  }, [shopContext]);

  const waterProducts = [
    { id: "19l", title: "19L Dispenser Refill", desc: "The standard for offices and large households. Requires an empty bottle exchange upon delivery. Fits all standard water coolers.", price: 1200, unit: "Per Refill", image: "https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?q=80&w=1000&auto=format&fit=crop", icon: <Factory size={20} /> },
    { id: "1.5l", title: "1.5L Family Pack", desc: "Pack of 6 large bottles. Ideal for dining tables, family meals, and daily home hydration needs.", price: 1800, unit: "Pack of 6", image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?q=80&w=1000&auto=format&fit=crop", icon: <GlassWater size={20} /> },
    { id: "75cl", title: "75cl Active Pack", desc: "Pack of 12 mid-sized bottles. Perfect for gym bags, active hydration, and sports events.", price: 2500, unit: "Pack of 12", image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?q=80&w=1000&auto=format&fit=crop", icon: <Droplets size={20} /> },
    { id: "50cl", title: "50cl Event Pack", desc: "Pack of 12 small bottles. The classic, easy-to-carry size for personal hydration on the go or corporate events.", price: 1500, unit: "Pack of 12", image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?q=80&w=1000&auto=format&fit=crop", icon: <GlassWater size={18} /> },
  ];

  const activeProduct = waterProducts.find(p => p.id === activeProductId)!;

  return (
    <div className="fade-in bg-slate-50 pb-32">
      <div className="pt-16 pb-8 px-8 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-medium text-blue-950 mb-4 tracking-tight">
          {shopContext === 'home' ? "Keep Your Family Hydrated." : "Fuel Your Team's Productivity."}
        </h1>
        <p className="text-slate-500 font-light text-base md:text-lg mb-10">
          Order premium purified water directly from the source. 
        </p>

        <div className="flex justify-center">
          <div className="bg-slate-200/60 p-1.5 rounded-xl inline-flex relative">
             <button 
                onClick={() => setShopContext('home')} 
                className={`flex items-center gap-2 px-8 py-3 rounded-lg text-sm font-medium z-10 transition-colors ${shopContext === 'home' ? 'text-blue-950 shadow-sm bg-white' : 'text-slate-500 hover:text-slate-700'}`}
             >
                <HomeIcon size={16} /> Home & Personal
             </button>
             <button 
                onClick={() => setShopContext('corporate')} 
                className={`flex items-center gap-2 px-8 py-3 rounded-lg text-sm font-medium z-10 transition-colors ${shopContext === 'corporate' ? 'text-blue-950 shadow-sm bg-white' : 'text-slate-500 hover:text-slate-700'}`}
             >
                <Building2 size={16} /> Corporate & Office
             </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 mb-32">
        <div className="lg:col-span-7 bg-white rounded-2xl p-10 border border-slate-200 shadow-sm flex flex-col h-[600px] relative overflow-hidden group">
          <div className="absolute top-10 left-10 z-20">
             <span className="bg-cyan-50 text-cyan-600 text-[10px] font-medium px-3 py-1.5 rounded-md uppercase tracking-widest border border-cyan-100">
               Direct Store
             </span>
          </div>
          
          <div className="flex-1 w-full h-full flex items-center justify-center relative z-10 mb-8 p-12">
            <img 
               key={activeProduct.id}
               src={activeProduct.image} 
               alt={activeProduct.title} 
               className="w-full h-full object-contain mix-blend-multiply opacity-90 fade-in transition-transform duration-700 group-hover:scale-105" 
            />
          </div>

          <div className="relative z-20 border-t border-slate-100 pt-8 mt-auto flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="max-w-md">
              <h2 className="text-3xl font-medium text-blue-950 mb-2">{activeProduct.title}</h2>
              <p className="text-sm text-slate-500 font-light leading-relaxed">{activeProduct.desc}</p>
            </div>
            <div className="flex flex-col items-end shrink-0">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">{activeProduct.unit}</span>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-medium text-blue-950">₦{activeProduct.price.toLocaleString()}</span>
                <button onClick={addToCart} className="size-12 bg-blue-950 text-white rounded-xl flex items-center justify-center hover:bg-cyan-600 transition-colors shadow-sm">
                  <Plus size={20} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-4 h-[600px] overflow-y-auto hide-scrollbar pr-2">
          {waterProducts.map(p => (
            <div 
              key={p.id}
              onClick={() => setActiveProductId(p.id)} 
              className={`p-6 rounded-xl border cursor-pointer transition-all flex items-center gap-6 ${
                activeProductId === p.id 
                  ? 'border-cyan-400 bg-cyan-50/30 shadow-md' 
                  : 'border-slate-200 bg-white hover:border-cyan-200 hover:bg-slate-50/50'
              }`}
            >
              <div className={`size-16 rounded-lg flex items-center justify-center shrink-0 border ${activeProductId === p.id ? 'bg-white border-cyan-100 text-cyan-600' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                 {p.icon}
              </div>
              <div className="flex-1">
                 <h4 className={`text-base font-medium mb-1 ${activeProductId === p.id ? 'text-blue-950' : 'text-slate-700'}`}>{p.title}</h4>
                 <p className="text-[10px] text-slate-400 uppercase tracking-widest">{p.unit}</p>
              </div>
              <div className={`text-lg font-medium ${activeProductId === p.id ? 'text-cyan-600' : 'text-slate-500'}`}>
                 ₦{p.price.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="max-w-[1200px] mx-auto px-8 mt-10">
        <div className="bg-blue-950 rounded-[2rem] p-10 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-500/10 to-transparent pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 relative z-10 border-b border-blue-900 pb-10">
            <div>
              <div className="flex items-center gap-3 text-cyan-400 mb-4">
                <RefreshCw size={24} />
                <h2 className="text-3xl font-medium text-white tracking-tight">Orient Auto-Fill</h2>
              </div>
              <p className="text-blue-200/70 text-base font-light max-w-lg">
                Set up a recurring delivery schedule. Enjoy a permanent <span className="text-cyan-400 font-medium">10% discount</span>, priority routing, and zero empty-bottle anxiety.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-blue-200/50 uppercase tracking-widest">
              <ShieldCheck size={16} className="text-cyan-400" /> Cancel Anytime
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="size-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold">1</div>
                <h4 className="text-white font-medium">Select Your Mix</h4>
              </div>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-blue-300/50">Primary Item</label>
                  <select className="w-full bg-blue-900/40 border border-blue-800/50 text-white text-sm rounded-lg p-3 outline-none focus:border-cyan-400">
                    <option>4x 19L Dispenser Refills</option>
                    <option>2x 19L Dispenser Refills</option>
                    <option>6x 1.5L Family Packs</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="size-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold">2</div>
                <h4 className="text-white font-medium">Delivery Cadence</h4>
              </div>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 rounded-lg border border-cyan-500 bg-cyan-500/10 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <CalendarDays size={18} className="text-cyan-400" />
                    <span className="text-sm font-medium text-white">Every 2 Weeks</span>
                  </div>
                  <div className="size-4 rounded-full border-2 border-cyan-400 flex items-center justify-center"><div className="size-2 bg-cyan-400 rounded-full"></div></div>
                </label>
              </div>
            </div>

            <div className="bg-cyan-600 rounded-2xl p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="size-6 rounded-full bg-white/20 text-white flex items-center justify-center text-xs font-bold">3</div>
                  <h4 className="text-white font-medium">Activation</h4>
                </div>
                <p className="text-cyan-50 text-sm font-light leading-relaxed mb-4">
                  You are setting up automated delivery.
                </p>
              </div>
              <button className="w-full bg-white text-blue-950 py-3.5 rounded-lg text-sm font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-auto">
                <CreditCard size={16} /> Activate Auto-Fill
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================================
// VIEW 3: B2B & WHOLESALE
// ============================================================================

export function B2BView() {
  const nigerianStates = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
    "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT - Abuja", "Gombe",
    "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos",
    "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto",
    "Taraba", "Yobe", "Zamfara"
  ];

  return (
    <div className="fade-in bg-white pb-32">
      <section className="relative py-32 px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1586528116311-ad8ed7444ce2?q=80&w=2000&auto=format&fit=crop" alt="Warehouse" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-blue-950/95 mix-blend-multiply"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-cyan-400 font-medium uppercase tracking-[0.2em] text-[10px] mb-6 block">Wholesale Distribution</span>
          <h1 className="text-3xl md:text-5xl font-medium text-white mb-8 leading-[1.2]">Partner with Orient. <br/><span className="text-cyan-400">High Margins. Reliable Supply.</span></h1>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-8 -mt-12 relative z-20 mb-24">
        <div className="bg-white rounded-xl shadow-lg shadow-blue-900/5 border border-slate-100 p-10 md:p-16 grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="flex flex-col items-center text-center">
            <div className="size-12 bg-slate-50 text-slate-400 rounded-lg border border-slate-100 flex items-center justify-center mb-6"><Truck size={20} /></div>
            <h3 className="font-medium text-blue-950 text-base mb-3">Fleet of 500+ Trucks</h3>
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20">
         <div>
          <h2 className="text-2xl font-medium text-blue-950 mb-3">Bulk Pricing Tiers</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 mt-8">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="p-5 font-medium text-xs uppercase tracking-wider">Product</th>
                  <th className="p-5 font-medium text-xs uppercase tracking-wider">10-50 Units</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-light">
                <tr>
                  <td className="p-5 font-medium text-blue-900">50cl Carton (12 pcs)</td>
                  <td className="p-5 text-slate-500">₦1,350</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <div className="bg-slate-50 border border-slate-200 p-10 rounded-xl">
            <h3 className="text-xl font-medium text-blue-950 mb-3">Apply for Wholesale</h3>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <input required type="text" className="w-full bg-white border border-slate-200 rounded-md p-3 text-sm" placeholder="Business Name" />
              <button className="w-full bg-blue-950 text-white font-medium py-3.5 rounded-md hover:bg-cyan-600 transition-colors text-sm">
                Request Custom Quote
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// VIEW 4: THE SOURCE & PROCESS
// ============================================================================

export function ProcessView() {
  const steps = [
    { num: "01", title: "Deep Aquifer Extraction", desc: "Sourced from pristine aquifers." },
    { num: "02", title: "Reverse Osmosis (RO)", desc: "Molecular filtration." },
  ];

  return (
    <div className="fade-in bg-slate-50 pb-32">
      <section className="bg-blue-950 py-28 px-8 text-center relative overflow-hidden">
        <h1 className="text-3xl md:text-5xl font-medium text-white mb-6">7 Steps to Absolute Purity.</h1>
      </section>

      <div className="max-w-[1200px] mx-auto px-8 mt-24 grid grid-cols-1 lg:grid-cols-12 gap-20">
        <div className="lg:col-span-7">
          <h2 className="text-2xl font-medium text-blue-950 mb-12">The Purification Journey</h2>
          <div className="relative border-l border-slate-200 ml-4 space-y-14">
            {steps.map((step, i) => (
              <div key={i} className="relative pl-12 group">
                <div className="absolute left-[-17px] top-0 w-8 h-8 bg-slate-50 border border-slate-300 rounded-md flex items-center justify-center">
                  <span className="text-[10px] font-medium text-slate-500">{step.num}</span>
                </div>
                <h3 className="text-base font-medium text-blue-950 mb-3">{step.title}</h3>
                <p className="text-slate-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// VIEW 5: CART
// ============================================================================

export function CartView({ navigateTo }: { navigateTo: (v: any) => void }) {
  const [cartItems, setCartItems] = useState([
    { id: 1, title: "19L Dispenser Refill", price: 1200, qty: 2, image: "https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?q=80&w=800&auto=format&fit=crop" },
  ]);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const total = subtotal + 500;

  return (
    <div className="fade-in bg-slate-50 min-h-[80vh] pb-32">
      <div className="bg-blue-950 py-20 px-8">
         <h1 className="text-2xl md:text-3xl font-medium text-white">Your Cart</h1>
      </div>
      <div className="max-w-[1200px] mx-auto px-8 -mt-10 relative z-20">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 bg-white rounded-xl p-10 shadow-sm border border-slate-200">
             {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-8 py-4 border-b">
                   <img src={item.image} className="w-16 h-16 rounded" />
                   <div className="flex-1">
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-cyan-600">₦{item.price.toLocaleString()}</p>
                   </div>
                   <div className="flex items-center gap-4">
                      <span>{item.qty}</span>
                   </div>
                </div>
             ))}
          </div>
          <div className="w-full lg:w-80 bg-white rounded-xl p-8 shadow-sm border border-slate-200 h-fit">
             <h3 className="text-lg font-medium mb-8">Order Summary</h3>
             <div className="flex justify-between mb-4"><span>Total</span><span className="text-xl font-bold text-cyan-600">₦{total.toLocaleString()}</span></div>
             <button className="w-full bg-blue-950 text-white py-3.5 rounded-lg text-sm font-medium hover:bg-cyan-600 transition-colors">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// VIEW 6: TRACK DELIVERY
// ============================================================================

export function TrackDeliveryView({ navigateTo }: { navigateTo: (v: any) => void }) {
  const [trackingId, setTrackingId] = useState("");
  const [isTracking, setIsTracking] = useState(false);

  return (
    <div className="fade-in bg-slate-50 min-h-[80vh] pb-32">
      <div className="bg-blue-950 py-24 px-8 text-center">
         <h1 className="text-2xl md:text-4xl font-medium text-white mb-6">Track Your Delivery</h1>
         <div className="flex max-w-md mx-auto gap-4 mt-8">
            <input 
               type="text" 
               value={trackingId}
               onChange={(e) => setTrackingId(e.target.value)}
               placeholder="Order ID" 
               className="flex-1 bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-white"
            />
            <button onClick={() => setIsTracking(true)} className="bg-cyan-600 text-white px-8 py-3 rounded-lg">Track</button>
         </div>
      </div>

      {isTracking && (
        <div className="max-w-[800px] mx-auto px-8 -mt-10 relative z-20">
          <div className="bg-white rounded-xl p-10 shadow-sm border border-slate-200">
             <h3 className="text-lg font-medium mb-8">Status: Out for Delivery</h3>
             <div className="space-y-8">
                <div className="flex gap-4">
                   <div className="size-8 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center"><Check size={16}/></div>
                   <p className="text-slate-700">Order Confirmed</p>
                </div>
                <div className="flex gap-4">
                   <div className="size-8 bg-cyan-600 text-white rounded-full flex items-center justify-center animate-pulse"><Truck size={16}/></div>
                   <p className="font-medium text-blue-950">In Transit</p>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
