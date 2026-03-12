import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { MapPin, Truck, Loader2, Navigation, Save, Plus, Edit2, Trash2 } from "lucide-react";
import type { MarketOrder } from "./OrdersManager";

interface DeliveryZone {
    id: string;
    name: string;
    type: string;
    base_fee: number;
    per_km_fee: number;
    estimated_hours: number;
    is_active: boolean;
}

export default function DeliveriesManager({ isDarkMode = true }: { isDarkMode?: boolean }) {
    const [zones, setZones] = useState<DeliveryZone[]>([]);
    const [activeDeliveries, setActiveDeliveries] = useState<MarketOrder[]>([]);
    const [loading, setLoading] = useState(true);

    const [editingZone, setEditingZone] = useState<DeliveryZone | null>(null);
    const [showZoneForm, setShowZoneForm] = useState(false);

    const fetchZonesAndDeliveries = async () => {
        setLoading(true);
        const { data: zData } = await supabase.from("delivery_zones").select("*").order("name");
        if (zData) setZones(zData);

        const { data: oData } = await supabase.from("unified_orders")
            .select("*")
            .eq("division", "market")
            .in("status", ["confirmed", "preparing", "dispatched"])
            .order("created_at", { ascending: false });
        if (oData) setActiveDeliveries(oData);

        setLoading(false);
    };

    useEffect(() => { fetchZonesAndDeliveries(); }, []);

    // Realtime
    useEffect(() => {
        const channel1 = supabase.channel("zones_changes").on("postgres_changes", { event: "*", schema: "public", table: "delivery_zones" }, fetchZonesAndDeliveries).subscribe();
        const channel2 = supabase.channel("deliveries_changes").on("postgres_changes", { 
            event: "*", 
            schema: "public", 
            table: "unified_orders",
            filter: "division=eq.market"
        }, fetchZonesAndDeliveries).subscribe();
        return () => { supabase.removeChannel(channel1); supabase.removeChannel(channel2); };
    }, []);

    const saveZone = async (payload: Partial<DeliveryZone>) => {
        let error;
        if (editingZone) {
            ({ error } = await supabase.from("delivery_zones").update(payload).eq("id", editingZone.id));
        } else {
            ({ error } = await supabase.from("delivery_zones").insert(payload));
        }

        if (error) toast({ variant: "destructive", title: "Error", description: error.message });
        else { toast({ title: "Zone saved" }); setShowZoneForm(false); setEditingZone(null); fetchZonesAndDeliveries(); }
    };

    const deleteZone = async (id: string) => {
        if (!confirm("Delete this delivery zone?")) return;
        const { error } = await supabase.from("delivery_zones").delete().eq("id", id);
        if (error) toast({ variant: "destructive", title: "Error", description: error.message });
        else { toast({ title: "Zone deleted" }); fetchZonesAndDeliveries(); }
    };

    return (
        <div className="space-y-10 mcms">
            {/* Active Deliveries Pipeline */}
            <div>
                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2" style={{ color: 'var(--mcms-text-muted)' }}>
                    <Truck className="w-4 h-4" style={{ color: 'var(--mcms-accent)' }} /> Active Delivery Pipeline
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {activeDeliveries.length === 0 ? (
                        <div className="col-span-3 py-12 border-2 border-dashed rounded-2xl flex items-center justify-center opacity-20" style={{ borderColor: 'var(--mcms-card-border)' }}>
                            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--mcms-text-muted)' }}>No queue active</span>
                        </div>
                    ) : activeDeliveries.map(order => (
                        <Card key={order.id} className="p-5 border shadow-sm hover:shadow-md transition-all duration-300 group" style={{ backgroundColor: 'var(--mcms-card)', borderColor: 'var(--mcms-card-border)' }}>
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-[9px] font-mono opacity-40" style={{ color: 'var(--mcms-text)' }}>#{order.id.slice(0, 8).toUpperCase()}</span>
                                <Badge className="border px-2 py-0.5 rounded-md font-bold text-[9px] uppercase tracking-wider" style={{
                                    backgroundColor: order.status === "dispatched" ? "rgba(99, 102, 241, 0.05)" : order.status === "preparing" ? "rgba(168, 85, 247, 0.05)" : "rgba(59, 130, 246, 0.05)",
                                    color: order.status === "dispatched" ? "#818cf8" : order.status === "preparing" ? "#c084fc" : "#60a5fa",
                                    borderColor: order.status === "dispatched" ? "rgba(99, 102, 241, 0.1)" : order.status === "preparing" ? "rgba(168, 85, 247, 0.1)" : "rgba(59, 130, 246, 0.1)"
                                }}>{order.status}</Badge>
                            </div>
                            <p className="font-bold text-sm flex items-start gap-2 mb-2 tracking-tight" style={{ color: 'var(--mcms-text)' }}>
                                <MapPin className="w-4 h-4 mt-0.5 opacity-30 shrink-0" /> 
                                <span className="line-clamp-2">{order.customer_address}</span>
                            </p>
                            <p className="text-[10px] font-medium opacity-60 ml-6" style={{ color: 'var(--mcms-text)' }}>{order.customer_name} · {order.customer_phone}</p>
                            <div className="mt-6 pt-4 border-t flex items-center justify-between text-[9px] font-black uppercase tracking-widest" style={{ borderColor: 'var(--mcms-card-border)', color: 'var(--mcms-text-muted)' }}>
                                <span className="flex items-center gap-1.5 opacity-60"><Truck className="w-3.5 h-3.5" /> Rider</span>
                                <span className="font-black text-black dark:text-white">{order.rider_name || "Unassigned"}</span>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Delivery Zones */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-2" style={{ color: 'var(--mcms-text-muted)' }}>
                        <Navigation className="w-4 h-4" style={{ color: '#10b981' }} /> Zone Configuration
                    </h2>
                    <button
                        className="h-8 text-[9px] font-black uppercase tracking-widest text-black rounded-full px-5 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-amber-500/10"
                        style={{ backgroundColor: 'var(--mcms-accent)' }}
                        onClick={() => { setEditingZone(null); setShowZoneForm(true); }}
                    >
                        <Plus className="w-3.5 h-3.5 mr-1.5 inline" /> Add Zone
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {zones.map(zone => (
                        <Card key={zone.id} className="p-5 border relative group shadow-sm hover:shadow-md transition-all duration-300" style={{ backgroundColor: 'var(--mcms-card)', borderColor: 'var(--mcms-card-border)' }}>
                            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => { setEditingZone(zone); setShowZoneForm(true); }} className="hover:scale-110 transition-transform"><Edit2 className="w-3.5 h-3.5 opacity-30 hover:opacity-100" style={{ color: 'var(--mcms-text)' }} /></button>
                                <button onClick={() => deleteZone(zone.id)} className="hover:scale-110 transition-transform"><Trash2 className="w-3.5 h-3.5 text-red-500/30 hover:text-red-500" /></button>
                            </div>
                            <h3 className="font-bold text-sm mb-2 tracking-tight" style={{ color: 'var(--mcms-text)' }}>{zone.name}</h3>
                            <Badge className="border px-2 py-0.5 rounded-md font-bold text-[9px] uppercase tracking-wider mb-4" style={{
                                backgroundColor: zone.type === "local" ? "rgba(16, 185, 129, 0.05)" : "rgba(59, 130, 246, 0.05)",
                                color: zone.type === "local" ? "#34d399" : "#60a5fa",
                                borderColor: zone.type === "local" ? "rgba(16, 185, 129, 0.1)" : "rgba(59, 130, 246, 0.1)"
                            }}>{zone.type}</Badge>
                            <div className="space-y-2 mt-4 text-[11px] font-medium">
                                <div className="flex justify-between" style={{ color: 'var(--mcms-text-muted)' }}><span>Base Fee:</span><span className="font-bold" style={{ color: 'var(--mcms-text)' }}>₦{zone.base_fee.toLocaleString()}</span></div>
                                {zone.per_km_fee > 0 && <div className="flex justify-between" style={{ color: 'var(--mcms-text-muted)' }}><span>Per KM:</span><span className="font-bold" style={{ color: 'var(--mcms-text)' }}>₦{zone.per_km_fee.toLocaleString()}</span></div>}
                                <div className="flex justify-between" style={{ color: 'var(--mcms-text-muted)' }}><span>Lead Time:</span><span className="font-bold" style={{ color: 'var(--mcms-text)' }}>{zone.estimated_hours}h</span></div>
                            </div>
                            {!zone.is_active && <div className="absolute inset-0 bg-black/5 backdrop-blur-[2px] flex items-center justify-center rounded-xl"><Badge className="bg-black text-white text-[9px] font-black uppercase tracking-widest border-none">Stopped</Badge></div>}
                        </Card>
                    ))}
                </div>
            </div>

            {/* Zone Form Dialog */}
            <Dialog open={showZoneForm} onOpenChange={setShowZoneForm}>
                <DialogContent style={{ backgroundColor: 'var(--mcms-card)', color: 'var(--mcms-text)', borderColor: 'var(--mcms-card-border)' }}>
                    <DeliveryZoneForm zone={editingZone} onSave={saveZone} onCancel={() => setShowZoneForm(false)} />
                </DialogContent>
            </Dialog>
        </div>
    );
}

function DeliveryZoneForm({ zone, onSave, onCancel }: { zone: DeliveryZone | null, onSave: (p: any) => void, onCancel: () => void }) {
    const [name, setName] = useState(zone?.name || "");
    const [type, setType] = useState(zone?.type || "local");
    const [baseFee, setBaseFee] = useState(zone?.base_fee?.toString() || "");
    const [perKm, setPerKm] = useState(zone?.per_km_fee?.toString() || "0");
    const [hours, setHours] = useState(zone?.estimated_hours?.toString() || "24");
    const [active, setActive] = useState(zone?.is_active ?? true);

    return (
        <>
            <DialogHeader><DialogTitle style={{ color: 'var(--mcms-heading)' }}>{zone ? "Edit Zone" : "New Delivery Zone"}</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-4">
                <div>
                    <label className="text-xs font-bold block mb-1" style={{ color: 'var(--mcms-text-muted)' }}>Zone Name</label>
                    <Input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g. Lagos Island"
                        className="border"
                        style={{ backgroundColor: 'var(--mcms-input-bg)', color: 'var(--mcms-text)', borderColor: 'var(--mcms-card-border)' }}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-bold block mb-1" style={{ color: 'var(--mcms-text-muted)' }}>Type</label>
                        <Select value={type} onValueChange={setType}>
                            <SelectTrigger className="border" style={{ backgroundColor: 'var(--mcms-input-bg)', color: 'var(--mcms-text)', borderColor: 'var(--mcms-card-border)' }}>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent><SelectItem value="local">Local City</SelectItem><SelectItem value="intercity">Intercity</SelectItem><SelectItem value="nationwide">Nationwide</SelectItem></SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="text-xs font-bold block mb-1" style={{ color: 'var(--mcms-text-muted)' }}>Base Fee (₦)</label>
                        <Input
                            type="number"
                            value={baseFee}
                            onChange={e => setBaseFee(e.target.value)}
                            className="border"
                            style={{ backgroundColor: 'var(--mcms-input-bg)', color: 'var(--mcms-text)', borderColor: 'var(--mcms-card-border)' }}
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold block mb-1" style={{ color: 'var(--mcms-text-muted)' }}>Per KM Fee (₦)</label>
                        <Input
                            type="number"
                            value={perKm}
                            onChange={e => setPerKm(e.target.value)}
                            className="border"
                            style={{ backgroundColor: 'var(--mcms-input-bg)', color: 'var(--mcms-text)', borderColor: 'var(--mcms-card-border)' }}
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold block mb-1" style={{ color: 'var(--mcms-text-muted)' }}>Est. Delivery (Hours)</label>
                        <Input
                            type="number"
                            value={hours}
                            onChange={e => setHours(e.target.value)}
                            className="border"
                            style={{ backgroundColor: 'var(--mcms-input-bg)', color: 'var(--mcms-text)', borderColor: 'var(--mcms-card-border)' }}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <input type="checkbox" id="active" checked={active} onChange={e => setActive(e.target.checked)} className="rounded" style={{ accentColor: 'var(--mcms-accent)' }} />
                    <label htmlFor="active" className="text-sm" style={{ color: 'var(--mcms-text)' }}>Zone is active and available for delivery</label>
                </div>
            </div>
            <DialogFooter className="gap-2">
                <Button
                    className="h-10 px-4 py-2 border"
                    onClick={onCancel}
                    style={{ backgroundColor: 'var(--mcms-card)', color: 'var(--mcms-text)', borderColor: 'var(--mcms-card-border)' }}
                >
                    Cancel
                </Button>
                <Button
                    className="text-white h-10 px-4 py-2 border-none"
                    style={{ backgroundColor: 'var(--mcms-accent)' }}
                    onClick={() => onSave({ name, type, base_fee: parseFloat(baseFee), per_km_fee: parseFloat(perKm), estimated_hours: parseInt(hours), is_active: active })}
                >
                    Save Zone
                </Button>
            </DialogFooter>
        </>
    );
}
