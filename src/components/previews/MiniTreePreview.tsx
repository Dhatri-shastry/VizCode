import { motion } from "motion/react";

export default function MiniTreePreview() {
  return (
    <div className="relative h-32 w-full flex items-center justify-center">
      <svg className="w-48 h-32">
        {/* Lines */}
        <motion.line x1="96" y1="20" x2="60" y2="60" stroke="#7C3AED" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
        <motion.line x1="96" y1="20" x2="132" y2="60" stroke="#7C3AED" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
        
        {/* Nodes */}
        <motion.circle cx="96" cy="20" r="10" fill="#7C3AED" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
        <motion.circle cx="60" cy="60" r="10" fill="#B19CD9" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
        <motion.circle cx="132" cy="60" r="10" fill="#B19CD9" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
      </svg>
    </div>
  );
}
