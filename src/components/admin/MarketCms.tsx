import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMarketCMS } from "../dashboard/market/useMarketCMS";
import MarketDashboard from "../dashboard/market/MarketDashboard";
import ProductGrid from "../dashboard/market/ProductGrid";
import OrdersManager from "../dashboard/market/OrdersManager";
import DeliveriesManager from "../dashboard/market/DeliveriesManager";
import ComplaintsManager from "../dashboard/market/ComplaintsManager";
import ReviewsManager from "../dashboard/market/ReviewsManager";
import CategoryManager from "../dashboard/market/CategoryManager";

interface MarketCmsProps {
    activeTab: string;
    isDarkMode?: boolean;
}

export default function MarketCms({
    activeTab,
    isDarkMode = true
}: MarketCmsProps) {
    const cms = useMarketCMS();
    const { products, loading } = cms;

    return (
        <div
            className={`flex flex-col h-full w-full mcms ${isDarkMode ? 'mcms-dark' : ''} overflow-hidden font-sans`}
            style={{
                backgroundColor: 'var(--mcms-bg)',
                color: 'var(--mcms-text)'
            }}
        >
            <div className="flex-1 overflow-y-auto relative p-4 sm:p-6 md:p-8 lg:p-10 pb-24 sm:pb-32" data-lenis-prevent>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {activeTab === "dashboard" && <MarketDashboard cms={cms} isDarkMode={isDarkMode} />}

                        {activeTab === "orders" && <OrdersManager isDarkMode={isDarkMode} />}

                        {activeTab === "deliveries" && <DeliveriesManager isDarkMode={isDarkMode} />}

                        {activeTab === "inventory" && (
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
                                isDarkMode={isDarkMode}
                            />
                        )}

                        {activeTab === "promotions" && (
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
                                isDarkMode={isDarkMode}
                            />
                        )}

                        {activeTab === "crm" && (
                            <div className="space-y-8">
                                <ComplaintsManager isDarkMode={isDarkMode} />
                                <div className="pt-8 border-t" style={{ borderColor: 'var(--mcms-card-border)' }}>
                                    <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--mcms-heading)' }}>Customer Reviews</h3>
                                    <ReviewsManager isDarkMode={isDarkMode} />
                                </div>
                            </div>
                        )}

                        {activeTab === "categories" && <CategoryManager products={products} onRefresh={cms.fetchProducts} isDarkMode={isDarkMode} />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
