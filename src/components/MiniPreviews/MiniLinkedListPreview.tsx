import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function MiniLinkedListPreview() {
  return (
    <div className="flex items-center gap-2 h-32 justify-center">
      {[1, 2, 3].map((n, i) => (
        <div key={i} className="flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
            className="w-10 h-10 rounded-full border-2 border-lavender-light flex items-center justify-center text-xs"
          >
            {n}
          </motion.div>
          {i < 2 && <ArrowRight className="w-4 h-4 text-gray-500" />}
        </div>
      ))}
    </div>
  );
}
