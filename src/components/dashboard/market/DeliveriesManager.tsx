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

export default function DeliveriesManager() {
    const [zones, setZones] = useState<DeliveryZone[]>([]);
    const [activeDeliveries, setActiveDeliveries] = useState<MarketOrder[]>([]);
    const [loading, setLoading] = useState(true);

    const [editingZone, setEditingZone] = useState<DeliveryZone | null>(null);
    const [showZoneForm, setShowZoneForm] = useState(false);

    const fetchZonesAndDeliveries = async () => {
        setLoading(true);
        const { data: zData } = await supabase.from("delivery_zones").select("*").order("name");
        if (zData) setZones(zData);

        const { data: oData } = await supabase.from("market_orders")
            .select("*")
            .in("status", ["confirmed", "preparing", "dispatched"])
            .order("created_at", { ascending: false });
        if (oData) setActiveDeliveries(oData);

        setLoading(false);
    };

    useEffect(() => { fetchZonesAndDeliveries(); }, []);

    // Realtime
    useEffect(() => {
        const channel1 = supabase.channel("zones_changes").on("postgres_changes", { event: "*", schema: "public", table: "delivery_zones" }, fetchZonesAndDeliveries).subscribe();
        const channel2 = supabase.channel("deliveries_changes").on("postgres_changes", { event: "*", schema: "public", table: "market_orders" }, fetchZonesAndDeliveries).subscribe();
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
        <div className="space-y-6 mcms">
            {/* Active Deliveries Pipeline */}
            <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: 'var(--mcms-heading)' }}><Truck className="w-5 h-5" style={{ color: 'var(--mcms-accent)' }} /> Active Delivery Pipeline</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {activeDeliveries.length === 0 ? (
                    <p className="text-sm col-span-3 pb-4" style={{ color: 'var(--mcms-text-muted)' }}>No active deliveries pending or dispatched.</p>
                ) : activeDeliveries.map(order => (
                    <Card key={order.id} className="p-4 border" style={{ backgroundColor: 'var(--mcms-card)', borderColor: 'var(--mcms-card-border)' }}>
                        <div className="flex justify-between items-start mb-3">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--mcms-kanban-bg)', color: 'var(--mcms-text-muted)' }}>#{order.id.slice(0, 8)}</span>
                            <Badge className="border-none" style={{
                                backgroundColor: order.status === "dispatched" ? "rgba(99, 102, 241, 0.1)" : order.status === "preparing" ? "rgba(168, 85, 247, 0.1)" : "rgba(59, 130, 246, 0.1)",
                                color: order.status === "dispatched" ? "#6366f1" : order.status === "preparing" ? "#a855f7" : "#3b82f6"
                            }}>{order.status.toUpperCase()}</Badge>
                        </div>
                        <p className="font-bold flex items-center gap-1.5" style={{ color: 'var(--mcms-text)' }}><MapPin className="w-4 h-4" style={{ color: 'var(--mcms-text-muted)' }} /> {order.customer_address}</p>
                        <p className="text-sm ml-5.5 mt-1" style={{ color: 'var(--mcms-text-muted)' }}>{order.customer_name} · {order.customer_phone}</p>
                        <div className="mt-4 pt-3 border-t flex items-center gap-2 text-xs" style={{ borderColor: 'var(--mcms-card-border)', color: 'var(--mcms-text-muted)' }}>
                            <Truck className="w-3.5 h-3.5" />
                            Rider: <span className="font-semibold" style={{ color: 'var(--mcms-text)' }}>{order.rider_name || "Unassigned"}</span>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Delivery Zones */}
            <div className="flex items-center justify-between pt-6 border-t" style={{ borderColor: 'var(--mcms-card-border)' }}>
                <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: 'var(--mcms-heading)' }}><Navigation className="w-5 h-5" style={{ color: '#10b981' }} /> Delivery Zones Setup</h2>
                <Button
                    className="text-white rounded-lg gap-1.5 h-9 px-3 border-none"
                    style={{ backgroundColor: 'var(--mcms-accent)' }}
                    onClick={() => { setEditingZone(null); setShowZoneForm(true); }}
                >
                    <Plus className="w-4 h-4" /> Add Zone
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {zones.map(zone => (
                    <Card key={zone.id} className="p-4 border relative group" style={{ backgroundColor: 'var(--mcms-card)', borderColor: 'var(--mcms-card-border)' }}>
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button className="hover:bg-transparent h-7 w-7 p-0 bg-transparent border-none" onClick={() => { setEditingZone(zone); setShowZoneForm(true); }}><Edit2 className="w-3 h-3" style={{ color: 'var(--mcms-text-micro)' }} /></Button>
                            <Button className="hover:bg-transparent h-7 w-7 p-0 bg-transparent border-none" onClick={() => deleteZone(zone.id)}><Trash2 className="w-3 h-3 text-red-500/60 hover:text-red-500" /></Button>
                        </div>
                        <h3 className="font-bold mb-1" style={{ color: 'var(--mcms-text)' }}>{zone.name}</h3>
                        <Badge className="border-none" style={{
                            backgroundColor: zone.type === "local" ? "rgba(16, 185, 129, 0.1)" : "rgba(59, 130, 246, 0.1)",
                            color: zone.type === "local" ? "#10b981" : "#3b82f6"
                        }}>{zone.type}</Badge>
                        <div className="mt-4 space-y-1.5 text-sm">
                            <div className="flex justify-between" style={{ color: 'var(--mcms-text-muted)' }}><span>Base Fee:</span><span className="font-semibold" style={{ color: 'var(--mcms-text)' }}>₦{zone.base_fee.toLocaleString()}</span></div>
                            {zone.per_km_fee > 0 && <div className="flex justify-between" style={{ color: 'var(--mcms-text-muted)' }}><span>Per KM:</span><span className="font-semibold" style={{ color: 'var(--mcms-text)' }}>₦{zone.per_km_fee.toLocaleString()}</span></div>}
                            <div className="flex justify-between" style={{ color: 'var(--mcms-text-muted)' }}><span>Est. Hours:</span><span className="font-semibold" style={{ color: 'var(--mcms-text)' }}>{zone.estimated_hours}h</span></div>
                        </div>
                        {!zone.is_active && <div className="absolute inset-0 bg-black/10 flex items-center justify-center rounded-xl"><Badge className="bg-slate-800 text-white border-none">Inactive</Badge></div>}
                    </Card>
                ))}
                {zones.length === 0 && <p className="text-sm py-4" style={{ color: 'var(--mcms-text-muted)' }}>No delivery zones configured.</p>}
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
