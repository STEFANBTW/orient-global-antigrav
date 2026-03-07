'use client';

import { useRoles } from "@/context/role-context";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ActionGuard } from "@/components/dashboard/action-guard";
import { RequestStatusTable } from "@/components/dashboard/request-status";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import {
  Building2,
  TrendingUp,
  Users,
  AlertTriangle,
  ArrowUpRight,
  ShieldCheck,
  Activity,
  Zap,
  DollarSign,
  Grid,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { QuickActionsWidget } from "@/components/admin/QuickActionsWidget";

export default function DashboardOverview() {
  const { currentUser } = useRoles();

  if (!currentUser) return null;

  const divisions = ['bakery', 'dining', 'games', 'lounge', 'market', 'water'];

  return (
    <div className="space-y-6 md:space-y-10 max-w-[1600px] mx-auto pb-10 md:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 pb-6 md:pb-10"
      >
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Badge className="bg-primary text-white border-none text-[9px] font-bold tracking-[0.2em] px-3 uppercase">
              Admin Access
            </Badge>
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </div>
          <h1 className="text-4xl md:text-7xl font-bold text-slate-900 tracking-tighter uppercase font-headline italic">
            Global Summary
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">
            Overall Company Performance
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {divisions.map((div, i) => (
              <motion.div
                key={div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={`/dashboard/${div}`}>
                  <Card className="group bg-white border-slate-100 hover:border-primary/40 transition-all cursor-pointer overflow-hidden professional-shadow">
                    <CardHeader className="p-4 border-b border-slate-50 bg-slate-50/50 flex flex-row items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{div}</span>
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </CardHeader>
                    <CardContent className="p-4 md:p-6">
                      <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-end">
                          <p className="text-xl md:text-2xl font-bold font-code text-slate-900 italic">₦{(Math.random() * 2 + 1).toFixed(1)}M</p>
                          <span className="text-[10px] text-emerald-500 font-bold uppercase">+12%</span>
                        </div>
                        <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-primary w-[75%]" />
                        </div>
                        <p className="text-[9px] text-slate-400 uppercase font-bold tracking-widest text-center group-hover:text-primary transition-colors flex items-center justify-center">
                          Open Details <ChevronRight className="w-3 h-3 ml-1" />
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <Card className="bg-white border-slate-100 professional-shadow">
            <CardHeader className="border-b border-slate-50 p-6 md:p-8 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-slate-900 uppercase italic">Recent Alerts</CardTitle>
                <CardDescription>Events for review.</CardDescription>
              </div>
              <Activity className="w-8 h-8 text-primary/10" />
            </CardHeader>
            <ActivityFeed />
          </Card>
        </div>

        <div className="space-y-6 md:space-y-8">
          <QuickActionsWidget />

          <Card className="bg-slate-900 text-white p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-primary" />
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em]">Quick Controls</h3>
            </div>
            <div className="space-y-4">
              <Button className="w-full bg-primary hover:bg-primary/90 text-[10px] font-bold uppercase tracking-widest h-12">System Reset</Button>
              <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5 text-[10px] font-bold uppercase tracking-widest h-12">Staff Message</Button>
              <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5 text-[10px] font-bold uppercase tracking-widest h-12">Lock All Screens</Button>
            </div>
            <p className="text-[9px] text-white/40 italic leading-relaxed text-center uppercase tracking-widest">
              These actions are permanent and logged.
            </p>
          </Card>

          <Card className="bg-white border-slate-100 p-6 md:p-8 professional-shadow">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-8 font-code">System Check</h3>
            <div className="space-y-6">
              {[
                { label: "Active Nodes", value: "6/6", color: "text-emerald-500" },
                { label: "Total Staff", value: "128", color: "text-slate-900" },
                { label: "Requests", value: "14", color: "text-primary" },
              ].map(stat => (
                <div key={stat.label} className="flex justify-between items-center border-b border-slate-50 pb-4">
                  <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest truncate mr-4">{stat.label}</span>
                  <span className={`text-sm font-bold font-code shrink-0 ${stat.color}`}>{stat.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { ChevronRight as ChevronRightIcon } from "lucide-react";
