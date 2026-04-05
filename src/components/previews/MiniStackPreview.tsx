import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export default function MiniStackPreview() {
  const [stack, setStack] = useState([10, 20]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStack(prev => {
        if (prev.length >= 4) return [10];
        return [...prev, (prev.length + 1) * 10];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col-reverse items-center justify-start gap-2 h-32 py-4">
      <AnimatePresence mode="popLayout">
        {stack.map((val, idx) => (
          <motion.div
            key={val}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="w-24 h-6 bg-dark-lavender/10 border border-dark-lavender/30 rounded-md flex items-center justify-center text-[10px] font-bold text-dark-lavender"
          >
            {val}
          </motion.div>
        ))}
      </AnimatePresence>
      <div className="w-32 h-2 bg-white/10 rounded-full mt-2" />
    </div>
  );
}
