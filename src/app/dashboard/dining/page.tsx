"use client";

import { useState, useMemo } from "react";
import { useRoles, type MenuItem } from "@/context/role-context";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ActionGuard } from "@/components/dashboard/action-guard";
import { LivePreview } from "@/components/dashboard/live-preview";
import DivisionCMSEditor from "@/components/dashboard/cms/DivisionEditor";
import { 
  ChefHat, 
  Search, 
  Eye,
  Calendar,
  LayoutGrid,
  Globe
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DiningCommandCenter() {
  const { currentUser, diningMenu, activeModule } = useRoles();
  const role = currentUser?.role;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(diningMenu[0]);
  const [showPreviewMobile, setShowPreviewMobile] = useState(false);

  const isHOD = role === 'admin_head' || role === 'admin_boss';

  const filteredMenu = useMemo(() => {
    return diningMenu.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [diningMenu, searchQuery]);

  return (
    <div className="h-full flex flex-col gap-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 pb-6">
        <div className="space-y-1 w-full md:w-auto">
          <div className="flex items-center gap-3">
            <Badge className="bg-primary/10 text-primary border-primary/20 uppercase text-[9px] tracking-widest font-bold px-3">
              Dining Node
            </Badge>
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tighter uppercase italic font-headline truncate">Dining Manager</h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Menu & Table Management</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <ActionGuard sensitivity="high" actionLabel="Stop Service" variant="destructive" className="flex-1 md:flex-none" />
          <ActionGuard sensitivity="low" actionLabel="Sync Menu" className="flex-1 md:flex-none" />
          <button 
            onClick={() => setShowPreviewMobile(!showPreviewMobile)}
            className="lg:hidden h-10 w-10 border border-slate-200 rounded-md flex items-center justify-center bg-white"
          >
            <Eye className="w-5 h-5 text-primary" />
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 min-h-0">
        {/* Workspace */}
        <div className={`lg:col-span-8 flex flex-col gap-6 min-w-0 ${showPreviewMobile ? 'hidden lg:flex' : 'flex'}`}>
          <Tabs value={activeModule || 'menu'} className="w-full flex-1 flex flex-col">
            <TabsContent value="menu" className="m-0 flex-1 flex flex-col gap-6">
              <Card className="border-slate-200 shadow-sm flex flex-col flex-1 overflow-hidden bg-white">
                <CardHeader className="border-b bg-slate-50/50 py-4 px-4 md:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="min-w-0">
                    <CardTitle className="text-xs md:text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                      <ChefHat className="w-4 h-4 text-primary shrink-0" /> Menu Editor
                    </CardTitle>
                  </div>
                  <div className="relative w-full sm:max-w-[200px] shrink-0">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <Input 
                      placeholder="Search..." 
                      className="pl-9 h-8 text-[10px] border-slate-200 w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </CardHeader>
                <ScrollArea className="flex-1 w-full">
                  <div className="min-w-[500px]">
                    <Table>
                      <TableHeader className="bg-slate-100/50 sticky top-0 z-10 border-b">
                        <TableRow>
                          <TableHead className="text-[9px] font-bold uppercase tracking-widest py-4">Item</TableHead>
                          <TableHead className="text-[9px] font-bold uppercase tracking-widest text-right">Price</TableHead>
                          <TableHead className="text-[9px] font-bold uppercase tracking-widest text-right">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredMenu.map((item) => (
                          <TableRow 
                            key={item.id} 
                            className={`border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer ${selectedItem?.id === item.id ? 'bg-primary/5' : ''}`}
                            onClick={() => setSelectedItem(item)}
                          >
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                                  <img src={item.imageUrl} className="object-cover w-full h-full" alt="" />
                                </div>
                                <div className="min-w-0 flex flex-col">
                                  <span className="text-xs font-bold text-slate-900 truncate">{item.name}</span>
                                  <span className="text-[8px] text-slate-400 uppercase font-bold tracking-widest">{item.status}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <span className="text-[10px] font-bold text-slate-900 font-code">₦{item.price.toLocaleString()}</span>
                            </TableCell>
                            <TableCell className="text-right">
                              <ActionGuard sensitivity="low" actionLabel="Stage" size="sm" variant="ghost" />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </ScrollArea>
              </Card>
            </TabsContent>

            <TabsContent value="reservations" className="m-0 flex-1">
              <Card className="border-slate-200 h-full flex flex-col items-center justify-center p-6 md:p-12 text-center gap-6 md:gap-8 bg-white overflow-y-auto">
                <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center border border-primary/10 shrink-0">
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tighter italic font-headline">Tables</h3>
                  <p className="text-[10px] text-slate-400 max-w-sm mx-auto uppercase tracking-widest font-bold">Manage seating</p>
                </div>
                <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-3 md:gap-4 w-full max-w-md">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                    <div key={i} className={`aspect-square rounded-xl border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all hover:scale-105 ${i === 4 ? 'bg-primary/10 border-primary/20 shadow-inner' : 'bg-white border-slate-100'}`}>
                      <span className="text-[10px] font-bold text-slate-900">T-{i}</span>
                      <Badge className={`text-[8px] h-3 px-1 border-none ${i === 4 ? 'bg-primary' : 'bg-emerald-500'}`}>
                        {i === 4 ? 'VIP' : 'Free'}
                      </Badge>
                    </div>
                  ))}
                </div>
                <ActionGuard sensitivity="low" actionLabel="Update Status" />
              </Card>
            </TabsContent>

            <TabsContent value="cms" className="m-0 flex-1">
              <DivisionCMSEditor division="dining" />
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Preview */}
        <div className={`lg:col-span-4 flex flex-col gap-6 h-full min-w-0 ${showPreviewMobile ? 'flex' : 'hidden lg:flex'}`}>
          <Card className="border-slate-200 shadow-xl flex-1 flex flex-col overflow-hidden bg-white">
            <CardHeader className="border-b bg-slate-50/50 py-4 px-6 flex flex-row items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-primary" />
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-900">Preview</h3>
              </div>
              <Badge className="bg-emerald-500 text-white text-[8px] uppercase tracking-widest px-2 font-bold shrink-0">Live</Badge>
            </CardHeader>
            <div className="flex-1 overflow-auto p-0">
               <LivePreview 
                item={selectedItem || diningMenu[0]} 
                division="dining" 
                isHOD={isHOD}
                onApprove={() => toast({ title: "Updated", description: "Menu saved." })}
                onReject={() => toast({ variant: "destructive", title: "Rejected", description: "Returned to staff." })}
               />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
