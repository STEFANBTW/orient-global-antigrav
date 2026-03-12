import React from 'react';
import { motion } from "framer-motion";

export default function BooksStationeryHub({ navigateTo, onProductClick }: { navigateTo: (view: string) => void, onProductClick?: (product: unknown) => void }) {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[80vh] w-full overflow-hidden bg-background-dark">
          <img alt="Hero background" className="absolute inset-0 w-full h-full object-cover opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKg_uBP3OneBpV3XMcAJN9ZNXUKbP_yMnJKuWcyt9dwFJznwasqEdHfvchpVyb1ECBXkQK53PZUDBaL1n0pZcW9cwt208aqGpSf42mrx-4_vTHYTQU74s9ZL1Reib4M5nmjsYgggJTPVlg5LeYyPTEOnB1mgS8ULawrI3e0EH9ZcyAkwt-YznU98FIu1XgIdTgib-jruZDxI9_Uig1b8gvdOjEfN8AcyWaD37Jhc1VtbPf--3iGnsjatvfz_G3B6zFpD4LRRMQWY6X" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/40 to-transparent"></div>
          <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 lg:px-8">
            <div className="max-w-2xl space-y-6">
              <span className="inline-block rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">Back to School 2024</span>
              <h2 className="text-5xl font-black leading-tight text-white lg:text-7xl">Elevate Your <br /><span className="text-primary">Learning Journey</span></h2>
              <p className="text-lg text-slate-300">Premium stationery, curated textbooks, and high-performance office essentials for the modern academic year.</p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="rounded-lg bg-primary px-8 py-4 font-bold text-white hover:bg-primary/90 transition-all">Shop Collection</button>
                <button className="rounded-lg bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-md hover:bg-white/20 transition-all">View Catalogs</button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Jump Categories */}
        <section className="bg-background-light py-12 dark:bg-background-dark">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex flex-wrap justify-center gap-8 md:justify-between">
              <button onClick={() => navigateTo('school-supplies')} className="group flex flex-col items-center gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 transition-all group-hover:bg-primary group-hover:scale-110">
                  <span className="material-symbols-outlined text-4xl text-primary group-hover:text-white">backpack</span>
                </div>
                <span className="font-bold">School Supplies</span>
              </button>
              <button onClick={() => navigateTo('office-tech')} className="group flex flex-col items-center gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 transition-all group-hover:bg-primary group-hover:scale-110">
                  <span className="material-symbols-outlined text-4xl text-primary group-hover:text-white">devices</span>
                </div>
                <span className="font-bold">Office Tech</span>
              </button>
              <button onClick={() => navigateTo('notebooks-paper')} className="group flex flex-col items-center gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 transition-all group-hover:bg-primary group-hover:scale-110">
                  <span className="material-symbols-outlined text-4xl text-primary group-hover:text-white">menu_book</span>
                </div>
                <span className="font-bold">Notebooks</span>
              </button>
              <button onClick={() => navigateTo('arts-crafts')} className="group flex flex-col items-center gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 transition-all group-hover:bg-primary group-hover:scale-110">
                  <span className="material-symbols-outlined text-4xl text-primary group-hover:text-white">palette</span>
                </div>
                <span className="font-bold">Arts & Crafts</span>
              </button>
              <button onClick={() => navigateTo('books-magazines')} className="group flex flex-col items-center gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 transition-all group-hover:bg-primary group-hover:scale-110">
                  <span className="material-symbols-outlined text-4xl text-primary group-hover:text-white">library_books</span>
                </div>
                <span className="font-bold">Books</span>
              </button>
            </div>
          </div>
        </section>

        {/* Essential Office Tech Carousel */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h3 className="text-3xl font-black">Essential Office Tech</h3>
                <p className="text-slate-500">The latest tools to boost your productivity</p>
              </div>
              <div className="flex gap-2">
                <button className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 hover:bg-primary/10"><span className="material-symbols-outlined">chevron_left</span></button>
                <button className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 hover:bg-primary/10"><span className="material-symbols-outlined">chevron_right</span></button>
              </div>
            </div>
            <div className="no-scrollbar flex gap-6 overflow-x-auto pb-4">
              {/* Tech Card 1 */}
              <motion.div 
                layoutId="product-ot1"
                onClick={() => onProductClick?.({
                  id: "ot1",
                  brand: "Ergo-Type",
                  name: "Mechanical Keyboard",
                  price: 12999,
                  rating: 4.8,
                  reviews: 45,
                  badge: "New Arrival",
                  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbI6aJAGWTyZR2CD9NbvIixQ4Rx7qJKu-0NhAODgojlKsD838JxQyihQ2bkdrTSgqjcvrr0mrC5ozOH-wJNCArAGODwosK1g8DFIHKE7NnCT17VuKBhubHSxjHj9ZM5hTSF_kjsIgkFrgYHA0uClIikZiHyRPlpDnqI7Q2TFOTtmfoHUy-eEPBqrx4VNCrT2hOQyeXRBku-JOUW7d96Vo4ePOwIf2FB9Ird56ns6eGyQSf-3GKpJxMd_mQi2H3XoB6Iu9xdguwsoiz"
                })}
                className="min-w-[280px] flex-shrink-0 group cursor-pointer"
              >
                <div className="relative mb-4 h-[320px] overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                  <motion.img layoutId="product-image-ot1" className="h-full w-full object-cover transition-transform group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbI6aJAGWTyZR2CD9NbvIixQ4Rx7qJKu-0NhAODgojlKsD838JxQyihQ2bkdrTSgqjcvrr0mrC5ozOH-wJNCArAGODwosK1g8DFIHKE7NnCT17VuKBhubHSxjHj9ZM5hTSF_kjsIgkFrgYHA0uClIikZiHyRPlpDnqI7Q2TFOTtmfoHUy-eEPBqrx4VNCrT2hOQyeXRBku-JOUW7d96Vo4ePOwIf2FB9Ird56ns6eGyQSf-3GKpJxMd_mQi2H3XoB6Iu9xdguwsoiz" referrerPolicy="no-referrer" />
                  <span className="absolute right-4 top-4 rounded bg-primary px-2 py-1 text-xs font-bold text-white">New Arrival</span>
                </div>
                <h4 className="font-bold">Ergo-Type Mechanical Keyboard</h4>
                <p className="text-sm text-slate-500">Precision typing for long hours</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-lg font-black text-primary">$129.99</span>
                  <button className="rounded-full bg-primary p-2 text-white"><span className="material-symbols-outlined text-sm">add_shopping_cart</span></button>
                </div>
              </motion.div>
              {/* Tech Card 2 */}
              <motion.div 
                layoutId="product-ot2"
                onClick={() => onProductClick?.({
                  id: "ot2",
                  brand: "Pro-Graphic",
                  name: "Tablet 12\"",
                  price: 34900,
                  rating: 4.9,
                  reviews: 32,
                  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5B19D79HjFAEeXDzFnh7OnA3EK72665ikOLq0fhuFHA9fELZ0osvKXhAO90RqEUAB31EazGmxE2fuXgpSQFcwH9JpbMmPU8fpClEwSFhvdjuoYny2J9DCqlP15CpoaSo3gYY1pQaG9kG5YoiFh2l7eC53BLLeUXlu0eN6WlWErjjuCQYq3QKexZGsY9EdRPedXrvulw4bMUDWNUbPjbqFR8hIQb1MRhQcPDf0NFHDmbpft2vhQHSu3XX6gpSzEAPyAKJ3wKii6pTE"
                })}
                className="min-w-[280px] flex-shrink-0 group cursor-pointer"
              >
                <div className="relative mb-4 h-[320px] overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                  <motion.img layoutId="product-image-ot2" className="h-full w-full object-cover transition-transform group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5B19D79HjFAEeXDzFnh7OnA3EK72665ikOLq0fhuFHA9fELZ0osvKXhAO90RqEUAB31EazGmxE2fuXgpSQFcwH9JpbMmPU8fpClEwSFhvdjuoYny2J9DCqlP15CpoaSo3gYY1pQaG9kG5YoiFh2l7eC53BLLeUXlu0eN6WlWErjjuCQYq3QKexZGsY9EdRPedXrvulw4bMUDWNUbPjbqFR8hIQb1MRhQcPDf0NFHDmbpft2vhQHSu3XX6gpSzEAPyAKJ3wKii6pTE" referrerPolicy="no-referrer" />
                </div>
                <h4 className="font-bold">Pro-Graphic Tablet 12"</h4>
                <p className="text-sm text-slate-500">4K display with active stylus</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-lg font-black text-primary">$349.00</span>
                  <button className="rounded-full bg-primary p-2 text-white"><span className="material-symbols-outlined text-sm">add_shopping_cart</span></button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pattern Breaker: Bulk Deals */}
        <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-white md:px-16">
            <div className="relative z-10 grid gap-12 md:grid-cols-2 md:items-center">
              <div className="space-y-6">
                <h3 className="text-4xl font-black leading-tight lg:text-5xl">Bulk Stationery Deals for Corporate & Schools</h3>
                <p className="text-lg text-white/90">Save up to 45% when you order in volume. Custom branding available for notebooks, pens, and planners.</p>
                <div className="flex flex-wrap gap-4">
                  <button className="rounded-lg bg-white px-8 py-4 font-bold text-primary hover:bg-slate-100 transition-all">Request Quote</button>
                  <button className="rounded-lg border border-white/40 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-sm hover:bg-white/20 transition-all">Bulk Catalog</button>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="grid grid-cols-2 gap-4 opacity-80">
                  <div className="h-32 rounded-xl bg-white/20 backdrop-blur-md"></div>
                  <div className="h-32 rounded-xl bg-white/20 backdrop-blur-md"></div>
                  <div className="col-span-2 h-32 rounded-xl bg-white/20 backdrop-blur-md"></div>
                </div>
              </div>
            </div>
            {/* Abstract Decorative Shapes */}
            <div className="absolute -bottom-12 -right-12 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute -top-12 -left-12 h-48 w-48 rounded-full bg-background-dark/20 blur-2xl"></div>
          </div>
        </section>

        {/* Trending Books Carousel */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h3 className="text-3xl font-black">Trending This Month</h3>
                <p className="text-slate-500">Most-read titles across all categories</p>
              </div>
              <button onClick={() => navigateTo('books-magazines')} className="text-sm font-bold text-primary flex items-center gap-1">See All Books <span className="material-symbols-outlined text-sm">arrow_forward</span></button>
            </div>
            <div className="no-scrollbar flex gap-8 overflow-x-auto pb-4">
              {/* Book Card 1 */}
              <div className="w-[180px] flex-shrink-0 group cursor-pointer">
                <div className="relative mb-4 h-[260px] rounded-lg shadow-xl transition-all group-hover:-translate-y-2 group-hover:shadow-primary/20">
                  <img className="h-full w-full rounded-lg object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDe36TK5mV2RjmAKgR1GTq1OuCS1aWloJoYW6NH-hWC9GqfkHDO_Hje8Z_e_sravJNmOzOb2oon6GNdgBnxP-16q8r13kufwLtz83bn9P9FOAJvbBCXEXfvaad4qhvgKbzQEhgSkWZCzdZxGWNXCwR1GqJzr5UMzFJsA9JSGaCiY3YtNECO47yWO3yzZ3m3ibfNRmB5TMGsqEvLc841Tki9c7QDveAxXynDw5vpEkJU89HG0SVAcT1kqg0dA2-nONBugCMLy7jliNhA" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 rounded-lg border-l-2 border-white/20"></div>
                </div>
                <h4 className="line-clamp-2 font-bold leading-tight">The Modern Creative</h4>
                <p className="mt-1 text-sm text-slate-500">Elena Rivers</p>
                <p className="mt-2 font-black text-primary">$18.99</p>
              </div>
            </div>
          </div>
        </section>

        {/* Creative Spaces Bento Box */}
        <section className="py-16 bg-primary/5">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mb-10 text-center">
              <h3 className="text-4xl font-black">Creative Spaces</h3>
              <p className="text-slate-600">Curated collections for your specific workflow</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
              <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-2xl bg-background-dark">
                <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-70" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrUiNf40iG3ohJHtIvrnoOipM3szicF8po57MlV7C6sWototM-8MuTPzQ2IlGwS1s6Iu85BQzlluLHpMPpRHz1_BfQ6CYYxBPQo2CBeFg8WE_MtfK1cALSlv4nTIAt52e6N1_otSGbwSQUxRmp8CHl8ubgruFwXXhEhKud_8IEZApnCRCYBw6uj7Q6zgHQ9XvI7dpqf03Mx5mOKbrC5n34a_kw1L0oMx2v0pBTfqvK8nOgkoF11kBii-DOZlcE1WqcSjKaDWiTQHqk" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
                <div className="absolute bottom-0 p-8">
                  <h4 className="text-3xl font-black text-white">The Minimalist Study</h4>
                  <p className="mt-2 text-slate-300">Clean lines and focused essentials for deep work sessions.</p>
                  <button className="mt-6 flex items-center gap-2 text-primary font-bold">Shop Workspace <span className="material-symbols-outlined">north_east</span></button>
                </div>
              </div>
              <div className="md:col-span-2 relative group overflow-hidden rounded-2xl bg-slate-800">
                <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCH4BTEMY--NLP3-Et8pZPaaYxBOcfVukqO0rZB8mUllPpmqYTP_RoUvh-kjYH08zC0GBsX5yoG-s6SNx2q5ztCdSMrFv5rgVZxBibjsp3Yrvf-KGQYHwB5oxKBruNan79fGDmd9OG5IqW1cyP_DxX-ILapEJn7XihktxWbqolfTCKD6NofnSSqWPgGzO-rXIs7b-nf7xL38LqDk-LSm5YquztaOFYhrzcoCG-elZYlpZORgPPTA_q71bq-M3NGZ0VHy1D-4re0mwq" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <div className="absolute bottom-0 p-6">
                  <h4 className="text-xl font-black text-white">Artist Atelier</h4>
                  <p className="text-slate-300">Unleash your creativity with premium paints and canvases.</p>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-2xl bg-primary">
                <div className="flex h-full flex-col justify-center p-6 text-white">
                  <span className="material-symbols-outlined text-4xl mb-4">ink_pen</span>
                  <h4 className="text-xl font-bold leading-tight">Journaling Masterclass</h4>
                  <p className="mt-2 text-xs opacity-80 uppercase tracking-widest font-bold">Guided Series</p>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-700">
                <img className="h-full w-full object-cover opacity-50 transition-transform group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBytCRzp5VFjT_kGLQ2lANd3AlD8bRaHt7-QPtbt5OI46cmhxJ-zIm_Ch6IjctADJwsWtBLmbCC1RShxRA-m2NM_G2yRmJ6TxEA1QcWs_CXUN47sXrs1Fx2GZyrM7nh8R-NGS4AqmKcluu9Kbaadi6H8aJuPMUQWI3Xf8_3VinMQhKededCgIvOKblPQqL6rkfHMiR15f_Qd7FhIw4uq5O3gxSt-YDL-8vQ_OIpNnpkdJVfKbj0hVNdFdx-ZauorArE0rphmi-AObyc" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <h4 className="text-center font-black">Digital Nomad Essentials</h4>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background-dark text-white pt-20 pb-10">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                  <span className="material-symbols-outlined">auto_stories</span>
                </div>
                <h2 className="text-2xl font-black tracking-tight text-white">Orient<span className="text-primary">Stationery</span></h2>
              </div>
              <p className="text-slate-400">Premium destination for all your intellectual and creative needs since 1995. Quality that inspires productivity.</p>
              <div className="flex gap-4">
                <a className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-primary transition-colors" href="#"><span className="material-symbols-outlined text-sm">public</span></a>
                <a className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-primary transition-colors" href="#"><span className="material-symbols-outlined text-sm">alternate_email</span></a>
                <a className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-primary transition-colors" href="#"><span className="material-symbols-outlined text-sm">share</span></a>
              </div>
            </div>
            <div>
              <h5 className="mb-6 font-bold uppercase tracking-widest text-primary">Quick Links</h5>
              <ul className="space-y-4 text-slate-400">
                <li><a className="hover:text-white transition-colors" href="#">School Textbook Finder</a></li>
                <li><a className="hover:text-white transition-colors" href="#">Office Setup Guide</a></li>
                <li><a className="hover:text-white transition-colors" href="#">Artist Memberships</a></li>
                <li><a className="hover:text-white transition-colors" href="#">Corporate Gifting</a></li>
              </ul>
            </div>
            <div>
              <h5 className="mb-6 font-bold uppercase tracking-widest text-primary">Customer Support</h5>
              <ul className="space-y-4 text-slate-400">
                <li><a className="hover:text-white transition-colors" href="#">Track Your Order</a></li>
                <li><a className="hover:text-white transition-colors" href="#">Bulk Order Queries</a></li>
                <li><a className="hover:text-white transition-colors" href="#">Refund Policy</a></li>
                <li><a className="hover:text-white transition-colors" href="#">Store Locator</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h5 className="font-bold uppercase tracking-widest text-primary">Join the Hub</h5>
              <p className="text-sm text-slate-400">Subscribe to get early access to new collections and exclusive discounts.</p>
              <div className="flex">
                <input className="w-full rounded-l-lg border-none bg-white/10 px-4 py-3 text-sm focus:ring-primary" placeholder="Email address" type="email" />
                <button className="rounded-r-lg bg-primary px-4 py-3 font-bold transition-all hover:bg-primary/90">Join</button>
              </div>
              <p className="text-[10px] text-slate-500 italic">By joining, you agree to our Privacy Policy and Terms of Service.</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-10 text-center text-sm text-slate-500">
            <p>© 2024 Orient Hypermarket. All rights reserved. Designed for the curious mind.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
