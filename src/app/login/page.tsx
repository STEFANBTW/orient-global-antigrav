'use client';

import { useNavigate, Link } from 'react-router-dom';
import { useRoles, MOCK_PERSONAS, type UserProfile } from '@/context/role-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, LogIn, Users, Building2, Globe, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage({ onCancel }: { onCancel?: () => void }) {
  const { setCurrentUser } = useRoles();
  const navigate = useNavigate();

  const handlePersonaSelect = (persona: UserProfile) => {
    setCurrentUser(persona);
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden font-body">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/4 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-primary/5 rounded-full blur-[60px] md:blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[250px] md:w-[600px] h-[250px] md:h-[600px] bg-slate-50 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

      {onCancel && (
        <button 
          onClick={onCancel}
          className="absolute top-6 left-6 z-50 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Main Site
        </button>
      )}

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-5xl space-y-8 md:space-y-10 relative z-10"
      >
        <div className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 md:w-16 md:h-16 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20 mb-4 md:mb-6">
            <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 uppercase italic font-headline">Orient Portal</h1>
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-[8px] md:text-[10px]">Secure Login • Version 3.1</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">
          <div className="lg:col-span-2 order-2 lg:order-1">
            <Card className="border-slate-200 professional-shadow overflow-hidden flex flex-col h-[500px] md:h-[650px]">
              <CardHeader className="border-b bg-slate-50/80 backdrop-blur-sm sticky top-0 z-20">
                <CardTitle className="text-lg md:text-xl font-bold tracking-tight">Identity Gate</CardTitle>
                <CardDescription className="text-[10px] md:text-xs font-medium text-slate-500">
                  Select a secure staff profile to log in.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 flex-1 min-h-0 relative">
                <div className="h-full overflow-y-auto p-4 md:p-8 space-y-8">
                    {/* Bosses Section */}
                    <div className="space-y-4">
                      <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] flex items-center gap-2 px-1">
                        <Globe className="w-3.5 h-3.5" /> Tier 01: Global Executive
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                        {MOCK_PERSONAS.filter(p => p.role === 'admin_boss').map((persona) => (
                          <PersonaButton key={persona.id} persona={persona} onSelect={handlePersonaSelect} />
                        ))}
                      </div>
                    </div>

                    {/* HODs Section */}
                    <div className="space-y-4">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2 px-1">
                        <Building2 className="w-3.5 h-3.5" /> Tier 02: Heads of Division
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                        {MOCK_PERSONAS.filter(p => p.role === 'admin_head').map((persona) => (
                          <PersonaButton key={persona.id} persona={persona} onSelect={handlePersonaSelect} />
                        ))}
                      </div>
                    </div>

                    {/* Staff Section */}
                    <div className="space-y-4">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2 px-1">
                        <Users className="w-3.5 h-3.5" /> Tier 03: Operational Staff
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                        {MOCK_PERSONAS.filter(p => p.role === 'admin_staff').map((persona) => (
                          <PersonaButton key={persona.id} persona={persona} onSelect={handlePersonaSelect} />
                        ))}
                      </div>
                    </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 order-1 lg:order-2">
            <Card className="border-slate-200 professional-shadow bg-slate-50/30">
              <CardHeader className="bg-primary/5 border-b border-primary/10">
                <CardTitle className="text-sm font-bold flex items-center gap-2 text-primary">
                  <ShieldCheck className="w-4 h-4" /> System Info
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 space-y-6">
                <div className="space-y-5">
                  <div className="group">
                    <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest mb-1">Isolation</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                      Staff can only see their division. God Mode is global.
                    </p>
                  </div>
                  <div className="group">
                    <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest mb-1">Approval</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                      Boss overrides all checks. Staff needs HOD sign-off.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="p-6 md:p-8 bg-white border border-slate-200 rounded-2xl flex flex-col items-center text-center gap-4 professional-shadow">
              <Link to="/signup" className="w-full">
                <button className="w-full h-12 bg-slate-950 text-white rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group">
                  New Account <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center text-[8px] md:text-[10px] text-slate-400 font-bold uppercase tracking-[0.5em] pt-4">
          Orient Governance Protocol • Internal Use Only
        </p>
      </motion.div>
    </div>
  );
}

function PersonaButton({ persona, onSelect }: { persona: UserProfile, onSelect: (p: UserProfile) => void }) {
  return (
    <button
      onClick={() => onSelect(persona)}
      className="group flex items-center gap-3 md:gap-4 p-3 md:p-5 bg-white border border-slate-200 rounded-2xl hover:border-primary hover:bg-primary/5 transition-all text-left professional-shadow"
    >
      <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs md:text-sm group-hover:bg-primary group-hover:text-white transition-all shadow-sm shrink-0">
        {persona.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs md:text-sm font-bold text-slate-900 truncate tracking-tight">{persona.name}</p>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant="outline" className="text-[8px] uppercase tracking-tighter bg-slate-50 py-0 h-4 font-bold border-slate-200 text-slate-500">
            {persona.role.split('_')[1]}
          </Badge>
          <span className="text-[9px] text-slate-400 uppercase font-bold tracking-widest truncate">
            {persona.division}
          </span>
        </div>
      </div>
      <LogIn className="w-4 h-4 text-slate-300 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all hidden xs:block" />
    </button>
  );
}
