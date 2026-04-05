import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function MiniLinkedListPreview() {
  const nodes = [1, 2, 3];
  return (
    <div className="flex items-center justify-center gap-4 h-32">
      {nodes.map((n, i) => (
        <div key={i} className="flex items-center gap-2">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              borderColor: ["#7C3AED", "#B19CD9", "#7C3AED"]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
            className="w-12 h-12 rounded-full border-2 border-dark-lavender flex items-center justify-center font-bold text-dark-lavender"
          >
            {n}
          </motion.div>
          {i < nodes.length - 1 && (
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
            >
              <ArrowRight className="text-dark-lavender w-6 h-6" />
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}
