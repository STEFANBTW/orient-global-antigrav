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

export default function ReviewsManager() {
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
        <div className="space-y-6 mcms">
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
                <Card className="border" style={{ backgroundColor: 'var(--mcms-card)', borderColor: 'rgba(245, 158, 11, 0.2)' }}>
                    <CardHeader className="p-4">
                        <div className="flex items-center gap-2">
                            <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
                            <div>
                                <p className="text-2xl font-bold" style={{ color: 'var(--mcms-text)' }}>{avgRating}</p>
                                <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: 'var(--mcms-text-muted)' }}>Avg Rating</p>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
                <Card className="border" style={{ backgroundColor: 'var(--mcms-card)', borderColor: 'rgba(99, 102, 241, 0.2)' }}>
                    <CardHeader className="p-4">
                        <div className="flex items-center gap-2">
                            <MessageSquare className="w-6 h-6 text-indigo-500" />
                            <div>
                                <p className="text-2xl font-bold" style={{ color: 'var(--mcms-text)' }}>{reviews.length}</p>
                                <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: 'var(--mcms-text-muted)' }}>Total Reviews</p>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
                <Card className="border" style={{ backgroundColor: 'var(--mcms-card)', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
                    <CardHeader className="p-4">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">{pendingCount}</div>
                            <div>
                                <p className="text-2xl font-bold" style={{ color: 'var(--mcms-text)' }}>{pendingCount}</p>
                                <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: 'var(--mcms-text-muted)' }}>Pending</p>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
            </div>

            {/* Rating distribution */}
            <Card className="border" style={{ backgroundColor: 'var(--mcms-card)', borderColor: 'var(--mcms-card-border)' }}>
                <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--mcms-text-muted)' }}>Rating Distribution</CardTitle>
                </CardHeader>
                <div className="px-4 pb-4 space-y-1.5">
                    {ratingDist.map(d => (
                        <div key={d.stars} className="flex items-center gap-2 text-xs">
                            <span className="w-6 font-medium" style={{ color: 'var(--mcms-text-muted)' }}>{d.stars}★</span>
                            <div className="flex-1 rounded-full h-2 overflow-hidden" style={{ backgroundColor: 'var(--mcms-kanban-bg)' }}>
                                <div className="bg-amber-400 h-full rounded-full" style={{ width: `${reviews.length ? (d.count / reviews.length) * 100 : 0}%` }} />
                            </div>
                            <span className="w-6 text-right" style={{ color: 'var(--mcms-text-micro)' }}>{d.count}</span>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Filter tabs */}
            <div className="flex gap-1.5">
                {(["all", "pending", "approved"] as const).map(f => (
                    <Button
                        key={f}
                        size="sm"
                        variant={filter === f ? "default" : "outline"}
                        onClick={() => setFilter(f)}
                        className="rounded-full text-xs capitalize transition-all"
                        style={{
                            backgroundColor: filter === f ? 'var(--mcms-accent)' : 'transparent',
                            borderColor: filter === f ? 'var(--mcms-accent)' : 'var(--mcms-card-border)',
                            color: filter === f ? '#fff' : 'var(--mcms-text)'
                        }}
                    >
                        {f}{f === "pending" && pendingCount > 0 ? ` (${pendingCount})` : ""}
                    </Button>
                ))}
            </div>

            {/* Reviews list */}
            {loading ? (
                <div className="flex items-center justify-center py-12"><Loader2 className="w-6 h-6 animate-spin" style={{ color: 'var(--mcms-text-micro)' }} /></div>
            ) : filtered.length === 0 ? (
                <p className="text-center text-sm py-12" style={{ color: 'var(--mcms-text-micro)' }}>No reviews yet</p>
            ) : (
                <div className="space-y-3">
                    {filtered.map(r => (
                        <Card key={r.id} className="border" style={{
                            backgroundColor: 'var(--mcms-card)',
                            borderColor: r.is_approved ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                            boxShadow: 'none'
                        }}>
                            <div className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-semibold text-sm" style={{ color: 'var(--mcms-text)' }}>{r.customer_name}</span>
                                            {r.is_verified_purchase && <Badge className="border-none" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>Verified Purchase</Badge>}
                                            {!r.is_approved && <Badge className="border-none" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>Pending</Badge>}
                                        </div>
                                        <p className="text-[10px]" style={{ color: 'var(--mcms-text-micro)' }}>{r.product_name} · {new Date(r.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star key={i} className={`w-3.5 h-3.5 ${i < r.rating ? "text-amber-400 fill-amber-400" : ""}`} style={{ color: i >= r.rating ? 'var(--mcms-kanban-bg)' : undefined }} />
                                        ))}
                                    </div>
                                </div>
                                {r.title && <p className="font-medium text-sm mb-1" style={{ color: 'var(--mcms-text)' }}>{r.title}</p>}
                                <p className="text-sm mb-3" style={{ color: 'var(--mcms-text-muted)' }}>{r.review_text}</p>
                                {r.admin_response && (
                                    <div className="rounded-lg p-3 mt-2 border" style={{ backgroundColor: 'rgba(59, 130, 246, 0.05)', borderColor: 'rgba(59, 130, 246, 0.2)' }}>
                                        <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: '#3b82f6' }}>Admin Response</p>
                                        <p className="text-xs" style={{ color: 'var(--mcms-text)' }}>{r.admin_response}</p>
                                    </div>
                                )}
                                {respondingTo === r.id && (
                                    <div className="mt-3 space-y-2">
                                        <Textarea
                                            value={responseText}
                                            onChange={(e) => setResponseText(e.target.value)}
                                            placeholder="Write your public response..."
                                            className="text-sm border"
                                            style={{ backgroundColor: 'var(--mcms-input-bg)', color: 'var(--mcms-text)', borderColor: 'var(--mcms-card-border)' }}
                                        />
                                        <div className="flex gap-2 justify-end">
                                            <Button size="sm" variant="outline" onClick={() => setRespondingTo(null)} className="text-xs rounded-lg" style={{ borderColor: 'var(--mcms-card-border)', color: 'var(--mcms-text)' }}>Cancel</Button>
                                            <Button size="sm" onClick={() => submitResponse(r.id)} className="text-xs rounded-lg text-white border-none" style={{ backgroundColor: 'var(--mcms-accent)' }}>Submit</Button>
                                        </div>
                                    </div>
                                )}
                                <div className="flex gap-2 mt-2">
                                    {!r.is_approved && (
                                        <Button size="sm" onClick={() => approveReview(r.id)} className="text-[10px] text-white rounded-full h-7 gap-1 border-none bg-green-600 hover:bg-green-700">
                                            <Check className="w-3 h-3" /> Approve
                                        </Button>
                                    )}
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => { setRespondingTo(r.id); setResponseText(r.admin_response || ""); }}
                                        className="text-[10px] rounded-full h-7 gap-1 border"
                                        style={{ borderColor: 'var(--mcms-card-border)', color: 'var(--mcms-text)' }}
                                    >
                                        <MessageSquare className="w-3 h-3" /> Respond
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => rejectReview(r.id)}
                                        className="text-[10px] rounded-full h-7 gap-1 text-red-500 hover:bg-red-50 border-red-500/20"
                                    >
                                        <X className="w-3 h-3" /> Remove
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
