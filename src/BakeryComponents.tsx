import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ScrollContext } from './ScrollContext';
import { Architect } from './BakeryArchitect';
import { Wholesale } from './BakeryWholesale';
import { Story } from './BakeryStory';

const menuItems = [
  { title: "Butter Croissant", category: "Pastries", price: "₦4,500", desc: "27 layers of pure bliss. Baked fresh every 2 hours to ensure maximum flake.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzuTGeynABEZq_RNMW_0DWnpySiwUdY708i6ZVWjZ7aIl0DpPLMJq1VQVEwuiE3nMamKg_bwuczTqbcV6ecYVDUXjY9SZK519_nntwfz9HAhku_iqDi_Ef3RUdWrVu9jrh-MWAyUVc-FKp3_XCiyFx_P2OM-jDXRGULnYJqVqUqqx6jyHp_XoHc7SCS-NUZMRZsCvKWvMaSW8Dsah1KUa05a9i3V7cPWokidQYzWZ7hkP9T04I1yuxLjt0g6HhgWkppOALuJnR6wrU", ingredients: "High-fat French Butter, Organic Wheat Flour, Sea Salt, Fresh Yeast" },
  { title: "Rustic Sourdough", category: "Bread", price: "₦8,000", desc: "Fermented for 48 hours. A thick, caramelized crust with a soft, airy crumb.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3ePjwRPlUyPcBB-gEiNv8MkH16tu35a6aB6_9Zj6vvtAjNzfpPl3j9BZxEiFIodTQCe9Zyw5LOmhozbuIXP9okz3ngRIWl4rKMS0SKUkOmK6mttKGX1C0orlgu70xhnIsPKsKFQHKXqBCEG3fDWZZyFyXYR9JfQecs2L1EYLc-A8kNIM_-KsioMgNvsvR0T2bdRbRNnU00mKgnsB7VshRYE5j0sjBCg60QWs45waEvck39YPu_VtdDweJzzP-3pE_auMe0BbiyI3c", ingredients: "Wild Yeast Starter (Jos), Rye Flour, Whole Wheat, Filtered Water" },
  { title: "Forest Berry Tart", category: "Pastries", price: "₦6,500", desc: "A sweet almond crust filled with Madagascar vanilla custard.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYvf77WkTzo48ZPbJwUbQetCY5GnPm0VNmBHX0NT52ceOmSMsQZHiYsq9NcCufvHkW87mOr6Z7DTgftYf8q1h6AHQM8XNZeZnPrLJoJNhWZvwsRgqxS8vOeeR2JCDpJoMJqdY6l7G-xynMPgrNZX3i-mBcBfzq3YlV640wg5x5BjcnS_G_UbOryxsD1iSmAv08WogejIlucFklzxkv2CI0kfa_ilSMPwqWo6-tr1Z6Wd7aoOqW5gpClZIalrlkkyU4U9a7i9ViNPEd", ingredients: "Vanilla Bean Custard, Seasonal Berries, Almond Flour Crust, Glaze" },
  { title: "NYC Sesame Bagel", category: "Bread", price: "₦3,500", desc: "Boiled in honey water then baked. Chewy exterior, soft interior.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCye9YH_o_PRcnhP-s4c_Ay_E9zoNz1oReHKAlsEWfNNc7YuV1Ha_6yYsqEUNMItX38C0VGq1fAUZNac96Mv6pe6yEH50CBl63aS0HNTNeWMPszVliMAlJsLceV2USAOc-QqVgcYwFhNWDkWc-U21cu4YBhsJY4vLKePO8OOJu4Ob-3FXxKeGeeC0ntOXjwSXivoh7nmf_8bN0KAJXnAI1QrUdSzNf-eKfwDlmUyKwpzDVdMYGPCLtqb1ExbXZnDi5J0HvGIlco5PcP", ingredients: "Malted Barley Flour, Sesame Seeds, Sea Salt, Honey Water Boil" },
  { title: "Sticky Cinnamon Roll", category: "Pastries", price: "₦5,000", desc: "Gooey center, crispy edges. Spiced with a hint of cardamom.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCd_TmNBtFRIqwh5bh7iSlOdqRDJSGJVKP1T-3YCFoq-WnNanHo6WbBuRXRvvs8tGQSZK1dZn6I3a6iJHL4byM9r5DC26JFjA7U9s_o2o2ia367BS2gVpc2LHYMwm5e_UPo_r_GPIZKyQHnoR8vXlbdPWdS5z5SZxXQd68-5uWq1QMGTj01wNIGMZG1jB4PPdc9XAUU0ZRvEHw44Sdxiw4c5TdmJpuXivg3eodT1I-xcIyM6u9Br9l8Z00zpX_O4pUx_7yGlsf2Knwr", ingredients: "Ceylon Cinnamon, Brown Sugar, Cardamom, Cream Cheese Frosting" },
  { title: "Olive Ciabatta", category: "Bread", price: "₦6,500", desc: "Airy Italian slipper bread studded with Kalamata olives.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3ePjwRPlUyPcBB-gEiNv8MkH16tu35a6aB6_9Zj6vvtAjNzfpPl3j9BZxEiFIodTQCe9Zyw5LOmhozbuIXP9okz3ngRIWl4rKMS0SKUkOmK6mttKGX1C0orlgu70xhnIsPKsKFQHKXqBCEG3fDWZZyFyXYR9JfQecs2L1EYLc-A8kNIM_-KsioMgNvsvR0T2bdRbRNnU00mKgnsB7VshRYE5j0sjBCg60QWs45waEvck39YPu_VtdDweJzzP-3pE_auMe0BbiyI3c", ingredients: "Wheat Flour, Water, Kalamata Olives, Olive Oil, Yeast" },
  { title: "Pain au Chocolat", category: "Pastries", price: "₦4,750", desc: "Flaky croissant dough wrapped around two batons of dark chocolate.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzuTGeynABEZq_RNMW_0DWnpySiwUdY708i6ZVWjZ7aIl0DpPLMJq1VQVEwuiE3nMamKg_bwuczTqbcV6ecYVDUXjY9SZK519_nntwfz9HAhku_iqDi_Ef3RUdWrVu9jrh-MWAyUVc-FKp3_XCiyFx_P2OM-jDXRGULnYJqVqUqqx6jyHp_XoHc7SCS-NUZMRZsCvKWvMaSW8Dsah1KUa05a9i3V7cPWokidQYzWZ7hkP9T04I1yuxLjt0g6HhgWkppOALuJnR6wrU", ingredients: "Butter, Flour, Dark Chocolate, Sugar, Milk" },
  { title: "Spinach Feta Danish", category: "Savory", price: "₦5,500", desc: "Savory pastry filled with creamy spinach and tangy feta cheese.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnDkmQLViId92Xb5EIwK923g9s4vEyP7kRlaoy-PSt-Q5O0XHMLFkbPtmcHArRNuxNfF0tn5WpSr4cadPNsC7b9MCBCn1LdhvH_CGIUR-ktHXG4FsOH1apFckqn7x4tnXxB0QVPJDycxVhTK2kWSOBdfFrldA95svT7P3iGydLOAxlyeiM07nPh86t_cM1naYI95F7GOQFfRaCn9oTK5SHmBnOS5QQKAPj7G81IFRGKK6nMwwdbaX0m0WZrSvRW8-rJDYLC9zGGoUC", ingredients: "Puff Pastry, Spinach, Feta Cheese, Garlic, Herbs" },
  { title: "Multigrain Seed Loaf", category: "Bread", price: "₦9,000", desc: "Dense, nutty loaf packed with flax, sunflower, and pumpkin seeds.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmprho5MDhuLhOfVgQEqJ-MUQ5tryytP6ON6i2vb0Yoas281JrIx5dNJAucfKXPOOFFUgNLyIFF4GZuXazlicapLXhwWNXITxICQlPYIF5qZZniDLtCUMgTKpW_oYroBsTc7QQXHjG5DrZB2-GZhlhc50WljO155_6CVN9WtYDkI7vb0cr3eUJuULhifa5fu8oEtvjoUZQZig2wEWyhSS28U56WA_hXDK5WNWmWJpkPusDA0D68wwI5alXHGVzZnbZty1Hr66H0pYU", ingredients: "Whole Wheat Flour, 7-Grain Mix, Honey, Molasses" },
  { title: "Lemon Poppy Muffin", category: "Pastries", price: "₦3,750", desc: "Zesty lemon flavor with a tender crumb and crunchy poppy seeds.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYvf77WkTzo48ZPbJwUbQetCY5GnPm0VNmBHX0NT52ceOmSMsQZHiYsq9NcCufvHkW87mOr6Z7DTgftYf8q1h6AHQM8XNZeZnPrLJoJNhWZvwsRgqxS8vOeeR2JCDpJoMJqdY6l7G-xynMPgrNZX3i-mBcBfzq3YlV640wg5x5BjcnS_G_UbOryxsD1iSmAv08WogejIlucFklzxkv2CI0kfa_ilSMPwqWo6-tr1Z6Wd7aoOqW5gpClZIalrlkkyU4U9a7i9ViNPEd", ingredients: "Lemon Zest, Poppy Seeds, Flour, Sugar, Yogurt" },
  { title: "Sausage Roll", category: "Savory", price: "₦4,000", desc: "Herbed pork sausage wrapped in golden, flaky puff pastry.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCd_TmNBtFRIqwh5bh7iSlOdqRDJSGJVKP1T-3YCFoq-WnNanHo6WbBuRXRvvs8tGQSZK1dZn6I3a6iJHL4byM9r5DC26JFjA7U9s_o2o2ia367BS2gVpc2LHYMwm5e_UPo_r_GPIZKyQHnoR8vXlbdPWdS5z5SZxXQd68-5uWq1QMGTj01wNIGMZG1jB4PPdc9XAUU0ZRvEHw44Sdxiw4c5TdmJpuXivg3eodT1I-xcIyM6u9Br9l8Z00zpX_O4pUx_7yGlsf2Knwr", ingredients: "Pork Sausage, Fennel, Puff Pastry, Egg Wash" },
  { title: "Almond Danish", category: "Pastries", price: "₦5,000", desc: "Buttery pastry filled with sweet almond frangipane and toasted almonds.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzuTGeynABEZq_RNMW_0DWnpySiwUdY708i6ZVWjZ7aIl0DpPLMJq1VQVEwuiE3nMamKg_bwuczTqbcV6ecYVDUXjY9SZK519_nntwfz9HAhku_iqDi_Ef3RUdWrVu9jrh-MWAyUVc-FKp3_XCiyFx_P2OM-jDXRGULnYJqVqUqqx6jyHp_XoHc7SCS-NUZMRZsCvKWvMaSW8Dsah1KUa05a9i3V7cPWokidQYzWZ7hkP9T04I1yuxLjt0g6HhgWkppOALuJnR6wrU", ingredients: "Almond Paste, Butter, Flour, Sugar, Sliced Almonds" },
  { title: "Quiche Lorraine", category: "Savory", price: "₦6,000", desc: "Classic French tart with bacon, egg custard, and gruyere cheese.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBO0ZKFr0Vq3u2qIGbwTklVk1NRf5LudR3o-9VQzWsVuBWiMBm3gxTiHb7qBh3fYEk0cekwvM0yU9p15-SjoL5kWnxf9mWHV_5_ZsKyOsTlIJOJb_pOnEf4EfjaMOCSP9Tc4-jCtBART-M6O0BPS3TdgOAMoa9e2TH5TVRHZXhD8zWBsvjqg0_T7ylozMovy05X9SAfSvH6TlwHSA4bdT0PmjMrzw3T37Zh7kynz6ox1Xp0FwJrkOXYmvuQBHfAO9m9x-S4TWUZZ3th", ingredients: "Eggs, Cream, Bacon, Gruyere, Pie Crust" },
  { title: "French Baguette", category: "Bread", price: "₦3,000", desc: "Traditional long thin loaf with a crisp crust and chewy texture.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3ePjwRPlUyPcBB-gEiNv8MkH16tu35a6aB6_9Zj6vvtAjNzfpPl3j9BZxEiFIodTQCe9Zyw5LOmhozbuIXP9okz3ngRIWl4rKMS0SKUkOmK6mttKGX1C0orlgu70xhnIsPKsKFQHKXqBCEG3fDWZZyFyXYR9JfQecs2L1EYLc-A8kNIM_-KsioMgNvsvR0T2bdRbRNnU00mKgnsB7VshRYE5j0sjBCg60QWs45waEvck39YPu_VtdDweJzzP-3pE_auMe0BbiyI3c", ingredients: "Wheat Flour, Water, Salt, Yeast" },
  { title: "Ham & Cheese Croissant", category: "Savory", price: "₦5,500", desc: "Our signature croissant filled with artisanal ham and swiss cheese.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzuTGeynABEZq_RNMW_0DWnpySiwUdY708i6ZVWjZ7aIl0DpPLMJq1VQVEwuiE3nMamKg_bwuczTqbcV6ecYVDUXjY9SZK519_nntwfz9HAhku_iqDi_Ef3RUdWrVu9jrh-MWAyUVc-FKp3_XCiyFx_P2OM-jDXRGULnYJqVqUqqx6jyHp_XoHc7SCS-NUZMRZsCvKWvMaSW8Dsah1KUa05a9i3V7cPWokidQYzWZ7hkP9T04I1yuxLjt0g6HhgWkppOALuJnR6wrU", ingredients: "Ham, Swiss Cheese, Butter, Flour, Milk" }
];

