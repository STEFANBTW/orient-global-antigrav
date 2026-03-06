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

export default function DashboardOverview() {
  const { currentUser } = useRoles();

  if (!currentUser) return null;

  const isBoss = currentUser.role === 'admin_boss';

  if (isBoss) {
    return <BossMatrix />;
  }

  return (
    <div className="space-y-6 md:space-y-10 max-w-[1600px] mx-auto pb-10 md:pb-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 pb-6 md:pb-10"
      >
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Badge className="bg-primary/10 text-primary border-primary/20 text-[9px] font-bold tracking-[0.2em] px-3 uppercase">
              Division: {currentUser.division.toUpperCase()}
            </Badge>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tighter uppercase font-headline italic">
            Dashboard
          </h1>
          <p className="text-slate-400 font-medium flex items-center gap-2 text-xs uppercase tracking-widest">
            System Status: <span className="text-emerald-500 font-bold">Online</span>
          </p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <ActionGuard 
            sensitivity="high" 
            actionLabel="Refresh Data" 
            variant="outline" 
            className="w-full md:w-auto border-slate-200 h-11 md:h-9"
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: "Daily Volume", value: "94.2%", icon: Activity, trend: "+2.1%", color: "text-emerald-500" },
          { label: "Active Staff", value: "24", icon: Users, trend: "Stable", color: "text-primary" },
          { label: "Revenue", value: "₦1.8M", icon: DollarSign, trend: "+12.5%", color: "text-slate-900" },
          { label: "System Speed", value: "4ms", icon: Zap, trend: "-1ms", color: "text-blue-400" },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="bg-white border-slate-100 overflow-hidden group hover:border-primary/20 transition-all professional-shadow">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{stat.label}</p>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl md:text-3xl font-bold font-code text-slate-900">{stat.value}</h3>
                  <span className="text-[10px] text-emerald-500 font-bold">{stat.trend}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          <Tabs defaultValue="operations" className="w-full">
            <TabsList className="bg-slate-100 border border-slate-200 p-1 h-11 md:h-12 mb-6 w-full md:w-fit">
              <TabsTrigger value="operations" className="flex-1 md:flex-none data-[state=active]:bg-primary data-[state=active]:text-white font-bold text-[10px] uppercase tracking-widest px-4 md:px-8">
                Daily Work
              </TabsTrigger>
              <TabsTrigger value="proposals" className="flex-1 md:flex-none data-[state=active]:bg-primary data-[state=active]:text-white font-bold text-[10px] uppercase tracking-widest px-4 md:px-8">
                My Requests
              </TabsTrigger>
            </TabsList>

            <TabsContent value="operations" className="mt-0">
              <Card className="bg-white border-slate-100 professional-shadow">
                <CardHeader className="border-b border-slate-50 p-6 md:p-8">
                  <CardTitle className="text-xl font-bold text-slate-900 uppercase italic">Division Info</CardTitle>
                  <CardDescription>Updates for the {currentUser.division} division.</CardDescription>
                </CardHeader>
                <CardContent className="p-6 md:p-8 space-y-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Quick Tasks</h4>
                        <div className="space-y-3">
                          <ActionGuard sensitivity="high" actionLabel="Clear Cache" className="w-full justify-start h-12" />
                          <ActionGuard sensitivity="low" actionLabel="Update Hours" className="w-full justify-start h-12" />
                        </div>
                      </div>
                      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-center items-center text-center space-y-4">
                        <ShieldCheck className="w-12 h-12 text-primary/20" />
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 mb-2 italic">Secure Login</h4>
                          <p className="text-[10px] text-slate-400 leading-relaxed uppercase tracking-widest">
                            Your activity is logged. <br/>ID: {currentUser.id}
                          </p>
                        </div>
                      </div>
                   </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="proposals">
               <RequestStatusTable />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6 md:space-y-8">
          <Card className="bg-white border-slate-100 p-6 md:p-8 professional-shadow">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-8 font-code">Market Info</h3>
            <div className="space-y-6">
              {[
                { label: "Supply Chain", status: "Online", color: "text-emerald-500" },
                { label: "Work Quality", status: "Good", color: "text-emerald-500" },
                { label: "Revenue Trend", status: "Up 2%", color: "text-amber-500" },
              ].map(intel => (
                <div key={intel.label} className="flex justify-between items-center border-b border-slate-50 pb-4">
                  <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest truncate mr-4">{intel.label}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-widest shrink-0 ${intel.color}`}>{intel.status}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-primary/5 border-primary/10 p-6 md:p-8 text-center space-y-4">
            <TrendingUp className="w-8 h-8 text-primary mx-auto" />
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Growth Plan</h4>
            <p className="text-2xl font-bold font-code text-slate-900">+18.4%</p>
            <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Quarterly Goal</p>
          </Card>
        </div>
      </div>
    </div>
  );
}

function BossMatrix() {
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
