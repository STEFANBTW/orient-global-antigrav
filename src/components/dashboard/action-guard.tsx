
'use client';

import React, { useState } from 'react';
import { useRoles } from '@/context/role-context';
import { Button, ButtonProps } from '@/components/ui/button';
import { Send, CheckCircle2, ShieldAlert, Loader2, Zap } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface ActionGuardProps extends ButtonProps {
  sensitivity?: 'low' | 'high';
  actionLabel: string;
  description?: string;
  onExecute?: () => void;
  oldValue?: string;
  newValue?: string;
}

export function ActionGuard({ 
  sensitivity = 'low', 
  actionLabel, 
  description = "Standard operational update",
  onExecute, 
  oldValue,
  newValue,
  children,
  className,
  ...props 
}: ActionGuardProps) {
  const { currentUser, addAuditLog } = useRoles();
  const [status, setStatus] = useState<'idle' | 'processing' | 'completed'>('idle');

  const handleAction = async () => {
    if (!currentUser) return;
    
    setStatus('processing');
    await new Promise(r => setTimeout(r, 600));

    if (onExecute) onExecute();
    
    // Auto-Log if it's an instant update
    if (oldValue && newValue) {
      addAuditLog({
        itemName: actionLabel,
        oldValue,
        newValue,
        staffName: currentUser.name,
        staffRole: 'Administrator',
        approverName: currentUser.name,
        approverRole: 'Administrator',
        reason: description,
        division: currentUser.division
      });
    }

    toast({
      title: "Update Authorized",
      description: `${actionLabel} has been updated.`,
    });
    setStatus('completed');
    
    setTimeout(() => setStatus('idle'), 2000);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            {...props} 
            disabled={status !== 'idle' || props.disabled}
            onClick={handleAction}
            className={cn(
              "font-bold uppercase tracking-widest text-[10px] h-9 px-4 transition-all duration-200 professional-shadow",
              "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20",
              status === 'completed' && "bg-emerald-500 text-white",
              className
            )}
          >
            {status === 'processing' ? (
              <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
            ) : status === 'completed' ? (
              <CheckCircle2 className="w-3.5 h-3.5 mr-2" />
            ) : (
              <Zap className="w-3.5 h-3.5 mr-2" />
            )}
            
            {status === 'processing' ? "Saving..." : 
             status === 'completed' ? "Authorized" : 
             children || actionLabel}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-slate-900 border-white/10 text-[10px] font-medium p-2 text-white">
          "Direct administrative access. Changes applied instantly."
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
