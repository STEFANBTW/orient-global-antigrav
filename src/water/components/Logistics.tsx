import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Package, Activity, Shield, MapPin, BarChart3, Zap, Globe } from 'lucide-react';

const Logistics: React.FC = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="bg-brand-900 text-slate-200 min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 text-blue-500">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=80" 
            alt="Global Logistics" 
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-900 via-transparent to-brand-900"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
              <span className="text-xs font-mono tracking-widest uppercase text-cyan-400">Precision in Motion</span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-sans font-bold text-white leading-tight mb-8 tracking-tighter">
              The Heartbeat of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Supply Chain.</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-slate-400 font-light leading-relaxed max-w-2xl">
              Monitoring millions of liters in real-time. Our logistics network is engineered for absolute reliability and enterprise-grade scale.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
          >
            {[
              { label: "Active Fleet", value: "047/050", icon: Truck, color: "text-cyan-500" },
              { label: "On-Time Rate", value: "99.8%", icon: Activity, color: "text-emerald-500" },
              { label: "Liters in Transit", value: "12,500L", icon: Package, color: "text-blue-500" },
            ].map((stat, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeUp}
                className="bg-brand-800/50 border border-white/5 p-8 rounded-2xl backdrop-blur-sm"
              >
                <stat.icon className={`w-6 h-6 ${stat.color} mb-4`} />
                <div className="text-4xl font-sans font-bold text-white mb-2">{stat.value}</div>
                <div className="text-xs font-mono uppercase tracking-widest text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-brand-800/20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-white mb-8">
                The Heavy Lift.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-slate-400 text-lg font-light leading-relaxed mb-12">
                We don't just move water; we move volume. Specialized transport solutions for wholesale, corporate, and large-scale events.
              </motion.p>
              
              <div className="space-y-8">
                {[
                  { title: "Wholesale Pallets", desc: "Standardized ISO pallets. 75cl/50cl cases shrink-wrapped for stability. Forklift ready." },
                  { title: "Corporate Refill Racks", desc: "Custom modular racking for 19L dispensers. Prevents bottle abrasion. Efficient vertical stacking." },
                  { title: "Event Tankers", desc: "Mobile hydration stations for festivals and conferences. 1000L+ capacity units." }
                ].map((service, idx) => (
                  <motion.div key={idx} variants={fadeUp} className="group border-l-2 border-white/5 pl-6 hover:border-cyan-500 transition-colors">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-500 transition-colors mb-2">{service.title}</h3>
                    <p className="text-slate-500 text-sm">{service.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="bg-brand-800 rounded-2xl p-8 border border-white/5 hover:border-cyan-500/30 transition-colors">
                <BarChart3 className="w-10 h-10 text-slate-500 mb-6" />
                <div className="text-3xl font-bold text-white mb-1">48 Cases</div>
                <div className="text-sm text-slate-500 font-mono">Per Euro Pallet</div>
              </div>
              <div className="bg-brand-800 rounded-2xl p-8 border border-white/5 hover:border-cyan-500/30 transition-colors mt-8">
                <Package className="w-10 h-10 text-slate-500 mb-6" />
                <div className="text-3xl font-bold text-white mb-1">32 Units</div>
                <div className="text-sm text-slate-500 font-mono">Per Modular Rack</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-white mb-6"
            >
              Purpose-Built Fleet.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-slate-400 text-lg font-light max-w-2xl mx-auto"
            >
              Our vehicles are custom-engineered for water transport, featuring temperature control and real-time telemetry.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                name: "The Heavy Hauler", 
                tag: "LONG HAUL", 
                desc: "6-Ton capacity rigid trucks tailored for depot-to-depot transfers.",
                img: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?q=80&w=2070&auto=format&fit=crop",
                stats: [["Payload", "5,400 KG"], ["Range", "800 KM"]]
              },
              { 
                name: "Urban Sprint Van", 
                tag: "EXPRESS", 
                desc: "Agile units designed for tight residential streets and rapid fulfillment.",
                img: "https://images.unsplash.com/photo-1616432043562-3671ea2e5242?q=80&w=1888&auto=format&fit=crop",
                stats: [["Payload", "1,200 KG"], ["Turn Radius", "4.2 M"]]
              }
            ].map((vehicle, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-brand-800/50 border border-white/5 rounded-2xl overflow-hidden group"
              >
                <div className="h-64 overflow-hidden relative">
                  <img src={vehicle.img} alt={vehicle.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute top-4 right-4 bg-cyan-500 text-brand-900 text-[10px] font-bold px-2 py-1 rounded">
                    {vehicle.tag}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">{vehicle.name}</h3>
                  <p className="text-slate-400 text-sm mb-8">{vehicle.desc}</p>
                  <div className="grid grid-cols-2 gap-8 border-t border-white/5 pt-8">
                    {vehicle.stats.map(([label, val], sIdx) => (
                      <div key={sIdx}>
                        <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1">{label}</div>
                        <div className="text-lg font-bold text-white">{val}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-32 bg-brand-800/20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="order-2 lg:order-1"
            >
              <div className="relative aspect-square bg-brand-900 border border-white/5 rounded-3xl overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <div className="w-64 h-64 border border-cyan-500 rounded-full animate-ping" style={{animationDuration: '3s'}}></div>
                  <div className="w-48 h-48 border border-cyan-500 rounded-full animate-ping" style={{animationDuration: '3s', animationDelay: '0.5s'}}></div>
                </div>
                <div className="z-10 text-center">
                  <div className="text-6xl font-mono font-bold text-white mb-2">LIVE</div>
                  <div className="text-cyan-500 tracking-widest animate-pulse font-mono text-sm">SYSTEM OPTIMIZED</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="order-1 lg:order-2"
            >
              <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-white mb-8">
                Data-Driven Purity.
              </motion.h2>
              
              <div className="space-y-10">
                {[
                  { title: "GPS Telemetry", desc: "Real-time tracking of every liter. Route optimization algorithms reduce fuel consumption by 18%.", icon: Globe },
                  { title: "Digital Manifests", desc: "End-to-end chain of custody. Scan-to-verify ensures the bottle you receive is the bottle we filled.", icon: Shield },
                  { title: "Predictive Refills", desc: "Our systems analyze your consumption patterns to suggest refill dates before you run dry.", icon: Zap }
                ].map((item, idx) => (
                  <motion.div key={idx} variants={fadeUp} className="flex gap-6">
                    <div className="w-12 h-12 rounded-xl bg-brand-800 border border-white/5 flex items-center justify-center flex-shrink-0 text-cyan-500">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Coverage Zones */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-white mb-6"
            >
              Operational Zones.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-slate-400 text-lg font-light"
            >
              Current network status in Jos Metropolis.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Zone A", status: "ACTIVE", areas: "Rayfield, GRA, Liberty Dam, Lamingo", load: "Light", color: "emerald" },
              { name: "Zone B", status: "ACTIVE", areas: "Tudun Wada, Hwolshe, Secretariat", load: "High", color: "amber" },
              { name: "Zone C", status: "CONGESTED", areas: "Bukuru, Zawan, Trade Centre", load: "Critical", color: "red" }
            ].map((zone, idx) => (
              <div 
                key={idx}
                className="bg-brand-800/50 border border-white/5 p-8 rounded-2xl relative overflow-hidden group"
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold text-white">{zone.name}</h3>
                  <div className={`flex items-center gap-2 px-2 py-1 rounded bg-${zone.color}-500/10 border border-${zone.color}-500/20`}>
                    <span className={`w-1.5 h-1.5 rounded-full bg-${zone.color}-500 ${zone.status === 'ACTIVE' ? 'animate-pulse' : ''}`}></span>
                    <span className={`text-[10px] font-mono font-bold text-${zone.color}-500`}>{zone.status}</span>
                  </div>
                </div>
                <p className="text-slate-400 text-sm mb-8">{zone.areas}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-mono text-slate-500 uppercase">
                    <span>Network Load</span>
                    <span>{zone.load}</span>
                  </div>
                  <div className="h-1 w-full bg-brand-900 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-${zone.color}-500`} 
                      style={{ width: zone.load === 'Light' ? '25%' : zone.load === 'High' ? '75%' : '100%' }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bulk Catalog */}
      <section className="py-32 bg-brand-800/20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-sm font-mono text-cyan-500 uppercase tracking-widest mb-4">Wholesale Direct</h2>
              <h3 className="text-3xl md:text-5xl font-sans font-bold text-white tracking-tight mb-6">Bulk Logistics Catalog</h3>
              <p className="text-slate-400 text-lg font-light max-w-2xl mx-auto">
                Leverage our fleet for volume pricing. Optimized for pallets, racks, and industrial fulfillment.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: 'Corporate Refill Rack', 
                desc: '19L Dispensers (Pack of 20)', 
                price: 24000, 
                bulkPrice: 20000,
                unit: 'per rack',
                savings: '16%',
                image: 'https://images.unsplash.com/photo-1595246140625-573b715d1128?auto=format&fit=crop&w=400&q=80'
              },
              { 
                name: 'Euro Pallet: 75cl', 
                desc: 'Premium Water (50 Cases)', 
                price: 90000, 
                bulkPrice: 81000,
                unit: 'per pallet',
                savings: '10%',
                image: 'https://images.unsplash.com/photo-1627483262268-9c96d8a318b8?auto=format&fit=crop&w=400&q=80'
              },
              { 
                name: 'Euro Pallet: 50cl', 
                desc: 'On-the-Go (60 Cases)', 
                price: 144000, 
                bulkPrice: 122400,
                unit: 'per pallet',
                savings: '15%',
                image: 'https://images.unsplash.com/photo-1580913428706-c311ab527ebc?auto=format&fit=crop&w=400&q=80'
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-brand-800/50 border border-white/5 rounded-2xl overflow-hidden group hover:border-cyan-500/30 transition-all font-sans"
              >
                <div className="h-64 overflow-hidden relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute top-4 right-4 bg-emerald-500 text-brand-900 font-bold px-3 py-1 rounded-full text-[10px] shadow-lg">
                    SAVE {item.savings}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>
                  <p className="text-slate-400 text-sm mb-8">{item.desc}</p>
                  
                  <div className="flex items-end gap-4 mb-8">
                    <div>
                      <span className="block text-[10px] text-slate-500 line-through font-mono">Standard: ₦{item.price.toLocaleString()}</span>
                      <span className="block text-3xl font-bold text-cyan-500">₦{item.bulkPrice.toLocaleString()}</span>
                    </div>
                    <span className="text-xs text-slate-500 mb-2 font-mono">{item.unit}</span>
                  </div>

                  <button className="w-full py-4 bg-white text-brand-900 rounded-xl font-bold hover:bg-cyan-500 transition-colors flex items-center justify-center gap-2 uppercase tracking-widest text-xs">
                    Add to Manifest
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Logistics;