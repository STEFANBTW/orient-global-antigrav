import React from "react";
import { motion } from "framer-motion";
import {
    LayoutDashboard, ShoppingCart, Truck, Box,
    Tag, MessageSquare, FolderOpen, Save, Eye, Loader2
} from "lucide-react";

interface MarketSidebarProps {
    activeTab: string;
    setActiveTab: (id: string) => void;
    cmsData: any;
    isSaving: boolean;
    handleSave: () => void;
    isDarkMode: boolean;
}

export default function MarketSidebar({
    activeTab,
    setActiveTab,
    cmsData,
    isSaving,
    handleSave,
    isDarkMode
}: MarketSidebarProps) {

    const bgSidebar = isDarkMode ? "bg-[#121212]/80" : "bg-white/90";
    const bgFooter = isDarkMode ? "bg-[#0d0d0d]" : "bg-white";
    const borderCol = isDarkMode ? "border-white/5" : "border-gray-200";
    const bgInput = isDarkMode ? "bg-[#050505]" : "bg-white";

    const modules = [
        { id: 'dashboard', label: 'Operations Overview', icon: <LayoutDashboard size={18} /> },
        { id: 'orders', label: 'Active Pipeline', icon: <ShoppingCart size={18} /> },
        { id: 'deliveries', label: 'Logistics Center', icon: <Truck size={18} /> },
        { id: 'inventory', label: 'Stock Master', icon: <Box size={18} /> },
        { id: 'promotions', label: 'Flash Sales', icon: <Tag size={18} /> },
        { id: 'crm', label: 'Support & CRM', icon: <MessageSquare size={18} /> },
        { id: 'categories', label: 'Catalog Design', icon: <FolderOpen size={18} /> },
    ];

    return (
        <div className={`w-full h-full ${bgSidebar} backdrop-blur-xl flex flex-col transition-all duration-300`}>

            {/* Live Preview Window Mock */}
            <div className={`p-5 border-b ${borderCol}`}>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-widest text-orange-500 font-bold flex items-center gap-1.5">
                        <Eye size={12} /> Live Storefront
                    </span>
                    <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                        <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                    </div>
                </div>
                <div className={`w-full h-28 rounded-xl ${bgInput} border ${isDarkMode ? 'border-white/[0.05]' : 'border-slate-100'} overflow-hidden relative group cursor-pointer bg-orange-500/[0.03] flex items-center justify-center transition-all hover:bg-orange-500/[0.06]`}>
                    <div className="text-center">
                        <ShoppingCart size={20} className="text-orange-500/20 mx-auto mb-2" />
                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-orange-500/40">Market Suite Live</p>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
                <span className={`text-[10px] uppercase font-bold ${isDarkMode ? 'text-white/30' : 'text-slate-400'} tracking-widest px-4 mb-2 block`}>Operations Hub</span>
                {modules.map((mod) => (
                    <NavTab
                        key={mod.id}
                        id={mod.id}
                        icon={mod.icon}
                        label={mod.label}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        isDarkMode={isDarkMode}
                    />
                ))}
            </div>

            {/* Sticky Action Footer */}
            <div className={`p-6 ${bgFooter} border-t ${borderCol} space-y-4 transition-colors duration-300`}>
                {/* Global Save */}
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-full flex items-center justify-center gap-2.5 p-3.5 bg-orange-500 hover:bg-orange-400 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    {isSaving ? "Syncing Modules..." : "Commit Site Updates"}
                </button>
            </div>
        </div>
    );
}

function NavTab({ id, icon, label, activeTab, setActiveTab, isDarkMode }: any) {
    const isActive = activeTab === id;
    const activeBg = isDarkMode ? "bg-orange-500/10" : "bg-orange-50";
    const activeText = isDarkMode ? "text-orange-400" : "text-orange-700";
    const inactiveText = isDarkMode ? "text-white/50" : "text-slate-500";
    const hoverBg = isDarkMode ? "hover:bg-white/5" : "hover:bg-gray-50";

    return (
        <button
            onClick={() => setActiveTab(id)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 relative group overflow-hidden ${isActive ? `${activeBg} ${activeText}` : `${inactiveText} ${hoverBg} hover:${activeText}`
                }`}
        >
            {isActive && (
                <motion.div layoutId="marketSidebarTab" className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500" />
            )}
            <span className={`${isActive ? "text-orange-500" : `${isDarkMode ? 'text-white/30' : 'text-slate-300'} group-hover:text-orange-500`} transition-colors`}>{icon}</span>
            <span className="font-semibold text-sm tracking-wide">{label}</span>
        </button>
    );
}
