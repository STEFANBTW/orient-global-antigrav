
"use client";

import { useRoles } from "@/context/role-context";
import { MOCK_PRODUCTS } from "@/app/lib/mock-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ActionGuard } from "@/components/dashboard/action-guard";
import { GamesModule, WaterModule, BakeryModule } from "@/components/dashboard/division-modules";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 1.2 }
};

export default function InventoryPage() {
  const { currentUser } = useRoles();
  const division = currentUser?.division;

  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    division === 'global' ? true : p.division === division
  );

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto pb-20">
      <motion.div 
        {...fadeInUp}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tighter font-headline uppercase">Inventory</h1>
          <p className="text-muted-foreground mt-1 font-medium italic">
            {division === 'global' ? "Cross-division stock management." : `Inventory for the ${division} node.`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ActionGuard sensitivity="high" actionLabel="Update Pricing" variant="outline" />
          <ActionGuard sensitivity="low" actionLabel="New SKU" />
        </div>
      </motion.div>

      <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.3 }}>
        {division === 'games' && <GamesModule />}
        {division === 'water' && <WaterModule />}
        {division === 'bakery' && <BakeryModule />}
      </motion.div>

      <motion.div 
        {...fadeInUp}
        transition={{ ...fadeInUp.transition, delay: 0.6 }}
        className="bg-slate-900/40 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-xl"
      >
        <div className="p-6 border-b border-white/5 bg-slate-950/40 flex items-center justify-between">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search SKUs..." 
              className="pl-10 bg-slate-950 border-white/10 h-10 text-xs focus:ring-primary placeholder:text-muted-foreground/70"
            />
          </div>
          <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest border-white/10 bg-white/5 text-slate-300">
            {filteredProducts.length} Total items
          </Badge>
        </div>
        <Table>
          <TableHeader className="bg-slate-950/50">
            <TableRow className="border-white/5">
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-primary">ID</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-primary">Product</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-primary">Price</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-primary">Stock</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest text-primary text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow 
                key={product.id} 
                className="border-white/5 hover:bg-white/[0.02] transition-colors"
              >
                <TableCell className="font-code font-bold text-white">{product.id}</TableCell>
                <TableCell>
                   <div className="flex flex-col">
                      <span className="font-bold text-white truncate max-w-[200px]">{product.name}</span>
                      <span className="text-[9px] text-muted-foreground uppercase">{product.category}</span>
                   </div>
                </TableCell>
                <TableCell className="font-code text-white">₦{product.price.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${product.stock < 10 ? 'text-red-500' : 'text-slate-300'}`}>
                      {product.stock}
                    </span>
                    {product.stock < 10 && <Badge className="bg-red-500/10 text-red-500 border-none text-[8px] uppercase">Low</Badge>}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <ActionGuard 
                    sensitivity={product.sensitivity as 'low' | 'high'} 
                    actionLabel="Adjust" 
                    size="sm"
                    variant="ghost"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
}
