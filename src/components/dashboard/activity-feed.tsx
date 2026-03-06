
"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, ShoppingCart, AlertCircle, UtensilsCrossed, Zap, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const activities = [
  { id: 1, type: "system", message: "Revenue spike detected in Dining division (+14%)", time: "2m", icon: AlertCircle, color: "text-red-500", urgency: "critical" },
  { id: 2, type: "proposal", message: "Bakery requested ₦1.2M for equipment upgrade", time: "15m", icon: Zap, color: "text-primary", urgency: "high" },
  { id: 3, type: "order", message: "New wholesale contract: Raspberry Velvet Cakes", time: "24m", icon: ShoppingCart, color: "text-slate-900", urgency: "normal" },
  { id: 4, type: "security", message: "VIP Guest Arrival: Chief Okoro (Dining)", time: "1h", icon: ShieldCheck, color: "text-emerald-500", urgency: "normal" },
  { id: 5, type: "inventory", message: "Low Stock: Premium Artisan Flour", time: "2h", icon: AlertCircle, color: "text-orange-500", urgency: "low" },
  { id: 6, type: "proposal", message: "Dining requested 100% Comp for VIP Table #4", time: "3h", icon: UtensilsCrossed, color: "text-primary", urgency: "high" },
];

export function ActivityFeed() {
  return (
    <ScrollArea className="h-[400px]">
      <div className="divide-y divide-slate-50">
        {activities.map((activity) => (
          <div key={activity.id} className="p-5 flex gap-5 group hover:bg-slate-50 transition-colors cursor-default">
            <div className={`h-10 w-10 shrink-0 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200 transition-all group-hover:scale-105`}>
              <activity.icon className={`w-5 h-5 ${activity.color}`} />
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                   <p className="text-xs font-bold text-slate-900 leading-tight truncate">
                    {activity.message}
                  </p>
                  <Badge variant="outline" className={`text-[8px] h-3.5 uppercase tracking-widest border-none shrink-0 ${
                    activity.urgency === 'critical' ? 'bg-red-500/10 text-red-500' :
                    activity.urgency === 'high' ? 'bg-primary/10 text-primary' :
                    'bg-slate-200 text-slate-500'
                  }`}>
                    {activity.urgency}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-slate-400 shrink-0">
                  <Clock className="w-2.5 h-2.5" />
                  <span className="text-[9px] font-bold font-code">
                    {activity.time}
                  </span>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed truncate">
                Origin: Division {activity.type.toUpperCase()} • System ID: JD-402
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
