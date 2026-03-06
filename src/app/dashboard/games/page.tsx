"use client";

import { useState } from "react";
import { useRoles, type Tournament, type HardwareRig } from "@/context/role-context";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ActionGuard } from "@/components/dashboard/action-guard";
import { HardwareMap } from "@/components/dashboard/hardware-map";
import DivisionCMSEditor from "@/components/dashboard/cms/DivisionEditor";
import { 
  Trophy, 
  Monitor, 
  Eye,
  Plus
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LivePreview } from "@/components/dashboard/live-preview";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function GamesCommandCenter() {
  const { currentUser, tournaments, hardwareRigs, activeModule } = useRoles();
  const role = currentUser?.role;
  const [selectedRig, setSelectedRig] = useState<HardwareRig | null>(null);
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(tournaments[0]);

  const isHOD = role === 'admin_head' || role === 'admin_boss';

  return (
    <div className="h-full flex flex-col gap-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-100 pb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Badge className="bg-primary/10 text-primary border-primary/20 uppercase text-[9px] tracking-widest font-bold px-3">
              Games Node
            </Badge>
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </div>
          <h1 className="text-5xl font-bold text-slate-900 tracking-tighter uppercase italic font-headline truncate">Arena Command</h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Gaming Station Status & Tournaments</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <ActionGuard sensitivity="high" actionLabel="Emergency Purge" variant="destructive" />
          <ActionGuard sensitivity="low" actionLabel="Sanction Match" />
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0">
        {/* Workspace */}
        <div className="lg:col-span-8 flex flex-col gap-6 min-w-0">
          <Tabs value={activeModule || 'hardware'} className="w-full flex-1 flex flex-col">
            <TabsContent value="hardware" className="m-0 flex-1 flex flex-col gap-6">
              <Card className="border-slate-200 shadow-sm flex flex-col flex-1 overflow-hidden bg-white">
                <CardHeader className="border-b bg-slate-50/50 py-4 px-6 flex flex-row items-center justify-between gap-4">
                  <div className="min-w-0">
                    <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-primary shrink-0" /> Hardware Map
                    </CardTitle>
                  </div>
                </CardHeader>
                <div className="flex-1 p-8">
                  <HardwareMap 
                    rigs={hardwareRigs} 
                    onSelectRig={(rig) => setSelectedRig(rig)}
                    selectedRigId={selectedRig?.id}
                  />
                </div>
                {selectedRig && (
                  <div className="border-t bg-slate-50 p-6 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className={`w-2 h-2 rounded-full shrink-0 ${selectedRig.status === 'maintenance' ? 'bg-red-500' : 'bg-emerald-500'} animate-pulse`} />
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold text-slate-900 uppercase tracking-widest truncate">{selectedRig.id}</p>
                        <p className="text-[8px] text-slate-400 uppercase font-bold tracking-widest">Health: {selectedRig.health}%</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <ActionGuard sensitivity="low" actionLabel="Diag" variant="outline" size="sm" className="h-8" />
                      <ActionGuard sensitivity="high" actionLabel="Maintenance" size="sm" className="h-8" />
                    </div>
                  </div>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="tournament" className="m-0 flex-1 flex flex-col gap-6">
              <Card className="border-slate-200 shadow-sm flex flex-col flex-1 overflow-hidden bg-white">
                <CardHeader className="border-b bg-slate-50/50 py-4 px-6 flex flex-row items-center justify-between gap-4">
                  <div className="min-w-0">
                    <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-primary shrink-0" /> Tournaments
                    </CardTitle>
                  </div>
                  <Button size="sm" variant="outline" className="h-8 text-[8px] font-bold uppercase tracking-widest shrink-0">
                    <Plus className="w-3.5 h-3.5 mr-1" /> New
                  </Button>
                </CardHeader>
                <ScrollArea className="flex-1">
                  <Table>
                    <TableHeader className="bg-slate-50 sticky top-0 z-10 border-b">
                      <TableRow>
                        <TableHead className="text-[9px] font-bold uppercase tracking-widest py-4">Title</TableHead>
                        <TableHead className="text-[9px] font-bold uppercase tracking-widest text-right">Prize</TableHead>
                        <TableHead className="text-[9px] font-bold uppercase tracking-widest text-right">Moderation</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tournaments.map((tour) => (
                        <TableRow 
                          key={tour.id} 
                          className={`border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer ${selectedTournament?.id === tour.id ? 'bg-primary/5' : ''}`}
                          onClick={() => setSelectedTournament(tour)}
                        >
                          <TableCell>
                            <div className="flex flex-col min-w-0">
                              <span className="text-xs font-bold text-slate-900 truncate">{tour.title}</span>
                              <Badge className={`w-fit text-[8px] uppercase tracking-widest mt-1 border-none px-1.5 ${tour.status === 'live' ? 'bg-emerald-500 text-white' : 'bg-primary/10 text-primary'}`}>
                                {tour.status}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <span className="text-[10px] font-bold font-code text-slate-900">₦{(tour.prizePool / 1000000).toFixed(1)}M</span>
                          </TableCell>
                          <TableCell className="text-right">
                            <ActionGuard sensitivity="high" actionLabel="Audit" size="sm" variant="ghost" className="h-8" />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </Card>
            </TabsContent>

            <TabsContent value="cms" className="m-0 flex-1">
              <DivisionCMSEditor division="games" />
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Preview */}
        <div className="lg:col-span-4 flex flex-col gap-6 h-full min-w-0">
          <Card className="border-slate-200 shadow-xl flex-1 flex flex-col overflow-hidden bg-slate-50/50 backdrop-blur-xl">
            <CardHeader className="border-b bg-white/80 py-4 px-6 flex flex-row items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-primary shrink-0" />
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-900">Arena State</h3>
              </div>
              <Badge className="bg-emerald-500 text-white text-[8px] uppercase tracking-widest px-2 font-bold shrink-0 animate-pulse">Synced</Badge>
            </CardHeader>
            <div className="flex-1 overflow-auto p-0">
               <LivePreview 
                item={selectedTournament || tournaments[0]} 
                division="games" 
                isHOD={isHOD}
                onApprove={() => toast({ title: "Authorized", description: "Tournament sanctioned." })}
                onReject={() => toast({ variant: "destructive", title: "Flagged", description: "Draft rejected." })}
               />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}