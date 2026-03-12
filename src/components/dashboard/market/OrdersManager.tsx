import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Package, Clock, CheckCircle2, Truck, AlertCircle, RefreshCw, Eye, ChevronRight, Download } from "lucide-react";

export interface MarketOrder {
    id: string;
    customer_name: string;
    customer_email: string | null;
    customer_phone: string;
    customer_address: string;
    items: any[];
    subtotal: number;
    delivery_fee: number;
    total: number;
    status: string;
    payment_status: string;
    payment_ref: string | null;
    rider_name?: string | null;
    created_at: string;
    division: string;
}

const ORDER_STATUSES = ["pending", "confirmed", "preparing", "dispatched", "delivered", "cancelled"];

export default function OrdersManager({ isDarkMode = true }: { isDarkMode?: boolean }) {
    const [orders, setOrders] = useState<MarketOrder[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("unified_orders")
            .select("*")
            .eq("division", "market")
            .order("created_at", { ascending: false });
        
        if (!error && data) {
            setOrders(data.map(o => ({
                ...o,
                items: typeof o.items === 'string' ? JSON.parse(o.items) : o.items
            })));
        }
        setLoading(false);
    };

    useEffect(() => { fetchOrders(); }, []);

    // Realtime subscription
    useEffect(() => {
        const channel = supabase
            .channel("market_orders_changes")
            .on("postgres_changes", { 
                event: "*", 
                schema: "public", 
                table: "unified_orders",
                filter: "division=eq.market"
            }, () => {
                fetchOrders();
            })
            .subscribe();
        return () => { supabase.removeChannel(channel); };
    }, []);

    const updateStatus = async (id: string, idx: number) => {
        const nextStatus = ORDER_STATUSES[idx + 1];
        if (!nextStatus) return;
        const { error } = await supabase.from("unified_orders").update({ status: nextStatus }).eq("id", id);
        if (error) toast({ variant: "destructive", title: "Error", description: error.message });
        else toast({ title: "Order Updated", description: `Moved to ${nextStatus}` });
    };

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            pending: "bg-amber-500/10 text-amber-600 border-amber-500/20",
            confirmed: "bg-blue-500/10 text-blue-600 border-blue-500/20",
            preparing: "bg-purple-500/10 text-purple-600 border-purple-500/20",
            dispatched: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
            delivered: "bg-green-500/10 text-green-600 border-green-500/20",
            cancelled: "bg-red-500/10 text-red-600 border-red-500/20",
        };
        const currentStyle = styles[status] || "bg-slate-500/10 text-slate-600 border-slate-500/20";
        return <Badge className={`border px-2 py-0.5 rounded-md font-bold text-[10px] uppercase tracking-wider ${currentStyle}`}>{status}</Badge>;
    };

    const getPaymentBadge = (status: string) => {
        return status === "paid"
            ? <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5">Paid</Badge>
            : <Badge className="bg-slate-500/10 text-slate-500 border-slate-500/20 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5">{status}</Badge>;
    };

    return (
        <div className="space-y-8 mcms">
            {/* Header Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="p-5 border shadow-sm flex flex-col gap-1 transition-all" style={{ backgroundColor: 'var(--mcms-card)', borderColor: 'var(--mcms-card-border)' }}>
                    <div className="flex items-center gap-2 mb-1" style={{ color: 'var(--mcms-text-muted)' }}><Clock className="w-4 h-4" /><span className="text-[10px] font-black uppercase tracking-widest">Pending</span></div>
                    <span className="text-3xl font-bold tracking-tight" style={{ color: 'var(--mcms-text)' }}>{orders.filter(o => o.status === "pending").length}</span>
                </Card>
                <Card className="p-5 border shadow-sm flex flex-col gap-1 transition-all" style={{ backgroundColor: 'var(--mcms-card)', borderColor: 'var(--mcms-card-border)' }}>
                    <div className="flex items-center gap-2 mb-1" style={{ color: 'var(--mcms-accent)' }}><RefreshCw className="w-4 h-4" /><span className="text-[10px] font-black uppercase tracking-widest">Processing</span></div>
                    <span className="text-3xl font-bold tracking-tight" style={{ color: 'var(--mcms-text)' }}>{orders.filter(o => ["confirmed", "preparing"].includes(o.status)).length}</span>
                </Card>
                <Card className="p-5 border shadow-sm flex flex-col gap-1 transition-all" style={{ backgroundColor: 'var(--mcms-card)', borderColor: 'var(--mcms-card-border)' }}>
                    <div className="flex items-center gap-2 mb-1 text-indigo-500"><Truck className="w-4 h-4" /><span className="text-[10px] font-black uppercase tracking-widest">Dispatched</span></div>
                    <span className="text-3xl font-bold tracking-tight" style={{ color: 'var(--mcms-text)' }}>{orders.filter(o => o.status === "dispatched").length}</span>
                </Card>
                <Card className="p-5 border shadow-sm flex flex-col gap-1 transition-all" style={{ backgroundColor: 'var(--mcms-card)', borderColor: 'var(--mcms-card-border)' }}>
                    <div className="flex items-center gap-2 mb-1 text-green-500"><CheckCircle2 className="w-4 h-4" /><span className="text-[10px] font-black uppercase tracking-widest">Delivered Today</span></div>
                    <span className="text-3xl font-bold tracking-tight" style={{ color: 'var(--mcms-text)' }}>{orders.filter(o => o.status === "delivered" && new Date(o.created_at).toDateString() === new Date().toDateString()).length}</span>
                </Card>
            </div>

            {/* Kanban Board */}
            <div className="flex gap-6 overflow-x-auto pb-6 hide-scrollbar">
                {ORDER_STATUSES.slice(0, 5).map((colStatus, idx) => {
                    const colOrders = orders.filter(o => o.status === colStatus);
                    return (
                        <div key={colStatus} className="flex-none w-80 flex flex-col gap-4">
                            <div className="flex items-center justify-between px-1">
                                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-2" style={{ color: 'var(--mcms-text-muted)' }}>
                                    {colStatus} <span className="ml-1 px-1.5 py-0.5 rounded-md bg-white/5 text-[10px] tracking-normal font-bold">{colOrders.length}</span>
                                </h3>
                            </div>
                            <div className="flex-1 rounded-2xl p-2.5 flex flex-col gap-2.5 min-h-[600px] transition-colors" style={{ backgroundColor: 'var(--mcms-kanban-bg)' }}>
                                {colOrders.map(order => (
                                    <Card key={order.id} className="p-4 border shadow-sm hover:shadow-md transition-all duration-300 group cursor-default" style={{ backgroundColor: 'var(--mcms-card)', borderColor: 'var(--mcms-card-border)' }}>
                                        <div className="flex justify-between items-start mb-3">
                                            <span className="text-[9px] font-mono opacity-40" style={{ color: 'var(--mcms-text)' }}>#{order.id.slice(0, 8).toUpperCase()}</span>
                                            {getPaymentBadge(order.payment_status)}
                                        </div>
                                        <p className="font-bold text-sm mb-1 tracking-tight" style={{ color: 'var(--mcms-text)' }}>{order.customer_name}</p>
                                        <p className="text-[10px] font-medium opacity-60 mb-4" style={{ color: 'var(--mcms-text)' }}>{order.items.length} items · ₦{order.total.toLocaleString()}</p>

                                        <div className="pt-3 border-t flex items-center justify-between" style={{ borderColor: 'var(--mcms-card-border)' }}>
                                            <span className="text-[9px] font-bold opacity-30 uppercase tracking-wider" style={{ color: 'var(--mcms-text)' }}>{new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            {idx < 4 && (
                                                <button
                                                    onClick={() => updateStatus(order.id, idx)}
                                                    className="h-7 text-[9px] font-black uppercase tracking-widest text-black rounded-full px-4 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-amber-500/20"
                                                    style={{ backgroundColor: 'var(--mcms-accent)' }}
                                                >
                                                    Process <ChevronRight className="w-3 h-3 ml-1 inline" />
                                                </button>
                                            )}
                                        </div>
                                    </Card>
                                ))}
                                {colOrders.length === 0 && (
                                    <div className="flex items-center justify-center flex-1 border-2 border-dashed rounded-2xl transition-colors opacity-20" style={{ borderColor: 'var(--mcms-card-border)' }}>
                                        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--mcms-text-muted)' }}>No Orders</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
