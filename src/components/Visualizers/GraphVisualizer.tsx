import { motion } from "motion/react";

interface GraphNode {
  id: string;
  x: number;
  y: number;
  val: any;
}

interface GraphEdge {
  from: string;
  to: string;
}

interface GraphVisualizerProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  highlightedNodeIds: string[];
  highlightedEdgeIds: string[]; // e.g. "node1-node2"
}

export default function GraphVisualizer({ nodes, edges, highlightedNodeIds, highlightedEdgeIds }: GraphVisualizerProps) {
  return (
    <div className="h-80 w-full p-8 bg-black/20 rounded-3xl border border-white/5 flex flex-col items-center justify-center relative">
      <svg className="w-full h-full" viewBox="0 0 400 300">
        {/* Edges */}
        {edges.map((edge, i) => {
          const fromNode = nodes.find(n => n.id === edge.from);
          const toNode = nodes.find(n => n.id === edge.to);
          if (!fromNode || !toNode) return null;
          
          const edgeId = `${edge.from}-${edge.to}`;
          const isHighlighted = highlightedEdgeIds.includes(edgeId);

          return (
            <motion.line
              key={i}
              x1={fromNode.x} y1={fromNode.y} x2={toNode.x} y2={toNode.y}
              stroke={isHighlighted ? "#7C3AED" : "rgba(255, 255, 255, 0.1)"}
              strokeWidth={isHighlighted ? "2.5" : "1.5"}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.id}>
            <motion.circle
              cx={node.x} cy={node.y} r="18"
              fill={highlightedNodeIds.includes(node.id) ? "rgba(177, 156, 217, 0.3)" : "rgba(255, 255, 255, 0.05)"}
              stroke={highlightedNodeIds.includes(node.id) ? "#B19CD9" : "rgba(255, 255, 255, 0.1)"}
              strokeWidth="2"
              animate={{
                scale: highlightedNodeIds.includes(node.id) ? 1.1 : 1,
                boxShadow: highlightedNodeIds.includes(node.id) ? "0 0 20px rgba(177, 156, 217, 0.5)" : "none"
              }}
              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <text 
              x={node.x} y={node.y + 5} 
              textAnchor="middle" 
              fill="white" 
              className="text-[12px] font-black italic pointer-events-none"
            >
              {node.val}
            </text>
          </g>
        ))}
      </svg>
      <div className="absolute bottom-4 text-gray-500 text-[10px] font-mono italic tracking-widest uppercase">Graph Visualization</div>
    </div>
  );
}
