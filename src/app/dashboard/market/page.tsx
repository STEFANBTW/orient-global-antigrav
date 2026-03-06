"use client";

import { useState } from "react";
import { useRoles, type SKUItem } from "@/context/role-context";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ActionGuard } from "@/components/dashboard/action-guard";
import { LivePreview } from "@/components/dashboard/live-preview";
import MarketInventoryEditor from "@/components/dashboard/market/MarketInventoryEditor";
import MarketCMSEditor from "@/components/dashboard/market/MarketCMSEditor";
import { 
  Box, 
  Search, 
  Filter, 
  Eye, 
  Tag, 
  ArrowUpRight,
  Cpu
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";

export default function MarketCommandCenter() {
  const { currentUser, skus, activeModule } = useRoles();
  const role = currentUser?.role;
  const [selectedSKU, setSelectedSKU] = useState<SKUItem>(skus[0]);

  const isHOD = role === 'admin_head' || role === 'admin_boss';

  return (
    <div className="h-full flex flex-col gap-6 bg-slate-50/50 p-2 rounded-3xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 pb-8 px-6 pt-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge className="bg-slate-900 text-white uppercase text-[8px] tracking-[0.2em] font-bold px-2 rounded-sm">
              Global SKU Master
            </Badge>
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight uppercase font-headline">Market Watch</h1>
          <p className="text-slate-400 font-medium uppercase tracking-[0.1em] text-[10px] flex items-center gap-2">
            <Cpu className="w-3 h-3" /> Smart Paste AI Tuner Active
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ActionGuard sensitivity="high" actionLabel="Audit Supply Chain" variant="outline" className="border-slate-200 text-slate-600 h-10" />
          <ActionGuard sensitivity="low" actionLabel="Bulk Stock Count" className="bg-slate-900 hover:bg-slate-800 text-white h-10" />
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0 px-6 pb-6">
        {/* Workspace */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <Tabs defaultValue="inventory" className="w-full flex-1 flex flex-col">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0 mb-4">
              <TabsTrigger value="inventory" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none">Inventory</TabsTrigger>
              <TabsTrigger value="cms" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none">CMS Editor</TabsTrigger>
              <TabsTrigger value="ai" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none">AI Tuner</TabsTrigger>
              <TabsTrigger value="wholesale" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none">Wholesale</TabsTrigger>
            </TabsList>

            <TabsContent value="inventory" className="m-0 flex-1">
              <MarketInventoryEditor />
            </TabsContent>

            <TabsContent value="cms" className="m-0 flex-1">
              <MarketCMSEditor />
            </TabsContent>

            <TabsContent value="ai" className="m-0 flex-1">
              <Card className="border-slate-200 shadow-sm p-6 space-y-6 bg-white rounded-xl h-full">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900 uppercase">Smart Paste AI Tuner</h3>
                  <Badge className="bg-sky-500/10 text-sky-600 border-none text-[10px]">94.2% Acc.</Badge>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Top Search Leads</p>
                    {['Milk', 'Ribeye', 'Truffle Chips'].map(word => (
                      <div key={word} className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-slate-200">
                        <span className="text-xs font-bold">{word}</span>
                        <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col justify-center items-center text-center space-y-2 border border-dashed rounded-xl p-6">
                    <Cpu className="w-6 h-6 text-slate-300" />
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">No Active Anomalies</p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="wholesale" className="m-0 flex-1">
              <Card className="border-slate-200 shadow-sm p-8 text-center space-y-6 bg-white rounded-xl h-full flex flex-col justify-center">
                 <Box className="w-10 h-10 text-slate-300 mx-auto" />
                 <h3 className="text-xl font-bold uppercase tracking-tighter">Wholesale Kanban</h3>
                 <p className="text-xs text-slate-500 max-w-sm mx-auto">Manage corporate bulk orders and high-volume requests.</p>
                 <ActionGuard sensitivity="high" actionLabel="Audit Contracts" className="mx-auto" />
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-4 flex flex-col gap-6 h-full">
          <Card className="border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden bg-white rounded-xl">
            <CardHeader className="border-b bg-slate-50/50 py-4 px-6 flex flex-row items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-slate-900" />
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-900">SKU Auditor</h3>
              </div>
              <Badge className="bg-emerald-500 text-white text-[8px] uppercase tracking-widest px-2 font-bold">Live</Badge>
            </CardHeader>
            <div className="flex-1 overflow-auto p-0">
               <LivePreview 
                item={selectedSKU} 
                division="market" 
                isHOD={isHOD}
                onApprove={() => toast({ title: "POS Synced", description: "Global pricing has been updated." })}
                onReject={() => toast({ variant: "destructive", title: "Flagged", description: "Price adjustment rejected for margin error." })}
               />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}