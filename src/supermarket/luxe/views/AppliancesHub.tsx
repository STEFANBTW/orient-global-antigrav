import React from 'react';
import { ShoppingBasket, Search, ShoppingCart, User, ChevronRight, ArrowRight, Star, Heart } from 'lucide-react';

export default function AppliancesHub({ navigateTo, onProductClick }: { navigateTo: (view: string) => void, onProductClick?: (product: any) => void }) {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-3 flex items-center justify-between gap-4 md:gap-8">
          <div className="flex items-center gap-4 shrink-0 cursor-pointer" onClick={() => navigateTo('home')}>
            <div className="text-primary">
              <ShoppingBasket className="size-9" />
            </div>
            <h1 className="text-xl font-bold leading-tight tracking-tight hidden sm:block">Orient Hypermarket</h1>
          </div>
          
          <div className="flex-1 max-w-xl">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-primary/60 group-focus-within:text-primary">
                <Search className="size-5" />
              </div>
              <input 
                className="block w-full pl-10 pr-3 py-2 border-none bg-primary/5 rounded-lg focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-slate-800 transition-all text-sm" 
                placeholder="Search premium appliances..." 
                type="text"
              />
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6">
            <a className="text-sm font-semibold hover:text-primary transition-colors cursor-pointer" onClick={() => navigateTo('home')}>Home</a>
            <a className="text-sm font-semibold text-primary cursor-pointer">Appliances</a>
            <a className="text-sm font-semibold hover:text-primary transition-colors cursor-pointer">Deals</a>
            <a className="text-sm font-semibold hover:text-primary transition-colors cursor-pointer">Brands</a>
          </nav>

          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <button className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all">
              <ShoppingCart className="size-5" />
            </button>
            <button className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all">
              <User className="size-5" />
            </button>
            <div 
              className="h-10 w-10 rounded-full border-2 border-primary/20 bg-cover bg-center" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDEyxE0G_IHdr7Xsyz3-PFIJYW4sWJ4Nl05RggxkYVC-gWpbbstH2Fme1H8z1aNT4MA4lCpTrBN8fcpPYoJvFcBCmK2o-2iaZ4JfRiFcLA5fSrGXcFfGZzLSlXbh8vEz-b83nefWWNy6KcvstWkYmcsHwp4GJDmLjJ374QNZhe4gcUcBu3vCS_x6xA7NIgLdfYsJ6cKbaWw_KtiH_aJ7ZS7Srexgq9stAcMeRmYoAxB358SIgTJxWV9l-G8kzzlOU0TXBlAZZebk3qN')" }}
            ></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-10 pb-20">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 py-6 text-sm text-slate-500">
          <a className="hover:text-primary cursor-pointer" onClick={() => navigateTo('home')}>Home</a>
          <ChevronRight className="size-4" />
          <span className="text-primary font-medium">Home Appliances</span>
        </nav>

        {/* Hero Banner */}
        <section className="relative rounded-2xl overflow-hidden min-h-[400px] flex items-center mb-12 group">
          <div 
            className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105 bg-cover bg-center" 
            style={{ 
              backgroundImage: "linear-gradient(90deg, rgba(35,23,15,0.9) 0%, rgba(35,23,15,0.4) 50%, rgba(0,0,0,0) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuChhxF6dj_gtcL1vRcJXm3vf_q0649LsyBVF0VGdlvDytt5I23efh5owMpO8MiqPEAC78wrXBBjaXynTDNy7W4Vh_co22xoQtrFoPLEuaeHEZylvWakRFt-qfxf5D25AelKnPR1DX-4lHhGKV0jrQq4NTnr0Hp9_00r2fUzbRM5zAU4wxt6BHyLfRhrWsfVqZwCwm57owik3pRRiFLRH0EexE1lAn9Z_NCQLalebb0viIGyPAWisnPWluovWy9PKZp88-0S2viNjiCw')" 
            }}
          ></div>
          <div className="relative z-10 p-8 md:p-16 max-w-2xl text-white">
            <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full mb-4 uppercase tracking-widest">New Collection 2024</span>
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">Upgrade Your Home Performance</h2>
            <p className="text-lg text-slate-200 mb-8 max-w-md">Experience next-generation efficiency with our curated selection of smart home essentials.</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-all flex items-center gap-2">
                Shop Collection <ArrowRight className="size-5" />
              </button>
              <button className="px-8 py-3 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-lg font-bold hover:bg-white/20 transition-all">
                View Deals
              </button>
            </div>
          </div>
        </section>

        {/* Category Grid */}
        <section className="mb-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold">Shop by Category</h3>
              <p className="text-slate-500">Find exactly what your home needs</p>
            </div>
            <a className="text-primary font-bold flex items-center gap-1 hover:underline cursor-pointer">
              View All <ChevronRight className="size-5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Category Card 1 */}
            <div 
              className="relative h-80 rounded-xl overflow-hidden group cursor-pointer"
              onClick={() => navigateTo('large-appliances')}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
                style={{ backgroundImage: "linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 60%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCxFbByHzJ0BjuWhkPI72neCVjOF_lhT9ExqMQywLHk3Lph-Qu2dw-4fHa6LXPQXeFXJ6Ayzy3cCq4_6BypFWXWNYFpTgMIHujFN2kxuY6SaLSx-LUN77UqhITtPDfhj6dp6-zP5JXgHM_xG2YG2_4IiKJrdoGFDHs4Hl3fDOaKhEor07n5I8pk_I3GgwHMSjc9saNwutQTZ0eMoNsvnBDs_5QRmOcSuhRrzVkZgQW__-THIXzQKB3zS0lvcbe8lnbYoiSe5wCXMoCd')" }}
              ></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h4 className="text-xl font-bold text-white mb-2">Large Appliances</h4>
                <div className="h-1 w-0 bg-primary group-hover:w-full transition-all duration-300"></div>
              </div>
            </div>

            {/* Category Card 2 */}
            <div 
              className="relative h-80 rounded-xl overflow-hidden group cursor-pointer"
              onClick={() => navigateTo('kitchen-appliances')}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
                style={{ backgroundImage: "linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 60%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuARdE0gMDZ9l0ipI_Iux2U5stEIi9lsEjUCY-MjmR0Xu4DtpUMUavpPXZ8tc78t1KrPT6YHXZaUUz2tj_51dFjzr--brawBvWWPG1n5SDFf5oGSL1OLsgTjRX-F6pCD-OpnCc3wWvB_sO8COCIdLalcKRpmHyk7elpmNLqlS8xDxo0ed0U0O1U3Edo9XGzrBZAOA_Hat8fwQAHHKSOrimyuM3imX5Msi5RInvhV-F6hxjo2h5gy49z8XKyXePlDHzWAU5F8pM5QT6zV')" }}
              ></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h4 className="text-xl font-bold text-white mb-2">Kitchen Appliances</h4>
                <div className="h-1 w-0 bg-primary group-hover:w-full transition-all duration-300"></div>
              </div>
            </div>

            {/* Category Card 3 */}
            <div 
              className="relative h-80 rounded-xl overflow-hidden group cursor-pointer"
              onClick={() => navigateTo('climate-control')}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
                style={{ backgroundImage: "linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 60%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDJDetHnv_-hMV8VgDcRDMeozqz3fp3G-raxIVRU0Fjp4-UHYt6pnPlGiV7Mjm_fFS5priZK8w8KdrIuxOfGxKVXhv8ts4kXkO-WPVE7QVq7_vLIMbvGPsP2BtJ4VbIzhEp8mLZgcBIOelQ2CNPMo8cp8_pBCUl8gRCOonPLA3M5OZ2gYq6QomasZeO5Pol02d-dsQ4a9pxlLPQz67bO6lqSu3VSgbKpp4qsj7yHvsDNegDpZNcpSWlih9404mBCReW4K6mRd9wnTSy')" }}
              ></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h4 className="text-xl font-bold text-white mb-2">Climate Control</h4>
                <div className="h-1 w-0 bg-primary group-hover:w-full transition-all duration-300"></div>
              </div>
            </div>

            {/* Category Card 4 */}
            <div 
              className="relative h-80 rounded-xl overflow-hidden group cursor-pointer"
              onClick={() => navigateTo('floor-care')}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
                style={{ backgroundImage: "linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 60%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuAboADgvUHp7Bya_OsJJTlULT7NPj64oIcZLOnerKpjozUFewMKMzAZQHJ6Ynx1xXkJIW2IZsGqUQaMDzMXlrLcIL8QbTgKgxwoihomtoOqHupV1936R5JcuumOJKfX71zGxsGzw0SANhmQ6TeQ1DrYar8wb-V3JW8tjxxxY9n0kFM-holKY8q0ERhQl9c6PtoabJMdh4ODGNmQyr-M-4w_kmOfsY9HB1U07wWl4P_K_TigrImJSwNBfORkyzoMmlvkLYC1F-KGZLfJ')" }}
              ></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h4 className="text-xl font-bold text-white mb-2">Vacuums & Floor Care</h4>
                <div className="h-1 w-0 bg-primary group-hover:w-full transition-all duration-300"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Deals */}
        <section className="mb-20 bg-primary/5 rounded-3xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <h3 className="text-3xl font-extrabold mb-2">Featured Deals</h3>
              <p className="text-slate-600">Premium quality at unbeatable prices</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="px-6 py-2 bg-primary text-white rounded-full text-sm font-bold">All Deals</button>
              <button className="px-6 py-2 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-sm font-bold border border-primary/10 hover:border-primary transition-colors">Refrigerators</button>
              <button className="px-6 py-2 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-sm font-bold border border-primary/10 hover:border-primary transition-colors">Washing Machines</button>
              <button className="px-6 py-2 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-sm font-bold border border-primary/10 hover:border-primary transition-colors">Ovens</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <DealCard 
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuAWcWrTX3853Jf79haUHwaSvFiCHfP2Jsc2v0EHAAKaPq4nYS7k1O9j_BNghXDrYo8QFL9U2FtNtSQPs3Tt04GRZ0zvuJ05LgKiHKELcUkJys-NcLJ00bg2r6rQtUCbNIHQaApepiIWcPiOQM7Wr1jf5D88k2aervi9IhytfxyWwflVR8Y5Iwy8gHVdqFmi3jVzLrAbNw3TsBDdcT1UsHznXaW49BStliQpwoMxUihwdVDIeT5B65NwZixuHSihYwZ0SJ0ljIJ4V3NC"
              title="Samsung Smart Bespoke 4-Door Flex"
              price={2199}
              originalPrice={2599}
              save={400}
            />
            <DealCard 
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuCUO8iahNOGfewl8gD8GVCWoKCfddXgl9QoQoyHkvhD-HJWonT0vLvsR_Q4-kqe-j8Zh9jyWro9Pwy5oErrsRGJOQtFM0yMHv21uo0TwruKyof9j7UTXV35VUsI7wkroML24uvH-0JUy4i2yhepYGd1YkBlXYvBaaRrmiwAf04RzE4LMXmAQczmmoV3Y036jtunB0xU_VyHy8xmgGtvgY-MLTF1oMCCkH6MeriWl1lfvO18MiU04YhykzsfsmKk4rRe840yTIGbDm_U"
              title="LG V-Series Washer with AI DD™"
              price={849}
              originalPrice={1099}
              save={250}
            />
            <DealCard 
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuDd-CDfqYBn1Z8cwIyJzpoyjaaDuEN0TyvNt9BSfyrAlW_zE0tsb9DYb2Gvuo6OLa36XFqvPR6sLp9R4oqDLHh8d45fBzKsMHwbYod_zr_ydXUyniVmUHgiwv6qZN7eTtRz47JFL6pLQVV8ApMznoLavcRAb2X6yaBot2KshR7Q_FQZhBrPqPbWVaHMUnuVWD67StxsJMwP9ReOYMz0aLxDL866hpBtjU9qr9yAGrkrmyCW4O_zIOpMgK-Zlpk-5ZsWZmt8mcpelXLw"
              title="Dyson V15 Detect™ Absolute"
              price={649}
              originalPrice={749}
              save={100}
            />
          </div>
        </section>

        {/* Best in Class Carousel */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-extrabold">Best in Class</h3>
            <div className="flex gap-2">
              <button className="h-10 w-10 flex items-center justify-center rounded-full border border-primary/20 text-primary hover:bg-primary hover:text-white transition-all">
                <ChevronRight className="size-5 rotate-180" />
              </button>
              <button className="h-10 w-10 flex items-center justify-center rounded-full border border-primary/20 text-primary hover:bg-primary hover:text-white transition-all">
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto no-scrollbar pb-8 flex gap-8 snap-x snap-mandatory">
            <ProductCard 
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuBq9lPyddZSEm2kZKSxCxI6SmmenWBM43qKnrvdR8kf6ADBLAt-4ZiIvMMuWeDgoPleeqjGJugwXD4zxp9VxT3cMY4l9t_uMKe7FpdgEXIVWwlpYe7BLlkyYCM-ICv4MgdKbGneYC5etqC0Do8N8FK5lBck-tICazE4PgAaDlaQt0xoUh8n54TLqy4dqBQZ6VkAcF9YCnFR6Ympqxmx2B8P9wqp5IgU_L5xIhHlqKSU3r13h_X4vnZHbcVaY7xCgsfma56oeO9xj6D7"
              title="Philips Humidifier 3000i Series"
              desc="Cleans air in less than 6 minutes, removing 99.9% of viruses and aerosols."
              price={499}
              rating={4.8}
            />
            <ProductCard 
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuDSp0DYfd9K4wLuTq3fW4jiYcstUo_ihqzq4lL50K9HNeZQO2YK2Hl08BLSkSJCR_Ge67GfMlcCrVXjvSgMqXBiguO9RR9a8_gZReY1aZB6tf0buHasPuPE8-sgR_7bGWV3MjuTlTcB5uW7jmp9jwqGpnAQ6bkVZVkUPDGJdwBEobDaF-cO-UQvpHeMSRsUeJURmHcteFhKvBESZ9aiH9bL-pjdIwmaIxB_Tqul-lMxDJPrVjvNU2QCSIJBhqKA3AHjyZ_u_HmGFtDd"
              title="Panasonic NN-CD87 Inverter Microwave"
              desc="Multi-function convection microwave oven with smart inverter technology."
              price={359}
              rating={5.0}
            />
          </div>
        </section>

        {/* Brand Marquee */}
        <section className="mb-20 py-10 border-t border-b border-primary/10 overflow-hidden">
          <h4 className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-10">Our Premium Partners</h4>
          <div className="flex items-center justify-around flex-wrap gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            {['Samsung', 'LG', 'Dyson', 'Bosch', 'Philips', 'KitchenAid'].map(brand => (
              <div key={brand} className="h-8 md:h-12 w-32 bg-slate-300 rounded animate-pulse"></div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background-dark text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 text-white mb-6">
              <ShoppingBasket className="size-8 text-primary" />
              <h5 className="text-xl font-bold">Orient Hypermarket</h5>
            </div>
            <p className="mb-6 leading-relaxed">Providing the highest quality home appliances and electronics with exceptional service since 1995.</p>
          </div>
          <div>
            <h6 className="text-white font-bold mb-6 text-lg">Shop Categories</h6>
            <ul className="space-y-4">
              <li><a className="hover:text-primary transition-colors cursor-pointer">Large Appliances</a></li>
              <li><a className="hover:text-primary transition-colors cursor-pointer">Kitchen Essentials</a></li>
              <li><a className="hover:text-primary transition-colors cursor-pointer">Smart Home Tech</a></li>
              <li><a className="hover:text-primary transition-colors cursor-pointer">Air Quality</a></li>
            </ul>
          </div>
          <div>
            <h6 className="text-white font-bold mb-6 text-lg">Customer Care</h6>
            <ul className="space-y-4">
              <li><a className="hover:text-primary transition-colors cursor-pointer">Track My Order</a></li>
              <li><a className="hover:text-primary transition-colors cursor-pointer">Return Policy</a></li>
              <li><a className="hover:text-primary transition-colors cursor-pointer">Warranty Info</a></li>
              <li><a className="hover:text-primary transition-colors cursor-pointer">Store Locator</a></li>
            </ul>
          </div>
          <div>
            <h6 className="text-white font-bold mb-6 text-lg">Join Our Newsletter</h6>
            <p className="mb-6">Stay updated on our latest deals and arrivals.</p>
            <div className="relative">
              <input className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Email address" type="email" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function DealCard({ image, title, price, originalPrice, save }: { image: string, title: string, price: number, originalPrice: number, save: number }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl shadow-primary/5 flex gap-4 items-center">
      <div className="h-32 w-32 shrink-0 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden flex items-center justify-center p-2">
        <img src={image} alt={title} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
      </div>
      <div>
        <span className="text-primary font-bold text-xs">Save ${save}</span>
        <h5 className="font-bold text-lg leading-tight mb-2">{title}</h5>
        <p className="text-2xl font-black text-slate-900 dark:text-white">${price} <span className="text-sm font-normal text-slate-400 line-through">${originalPrice}</span></p>
      </div>
    </div>
  );
}

function ProductCard({ image, title, desc, price, rating }: { image: string, title: string, desc: string, price: number, rating: number }) {
  return (
    <div className="min-w-[320px] md:min-w-[400px] snap-start bg-white dark:bg-slate-900 border border-primary/10 rounded-2xl overflow-hidden group">
      <div className="h-64 bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
        <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2 rounded-full shadow-lg">
          <Heart className="size-5 text-primary" />
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-1 text-primary mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`size-3.5 ${i < Math.floor(rating) ? 'fill-primary' : ''}`} />
          ))}
          <span className="text-xs font-bold ml-1 text-slate-500">({rating})</span>
        </div>
        <h4 className="text-xl font-bold mb-2">{title}</h4>
        <p className="text-slate-500 text-sm mb-4">{desc}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-black">${price}.00</span>
          <button className="px-6 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-all">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

