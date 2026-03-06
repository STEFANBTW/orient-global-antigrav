
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, RefreshCw, CheckCircle2 } from "lucide-react";
import { detectAnomaly, type AIAnomalyAlertsInput, type AIAnomalyAlertsOutput } from "@/ai/flows/ai-anomaly-alerts";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

interface AnomalyDetectorProps {
  metrics: AIAnomalyAlertsInput;
}

export function AnomalyDetector({ metrics }: AnomalyDetectorProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIAnomalyAlertsOutput | null>(null);

  const runDetection = async () => {
    setLoading(true);
    try {
      const output = await detectAnomaly(metrics);
      setResult(output);
    } catch (error) {
      console.error("Anomaly detection failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <AnimatePresence mode="wait">
        {result?.isAnomalyDetected && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex items-center gap-2"
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className={`px-3 py-1.5 rounded-md border flex items-center gap-2 cursor-help ${
                    result.severity === 'critical' ? 'bg-red-500/10 border-red-500/50 text-red-500' :
                    result.severity === 'high' ? 'bg-orange-500/10 border-orange-500/50 text-orange-500' :
                    'bg-yellow-500/10 border-yellow-500/50 text-yellow-500'
                  }`}>
                    <ShieldAlert className="w-4 h-4 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      {result.severity} Anomaly Detected
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-[300px] bg-slate-900 border-white/10 p-4">
                  <p className="text-xs text-white leading-relaxed">{result.anomalyDescription}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        variant="outline"
        size="sm"
        onClick={runDetection}
        disabled={loading}
        className="bg-slate-900 border-white/5 text-muted-foreground hover:bg-slate-800 hover:text-white transition-all gap-2"
      >
        {loading ? (
          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
        ) : result ? (
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
        ) : (
          <ShieldAlert className="w-3.5 h-3.5" />
        )}
        <span className="text-xs">Scan for Anomalies</span>
      </Button>
    </div>
  );
}
