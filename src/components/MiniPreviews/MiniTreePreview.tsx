import { motion } from "motion/react";

export default function MiniTreePreview() {
  return (
    <div className="relative h-32 w-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-8 h-8 rounded-full border-2 border-lavender-light flex items-center justify-center text-[10px]"
        >
          1
        </motion.div>
        <div className="flex gap-8">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="w-8 h-8 rounded-full border-2 border-lavender-light flex items-center justify-center text-[10px]"
          >
            2
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            className="w-8 h-8 rounded-full border-2 border-lavender-light flex items-center justify-center text-[10px]"
          >
            3
          </motion.div>
        </div>
      </div>
      {/* Simple lines */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-10 border-t-2 border-white/10 -z-10" />
    </div>
  );
}
