import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { cmsApi, Division, ContentBlock } from '@/services/cmsApi';
import { HeroEditor } from './editors/HeroEditor';
import { ProductsEditor } from './editors/ProductsEditor';
import { SEOEditor } from './editors/SEOEditor';
import { NavigationMatrix } from './editors/NavigationMatrix';
import { TextEditor } from './editors/TextEditor';
import { Save, Layers, CheckCircle, Clock, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Block type → Editor mapping ──────────────────────────────
const EDITOR_MAP: Record<string, React.ComponentType<{ payload: any; onChange: (p: any) => void }>> = {
    hero: HeroEditor,
    text: TextEditor,
    products: ProductsEditor,
    catalog: ProductsEditor,
    seo: SEOEditor,
    navigation: NavigationMatrix,
};

const BLOCK_TYPE_LABELS: Record<string, string> = {
    hero: '🎬 Hero Section',
    text: '📝 Text Block',
    products: '🛍️ Products List',
    catalog: '📦 Catalog',
    seo: '🔍 SEO & OpenGraph',
    navigation: '🧭 Navigation Matrix',
};

// ─── Main Component ───────────────────────────────────────────
export default function BlockEditorFactory({ division }: { division?: string }) {
    const { toast } = useToast();

    const [divisions, setDivisions] = useState<Division[]>([]);
    const [blocks, setBlocks] = useState<ContentBlock[]>([]);
    const [selectedDivision, setSelectedDivision] = useState<string>(division || '');
    const [activeBlock, setActiveBlock] = useState<ContentBlock | null>(null);
    const [editedPayload, setEditedPayload] = useState<any>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isDirty, setIsDirty] = useState(false);

    const loadData = useCallback(async () => {
        try {
            const [divRes, blockRes] = await Promise.all([
                cmsApi.getDivisions(),
                cmsApi.getAllContentBlocks(),
            ]);
            setDivisions(divRes.divisions);
            setBlocks(blockRes.contentBlocks);
            if (!selectedDivision && divRes.divisions.length > 0) {
                setSelectedDivision(divRes.divisions[0].id);
            }
        } catch (e) {
            toast({ title: 'Load Error', description: 'Failed to fetch CMS data.', variant: 'destructive' });
        }
    }, [selectedDivision, toast]);

    useEffect(() => { loadData(); }, []);

    const selectBlock = (block: ContentBlock) => {
        if (isDirty) {
            if (!window.confirm('You have unsaved changes. Discard them?')) return;
        }
        setActiveBlock(block);
        setEditedPayload(JSON.parse(JSON.stringify(block.content_payload)));
        setIsDirty(false);
    };

    const handlePayloadChange = (newPayload: any) => {
        setEditedPayload(newPayload);
        setIsDirty(true);
    };

    const handleSave = async () => {
        if (!activeBlock || !isDirty) return;
        setIsSaving(true);
        try {
            await cmsApi.updateContentBlock(activeBlock.id, { content_payload: editedPayload });
            toast({ title: '✓ Saved as Draft', description: 'Changes staged for review.', variant: 'default' });
            setIsDirty(false);
            loadData();
        } catch {
            toast({ title: 'Save Failed', description: 'Could not update the block.', variant: 'destructive' });
        } finally {
            setIsSaving(false);
        }
    };

    const filteredBlocks = blocks.filter(b => b.division_id === selectedDivision);
    const ActiveEditor = activeBlock ? (EDITOR_MAP[activeBlock.block_type] ?? TextEditor) : null;

    return (
        <div className="space-y-8 max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
                <div>
                    <h1 className="text-4xl font-bold font-headline uppercase italic tracking-tighter text-slate-900">
                        Block Editor
                    </h1>
                    <p className="text-slate-400 text-sm mt-2 uppercase tracking-widest font-bold">
                        Visual CMS — No JSON required.
                    </p>
                </div>
                <Select value={selectedDivision} onValueChange={v => { setSelectedDivision(v); setActiveBlock(null); }}>
                    <SelectTrigger className="w-full md:w-[280px] border-slate-200 h-11">
                        <SelectValue placeholder="Select Division" />
                    </SelectTrigger>
                    <SelectContent>
                        {divisions.map(d => (
                            <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
                {/* Block List Sidebar */}
                <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 font-code mb-4 flex items-center gap-2">
                        <Layers className="w-3 h-3" /> Content Blocks ({filteredBlocks.length})
                    </p>
                    {filteredBlocks.length === 0 && (
                        <div className="p-6 border-2 border-dashed border-slate-200 rounded-xl text-center text-xs text-slate-400">
                            No blocks in this division.
                        </div>
                    )}
                    <div className="space-y-2">
                        {filteredBlocks.map(block => (
                            <motion.div
                                key={block.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <button
                                    onClick={() => selectBlock(block)}
                                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group ${activeBlock?.id === block.id
                                        ? 'border-primary bg-primary/5 text-primary shadow-sm'
                                        : 'border-slate-200 bg-white hover:border-primary/30 hover:bg-slate-50'
                                        }`}
                                >
                                    <div className="min-w-0">
                                        <p className="text-xs font-bold uppercase tracking-widest text-current truncate">
                                            {BLOCK_TYPE_LABELS[block.block_type] || block.block_type.toUpperCase()}
                                        </p>
                                        <p className="text-[10px] text-slate-400 truncate mt-0.5">
                                            {block.content_payload?.title || block.id}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0 ml-2">
                                        {block.published_at
                                            ? <CheckCircle className="w-3 h-3 text-emerald-500" aria-label="Published" />
                                            : <Clock className="w-3 h-3 text-amber-400" aria-label="Draft" />
                                        }
                                        <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-primary transition-colors" />
                                    </div>
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Editor Panel */}
                <AnimatePresence mode="wait">
                    {activeBlock && ActiveEditor ? (
                        <motion.div
                            key={activeBlock.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Card className="border-slate-200 professional-shadow overflow-hidden">
                                <CardHeader className="border-b border-slate-100 bg-slate-50/50 p-6 flex flex-row items-center justify-between">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <Badge className="bg-primary/10 text-primary border-primary/20 text-[9px] uppercase tracking-widest font-bold">
                                                {BLOCK_TYPE_LABELS[activeBlock.block_type] || activeBlock.block_type}
                                            </Badge>
                                            {isDirty && (
                                                <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 text-[9px] uppercase tracking-widest">
                                                    Unsaved
                                                </Badge>
                                            )}
                                        </div>
                                        <CardTitle className="text-lg font-bold text-slate-900">
                                            {activeBlock.content_payload?.title || 'Untitled Block'}
                                        </CardTitle>
                                        <CardDescription className="text-[10px] font-code mt-1">{activeBlock.id}</CardDescription>
                                    </div>
                                    <Button
                                        onClick={handleSave}
                                        disabled={!isDirty || isSaving}
                                        className="bg-primary hover:bg-primary/90 text-white h-10 px-6 font-bold uppercase tracking-widest text-[10px] disabled:opacity-40"
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        {isSaving ? 'Saving…' : 'Save Draft'}
                                    </Button>
                                </CardHeader>
                                <CardContent className="p-6 md:p-8">
                                    <ActiveEditor payload={editedPayload} onChange={handlePayloadChange} />
                                </CardContent>
                            </Card>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl p-16 text-center"
                        >
                            <Layers className="w-10 h-10 text-slate-200 mb-4" />
                            <h4 className="font-bold text-slate-400 uppercase tracking-widest text-sm">No Block Selected</h4>
                            <p className="text-xs text-slate-400 mt-2">Pick a block from the sidebar to start editing.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
