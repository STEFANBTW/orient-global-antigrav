import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { AlertCircle, Clock, CheckCircle2, Inbox, MessageSquare, Plus, Loader2 } from "lucide-react";

export interface CustomerComplaint {
    id: string;
    order_id: string | null;
    customer_name: string;
    customer_email: string | null;
    customer_phone: string | null;
    category: string;
    subject: string;
    description: string;
    priority: string;
    status: string;
    assigned_to: string | null;
    resolution_notes: string | null;
    created_at: string;
}

const COMPLAINT_STATUSES = ["open", "in_progress", "resolved", "closed"];

export default function ComplaintsManager({ isDarkMode = true }: { isDarkMode?: boolean }) {
    const [complaints, setComplaints] = useState<CustomerComplaint[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchComplaints = async () => {
        setLoading(true);
        const { data, error } = await supabase.from("customer_complaints").select("*").order("created_at", { ascending: false });
        if (!error && data) setComplaints(data);
        setLoading(false);
    };

    useEffect(() => { fetchComplaints(); }, []);

    // Realtime subscription
    useEffect(() => {
        const channel = supabase
            .channel("complaints_changes")
            .on("postgres_changes", { event: "*", schema: "public", table: "customer_complaints" }, () => {
                fetchComplaints();
            })
            .subscribe();
        return () => { supabase.removeChannel(channel); };
    }, []);

    const updateStatus = async (id: string, newStatus: string) => {
        const { error } = await supabase.from("customer_complaints").update({ status: newStatus }).eq("id", id);
        if (error) toast({ variant: "destructive", title: "Error", description: error.message });
        else toast({ title: "Status Updated", description: `Complaint moved to ${newStatus}` });
    };

    const getPriorityBadge = (priority: string) => {
        const styles: Record<string, string> = {
            urgent: "bg-red-500/10 text-red-600 border-red-500/20",
            high: "bg-orange-500/10 text-orange-600 border-orange-500/20",
            medium: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
            low: "bg-green-500/10 text-green-600 border-green-500/20",
        };
        const currentStyle = styles[priority] || "bg-slate-500/10 text-slate-600 border-slate-500/20";
        return <Badge className={`border px-2 py-0.5 rounded-md font-bold text-[10px] uppercase tracking-wider ${currentStyle}`}>{priority}</Badge>;
    };

    return (
        <div className="space-y-8 mcms">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="p-5 border shadow-sm transition-all" style={{ backgroundColor: 'var(--mcms-card)', borderColor: 'var(--mcms-card-border)' }}>
                    <div className="flex items-center gap-2 mb-1" style={{ color: 'var(--mcms-text-muted)' }}><Inbox className="w-4 h-4" /> <span className="text-[10px] font-black uppercase tracking-widest">Open Cases</span></div>
                    <span className="text-3xl font-bold tracking-tight" style={{ color: 'var(--mcms-text)' }}>{complaints.filter(c => c.status === "open").length}</span>
                </Card>
                <Card className="p-5 border shadow-sm transition-all border-red-500/10" style={{ backgroundColor: 'rgba(239, 68, 68, 0.02)' }}>
                    <div className="flex items-center gap-2 text-red-500 mb-1"><AlertCircle className="w-4 h-4" /> <span className="text-[10px] font-black uppercase tracking-widest">Urgent Priority</span></div>
                    <span className="text-3xl font-bold tracking-tight text-red-500">{complaints.filter(c => c.priority === "urgent" && c.status !== "closed").length}</span>
                </Card>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-6 hide-scrollbar">
                {COMPLAINT_STATUSES.map((colStatus, idx) => {
                    const colComplaints = complaints.filter(c => c.status === colStatus);
                    return (
                        <div key={colStatus} className="flex-none w-85 flex flex-col gap-4">
                            <div className="flex items-center justify-between px-1">
                                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-2" style={{ color: 'var(--mcms-text-muted)' }}>
                                    {colStatus.replace('_', ' ')} <span className="ml-1 px-1.5 py-0.5 rounded-md bg-white/5 text-[10px] tracking-normal font-bold">{colComplaints.length}</span>
                                </h3>
                            </div>
                            <div className="flex-1 rounded-2xl p-2.5 flex flex-col gap-2.5 min-h-[600px] transition-colors" style={{ backgroundColor: 'var(--mcms-kanban-bg)' }}>
                                {colComplaints.map(complaint => (
                                    <Card key={complaint.id} className="p-4 border shadow-sm cursor-pointer hover:shadow-md transition-all duration-300 group" style={{ backgroundColor: 'var(--mcms-card)', borderColor: 'var(--mcms-card-border)' }}>
                                        <div className="flex justify-between items-start mb-3">
                                            <span className="text-[9px] font-mono opacity-40 uppercase tracking-wider" style={{ color: 'var(--mcms-text)' }}>{new Date(complaint.created_at).toLocaleDateString()}</span>
                                            {getPriorityBadge(complaint.priority)}
                                        </div>
                                        <p className="font-bold text-sm mb-1 tracking-tight" style={{ color: 'var(--mcms-text)' }}>{complaint.subject}</p>
                                        <p className="text-[11px] font-medium opacity-60 line-clamp-2 mb-4" style={{ color: 'var(--mcms-text)' }}>{complaint.description}</p>
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md bg-white/5 opacity-60" style={{ color: 'var(--mcms-text)' }}>{complaint.customer_name}</span>
                                            <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md bg-blue-500/5 text-blue-500">{complaint.category.replace('_', ' ')}</span>
                                        </div>

                                        <div className="pt-3 border-t flex items-center justify-between gap-2" style={{ borderColor: 'var(--mcms-card-border)' }}>
                                            {idx > 0 && (
                                                <button
                                                    onClick={() => updateStatus(complaint.id, COMPLAINT_STATUSES[idx - 1])}
                                                    className={`h-7 text-[9px] font-black uppercase tracking-widest rounded-full px-4 border transition-all flex-1 ${isDarkMode ? 'bg-white/5 border-white/5 text-white/40 hover:text-white hover:bg-white/10' : 'bg-white border-slate-200 text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}
                                                >
                                                    Back
                                                </button>
                                            )}
                                            {idx < 3 && (
                                                <button
                                                    onClick={() => updateStatus(complaint.id, COMPLAINT_STATUSES[idx + 1])}
                                                    className="h-7 text-[9px] font-black uppercase tracking-widest text-black rounded-full px-4 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-amber-500/20 flex-1"
                                                    style={{ backgroundColor: 'var(--mcms-accent)' }}
                                                >
                                                    Escalate
                                                </button>
                                            )}
                                        </div>
                                    </Card>
                                ))}
                                {colComplaints.length === 0 && (
                                    <div className="flex items-center justify-center flex-1 border-2 border-dashed rounded-2xl transition-colors opacity-20" style={{ borderColor: 'var(--mcms-card-border)' }}>
                                        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--mcms-text-muted)' }}>No Cases</span>
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
