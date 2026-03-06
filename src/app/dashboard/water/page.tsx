"use client";

import { useState } from "react";
import { useRoles, type WaterLog } from "@/context/role-context";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ActionGuard } from "@/components/dashboard/action-guard";
import { LivePreview } from "@/components/dashboard/live-preview";
import DivisionCMSEditor from "@/components/dashboard/cms/DivisionEditor";
import { 
  Droplets, 
  Truck, 
  ShieldCheck, 
  Eye, 
  FileText,
  BarChart3
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";

export default function WaterCommandCenter() {
  const { currentUser, waterLogs, activeModule } = useRoles();
  const role = currentUser?.role;
  const [selectedLog, setSelectedLog] = useState<WaterLog>(waterLogs[0]);

  const isHOD = role === 'admin_head' || role === 'admin_boss';

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-100 pb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-sky-500/5 border-sky-500/20 text-sky-600 uppercase text-[9px] tracking-widest font-bold px-3">
              Water Quality & Delivery
            </Badge>
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </div>
          <h1 className="text-5xl font-bold text-slate-900 tracking-tighter uppercase italic font-headline truncate">Water Command</h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Purity Logs & Fleet Management</p>
        </div>
        <div className="flex items-center gap-3">
          <ActionGuard sensitivity="high" actionLabel="Emergency Stop" variant="destructive" />
          <ActionGuard sensitivity="low" actionLabel="New Log" />
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0">
        {/* Workspace */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <Tabs value={activeModule || 'quality'} className="w-full flex-1 flex flex-col">
            <TabsContent value="quality" className="m-0 flex-1">
              <Card className="border-slate-200 shadow-xl flex flex-col h-full overflow-hidden bg-white">
                <CardHeader className="bg-slate-50/50 border-b flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-sky-500" /> Quality Logs
                    </CardTitle>
                    <CardDescription className="text-[9px] uppercase font-bold tracking-widest text-slate-400">Filtration audit and purity reports</CardDescription>
                  </div>
                  <Button size="sm" variant="outline" className="h-8 text-[9px] font-bold uppercase tracking-widest">
                    <FileText className="w-3.5 h-3.5 mr-2" /> Upload Report
                  </Button>
                </CardHeader>
                <ScrollArea className="flex-1">
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {waterLogs.map(log => (
                      <div 
                        key={log.id} 
                        onClick={() => setSelectedLog(log)}
                        className={`p-6 rounded-2xl border transition-all cursor-pointer ${selectedLog?.id === log.id ? 'bg-sky-500/5 border-sky-500/30' : 'bg-white border-slate-100 hover:border-slate-300'}`}
                      >
                        <div className="flex justify-between mb-4">
                          <p className="text-[10px] font-bold text-slate-400 uppercase">{log.date}</p>
                          <Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[8px] font-bold uppercase">{log.status}</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-[8px] uppercase font-bold text-slate-400">pH Level</p>
                            <p className="text-lg font-bold font-code">{log.ph}</p>
                          </div>
                          <div>
                            <p className="text-[8px] uppercase font-bold text-slate-400">TDS (ppm)</p>
                            <p className="text-lg font-bold font-code">{log.tds}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </Card>
            </TabsContent>

            <TabsContent value="logistics" className="m-0 flex-1">
              <Card className="border-slate-200 shadow-xl h-full p-8 text-center space-y-6 flex flex-col justify-center bg-white">
                <Truck className="w-12 h-12 text-sky-500 mx-auto" />
                <h3 className="text-2xl font-bold tracking-tighter italic uppercase font-headline">Fleet Control</h3>
                <p className="text-sm text-slate-500 max-w-sm mx-auto">Real-time driver assignments and zone logistics tracking.</p>
                <ActionGuard sensitivity="low" actionLabel="Optimize Routes" className="mx-auto" />
              </Card>
            </TabsContent>

            <TabsContent value="impact" className="m-0 flex-1">
              <Card className="border-slate-200 shadow-xl h-full p-8 text-center space-y-6 flex flex-col justify-center bg-white">
                <BarChart3 className="w-12 h-12 text-sky-500 mx-auto" />
                <h3 className="text-2xl font-bold tracking-tighter italic uppercase font-headline">Sustainability</h3>
                <p className="text-sm text-slate-500 max-w-sm mx-auto">Track corporate impact and community water outreach metrics.</p>
                <ActionGuard sensitivity="low" actionLabel="New Record" className="mx-auto" />
              </Card>
            </TabsContent>

            <TabsContent value="cms" className="m-0 flex-1">
              <DivisionCMSEditor division="water" />
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Preview */}
        <div className="lg:col-span-4 flex flex-col gap-6 h-full">
          <Card className="border-slate-200 shadow-xl flex-1 flex flex-col overflow-hidden bg-slate-50/30">
            <CardHeader className="border-b bg-white/80 backdrop-blur-md py-4 px-6 flex flex-row items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-sky-500" />
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-900">Live Preview</h3>
              </div>
              <Badge className="bg-emerald-500 text-white text-[8px] uppercase tracking-widest px-2 font-bold">Verified</Badge>
            </CardHeader>
            <div className="flex-1 overflow-auto p-0">
               <LivePreview 
                item={selectedLog} 
                division="water" 
                isHOD={isHOD}
                onApprove={() => toast({ title: "Report Published", description: "Water purity data is now live." })}
                onReject={() => toast({ variant: "destructive", title: "Flagged", description: "Log report rejected." })}
               />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}