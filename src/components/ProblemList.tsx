import { motion } from "motion/react";
import { CheckCircle2, Circle } from "lucide-react";
import { Problem } from "../types";

interface ProblemListProps {
  problems: Problem[];
  currentProblemId: string;
  solvedIds: string[];
  onSelect: (id: string) => void;
}

export default function ProblemList({ problems, currentProblemId, solvedIds, onSelect }: ProblemListProps) {
  return (
    <div className="w-80 border-r border-slate-200 dark:border-white/5 h-full overflow-y-auto bg-white/40 dark:bg-black/40 backdrop-blur-md italic transition-colors duration-500">
      <div className="p-6 border-b border-slate-200 dark:border-white/5">
        <h2 className="text-xl italic font-black text-slate-900 dark:text-white uppercase tracking-widest">Problems</h2>
      </div>
      <div className="p-4 space-y-2">
        {problems.map((p) => (
          <button
            key={p.id}
            onClick={() => onSelect(p.id)}
            className={`w-full text-left p-4 rounded-2xl transition-all group border-2 ${
              currentProblemId === p.id 
                ? "bg-dark-lavender/10 border-dark-lavender/30 dark:bg-lavender/10 dark:border-lavender/20" 
                : "hover:bg-slate-100 dark:hover:bg-white/5 border-transparent"
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <span className={`text-[10px] italic px-2 py-0.5 rounded-full uppercase tracking-widest font-black ${
                p.difficulty === 'Easy' ? 'bg-green-500/10 text-green-600 dark:text-green-500' :
                p.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-500' :
                'bg-red-500/10 text-red-600 dark:text-red-500'
              }`}>
                {p.difficulty}
              </span>
              {solvedIds.includes(p.id) ? (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              ) : (
                <Circle className="w-4 h-4 text-slate-300 dark:text-gray-600" />
              )}
            </div>
            <h3 className={`italic text-sm font-bold ${currentProblemId === p.id ? 'text-dark-lavender dark:text-lavender' : 'text-slate-600 dark:text-gray-300'}`}>
              {p.title}
            </h3>
          </button>
        ))}
      </div>
    </div>
  );
}