const BakeryMenuItem: React.FC<{ title: string; price: string; desc: string; image: string; ingredients: string }> = ({ title, price, desc, image, ingredients }) => (
  <div className="group relative bg-[#FDFBF7] dark:bg-stone-900 rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 break-inside-avoid mb-6 border border-stone-100 dark:border-stone-800">
    <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
      <img src={image} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" alt={title} />
      <div className="absolute top-4 right-4 bg-white/90 dark:bg-background-dark/90 backdrop-blur text-xs font-bold px-4 py-1.5 rounded-full text-primary shadow-sm font-serif tracking-wider">{price}</div>
      <div className="absolute inset-0 bg-stone-900/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-8 text-center backdrop-blur-[2px]">
        <div>
          <p className="text-white/80 text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Ingredients</p>
          <p className="text-white font-serif text-xl leading-relaxed italic">{ingredients}</p>
        </div>
      </div>
    </div>
    <div className="p-8">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-serif text-2xl text-stone-800 dark:text-white font-medium">{title}</h3>
        <button className="text-stone-400 hover:text-primary transition-colors"><span className="material-icons">favorite_border</span></button>
      </div>
      <p className="text-stone-500 dark:text-stone-400 text-sm mb-6 line-clamp-2 font-sans leading-relaxed">{desc}</p>
      <button className="w-full py-3 border border-stone-200 dark:border-stone-700 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-white hover:border-primary transition-colors">Add to Order</button>
    </div>
  </div>
);

