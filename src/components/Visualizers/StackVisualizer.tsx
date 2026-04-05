import { motion, AnimatePresence } from "motion/react";

interface StackVisualizerProps {
  items: any[];
  topIdx: number;
}

export default function StackVisualizer({ items, topIdx }: StackVisualizerProps) {
  return (
    <div className="flex flex-col items-center justify-end h-80 w-full p-8 bg-black/20 rounded-3xl border border-white/5 relative">
      {/* Stack Container */}
      <div className="w-48 border-x-2 border-b-2 border-white/10 rounded-b-2xl flex flex-col-reverse p-2 gap-2 min-h-[200px] bg-black/40">
        <AnimatePresence mode="popLayout">
          {items.map((item, idx) => (
            <motion.div
              key={`${idx}-${item}`}
              layout
              initial={{ y: -50, opacity: 0, scale: 0.8 }}
              animate={{ 
                y: 0, 
                opacity: 1, 
                scale: 1,
                borderColor: idx === topIdx ? "#B19CD9" : "#262626",
                backgroundColor: idx === topIdx ? "rgba(177, 156, 217, 0.2)" : "rgba(255, 255, 255, 0.05)",
                boxShadow: idx === topIdx ? "0 0 20px rgba(177, 156, 217, 0.3)" : "none"
              }}
              exit={{ x: 100, opacity: 0, scale: 0.8 }}
              className="h-12 w-full rounded-xl border-2 flex items-center justify-center text-white italic font-black relative group transition-all duration-500"
            >
              {item}
              {idx === topIdx && (
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="absolute -left-24 flex items-center gap-2"
                >
                  <span className="text-[10px] text-lavender font-black italic tracking-widest">TOP</span>
                  <div className="w-10 h-0.5 bg-lavender" />
                  <div className="w-2 h-2 border-t-2 border-r-2 border-lavender rotate-45 -ml-2" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Labels */}
      <div className="mt-6 text-gray-500 text-[10px] font-mono italic tracking-widest uppercase">Stack Container</div>
    </div>
  );
}
