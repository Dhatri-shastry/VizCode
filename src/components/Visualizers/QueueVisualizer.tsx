import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowDown } from "lucide-react";

interface QueueVisualizerProps {
  items: any[];
  frontIdx: number;
  rearIdx: number;
}

export default function QueueVisualizer({ items, frontIdx, rearIdx }: QueueVisualizerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-12 h-64 w-full p-8 bg-black/20 rounded-3xl border border-white/5 relative overflow-hidden">
      <div className="flex items-center gap-0 bg-black/40 rounded-2xl border-2 border-white/10 p-1 min-w-[300px] relative">
        <AnimatePresence mode="popLayout">
          {items.map((item, idx) => (
            <motion.div
              key={`${idx}-${item}`}
              layout
              initial={{ x: 50, opacity: 0, scale: 0.8 }}
              animate={{ 
                x: 0, 
                opacity: 1, 
                scale: 1,
                borderColor: idx === frontIdx ? "#4ade80" : 
                             idx === rearIdx ? "#B19CD9" : "#262626",
                backgroundColor: idx === frontIdx ? "rgba(74, 222, 128, 0.2)" : 
                                 idx === rearIdx ? "rgba(177, 156, 217, 0.2)" : "rgba(255, 255, 255, 0.05)",
                boxShadow: idx === frontIdx ? "0 0 20px rgba(74, 222, 128, 0.3)" : 
                           idx === rearIdx ? "0 0 20px rgba(177, 156, 217, 0.3)" : "none"
              }}
              exit={{ x: -100, opacity: 0, scale: 0.8 }}
              className="w-16 h-16 rounded-xl border-2 flex flex-col items-center justify-center font-black text-white italic relative transition-all duration-500"
            >
              {item}
              
              {idx === frontIdx && (
                <motion.div 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: -10, opacity: 1 }}
                  className="absolute -top-12 flex flex-col items-center"
                >
                  <span className="text-[10px] text-green-400 font-black italic uppercase tracking-widest">Front</span>
                  <div className="w-0.5 h-4 bg-green-400" />
                  <div className="w-2 h-2 border-b-2 border-r-2 border-green-400 rotate-45 -mt-1" />
                </motion.div>
              )}
              
              {idx === rearIdx && (
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 10, opacity: 1 }}
                  className="absolute -bottom-12 flex flex-col items-center"
                >
                  <div className="w-2 h-2 border-t-2 border-l-2 border-lavender rotate-45 -mb-1" />
                  <div className="w-0.5 h-4 bg-lavender" />
                  <span className="text-[10px] text-lavender font-black italic uppercase tracking-widest">Rear</span>
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Enqueue/Dequeue Indicators */}
        <div className="absolute -right-20 flex items-center gap-2">
          <ArrowLeft className="w-4 h-4 text-lavender animate-pulse" />
          <span className="text-[10px] text-lavender font-mono italic">ENQUEUE</span>
        </div>
        <div className="absolute -left-20 flex items-center gap-2">
          <span className="text-[10px] text-green-400 font-mono italic">DEQUEUE</span>
          <ArrowLeft className="w-4 h-4 text-green-400 animate-pulse rotate-180" />
        </div>
      </div>
      
      <div className="text-gray-500 text-[10px] font-mono italic tracking-widest uppercase">Queue Data Structure</div>
    </div>
  );
}
