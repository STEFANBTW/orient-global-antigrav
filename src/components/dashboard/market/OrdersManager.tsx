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
}

const ORDER_STATUSES = ["pending", "confirmed", "preparing", "dispatched", "delivered", "cancelled"];

export default function OrdersManager() {
    const [orders, setOrders] = useState<MarketOrder[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        setLoading(true);
        const { data, error } = await supabase.from("market_orders").select("*").order("created_at", { ascending: false });
        if (!error && data) setOrders(data);
        setLoading(false);
    };

    useEffect(() => { fetchOrders(); }, []);

    // Realtime subscription
    useEffect(() => {
        const channel = supabase
            .channel("orders_changes")
            .on("postgres_changes", { event: "*", schema: "public", table: "market_orders" }, () => {
                fetchOrders();
            })
            .subscribe();
        return () => { supabase.removeChannel(channel); };
    }, []);

    const updateStatus = async (id: string, idx: number) => {
        const nextStatus = ORDER_STATUSES[idx + 1];
        if (!nextStatus) return;
        const { error } = await supabase.from("market_orders").update({ status: nextStatus }).eq("id", id);
        if (error) toast({ variant: "destructive", title: "Error", description: error.message });
        else toast({ title: "Order Updated", description: `Moved to ${nextStatus}` });
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pending": return <Badge className="bg-amber-100 text-amber-700">Pending</Badge>;
            case "confirmed": return <Badge className="bg-blue-100 text-blue-700">Confirmed</Badge>;
            case "preparing": return <Badge className="bg-purple-100 text-purple-700">Preparing</Badge>;
            case "dispatched": return <Badge className="bg-indigo-100 text-indigo-700">Dispatched</Badge>;
            case "delivered": return <Badge className="bg-green-100 text-green-700">Delivered</Badge>;
            case "cancelled": return <Badge className="bg-red-100 text-red-700">Cancelled</Badge>;
            default: return <Badge>{status}</Badge>;
        }
    };

    const getPaymentBadge = (status: string) => {
        return status === "paid"
            ? <Badge className="bg-green-500 text-white text-[9px]">Paid</Badge>
            : <Badge className="bg-slate-200 text-slate-600 text-[9px]">{status}</Badge>;
    };

    return (
        <div className="space-y-6 mcms">
            {/* Header Stats */}
            <div className="grid grid-cols-4 gap-4">
                <Card className="p-4 border flex flex-col gap-1" style={{ backgroundColor: 'var(--mcms-card)', borderColor: 'var(--mcms-card-border)' }}>
                    <div className="flex items-center gap-2 mb-1" style={{ color: 'var(--mcms-text-muted)' }}><Clock className="w-4 h-4" /><span className="text-xs font-bold uppercase">Pending</span></div>
                    <span className="text-2xl font-bold" style={{ color: 'var(--mcms-text)' }}>{orders.filter(o => o.status === "pending").length}</span>
                </Card>
                <Card className="p-4 border flex flex-col gap-1" style={{ backgroundColor: 'var(--mcms-card)', borderColor: 'var(--mcms-card-border)' }}>
                    <div className="flex items-center gap-2 mb-1 text-blue-500"><RefreshCw className="w-4 h-4" /><span className="text-xs font-bold uppercase">Processing</span></div>
                    <span className="text-2xl font-bold" style={{ color: 'var(--mcms-text)' }}>{orders.filter(o => ["confirmed", "preparing"].includes(o.status)).length}</span>
                </Card>
                <Card className="p-4 border flex flex-col gap-1" style={{ backgroundColor: 'var(--mcms-card)', borderColor: 'var(--mcms-card-border)' }}>
                    <div className="flex items-center gap-2 mb-1 text-indigo-500"><Truck className="w-4 h-4" /><span className="text-xs font-bold uppercase">Dispatched</span></div>
                    <span className="text-2xl font-bold" style={{ color: 'var(--mcms-text)' }}>{orders.filter(o => o.status === "dispatched").length}</span>
                </Card>
                <Card className="p-4 border flex flex-col gap-1" style={{ backgroundColor: 'var(--mcms-card)', borderColor: 'var(--mcms-card-border)' }}>
                    <div className="flex items-center gap-2 mb-1 text-green-500"><CheckCircle2 className="w-4 h-4" /><span className="text-xs font-bold uppercase">Delivered today</span></div>
                    <span className="text-2xl font-bold" style={{ color: 'var(--mcms-text)' }}>{orders.filter(o => o.status === "delivered" && new Date(o.created_at).toDateString() === new Date().toDateString()).length}</span>
                </Card>
            </div>

            {/* Kanban Board */}
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                {ORDER_STATUSES.slice(0, 5).map((colStatus, idx) => {
                    const colOrders = orders.filter(o => o.status === colStatus);
                    return (
                        <div key={colStatus} className="flex-none w-80 flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-bold capitalize flex items-center gap-2" style={{ color: 'var(--mcms-text)' }}>
                                    {colStatus} <span className="text-[10px] font-normal px-1.5 py-0.5 rounded-full" style={{ backgroundColor: 'var(--mcms-kanban-bg)', color: 'var(--mcms-text-muted)' }}>{colOrders.length}</span>
                                </h3>
                            </div>
                            <div className="flex-1 rounded-xl p-2 flex flex-col gap-2 min-h-[500px]" style={{ backgroundColor: 'var(--mcms-kanban-bg)' }}>
                                {colOrders.map(order => (
                                    <Card key={order.id} className="p-3 border shadow-sm hover:shadow-md transition-shadow cursor-default" style={{ backgroundColor: 'var(--mcms-card)', borderColor: 'var(--mcms-card-border)' }}>
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-[10px] font-mono" style={{ color: 'var(--mcms-text-micro)' }}>#{order.id.slice(0, 6)}</span>
                                            {getPaymentBadge(order.payment_status)}
                                        </div>
                                        <p className="font-semibold text-sm truncate" style={{ color: 'var(--mcms-text)' }}>{order.customer_name}</p>
                                        <p className="text-[10px] truncate mb-2" style={{ color: 'var(--mcms-text-muted)' }}>{order.items.length} items · ₦{order.total.toLocaleString()}</p>

                                        <div className="pt-2 border-t flex items-center justify-between" style={{ borderColor: 'var(--mcms-card-border)' }}>
                                            <span className="text-[9px]" style={{ color: 'var(--mcms-text-micro)' }}>{new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            {idx < 4 && (
                                                <Button
                                                    onClick={() => updateStatus(order.id, idx)}
                                                    className="h-6 text-[10px] text-white rounded-full px-3 py-1 border-none"
                                                    style={{ backgroundColor: 'var(--mcms-accent)' }}
                                                >
                                                    Next <ChevronRight className="w-3 h-3 ml-1" />
                                                </Button>
                                            )}
                                        </div>
                                    </Card>
                                ))}
                                {colOrders.length === 0 && (
                                    <div className="flex items-center justify-center flex-1">
                                        <span className="text-xs border border-dashed rounded-lg px-4 py-2" style={{ color: 'var(--mcms-text-micro)', borderColor: 'var(--mcms-card-border)' }}>Empty list</span>
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
