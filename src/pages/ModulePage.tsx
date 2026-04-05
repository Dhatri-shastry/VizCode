import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { motion } from "motion/react";
import Editor from "@monaco-editor/react";
import ArrayVisualizer from "../components/Visualizers/ArrayVisualizer";
import { Play, Eye, Send, List, ChevronRight } from "lucide-react";

export default function ModulePage() {
  const { moduleId } = useParams();
  const [code, setCode] = useState("");
  const [problems, setProblems] = useState<any[]>([]);
  const [selectedProblem, setSelectedProblem] = useState<any>(null);
  const [steps, setSteps] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    fetch("/api/problems")
      .then(res => res.json())
      .then(data => {
        setProblems(data);
        const initial = data.find((p: any) => p.category.toLowerCase().replace(" ", "-") === moduleId);
        setSelectedProblem(initial || data[0]);
        setCode(initial?.starterCode || data[0].starterCode);
      });
  }, [moduleId]);

  const handleRun = async () => {
    setIsRunning(true);
    const res = await fetch("/api/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, problemId: selectedProblem.id })
    });
    const data = await res.json();
    setSteps(data.steps);
    setCurrentStep(0);
    setIsRunning(false);
  };

  const handleVisualize = () => {
    if (steps.length === 0) return;
    let step = 0;
    const interval = setInterval(() => {
      setCurrentStep(step);
      step++;
      if (step >= steps.length) clearInterval(interval);
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-20 flex flex-col lg:flex-row overflow-hidden h-screen">
      {/* Left: Problem List */}
      <aside className="w-full lg:w-80 bg-spotify-gray border-r border-white/5 flex flex-col">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <List className="w-5 h-5 text-lavender-light" />
            Problems
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {problems.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setSelectedProblem(p);
                setCode(p.starterCode);
              }}
              className={`w-full text-left p-4 rounded-xl transition-all flex items-center justify-between group ${
                selectedProblem?.id === p.id ? "bg-lavender-light text-spotify-black" : "hover:bg-white/5"
              }`}
            >
              <div>
                <div className="font-bold text-sm">{p.title}</div>
                <div className={`text-[10px] font-bold uppercase ${
                  selectedProblem?.id === p.id ? "text-spotify-black/60" : "text-lavender-light"
                }`}>
                  {p.difficulty}
                </div>
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                selectedProblem?.id === p.id ? "text-spotify-black" : "text-gray-600"
              }`} />
            </button>
          ))}
        </div>
      </aside>

      {/* Center: Editor */}
      <main className="flex-1 flex flex-col border-r border-white/5">
        <div className="p-4 bg-spotify-gray/50 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="font-bold text-lavender-light">{selectedProblem?.title}</h3>
            <span className="text-xs text-gray-500">JavaScript</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg text-sm font-bold transition-all disabled:opacity-50"
            >
              <Play className="w-4 h-4 fill-current" />
              Run
            </button>
            <button
              onClick={handleVisualize}
              className="flex items-center gap-2 bg-lavender-light text-spotify-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-white transition-all"
            >
              <Eye className="w-4 h-4" />
              Visualize
            </button>
            <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg text-sm font-bold transition-all">
              <Send className="w-4 h-4" />
              Submit
            </button>
          </div>
        </div>
        <div className="flex-1">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={code}
            onChange={(val) => setCode(val || "")}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              padding: { top: 20 },
              backgroundColor: "#121212"
            }}
          />
        </div>
      </main>

      {/* Right: Visualization Panel */}
      <aside className="w-full lg:w-[500px] bg-spotify-gray flex flex-col">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Eye className="w-5 h-5 text-lavender-light" />
            Visualization
          </h2>
        </div>
        <div className="flex-1 p-8 overflow-y-auto space-y-8">
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Live View</h4>
            {selectedProblem?.category === "Array" && (
              <ArrayVisualizer 
                data={steps[currentStep]?.state?.nums || [2, 7, 11, 15]} 
                highlights={steps[currentStep]?.state?.indices || []}
              />
            )}
            {/* Add other visualizers here */}
          </div>

          <div className="bg-black/40 rounded-2xl border border-white/5 p-6">
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">State Inspector</h4>
            <pre className="text-xs font-mono text-lavender-light overflow-x-auto">
              {JSON.stringify(steps[currentStep]?.state || {}, null, 2)}
            </pre>
          </div>

          <div className="bg-black/40 rounded-2xl border border-white/5 p-6">
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Execution Log</h4>
            <div className="space-y-2">
              {steps.slice(0, currentStep + 1).map((step, i) => (
                <div key={i} className="text-xs text-gray-400 flex gap-4">
                  <span className="text-lavender-light font-bold">L{step.line}</span>
                  <span>State updated: {Object.keys(step.state).join(", ")}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
