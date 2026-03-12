import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { 
  Package, ReceiptText, Home, MenuSquare, Handshake, 
  BookOpen, Settings as SettingsIcon, Zap, Save, CheckCircle2, 
  AlertTriangle, XCircle, Image as ImageIcon, Type, 
  Link as LinkIcon, AlignLeft, User, Video, Edit3, Loader2, Eye,
  Croissant, Box, Search, Filter
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface BakeryCmsProps {
  activeItem: string;
  isDarkMode?: boolean;
  cmsData: any;
  setCmsData: (data: any) => void;
  holidayPreset: string;
  setHolidayPreset: (preset: string) => void;
}

export default function BakeryCms({ 
  activeItem, 
  isDarkMode = true,
  cmsData,
  setCmsData,
  holidayPreset,
  setHolidayPreset
}: BakeryCmsProps) {
  const [activeTab, setActiveTab] = useState("home");
  const [menuSearch, setMenuSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Sync activeTab with parent's activeItem if provided
  useEffect(() => {
    if (activeItem && activeItem.startsWith('bakery-')) {
      setActiveTab(activeItem.replace('bakery-', ''));
    } else {
      setActiveTab(activeItem);
    }
  }, [activeItem]);

  const updateNestedState = (section: string, field: string, value: any) => {
    setCmsData({
      ...cmsData,
      [section]: { ...cmsData[section], [field]: value }
    });
  };

  const themeColors: Record<string, string> = {
    default: "#d4af37", // Bakery Gold
    christmas: "#ef4444", // Festive Red
    valentines: "#ec4899", // Romantic Pink
    independence: "#10b981", // Naija Green
  };

  const accentColor = themeColors[holidayPreset];

  // Theme-aware styles
  const bgMain = isDarkMode ? "bg-[#0a0a0a]" : "bg-[#f8fafc]";
  const textMain = isDarkMode ? "text-slate-200" : "text-slate-800";
  const borderCol = isDarkMode ? "border-white/5" : "border-gray-200";

  return (
    <div className={`flex flex-col h-full w-full ${bgMain} ${textMain} overflow-hidden font-sans selection:bg-[#d4af37] selection:text-black transition-colors duration-300`}>
      
      {/* MAIN CONTENT AREA */}
      <div className={`flex-1 overflow-y-auto relative transition-colors duration-300`} data-lenis-prevent>
        {/* Subtle background glow based on holiday preset */}
        <div 
          className="fixed top-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px] opacity-10 pointer-events-none transition-all duration-1000"
          style={{ backgroundColor: accentColor, opacity: isDarkMode ? 0.1 : 0.05 }}
        />

        <div className="max-w-4xl mx-auto p-12 pb-32">
          
          <div className="mb-10">
            <h1 className={`text-3xl font-black font-serif ${isDarkMode ? 'text-white' : 'text-slate-900'} flex items-center gap-3 tracking-tight`}>
              {activeTab === "home" && "Home Page Editor"}
              {activeTab === "inventory" && "Inventory Heatmap"}
              {activeTab === "orders" && "Live Order Monitor"}
              {activeTab === "menu" && "Menu Management"}
              {activeTab === "wholesale" && "Wholesale Portal"}
              {activeTab === "story" && "Our Story Editor"}
              {activeTab === "settings" && "SEO & Preferences"}
              <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
            </h1>
            <p className={`${isDarkMode ? 'text-white/40' : 'text-slate-500'} text-sm mt-2`}>Manage your artisanal content and operations.</p>
          </div>

          {/* Framer Motion Content Area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              
              {/* --- HOME TAB --- */}
              {activeTab === "home" && (
                <div className="space-y-8">
                  <SectionCard title="Hero Section" isDarkMode={isDarkMode}>
                    <FormInput 
                      label="Hero Title" icon={<Type size={16} />} 
                      value={cmsData.home.heroTitle} 
                      onChange={(e: any) => updateNestedState('home', 'heroTitle', e.target.value)} 
                      isDarkMode={isDarkMode}
                    />
                    <FormTextarea 
                      label="Hero Subtext" icon={<AlignLeft size={16} />} 
                      value={cmsData.home.heroSubtext} 
                      onChange={(e: any) => updateNestedState('home', 'heroSubtext', e.target.value)} 
                      isDarkMode={isDarkMode}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormInput label="Primary Button Text" icon={<Edit3 size={16} />} value={cmsData.home.btn1Text} onChange={(e: any) => updateNestedState('home', 'btn1Text', e.target.value)} isDarkMode={isDarkMode} />
                      <FormInput label="Button Link" icon={<LinkIcon size={16} />} value={cmsData.home.btn1Link} onChange={(e: any) => updateNestedState('home', 'btn1Link', e.target.value)} isDarkMode={isDarkMode} />
                    </div>
                    <ImagePreviewInput label="Hero Image URL" url={cmsData.home.heroImage} onChange={(val: string) => updateNestedState('home', 'heroImage', val)} isDarkMode={isDarkMode} />
                  </SectionCard>

                  <SectionCard title="Rolling Ticker" isDarkMode={isDarkMode}>
                    <FormInput label="News Headline" icon={<Zap size={16} className="text-yellow-500" />} value={cmsData.home.newsHeadline} onChange={(e: any) => updateNestedState('home', 'newsHeadline', e.target.value)} isDarkMode={isDarkMode} />
                  </SectionCard>

                  <SectionCard title="Cake of the Week" isDarkMode={isDarkMode}>
                    <div className={`flex items-center justify-between mb-4 p-3 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'} border rounded-lg`}>
                      <span className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Show Section on Website</span>
                      <Switch isOn={cmsData.home.cakeOfWeek.show} onToggle={() => setCmsData({...cmsData, home: {...cmsData.home, cakeOfWeek: {...cmsData.home.cakeOfWeek, show: !cmsData.home.cakeOfWeek.show}}})} isDarkMode={isDarkMode} />
                    </div>
                    {cmsData.home.cakeOfWeek.show && (
                      <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} className="space-y-4">
                        <FormInput label="Cake Name" icon={<Croissant size={16} />} value={cmsData.home.cakeOfWeek.name} onChange={(e: any) => setCmsData({...cmsData, home: {...cmsData.home, cakeOfWeek: {...cmsData.home.cakeOfWeek, name: e.target.value}}})} isDarkMode={isDarkMode} />
                        <FormTextarea label="Tasting Notes & Description" icon={<AlignLeft size={16} />} value={cmsData.home.cakeOfWeek.desc} onChange={(e: any) => setCmsData({...cmsData, home: {...cmsData.home, cakeOfWeek: {...cmsData.home.cakeOfWeek, desc: e.target.value}}})} isDarkMode={isDarkMode} />
                        <ImagePreviewInput label="Product Image URL" url={cmsData.home.cakeOfWeek.image} onChange={(val: string) => setCmsData({...cmsData, home: {...cmsData.home, cakeOfWeek: {...cmsData.home.cakeOfWeek, image: val}}})} isDarkMode={isDarkMode} />
                      </motion.div>
                    )}
                  </SectionCard>
                </div>
              )}

              {/* --- INVENTORY TAB (Heatmap) --- */}
              {activeTab === "inventory" && (
                <SectionCard title="Stock Status" isDarkMode={isDarkMode}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl flex items-center justify-between">
                      <span className="text-green-500 text-[10px] font-bold uppercase tracking-widest">In Stock (&gt;20)</span>
                      <span className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{cmsData.inventory.filter((i: any) => i.stock >= 20).length}</span>
                    </div>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex items-center justify-between">
                      <span className="text-yellow-500 text-[10px] font-bold uppercase tracking-widest">Low Stock (&lt;10)</span>
                      <span className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{cmsData.inventory.filter((i: any) => i.stock > 0 && i.stock < 10).length}</span>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center justify-between">
                      <span className="text-red-500 text-[10px] font-bold uppercase tracking-widest">Sold Out</span>
                      <span className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{cmsData.inventory.filter((i: any) => i.stock === 0).length}</span>
                    </div>
                  </div>

                  <div className={`border ${isDarkMode ? 'border-white/10' : 'border-gray-200'} rounded-xl overflow-hidden`}>
                    <table className="w-full text-left text-sm">
                      <thead className={`${isDarkMode ? 'bg-[#1a1a1a] text-white/50' : 'bg-gray-100 text-slate-500'} text-[10px] uppercase tracking-widest`}>
                        <tr>
                          <th className="p-4 font-semibold">Item Name</th>
                          <th className="p-4 font-semibold">Price</th>
                          <th className="p-4 font-semibold">Units Left</th>
                          <th className="p-4 font-semibold text-right">Quick Action</th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y ${isDarkMode ? 'divide-white/5' : 'divide-gray-100'}`}>
                        {cmsData.inventory.map((item: any) => {
                          const statusColor = item.stock >= 20 ? 'text-green-400 bg-green-400/10' : item.stock > 0 ? 'text-yellow-400 bg-yellow-400/10' : 'text-red-400 bg-red-400/10';
                          const StatusIcon = item.stock >= 20 ? CheckCircle2 : item.stock > 0 ? AlertTriangle : XCircle;
                          
                          return (
                            <tr key={item.id} className={`${isDarkMode ? 'bg-white/[0.02] hover:bg-white/[0.04]' : 'bg-white hover:bg-gray-50'} transition-colors`}>
                              <td className={`p-4 font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.name}</td>
                              <td className={`${isDarkMode ? 'text-white/60' : 'text-slate-600'} p-4`}>₦{(item.itemPrice || item.price).toLocaleString()}</td>
                              <td className="p-4">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold ${statusColor}`}>
                                  <StatusIcon size={12} /> {item.stock === 0 ? "SOLD OUT" : `${item.stock} Units`}
                                </span>
                              </td>
                              <td className="p-4 text-right">
                                {item.stock > 0 && (
                                  <button 
                                    onClick={() => {
                                      const newInv = cmsData.inventory.map((i: any) => i.id === item.id ? {...i, stock: 0} : i);
                                      setCmsData({...cmsData, inventory: newInv});
                                    }}
                                    className="px-3 py-1.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-all"
                                  >
                                    Mark Sold Out
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </SectionCard>
              )}

              {/* --- ORDERS TAB --- */}
              {activeTab === "orders" && (
                <SectionCard title="Live Transaction Monitor" isDarkMode={isDarkMode}>
                  <div className="space-y-4">
                    {cmsData.orders.map((order: any) => (
                      <div key={order.id} className={`${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'} border rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors duration-300`}>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-[#d4af37] font-mono text-xs font-bold">{order.id}</span>
                            <h4 className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{order.name}</h4>
                          </div>
                          <p className={`${isDarkMode ? 'text-white/50' : 'text-slate-500'} text-xs`}>{order.items}</p>
                          <p className={`${isDarkMode ? 'text-white/80' : 'text-slate-700'} font-mono text-sm mt-2`}>Total: ₦{order.total.toLocaleString()}</p>
                        </div>
                        <div className="shrink-0">
                          <label className={`text-[10px] uppercase ${isDarkMode ? 'text-white/40' : 'text-slate-400'} font-bold block mb-1`}>Status</label>
                          <select 
                            value={order.status}
                            onChange={(e) => {
                              const newOrders = cmsData.orders.map((o: any) => o.id === order.id ? {...o, status: e.target.value} : o);
                              setCmsData({...cmsData, orders: newOrders});
                            }}
                            className={`${isDarkMode ? 'bg-[#1a1a1a] border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-slate-800'} border text-sm rounded-lg p-2.5 outline-none focus:border-[#d4af37] transition-colors duration-300`}
                          >
                            <option value="Pending">🕒 Pending</option>
                            <option value="Preparing">👨🍳 Preparing</option>
                            <option value="Ready">🛍️ Ready for Pickup</option>
                            <option value="Delivered">✅ Delivered</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              )}

              {/* --- WHOLESALE TAB --- */}
              {activeTab === "wholesale" && (
                <div className="space-y-8">
                  <SectionCard title="Header Configuration" isDarkMode={isDarkMode}>
                    <FormInput label="Title" icon={<Type size={16} />} value={cmsData.wholesale.title} onChange={(e: any) => updateNestedState('wholesale', 'title', e.target.value)} isDarkMode={isDarkMode} />
                    <FormTextarea label="Subtitle" icon={<AlignLeft size={16} />} value={cmsData.wholesale.subtitle} onChange={(e: any) => updateNestedState('wholesale', 'subtitle', e.target.value)} isDarkMode={isDarkMode} />
                    <FormInput label="Portal CTA Text" icon={<Edit3 size={16} />} value={cmsData.wholesale.ctaText} onChange={(e: any) => updateNestedState('wholesale', 'ctaText', e.target.value)} isDarkMode={isDarkMode} />
                  </SectionCard>

                  <SectionCard title="Quick Metrics & Bulk Rules" isDarkMode={isDarkMode}>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <FormInput label="Daily Output" icon={<Package size={16} />} value={cmsData.wholesale.metrics.daily} onChange={(e: any) => setCmsData({...cmsData, wholesale: {...cmsData.wholesale, metrics: {...cmsData.wholesale.metrics, daily: e.target.value}}})} isDarkMode={isDarkMode} />
                      <FormInput label="Active Partners" icon={<Handshake size={16} />} value={cmsData.wholesale.metrics.partners} onChange={(e: any) => setCmsData({...cmsData, wholesale: {...cmsData.wholesale, metrics: {...cmsData.wholesale.metrics, partners: e.target.value}}})} isDarkMode={isDarkMode} />
                    </div>
                    <div className={`grid grid-cols-2 gap-4 border-t ${borderCol} pt-6`}>
                      <FormInput label="Minimum Order Quantity (MOQ)" icon={<Box size={16} />} value={cmsData.wholesale.moq} onChange={(e: any) => updateNestedState('wholesale', 'moq', e.target.value)} isDarkMode={isDarkMode} />
                      <FormInput label="Bulk Discount (%)" icon={<Zap size={16} />} value={cmsData.wholesale.discount} onChange={(e: any) => updateNestedState('wholesale', 'discount', e.target.value)} isDarkMode={isDarkMode} />
                    </div>
                  </SectionCard>
                </div>
              )}

              {/* --- STORY TAB --- */}
              {activeTab === "story" && (
                <div className="space-y-8">
                  <SectionCard title="Baker's Editorial" isDarkMode={isDarkMode}>
                    <FormInput label="Head Baker Name" icon={<User size={16} />} value={cmsData.story.bakerName} onChange={(e: any) => updateNestedState('story', 'bakerName', e.target.value)} isDarkMode={isDarkMode} />
                    <FormTextarea label="Biography & Philosophy" icon={<AlignLeft size={16} />} value={cmsData.story.bio} onChange={(e: any) => updateNestedState('story', 'bio', e.target.value)} isDarkMode={isDarkMode} />
                    <ImagePreviewInput label="Profile Image URL" url={cmsData.story.image} onChange={(val: string) => updateNestedState('story', 'image', val)} isDarkMode={isDarkMode} />
                    <FormInput label="Process Video URL (YouTube/Vimeo)" icon={<Video size={16} />} value={cmsData.story.videoUrl} onChange={(e: any) => updateNestedState('story', 'videoUrl', e.target.value)} isDarkMode={isDarkMode} />
                  </SectionCard>

                  <SectionCard title="3D Showcase Element" isDarkMode={isDarkMode}>
                    <FormInput label="Showcase Title" icon={<Type size={16} />} value={cmsData.story.showcaseTitle} onChange={(e: any) => updateNestedState('story', 'showcaseTitle', e.target.value)} isDarkMode={isDarkMode} />
                    <ImagePreviewInput label="Animated GIF / GLTF Model URL" url={cmsData.story.showcaseGif} onChange={(val: string) => updateNestedState('story', 'showcaseGif', val)} isDarkMode={isDarkMode} />
                  </SectionCard>
                </div>
              )}

              {/* --- SETTINGS TAB --- */}
              {activeTab === "settings" && (
                <div className="space-y-8">
                  <SectionCard title="Search Engine Optimization" isDarkMode={isDarkMode}>
                    <FormInput label="Global Meta Title" icon={<Type size={16} />} value={cmsData.settings.metaTitle} onChange={(e: any) => updateNestedState('settings', 'metaTitle', e.target.value)} isDarkMode={isDarkMode} />
                    <FormTextarea label="Global Meta Description" icon={<AlignLeft size={16} />} value={cmsData.settings.metaDesc} onChange={(e: any) => updateNestedState('settings', 'metaDesc', e.target.value)} isDarkMode={isDarkMode} />
                  </SectionCard>

                  <SectionCard title="Theme Presets" isDarkMode={isDarkMode}>
                    <p className={`${isDarkMode ? 'text-white/50' : 'text-slate-500'} text-[11px] font-medium mb-4`}>Select a seasonal preset to instantly update the accent colors across the Bakery division UI.</p>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.keys(themeColors).map((preset) => (
                        <button
                          key={preset}
                          onClick={() => setHolidayPreset(preset)}
                          className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                            holidayPreset === preset 
                              ? (isDarkMode ? "bg-white/10 border-white/30" : "bg-gray-100 border-gray-300") 
                              : `${isDarkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-white border-gray-100 hover:bg-gray-50'}`
                          }`}
                        >
                          <span className={`capitalize text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{preset}</span>
                          <div className="w-5 h-5 rounded-full shadow-inner border border-white/20" style={{ backgroundColor: themeColors[preset] }} />
                        </button>
                      ))}
                    </div>
                  </SectionCard>
                </div>
              )}

              {/* --- MENU TAB (Modern Grid) --- */}
              {activeTab === "menu" && (
                <div className="space-y-8">
                  {/* Menu Search & Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <h2 className={`text-2xl font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Product Inventory</h2>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="relative flex items-center">
                        <AnimatePresence>
                          {isSearchExpanded && (
                            <motion.input 
                              initial={{ width: 0, opacity: 0 }}
                              animate={{ width: 280, opacity: 1 }}
                              exit={{ width: 0, opacity: 0 }}
                              placeholder="Search products..."
                              value={menuSearch}
                              onChange={(e) => setMenuSearch(e.target.value)}
                              className={`mr-2 ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-gray-200'} border rounded-full py-2.5 px-5 text-sm outline-none focus:border-[#d4af37] shadow-inner`}
                              autoFocus
                            />
                          )}
                        </AnimatePresence>
                        
                        <div className="flex items-center gap-2 p-1 rounded-full bg-white/5 border border-white/5">
                           <button 
                            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                            className={`p-2.5 rounded-full transition-all ${isSearchExpanded ? 'bg-[#d4af37] text-white' : (isDarkMode ? 'text-white/50 hover:bg-white/5' : 'text-slate-500 hover:bg-gray-100')}`}
                          >
                            <Search size={18} />
                          </button>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${isDarkMode ? 'bg-white/5 text-white/70 hover:bg-white/10' : 'bg-gray-100 text-slate-600 hover:bg-gray-200'}`}>
                                <Filter size={14} className="text-[#d4af37]" />
                                {selectedCategory === "All" ? "Filter" : selectedCategory}
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className={isDarkMode ? 'bg-[#1a1a1a] border-white/10 text-white' : ''}>
                              <DropdownMenuLabel>Categories</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => setSelectedCategory("All")}>All Categories</DropdownMenuItem>
                              {Array.from(new Set(cmsData.inventory.map((item: any) => item.category || "Uncategorized"))).map((cat: any) => (
                                <DropdownMenuItem key={cat} onClick={() => setSelectedCategory(cat)}>
                                  {cat}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Grouped Categories */}
                  {Array.from(new Set(cmsData.inventory.map((item: any) => item.category || "Uncategorized")))
                    .filter(cat => selectedCategory === "All" || cat === selectedCategory)
                    .map((category: any) => {
                      const categoryItems = cmsData.inventory.filter((item: any) => 
                        (item.category || "Uncategorized") === category && 
                        (item.name.toLowerCase().includes(menuSearch.toLowerCase()) || category.toLowerCase().includes(menuSearch.toLowerCase()))
                      );

                      if (categoryItems.length === 0) return null;

                    return (
                      <div key={category} className="space-y-4">
                        <div className="flex items-center justify-between px-2">
                          <h3 className={`text-[11px] uppercase font-black tracking-widest ${isDarkMode ? 'text-white/40' : 'text-slate-500'}`}>
                            {category} <span className="ml-2 px-1.5 py-0.5 rounded-md bg-[#d4af37]/10 text-[#d4af37]">{categoryItems.length}</span>
                          </h3>
                          <button 
                            onClick={() => {
                              const newItem = {
                                id: `B-${Math.floor(Math.random() * 9000) + 1000}`,
                                name: "New Product Name",
                                price: 0,
                                stock: 0,
                                category: category,
                                description: "Enter product description here...",
                                image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400",
                                ingredients: []
                              };
                              setCmsData({...cmsData, inventory: [newItem, ...cmsData.inventory]});
                              setEditingItem(newItem);
                            }}
                            className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white/60 hover:text-[#d4af37] hover:border-[#d4af37]/30' : 'bg-white border-gray-200 text-slate-500 hover:text-slate-900 hover:border-gray-300'}`}
                          >
                            <Zap size={12} className="text-[#d4af37]" /> Add Item
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {categoryItems.map((item: any) => (
                            <div 
                              key={item.id} 
                              onClick={() => setEditingItem(item)}
                              className={`group relative overflow-hidden rounded-2xl border transition-all cursor-pointer ${isDarkMode ? 'bg-[#121212]/80 border-white/5 hover:border-[#d4af37]/30' : 'bg-white border-gray-100 hover:border-gray-300'} shadow-sm hover:shadow-md`}
                            >
                               <div className="aspect-square overflow-hidden relative">
                                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                                    <div className="flex-1 min-w-0">
                                      <h4 className="text-white font-bold text-sm truncate">{item.name}</h4>
                                      <p className="text-white/60 text-[10px] uppercase font-black tracking-widest">₦{(item.price || item.itemPrice).toLocaleString()}</p>
                                    </div>
                                    <div className={`shrink-0 ml-2 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider ${item.stock === 0 ? 'bg-red-500/20 text-red-400' : 'bg-[#d4af37]/20 text-[#d4af37]'}`}>
                                      {item.stock === 0 ? 'Out' : `${item.stock} Unit`}
                                    </div>
                                  </div>
                               </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          {/* PRODUCT EDIT MODAL (Redesigned & Professional) */}
          <Dialog open={!!editingItem} onOpenChange={(open) => !open && setEditingItem(null)}>
            <DialogContent 
              className={`${isDarkMode ? 'bg-[#0a0a0a]/95 border-white/5 text-white' : 'bg-white/95 border-gray-200'} max-w-4xl p-0 overflow-hidden backdrop-blur-xl shadow-2xl rounded-2xl border`}
              overlayClassName="backdrop-blur-md bg-black/40"
            >
              <div className="flex h-full max-h-[85vh] flex-col overflow-hidden">
                <DialogHeader className="p-8 border-b border-white/5 bg-white/5 shrink-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <DialogTitle className="font-serif text-3xl font-black tracking-tight">{editingItem?.name || "Edit Product"}</DialogTitle>
                      <DialogDescription className={`mt-1 text-sm font-medium ${isDarkMode ? 'text-white/40' : 'text-slate-500'}`}>
                        Premium product configuration and inventory details.
                      </DialogDescription>
                    </div>
                  </div>
                </DialogHeader>
                
                <div className="flex-1 overflow-y-auto p-10 custom-scrollbar" data-lenis-prevent>
                  {editingItem && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                       <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className={`text-[10px] uppercase font-black tracking-[0.2em] ${isDarkMode ? 'text-[#d4af37]/80' : 'text-[#d4af37]'}`}>Basic Metadata</h4>
                            <FormInput 
                              label="Commercial Name" icon={<Type size={16} />} 
                              value={editingItem.name} 
                              onChange={(e: any) => {
                                const newItem = {...editingItem, name: e.target.value};
                                setEditingItem(newItem);
                                const newInv = cmsData.inventory.map((i: any) => i.id === editingItem.id ? newItem : i);
                                setCmsData({...cmsData, inventory: newInv});
                              }} 
                              isDarkMode={isDarkMode}
                            />
                            <div className="grid grid-cols-2 gap-4">
                              <FormInput 
                                label="Unit Price (₦)" icon={<Zap size={16} />} 
                                value={editingItem.price || editingItem.itemPrice} 
                                onChange={(e: any) => {
                                  const val = parseInt(e.target.value.replace(/,/g, '')) || 0;
                                  const newItem = {...editingItem, price: val, itemPrice: val};
                                  setEditingItem(newItem);
                                  const newInv = cmsData.inventory.map((i: any) => i.id === editingItem.id ? newItem : i);
                                  setCmsData({...cmsData, inventory: newInv});
                                }} 
                                isDarkMode={isDarkMode}
                              />
                              <FormInput 
                                label="Current Stock" icon={<Package size={16} />} 
                                value={editingItem.stock} 
                                onChange={(e: any) => {
                                  const val = parseInt(e.target.value) || 0;
                                  const newItem = {...editingItem, stock: val};
                                  setEditingItem(newItem);
                                  const newInv = cmsData.inventory.map((i: any) => i.id === editingItem.id ? newItem : i);
                                  setCmsData({...cmsData, inventory: newInv});
                                }} 
                                isDarkMode={isDarkMode}
                              />
                            </div>
                          </div>

                          <div className="space-y-4 border-t border-white/5 pt-6">
                            <h4 className={`text-[10px] uppercase font-black tracking-[0.2em] ${isDarkMode ? 'text-[#d4af37]/80' : 'text-[#d4af37]'}`}>Story & Description</h4>
                            <FormTextarea 
                              label="Product Narrative" icon={<AlignLeft size={16} />} 
                              value={editingItem.description} 
                              onChange={(e: any) => {
                                const newItem = {...editingItem, description: e.target.value};
                                setEditingItem(newItem);
                                const newInv = cmsData.inventory.map((i: any) => i.id === editingItem.id ? newItem : i);
                                setCmsData({...cmsData, inventory: newInv});
                              }} 
                              isDarkMode={isDarkMode}
                            />
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className={`text-[10px] uppercase font-black tracking-[0.2em] ${isDarkMode ? 'text-[#d4af37]/80' : 'text-[#d4af37]'}`}>Visual Identity</h4>
                            <ImagePreviewInput 
                              label="High-Res Asset URL" url={editingItem.image} 
                              onChange={(val: string) => {
                                const newItem = {...editingItem, image: val};
                                setEditingItem(newItem);
                                const newInv = cmsData.inventory.map((i: any) => i.id === editingItem.id ? newItem : i);
                                setCmsData({...cmsData, inventory: newInv});
                              }} 
                              isDarkMode={isDarkMode} 
                            />
                          </div>
                          
                          <div className={`mt-10 p-6 rounded-2xl border ${isDarkMode ? 'bg-red-500/5 border-red-500/10' : 'bg-red-50 border-red-100'} space-y-4`}>
                            <h5 className="text-[10px] uppercase font-black tracking-widest text-red-500">Danger Zone</h5>
                            <p className={`text-[11px] ${isDarkMode ? 'text-white/40' : 'text-slate-500'}`}>Permanently remove this product from the inventory and digital menu. This action cannot be undone.</p>
                            <button 
                              onClick={() => {
                                if(confirm(`Are you sure you want to delete ${editingItem.name}?`)) {
                                  setCmsData({...cmsData, inventory: cmsData.inventory.filter((i: any) => i.id !== editingItem.id)});
                                  setEditingItem(null);
                                }
                              }}
                              className={`w-full flex items-center justify-center gap-2 p-3.5 rounded-xl border transition-all ${isDarkMode ? 'bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white' : 'bg-white border-red-200 text-red-600 hover:bg-red-600 hover:text-white'} text-xs font-black uppercase tracking-widest`}
                            >
                              <XCircle size={16} /> Delete Product Listing
                            </button>
                          </div>
                        </div>
                    </div>
                  )}
                </div>

                <div className={`p-6 border-t ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-200'} flex justify-end gap-3 shrink-0`}>
                  <button 
                    onClick={() => setEditingItem(null)}
                    className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${isDarkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-white border border-gray-200 text-slate-900 hover:bg-gray-50'}`}
                  >
                    Done
                  </button>
                  <button 
                    onClick={() => {
                      // Trigger global save indirectly by just closing and letting user click Save All
                      setEditingItem(null);
                    }}
                    className="px-8 py-3 bg-[#d4af37] text-black rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#c29f2f] transition-all"
                  >
                    Apply Changes
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------------
// UTILITY COMPONENTS (Form-Filling UI)
// --------------------------------------------------------------------------------

function SectionCard({ title, children, isDarkMode }: any) {
  return (
    <div className={`${isDarkMode ? 'bg-[#121212]/80' : 'bg-white/90'} backdrop-blur-md border ${isDarkMode ? 'border-white/5' : 'border-gray-200'} p-8 rounded-2xl shadow-xl transition-colors duration-300`}>
      <h3 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-6 flex items-center gap-2`}>
        <span className="w-1.5 h-6 bg-[#d4af37] rounded-full inline-block"></span>
        {title}
      </h3>
      <div className="space-y-5">
        {children}
      </div>
    </div>
  );
}

function FormInput({ label, icon, value, onChange, isDarkMode }: any) {
  return (
    <div className="space-y-1.5 w-full">
      <label className={`text-[10px] font-bold ${isDarkMode ? 'text-white/50' : 'text-slate-500'} uppercase tracking-widest px-1`}>{label}</label>
      <div className="relative flex items-center">
        {icon && <div className={`absolute left-4 ${isDarkMode ? 'text-white/30' : 'text-slate-400'}`}>{icon}</div>}
        <input 
          type="text" 
          value={value} 
          onChange={onChange}
          className={`w-full ${isDarkMode ? 'bg-[#050505] border-white/10 text-white' : 'bg-white border-gray-200 text-slate-900'} border text-sm rounded-xl py-3 ${icon ? 'pl-11' : 'px-4'} pr-4 outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/50 transition-all placeholder:text-white/20`}
        />
      </div>
    </div>
  );
}

function FormTextarea({ label, icon, value, onChange, isDarkMode }: any) {
  return (
    <div className="space-y-1.5 w-full">
      <label className={`text-[10px] font-bold ${isDarkMode ? 'text-white/50' : 'text-slate-500'} uppercase tracking-widest px-1`}>{label}</label>
      <div className="relative flex">
        {icon && <div className={`absolute left-4 top-3.5 ${isDarkMode ? 'text-white/30' : 'text-slate-400'}`}>{icon}</div>}
        <textarea 
          value={value} 
          onChange={onChange}
          rows={3}
          className={`w-full ${isDarkMode ? 'bg-[#050505] border-white/10 text-white' : 'bg-white border-gray-200 text-slate-900'} border text-sm rounded-xl py-3 ${icon ? 'pl-11' : 'px-4'} pr-4 outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/50 transition-all placeholder:text-white/20 resize-none`}
        />
      </div>
    </div>
  );
}

function ImagePreviewInput({ label, url, onChange, isDarkMode }: any) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      onChange(localUrl);
    }
  };

  return (
    <div className="space-y-1.5 w-full">
      <label className={`text-[10px] font-bold ${isDarkMode ? 'text-white/50' : 'text-slate-500'} uppercase tracking-widest px-1`}>{label}</label>
      <div className="flex gap-4">
        <div className="relative flex-1 flex items-start">
          <div className={`absolute left-4 top-3.5 ${isDarkMode ? 'text-white/30' : 'text-slate-400'}`}><ImageIcon size={16} /></div>
          <input 
            type="text" 
            value={url} 
            onChange={(e) => onChange(e.target.value)}
            className={`w-full ${isDarkMode ? 'bg-[#050505] border-white/10 text-white' : 'bg-white border-gray-200 text-slate-900'} border text-sm rounded-xl py-3 pl-11 pr-4 outline-none focus:border-[#d4af37] transition-all`}
            placeholder="https://..."
          />
        </div>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={handleFileChange} 
        />
        <button 
          title="Upload local file"
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`w-16 h-12 shrink-0 ${isDarkMode ? 'bg-[#050505] border-white/10' : 'bg-white border-gray-200'} border rounded-lg overflow-hidden flex items-center justify-center relative group hover:border-[#d4af37]/50 transition-all`}
        >
          {url ? (
            <>
              <img src={url} alt="Preview" className="w-full h-full object-cover opacity-80 group-hover:opacity-40 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Edit3 size={16} className="text-[#d4af37]" />
              </div>
            </>
          ) : (
            <ImageIcon size={16} className={isDarkMode ? 'text-white/20' : 'text-slate-200'} />
          )}
        </button>
      </div>
    </div>
  );
}

function Switch({ isOn, onToggle, isDarkMode }: any) {
  return (
    <button 
      onClick={onToggle}
      className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out ${isOn ? 'bg-[#d4af37]' : (isDarkMode ? 'bg-white/10' : 'bg-gray-200')}`}
    >
      <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ease-in-out ${isOn ? 'translate-x-6' : 'translate-x-0'}`} />
    </button>
  );
}
