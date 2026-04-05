import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";

interface Node {
  id: string;
  val: any;
  next: string | null;
}

interface LinkedListVisualizerProps {
  nodes: Node[];
  currentId: string | null;
  highlightedIds: string[];
}

export default function LinkedListVisualizer({ nodes, currentId, highlightedIds }: LinkedListVisualizerProps) {
  const isDark = window.document.documentElement.classList.contains('dark');
  
  return (
    <div className="flex items-center justify-center gap-8 h-64 w-full p-8 bg-slate-100/50 dark:bg-black/20 rounded-3xl border border-slate-200 dark:border-white/5 overflow-x-auto transition-colors duration-500">
      <AnimatePresence mode="popLayout">
        {nodes.map((node, idx) => (
          <div key={node.id} className="flex items-center gap-0">
            <motion.div
              layout
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                borderColor: currentId === node.id ? "#7C3AED" : 
                             highlightedIds.includes(node.id) ? "#10b981" : (isDark ? "#262626" : "#e2e8f0"),
                boxShadow: currentId === node.id ? "0 0 20px rgba(124, 58, 237, 0.2)" : "none"
              }}
              className="flex rounded-xl border-2 overflow-hidden bg-white dark:bg-black/40 transition-all duration-500"
            >
              <div className={`w-12 h-12 flex items-center justify-center border-r-2 border-inherit ${
                currentId === node.id ? "bg-dark-lavender/10 dark:bg-lavender/20" : ""
              }`}>
                <span className={`text-lg font-black italic ${isDark ? "text-white" : "text-slate-900"}`}>{node.val}</span>
              </div>
              <div className="w-8 h-12 flex items-center justify-center bg-slate-50 dark:bg-white/5">
                <div className={`w-2 h-2 rounded-full ${currentId === node.id ? (isDark ? "bg-white animate-pulse" : "bg-dark-lavender animate-pulse") : "bg-dark-lavender"}`} />
              </div>
            </motion.div>
            
            {node.next ? (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                className="flex items-center"
              >
                <div className="w-12 h-0.5 bg-dark-lavender" />
                <div className="w-3 h-3 border-t-2 border-r-2 border-dark-lavender rotate-45 -ml-3" />
              </motion.div>
            ) : (
              <div className="flex items-center">
                <div className="w-12 h-0.5 bg-red-500/30" />
                <span className="text-[10px] font-black text-red-500/50 italic ml-2 tracking-widest">NULL</span>
              </div>
            )}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
