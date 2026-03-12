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
                <div className={`w-full h-32 rounded-lg ${bgInput} border ${isDarkMode ? 'border-white/10' : 'border-gray-200'} overflow-hidden relative group cursor-pointer bg-orange-500/10 flex items-center justify-center`}>
                    <div className="text-center">
                        <ShoppingCart size={24} className="text-orange-500/30 mx-auto mb-2" />
                        <p className="text-[10px] font-black uppercase tracking-tighter text-orange-500/50">Market Suite Live</p>
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
            <div className={`p-5 ${bgFooter} border-t ${borderCol} space-y-4 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] transition-colors duration-300`}>
                {/* Global Save */}
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-full flex items-center justify-center gap-2 p-3.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold text-sm transition-all shadow-[0_4px_14px_rgba(249,115,22,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
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
