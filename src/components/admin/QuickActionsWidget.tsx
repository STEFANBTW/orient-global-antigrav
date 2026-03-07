import React, { useMemo } from 'react';
import { useRoles } from '@/context/role-context';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Edit, Box, Users, Clock, Flame, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export function QuickActionsWidget() {
    const { currentUser, setActiveModule } = useRoles();
    const navigate = useNavigate();

    // AI-predictive simulation: determine the time of day and user role to suggest actions
    const suggestedActions = useMemo(() => {
        if (!currentUser) return [];

        const hour = new Date().getHours();
        const isMorning = hour >= 5 && hour < 12;
        const isEvening = hour >= 17 || hour < 5;

        let actions = [];

        if (currentUser.role === 'admin_boss') {
            actions.push({ id: 'approvals', label: 'Review Authorizations', icon: FileText, route: '/dashboard/inbox', urgency: 'high' });
            if (isMorning) {
                actions.push({ id: 'market_ai', label: 'Check Market Forecast', icon: Flame, route: '/dashboard/market', module: 'ai' });
            } else {
                actions.push({ id: 'logs', label: 'Audit Daily Logs', icon: Clock, route: '/dashboard/logs' });
            }
        } else {
            const div = currentUser.division;
            if (div === 'bakery') {
                actions.push({ id: `bake_queue_${hour}`, label: isMorning ? 'Start Morning Bake Queue' : 'Review Daily Wastage', icon: isMorning ? Flame : Box, route: `/dashboard/bakery`, module: 'production' });
                actions.push({ id: 'menu_edit', label: 'Update Pastry Menu', icon: Edit, route: `/dashboard/bakery`, module: 'catalog' });
            } else if (div === 'dining') {
                actions.push({ id: `res_${hour}`, label: isEvening ? 'Manage Evening Seating' : 'Check Lunch Reservations', icon: Users, route: `/dashboard/dining`, module: 'reservations' });
            } else if (div === 'market') {
                actions.push({ id: 'stock_check', label: 'Low Stock Review', icon: Box, route: `/dashboard/market`, module: 'inventory', urgency: 'high' });
            } else if (div === 'lounge') {
                actions.push({ id: 'guest_list', label: 'VIP Guest List', icon: Users, route: `/dashboard/lounge`, module: 'bookings' });
            } else {
                actions.push({ id: 'edit_site', label: 'Edit Landing Page', icon: Edit, route: `/dashboard/${div}`, module: 'cms' });
                actions.push({ id: 'view_reports', label: 'View Div Reports', icon: FileText, route: `/dashboard/${div}`, module: 'reports' });
            }
        }

        return actions.slice(0, 3); // Max 3 quick actions
    }, [currentUser]);

    const handleAction = (action: any) => {
        if (action.module) {
            setActiveModule(action.module);
        }
        navigate(action.route);
    };

    if (suggestedActions.length === 0) return null;

    return (
        <Card className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 professional-shadow relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/40 via-primary to-primary/40 opacity-70" />
            <CardHeader className="p-4 md:p-6 pb-2 md:pb-3 flex flex-row items-center justify-between border-b border-slate-50 dark:border-slate-800/60">
                <div>
                    <CardTitle className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 font-code flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                        AI Predicted Actions
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-4 md:pt-4 space-y-3">
                {suggestedActions.map((action, idx) => {
                    const Icon = action.icon;
                    const isUrgent = action.urgency === 'high';
                    return (
                        <motion.div
                            key={action.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Button
                                variant="outline"
                                onClick={() => handleAction(action)}
                                className={`w-full justify-start h-12 text-xs font-semibold uppercase tracking-widest border transition-colors ${isUrgent
                                        ? 'border-orange-500/20 text-orange-600 dark:text-orange-400 hover:bg-orange-500/10 hover:border-orange-500/40'
                                        : 'border-slate-200 dark:border-slate-800 hover:border-primary/40 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                                    }`}
                            >
                                <Icon className={`w-4 h-4 mr-3 ${isUrgent ? 'text-orange-500' : 'text-primary'}`} />
                                {action.label}
                            </Button>
                        </motion.div>
                    );
                })}
            </CardContent>
        </Card>
    );
}
