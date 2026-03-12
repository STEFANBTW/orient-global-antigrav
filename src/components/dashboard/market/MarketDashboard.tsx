import { useMemo } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Package, TrendingUp, DollarSign, FolderOpen, AlertTriangle,
    ArrowUpRight, ArrowDownRight
} from "lucide-react";

function StatCard({ icon: Icon, title, value, sub, trend, color }: any) {
    const up = trend > 0;
    return (
        <Card className="overflow-hidden border" style={{ backgroundColor: 'var(--mcms-card)', borderColor: 'var(--mcms-card-border)' }}>
            <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
                        <Icon className="w-4 h-4 text-white" />
                    </div>
                    {trend !== undefined && (
                        <Badge className={`text-[9px] gap-0.5 border-none ${up ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
                            {up ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}
                            {Math.abs(trend)}%
                        </Badge>
                    )}
                </div>
                <p className="text-xl font-bold" style={{ color: 'var(--mcms-text)' }}>{value}</p>
                <p className="text-[10px] font-medium uppercase tracking-wider mt-0.5" style={{ color: 'var(--mcms-text-muted)' }}>{title}</p>
                {sub && <p className="text-[10px] mt-1" style={{ color: 'var(--mcms-text-micro)' }}>{sub}</p>}
            </div>
        </Card>
    );
}

export default function MarketDashboard({ cms }: { cms: any }) {
    const { products, inventoryAlerts, categories } = cms;

    const totalRevenue = useMemo(() => products.reduce((s: number, p: any) => s + p.price * (p.stock || 0), 0), [products]);
    const activeCount = products.filter((p: any) => p.status === "active").length;
    const draftCount = products.filter((p: any) => p.status === "draft").length;

    return (
        <div className="space-y-4 sm:space-y-6 max-w-6xl mx-auto px-2 sm:px-0">
            <div>
                <h1 className="text-lg font-bold uppercase italic tracking-tight" style={{ color: 'var(--mcms-heading)' }}>Market Operations Summary</h1>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--mcms-text-micro)' }}>Real-time logistics & inventory metrics</p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <StatCard icon={Package} title="Total Products" value={products.length} color="bg-blue-500" trend={12} />
                <StatCard icon={TrendingUp} title="Active Products" value={activeCount} sub={`${draftCount} drafts`} color="bg-green-500" trend={8} />
                <StatCard icon={DollarSign} title="Catalog Value" value={`₦${(totalRevenue / 1000).toFixed(0)}k`} color="bg-violet-500" trend={15} />
                <StatCard icon={FolderOpen} title="Categories" value={categories.length} color="bg-indigo-500" />
            </div>

            {/* Low stock alerts */}
            {inventoryAlerts.critical.length > 0 && (
                <Card className="border-red-500/30 bg-red-500/5">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-bold text-red-500 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 animate-pulse" /> Critical Stock — Needs Immediate Restock
                        </CardTitle>
                    </CardHeader>
                    <div className="px-4 sm:px-6 pb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {inventoryAlerts.critical.map((p: any) => (
                            <div key={p.id} className="flex items-center gap-2 rounded-lg p-2 border border-red-500/20" style={{ backgroundColor: 'var(--mcms-card)' }}>
                                <img src={p.image} alt="" referrerPolicy="no-referrer" className="w-8 h-8 rounded object-cover" style={{ backgroundColor: 'var(--mcms-kanban-bg)' }} />
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] font-semibold truncate" style={{ color: 'var(--mcms-text)' }}>{p.name}</p>
                                    <p className="text-[10px] text-red-500 font-bold">{p.stock} remaining</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* Medium alerts */}
            {inventoryAlerts.low.length > 0 && (
                <Card className="border-amber-500/30 bg-amber-500/5">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-bold text-amber-500 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" /> Low Stock Warning
                        </CardTitle>
                    </CardHeader>
                    <div className="px-4 sm:px-6 pb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                        {inventoryAlerts.low.map((p: any) => (
                            <div key={p.id} className="flex items-center gap-2 rounded-lg p-2 border border-amber-500/20" style={{ backgroundColor: 'var(--mcms-card)' }}>
                                <img src={p.image} alt="" referrerPolicy="no-referrer" className="w-8 h-8 rounded object-cover" style={{ backgroundColor: 'var(--mcms-kanban-bg)' }} />
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] font-semibold truncate" style={{ color: 'var(--mcms-text)' }}>{p.name}</p>
                                    <p className="text-[10px] text-amber-500 font-bold">{p.stock} remaining</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* Category breakdown */}
            <Card className="border" style={{ backgroundColor: 'var(--mcms-card)', borderColor: 'var(--mcms-card-border)' }}>
                <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-bold" style={{ color: 'var(--mcms-text)' }}>Category breakdown</CardTitle>
                </CardHeader>
                <div className="px-4 sm:px-6 pb-4 space-y-2">
                    {categories.slice(0, 8).map(([cat, count]: [string, number]) => (
                        <div key={cat} className="flex items-center gap-3">
                            <span className="text-xs font-medium w-24 truncate" style={{ color: 'var(--mcms-text-muted)' }}>{cat}</span>
                            <div className="flex-1 rounded-full h-2.5 overflow-hidden" style={{ backgroundColor: 'var(--mcms-kanban-bg)' }}>
                                <div
                                    className="h-full rounded-full"
                                    style={{
                                        width: `${(count / products.length) * 100}%`,
                                        backgroundColor: 'var(--mcms-accent)'
                                    }}
                                />
                            </div>
                            <span className="text-[10px] w-8 text-right" style={{ color: 'var(--mcms-text-micro)' }}>{count}</span>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
