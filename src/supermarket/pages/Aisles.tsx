import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Apple,
  Laptop,
  Zap,
  Sofa,
  Shirt,
  HeartPulse,
  Baby,
  BookOpen,
  ShoppingBag,
  Dumbbell,
  Car,
  Coffee,
} from 'lucide-react';
import { useMarketProducts } from '../hooks/useMarketProducts';

interface Props {
  onNavigate: (page: any) => void;
}

const staticCategories = [
  { name: "Groceries", id: "groceries", icon: <Apple size={32} strokeWidth={1.5} />, active: true, color: "text-green-500 border-green-200 bg-green-50" },
  { name: "Electronics", id: "electronics", icon: <Laptop size={32} strokeWidth={1.5} />, color: "text-blue-500 border-blue-200 bg-blue-50" },
  { name: "Appliances", id: "appliances", icon: <Zap size={32} strokeWidth={1.5} />, color: "text-yellow-500 border-yellow-200 bg-yellow-50" },
  { name: "Furniture", id: "furniture", icon: <Sofa size={32} strokeWidth={1.5} />, color: "text-amber-600 border-amber-200 bg-amber-50" },
  { name: "Fashion", id: "fashion", icon: <Shirt size={32} strokeWidth={1.5} />, color: "text-pink-500 border-pink-200 bg-pink-50" },
  { name: "Health", id: "health", icon: <HeartPulse size={32} strokeWidth={1.5} />, color: "text-rose-500 border-rose-200 bg-rose-50" },
  { name: "Baby & Kids", id: "baby", icon: <Baby size={32} strokeWidth={1.5} />, color: "text-indigo-500 border-indigo-200 bg-indigo-50" },
  { name: "Books & Stationery", id: "books", icon: <BookOpen size={32} strokeWidth={1.5} />, color: "text-cyan-500 border-cyan-200 bg-cyan-50" },
  { name: "Household", id: "household", icon: <ShoppingBag size={32} strokeWidth={1.5} />, color: "text-teal-500 border-teal-200 bg-teal-50" },
  { name: "Sports", id: "sports", icon: <Dumbbell size={32} strokeWidth={1.5} />, color: "text-[var(--color-accent-light)] border-orange-200 bg-orange-50" },
  { name: "Hardware", id: "hardware", icon: <Car size={32} strokeWidth={1.5} />, color: "text-gray-500 border-gray-200 bg-gray-50" },
  { name: "Beverages", id: "beverages", icon: <Coffee size={32} strokeWidth={1.5} />, color: "text-stone-500 border-stone-200 bg-stone-50" },
];

const containerAnim = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemAnim = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 50 } as any }
};

const Aisles: React.FC<Props> = ({ onNavigate }) => {
  const { products } = useMarketProducts();

  const displayCategories = useMemo(() => {
    const dbCategories = Array.from(new Set(products.map(p => p.category)));

    // Sort logic to prioritize DB categories while falling back to static ones initially
    if (dbCategories.length === 0) return staticCategories;

    return dbCategories.map(catName => {
      const matched = staticCategories.find(c => c.name.toLowerCase() === catName.toLowerCase());
      if (matched) return { ...matched, name: catName }; // Ensure exact case from DB

      // Fallback for new categories created in CMS
      return {
        name: catName,
        id: catName.toLowerCase().replace(/\s+/g, '-'),
        icon: <ShoppingBag size={32} strokeWidth={1.5} />,
        color: "text-slate-500 border-slate-200 bg-slate-50"
      };
    });
  }, [products]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12 transition-colors duration-300 pt-[68px] mt-10">
      <div className="max-w-[1600px] mx-auto">
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={() => onNavigate('Home')}
          className="mb-8 text-[var(--color-accent-light)] flex items-center gap-2 font-bold hover:underline"
        >
          <span className="material-icons">arrow_back</span> Back to Storefront
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center sm:text-left"
        >
          <h1 className="text-4xl sm:text-5xl font-black mb-3 text-slate-900 dark:text-white tracking-tight">Explore Departments</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl">Browse our extensive catalogue spanning everything from fresh groceries to the latest high-end electronics.</p>
        </motion.div>

        <motion.div
          variants={containerAnim}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6"
        >
          {displayCategories.map((cat) => (
            <motion.div
              key={cat.id}
              variants={itemAnim}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const name = cat.name.toLowerCase();
                if (name === 'groceries') {
                  onNavigate('Produce');
                } else if (name === 'electronics') {
                  onNavigate('Home#electronics');
                } else if (name === 'appliances') {
                  onNavigate('Home#appliances');
                } else if (name === 'furniture') {
                  onNavigate('Home#furniture');
                } else if (name === 'fashion') {
                  onNavigate('Home#fashion');
                } else if (name === 'health') {
                  onNavigate('Home#health');
                } else if (name.includes('baby')) {
                  onNavigate('Home#baby');
                } else {
                  onNavigate('Home');
                }
              }}
              className="group relative flex flex-col items-center justify-center bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-800 transition-all duration-300 cursor-pointer"
            >
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 shadow-inner overflow-hidden ${cat.color || "text-slate-500 bg-slate-100 border-slate-200"}`}>
                <div className="relative z-10">
                  {cat.icon}
                </div>
              </div>

              <h2 className="text-sm sm:text-base font-bold text-slate-700 dark:text-slate-200 text-center leading-tight group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                {cat.name}
              </h2>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Aisles;