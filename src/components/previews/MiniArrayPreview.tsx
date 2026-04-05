import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function MiniArrayPreview() {
  const [arr, setArr] = useState([40, 70, 30, 90, 50]);
  const [swapping, setSwapping] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const i = Math.floor(Math.random() * arr.length);
      const j = Math.floor(Math.random() * arr.length);
      if (i !== j) {
        setSwapping([i, j]);
        setTimeout(() => {
          setArr(prev => {
            const next = [...prev];
            [next[i], next[j]] = [next[j], next[i]];
            return next;
          });
          setSwapping([]);
        }, 500);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [arr]);

  return (
    <div className="flex items-end justify-center gap-2 h-32 px-4">
      {arr.map((val, idx) => (
        <motion.div
          key={idx}
          layout
          initial={{ height: 0 }}
          animate={{ 
            height: `${val}%`,
            backgroundColor: swapping.includes(idx) ? "#7C3AED" : "currentColor"
          }}
          className="w-4 rounded-t-sm shadow-lg text-dark-lavender/40 dark:text-lavender/20"
        />
      ))}
    </div>
  );
}
