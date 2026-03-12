import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Star, Check, X, MessageSquare, Loader2 } from "lucide-react";

interface Review {
    id: string;
    product_id: string;
    customer_name: string;
    customer_email: string | null;
    rating: number;
    title: string | null;
    review_text: string;
    is_verified_purchase: boolean;
    is_approved: boolean;
    admin_response: string | null;
    created_at: string;
    product_name?: string;
}

export default function ReviewsManager({ isDarkMode = true }: { isDarkMode?: boolean }) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");
    const [respondingTo, setRespondingTo] = useState<string | null>(null);
    const [responseText, setResponseText] = useState("");

    const fetchReviews = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("product_reviews")
            .select("*, market_products(name)")
            .order("created_at", { ascending: false });
        if (!error && data) {
            setReviews(data.map((r: any) => ({ ...r, product_name: r.market_products?.name })));
        }
        setLoading(false);
    };

    useEffect(() => { fetchReviews(); }, []);

    const approveReview = async (id: string) => {
        await supabase.from("product_reviews").update({ is_approved: true }).eq("id", id);
        toast({ title: "Approved" }); fetchReviews();
    };

    const rejectReview = async (id: string) => {
        await supabase.from("product_reviews").delete().eq("id", id);
        toast({ title: "Removed" }); fetchReviews();
    };

    const submitResponse = async (id: string) => {
        if (!responseText.trim()) return;
        await supabase.from("product_reviews").update({ admin_response: responseText, is_approved: true }).eq("id", id);
        toast({ title: "Response submitted" }); setRespondingTo(null); setResponseText(""); fetchReviews();
    };

    const filtered = reviews.filter(r => {
        if (filter === "pending") return !r.is_approved;
        if (filter === "approved") return r.is_approved;
        return true;
    });

    const avgRating = reviews.length > 0 ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : "0";
    const pendingCount = reviews.filter(r => !r.is_approved).length;
    const ratingDist = [5, 4, 3, 2, 1].map(n => ({ stars: n, count: reviews.filter(r => r.rating === n).length }));

    return (
        <div className="space-y-8 mcms">
            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="p-5 border shadow-sm" style={{ backgroundColor: 'var(--mcms-card)', borderColor: 'var(--mcms-card-border)' }}>
                    <div className="flex items-center gap-2 mb-1" style={{ color: 'var(--mcms-text-muted)' }}><Star className="w-4 h-4 text-amber-500 fill-amber-500" /> <span className="text-[10px] font-black uppercase tracking-widest">Average Score</span></div>
                    <span className="text-3xl font-bold tracking-tight" style={{ color: 'var(--mcms-text)' }}>{avgRating}</span>
                </Card>
                <Card className="p-5 border shadow-sm" style={{ backgroundColor: 'var(--mcms-card)', borderColor: 'var(--mcms-card-border)' }}>
                    <div className="flex items-center gap-2 mb-1" style={{ color: 'var(--mcms-text-muted)' }}><MessageSquare className="w-4 h-4 text-indigo-500" /> <span className="text-[10px] font-black uppercase tracking-widest">Feedback Count</span></div>
                    <span className="text-3xl font-bold tracking-tight" style={{ color: 'var(--mcms-text)' }}>{reviews.length}</span>
                </Card>
                <Card className="p-5 border shadow-sm" style={{ backgroundColor: 'var(--mcms-card)', borderColor: 'var(--mcms-card-border)' }}>
                    <div className="flex items-center gap-2 mb-1 text-amber-500"><div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" /> <span className="text-[10px] font-black uppercase tracking-widest">Awaiting Approval</span></div>
                    <span className="text-3xl font-bold tracking-tight" style={{ color: 'var(--mcms-text)' }}>{pendingCount}</span>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    {/* Rating distribution */}
                    <Card className="p-5 border shadow-sm" style={{ backgroundColor: 'var(--mcms-card)', borderColor: 'var(--mcms-card-border)' }}>
                        <h3 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-40" style={{ color: 'var(--mcms-text)' }}>Rating Breakdown</h3>
                        <div className="space-y-3">
                            {ratingDist.map(d => (
                                <div key={d.stars} className="flex items-center gap-3 text-xs">
                                    <span className="w-6 font-bold" style={{ color: 'var(--mcms-text-muted)' }}>{d.stars}★</span>
                                    <div className="flex-1 rounded-full h-1.5 overflow-hidden" style={{ backgroundColor: 'var(--mcms-kanban-bg)' }}>
                                        <div className="bg-amber-400 h-full rounded-full transition-all duration-500" style={{ width: `${reviews.length ? (d.count / reviews.length) * 100 : 0}%` }} />
                                    </div>
                                    <span className="text-[9px] font-bold opacity-30" style={{ color: 'var(--mcms-text)' }}>{d.count}</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Filter tabs */}
                    <div className="flex flex-col gap-2">
                        {(["all", "pending", "approved"] as const).map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`h-10 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-between transition-all ${filter === f ? 'bg-black text-white dark:bg-white dark:text-black shadow-lg shadow-black/10' : 'bg-white/5 hover:bg-white/10 opacity-60'}`}
                                style={{ color: filter === f ? undefined : 'var(--mcms-text)' }}
                            >
                                {f}
                                <span className="px-1.5 py-0.5 rounded-md bg-black/10 dark:bg-white/10 text-[9px]">{f === "all" ? reviews.length : f === "pending" ? pendingCount : reviews.length - pendingCount}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-2">
                    {/* Reviews list */}
                    {loading ? (
                        <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin opacity-20" /></div>
                    ) : filtered.length === 0 ? (
                        <div className="flex items-center justify-center py-20 border-2 border-dashed rounded-3xl opacity-20" style={{ borderColor: 'var(--mcms-card-border)' }}>
                            <span className="text-[10px] font-bold uppercase tracking-widest">No matching feedback found</span>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filtered.map(r => (
                                <Card key={r.id} className="p-5 border shadow-sm group hover:shadow-md transition-all duration-300" style={{ backgroundColor: 'var(--mcms-card)', borderColor: 'var(--mcms-card-border)' }}>
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center text-sm font-bold opacity-80" style={{ color: 'var(--mcms-text)' }}>
                                                {r.customer_name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-0.5">
                                                    <span className="font-bold text-sm tracking-tight" style={{ color: 'var(--mcms-text)' }}>{r.customer_name}</span>
                                                    {r.is_verified_purchase && <Badge className="bg-green-500/5 text-green-500 border-green-500/10 border text-[8px] font-black uppercase px-1.5 py-0">Verified</Badge>}
                                                </div>
                                                <p className="text-[10px] font-medium opacity-40 uppercase tracking-wider" style={{ color: 'var(--mcms-text)' }}>{r.product_name} · {new Date(r.created_at).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-0.5">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star key={i} className={`w-3 h-3 ${i < r.rating ? "text-amber-400 fill-amber-400" : "opacity-10"}`} style={{ color: i >= r.rating ? 'var(--mcms-text)' : undefined }} />
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {r.title && <p className="font-bold text-sm mb-1 tracking-tight" style={{ color: 'var(--mcms-text)' }}>{r.title}</p>}
                                    <p className="text-[11px] font-medium opacity-60 leading-relaxed mb-6" style={{ color: 'var(--mcms-text)' }}>{r.review_text}</p>
                                    
                                    {r.admin_response && (
                                        <div className="rounded-2xl p-4 mb-6 border-l-4 border-blue-500/20" style={{ backgroundColor: 'rgba(59, 130, 246, 0.03)' }}>
                                            <p className="text-[9px] font-black uppercase tracking-widest mb-1.5 text-blue-500">Merchant Response</p>
                                            <p className="text-[11px] font-medium opacity-70" style={{ color: 'var(--mcms-text)' }}>{r.admin_response}</p>
                                        </div>
                                    )}

                                    {respondingTo === r.id && (
                                        <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                            <Textarea
                                                value={responseText}
                                                onChange={(e) => setResponseText(e.target.value)}
                                                placeholder="Type your public response here..."
                                                className="text-[11px] min-h-[100px] border-none bg-black/5 dark:bg-white/5 rounded-xl resize-none"
                                            />
                                            <div className="flex gap-2 justify-end">
                                                <button onClick={() => setRespondingTo(null)} className="h-8 px-4 text-[9px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">Discard</button>
                                                <button onClick={() => submitResponse(r.id)} className="h-8 px-5 rounded-lg text-[9px] font-black uppercase tracking-widest text-white border-none" style={{ backgroundColor: 'var(--mcms-accent)' }}>Post Response</button>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-2 pt-2">
                                        {!r.is_approved && (
                                            <button onClick={() => approveReview(r.id)} className="h-7 px-4 text-[9px] font-black uppercase tracking-widest bg-green-500 text-white rounded-full hover:scale-105 active:scale-95 transition-all">Publish</button>
                                        )}
                                        <button 
                                            onClick={() => { setRespondingTo(r.id); setResponseText(r.admin_response || ""); }} 
                                            className={`h-7 px-4 text-[9px] font-black uppercase tracking-widest rounded-full transition-all ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-900'}`}
                                        >
                                            Reply
                                        </button>
                                        <button onClick={() => rejectReview(r.id)} className="ml-auto h-7 px-4 text-[9px] font-black uppercase tracking-widest text-red-500/40 hover:text-red-500 transition-colors">Delete</button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
