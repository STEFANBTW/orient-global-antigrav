import React, { useEffect, useState } from 'react';
import { cmsApi } from '@/services/cmsApi';

const MenuScreen: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [cmsData, setCmsData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await cmsApi.getDivisionContent('dining');
                setCmsData(data);
            } catch (error) {
                console.error("Failed to fetch CMS data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center font-sans text-slate-500">
                <div className="animate-pulse tracking-[0.2em] uppercase text-sm">Loading Menu...</div>
            </div>
        );
    }

    const heroBlock = cmsData?.blocks?.find((b: any) => b.block_type === 'hero')?.content_payload || {
        title: "Taste the Orient",
        subtitle: "A culinary journey from the vibrant markets of Jos to the heart of fine dining. Experience the soul of local heritage and continental mastery."
    };

    const menuBlock = cmsData?.blocks?.find((b: any) => b.block_type === 'menu')?.content_payload || {
        local: [
            { 
                title: "Egusi & Pounded Yam", 
                price: "₦8,500", 
                desc: "Melon seeds ground by hand, cooked with Ugu leaves sourced fresh daily. Served with fluffy pounded yam.",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsmge_bfRyIGopUVEnS6shdZ9SeZEVyWB85cTrbhNVkDXahcYX09WiAmbgLkavPK43j8znzWlzlAT5XgUFb_pzpD_BGWVf3GHam1gbEJg4z9Qes36I2I3tlfgjxAu9SiZMBJlHEeN2QAgty4ARBBBfRTbiVZR1OhS5FDQ5qT9RBA0B2S6nNZheVCUEPNxvQ72uyvph42b2zT75OtODqHLay0gMqK1Xgssion7PmxRT6DFnvg5UnbwQCybLPSW2QWs8HmsapjBithVj"
            },
            { 
                title: "Goat Meat Peppersoup", 
                price: "₦6,000", 
                desc: "Spicy and aromatic.",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJp9HQEPf5o-T9Y1Bn6xTr3JK2mRg7j9LApCBSqWQaKS2wHDuZmId-PvTjCuxWv50FMIoemhW-n8gjizDI1xKOTfg1UbZwRyEDHudHJpih1oi1MzW9n0_F_1v15Y5ij68CRv1VxHsK0ovjOvq-miamYh-YZyOk3LkJOc-NhhxLAFE6T5EPIUF2izicAntaXgnhJHgYBuNx0m9PGclMaDuR67yIafAltPIvLf246-RFj-CUuCQH2IxQ4pVvYhKBOtXFzZxn_ueZQGtD"
            },
            { 
                title: "Amala & Ewedu", 
                price: "₦7,500", 
                desc: "Classic Yoruba dish.",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwUi_mtMYqNSDZq97aHbzfrDEDEhm-6K9Yv5QhPUQYq2Bohni2LPtPPJXcAHrOFYQ_7ZZaOQSIDm_dvT-f6sSnJbtJcSCU86FWANTgaQv3IRC9Z-m9jfhjCPwm4P_to0FHYttIXgWltiLE6Nb6W3TEPl1HDtbpMJ633TDnIxCVK7dbWOj4UlGj0kILGsqLXn-sdM-r_HE-i04F7tAJzJES1U8m_BLkOK3Qp734lMlLoG9q40oRxVRIwAFm0B6vxNlgxx-9cK2wQAhd"
            }
        ]
    };

    const localMenu = menuBlock.local;

    return (
        <div className="bg-slate-50 dark:bg-background-dark min-h-screen text-gray-800 dark:text-gray-100 font-sans selection:bg-primary selection:text-white pb-24">
            {/* Top Navigation Bar - REMOVED redundant local nav */}

            {/* Hero Section */}
            <header className="relative h-[70vh] w-full overflow-hidden flex flex-col items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDj-5jTIIwvDzpn59TGKVz1ybCYZAF0xuVrP2oIjamHpr3OtP-vOZhlbqM9qysSSHaLgcZgRm4v_ezPrpORTbBX8rpReetkE0n2JwX_M4gcmSz38nqMatTjG3QATZtWzPF8IlnzCzQBs2v5wFRSNGKDUI-a3ODCRAOtGbilEvbcqeRmJZpC9EnukONMGWtwLYFkuPF7qqmnunJuNMX-C4NOITVlAfCPHFIqVhv2qk_Nx9DaXK2ViXTBsSundO1moLrL7chnFSKGSBV8" 
                        alt="Hero" 
                        className="w-full h-full object-cover brightness-[0.5] scale-105 animate-pulse-ring" 
                        style={{animationDuration: '20s'}}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30"></div>
                </div>
                
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mb-8 animate-fade-in-up">
                    <div className="inline-block border-y border-white/20 py-2 px-6 mb-6 backdrop-blur-sm">
                         <p className="text-white tracking-[0.4em] uppercase text-[10px] font-bold">Est. 2024 • Lagos</p>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-bold text-white mb-6 drop-shadow-2xl font-sans leading-tight">
                        {heroBlock.title.split(' ')[0]} {heroBlock.title.split(' ')[1]} <br/><span className="italic font-light text-primary">{heroBlock.title.split(' ').slice(2).join(' ')}</span>
                    </h1>
                    <p className="text-base md:text-xl text-gray-200 mb-10 font-light max-w-2xl mx-auto leading-relaxed font-sans">
                        {heroBlock.subtitle}
                    </p>
                    <a href="#local" className="inline-flex flex-col items-center text-white/80 hover:text-white transition-colors group">
                        <span className="text-[10px] uppercase tracking-widest mb-2">Begin Journey</span>
                        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all">
                             <span className="material-icons animate-bounce text-xl">arrow_downward</span>
                        </div>
                    </a>
                </div>
            </header>

            {/* Section 2: The Local Soul (Masonry Grid) - Extended Content */}
            <section id="local" className="py-12 relative bg-slate-50 dark:bg-slate-950 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <span className="text-primary font-bold tracking-widest uppercase text-xs">The Local Soul</span>
                        <h2 className="text-4xl md:text-5xl mt-3 mb-4 font-bold text-slate-900 dark:text-white font-sans">From the Markets of Jos</h2>
                        <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 text-base">Authentic Nigerian delicacies prepared with locally sourced ingredients from the Plateau, bringing the warmth of home to your plate.</p>
                        <div className="w-16 h-1 bg-primary mx-auto rounded-full mt-6"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]">
                        {/* Item 1: Tall Feature (Egusi) - Adjusted height to match 2x280 + 24gap = 584px */}
                        <div className="group relative rounded-2xl overflow-hidden row-span-2 cursor-pointer shadow-xl h-[584px]">
                            <img src={localMenu[0].image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={localMenu[0].title} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 transition-opacity"></div>
                            <div className="absolute bottom-0 left-0 p-8 w-full transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                                <div className="flex justify-between items-end mb-2">
                                    <h3 className="text-2xl text-white font-bold font-sans">{localMenu[0].title}</h3>
                                    <span className="text-primary font-bold text-lg">{localMenu[0].price}</span>
                                </div>
                                <p className="text-gray-300 text-sm mb-4 line-clamp-2 group-hover:line-clamp-none transition-all">
                                    {localMenu[0].desc}
                                </p>
                                <div className="bg-primary/20 backdrop-blur-md border border-primary/30 p-3 rounded-lg mt-4 transform opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                    <div className="flex items-start gap-3">
                                        <span className="material-icons text-primary text-sm mt-1">restaurant_menu</span>
                                        <div>
                                            <p className="text-primary text-xs font-bold uppercase mb-1">Chef's Note</p>
                                            <p className="text-xs text-white/90 italic">"The melon seeds are sun-dried in Jos for 3 days to intensify the nutty flavor profile."</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Item 2: Goat Meat */}
                        <div className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg h-[280px]">
                             <img src={localMenu[1].image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={localMenu[1].title} />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                             <div className="absolute bottom-0 left-0 p-5 w-full">
                                 <h3 className="text-xl text-white font-bold font-sans">{localMenu[1].title}</h3>
                                 <div className="flex justify-between items-center mt-2">
                                     <span className="text-primary font-bold">{localMenu[1].price}</span>
                                     <button className="w-7 h-7 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center text-white transition-colors">
                                         <span className="material-icons text-xs">add</span>
                                     </button>
                                 </div>
                             </div>
                        </div>

                        {/* Item 3: Amala */}
                        <div className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg h-[280px]">
                            <img src={localMenu[2].image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={localMenu[2].title} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                             <div className="absolute bottom-0 left-0 p-5 w-full">
                                 <h3 className="text-xl text-white font-bold font-sans">{localMenu[2].title}</h3>
                                 <div className="flex justify-between items-center mt-2">
                                     <span className="text-primary font-bold">{localMenu[2].price}</span>
                                     <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center text-white transition-colors">
                                         <span className="material-icons text-sm">add</span>
                                     </button>
                                 </div>
                             </div>
                        </div>

                        {/* Item 4: Catfish (Wide) */}
                        <div className="group relative rounded-2xl overflow-hidden md:col-span-2 cursor-pointer shadow-lg h-[280px]">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWzM7d0VlahOQ5ysiJiJjCwOySlZX6Qu3P8KdB1HH63tSWU_E5N_oaFBv6rT4JuHLbMl_9HDZqxGaZ2xzyGkO-gwUkZtF0KE67Nibx8bkLX2KqjAM7BvYkdSCzGFP5_M16q2LiYwmY-Q7bz_fqK2oU1zCF4CHR2y5Ing20fcf2YU4KLwtS0sM6KJIVSrt6eZ3m7eo2Hk64kiAoPLnAw1oC43eYDgMFinuA9ApVJ0mc6s02YamuMcAmSuomqq2PaNCI6AO6vTKeMggW" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Catfish" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-6 w-full flex flex-col md:flex-row md:items-end justify-between">
                                <div className="max-w-md">
                                    <h3 className="text-2xl text-white font-bold mb-1 font-sans">Whole Grilled Catfish</h3>
                                    <p className="text-gray-300 text-xs mb-3">Marinated for 24 hours in our secret yaji spice blend.</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-primary font-bold text-xl">₦15,000</span>
                                    <button className="px-5 py-1.5 bg-primary hover:bg-red-700 text-white rounded-full transition-colors text-sm font-medium">Add to Order</button>
                                </div>
                            </div>
                        </div>

                         {/* Item 5: Jollof (New) */}
                         <div className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg h-[280px]">
                            <img src="https://images.unsplash.com/photo-1604329760661-e71dc7010127?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Jollof Rice" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                             <div className="absolute bottom-0 left-0 p-5 w-full">
                                 <h3 className="text-xl text-white font-bold font-sans">Smoky Party Jollof</h3>
                                 <div className="flex justify-between items-center mt-2">
                                     <span className="text-primary font-bold">₦4,500</span>
                                     <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center text-white transition-colors">
                                         <span className="material-icons text-sm">add</span>
                                     </button>
                                 </div>
                             </div>
                        </div>

                        {/* Item 6: Suya (New) */}
                         <div className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg h-[280px]">
                            <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Suya" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                             <div className="absolute bottom-0 left-0 p-5 w-full">
                                 <h3 className="text-xl text-white font-bold font-sans">Spicy Beef Suya</h3>
                                 <div className="flex justify-between items-center mt-2">
                                     <span className="text-primary font-bold">₦3,000</span>
                                     <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center text-white transition-colors">
                                         <span className="material-icons text-sm">add</span>
                                     </button>
                                 </div>
                             </div>
                        </div>

                        {/* Item 7: Moi Moi (New) */}
                        <div className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg h-[280px]">
                            <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Moi Moi" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                             <div className="absolute bottom-0 left-0 p-5 w-full">
                                 <h3 className="text-xl text-white font-bold font-sans">Special Moi Moi</h3>
                                 <div className="flex justify-between items-center mt-2">
                                     <span className="text-primary font-bold">₦1,200</span>
                                     <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center text-white transition-colors">
                                         <span className="material-icons text-sm">add</span>
                                     </button>
                                 </div>
                             </div>
                        </div>

                    </div>
                    
                    <div className="mt-16 text-center">
                        <button className="px-8 py-3 bg-transparent border border-primary text-primary hover:bg-primary hover:text-white transition-all rounded-full uppercase tracking-widest text-sm font-bold">View Full Local Menu</button>
                    </div>
                </div>
            </section>

            {/* Section 3: Continental Classics (Horizontal Scroll) */}
            <section id="continental" className="py-12 bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex justify-between items-end">
                    <div>
                        <span className="text-primary font-bold tracking-widest uppercase text-xs">Global Tastes</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-3 font-sans">Continental Classics</h2>
                        <p className="text-slate-500 mt-3 max-w-xl text-sm">A curated selection of the world's finest dishes, reimagined by our expert chefs.</p>
                    </div>
                    <div className="hidden md:flex gap-3">
                        <button className="p-3 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-colors text-gray-400">
                            <span className="material-icons text-sm">arrow_back</span>
                        </button>
                        <button className="p-3 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-colors text-gray-400">
                            <span className="material-icons text-sm">arrow_forward</span>
                        </button>
                    </div>
                </div>
                
                {/* Horizontal Scroll Container */}
                <div className="overflow-x-auto no-scrollbar pb-8 pl-4 md:pl-[calc((100vw-80rem)/2)]">
                    <div className="flex space-x-6 w-max px-4">
                         <ContinentalCard 
                            image="https://lh3.googleusercontent.com/aida-public/AB6AXuAJap3fXE_-LAdH0QfaiTF2r9Py-7tNLD6ssInL-l-OIHDOTdDNQmdeb21Jk1ZXB_lkOmUy5bPvBNydSpECvm8URH4_JFuNP8mDicaPWGPY5avGORluHwh6ydn6a9h_fW5VgyTMEyLr64_ibMPbEAXI2c8O9ydslkWlmffsMiJPj5zKsxcgm2E149UrlRE5BxM2iqQ8Br234suzM_8cF7wShsHg4yKIYwSlOZhwlRBRXs9sDkpV3u63NWKEegv9TaG9r4r_peoDQYV7"
                            tag="Steakhouse"
                            title="Ribeye Steak"
                            desc="300g Prime Cut, Garlic Butter, Seasonal Veg."
                            price="₦22,000"
                         />
                         <ContinentalCard 
                            image="https://lh3.googleusercontent.com/aida-public/AB6AXuBtnYwGAiRuz3K0IZDApQ91sRhp_bVlAaK5AyOO4WTEAwzlyvkBeDiz3f57mE4A9Usz0y-wca4GiU0x3wlj_uen1is7aL4_fRZy7kd0O-fXZTOs6tu5cO8-4eVMYd8qsv-sArW0ui8ekVR1bXnAmA65MHH-P1aToZhY28-T06AbFsQJ30DRnqGmCB-VYqqmPCykDhsyE1mMwBeEzscQ9A6ux5otmjQyAAH5cOKuVV_CMh5pQybHO0FWG67R1tqbRMNSZqQ7ywBrsh6r"
                            tag="Pasta"
                            title="Truffle Alfredo"
                            desc="House-made Fettuccine, Parmesan Cream, Black Truffle."
                            price="₦14,000"
                         />
                         <ContinentalCard 
                            image="https://lh3.googleusercontent.com/aida-public/AB6AXuD1M4xE404bzpC55LlH_3ZUuI9bIqzWkvdTZ_0BwGqFyKwViKcWAzV3KISCmFMPykOqOlQ2kFnp2sI8obLd-VjRoae5ZkCtUYjzdkC9wdwRGKzaP6NvUvm-KpUGboOTCa00yKhmBD1WDmFNzFvkWtTMwA9TT1gdg3V-0wmT4jDNxy82JxEX9IKyhQxlOXCQMj3QCf9z2RNsuL7DBwn-EPheswG5gsc6P-ZNeLr_0VWvh0V-HgSFlSESOWEHUh-qd9LCulpOvV2Lela8"
                            tag="Pizza"
                            title="Margherita D.O.P"
                            desc="San Marzano Tomato, Buffalo Mozzarella, Fresh Basil."
                            price="₦9,000"
                         />
                         <ContinentalCard 
                            image="https://lh3.googleusercontent.com/aida-public/AB6AXuC-FJz5l7GHKKr8o7BXlzawS-L0N7477ODshk732bkaj00La7y3200flRI9rNYPekcS_k3qfb7rM7rOaYK24-tbw9Lpnig3N9p5SZEstwqPPyKtZcMjN_jhBXFTE-b3Zz7_J0p38DopCNAt1bFKp9fBIxp_dmpPLKrHi7WFJ1Rcq5kOKnUJ-bUuuO9soD7BC3PnDYoW7kxaQbTa4hxX7BUWa1xBZJ-f9rMpeSG900Ug9wm7JggEDOa7YWU5B5LrxpRUiuYin-mE0OkY"
                            tag="Grill"
                            title="Lamb Cutlets"
                            desc="Mint Jus, Mashed Potato, Charred Broccolini."
                            price="₦24,000"
                         />
                         <ContinentalCard 
                            image="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop"
                            tag="American"
                            title="Gourmet Burger"
                            desc="Double patty, brioche bun, aged cheddar, secret sauce."
                            price="₦8,500"
                         />
                         <ContinentalCard 
                            image="https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=2070&auto=format&fit=crop"
                            tag="Seafood"
                            title="Pan-Seared Salmon"
                            desc="Atlantic salmon, lemon butter sauce, asparagus."
                            price="₦21,000"
                         />
                    </div>
                </div>

                {/* Additional Vertical List for more content */}
                <div className="max-w-4xl mx-auto px-6 mt-16 space-y-8">
                    <h3 className="text-3xl font-bold text-center mb-12 font-display dark:text-white">More From The Grill</h3>
                    <div className="flex justify-between items-center border-b border-gray-200 dark:border-white/10 pb-4">
                        <div>
                            <h4 className="text-xl font-bold dark:text-white">T-Bone Steak (500g)</h4>
                            <p className="text-gray-500 text-sm">Best of both worlds, served with pepper sauce.</p>
                        </div>
                        <span className="text-lg font-bold text-primary">₦28,000</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 dark:border-white/10 pb-4">
                        <div>
                            <h4 className="text-xl font-bold dark:text-white">BBQ Pork Ribs</h4>
                            <p className="text-gray-500 text-sm">Slow cooked for 6 hours, glazed with honey BBQ.</p>
                        </div>
                        <span className="text-lg font-bold text-primary">₦18,000</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 dark:border-white/10 pb-4">
                        <div>
                            <h4 className="text-xl font-bold dark:text-white">Grilled Lobster Tail</h4>
                            <p className="text-gray-500 text-sm">Garlic butter, herbs, served with rice.</p>
                        </div>
                        <span className="text-lg font-bold text-primary">₦35,000</span>
                    </div>
                </div>
            </section>

            {/* Section 4: The Drinkery (AI Sommelier) */}
            <section id="drinks" className="py-12 relative bg-slate-950 text-white overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-950 via-transparent to-slate-950 z-10"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        {/* AI Sommelier Widget */}
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-[9px] uppercase tracking-widest font-bold text-primary">Orient AI Sommelier</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-3 font-sans">What are you in the mood for?</h3>
                            
                            {/* Chat Interface Simulation */}
                            <div className="space-y-5 mb-6">
                                <div className="bg-white/10 p-5 rounded-2xl rounded-tl-none w-5/6">
                                    <p className="text-sm leading-relaxed">I see you're looking at the Ribeye Steak. Would you prefer a bold red wine or a refreshing local Zobo to cut through the richness?</p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <button className="px-4 py-2 bg-primary text-white rounded-full text-xs hover:bg-red-600 transition-colors shadow-lg">Bold Red Wine</button>
                                    <button className="px-4 py-2 bg-white/10 text-white border border-white/20 rounded-full text-xs hover:bg-white/20 transition-colors">Spicy Zobo</button>
                                    <button className="px-4 py-2 bg-white/10 text-white border border-white/20 rounded-full text-xs hover:bg-white/20 transition-colors">Something Sweet</button>
                                </div>
                            </div>
                            
                            <div className="pt-6 border-t border-white/10">
                                <p className="text-[10px] text-gray-400 mb-3 uppercase tracking-widest">Today's Recommendations</p>
                                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuANVDsWyT2VjCkMHoe_3VZLCLY1r-Fc35qWGPbElZOoGYOC6dCJJcXYMuyHDAtGPv5m27lgGhNBNE3q_Ua0TrGiLB7Ir6MrAkRUjTYRrTZkuKb9uj65UagnV__7NdohwC4KNQf2SVgS0f_QBpMMeCCgINZHyOmkSBuIHMl97LV-Q6w49O19dyK9laXLrZ-VT9hwNA0Wg9To7oIUyhDDWAQfMwrXntP4bOJIzzYbgYseTNgEIXq8OpGNSMvoztxQ5W-P_tm3HS9yio02" alt="Red Wine" className="w-16 h-16 rounded-lg object-cover group-hover:scale-105 transition-transform" />
                                    <div>
                                        <h4 className="font-bold text-base">Château Margaux 2015</h4>
                                        <p className="text-xs text-gray-400">Ideally paired with red meat.</p>
                                    </div>
                                    <span className="ml-auto text-primary font-bold text-lg">₦45,000</span>
                                </div>
                            </div>
                        </div>

                        {/* Visual Drink Gallery */}
                        <div className="space-y-8">
                            <div className="text-right mb-6">
                                <h2 className="text-4xl md:text-5xl font-bold mb-3 font-sans">The Drinkery</h2>
                                <p className="text-lg text-gray-300 font-light">Curated spirits, local brews, and artisanal infusions.</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative group rounded-xl overflow-hidden aspect-[3/4] cursor-pointer">
                                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqLpHNswKiH96bwbRUdeuFdiJR9bKeq6i1_BsTGiZJNbUi61oDtJxHZa2jzUqBGgAIbbkxRqMRP5_Kfysc8NTHdggFZKP3Y_pqtHsQh0lAeeXDSCnGkb-jeKtnwG-lDapHGrRpo413J6nyJepnvqsQlVpfeLmHeeCOChbCl8IJbhLM3Ac1c1-_wInQw66b3xoSAT1f6O7U4AXHXLCYm9aPyMC62ATOYNCrrBMS75rXbfLxdJg3eGJN5i2McSE-GPSTBr8RXiXLddDV" alt="Zobo" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                        <span className="text-2xl font-bold text-white tracking-widest uppercase border-b-2 border-primary pb-1">Zobo</span>
                                    </div>
                                </div>
                                <div className="relative group rounded-xl overflow-hidden aspect-[3/4] mt-16 cursor-pointer">
                                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDF7XYzUwLvNjamGS4zRiLfYW-TjEXWH9CFiPzXPm6vXZ13pSLogceueZd3vGIJIpaTK-wvqr4en_OQMT6DCjk7EBlu3oJnSL1SotWlEE6qLMkKuiWXcwUp94OxJkFSDmzWe9YtPV_uOsEJsUhrObY5V1ez5To7quHLqTDtoEy6zMO4KStZXo-zohuuuzOZct7MuyS6yOibBAwZV96CGys8dQQUbgHBtY5D8CxZrEPaAYbyXADsbplAVSLvRlBgbvB3_W-A9bXhQ6ST" alt="Kunu" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                        <span className="text-2xl font-bold text-white tracking-widest uppercase border-b-2 border-primary pb-1">Kunu</span>
                                    </div>
                                </div>
                                 <div className="relative group rounded-xl overflow-hidden aspect-[3/4] cursor-pointer">
                                    <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop" alt="Cocktail" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                        <span className="text-2xl font-bold text-white tracking-widest uppercase border-b-2 border-primary pb-1">Mixology</span>
                                    </div>
                                </div>
                                 <div className="relative group rounded-xl overflow-hidden aspect-[3/4] mt-16 cursor-pointer">
                                    <img src="https://images.unsplash.com/photo-1474722883778-792e7990302f?q=80&w=2137&auto=format&fit=crop" alt="Wine" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                        <span className="text-2xl font-bold text-white tracking-widest uppercase border-b-2 border-primary pb-1">Cellar</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 5: Dessert & Small Chops */}
            <section id="dessert" className="py-12 bg-slate-50 dark:bg-slate-950 text-slate-900">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <span className="text-primary font-bold tracking-widest uppercase text-xs">Sweet Endings</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-3 font-sans">Dessert & Small Chops</h2>
                        <div className="w-10 h-1 bg-primary mx-auto mt-5"></div>
                    </div>
                    <div className="grid gap-8">
                         <DessertItem 
                            image="https://lh3.googleusercontent.com/aida-public/AB6AXuAIAE5nhwgemaBaagT8RvyfAo6CEqxaWHux1zbCvcoQGKZbnC7eH76j5K8P0IEzrHbql7YgCX0Dgj0sg3XUTimuFiYC2cllzIlVILzogFoggAJESKGsZs1qTE7MvM30tbCCtQymdhMcGHI2Y4_816GmRBjESXdWCHTH0GneUKNNwg4Ftpfldde4Gp2HbCabcNjUX7eMCwueNdcJVR1rUDBsDYhMDXRN8mHU9ZmlC9BD3Hzm_17YoRnxaKrn5LZMTX2bZFaEyf7k9GEB"
                            title="Signature Puff Puff"
                            desc="Drizzled with honey butter and cinnamon dust. Soft, airy, and warm."
                            price="₦2,500"
                         />
                         <DessertItem 
                            image="https://lh3.googleusercontent.com/aida-public/AB6AXuCnFqo-v6kZfqipNB5nC5yneiUtxa8cna3MaLnQvQisVW2dR2UXKrQd1SLlkyiBIIsP5HtavjkXOz7YOC4tqU8wdx0klikVHfSKt9WAP-hMuJjwG7U1YnOLW4vESKUSjZhYfq7tpVynKI8tVZJ7rRzwsXoFnOeBqyK0kvyksb3iuYliyh9gP42TNo5TIkBT88hE1URaJa0IarX8WfaOm1EY4AO8-KZVSbfSkksAJL_j-OJFIWvVwIpxZuCG-Epi_dohhaTCgJr3amwQ"
                            title="Molten Chocolate Fondant"
                            desc="Dark chocolate cake with a gooey center. Served with vanilla bean ice cream."
                            price="₦4,500"
                         />
                         <DessertItem 
                            image="https://lh3.googleusercontent.com/aida-public/AB6AXuB1elPEEd-FyXNncj6d3DeLNcTQuYYpMondzTci2gShfrirvR9vu2IgveCfBCwKZB_AuEv5-Joo-PJBL77G__EmUjrrVL0nqH9cIWugYMtg02Ny_MKpdTX-k-s4jvTwieCxmrAIcHx0gMLTurhRglOtdW1w1wOmAnHyhUjhlrr-TVd85gpmLUkZev5eG6wqKo6wxOqObfh6Kvbku_H81D_td6H98ypqyjcs--TkmVeVqVA1wnmliEc8uP0TJ8VC0hiLHXmGTXLQ8y2K"
                            title="Jos Meat Pie"
                            desc="Flaky pastry filled with minced beef, potatoes, and carrots."
                            price="₦1,500"
                         />
                         <DessertItem 
                            image="https://images.unsplash.com/photo-1551024601-564d6e68e21d?q=80&w=2070&auto=format&fit=crop"
                            title="Cheesecake"
                            desc="Classic New York style with a berry compote."
                            price="₦3,500"
                         />
                         <DessertItem 
                            image="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=2070&auto=format&fit=crop"
                            title="Fruit Platter"
                            desc="Seasonal tropical fruits served with a honey yogurt dip."
                            price="₦2,000"
                         />
                    </div>
                </div>
            </section>
        </div>
    );
};

