
"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 1.2 }
};

const initialUsers = [
  { id: "USR-001", name: "Alexander Wright", email: "alex.w@luxury.com", badge: "VIP", status: "Active", joined: "2023-11-12", avatar: "AW" },
  { id: "USR-002", name: "Sarah Jenkins", email: "sarah.j@gmail.com", badge: "New", status: "Active", joined: "2024-02-01", avatar: "SJ" },
  { id: "USR-003", name: "Michael Vane", email: "mv@techcorp.io", badge: "Regular", status: "Banned", joined: "2023-05-20", avatar: "MV" },
  { id: "USR-004", name: "Elena Martinez", email: "elena.m@global.es", badge: "VIP", status: "Active", joined: "2023-08-15", avatar: "EM" },
  { id: "USR-005", name: "Liam O'Connor", email: "liam@dublin.ie", badge: "New", status: "Active", joined: "2024-01-10", avatar: "LO" },
];

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);

  const banUser = (id: string) => {
    setUsers(users.map(u => 
      u.id === id ? { ...u, status: u.status === 'Banned' ? 'Active' : 'Banned' } : u
    ));
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <motion.div 
        {...fadeInUp}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Users</h1>
          <p className="text-muted-foreground mt-1 font-code text-xs uppercase tracking-wider">Relationship Management</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-slate-900 border-white/5 text-xs h-9">
            Export
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-xs h-9">
            Invite Moderator
          </Button>
        </div>
      </motion.div>

      <motion.div 
        {...fadeInUp}
        transition={{ ...fadeInUp.transition, delay: 0.4 }}
        className="bg-slate-900/50 border border-white/5 rounded-xl overflow-hidden shadow-2xl"
      >
        <div className="p-4 border-b border-white/5 bg-slate-950/30">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search users..." 
              className="pl-10 bg-slate-950 border-white/10 h-10 text-sm"
            />
          </div>
        </div>
        <Table>
          <TableHeader className="bg-slate-950/50">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground py-4">User</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Tier</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="border-white/5 hover:bg-white/[0.01] transition-colors group">
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-white/10 bg-primary/20 text-primary font-bold text-xs shrink-0">
                      <AvatarFallback>{user.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-semibold text-white group-hover:text-primary transition-colors truncate max-w-[150px]">{user.name}</span>
                      <span className="text-[10px] text-muted-foreground truncate max-w-[150px]">{user.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={`text-[8px] font-bold uppercase tracking-widest rounded-full px-2 py-0 border-none ${
                      user.badge === 'VIP' ? 'bg-primary/20 text-primary' :
                      user.badge === 'New' ? 'bg-blue-500/10 text-blue-500' :
                      'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {user.badge}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                    <span className="text-xs text-slate-300 font-medium">{user.status}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => banUser(user.id)}
                      className={`h-8 text-[10px] font-bold uppercase tracking-widest ${
                        user.status === 'Banned' 
                          ? 'text-emerald-500 hover:text-emerald-400' 
                          : 'text-red-500 hover:text-red-400'
                      }`}
                    >
                      {user.status === 'Banned' ? 'Restore' : 'Ban'}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
}
