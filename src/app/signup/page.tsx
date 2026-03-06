"use client";

import { useState } from "react";
import { useAuth, useFirestore } from "@/firebase";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Loader2, ShieldCheck, LogIn, Info, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { DIVISIONS } from "@/app/lib/mock-data";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [division, setDivision] = useState("bakery");
  const [role, setRole] = useState("admin_staff");
  const [loading, setLoading] = useState(false);
  
  const auth = useAuth();
  const firestore = useFirestore();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!auth || !firestore) {
      toast({ 
        variant: "destructive", 
        title: "System Error", 
        description: "Identity services are currently offline. Please refresh." 
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // 1. Authenticate with Identity Node
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const isBoss = role === 'admin_boss';
      const status = isBoss ? 'active' : 'pending';

      // 2. Provision Core User Profile
      await setDoc(doc(firestore, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        name: name,
        role: role,
        division: isBoss ? 'global' : division,
        status: status,
        createdAt: serverTimestamp()
      });

      // 3. Log Clearance Request if not automatic
      if (!isBoss) {
        await addDoc(collection(firestore, "enrollmentRequests"), {
          uid: user.uid,
          email: user.email,
          name: name,
          requestedDivision: division,
          requestedRole: role,
          timestamp: serverTimestamp(),
          status: "pending"
        });
        
        // Force sign-out to prevent session conflict before approval
        await signOut(auth);
        
        toast({ 
          title: "Enrollment Logged", 
          description: "Your request has been routed for executive clearance." 
        });
      } else {
        toast({ 
          title: "Executive Active", 
          description: "Boss account provisioned. You may now enter mission control." 
        });
      }
      
      // Atomic navigation
      navigate("/login", { replace: true });
    } catch (error: any) {
      toast({ 
        variant: "destructive", 
        title: "Provisioning Failed", 
        description: error.message || "Credential integrity check failed."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 overflow-hidden relative font-body">
      {/* Visual Accents */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-slate-100 rounded-full blur-[100px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="mb-8 flex items-center justify-between">
          <Link to="/login" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Portal
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Enrollment Status:</span>
            <Badge variant="outline" className="text-[8px] uppercase border-primary/20 text-primary">Live</Badge>
          </div>
        </div>

        <Card className="bg-white border-slate-200 professional-shadow">
          <CardHeader className="space-y-4 text-center pb-10 border-b border-slate-50">
            <div className="mx-auto bg-primary w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-4xl font-bold tracking-tighter text-slate-900 uppercase italic font-headline">Enrollment</CardTitle>
              <CardDescription className="text-primary font-bold uppercase tracking-[0.3em] text-[10px]">
                Request Identity Provisioning
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-10">
            <form onSubmit={handleSignup} className="space-y-6">
               <div className="space-y-2">
                <Input 
                  placeholder="Full Name (Personnel)" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-slate-50 border-slate-200 h-12 text-slate-900 placeholder:text-slate-500/70 focus:ring-primary font-medium"
                  required
                />
              </div>
              <div className="space-y-2">
                <Input 
                  type="email" 
                  placeholder="Corporate Email Address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-50 border-slate-200 h-12 text-slate-900 placeholder:text-slate-500/70 focus:ring-primary font-medium"
                  required
                />
              </div>
              <div className="space-y-2">
                <Input 
                  type="password" 
                  placeholder="Security Passphrase" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-50 border-slate-200 h-12 text-slate-900 placeholder:text-slate-500/70 focus:ring-primary font-medium"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger className="bg-slate-50 border-slate-200 h-12 text-slate-900 focus:ring-primary font-medium">
                      <SelectValue placeholder="Access Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin_boss">Tier 01: Boss</SelectItem>
                      <SelectItem value="admin_head">Tier 02: HOD</SelectItem>
                      <SelectItem value="admin_staff">Tier 03: Staff</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Select value={division} onValueChange={setDivision} disabled={role === 'admin_boss'}>
                    <SelectTrigger className="bg-slate-50 border-slate-200 h-12 text-slate-900 focus:ring-primary font-medium">
                      <SelectValue placeholder="Target Division" />
                    </SelectTrigger>
                    <SelectContent>
                      {DIVISIONS.map((d) => (
                        <SelectItem key={d.id} value={d.id}>{d.name} Node</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex gap-3">
                <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-relaxed italic">
                  Personnel Policy: Boss identities auto-provision. Staff & HODs require executive clearance via the CEO.
                </p>
              </div>

              <Button type="submit" disabled={loading} className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-[0.2em] text-[10px] gap-3 transition-all orange-glow">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    Complete Enrollment
                  </>
                )}
              </Button>
            </form>
            
            <div className="mt-10 text-center border-t border-slate-50 pt-8">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Identity already provisioned?{" "}
                <Link to="/login" className="text-primary font-bold hover:underline inline-flex items-center gap-1 transition-colors">
                  Sign In
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
