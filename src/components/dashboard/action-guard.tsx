
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
  const { currentUser, canExecuteLocally, createRequest, addAuditLog } = useRoles();
  const [status, setStatus] = useState<'idle' | 'processing' | 'completed'>('idle');

  const isBoss = currentUser?.role === 'admin_boss';
  const hasPermission = canExecuteLocally(sensitivity);

  const handleAction = async () => {
    if (!currentUser) return;
    
    setStatus('processing');
    await new Promise(r => setTimeout(r, 600));

    if (hasPermission || isBoss) {
      if (onExecute) onExecute();
      
      // Auto-Log if it's an instant update
      if (oldValue && newValue) {
        addAuditLog({
          itemName: actionLabel,
          oldValue,
          newValue,
          staffName: currentUser.name,
          staffRole: currentUser.role === 'admin_boss' ? 'Director' : currentUser.role === 'admin_head' ? 'Manager' : 'Staff',
          approverName: currentUser.name,
          approverRole: currentUser.role === 'admin_boss' ? 'Director' : currentUser.role === 'admin_head' ? 'Manager' : 'Staff',
          reason: description,
          division: currentUser.division
        });
      }

      toast({
        title: "Update Authorized",
        description: `${actionLabel} has been updated.`,
      });
      setStatus('completed');
    } else {
      const targetRole = currentUser.role === 'admin_staff' ? 'admin_head' : 'admin_boss';
      
      createRequest({
        requesterId: currentUser.id,
        requesterName: currentUser.name,
        targetRoleId: targetRole,
        division: currentUser.division,
        actionLabel,
        description,
        oldValue,
        newValue
      });

      toast({
        title: "Request Sent",
        description: `Approval for "${actionLabel}" has been requested.`,
      });
      setStatus('completed');
    }
    
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
              isBoss 
                ? "bg-slate-900 text-primary border border-primary/20 hover:bg-slate-800"
                : !hasPermission 
                ? "bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200" 
                : "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20",
              status === 'completed' && "bg-emerald-500 text-white",
              className
            )}
          >
            {status === 'processing' ? (
              <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
            ) : status === 'completed' ? (
              <CheckCircle2 className="w-3.5 h-3.5 mr-2" />
            ) : isBoss ? (
              <Zap className="w-3.5 h-3.5 mr-2 text-primary" />
            ) : !hasPermission ? (
              <Send className="w-3.5 h-3.5 mr-2" />
            ) : (
              <ShieldAlert className="w-3.5 h-3.5 mr-2" />
            )}
            
            {status === 'processing' ? "Saving..." : 
             status === 'completed' ? (hasPermission || isBoss ? "Authorized" : "Requested") : 
             isBoss ? `Direct Update` :
             !hasPermission ? `Request Update` : children || actionLabel}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-slate-900 border-white/10 text-[10px] font-medium p-2 text-white">
          {isBoss 
            ? "Director bypass. Changes applied instantly."
            : hasPermission 
            ? "You have local authority for this action." 
            : `Approval required from your ${currentUser?.role === 'admin_staff' ? 'Manager' : 'Director'}.`}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
