"use client";

import { useRoles } from "@/context/role-context";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useMarketCMS } from "@/components/dashboard/market/useMarketCMS";
import MarketDashboard from "@/components/dashboard/market/MarketDashboard";
import ProductGrid from "@/components/dashboard/market/ProductGrid";
import OrdersManager from "@/components/dashboard/market/OrdersManager";
import DeliveriesManager from "@/components/dashboard/market/DeliveriesManager";
import ComplaintsManager from "@/components/dashboard/market/ComplaintsManager";
import ReviewsManager from "@/components/dashboard/market/ReviewsManager";
import CategoryManager from "@/components/dashboard/market/CategoryManager";
import { Loader2, ShoppingBasket } from "lucide-react";

export default function MarketOperationsPage() {
  const { activeModule } = useRoles();
  const cms = useMarketCMS();

  const { products, loading } = cms;

  return (
    <div className="h-full flex flex-col gap-6 bg-slate-50/20 p-2 rounded-3xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-100 pb-8 px-6 pt-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-orange-500/10 border-orange-500/20 text-orange-700 uppercase text-[9px] tracking-widest font-bold px-3 italic">
              Orient Market Operations
            </Badge>
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </div>
          <h1 className="text-5xl font-bold text-slate-900 tracking-tighter uppercase italic font-headline truncate">Command Centre</h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Supply Chain & Inventory Management</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
            <ShoppingBasket className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      <div className="flex-1 px-6 pb-6 overflow-hidden">
        <Tabs value={activeModule || 'dashboard'} className="w-full h-full flex flex-col">
          <TabsContent value="dashboard" className="m-0 flex-1 overflow-y-auto pr-2">
            <MarketDashboard cms={cms} />
          </TabsContent>

          <TabsContent value="orders" className="m-0 flex-1 overflow-y-auto">
            <OrdersManager />
          </TabsContent>

          <TabsContent value="deliveries" className="m-0 flex-1 overflow-y-auto">
            <DeliveriesManager />
          </TabsContent>

          <TabsContent value="inventory" className="m-0 flex-1 h-full overflow-hidden">
            <ProductGrid
              tabId="aisles"
              products={products}
              loading={loading}
              onRefresh={cms.fetchProducts}
              onDelete={cms.deleteProduct}
              onDuplicate={cms.duplicateProduct}
              onUpdateStatus={cms.updateStatus}
              onBulkDelete={cms.bulkDelete}
              onBulkStatus={cms.bulkUpdateStatus}
              onExportCSV={cms.exportCSV}
            />
          </TabsContent>

          <TabsContent value="promotions" className="m-0 flex-1 h-full overflow-hidden">
            <ProductGrid
              tabId="flash-sales"
              products={products}
              loading={loading}
              onRefresh={cms.fetchProducts}
              onDelete={cms.deleteProduct}
              onDuplicate={cms.duplicateProduct}
              onUpdateStatus={cms.updateStatus}
              onBulkDelete={cms.bulkDelete}
              onBulkStatus={cms.bulkUpdateStatus}
              onExportCSV={cms.exportCSV}
              categoryFilter={["Flash Sale", "Deals"]}
            />
          </TabsContent>

          <TabsContent value="crm" className="m-0 flex-1 overflow-y-auto space-y-8">
            <ComplaintsManager />
            <div className="pt-8 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 uppercase italic mb-4">Customer Reviews Management</h3>
              <ReviewsManager />
            </div>
          </TabsContent>

          <TabsContent value="categories" className="m-0 flex-1 overflow-y-auto">
            <CategoryManager products={products} onRefresh={cms.fetchProducts} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}