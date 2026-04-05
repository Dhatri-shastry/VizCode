import { motion } from "motion/react";

export default function MiniGraphPreview() {
  const nodes = [
    { x: 20, y: 20 },
    { x: 80, y: 50 },
    { x: 30, y: 80 },
  ];

  return (
    <div className="relative h-32 w-32 mx-auto">
      <svg className="absolute inset-0 w-full h-full">
        <motion.line
          x1="20%" y1="20%" x2="80%" y2="50%"
          stroke="rgba(255,255,255,0.1)" strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.line
          x1="80%" y1="50%" x2="30%" y2="80%"
          stroke="rgba(255,255,255,0.1)" strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
      </svg>
      {nodes.map((node, i) => (
        <motion.div
          key={i}
          className="absolute w-6 h-6 rounded-full bg-lavender-light"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}
    </div>
  );
}
