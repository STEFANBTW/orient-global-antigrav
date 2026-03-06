import React from 'react';

const SommelierScreen: React.FC = () => {
    return (
        <div className="bg-slate-50 dark:bg-background-dark text-gray-800 dark:text-gray-200 font-sans">
             {/* Hero */}
             <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAEX8X-_HRWxmVc2-Z6pfn0TqOjI8iUquyrs1BsoSUpdm_ExMYSJFEHamOGsya8lrHlVSQZ-tCXMeGq0U6eAvTEDRFDHBO4pkSydQYnufA5enCEJq-ENuSiJWcszPtG9SssMKu2OoINhim4KQ3zofM66VzLJgwdXLJF7kLSciyszrlyfrYeFjqmhIn6n1i_6P9QU4GHBmQiUKmlcYrUTGwCo8AaCOeFQf-CY8tmarvaneSgtwx5boUIzV4htpsQFIXGEb8DV12UOmB" 
                        className="w-full h-full object-cover opacity-60" 
                        alt="Crystal Glass" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/50 to-transparent"></div>
                </div>
                <div className="relative z-10 max-w-4xl mx-auto text-center px-6 mt-16">
                    <div className="inline-block mb-6 px-4 py-1 border border-primary/30 rounded-full bg-primary/10 backdrop-blur-sm">
                        <span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">Est. 2024</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
                        The Sommelier’s <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-300">Corner</span>
                    </h1>
                </div>
             </section>

             {/* AI Section */}
             <section className="py-16 px-6 relative bg-slate-50 dark:bg-background-dark">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        <div className="lg:col-span-5 space-y-5">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Ask the <span className="text-primary">Sommelier</span></h2>
                            <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed text-sm">
                                Unsure what complements your meal? Our digital sommelier analyzes the flavor profile of your chosen dish and recommends the perfect bottle.
                            </p>
                            <div className="flex items-center gap-3 pt-3">
                                <div className="h-10 w-10 rounded-full bg-neutral-dark flex items-center justify-center border border-primary/20">
                                    <span className="material-icons text-primary text-lg">auto_awesome</span>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-white">AI-Powered</p>
                                    <p className="text-[10px] text-gray-500">Curated by taste algorithms</p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-7">
                            <div className="glass-card rounded-xl border border-primary/20 p-6 shadow-2xl relative overflow-hidden group">
                                <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
                                <div className="relative z-10 space-y-5">
                                    <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-wider">Describe your dish</label>
                                    <div className="relative">
                                        <input className="w-full bg-neutral-dark/50 border border-neutral-mid text-white placeholder-gray-500 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="I'm having the Spicy Prawn Curry..." type="text"/>
                                        <span className="material-icons absolute right-4 top-3 text-gray-500 text-lg">search</span>
                                    </div>
                                    <button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 text-sm">
                                        <span>Get Recommendation</span>
                                        <span className="material-icons text-sm">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             </section>

             {/* Heritage Series */}
             <section className="py-20 bg-neutral-dark relative" id="heritage">
                 <div className="max-w-7xl mx-auto px-6">
                     <div className="text-center mb-16">
                        <span className="text-primary text-xs font-bold uppercase tracking-widest">Heritage Series</span>
                        <h2 className="text-4xl font-sans font-bold text-white mt-3 mb-4">Science of the Soil</h2>
                        <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
                     </div>

                     {/* Zobo Block */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24 items-center">
                         <div className="relative group">
                             <div className="absolute inset-0 bg-primary/20 rounded-xl transform rotate-2 group-hover:rotate-4 transition-transform duration-500"></div>
                             <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBssD_LUthXyTrwE5u26YoXMuQz_4PwGCza5PZSPuQRrv0ZR7m2-1PjHLbKQ_ruFIJyaIiP8jUDyoExceYap7PfPT7kNUKFer0B4-7avuqf-bWlBpwWxyFDtcWP_0IvWFTmfScv6EDeL_6TykrDUjFFdS_10BGP24cACWN64T3etH-OwlqE1cmF8NIPeFim7LiLTbi_eSN38XnFVf8cFBBlfVNk2TGKBg4ukOZJ0zQeywW1fSQTXid-wljZccGPdLNgIYDUkS2JPS3i" className="relative rounded-xl shadow-2xl z-10 w-full h-[400px] object-cover filter brightness-90 contrast-110" alt="Zobo" />
                         </div>
                         <div className="space-y-6">
                             <div>
                                 <h3 className="text-2xl font-bold text-white mb-1">The Zobo Infusion</h3>
                                 <p className="text-primary text-sm font-medium">Hibiscus Sabdariffa</p>
                             </div>
                             <div className="prose prose-invert prose-sm text-gray-400 font-light">
                                <p className="mb-3">
                                    Beyond its vibrant ruby hue, Zobo is a masterclass in natural extraction. Our process begins with sun-dried roselle calyces, steeped at precisely 85°C to preserve the delicate anthocyanins responsible for its antioxidant properties.
                                </p>
                                <p>
                                    We introduce a proprietary blend of cloves and ginger during the cooling phase, creating a spicy undercurrent that awakens the palate before the main course.
                                </p>
                             </div>
                             <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                                <div>
                                    <span className="block text-xl font-bold text-white">48h</span>
                                    <span className="text-[10px] text-gray-500 uppercase">Steeping Time</span>
                                </div>
                                <div>
                                    <span className="block text-xl font-bold text-white">3.2</span>
                                    <span className="text-[10px] text-gray-500 uppercase">pH Level</span>
                                </div>
                                <div>
                                    <span className="block text-xl font-bold text-white">0%</span>
                                    <span className="text-[10px] text-gray-500 uppercase">Alcohol</span>
                                </div>
                             </div>
                         </div>
                     </div>

                     {/* Kunu Block */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1 space-y-6">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-1">The Kunu Fermentation</h3>
                                <p className="text-primary text-sm font-medium">Millet & Sorghum</p>
                            </div>
                            <div className="prose prose-invert prose-sm text-gray-400 font-light">
                                <p className="mb-3">
                                    Kunu represents the ancient biotechnology of fermentation. By malting millet grains for 24 hours, we activate amylase enzymes that break down starches into fermentable sugars.
                                </p>
                                <p>
                                    The result is a probiotic-rich, creamy elixir with a nutty profile. At Orient, we serve it chilled in clay vessels to maintain its earthy integrity, pairing exceptionally well with our spicy grilled meats.
                                </p>
                            </div>
                            <button className="text-primary hover:text-white transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                                Read Full History <span className="material-icons text-sm">arrow_right_alt</span>
                            </button>
                        </div>
                        <div className="order-1 md:order-2 relative group">
                            <div className="absolute inset-0 bg-neutral-mid rounded-xl transform -rotate-2 group-hover:-rotate-4 transition-transform duration-500"></div>
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4rfde4PpTNNJHM0qi0WfOqJg34lmjrq0fySzokqhndYjbcgKaU63ta0gMHIIJeB7y5wIZ1Bu17p3XShfC2X5c5cQXAU3K4diQ-a_zqbb11T8ebLZEavhyU554oV3H-VbJ9YhKYFUz__C-K0WUJEPJBVauq7eA5I96igQK-ysTRmJVOzc6Xhhyms4nf_Ezs_fA-h6-F0SVZQIioU0I9x0FoKdByWjv0Q0Ot5HbLtPDUlgs_k1z732PVTfvcGaOqI4s39obgytqnaZA" className="relative rounded-xl shadow-2xl z-10 w-full h-[400px] object-cover filter brightness-90 contrast-110" alt="Kunu" />
                        </div>
                    </div>
                 </div>
             </section>

             {/* Wine & Malt List */}
            <section className="py-16 bg-slate-50 dark:bg-background-dark overflow-hidden" id="wines">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-primary/20 pb-5">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">The Reserve List</h2>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Curated specifically for the Orient palate.</p>
                        </div>
                        <div className="flex gap-3 mt-5 md:mt-0">
                            <button className="px-3 py-1.5 rounded-full bg-primary text-white text-xs">Reds</button>
                            <button className="px-3 py-1.5 rounded-full border border-gray-700 text-gray-500 hover:text-primary dark:text-gray-400 text-xs">Whites</button>
                            <button className="px-3 py-1.5 rounded-full border border-gray-700 text-gray-500 hover:text-primary dark:text-gray-400 text-xs">Malts</button>
                        </div>
                    </div>
                    {/* List Container */}
                    <div className="space-y-3">
                        <ReserveItem 
                            title="Château Margaux" 
                            subtitle="Cabernet Sauvignon Blend" 
                            region="Bordeaux, France" 
                            year="2015" 
                            price="$850"
                            image="https://lh3.googleusercontent.com/aida-public/AB6AXuDaBwIML2tau-0SXWpx41WOlLu0hjdvMX3sJrC7zTqU_b_SgTeTQyqIDEgz6CDNkBcz1cQJKp42XvN82LWAVFIwX_jE7ooqbf2m9QeMwBrJKaGs3Q-2YBYJ4xsYmIUAueylFYd5Nmc0Buk5ecvxG8W5osccY11lKkc8rT03viGPhDNlxGkGM0uiuZjYP6mEF2IDwRvU_yJZAMemI7lsdY-Hd3ooaabvJBFvm_HBovTv8aAqgxEFzbX8TKZN_l1Hudgfeutt6Y1H6i6m"
                        />
                        <ReserveItem 
                            title="Penfolds Grange" 
                            subtitle="Shiraz" 
                            region="South Australia" 
                            year="2017" 
                            price="$620"
                            image="https://lh3.googleusercontent.com/aida-public/AB6AXuAiNuuTDNAxRCTD73ydQAKjkIyOj1MEAhR-GbCzswSkMKFbd5ZEAYlGVABDa0e8GZ39Wg3vOZV2r82EIBWeQtuV_2gD9wZKXmYA2atbrbMEPQ7MI9CNSpT7kFADm4ZbSR0ALE5WX6gv80SVN1BkxgWhp0qx71jX0_6HOyc98d3bpqTiVRBWaP9h-vZtvw9h04JmqSOxvLps3A1aaH1JXZCw2fnbtdNBbDf0f89cpQ76GDHEHzIjru6Ktc8il6YQhbny-HSjjWAa3Ygq"
                        />
                        <ReserveItem 
                            title="Yamazaki 18 Year" 
                            subtitle="Single Malt Whisky" 
                            region="Osaka, Japan" 
                            year="NV" 
                            price="$1,200"
                            image="https://lh3.googleusercontent.com/aida-public/AB6AXuAh2tZQ9wYSflZbvouZN9oxQCOuB5otHEL72d-tkKXuSSyBu3pBG_jcfUe8Xcq8o0f3R5lXux7E-moju0LpOGTZf-QmZwwLEC1Foy1j-8ZR2goDd49G54VCTUpF7eLbs2M1K-FkD0MsrHluiftbv56Dqs7jJYry-g_jncU-DrOUdxIyM3O87SyCgEoTIswRv5ld3-8m3CArCbyIS47oLKUZukkenMX1N4MKf3N30OFHCiRyaGYslnqngtYh4HBV0IJ7JOTKSCGu3Ilt"
                        />
                        <ReserveItem 
                            title="Cloudy Bay" 
                            subtitle="Sauvignon Blanc" 
                            region="Marlborough, NZ" 
                            year="2022" 
                            price="$85"
                        />
                    </div>
                    <div className="mt-12 text-center">
                        <button className="text-gray-500 hover:text-white text-sm font-medium uppercase tracking-wider transition-colors border-b border-transparent hover:border-primary pb-1">View Full Cellar List</button>
                    </div>
                </div>
            </section>

            {/* The Cocktail Lab */}
            <section className="py-16 bg-neutral-dark" id="cocktails">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-white mb-10 flex items-center gap-3">
                        <span className="material-icons text-primary text-3xl">science</span>
                        The Cocktail Lab
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <CocktailCard 
                            title="The Orient Express"
                            desc="A bold fusion of Asian spices and western spirits. Ginger-infused vodka meets lychee liqueur."
                            image="https://lh3.googleusercontent.com/aida-public/AB6AXuDMRCxkfP9GdWqkX5QzFfyXQrWB7RbnqV0xlYGKbpFAjYXdXdRdGHEpvxp1HpdX6NIBxCGyGuAJIt4KysXNDFsB65PqqZRUH6P8ojM3wx3HWeHIXtzbcn1gAHsu0lWv7hP1jpOSbUXgiGRr--BRvkiBzYPgtZmId23D_67ppc5vYhqFw-hFO73h8lSetzo72mbPfyzWjHXy5PE2uOOd9fsYEsEdX9LT--6ff2lFyjGLU85FCizp0IOmob4tJXGjaDcRSXFIDZW5473N"
                            ingredients={[["Ginger Vodka", "50ml"], ["Lychee Juice", "30ml"], ["Lime", "15ml"]]}
                        />
                         <CocktailCard 
                            title="Smoked Date Old Fashioned"
                            desc="Bourbon washed with Medjool dates, finished with hickory smoke and orange bitters."
                            image="https://lh3.googleusercontent.com/aida-public/AB6AXuC4RJ9h5SD1cA5h3Yx_HJIi3bmZlDdBLpSjpa6EE2o1KGixMBoLC6Ylo9QRyc_5u9wjUtCnerScjwO8y-wi3YRSZxFVVJjhn9oYfYvsYxzfO9wDYW5j4YYodUTEm_0bP7X1JyYbS0rzqWom-vmHXP58W55JrgOHCuMpNBZFCI9V2pHxy6NOf8nafOMwNFkQR4m5AloEUuAZ-MWpRL1Hidl5kNtrutTafocZIu4wc3n_3tH8vYr2HcAA0a-JjIwndqAffvJl4xTOb4cy"
                            ingredients={[["Date Bourbon", "60ml"], ["Demerara Syrup", "5ml"]]}
                        />
                         <CocktailCard 
                            title="The Jade Garden"
                            desc="A refreshing palate cleanser. Japanese gin, cucumber, matcha dusting, and tonic."
                            image="https://lh3.googleusercontent.com/aida-public/AB6AXuANCYyvBxCSNKRIO-T6whp6XU36fAanuZElt4KBJHUr52tX48724-mr5ikWjMiDwgDyL2D4CbDPtLiDPhK448tbos0Mx4TR3kfZL_dJ6Dx2o5Wu3VrnbQsa38vFhMQYk3Uy52IwQ5jjq76DIBRuMJxqP7zJlwbw6WKFgV9Ij-Q6UY0xzpf0tQhFG65DrV71NyTyCsIsYJLy0GAavA4Hf0MAtqH3X0eKSw4SOG6NSi1REgDWaMp5IBWoJLB_A6on11aWJS0xSUgWH5Vn"
                            ingredients={[["Roku Gin", "45ml"], ["Matcha", "Dash"]]}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

// Helper Components
const ReserveItem = ({ title, subtitle, region, year, price, image }: any) => (
    <div className="group relative flex flex-col md:flex-row items-baseline justify-between py-4 border-b border-gray-200 dark:border-gray-800 hover:border-primary/50 transition-colors cursor-pointer">
        <div className="md:w-1/2">
            <h4 className="text-lg md:text-xl font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors">{title}</h4>
            <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
        <div className="flex justify-between w-full md:w-1/2 mt-1.5 md:mt-0 text-gray-600 dark:text-gray-400 font-light text-sm">
            <span>{region}</span>
            <span>{year}</span>
            <span className="font-medium text-gray-900 dark:text-white">{price}</span>
        </div>
        {/* Floating Image on Hover */}
        {image && (
            <div className="absolute right-[20%] -top-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 w-28 h-40 hidden lg:block">
                <div className="w-full h-full relative">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
                    <img src={image} className="relative w-full h-full object-contain drop-shadow-2xl" alt={title} />
                </div>
            </div>
        )}
    </div>
);

const CocktailCard = ({ title, desc, image, ingredients }: any) => (
    <div className="group bg-background-dark rounded-xl overflow-hidden shadow-lg hover:shadow-primary/20 transition-all duration-300 border border-transparent hover:border-primary/30">
        <div className="h-56 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent z-10 opacity-60"></div>
            <img src={image} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" alt={title} />
            <div className="absolute bottom-3 left-3 z-20">
                <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded">Signature</span>
            </div>
        </div>
        <div className="p-5">
            <h3 className="text-lg font-bold text-white mb-1.5">{title}</h3>
            <p className="text-gray-400 text-xs mb-3 line-clamp-2">{desc}</p>
            <div className="space-y-1.5 border-t border-gray-800 pt-3 hidden group-hover:block transition-all animate-fade-in">
                {ingredients.map(([name, amount]: [string, string], i: number) => (
                    <div key={i} className="flex justify-between text-[10px] text-gray-500">
                        <span>{name}</span>
                        <span>{amount}</span>
                    </div>
                ))}
            </div>
            <button className="mt-3 w-full py-1.5 rounded border border-gray-700 text-gray-300 hover:text-white hover:border-primary hover:bg-primary/10 text-xs transition-colors">View Method</button>
        </div>
    </div>
);

export default SommelierScreen;