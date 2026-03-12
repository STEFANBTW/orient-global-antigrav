import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, LineChart, Activity, Server,
  Croissant, ShoppingCart, UtensilsCrossed, Gamepad2,
  Droplets, Martini, MenuSquare, ChevronRight,
  Database, Users, Calendar, Map, ListChecks, Edit3,
  ChevronLeft, ArrowUpRight, ArrowDownRight, CheckCircle2,
  Clock, HelpCircle, PieChart, Box, ZoomIn, ZoomOut,
  Moon, Sun, MoreHorizontal, Package, ReceiptText, Home,
  Handshake, BookOpen, Zap, Save, AlertTriangle, XCircle,
  Image as ImageIcon, Type, Link as LinkIcon, AlignLeft, User, Video, Eye, Loader2
} from "lucide-react";
import BakeryCms from "./BakeryCms";
import BakerySidebar from "./BakerySidebar";
import MarketCms from "./MarketCms";
import MarketSidebar from "./MarketSidebar";
import { cmsApi, DEFAULT_BAKERY_CMS } from "../../lib/bakeryCmsData";

export default function AdminDashboard({ onCancel }: { onCancel: () => void }) {
  // --- GLOBAL DASHBOARD STATE ---
  const [activeGlobal, setActiveGlobal] = useState("command");
  const [activeDivision, setActiveDivision] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState("overview");
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // --- BAKERY CMS LIFTED STATE ---
  const [cmsData, setCmsData] = useState<any>(DEFAULT_BAKERY_CMS);
  const [isSaving, setIsSaving] = useState(false);
  const [goldenHour, setGoldenHour] = useState(false);
  const [holidayPreset, setHolidayPreset] = useState("default");
  const [initialFetchDone, setInitialFetchDone] = useState(false);

  // Initialize data on mount
  React.useEffect(() => {
    const initData = async () => {
      const data = await cmsApi.getBakeryData();
      if (data) {
        setCmsData(data);
        setGoldenHour(data.settings?.goldenHour || false);
        setHolidayPreset(data.settings?.holidayPreset || "default");
      }
      setInitialFetchDone(true);
    };
    initData();
  }, []);

  const handleBakerySave = async () => {
    setIsSaving(true);
    const updatedData = {
      ...cmsData,
      settings: {
        ...cmsData.settings,
        goldenHour,
        holidayPreset
      }
    };
    
    try {
      const success = await cmsApi.saveBakeryData(updatedData);
      if (success) {
        // Option: show toast or success message
      }
    } catch (error) {
      console.error("Failed to save bakery data:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // --- CONGLOMERATE DATA MAPPING ---
  const divisionData: any = {
    supermarket: {
      name: "Supermarket",
      icon: <ShoppingCart size={18} />,
      theme: "text-emerald-500",
      color: "#10b981",
      shared: [],
      pages: [
        { id: "market-dashboard", name: "Operations Overview", metric: "Real-time" },
        { id: "market-inventory", name: "Stock Master", metric: "Active" },
        { id: "market-orders", name: "Order Pipeline", metric: "Live" }
      ]
    },
    bakery: {
      name: "The Bakery",
      icon: <Croissant size={18} />,
      theme: "text-yellow-500",
      color: "#eab308",
      shared: [
        { id: "bakery-inventory", name: "Inventory Heatmap", icon: <Package size={14} /> },
        { id: "bakery-orders", name: "Live Order Monitor", icon: <ReceiptText size={14} /> }
      ],
      pages: [
        { id: "bakery-home", name: "Home Page Editor", metric: "Active" },
        { id: "bakery-menu", name: "Menu Management", metric: "45 Items" },
        { id: "bakery-wholesale", name: "Wholesale Portal", metric: "25% Off" }
      ]
    },
    restaurant: {
      name: "Restaurant",
      icon: <UtensilsCrossed size={18} />,
      theme: "text-pink-500",
      color: "#ec4899",
      shared: [{ id: "rest-menu", name: "Menu DB", icon: <Database size={14} /> }],
      pages: [{ id: "rest-home", name: "Landing Hero", metric: "980 views" }]
    },
    games: {
      name: "Games Arena",
      icon: <Gamepad2 size={18} />,
      theme: "text-purple-500",
      color: "#a855f7",
      shared: [{ id: "game-seats", name: "Seat Manager", icon: <Map size={14} /> }],
      pages: [{ id: "game-home", name: "Landing Hero", metric: "Dark Mode On" }]
    },
    water: {
      name: "Water Factory",
      icon: <Droplets size={18} />,
      theme: "text-green-500",
      color: "#22c55e",
      shared: [{ id: "water-logistics", name: "Routes", icon: <Map size={14} /> }],
      pages: [{ id: "water-home", name: "Landing Hero", metric: "2.1k views" }]
    },
    lounge: {
      name: "VIP Lounge",
      icon: <Martini size={18} />,
      theme: "text-orange-500",
      color: "#f97316",
      shared: [{ id: "lounge-menu", name: "Drink DB", icon: <Database size={14} /> }],
      pages: [{ id: "lounge-home", name: "Landing Hero", metric: "85% Cap" }]
    }
  };

  // --- NAVIGATION HANDLERS ---
  const handleGlobalClick = (id: string) => {
    setActiveGlobal(id);
    setActiveDivision(null);
    setActiveItem(id);
  };

  const handleDivisionClick = (id: string) => {
    setActiveDivision(id);
    setActiveGlobal(null);
    setActiveItem(divisionData[id].pages[0].id);
  };

  const currentDivData = activeDivision ? divisionData[activeDivision] : null;

  // --- DYNAMIC LAYOUT CLASSES ---
  const sidebarWidth = isSidebarExpanded ? "w-72" : "w-24";
  const panelLeft = isSidebarExpanded ? "left-72" : "left-24";
  const mainPadding = activeDivision
    ? (isSidebarExpanded ? "pl-[38rem]" : "pl-[28rem]")
    : (isSidebarExpanded ? "pl-72" : "pl-24");

  const bgMain = isDarkMode ? "bg-[#0f1115]" : "bg-[#f8fafc]";
  const bgPanel = isDarkMode ? "bg-[#1e232b]" : "bg-white";
  const textMain = isDarkMode ? "text-slate-100" : "text-slate-800";
  const textMuted = isDarkMode ? "text-slate-400" : "text-slate-500";
  const borderCol = isDarkMode ? "border-slate-800" : "border-gray-200";

  return (
    <div className={`flex h-screen w-full ${bgMain} overflow-hidden font-sans ${textMain} transition-colors duration-300`}>

      {/* 1. MASTER SHELL: PRIMARY LEFT SIDEBAR */}
      <div className={`fixed top-0 left-0 h-full ${bgMain} flex flex-col py-8 z-50 border-r ${borderCol} justify-between transition-all duration-300 ease-in-out ${sidebarWidth}`}>
        <div className="flex flex-col gap-8 w-full">
          <div className={`flex items-center gap-3 px-6 cursor-pointer group`} onClick={onCancel}>
            <div className="w-10 h-10 shrink-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center font-bold text-white text-lg shadow-lg group-hover:scale-105 transition-transform">
              OG
            </div>
            {isSidebarExpanded && <span className={`font-bold tracking-tight text-lg whitespace-nowrap ${textMain}`}>Orient Global</span>}
          </div>

          <div className="flex flex-col gap-2 w-full px-4">
            <SidebarIcon icon={<LayoutDashboard size={24} />} label="Overview" active={activeGlobal === "command"} isExpanded={isSidebarExpanded} isDarkMode={isDarkMode} onClick={() => handleGlobalClick("command")} />
            <SidebarIcon icon={<LineChart size={24} />} label="Revenue" active={activeGlobal === "finance"} isExpanded={isSidebarExpanded} isDarkMode={isDarkMode} onClick={() => handleGlobalClick("finance")} />
            <SidebarIcon icon={<Activity size={24} />} label="Traffic" active={activeGlobal === "traffic"} isExpanded={isSidebarExpanded} isDarkMode={isDarkMode} onClick={() => handleGlobalClick("traffic")} />
            <SidebarIcon icon={<Server size={24} />} label="Systems" active={activeGlobal === "health"} isExpanded={isSidebarExpanded} isDarkMode={isDarkMode} onClick={() => handleGlobalClick("health")} />
          </div>
        </div>

        <div className="flex flex-col w-full px-3 gap-6">
          <div className="space-y-2">
            {isSidebarExpanded && <span className={`text-[10px] uppercase font-bold ${textMuted} tracking-[0.2em] px-6 mb-4 block opacity-50`}>Divisions</span>}
            <div className="flex flex-col gap-2 w-full px-4">
              {Object.keys(divisionData).map(key => (
                <SidebarIcon
                  key={key} icon={React.cloneElement(divisionData[key].icon, { size: 22 })} label={divisionData[key].name}
                  active={activeDivision === key} isExpanded={isSidebarExpanded} isDarkMode={isDarkMode}
                  onClick={() => handleDivisionClick(key)}
                />
              ))}
            </div>
          </div>

          <button onClick={toggleTheme} className={`p-4 rounded-xl flex items-center ${isSidebarExpanded ? 'justify-start px-6 gap-5' : 'justify-center'} transition-all ${isDarkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-gray-100 text-slate-500 hover:text-slate-900'}`}>
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            {isSidebarExpanded && <span className="text-sm font-bold">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>
        </div>

        <button onClick={() => setIsSidebarExpanded(!isSidebarExpanded)} className={`absolute -right-3.5 top-12 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-gray-200 text-slate-600'} border rounded-full p-1.5 hover:bg-orange-500 hover:text-white transition-all z-50 shadow-lg`}>
          {isSidebarExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      {/* 2. THE CONTEXT SWITCH: SECONDARY SLIDING PANEL */}
      <div className={`fixed top-0 h-full ${bgPanel} border-r ${borderCol} shadow-2xl z-40 w-80 transform transition-all duration-300 ease-out flex flex-col ${panelLeft} ${activeDivision ? "translate-x-0" : "-translate-x-full"}`}>
        {activeDivision === 'bakery' ? (
          <BakerySidebar
            activeTab={activeItem.startsWith('bakery-') ? activeItem.replace('bakery-', '') : activeItem}
            setActiveTab={(id) => setActiveItem(`bakery-${id}`)}
            cmsData={cmsData}
            goldenHour={goldenHour}
            setGoldenHour={setGoldenHour}
            isSaving={isSaving}
            handleSave={handleBakerySave}
            isDarkMode={isDarkMode}
          />
        ) : activeDivision === 'supermarket' ? (
          <MarketSidebar
            activeTab={activeItem.startsWith('market-') ? activeItem.replace('market-', '') : activeItem}
            setActiveTab={(id) => setActiveItem(`market-${id}`)}
            cmsData={{}} // Market data managed via separate hooks for now
            isSaving={isSaving}
            handleSave={() => {
              setIsSaving(true);
              setTimeout(() => setIsSaving(false), 1500);
            }}
            isDarkMode={isDarkMode}
          />
        ) : currentDivData && (
          <>
            <div className={`p-6 border-b ${borderCol} flex items-center gap-4`}>
              <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-slate-800' : 'bg-gray-100'} ${currentDivData.theme}`}>
                {currentDivData.icon}
              </div>
              <div>
                <h2 className="text-sm font-black leading-tight tracking-tight">{currentDivData.name}</h2>
                <p className={`text-[10px] ${textMuted} font-black uppercase tracking-widest`}>CMS Controls</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pb-10 custom-scrollbar" data-lenis-prevent>
              <div className="p-6">
                <h3 className={`text-[10px] font-black ${textMuted} uppercase tracking-widest mb-4 px-1`}>Maintenance</h3>
                <div className="flex flex-col gap-1">
                  {currentDivData.shared.map((item: any) => (
                    <button key={item.id} onClick={() => setActiveItem(item.id)} className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all ${activeItem === item.id ? (isDarkMode ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 'bg-orange-500 text-white shadow-xl shadow-orange-500/20') : `${textMuted} ${isDarkMode ? 'hover:bg-slate-800 hover:text-slate-200' : 'hover:bg-gray-100 hover:text-slate-900'}`}`}>
                      {item.icon} {item.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 pt-0">
                <h3 className={`text-[10px] font-black ${textMuted} uppercase tracking-widest mb-4 px-1`}>Direct Edits</h3>
                <div className="flex flex-col gap-3">
                  {currentDivData.pages.map((page: any) => (
                    <button key={page.id} onClick={() => setActiveItem(page.id)} className={`flex flex-col w-full text-left p-4 rounded-xl border transition-all ${activeItem === page.id ? (isDarkMode ? 'bg-orange-900/10 border-orange-500/30 shadow-lg' : 'bg-orange-50 border-orange-200 shadow-md') : `${isDarkMode ? 'bg-[#0f1115]/50 border-slate-800 hover:border-slate-600' : 'bg-white border-gray-100 hover:border-gray-200'}`}`}>
                      <div className="flex items-center justify-between w-full mb-2">
                        <span className={`text-xs font-black ${activeItem === page.id ? (isDarkMode ? 'text-orange-400' : 'text-orange-900') : textMain}`}>{page.name}</span>
                        <ChevronRight size={14} className={activeItem === page.id ? 'text-orange-500' : textMuted} />
                      </div>
                      <span className={`text-[10px] font-black inline-block px-2 py-1 rounded-md border ${isDarkMode ? 'bg-slate-800/50 border-slate-700 text-slate-400' : 'bg-gray-50 border-gray-200 text-slate-500'}`}>{page.metric}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* 3. MAIN CONTENT AREA */}
      <div className={`flex-1 h-full overflow-y-auto transition-all duration-300 relative z-30 ${mainPadding} ${activeDivision === 'bakery' ? (isDarkMode ? 'bg-[#0a0a0a]' : 'bg-[#f8fafc]') : ''}`} data-lenis-prevent>
        {/* If Bakery, show the specialized BakeryCms component */}
        {activeDivision === 'bakery' ? (
          <BakeryCms
            activeItem={activeItem}
            isDarkMode={isDarkMode}
            cmsData={cmsData}
            setCmsData={setCmsData}
            holidayPreset={holidayPreset}
            setHolidayPreset={setHolidayPreset}
          />
        ) : activeDivision === 'supermarket' ? (
          <MarketCms
            activeTab={activeItem.startsWith('market-') ? activeItem.replace('market-', '') : activeItem}
            isDarkMode={isDarkMode}
          />
        ) : (
          <div className="p-12 max-w-7xl mx-auto pt-16">
            <div className={`flex justify-between items-end mb-10 pb-6 border-b ${borderCol}`}>
              <div>
                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg mb-4 inline-block ${isDarkMode ? 'text-orange-400 bg-orange-500/10' : 'text-orange-700 bg-orange-100'}`}>
                  {activeGlobal ? "System Intelligence" : "Division Content Control"}
                </span>
                <h1 className="text-4xl font-black tracking-tight capitalize leading-none">
                  {activeGlobal === "command" && "Executive Dashboard"}
                  {activeGlobal === "finance" && "Revenue Streams"}
                  {activeGlobal === "traffic" && "Visibility Map"}
                  {activeGlobal === "health" && "Node Performance"}
                  {!activeGlobal && activeItem.replace('-', ' ')}
                </h1>
              </div>
              {!activeGlobal && (
                <button className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white text-xs font-black rounded-xl shadow-2xl hover:bg-orange-500 hover:scale-105 active:scale-95 transition-all">
                  <Edit3 size={16} /> Update Live Site
                </button>
              )}
            </div>

            {activeGlobal === "command" && <CommandCenterView isDarkMode={isDarkMode} divisions={divisionData} />}
            {activeGlobal === "finance" && <FinanceView isDarkMode={isDarkMode} />}
            {activeGlobal === "traffic" && <TrafficView isDarkMode={isDarkMode} />}
            {activeGlobal === "health" && <HealthView isDarkMode={isDarkMode} />}
            {!activeGlobal && activeDivision && <PlaceholderView isDarkMode={isDarkMode} title={activeItem.replace('-', ' ')} icon={<MenuSquare size={48} />} />}
          </div>
        )}
      </div>
    </div>
  );
}

// SHARED BUTTON COMPONENT
function SidebarIcon({ icon, label, active, isExpanded, isDarkMode, onClick }: any) {
  const activeClass = active
    ? (isDarkMode ? "bg-white/[0.03] text-white shadow-sm ring-1 ring-white/10" : "bg-white text-orange-600 shadow-sm border border-slate-100")
    : (isDarkMode ? "text-slate-500 hover:bg-white/[0.02] hover:text-slate-200" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800");

  return (
    <div className="group relative w-full flex justify-center px-1">
      <button onClick={onClick} className={`p-3.5 rounded-xl transition-all w-full flex items-center gap-4 ${isExpanded ? "px-5" : "justify-center"} ${activeClass}`}>
        <div className={`shrink-0 ${active ? (isDarkMode ? 'text-orange-400' : 'text-orange-500') : 'opacity-40 group-hover:opacity-100'} transition-all`}>{icon}</div>
        {isExpanded && <span className="text-sm font-bold tracking-tight whitespace-nowrap">{label}</span>}
      </button>
      {!isExpanded && (
        <div className={`absolute left-20 top-1/2 -translate-y-1/2 px-4 py-2 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-900'} text-white text-[10px] font-bold tracking-widest uppercase rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-[100] shadow-xl ring-1 ring-white/10`}>
          {label}
        </div>
      )}
    </div>
  );
}

// SYSTEM VIEWS (MOCKS)
function CommandCenterView({ isDarkMode, divisions }: any) {
  return (
    <div className={`bg-${isDarkMode ? '[#1e232b]' : 'white'} p-8 rounded-2xl border border-${isDarkMode ? 'slate-800' : 'gray-200'} shadow-lg h-96 flex flex-col items-center justify-center text-center`}>
      <PieChart size={64} className="text-orange-500 mb-6 opacity-50" />
      <h3 className="text-xl font-black mb-2">Global Analytics Visualization</h3>
      <p className="text-slate-400 text-sm max-w-sm">All division data streams are synchronized. Select a division to edit specific content.</p>
    </div>
  );
}

function FinanceView({ isDarkMode }: any) { return <PlaceholderView isDarkMode={isDarkMode} title="Finance" icon={<LineChart size={48} />} />; }
function TrafficView({ isDarkMode }: any) { return <PlaceholderView isDarkMode={isDarkMode} title="Traffic" icon={<Activity size={48} />} />; }
function HealthView({ isDarkMode }: any) { return <PlaceholderView isDarkMode={isDarkMode} title="Health" icon={<Server size={48} />} />; }

function PlaceholderView({ title, icon, isDarkMode }: any) {
  return (
    <div className={`w-full border-none ${isDarkMode ? 'bg-white/[0.02] text-slate-500' : 'bg-slate-50 text-slate-400'} rounded-3xl p-24 flex flex-col items-center justify-center text-center fade-in`}>
      <div className={`p-6 rounded-2xl mb-8 ${isDarkMode ? 'bg-white/[0.01]' : 'bg-white shadow-sm'}`}>{icon}</div>
      <h3 className={`text-xl font-bold mb-3 tracking-tight ${isDarkMode ? 'text-white/80' : 'text-slate-800'}`}>{title} Module</h3>
      <p className="max-w-xs leading-relaxed text-xs font-medium opacity-60 uppercase tracking-widest">Unified Orient Global architecture</p>
    </div>
  );
}
