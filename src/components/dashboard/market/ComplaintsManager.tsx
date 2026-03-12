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

export default function ComplaintsManager() {
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
        switch (priority) {
            case "urgent": return <Badge className="bg-red-500 text-white animate-pulse">Urgent</Badge>;
            case "high": return <Badge className="bg-orange-100 text-orange-700">High</Badge>;
            case "medium": return <Badge className="bg-yellow-100 text-yellow-700">Medium</Badge>;
            case "low": return <Badge className="bg-green-100 text-green-700">Low</Badge>;
            default: return <Badge>{priority}</Badge>;
        }
    };

    return (
        <div className="space-y-6 mcms">
            <div className="grid grid-cols-4 gap-4">
                <Card className="p-4 border" style={{ backgroundColor: 'var(--mcms-card)', borderColor: 'var(--mcms-card-border)' }}>
                    <div className="flex items-center gap-2 mb-1" style={{ color: 'var(--mcms-text-muted)' }}><Inbox className="w-4 h-4" /> <span className="text-xs font-bold uppercase">Open</span></div>
                    <span className="text-2xl font-bold" style={{ color: 'var(--mcms-text)' }}>{complaints.filter(c => c.status === "open").length}</span>
                </Card>
                <Card className="p-4 border border-red-500/20" style={{ backgroundColor: 'rgba(239, 68, 68, 0.05)' }}>
                    <div className="flex items-center gap-2 text-red-500 mb-1"><AlertCircle className="w-4 h-4" /> <span className="text-xs font-bold uppercase">Urgent</span></div>
                    <span className="text-2xl font-bold text-red-500">{complaints.filter(c => c.priority === "urgent" && c.status !== "closed").length}</span>
                </Card>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                {COMPLAINT_STATUSES.map((colStatus, idx) => {
                    const colComplaints = complaints.filter(c => c.status === colStatus);
                    return (
                        <div key={colStatus} className="flex-none w-80 flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-bold capitalize flex items-center gap-2" style={{ color: 'var(--mcms-heading)' }}>
                                    {colStatus.replace('_', ' ')} <span className="text-[10px] font-normal px-1.5 py-0.5 rounded-full" style={{ backgroundColor: 'var(--mcms-kanban-bg)', color: 'var(--mcms-text-muted)' }}>{colComplaints.length}</span>
                                </h3>
                            </div>
                            <div className="flex-1 rounded-xl p-2 flex flex-col gap-2 min-h-[500px]" style={{ backgroundColor: 'var(--mcms-kanban-bg)' }}>
                                {colComplaints.map(complaint => (
                                    <Card key={complaint.id} className="p-3 border shadow-sm cursor-pointer transition-colors" style={{ backgroundColor: 'var(--mcms-card)', borderColor: 'var(--mcms-card-border)' }}>
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-[10px] font-mono" style={{ color: 'var(--mcms-text-muted)' }}>{new Date(complaint.created_at).toLocaleDateString()}</span>
                                            {getPriorityBadge(complaint.priority)}
                                        </div>
                                        <p className="font-semibold text-sm truncate mb-1" style={{ color: 'var(--mcms-text)' }}>{complaint.subject}</p>
                                        <p className="text-xs line-clamp-2 mb-2" style={{ color: 'var(--mcms-text-muted)' }}>{complaint.description}</p>
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <span className="text-[10px] px-1.5 py-0.5 rounded truncate" style={{ backgroundColor: 'var(--mcms-kanban-bg)', color: 'var(--mcms-text-muted)' }}>{complaint.customer_name}</span>
                                            <span className="text-[10px] px-1.5 py-0.5 rounded truncate uppercase" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>{complaint.category.replace('_', ' ')}</span>
                                        </div>

                                        <div className="pt-2 border-t flex items-center justify-between gap-1" style={{ borderColor: 'var(--mcms-card-border)' }}>
                                            {idx > 0 && (
                                                <Button
                                                    onClick={() => updateStatus(complaint.id, COMPLAINT_STATUSES[idx - 1])}
                                                    className="bg-transparent hover:bg-black/5 h-6 text-[10px] rounded-full px-2 flex-1 border"
                                                    style={{ color: 'var(--mcms-text)', borderColor: 'var(--mcms-card-border)' }}
                                                >
                                                    Back
                                                </Button>
                                            )}
                                            {idx < 3 && (
                                                <Button
                                                    onClick={() => updateStatus(complaint.id, COMPLAINT_STATUSES[idx + 1])}
                                                    className="h-6 text-[10px] text-white rounded-full px-2 flex-1 border-none"
                                                    style={{ backgroundColor: 'var(--mcms-accent)' }}
                                                >
                                                    Next
                                                </Button>
                                            )}
                                        </div>
                                    </Card>
                                ))}
                                {colComplaints.length === 0 && (
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
