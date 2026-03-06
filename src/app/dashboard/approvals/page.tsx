"use client";

import { useMemo } from "react";
import { useRoles } from "@/context/role-context";
import { useCMS, CMSRequest } from "@/context/cms-context";
import { useCollection, useFirestore } from "@/firebase";
import { doc, updateDoc, collection, query, where } from "firebase/firestore";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X, Clock, User, UserPlus, FileText, ArrowRight, ShieldAlert } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { toast } from "@/components/ui/use-toast";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 1.2 }
};

export default function ApprovalsPage() {
  const { currentUser, requests: roleRequests, updateRequestStatus } = useRoles();
  const { requests: cmsRequests, approveRequest: approveCMS, rejectRequest: rejectCMS } = useCMS();
  const firestore = useFirestore();

  const role = currentUser?.role;
  const division = currentUser?.division;

  const isBoss = role === 'admin_boss';
  
  const enrollmentQuery = useMemo(() => {
    if (!firestore || !isBoss) return null;
    return query(collection(firestore, 'enrollmentRequests'), where('status', '==', 'pending'));
  }, [firestore, isBoss]);
  
  const { data: enrollmentRequests } = useCollection(enrollmentQuery);

  const handleApproveEnrollment = async (reqId: string, uid: string) => {
    if (!firestore) return;
    updateDoc(doc(firestore, "enrollmentRequests", reqId), { status: "approved" });
    updateDoc(doc(firestore, "users", uid), { status: "active" });
    toast({ title: "Access Granted", description: "User has been activated." });
  };

  const handleDeclineEnrollment = async (reqId: string, uid: string) => {
    if (!firestore) return;
    updateDoc(doc(firestore, "enrollmentRequests", reqId), { status: "rejected" });
    updateDoc(doc(firestore, "users", uid), { status: "rejected" });
    toast({ title: "Access Denied", description: "Enrollment request rejected." });
  };

  const handleApproveCMS = (id: string) => {
    approveCMS(id);
    toast({ title: "Changes Published", description: "Content update approved and live." });
  };

  const handleRejectCMS = (id: string) => {
    rejectCMS(id);
    toast({ title: "Request Rejected", description: "Content update declined." });
  };

  const handleApproveRoleRequest = (id: string) => {
    updateRequestStatus(id, 'approved');
    toast({ title: "Action Authorized", description: "Operational request approved." });
  };

  const handleRejectRoleRequest = (id: string) => {
    updateRequestStatus(id, 'declined');
    toast({ title: "Action Declined", description: "Operational request rejected." });
  };

  // Filter and normalize CMS requests
  const pendingCMS = cmsRequests
    .filter(req => req.status === 'pending' && (isBoss || req.division === division))
    .map(req => ({
      id: req.id,
      type: 'cms',
      requesterName: req.author.name,
      requesterRole: req.author.role,
      division: req.division,
      actionLabel: 'Content Update',
      timestamp: req.timestamp,
      original: req
    }));

  // Filter and normalize Role requests
  const pendingRole = roleRequests
    .filter(req => req.status === 'pending' && (isBoss || req.division === division))
    .map(req => ({
      id: req.id,
      type: 'role',
      requesterName: req.requesterName,
      requesterRole: 'admin_staff', // Assuming mostly staff makes requests
      division: req.division,
      actionLabel: req.actionLabel,
      timestamp: req.timestamp,
      original: req
    }));

  const allPending = [...pendingCMS, ...pendingRole].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto">
      <motion.div {...fadeInUp} className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tighter">Approval Center</h1>
        <p className="text-slate-500 font-medium italic">
          {isBoss ? "Reviewing global policy changes and staff enrollment." : `Reviewing Staff requests for ${division} operations.`}
        </p>
      </motion.div>

      <Tabs defaultValue="operational" className="w-full">
        <TabsList className="bg-slate-100 border border-slate-200 p-1 h-12 mb-6">
          <TabsTrigger value="operational" className="data-[state=active]:bg-primary data-[state=active]:text-white font-bold text-[10px] uppercase tracking-widest px-8">
            <Clock className="w-3.5 h-3.5 mr-2" /> Operational Queue
            {allPending.length > 0 && (
              <Badge className="ml-2 bg-red-500 text-white border-none h-5 w-5 p-0 flex items-center justify-center rounded-full">
                {allPending.length}
              </Badge>
            )}
          </TabsTrigger>
          {isBoss && (
            <TabsTrigger value="enrollment" className="data-[state=active]:bg-primary data-[state=active]:text-white font-bold text-[10px] uppercase tracking-widest px-8">
              <UserPlus className="w-3.5 h-3.5 mr-2" /> Enrollment Requests
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="operational">
          {allPending.length > 0 ? (
            <Card className="bg-white border-slate-200 overflow-hidden shadow-sm">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow className="border-slate-100">
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-primary">Requester</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-primary">Division</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-primary">Request</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-primary">Submitted</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-primary text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allPending.map((req) => (
                    <TableRow key={req.id} className="border-slate-50 hover:bg-slate-50/50">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                            <User className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900">{req.requesterName}</span>
                            <span className="text-[10px] text-slate-400 capitalize">{req.requesterRole.replace('admin_', '')}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[10px] uppercase border-slate-200 text-slate-600 bg-slate-50">
                          {req.division}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                          {req.type === 'cms' ? (
                            <FileText className="w-3.5 h-3.5 text-slate-400" />
                          ) : (
                            <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
                          )}
                          {req.actionLabel}
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-slate-500">
                        {format(new Date(req.timestamp), 'MMM d, HH:mm')}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => req.type === 'cms' ? handleRejectCMS(req.id) : handleRejectRoleRequest(req.id)}
                            className="h-8 w-8 p-0 text-red-500 hover:bg-red-50"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => req.type === 'cms' ? handleApproveCMS(req.id) : handleApproveRoleRequest(req.id)}
                            className="h-8 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] uppercase px-4"
                          >
                            <Check className="w-3.5 h-3.5 mr-2" /> Approve
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          ) : (
            <Card className="bg-white border-slate-200 p-12 flex flex-col items-center justify-center text-center space-y-4 shadow-sm">
              <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                <Check className="h-6 w-6 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Queue Clear</h3>
                <p className="text-sm text-slate-500">No pending operational requests require your authorization.</p>
              </div>
            </Card>
          )}
        </TabsContent>

        {isBoss && (
          <TabsContent value="enrollment">
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              {enrollmentRequests && enrollmentRequests.length > 0 ? (
                <Card className="bg-white border-slate-200 overflow-hidden shadow-sm">
                  <Table>
                    <TableHeader className="bg-slate-50">
                      <TableRow className="border-slate-100">
                        <TableHead className="text-[10px] font-bold uppercase tracking-widest text-primary">Applicant</TableHead>
                        <TableHead className="text-[10px] font-bold uppercase tracking-widest text-primary">Requested Division</TableHead>
                        <TableHead className="text-[10px] font-bold uppercase tracking-widest text-primary">Submitted</TableHead>
                        <TableHead className="text-[10px] font-bold uppercase tracking-widest text-primary text-right">Clearance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {enrollmentRequests.map((req: any) => (
                        <TableRow key={req.id} className="border-slate-50 hover:bg-slate-50/50">
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <User className="w-3.5 h-3.5 text-slate-400" />
                              <div className="flex flex-col">
                                <span className="text-sm font-bold text-slate-900">{req.name}</span>
                                <span className="text-[10px] text-slate-400">{req.email}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-[10px] uppercase border-primary/20 text-primary bg-primary/5">
                              {req.requestedDivision}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs text-slate-500">
                            {req.timestamp?.seconds ? format(new Date(req.timestamp.seconds * 1000), 'MMM d, HH:mm') : 'Recent'}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleDeclineEnrollment(req.id, req.uid)}
                                className="h-8 w-8 p-0 text-red-500 hover:bg-red-50"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                onClick={() => handleApproveEnrollment(req.id, req.uid)}
                                className="h-8 bg-primary text-white font-bold text-[10px] uppercase px-4"
                              >
                                Grant Access
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              ) : (
                <Card className="bg-white border-slate-200 p-12 flex flex-col items-center justify-center text-center space-y-4 shadow-sm">
                  <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                    <UserPlus className="h-6 w-6 text-slate-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">No Pending Applicants</h3>
                    <p className="text-sm text-slate-500">All enrollment requests have been processed.</p>
                  </div>
                </Card>
              )}
            </motion.div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
