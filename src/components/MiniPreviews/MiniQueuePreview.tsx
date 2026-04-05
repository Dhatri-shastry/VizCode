import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

export default function MiniQueuePreview() {
  const [items, setItems] = useState([1, 2, 3]);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        const next = [...prev];
        next.shift();
        next.push((next[next.length - 1] || 0) + 1);
        return next;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 h-32 justify-center overflow-hidden w-48 mx-auto">
      <AnimatePresence mode="popLayout">
        {items.map((n) => (
          <motion.div
            key={n}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            className="w-10 h-10 bg-lavender-light rounded-sm flex items-center justify-center text-xs text-spotify-black font-bold shrink-0"
          >
            {n}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
