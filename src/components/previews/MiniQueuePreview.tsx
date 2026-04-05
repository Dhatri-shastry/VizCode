import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export default function MiniQueuePreview() {
  const [queue, setQueue] = useState([1, 2, 3]);

  useEffect(() => {
    const interval = setInterval(() => {
      setQueue(prev => {
        const next = [...prev];
        if (next.length >= 5) next.shift();
        next.push((next[next.length - 1] || 0) + 1);
        return next;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center gap-2 h-32 overflow-hidden">
      <AnimatePresence mode="popLayout">
        {queue.map((val) => (
          <motion.div
            key={val}
            layout
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            className="w-12 h-12 bg-dark-lavender/10 border border-dark-lavender/30 rounded-xl flex items-center justify-center font-bold text-dark-lavender"
          >
            {val}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
