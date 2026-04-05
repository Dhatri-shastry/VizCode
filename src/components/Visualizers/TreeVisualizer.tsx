import { motion } from "motion/react";

interface TreeNode {
  id: string;
  val: any;
  left?: TreeNode;
  right?: TreeNode;
}

interface TreeVisualizerProps {
  root: TreeNode | null;
  highlightedIds: string[];
}

export default function TreeVisualizer({ root, highlightedIds }: TreeVisualizerProps) {
  const renderNode = (node: TreeNode | undefined, x: number, y: number, offset: number) => {
    if (!node) return null;

    return (
      <g key={node.id}>
        {/* Lines to children */}
        {node.left && (
          <motion.line
            x1={x} y1={y} x2={x - offset} y2={y + 60}
            stroke="rgba(124, 58, 237, 0.3)" strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
          />
        )}
        {node.right && (
          <motion.line
            x1={x} y1={y} x2={x + offset} y2={y + 60}
            stroke="rgba(124, 58, 237, 0.3)" strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
          />
        )}

        {/* Node Circle */}
        <motion.circle
          cx={x} cy={y} r="20"
          fill={highlightedIds.includes(node.id) ? "rgba(177, 156, 217, 0.3)" : "rgba(255, 255, 255, 0.05)"}
          stroke={highlightedIds.includes(node.id) ? "#B19CD9" : "rgba(255, 255, 255, 0.1)"}
          strokeWidth="2"
          animate={{
            scale: highlightedIds.includes(node.id) ? 1.1 : 1,
            boxShadow: highlightedIds.includes(node.id) ? "0 0 20px rgba(177, 156, 217, 0.5)" : "none"
          }}
          whileHover={{ scale: 1.15 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        <text 
          x={x} y={y + 5} 
          textAnchor="middle" 
          fill="white" 
          className="text-[12px] font-black italic pointer-events-none"
        >
          {node.val}
        </text>

        {/* Recursive children */}
        {renderNode(node.left, x - offset, y + 60, offset / 1.8)}
        {renderNode(node.right, x + offset, y + 60, offset / 1.8)}
      </g>
    );
  };

  return (
    <div className="h-80 w-full p-8 bg-black/20 rounded-3xl border border-white/5 flex flex-col items-center justify-center relative">
      <svg className="w-full h-full" viewBox="0 0 400 300">
        {root && renderNode(root, 200, 40, 100)}
      </svg>
      <div className="absolute bottom-4 text-gray-500 text-[10px] font-mono italic tracking-widest uppercase">Binary Tree Visualization</div>
    </div>
  );
}