const NavLink = ({ href, children, scrolled }: { href: string, children: React.ReactNode, scrolled: boolean }) => (
    <a 
        href={href} 
        className={`text-sm uppercase tracking-widest font-semibold transition-all duration-300 relative group py-2
        ${scrolled ? 'text-gray-800 dark:text-gray-200 hover:text-primary' : 'text-white/90 hover:text-white'}`}
    >
        {children}
        <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full`}></span>
    </a>
);

// ... Rest of the components (MenuItem, ContinentalCard, DessertItem) remain mostly the same but ensure they are included in the file
const MenuItem = ({ image, title, price, desc }: { image: string, title: string, price: string, desc: string }) => (
    <div className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg">
        <img src={image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={title} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 w-full">
            <h3 className="text-2xl text-white font-bold font-display">{title}</h3>
            <p className="text-gray-300 text-sm mt-1">{desc}</p>
            <div className="flex justify-between items-center mt-3">
                <span className="text-primary font-bold">{price}</span>
                <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center text-white transition-colors">
                    <span className="material-icons text-sm">add</span>
                </button>
            </div>
        </div>
    </div>
);

const ContinentalCard = ({ image, tag, title, desc, price }: any) => (
    <div className="w-[280px] md:w-[360px] group flex-shrink-0 cursor-pointer">
        <div className="h-[320px] rounded-2xl overflow-hidden mb-4 relative shadow-lg">
            <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm">
                {tag}
            </div>
        </div>
        <div className="flex justify-between items-start">
            <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors font-sans">{title}</h3>
                <p className="text-gray-500 text-xs mt-1.5 line-clamp-2">{desc}</p>
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">{price}</span>
        </div>
    </div>
);

const DessertItem = ({ image, title, desc, price }: any) => (
    <div className="flex flex-col md:flex-row gap-6 items-center group cursor-pointer hover:bg-white/50 dark:hover:bg-black/5 p-3 rounded-2xl transition-all">
        <div className="w-full md:w-1/4 overflow-hidden rounded-xl shadow-md">
            <img src={image} alt={title} className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-110" />
        </div>
        <div className="w-full md:w-3/4 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 dark:border-gray-800 pb-3 group-hover:border-primary/50 transition-colors">
            <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 font-sans">{title}</h3>
                <p className="text-gray-500 text-xs max-w-xs">{desc}</p>
            </div>
            <div className="mt-3 md:mt-0 flex flex-col items-end">
                <span className="text-lg font-bold text-primary">{price}</span>
                <button className="text-[10px] uppercase tracking-wider text-gray-400 hover:text-primary mt-1 flex items-center gap-1 transition-colors font-bold">
                    Add <span className="material-icons text-xs">add</span>
                </button>
            </div>
        </div>
    </div>
);

export default MenuScreen;