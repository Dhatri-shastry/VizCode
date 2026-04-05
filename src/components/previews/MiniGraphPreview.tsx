import { motion } from "motion/react";

export default function MiniGraphPreview() {
  const nodes = [
    { x: 40, y: 40 },
    { x: 140, y: 40 },
    { x: 90, y: 100 },
  ];

  return (
    <div className="relative h-32 w-full flex items-center justify-center">
      <svg className="w-48 h-32">
        <motion.path
          d="M 40 40 L 140 40 L 90 100 Z"
          fill="none"
          stroke="#7C3AED"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        {nodes.map((node, i) => (
          <motion.circle
            key={i}
            cx={node.x}
            cy={node.y}
            r="8"
            fill="#B19CD9"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
      </svg>
    </div>
  );
}
