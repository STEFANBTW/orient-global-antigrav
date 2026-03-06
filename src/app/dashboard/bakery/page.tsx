"use client";

import { useRoles, type MenuItem } from "@/context/role-context";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ActionGuard } from "@/components/dashboard/action-guard";
import { LivePreview } from "@/components/dashboard/live-preview";
import DivisionCMSEditor from "@/components/dashboard/cms/DivisionEditor";
import { 
  Activity, 
  Timer, 
  Palette,
  Eye,
  Settings
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export default function BakeryCommandCenter() {
  const { currentUser, diningMenu, activeModule } = useRoles();
  const role = currentUser?.role;
  const selectedItem: MenuItem = diningMenu[0];

  const isHOD = role === 'admin_head' || role === 'admin_boss';

  return (
    <div className="h-full flex flex-col gap-6 bg-slate-50/20 p-2 rounded-3xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-100 pb-8 px-6 pt-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-amber-500/10 border-amber-500/20 text-amber-700 uppercase text-[9px] tracking-widest font-bold px-3 italic">
              Bakery & Cake Orders
            </Badge>
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </div>
          <h1 className="text-5xl font-bold text-slate-900 tracking-tighter uppercase italic font-headline truncate">Bakery Command</h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Production Queue & Custom Designs</p>
        </div>
        <div className="flex items-center gap-3">
          <ActionGuard sensitivity="high" actionLabel="Emergency Stop" variant="destructive" />
          <ActionGuard sensitivity="low" actionLabel="Log Batch" />
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0 px-6 pb-6">
        {/* Workspace */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <Tabs value={activeModule || 'production'} className="w-full flex-1 flex flex-col">
            <TabsContent value="production" className="m-0 flex-1">
              <Card className="border-slate-100 shadow-xl shadow-amber-500/5 h-full flex flex-col bg-white rounded-2xl overflow-hidden">
                <CardHeader className="bg-slate-50/30 border-b">
                  <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                    <Activity className="w-4 h-4 text-amber-600" /> Live Production
                  </CardTitle>
                  <CardDescription className="text-[9px] uppercase font-bold tracking-widest text-slate-400">Current active batches in progress</CardDescription>
                </CardHeader>
                <div className="p-6 space-y-6">
                  {[
                    { name: 'Artisan Sourdough', stage: 'Fermentation', progress: 65, time: '14h left' },
                    { name: 'Rustic Baguette', stage: 'Proofing', progress: 85, time: '2h left' },
                    { name: 'Butter Croissants', stage: 'Mixing', progress: 20, time: '22h left' },
                  ].map(batch => (
                    <div key={batch.name} className="space-y-3">
                      <div className="flex justify-between items-end">
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{batch.name}</h4>
                          <p className="text-[10px] text-amber-600 uppercase font-bold">{batch.stage}</p>
                        </div>
                        <span className="text-[10px] font-code text-slate-400">{batch.time}</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500" style={{ width: `${batch.progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="catalog" className="m-0 flex-1">
              <Card className="border-slate-100 shadow-xl h-full flex flex-col bg-white rounded-2xl overflow-hidden p-6 text-center justify-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto text-amber-600">
                  <Palette className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Pastry Catalog</h3>
                <p className="text-slate-500 max-w-md mx-auto">
                  To manage the pastry menu, specials, and pricing, please use the <strong>Site Content</strong> module.
                </p>
              </Card>
            </TabsContent>

            <TabsContent value="configurator" className="m-0 flex-1">
              <Card className="border-slate-100 h-full p-8 text-center space-y-6 bg-white rounded-2xl">
                <Palette className="w-10 h-10 text-amber-600 mx-auto" />
                <h3 className="text-xl font-bold tracking-tighter italic font-headline uppercase">Custom Cake Orders</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">Review 3D custom cake designs and event specifications from clients.</p>
                <ActionGuard sensitivity="high" actionLabel="Process Orders" className="mx-auto bg-amber-600 hover:bg-amber-700 text-white" />
              </Card>
            </TabsContent>

            <TabsContent value="cms" className="m-0 flex-1">
              <DivisionCMSEditor division="bakery" />
            </TabsContent>
          </Tabs>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-4 flex flex-col gap-6 h-full">
          <Card className="border-slate-100 shadow-xl flex-1 flex flex-col overflow-hidden bg-white rounded-2xl">
            <CardHeader className="border-b bg-slate-50/30 py-4 px-6 flex flex-row items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-amber-600" />
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-900">Live View</h3>
              </div>
              <Badge className="bg-amber-600 text-white text-[8px] uppercase tracking-widest px-2 font-bold">Staged</Badge>
            </CardHeader>
            <div className="flex-1 overflow-auto p-0">
               <LivePreview 
                item={selectedItem} 
                division="bakery" 
                isHOD={isHOD}
                onApprove={() => toast({ title: "Bake Published", description: "Item is now live on the catalog." })}
                onReject={() => toast({ variant: "destructive", title: "Recalled", description: "Item draft returned to Staff." })}
               />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}