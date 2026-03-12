import React from "react";
import { motion } from "framer-motion";
import { 
  Package, ReceiptText, Home, MenuSquare, Handshake, 
  BookOpen, Settings as SettingsIcon, Zap, Save, Eye, Loader2
} from "lucide-react";

interface BakerySidebarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
  cmsData: any;
  goldenHour: boolean;
  setGoldenHour: (val: boolean) => void;
  isSaving: boolean;
  handleSave: () => void;
  isDarkMode: boolean;
}

export default function BakerySidebar({
  activeTab, 
  setActiveTab, 
  cmsData, 
  goldenHour, 
  setGoldenHour, 
  isSaving, 
  handleSave, 
  isDarkMode 
}: BakerySidebarProps) {
  
  const bgSidebar = isDarkMode ? "bg-[#121212]/80" : "bg-white/90";
  const bgFooter = isDarkMode ? "bg-[#0d0d0d]" : "bg-white";
  const borderCol = isDarkMode ? "border-white/5" : "border-gray-200";
  const bgInput = isDarkMode ? "bg-[#050505]" : "bg-white";

  return (
    <div className={`w-full h-full ${bgSidebar} backdrop-blur-xl flex flex-col transition-all duration-300`}>
      
      {/* Live Preview Window Mock */}
      <div className={`p-5 border-b ${borderCol}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-bold flex items-center gap-1.5">
            <Eye size={12} /> Live Preview
          </span>
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
          </div>
        </div>
        <div className={`w-full h-28 rounded-xl ${bgInput} border ${isDarkMode ? 'border-white/[0.05]' : 'border-slate-100'} overflow-hidden relative group cursor-pointer bg-black/5`}>
          <img src={cmsData.home.heroImage} alt="Preview" className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
            <h4 className="text-white text-[10px] font-bold font-serif tracking-tight">{cmsData.home.heroTitle}</h4>
            <p className="text-white/40 text-[8px] truncate mt-0.5 uppercase tracking-widest font-bold">Storefront Live</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
        <NavTab id="inventory" icon={<Package size={18} />} label="Inventory Heatmap" activeTab={activeTab} setActiveTab={setActiveTab} isDarkMode={isDarkMode} />
        <NavTab id="orders" icon={<ReceiptText size={18} />} label="Live Orders" activeTab={activeTab} setActiveTab={setActiveTab} isDarkMode={isDarkMode} />
        
        <div className={`my-3 border-t ${borderCol} pt-3`}>
          <span className={`text-[10px] uppercase font-bold ${isDarkMode ? 'text-white/30' : 'text-slate-400'} tracking-widest px-4 mb-2 block`}>Content Pages</span>
          <NavTab id="home" icon={<Home size={18} />} label="Home Page" activeTab={activeTab} setActiveTab={setActiveTab} isDarkMode={isDarkMode} />
          <NavTab id="menu" icon={<MenuSquare size={18} />} label="Menu Management" activeTab={activeTab} setActiveTab={setActiveTab} isDarkMode={isDarkMode} />
          <NavTab id="wholesale" icon={<Handshake size={18} />} label="Wholesale Portal" activeTab={activeTab} setActiveTab={setActiveTab} isDarkMode={isDarkMode} />
          <NavTab id="story" icon={<BookOpen size={18} />} label="Our Story Editor" activeTab={activeTab} setActiveTab={setActiveTab} isDarkMode={isDarkMode} />
        </div>

        <div className={`my-3 border-t ${borderCol} pt-3`}>
          <NavTab id="settings" icon={<SettingsIcon size={18} />} label="SEO & Settings" activeTab={activeTab} setActiveTab={setActiveTab} isDarkMode={isDarkMode} />
        </div>
      </div>

      {/* Sticky Action Footer */}
      <div className={`p-5 ${bgFooter} border-t ${borderCol} space-y-4 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] transition-colors duration-300`}>
        {/* Golden Hour Toggle */}
        <button 
          onClick={() => setGoldenHour(!goldenHour)}
          className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${
            goldenHour 
              ? "bg-[#d4af37]/10 border-[#d4af37]/50 shadow-[0_0_20px_rgba(212,175,55,0.15)]" 
              : `${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`
          }`}
        >
          <div className="flex items-center gap-3">
            <Zap size={18} className={goldenHour ? "text-[#d4af37]" : (isDarkMode ? "text-white/40" : "text-slate-400")} />
            <div className="text-left">
              <span className={`block text-xs font-bold ${goldenHour ? "text-[#d4af37]" : (isDarkMode ? "text-white/70" : "text-slate-700")}`}>Golden Hour Mode</span>
              <span className={`block text-[9px] ${isDarkMode ? 'text-white/40' : 'text-slate-400'} uppercase tracking-wider`}>30% Off Flash Sale</span>
            </div>
          </div>
          <div className={`w-10 h-5 rounded-full p-1 transition-colors ${goldenHour ? 'bg-[#d4af37]' : (isDarkMode ? 'bg-white/10' : 'bg-gray-200')}`}>
            <div className={`w-3 h-3 rounded-full bg-white transition-transform ${goldenHour ? 'translate-x-5' : 'translate-x-0'}`} />
          </div>
        </button>

        {/* Global Save */}
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="w-full flex items-center justify-center gap-2.5 p-3.5 bg-[#d4af37] hover:bg-[#c29f2f] text-black rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {isSaving ? "Syncing..." : "Commit Changes"}
        </button>
      </div>
    </div>
  );
}

function NavTab({ id, icon, label, activeTab, setActiveTab, isDarkMode }: any) {
  const isActive = activeTab === id;
  const activeBg = isDarkMode ? "bg-white/10" : "bg-gray-100";
  const activeText = isDarkMode ? "text-white" : "text-slate-900";
  const inactiveText = isDarkMode ? "text-white/50" : "text-slate-500";
  const hoverBg = isDarkMode ? "hover:bg-white/5" : "hover:bg-gray-50";

  return (
    <button 
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 relative group overflow-hidden ${
        isActive ? `${activeBg} ${activeText}` : `${inactiveText} ${hoverBg} hover:${activeText}`
      }`}
    >
      {isActive && (
        <motion.div layoutId="bakerySidebarTab" className="absolute left-0 top-0 bottom-0 w-1 bg-[#d4af37]" />
      )}
      <span className={`${isActive ? "text-[#d4af37]" : `${isDarkMode ? 'text-white/20' : 'text-slate-300'} group-hover:text-[#d4af37]`} transition-colors`}>{icon}</span>
      <span className="font-bold text-sm tracking-tight">{label}</span>
    </button>
  );
}