const BakeryFeatureItem: React.FC<{ icon: string; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="flex items-center gap-4">
    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
      <span className="material-icons">{icon}</span>
    </div>
    <div>
      <h4 className="font-bold text-slate-900 dark:text-white">{title}</h4>
      <p className="text-sm text-stone-500">{desc}</p>
    </div>
  </div>
);

const BakeryBulkCard: React.FC<{ icon: string; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-primary/50 transition-colors">
    <span className="material-icons text-primary text-4xl mb-4">{icon}</span>
    <h3 className="font-serif text-xl font-bold mb-2">{title}</h3>
    <p className="text-stone-400 text-sm mb-6">{desc}</p>
    <a className="text-primary text-sm font-bold hover:underline" href="#">Download Menu</a>
  </div>
);

const BakerySensoryItem: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-4 text-white">
    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
      <span className="material-icons text-primary text-xl">{icon}</span>
    </div>
    <span className="text-sm font-medium tracking-wide">{text}</span>
  </div>
);

const BakeryPairingCard: React.FC<{ title: string; desc: string; image: string }> = ({ title, desc, image }) => (
  <motion.div whileHover={{ y: -10 }} className="bg-[#FDFBF7] dark:bg-stone-900 rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 dark:border-stone-800 group transition-all">
    <div className="h-56 overflow-hidden relative">
      <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors z-10" />
      <img src={image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-105" alt={title} />
    </div>
    <div className="p-10">
      <h4 className="font-serif text-2xl text-stone-800 dark:text-white mb-4 italic">{title}</h4>
      <p className="text-stone-500 text-sm leading-relaxed font-sans">{desc}</p>
    </div>
  </motion.div>
);

export const BakeryHome: React.FC = () => {
  const ref = useRef(null);
  const { scrollContainerRef } = React.useContext(ScrollContext);
  const { scrollYProgress } = useScroll({
    target: ref,
    container: scrollContainerRef || undefined,
    offset: ["start start", "end start"]
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Bread', 'Pastries', 'Savory'];

  const displayedItems = activeCategory === 'All' ? menuItems : menuItems.filter(item => item.category === activeCategory);

  return (
    <div ref={ref} className="bg-slate-50 dark:bg-background-dark overflow-x-hidden pt-0">
      {/* Cinematic Hero Section */}
      <header className="relative w-full h-[85vh] overflow-hidden flex items-center justify-center bg-background-dark">
        <div className="absolute inset-0 z-0">
          <motion.img style={{ y: yParallax }} alt="Baker dusting flour on dough in slow motion" className="w-full h-full object-cover opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6SG_V94G3jAOPP14HMgaAc2y6fE1y54l-T9C_E8xI1lee7tUiF_qJrO8kXpExWPXmuyi8aqoigi93IDoakFe7g9F7qjyPpIDuf5zvLq-T9HQck89ar2rvOtJOWbapiebrimVajx_o7xAq0UfknDkv0sjaGWYqUmPn7GOzTdfsSZqTNiJPRV2YdCQ87VO5yahIhmngNShbsfl5AgO4_w5JoN1TT8lQmCaRisnMIBX9YW4YySXwnKh-Uwv2ioOH1i39jT1EUr1eVcIX" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.span initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-block py-1 px-3 border border-white/30 rounded-full text-white/80 text-xs font-serif italic mb-6 backdrop-blur-sm">
            Est. 2024
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white font-bold leading-tight mb-6 drop-shadow-xl">
            Jos’s Morning <span className="text-primary italic">Ritual</span>.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="font-display text-base sm:text-lg md:text-xl text-stone-200 font-light tracking-wide mb-10 max-w-xl mx-auto">
            Hot, fresh, and ready by 7:00 AM. Hand-kneaded dough, patience, and the warmth of a real fire.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-stone-900 hover:bg-stone-100 font-medium py-3 px-8 rounded-full transition-colors transform active:scale-95">
              Order Pickup
            </button>
            <button className="border border-white/40 text-white hover:bg-white/10 backdrop-blur-sm font-medium py-3 px-8 rounded-full transition-colors flex items-center justify-center gap-2 transform active:scale-95">
              <span className="material-icons text-sm">play_circle</span> Watch the Process
            </button>
          </div>
        </div>
        {/* Live Marquee */}
        <div className="absolute bottom-0 w-full bg-primary text-white py-3 overflow-hidden border-t border-white/10 z-20">
          <div className="flex animate-scroll whitespace-nowrap">
            <span className="mx-8 font-medium tracking-wider flex items-center gap-2"><span className="w-2 h-2 bg-white rounded-full animate-pulse"></span> FRESH OUT NOW: SOURDOUGH LOAVES (9 LEFT)</span>
            <span className="mx-8 font-medium tracking-wider opacity-80">•</span>
            <span className="mx-8 font-medium tracking-wider flex items-center gap-2">CINNAMON ROLLS (FRESH TRAY)</span>
            <span className="mx-8 font-medium tracking-wider opacity-80">•</span>
            <span className="mx-8 font-medium tracking-wider flex items-center gap-2">OLIVE FOCACCIA (SELLING FAST)</span>
            <span className="mx-8 font-medium tracking-wider opacity-80">•</span>
            <span className="mx-8 font-medium tracking-wider flex items-center gap-2">CRUSTY BAGUETTES (JUST BAKED)</span>
            <span className="mx-8 font-medium tracking-wider opacity-80">•</span>
            <span className="mx-8 font-medium tracking-wider flex items-center gap-2"><span className="w-2 h-2 bg-white rounded-full animate-pulse"></span> FRESH OUT NOW: SOURDOUGH LOAVES (9 LEFT)</span>
            <span className="mx-8 font-medium tracking-wider opacity-80">•</span>
            <span className="mx-8 font-medium tracking-wider flex items-center gap-2">CINNAMON ROLLS (FRESH TRAY)</span>
          </div>
        </div>
      </header>

      {/* Macro Ingredient Spotlight */}
      <section className="py-24 bg-background-dark relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          {[...Array(20)].map((_, i) => (
            <motion.div key={i} className="absolute w-1 h-1 bg-white rounded-full" initial={{ x: Math.random() * 2000, y: Math.random() * 1000 }} animate={{ y: [null, Math.random() * -500], opacity: [0, 1, 0] }} transition={{ duration: Math.random() * 10 + 5, repeat: Infinity, ease: "linear" }} />
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6 md:space-y-8">
            <span className="text-primary font-bold uppercase tracking-widest text-xs border-b border-primary/30 pb-1">The Essence</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white leading-tight">Grown in Jos, <br/> Perfected in <span className="text-primary italic">Fire.</span></h2>
            <p className="text-stone-400 text-base md:text-lg font-light leading-relaxed">
              Our flour isn't just an ingredient; it's a legacy. Sourced directly from family-run farms in the Plateau, we use 100% organic heritage grains that carry the mineral-rich essence of our soil.
            </p>
            <div className="flex gap-8 md:gap-12">
              <div className="text-center">
                <span className="block text-3xl md:text-4xl font-bold text-white mb-2 font-serif italic">0%</span>
                <span className="text-[10px] uppercase tracking-widest text-stone-500">Additives</span>
              </div>
              <div className="text-center">
                <span className="block text-3xl md:text-4xl font-bold text-white mb-2 font-serif italic">100%</span>
                <span className="text-[10px] uppercase tracking-widest text-stone-500">Love</span>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative max-w-md mx-auto md:max-w-none">
            <div className="aspect-square rounded-full border-2 border-primary/20 p-4 md:p-8 flex items-center justify-center animate-[spin_20s_linear_infinite]">
              <div className="w-full h-full rounded-full border border-primary/40 p-8 md:p-12"></div>
            </div>
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYvf77WkTzo48ZPbJwUbQetCY5GnPm0VNmBHX0NT52ceOmSMsQZHiYsq9NcCufvHkW87mOr6Z7DTgftYf8q1h6AHQM8XNZeZnPrLJoJNhWZvwsRgqxS8vOeeR2JCDpJoMJqdY6l7G-xynMPgrNZX3i-mBcBfzq3YlV640wg5x5BjcnS_G_UbOryxsD1iSmAv08WogejIlucFklzxkv2CI0kfa_ilSMPwqWo6-tr1Z6Wd7aoOqW5gpClZIalrlkkyU4U9a7i9ViNPEd" className="absolute inset-0 m-auto w-3/4 h-3/4 object-cover rounded-full shadow-2xl border-4 border-stone-900" alt="Artisan Grain" />
          </motion.div>
        </div>
      </section>

      {/* Daily Menu Section */}
      <section className="py-24 bg-[#F9F8F6] dark:bg-background-dark relative" id="menu">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h2 className="font-serif text-5xl text-stone-800 dark:text-white font-medium mb-4 italic">Daily Selection</h2>
              <p className="text-stone-500 dark:text-stone-400 max-w-md font-sans leading-relaxed">Our menu changes daily based on seasonal ingredients and our baker's inspiration.</p>
            </div>
            <div className="bg-white dark:bg-stone-900 p-2 rounded-full shadow-sm border border-stone-100 dark:border-stone-800 flex">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${ activeCategory === cat ? 'bg-stone-800 text-white shadow-md' : 'text-stone-500 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800' }`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {displayedItems.map((item, index) => (
              <BakeryMenuItem key={index} title={item.title} price={item.price} desc={item.desc} image={item.image} ingredients={item.ingredients} />
            ))}
          </div>
        </div>
      </section>

      {/* Sensory Journey */}
      <section className="relative min-h-screen flex items-center bg-background-dark py-20 sm:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full opacity-20 lg:opacity-30">
          <motion.img initial={{ scale: 1.2, x: 100 }} whileInView={{ scale: 1, x: 0 }} transition={{ duration: 2 }} src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmprho5MDhuLhOfVgQEqJ-MUQ5tryytP6ON6i2vb0Yoas281JrIx5dNJAucfKXPOOFFUgNLyIFF4GZuXazlicapLXhwWNXITxICQlPYIF5qZZniDLtCUMgTKpW_oYroBsTc7QQXHjG5DrZB2-GZhlhc50WljO155_6CVN9WtYDkI7vb0cr3eUJuULhifa5fu8oEtvjoUZQZig2wEWyhSS28U56WA_hXDK5WNWmWJpkPusDA0D68wwI5alXHGVzZnbZty1Hr66H0pYU" className="w-full h-full object-cover" alt="Wheat details" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl bg-background-dark/80 backdrop-blur-xl p-8 sm:p-12 rounded-[2rem] sm:rounded-[3rem] border border-white/5 shadow-2xl">
            <h3 className="font-serif text-3xl sm:text-5xl text-white mb-6">A Sensory <br/> <span className="text-primary italic">Journey.</span></h3>
            <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed mb-8">
              Close your eyes. Hear the crackle of the crust as it cools. Inhale the deep, toasted aroma of 48-hour fermented dough. Feel the warmth radiating from a loaf that was an hour ago just flour, water, and fire.
            </p>
            <div className="space-y-4 sm:space-y-6">
              <BakerySensoryItem icon="hearing" text="The Crackle of Excellence" />
              <BakerySensoryItem icon="air" text="The Aroma of Tradition" />
              <BakerySensoryItem icon="touch_app" text="The Texture of Hand-Kneaded Quality" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3D Showcase Section */}
      <section className="py-20 bg-stone-100 dark:bg-background-dark border-t border-stone-200 dark:border-stone-800" id="custom-cakes">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative w-full aspect-square bg-gradient-to-br from-white to-stone-200 dark:from-stone-800 dark:to-stone-900 rounded-2xl shadow-inner flex items-center justify-center group cursor-grab active:cursor-grabbing overflow-hidden border border-stone-200 dark:border-stone-700">
              <div className="relative z-10 w-3/4 h-3/4" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
                <img alt="3D Model of Raspberry Velvet Cake" className="w-full h-full object-contain drop-shadow-2xl transition-transform" style={{ animation: 'spin 20s linear infinite' }} src="https://lh3.googleusercontent.com/aida-public/AB6AXuBO0ZKFr0Vq3u2qIGbwTklVk1NRf5LudR3o-9VQzWsVuBWiMBm3gxTiHb7qBh3fYEk0cekwvM0yU9p15-SjoL5kWnxf9mWHV_5_ZsKyOsTlIJOJb_pOnEf4EfjaMOCSP9Tc4-jCtBART-M6O0BPS3TdgOAMoa9e2TH5TVRHZXhD8zWBsvjqg0_T7ylozMovy05X9SAfSvH6TlwHSA4bdT0PmjMrzw3T37Zh7kynz6ox1Xp0FwJrkOXYmvuQBHfAO9m9x-S4TWUZZ3th" />
              </div>
              <div className="absolute bottom-6 left-0 w-full flex justify-center gap-4 z-20 opacity-50 group-hover:opacity-100 transition-opacity">
                <button className="bg-white/80 dark:bg-stone-900/80 p-2 rounded-full shadow-lg hover:text-primary"><span className="material-icons">rotate_left</span></button>
                <button className="bg-white/80 dark:bg-stone-900/80 p-2 rounded-full shadow-lg hover:text-primary"><span className="material-icons">zoom_in</span></button>
                <button className="bg-white/80 dark:bg-stone-900/80 p-2 rounded-full shadow-lg hover:text-primary"><span className="material-icons">rotate_right</span></button>
              </div>
              <div className="absolute top-6 left-6 bg-background-dark text-white text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider shadow-lg flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Live 3D Preview
              </div>
            </div>
            <div>
              <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">Cake of the Week</span>
              <h2 className="font-serif text-3xl sm:text-5xl text-slate-900 dark:text-white font-bold mb-6">The Raspberry Velvet</h2>
              <p className="text-stone-600 dark:text-stone-300 text-base sm:text-lg mb-8 leading-relaxed">
                An architectural marvel of taste. Four layers of rich red velvet sponge, separated by white chocolate ganache and fresh raspberry coulis. Rotate the model to inspect the hand-piped rosette details.
              </p>
              <div className="space-y-4 mb-10">
                <BakeryFeatureItem icon="cake" title="Customizable Inscription" desc="Add your personal message in chocolate." />
                <BakeryFeatureItem icon="local_shipping" title="24h Delivery" desc="Order by 2PM for next-day celebration." />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-primary hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2">
                  Customize & Order <span className="bg-white/20 px-2 py-0.5 rounded text-sm">₦65,000</span>
                </button>
                <button className="border border-stone-300 dark:border-stone-600 hover:bg-stone-100 dark:hover:bg-stone-900 text-slate-900 dark:text-white font-medium py-4 px-8 rounded-lg transition-all">
                  View All Cakes
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Perfect Morning Pairing */}
      <section className="py-32 bg-slate-50 dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="font-serif text-5xl dark:text-white mb-4">The Perfect Pairing</h2>
            <p className="text-stone-500 max-w-xl mx-auto italic">Crafted to complement our loaves. Explore the synergy of flavor.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <BakeryPairingCard title="Espresso & Sourdough" desc="The bright acidity of our African roast balances the deep malty crust of our rustic sourdough." image="https://lh3.googleusercontent.com/aida-public/AB6AXuD9AdQcTD0npuPqeB1MkUOpzNcQ_bmlr55FObJd7BiXSrLsv21dC8nYt7TMtdWa9rUF2xR7Dv7ZjA8VTXqcWt961UQEfZIsle-QgyvY-W_l2FdtGhXgDxcPC7BVvYBlihw6uwo8qGfPj1HFG0LUTU-6-xUllZRQ_sNuGDnDR1ndaGj4QlDrwzLDNnx8NFDEk9xAUKMJzSBMJ4EdWxutNIiONZeeTQDLxyIdSsUImu6287f0OhweUM6HW_lF5K8CBEnwGxwdvygXaPFT" />
            <BakeryPairingCard title="Matcha & Croissant" desc="Earthiness meets buttery layers. Our organic ceremonial matcha brings out the creaminess of the French butter." image="https://lh3.googleusercontent.com/aida-public/AB6AXuCd_TmNBtFRIqwh5bh7iSlOdqRDJSGJVKP1T-3YCFoq-WnNanHo6WbBuRXRvvs8tGQSZK1dZn6I3a6iJHL4byM9r5DC26JFjA7U9s_o2o2ia367BS2gVpc2LHYMwm5e_UPo_r_GPIZKyQHnoR8vXlbdPWdS5z5SZxXQd68-5uWq1QMGTj01wNIGMZG1jB4PPdc9XAUU0ZRvEHw44Sdxiw4c5TdmJpuXivg3eodT1I-xcIyM6u9Br9l8Z00zpX_O4pUx_7yGlsf2Knwr" />
            <BakeryPairingCard title="Cold Brew & Brioche" desc="Smooth, low-acid cold brew cuts through the decadent richness of our glazed brioche buns." image="https://lh3.googleusercontent.com/aida-public/AB6AXuCd_TmNBtFRIqwh5bh7iSlOdqRDJSGJVKP1T-3YCFoq-WnNanHo6WbBuRXRvvs8tGQSZK1dZn6I3a6iJHL4byM9r5DC26JFjA7U9s_o2o2ia367BS2gVpc2LHYMwm5e_UPo_r_GPIZKyQHnoR8vXlbdPWdS5z5SZxXQd68-5uWq1QMGTj01wNIGMZG1jB4PPdc9XAUU0ZRvEHw44Sdxiw4c5TdmJpuXivg3eodT1I-xcIyM6u9Br9l8Z00zpX_O4pUx_7yGlsf2Knwr" />
          </div>
        </div>
      </section>

      {/* Bulk Section */}
      <section className="relative py-24 bg-background-dark text-white overflow-hidden" id="bulk">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBSaC03G9LGtlLe-oNUZwxegwIE1-7jv2yhAJuyo6dO_6QYttyMtQP7sW4o6yg8QPguMOeuEJZxciHyUxmFfJAqa1OfK_usyU0off1TXBcn9h03lNIZjk3G0fM37ROk6WDFFemKqyakawf8CasKlyXpdXBITpOLLe8jxhj09voZ5xCpM6hrBlxQKVx_OhWUcBmqGv3OPGu0igkiKPdNEJ7TdOM-pbDAPxEShm11taIBzawTKcW1MxfCx8GYSifzEG9epvXOqTpDgVEM')" }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-4xl font-bold mb-4">Catering & Bulk Orders</h2>
            <p className="text-stone-400 text-lg">Planning an event? Let us bring the warmth of the bakery to your office, wedding, or party.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <BakeryBulkCard icon="business" title="Corporate" desc="Morning pastry boxes and coffee travelers for the whole team." />
            <BakeryBulkCard icon="celebration" title="Events" desc="Custom dessert tables and tiered cakes for special moments." />
            <BakeryBulkCard icon="local_shipping" title="Wholesale" desc="Partner with us to serve Orient Bakery goods in your cafe." />
          </div>
        </div>
      </section>

      {/* Local Roots & Community */}
      <section className="py-24 bg-slate-50 dark:bg-background-dark border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnDkmQLViId92Xb5EIwK923g9s4vEyP7kRlaoy-PSt-Q5O0XHMLFkbPtmcHArRNuxNfF0tn5WpSr4cadPNsC7b9MCBCn1LdhvH_CGIUR-ktHXG4FsOH1apFckqn7x4tnXxB0QVPJDycxVhTK2kWSOBdfFrldA95svT7P3iGydLOAxlyeiM07nPh86t_cM1naYI95F7GOQFfRaCn9oTK5SHmBnOS5QQKAPj7G81IFRGKK6nMwwdbaX0m0WZrSvRW8-rJDYLC9zGGoUC" className="w-full h-64 object-cover rounded-[2rem] shadow-xl" alt="Local farm" />
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8jmr4oztTQ8QwKXjjb4cQPlKaOB4R-eWMBq8_Csa1ENWeji-HcmhbUesMcE8hbj-0Ax3JZhTLc0GyCOeRcwrbYzTViEqywn3R_2-SthdRopZVMVTNZ1WqnQBr8-LK7OnNKYx4rWuj8_szD_q6-mKdt56d1BeZHSURh5EXpjkKwfe7LNALEI6xpoF0MENRWl-MIwX0My0xHjChEy7JhmtHGr-AYk4l1f6dCEOxq-0Ep04yKLYygUtXUhb5RozBayayNVk-Lug0tPjj" className="w-full h-64 object-cover rounded-[2rem] shadow-xl mt-12" alt="Artisan hands" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 lg:order-2 space-y-6 md:space-y-8">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl dark:text-white leading-tight">Grown in Jos, <br/> Fed by <span className="text-primary italic">Community.</span></h2>
            <p className="text-stone-500 text-base md:text-lg leading-relaxed">
              We aren't just a bakery; we are a hub for local agriculture. By partnering directly with Plateau farmers, we ensure our wheat travels less and tastes like home. Every loaf purchased supports the growth of our beautiful state.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-background-dark dark:bg-white text-white dark:text-stone-900 rounded-full font-bold text-sm hover:opacity-80 transition-all">Meet Our Farmers</button>
              <button className="px-8 py-3 border border-stone-300 rounded-full font-bold text-sm hover:bg-stone-100 transition-all dark:text-white">Our Impact</button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export const BakeryNav: React.FC<{ navHidden: boolean, currentView: string, setView: (v: 'home' | 'architect' | 'wholesale' | 'story') => void, localTheme?: 'dark'|'light', toggleLocalTheme?: () => void }> = ({ navHidden, currentView, setView, localTheme, toggleLocalTheme }) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: navHidden ? -100 : 0 }}
      transition={{ duration: navHidden ? 0.1 : 0.4, ease: "easeOut" }}
      className="sticky w-full z-40 top-12 sm:top-14 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-stone-200 dark:border-white/10 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <div className="flex-1"></div>
          <div className="flex items-center justify-center space-x-4 sm:space-x-8 overflow-x-auto no-scrollbar px-4">
            {[
              { id: 'home', label: 'Bakery' },
              { id: 'architect', label: 'The Architect' },
              { id: 'wholesale', label: 'Wholesale' },
              { id: 'story', label: 'Our Story' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setView(item.id as any);
                  document.getElementById('main-scroll-container')?.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${
                  currentView === item.id ? 'text-primary' : 'text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex-1 flex justify-end">
            {toggleLocalTheme && (
              <button onClick={toggleLocalTheme} className="p-1.5 rounded-full bg-stone-200 dark:bg-white/10 hover:bg-stone-300 dark:hover:bg-white/20 transition-colors text-stone-600 dark:text-stone-300">
                <span className="material-icons text-sm">{localTheme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const BakeryApp: React.FC<{ currentView: 'home' | 'architect' | 'wholesale' | 'story' }> = ({ currentView }) => {
  return (
    <div>
      {currentView === 'home' && <BakeryHome />}
      {currentView === 'architect' && <Architect />}
      {currentView === 'wholesale' && <Wholesale />}
      {currentView === 'story' && <Story />}
    </div>
  );
};
