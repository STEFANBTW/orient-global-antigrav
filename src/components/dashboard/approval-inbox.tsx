'use client';

import React, { useState } from 'react';
import { useRoles, type ApprovalRequest } from '@/context/role-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, ArrowRightLeft, MessageSquare, Clock, User } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';

export function ApprovalInbox() {
  const { currentUser, requests, updateRequestStatus } = useRoles();
  const [selectedRequest, setSelectedRequest] = useState<ApprovalRequest | null>(null);
  const [reason, setReason] = useState("");

  if (!currentUser) return null;

  const filteredRequests = requests.filter(req => {
    if (currentUser.role === 'admin_boss') return req.targetRoleId === 'admin_boss' && req.status === 'pending';
    if (currentUser.role === 'admin_head') return req.targetRoleId === 'admin_head' && req.division === currentUser.division && req.status === 'pending';
    return false;
  });

  const handleDeclineClick = (req: ApprovalRequest) => {
    setSelectedRequest(req);
    setReason("");
  };

  const confirmDecline = () => {
    if (selectedRequest) {
      updateRequestStatus(selectedRequest.id, 'declined', reason);
      setSelectedRequest(null);
    }
  };

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((req) => (
            <motion.div
              key={req.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="group bg-white border border-slate-200 rounded-xl p-5 hover:border-primary/40 transition-all shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-primary/20 text-primary border-none text-[8px] uppercase tracking-widest font-bold">
                      {req.division}
                    </Badge>
                    <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Just now
                    </span>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      {req.requesterName} proposes: {req.actionLabel}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 italic">{req.description}</p>
                  </div>

                  {req.oldValue && req.newValue && (
                    <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <div className="flex flex-col">
                        <span className="text-[8px] uppercase text-slate-400 font-bold">Current</span>
                        <span className="text-xs text-slate-500 line-through">{req.oldValue}</span>
                      </div>
                      <ArrowRightLeft className="w-3 h-3 text-primary" />
                      <div className="flex flex-col">
                        <span className="text-[8px] uppercase text-primary font-bold">Proposed</span>
                        <span className="text-xs text-emerald-600 font-bold">{req.newValue}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDeclineClick(req)}
                    className="h-9 px-4 text-red-500 hover:bg-red-500/10 font-bold text-[10px] uppercase tracking-widest"
                  >
                    <X className="w-3.5 h-3.5 mr-2" /> Decline
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => updateRequestStatus(req.id, 'approved')}
                    className="h-9 px-6 bg-primary text-primary-foreground font-bold text-[10px] uppercase tracking-widest"
                  >
                    <Check className="w-3.5 h-3.5 mr-2" /> Authorize
                  </Button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="p-12 text-center bg-slate-50 border border-slate-200 border-dashed rounded-2xl">
            <Check className="w-8 h-8 text-slate-200 mx-auto mb-4" />
            <h5 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Inbox Zero</h5>
            <p className="text-xs text-slate-400 mt-2">No pending proposals require your clearance.</p>
          </div>
        )}
      </AnimatePresence>

      <Dialog open={!!selectedRequest} onOpenChange={(o) => !o && setSelectedRequest(null)}>
        <DialogContent className="bg-white border-slate-200 text-slate-900 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold tracking-tighter flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-red-500" />
              Required Feedback
            </DialogTitle>
          </DialogHeader>
          <div className="py-6 space-y-4">
            <p className="text-sm text-slate-500">
              Per corporate governance, all declined proposals must include an actionable reason for the requester.
            </p>
            <Textarea 
              placeholder="e.g., Budget constraints for Q3, or incorrect margin calculation..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="bg-slate-50 border-slate-200 min-h-[120px] focus:ring-primary text-slate-900"
            />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setSelectedRequest(null)}>Cancel</Button>
            <Button 
              disabled={!reason.trim()}
              onClick={confirmDecline}
              className="bg-red-600 hover:bg-red-700 text-white font-bold"
            >
              Confirm Refusal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
