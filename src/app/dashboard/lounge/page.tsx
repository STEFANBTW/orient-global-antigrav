"use client";

import { useState } from "react";
import { useRoles, type LabDrink } from "@/context/role-context";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ActionGuard } from "@/components/dashboard/action-guard";
import { LivePreview } from "@/components/dashboard/live-preview";
import DivisionCMSEditor from "@/components/dashboard/cms/DivisionEditor";
import { 
  Zap, 
  Plus, 
  Eye, 
  Sparkles, 
  Calendar,
  Wine
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";

export default function LoungeCommandCenter() {
  const { currentUser, loungeMenu, labDrinks, activeModule } = useRoles();
  const role = currentUser?.role;
  const [selectedItem, setSelectedItem] = useState<any>(labDrinks[0]);

  const isHOD = role === 'admin_head' || role === 'admin_boss';

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-100 pb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-amber-500/5 border-amber-500/20 text-amber-600 uppercase text-[9px] tracking-widest font-bold px-3 italic">
              Division: Velvet Lounge & Lab
            </Badge>
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </div>
          <h1 className="text-5xl font-bold text-slate-900 tracking-tighter uppercase italic font-headline">Lounge Command</h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Atmosphere Sync & Experimental Mixology</p>
        </div>
        <div className="flex items-center gap-3">
          <ActionGuard sensitivity="high" actionLabel="Audit Spirits" variant="outline" />
          <ActionGuard sensitivity="low" actionLabel="Force Atmosphere Resync" />
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0">
        {/* Workspace */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <Tabs value={activeModule || 'lab'} className="w-full flex-1 flex flex-col">
            <TabsContent value="lab" className="m-0 flex-1">
              <Card className="border-slate-200 shadow-xl flex flex-col h-full overflow-hidden">
                <CardHeader className="bg-slate-50/50 border-b">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-500" /> Lab Tuner
                      </CardTitle>
                      <CardDescription className="text-[9px] uppercase font-bold tracking-widest text-slate-400">Manage experimental visualizers and drinks</CardDescription>
                    </div>
                    <Button size="sm" variant="outline" className="h-8 text-[9px] font-bold uppercase tracking-widest">
                      <Plus className="w-3.5 h-3.5 mr-2" /> New Experiment
                    </Button>
                  </div>
                </CardHeader>
                <ScrollArea className="flex-1">
                  <div className="p-6 grid grid-cols-1 gap-4">
                    {labDrinks.map(drink => (
                      <div 
                        key={drink.id} 
                        onClick={() => setSelectedItem(drink)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer ${selectedItem?.id === drink.id ? 'bg-amber-500/5 border-amber-500/30' : 'bg-white border-slate-100 hover:border-slate-300'}`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-sm font-bold text-slate-900">{drink.name}</h4>
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{drink.status}</p>
                          </div>
                          <ActionGuard sensitivity="low" actionLabel="Stage Edits" size="sm" variant="ghost" />
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </Card>
            </TabsContent>

            <TabsContent value="menu" className="m-0 flex-1">
              <Card className="border-slate-200 shadow-xl h-full overflow-hidden">
                <CardHeader className="bg-slate-50/50 border-b">
                  <CardTitle className="text-sm font-bold uppercase tracking-widest">Velvet Menu Editor</CardTitle>
                </CardHeader>
                <Table>
                  <TableHeader className="bg-slate-100/50 sticky top-0">
                    <TableRow>
                      <TableHead className="text-[9px] font-bold uppercase tracking-widest">Item</TableHead>
                      <TableHead className="text-[9px] font-bold uppercase tracking-widest text-right">Price</TableHead>
                      <TableHead className="text-[9px] font-bold uppercase tracking-widest text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loungeMenu.map(item => (
                      <TableRow key={item.id} className="cursor-pointer" onClick={() => setSelectedItem(item)}>
                        <TableCell className="text-sm font-bold">{item.name}</TableCell>
                        <TableCell className="text-right font-code">₦{item.price.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <ActionGuard sensitivity="low" actionLabel="Stage" size="sm" variant="ghost" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            <TabsContent value="bookings" className="m-0 flex-1">
              <div className="space-y-6">
                <Card className="border-slate-200 shadow-xl p-8 text-center space-y-6 h-full flex flex-col justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/5 flex items-center justify-center mx-auto">
                    <Calendar className="w-8 h-8 text-amber-500" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tighter italic font-headline">Velvet Rope Approvals</h3>
                  <div className="grid grid-cols-5 gap-3 max-w-lg mx-auto">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                      <div key={i} className={`aspect-square rounded-xl border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all hover:scale-105 ${i < 4 ? 'bg-amber-500/10 border-amber-500/20' : 'bg-white border-slate-100'}`}>
                        <span className="text-[10px] font-bold">V-{i}</span>
                        <Badge className={`text-[8px] h-3 px-1 border-none ${i < 4 ? 'bg-amber-500' : 'bg-emerald-500'}`}>
                          {i < 4 ? 'RES' : 'AV'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="cms" className="m-0 flex-1">
              <DivisionCMSEditor division="lounge" />
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Preview */}
        <div className="lg:col-span-4 flex flex-col gap-6 h-full">
          <Card className="border-slate-200 shadow-xl flex-1 flex flex-col overflow-hidden bg-slate-50/30">
            <CardHeader className="border-b bg-white/80 backdrop-blur-md py-4 px-6 flex flex-row items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-amber-500" />
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-900">Lounge Live State</h3>
              </div>
              <Badge className="bg-emerald-500 text-white text-[8px] uppercase tracking-widest px-2 font-bold animate-pulse">Synced</Badge>
            </CardHeader>
            <div className="flex-1 overflow-auto p-0">
               <LivePreview 
                item={selectedItem} 
                division="lounge" 
                isHOD={isHOD}
                onApprove={() => toast({ title: "Authorized", description: "Lounge atmosphere has been updated." })}
                onReject={() => toast({ variant: "destructive", title: "Refused", description: "Experiment remains in staged status." })}
               />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}