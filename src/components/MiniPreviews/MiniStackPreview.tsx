import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

export default function MiniStackPreview() {
  const [items, setItems] = useState([1, 2]);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => prev.length >= 4 ? [1, 2] : [...prev, prev.length + 1]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col-reverse items-center gap-2 h-32 justify-center border-b-2 border-x-2 border-white/20 w-24 mx-auto p-2">
      <AnimatePresence>
        {items.map((n) => (
          <motion.div
            key={n}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="w-full h-6 bg-lavender-light rounded-sm flex items-center justify-center text-[10px] text-spotify-black font-bold"
          >
            {n}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
