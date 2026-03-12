import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Activity, Globe, Droplets, Zap } from 'lucide-react';

const WaterHome: React.FC<{ onNavigate?: (p: any) => void }> = ({ onNavigate }) => {

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
    <div className="w-full bg-brand-900 text-slate-200">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1550005809-91ad75fb315f?auto=format&fit=crop&w=2850&q=80" 
            alt="Water dynamics" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-900/50 via-brand-900/80 to-brand-900"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
              <span className="text-xs font-mono tracking-widest uppercase text-slate-300">Industrial Scale Purification</span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-sans font-bold text-white leading-tight mb-8 tracking-tighter">
              Purity, Engineered <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">for Scale.</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-slate-400 font-light leading-relaxed mb-12 max-w-2xl mx-auto font-sans">
              The next generation of water purification infrastructure. Zero compromise on molecular quality, infinite scalability for enterprise demands.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => onNavigate?.('process')}
                className="w-full sm:w-auto px-8 py-4 bg-white text-brand-900 rounded-full font-medium hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 group font-sans"
              >
                Explore Technology
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => onNavigate?.('process')}
                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-2 font-sans"
              >
                View Process
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Traction / By the Numbers */}
      <section className="py-24 border-y border-white/5 bg-brand-800/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 text-center"
          >
            {[
              { label: "Gallons Purified", value: "10M+", icon: Droplets },
              { label: "Contaminant Removal", value: "99.99%", icon: ShieldCheck },
              { label: "Enterprise Partners", value: "50+", icon: Globe },
              { label: "Carbon Offset", value: "Zero", icon: Activity },
            ].map((stat, idx) => (
              <motion.div key={idx} variants={fadeUp} className="flex flex-col items-center">
                <stat.icon className="w-6 h-6 text-cyan-500 mb-4 opacity-80" />
                <div className="text-4xl md:text-5xl font-sans font-bold tracking-tight text-white mb-2">{stat.value}</div>
                <div className="text-xs font-mono uppercase tracking-widest text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Proprietary Tech Showcase */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-white mb-6">
                The Orient Advantage
              </motion.h2>
              <motion.p variants={fadeUp} className="text-slate-400 text-lg font-light leading-relaxed mb-12">
                We don't just filter water; we reconstruct it. Our proprietary 7-stage molecular purification system ensures absolute clinical purity while optimizing for high-volume throughput.
              </motion.p>

              <div className="space-y-8">
                {[
                  { title: "Reverse Osmosis V2", desc: "Next-gen membranes operating at 0.0001 microns, rejecting heavy metals and microplastics with 40% higher energy efficiency." },
                  { title: "Quantum Mineralization", desc: "Precision re-introduction of essential electrolytes (Calcium, Magnesium) for optimal pH balance and taste profile." },
                  { title: "AI-Driven Logistics", desc: "Predictive routing and automated inventory management ensuring zero downtime for enterprise clients." }
                ].map((feature, idx) => (
                  <motion.div key={idx} variants={fadeUp} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                        <Zap className="w-4 h-4 text-cyan-500" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-lg mb-2">{feature.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative h-[600px] rounded-2xl overflow-hidden border border-white/10"
            >
              <img 
                src="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1200&q=80" 
                alt="Filtration Technology" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-transparent to-transparent"></div>
              
              {/* Overlay UI Element */}
              <div className="absolute bottom-6 left-6 right-6 bg-brand-900/80 backdrop-blur-md border border-white/10 rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-mono text-slate-300">System Status</span>
                  <span className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    OPTIMAL
                  </span>
                </div>
                <div className="h-1.5 w-full bg-brand-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: "0%" }}
                    whileInView={{ width: "99.9%" }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className="h-full bg-cyan-500"
                  ></motion.div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-slate-500 font-mono">
                  <span>Purity Level</span>
                  <span>99.99%</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enterprise Solutions Teaser */}
      <section className="py-32 bg-brand-800/20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-white mb-6">
              Built for Enterprise
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-400 text-lg font-light leading-relaxed">
              From corporate campuses to industrial facilities, our logistics network is designed to scale with your demands.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              { title: "Automated Fulfillment", desc: "Smart sensors trigger deliveries before you run out.", img: "https://images.unsplash.com/photo-1586528116311-ad8ed7c80a30?auto=format&fit=crop&w=800&q=80" },
              { title: "Custom Bottling", desc: "White-label solutions for premium hospitality brands.", img: "https://images.unsplash.com/photo-1602143407151-01114195bc03?auto=format&fit=crop&w=800&q=80" },
              { title: "Sustainability Tracking", desc: "Real-time ESG reporting for your carbon offset goals.", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80" }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-brand-800/50 hover:bg-brand-800 transition-colors"
              >
                <div className="h-48 overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-medium text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 font-sans">{item.desc}</p>
                  <button 
                    onClick={() => onNavigate?.('logistics')}
                    className="text-cyan-500 text-sm font-medium flex items-center gap-2 group-hover:text-cyan-400 transition-colors font-sans"
                  >
                    Learn more <ArrowRight className="w-4 h-4" />
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

export default WaterHome;
