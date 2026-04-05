import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";

interface ArrayVisualizerProps {
  data: number[];
  highlights: number[];
  swapping: number[];
  comparing: number[];
}

export default function ArrayVisualizer({ data, highlights, swapping, comparing }: ArrayVisualizerProps) {
  const isDark = window.document.documentElement.classList.contains('dark');
  
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 min-h-64 w-full p-8 bg-slate-100/50 dark:bg-black/20 rounded-3xl border border-slate-200 dark:border-white/5 overflow-x-auto transition-colors duration-500">
      <AnimatePresence mode="popLayout">
        {data.map((val, idx) => (
          <div key={`${idx}-${val}`} className="flex items-center gap-2">
            <motion.div
              layout
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                borderColor: swapping.includes(idx) ? "#7C3AED" : 
                             comparing.includes(idx) ? "#B19CD9" : 
                             highlights.includes(idx) ? "#10b981" : (isDark ? "#262626" : "#e2e8f0"),
                backgroundColor: swapping.includes(idx) ? "rgba(124, 58, 237, 0.1)" : 
                                 comparing.includes(idx) ? "rgba(177, 156, 217, 0.1)" : 
                                 highlights.includes(idx) ? "rgba(16, 185, 129, 0.1)" : (isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(255, 255, 255, 0.8)"),
                boxShadow: swapping.includes(idx) ? "0 0 20px rgba(124, 58, 237, 0.2)" : "none"
              }}
              className="w-16 h-16 rounded-xl border-2 flex flex-col items-center justify-center relative group transition-all duration-500"
            >
              <span className={`text-lg font-black italic ${
                swapping.includes(idx) || comparing.includes(idx) || highlights.includes(idx) 
                  ? (isDark ? "text-white" : "text-dark-lavender") 
                  : (isDark ? "text-gray-400" : "text-slate-600")
              }`}>{val}</span>
              <div className="absolute -bottom-6 text-[10px] font-mono text-slate-400 dark:text-gray-500 italic">
                [{idx}]
              </div>
              
              {/* Pointer Arrows */}
              {comparing.includes(idx) && (
                <motion.div 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: -35, opacity: 1 }}
                  className="absolute top-0 text-dark-lavender dark:text-lavender flex flex-col items-center"
                >
                  <span className="text-[10px] font-black mb-1 italic">POINTER</span>
                  <div className="w-0.5 h-4 bg-dark-lavender dark:bg-lavender" />
                  <div className="w-2 h-2 border-b-2 border-r-2 border-dark-lavender dark:border-lavender rotate-45 -mt-1" />
                </motion.div>
              )}
            </motion.div>
            
            {idx < data.length - 1 && (
              <div className="w-4 h-0.5 bg-slate-200 dark:bg-white/5" />
            )}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
