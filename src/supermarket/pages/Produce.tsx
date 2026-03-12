import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalCart } from '../../context/GlobalCartContext';

interface ProduceProps {
   onNavigate: (page: any) => void;
}

const Produce: React.FC<ProduceProps> = ({ onNavigate }) => {
   const { addToCart, cart } = useGlobalCart();
   const [searchTerm, setSearchTerm] = useState('');

   // Extracted items for filtering capability
   const quickReorderItems = [
      { name: "Organic Avocados", price: "$2.99 / ea", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhQ-F9wusQ9tYzEARZ75JEBmmbjYOJu1BPLTcPrMezcQ5TrNe8SNrjrcDPKa3XtCkPk66CN3k5EaTyyLF5HE_aGWcM0oIXoaA3R0UoGUQplQhC7Rydzywu5-D6unPylNBeUdZRrGNm5WoxbBD_F9uiK38tOuKVjmmh1J7ftouqXh1TP3HtSIfozaVNzjcZx9h7xGSinlUY6Tqkm-vFBrA9EwTQ987rV052t1YVhPHwOI0NZ0rj9r7EoufEqGU4d-YqY7H5Voh5uYhc" },
      { name: "Green Asparagus", price: "$4.50 / bundle", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdtvcfnlP4Iieg3vcHqItD-0FtFjLHCmUns6ze42h8qXWFbF2e_i3VUn56MPO8V6qcg-YYqZHxOkRiOBmAtL7pEIuUn3KAIR9r1KN_hUU68wBE6A1obJ4mWq3pnE2PFvxCTfU_53_oVzfhEds4gxVjOMq_ey0J3EB2l9xHgUED2QHTd3vIQdIQxAwWAHeq8QTUXWbNDX8Qhu3NjybSYegFz7QB1CV-whWjtHCRXo8nMNncMP_FpKsgEZLS6uw_XPA7VBTdY36tqSaC" },
      { name: "Vine Tomatoes", price: "$3.20 / lb", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhw0GmBRpscSVqHFF6BcXHJADZvYlgDNHPoQ8K_c5rHnfO499r02SxxSODjfrIwSZ-iREhVGmPjyxl2ndj_oNIHlQ5A6FY3mLBeumu8XgrOAWR8LRBTH0iniNmZW-lWefFs0TxfqX8CUGX7iFqDYhcN6t5fS1HdbQdWrxtAVKBaKhDkWrT13KelbFAU902tRovl0j7sloddUHS-h9P1IyURJtKS3_RYkF5j_h8W1WauLqZ1Q_eq9C3-BXs8np0-Z5Q_USsYgFp-6q-" }
   ];

   const bestSellers = [
      { name: "Organic Strawberries", price: "4.99", unit: "", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCM8pKrsve-Hsj7bZJX1-9KlNRvoCWYl5G6DUmCpAQ9ePX3MZYAukyMkkQi9J0Np11wBcyHAedNaXlJ-csKMnP19WqZ21uNCFRLONd0iE8bn69EmHwUpWN7-xL3oj_ob-LsHtqc6km408cTMkvKqR2MuFlSDGyXY7j7I6YUgRTzsVuffaztzdRmCOTusY4AFpDCl5H1w0d9WR06Mb7t7B7X9TOGxGqDjaAhUI0fUjEJ3RrPUOVHwqshuARGhgZcO1uyuNpfEjzHW0H3", tag: "POPULAR", tagColor: "bg-yellow-400 text-yellow-900" },
      { name: "Fresh Broccoli Crown", price: "1.89", unit: "/lb", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9t68yp7eD8EbfgYgN8yPh9E8fINlAf8HuLVVnTGvCD3qUc3e23T2JGun-nJP6bXRoxLvgVjcWe2ClNCdUfBufe8QcXHwnZ0OciLkZ2N8bdRmt7B9LTt6rLvk-_tylwPFTYz_ay5m83naj88w2Akuwsll5wPjike46V0BokthCbRAbULhpwLdNLYdHnfjENioDCvo1aACWNopQHcbPVAEijcfvPbTyxzofDhri5y9sDrddVVqSTvw8ukWK0tOl0fcMlOG7g3KUJAbH" },
      { name: "Bunce Carrots", price: "1.99", unit: "", oldPrice: "2.50", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTdK9Xp4RFtLQy4bHYyJNZQms2i9H2qddc1lRxi1NsG8KDkLY1hTq4_GwMyqsM7UifzQjV11gqNHxkUh97rRBgPS753S2H4O2HymiaSdFjXvOz7WiW_SNf_I1JihhzeFClhsM7hAQ2NwwbD-iADvS74iIc38fsN5mEVZoBfohZWJOjJtSWpw9ePEk2RDXjHujYjB9nagJCEE_3CQw5f7CQFsPbBV6xb_cmgZOuB1yNPduw9VuOgit2mS6uO7yOrcGIqyiwl1rL_ZwB", tag: "SALE", tagColor: "bg-[var(--color-accent-light)] text-slate-900" },
      { name: "Gala Apples", price: "1.29", unit: "/lb", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGfRHTi2SUjfIoV1DUpWLE6Gxy8bdHP0A2Aa06_cFbITi7g6teKE6YVjI0m3SVBi7q5h2q7yudvjmTgf16tMqWv_gaAsVFE8saK-OFdqN7beX9XI_UVQI9mkuY8bZhbOiFSD6c0fB58iSI_mprlaHQdifACwD4_vUIXJ4ugQXnTpBOCUldLdmjyA8G-tUAHNs8yAXRmgcv2xvBk5fjzCFPfP6Igf91UsWccgaRbLtzLD14q3GGIz7VopVqCo0fb2KVOXTFnpE7jdyU" }
   ];

   const aisleSpecials = [
      { name: "Bell Peppers 3-Pack", price: "3.49", oldPrice: "4.99", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAy5F7r7nePXG8NGmud1dxusITHs1bRYNvfGzKrcUSEPjPV0GbGAMBqixMsfkL6TkW74AsW3tc7pJCjlGtaAQ2O5T4edOomLl_ykdtZnOnEAeyWUpdmdbX36IzAldPswOVOVzmhGMDEvNFx5b9fZLw6IVxwD5AhUOlXfc3rYdymdbEvx9gf3X7jVpgigl4Z57qkg71ujGDet2pzwYUARpf42UIzcWU2kRB97YI6dSHFyM2Y1UWh9n5YMetQqLZgsoR9dnz0nEG2x_e" },
      { name: "Baby Carrots", price: "0.99", oldPrice: "1.99", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAziwwU98hSNZgMjvSEn-w4umS-8oOsp543BDdcP20dv008vBlNE12K8D0YgncHiFTWuPeKix1OhOmHxB5jKZA_TsxHrc7g_V4LO43PD1f2urJHGIRUiN32GlMo6CGti3YQ31OSMuwnf3oqKn8kIVgqtpEOdS7aTScqQLpwiF4psGuZOLk9w5u23TeWwTLdt0HjeBojUqc5nuvF3h1NhSu3kBMyL6Cq6VIWK7YqW8hyY0BcRTu4AWv4y9RX-8q72WGjz-bInNkf5eGp" }
   ];

   // Filtering function
   const filterList = (list: any[]) => list.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

   const filteredBestSellers = filterList(bestSellers);
   const filteredSpecials = filterList(aisleSpecials);
   const filteredReorder = filterList(quickReorderItems);

   return (
      <div className="font-display bg-[#f6f8f6] dark:bg-slate-950 min-h-screen text-slate-800 dark:text-[#a1a1aa] transition-colors duration-300 pt-[68px]">
         <header className="sticky top-[68px] z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
            <div className="max-w-[1600px] mx-auto px-4 lg:px-6 h-16 flex items-center justify-between gap-8">
               <div className="flex items-center gap-2 flex-shrink-0 cursor-pointer" onClick={() => onNavigate('Home')}>
                  <span className="material-icons text-[var(--color-accent-light)] text-3xl">shopping_basket</span>
                  <h1 className="text-2xl font-bold tracking-tight">
                     <span className="text-[var(--color-accent-light)]">ORIENT</span> <span className="text-slate-900">SUPERMARKET</span>
                  </h1>
               </div>
               <div className="flex-1 max-w-2xl relative hidden md:block">
                  <input
                     type="text"
                     className="w-full bg-slate-100 border-none rounded-lg py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-[var(--color-accent-light)]"
                     placeholder="Search for fresh produce..."
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <span className="material-icons absolute left-4 top-3 text-slate-400">search</span>
               </div>
               <div className="flex items-center gap-6 flex-shrink-0">
                  <button onClick={() => onNavigate('Favorites')} className="flex items-center gap-2 text-sm font-medium hover:text-[var(--color-accent-light)]"><span className="material-icons-outlined">favorite_border</span></button>
                  <button onClick={() => onNavigate('Dashboard')} className="flex items-center gap-2 text-sm font-medium hover:text-[var(--color-accent-light)]"><span className="material-icons-outlined">person_outline</span></button>
                  <button onClick={() => onNavigate('Cart')} className="flex items-center gap-3 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800">
                     <span className="material-icons-outlined text-xl">shopping_basket</span>
                     <span className="font-semibold">
                        ₦{cart.filter(i => i.division === 'market').reduce((sum, i) => sum + i.price * i.quantity, 0).toLocaleString()}
                     </span>
                  </button>
               </div>
            </div>
         </header>

         <main className="max-w-[1600px] mx-auto px-4 lg:px-6 py-8 space-y-12 pb-20">
            {/* Hero - Hide when searching */}
            {!searchTerm && (
               <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg group">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZaVZsuIcPt-Snqtd00ARadGGhvApZXRSLHFds0nhdY0X2XM2kV9tJ5rjDPZWKo4HpfqVXQcISZG8W__pRUmkDBo-9tDRZlXZm0pVeIXQPvACFQQhs5QEZyWOk4geSuBrWEs6y2_XEARkWI6z2I0R7u_HbsazyDkQ5x0UGRcWg6nhBc5ra-0d9EJZt0vTj8cE5joHZpNhvptffB8mcLhxiHj5rVSqj7JQF2yNfwy71ShpKudl8Vb6DtIxHTEtSYdZ9nVtAk1gNU01e" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Hero" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center">
                     <div className="pl-8 md:pl-16 max-w-lg">
                        <span className="inline-block bg-[var(--color-accent-light)] text-slate-900 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">Farm to Table</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">Freshness Guaranteed. Every Day.</h1>
                        <button className="bg-[var(--color-accent-light)] hover:bg-white text-slate-900 font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:translate-x-1 shadow-[0_0_20px_rgba(255,106,0,0.4)]">Shop Fresh Produce</button>
                     </div>
                  </div>
               </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
               <aside className="hidden lg:block lg:col-span-1 space-y-8">
                  <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                     <div className="flex items-center justify-between mb-4"><h3 className="font-bold">Quick Reorder</h3><span className="text-xs text-[var(--color-accent-light)] font-medium cursor-pointer">View All</span></div>
                     <div className="space-y-4">
                        {filteredReorder.length > 0 ? (
                           filteredReorder.map((item, i) => (
                              <div key={i} className="flex items-center gap-3 group cursor-pointer">
                                 <div className="w-12 h-12 rounded bg-slate-100 overflow-hidden flex-shrink-0"><img src={item.img} className="w-full h-full object-cover" alt={item.name} /></div>
                                 <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate group-hover:text-[var(--color-accent-light)]">{item.name}</p><p className="text-xs text-slate-500">{item.price}</p></div>
                                 <button 
                                    onClick={() => addToCart({
                                       id: item.name.toLowerCase().replace(/\s+/g, '-'),
                                       name: item.name,
                                       price: parseFloat(item.price.replace(/[^0-9.]/g, '')),
                                       quantity: 1,
                                       category: 'Produce',
                                       image: item.img,
                                       division: 'market'
                                    })}
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-[var(--color-accent-light)] transition-colors"
                                 >
                                    <span className="material-icons text-sm">add</span>
                                 </button>
                              </div>
                           ))
                        ) : (
                           <p className="text-xs text-slate-400">No items match.</p>
                        )}
                     </div>
                  </div>
               </aside>

               <div className="col-span-1 lg:col-span-3 space-y-12">
                  <section>
                     <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Best Sellers</h2>
                        <a href="#" className="text-sm font-semibold text-[var(--color-accent-light)] hover:underline">See All</a>
                     </div>
                     <AnimatePresence>
                        {filteredBestSellers.length > 0 ? (
                           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {filteredBestSellers.map((item, i) => (
                                 <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} whileHover={{ y: -5 }} key={item.name} className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden relative group">
                                    {item.tag && <div className={`absolute top-2 left-2 z-10 ${item.tagColor} text-[10px] font-bold px-2 py-0.5 rounded`}>{item.tag}</div>}
                                    <div className="h-48 overflow-hidden bg-slate-50"><img src={item.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt={item.name} /></div>
                                    <div className="p-4">
                                       <h3 className="font-medium mb-2">{item.name}</h3>
                                       <div className="flex items-center justify-between">
                                          <div><span className="text-lg font-bold">${item.price}<span className="text-xs font-normal text-slate-400">{item.unit}</span></span>{item.oldPrice && <span className="text-xs text-slate-400 line-through ml-1">${item.oldPrice}</span>}</div>
                                          <button 
                                             onClick={() => addToCart({
                                                id: item.name.toLowerCase().replace(/\s+/g, '-'),
                                                name: item.name,
                                                price: parseFloat(item.price),
                                                quantity: 1,
                                                category: 'Produce',
                                                image: item.img,
                                                division: 'market'
                                             })}
                                             className="w-8 h-8 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center hover:bg-[#e65e00]"
                                          >
                                             <span className="material-icons text-sm font-bold text-white">add</span>
                                          </button>
                                       </div>
                                    </div>
                                 </motion.div>
                              ))}
                           </div>
                        ) : (
                           <div className="p-8 text-center bg-slate-50 rounded-lg">
                              <p className="text-slate-500">No produce found matching "{searchTerm}"</p>
                           </div>
                        )}
                     </AnimatePresence>
                  </section>

                  <section>
                     <h2 className="text-2xl font-bold mb-6">Weekly Aisle Specials</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Featured Special Card - Hide if strictly searching for specific small items not in this category */}
                        {!searchTerm && (
                           <div className="col-span-1 md:col-span-2 lg:col-span-1 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl overflow-hidden relative group h-48 md:h-auto">
                              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaQls-KZe2qWGVBK4US4NVKus1Et7wCaI2781cxcHy7Prjyce5HO0y7PHl_aXZO7u0e4w5ynJVtzoEEp2cOaspMB5ja3AwlHp8UqDnumHPfPslyYDnY9gmjTanRRxlgFBNNv8bPDDTJbUuktxW2nB81VRuXDD3ogcn-SGYU3su08j3E8BN_gwjBnwkFTiJsz5njhi90uDyws8uE7xFcopgxc4c3So8sfQ0Cm8EQrKFMFbPK_ngeIvHegXxOs7A_I-e0uLRAO_3-oUs" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" alt="Citrus" />
                              <div className="relative p-6 h-full flex flex-col justify-end">
                                 <span className="bg-[var(--color-accent-light)] text-slate-900 text-xs font-bold px-2 py-1 rounded w-fit mb-2">30% OFF</span>
                                 <h3 className="text-xl font-bold text-white mb-1">Citrus Festival</h3>
                                 <p className="text-slate-300 text-sm mb-4">Oranges, Lemons, Grapefruits</p>
                                 <button className="bg-white/10 hover:bg-white text-white hover:text-slate-900 backdrop-blur-sm border border-white/20 font-medium py-2 px-4 rounded text-sm w-fit transition-colors">Browse Deals</button>
                              </div>
                           </div>
                        )}

                        {filteredSpecials.map((item, i) => (
                           <motion.div layout whileHover={{ y: -5 }} key={item.name} className="bg-white border border-[var(--color-accent-light)] rounded-xl p-4 flex gap-4 hover:shadow-lg transition-all">
                              <div className="w-24 h-24 bg-slate-50 rounded-lg overflow-hidden flex-shrink-0"><img src={item.img} className="w-full h-full object-cover" alt={item.name} /></div>
                              <div className="flex flex-col justify-between flex-1">
                                 <div><h4 className="font-bold">{item.name}</h4><div className="text-xs text-slate-500 mt-1">Mixed Colors</div></div>
                                 <div className="flex items-center justify-between">
                                    <div className="flex flex-col"><span className="text-xs text-slate-400 line-through">${item.oldPrice}</span><span className="text-lg font-bold text-[var(--color-accent-light)]">${item.price}</span></div>
                                    <button 
                                       onClick={() => addToCart({
                                          id: item.name.toLowerCase().replace(/\s+/g, '-'),
                                          name: item.name,
                                          price: parseFloat(item.price),
                                          quantity: 1,
                                          category: 'Produce',
                                          image: item.img,
                                          division: 'market'
                                       })}
                                       className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[var(--color-accent-light)] flex items-center justify-center transition-colors"
                                    >
                                       <span className="material-icons text-sm">add</span>
                                    </button>
                                 </div>
                              </div>
                           </motion.div>
                        ))}
                     </div>
                  </section>
               </div>
            </div>
         </main>
      </div>
   );
};

export default Produce;
