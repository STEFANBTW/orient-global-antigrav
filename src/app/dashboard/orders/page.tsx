
"use client";

import { useState } from "react";
import { useRoles } from "@/context/role-context";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Printer, Search, Filter, Download, MoreHorizontal, ChefHat, ShoppingBasket, Gamepad2, Pizza, Droplets, Wine, Store } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 1.2 }
};

const initialOrders = [
  { id: "ORD-9842", customer: "Sophia Chen", division: "bakery", total: "12,500", status: "Preparing", time: "12:45 PM", items: ["Artisan Sourdough", "Macaron Box (12)"] },
  { id: "ORD-9843", customer: "James Miller", division: "market", total: "45,200", status: "Pending", time: "12:48 PM", items: ["Organic Produce Box", "Premium Olive Oil"] },
  { id: "ORD-9844", customer: "Fatima Al-Sayed", division: "dining", total: "85,000", status: "Delivered", time: "11:30 AM", items: ["Chef's Tasting Menu x2"] },
  { id: "ORD-9845", customer: "David K.", division: "games", total: "5,500", status: "Delivered", time: "10:15 AM", items: ["VIP Lounge Pass"] },
  { id: "ORD-9846", customer: "Elena Rossi", division: "bakery", total: "8,900", status: "Preparing", time: "1:05 PM", items: ["Almond Croissant x4", "Hot Chocolate"] },
  { id: "ORD-9847", customer: "Marcus T.", division: "water", total: "1,500", status: "Pending", time: "2:15 PM", items: ["18L Refill x3"] },
  { id: "ORD-9848", customer: "Linda G.", division: "lounge", total: "35,000", status: "Delivered", time: "9:00 PM", items: ["Veuve Clicquot", "Signature Platter"] },
];

const divisionIcons: Record<string, any> = {
  bakery: ChefHat,
  market: Store,
  dining: Pizza,
  games: Gamepad2,
  water: Droplets,
  lounge: Wine
};

export default function OrdersPage() {
  const { currentUser } = useRoles();
  const division = currentUser?.division;
  const role = currentUser?.role;
  const [selectedOrder, setSelectedOrder] = useState<typeof initialOrders[0] | null>(null);

  const isGlobal = division === 'global';
  
  const filteredOrders = initialOrders.filter(order => 
    isGlobal ? true : order.division === division
  );

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <motion.div 
        {...fadeInUp}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Orders</h1>
          <p className="text-muted-foreground mt-1 font-code text-xs uppercase tracking-wider">
            {isGlobal ? "Global Operational Queue" : `${division.toUpperCase()} Queue`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-slate-900 border-white/5 text-xs h-9">
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-xs h-9">
            Create Order
          </Button>
        </div>
      </motion.div>

      <motion.div 
        {...fadeInUp}
        transition={{ ...fadeInUp.transition, delay: 0.3 }}
        className="flex items-center justify-between gap-4 bg-slate-900/50 p-4 rounded-xl border border-white/5"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search Order ID, Customer..." 
            className="pl-10 bg-slate-950 border-white/10 h-10 text-sm focus:ring-primary"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>

      <motion.div 
        {...fadeInUp}
        transition={{ ...fadeInUp.transition, delay: 0.6 }}
        className="bg-slate-900/50 border border-white/5 rounded-xl overflow-hidden shadow-2xl"
      >
        <Table>
          <TableHeader className="bg-slate-950/50">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground py-4">ID</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Customer</TableHead>
              {isGlobal && <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Node</TableHead>}
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Total</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => {
              const Icon = divisionIcons[order.division] || ShoppingBasket;
              return (
                <TableRow key={order.id} className="border-white/5 hover:bg-white/[0.02] group transition-colors">
                  <TableCell className="font-code font-bold text-primary py-4">{order.id}</TableCell>
                  <TableCell className="text-white font-medium truncate max-w-[150px]">{order.customer}</TableCell>
                  {isGlobal && (
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        <span className="text-xs text-slate-300 capitalize truncate">{order.division}</span>
                      </div>
                    </TableCell>
                  )}
                  <TableCell className="font-code text-white">₦{order.total}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`text-[10px] uppercase tracking-tighter rounded px-2 py-0.5 border-none ${
                        order.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-500' :
                        order.status === 'Preparing' ? 'bg-orange-500/10 text-orange-500' :
                        'bg-blue-500/10 text-blue-500'
                      }`}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setSelectedOrder(order)}
                          className="h-8 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-white"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-slate-950 border-white/10 text-white max-w-sm">
                        <DialogHeader>
                          <DialogTitle className="text-center font-headline tracking-tighter border-b border-dashed border-white/20 pb-4 mb-4">
                            ORIENT RECEIPT
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 font-code text-xs">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Order ID:</span>
                            <span>{selectedOrder?.id}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Customer:</span>
                            <span className="truncate max-w-[200px]">{selectedOrder?.customer}</span>
                          </div>
                          <div className="border-t border-dashed border-white/20 pt-4 space-y-2">
                            <span className="text-muted-foreground block mb-1">Items:</span>
                            {selectedOrder?.items.map((item, i) => (
                              <div key={i} className="flex justify-between">
                                <span className="truncate max-w-[180px]">{item}</span>
                                <span>--</span>
                              </div>
                            ))}
                          </div>
                          <div className="border-t border-white/20 pt-4 flex justify-between font-bold text-lg text-primary">
                            <span>TOTAL</span>
                            <span>₦{selectedOrder?.total}</span>
                          </div>
                        </div>
                        <DialogFooter className="sm:justify-center">
                          <Button className="w-full bg-primary hover:bg-primary/90 h-10">Confirm Print</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
}
