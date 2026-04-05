import { motion } from "motion/react";

export default function MiniArrayPreview() {
  const bars = [40, 70, 50, 90, 60];
  return (
    <div className="flex items-end gap-2 h-32 justify-center">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          animate={{ height: h }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", delay: i * 0.1 }}
          className="w-4 bg-lavender-light rounded-t-sm"
        />
      ))}
    </div>
  );
}
