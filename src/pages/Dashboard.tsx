import { motion } from "motion/react";
import Navbar from "../components/Navbar";
import DSACard from "../components/DSACard";
import MiniArrayPreview from "../components/previews/MiniArrayPreview";
import MiniLinkedListPreview from "../components/previews/MiniLinkedListPreview";
import MiniStackPreview from "../components/previews/MiniStackPreview";
import MiniQueuePreview from "../components/previews/MiniQueuePreview";
import MiniTreePreview from "../components/previews/MiniTreePreview";
import MiniGraphPreview from "../components/previews/MiniGraphPreview";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default function Dashboard() {
  const [solvedCount, setSolvedCount] = useState(0);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;
    const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (doc) => {
      if (doc.exists()) {
        setSolvedCount(doc.data().solvedProblems?.length || 0);
      }
    });
    return () => unsubscribe();
  }, [user]);

  const modules = [
    { id: 'array', title: "Array", description: "Master sorting, searching, and two-pointer techniques.", animation: <MiniArrayPreview /> },
    { id: 'linked-list', title: "Linked List", description: "Understand pointers, traversal, and cycle detection.", animation: <MiniLinkedListPreview /> },
    { id: 'stack', title: "Stack", description: "Learn LIFO principles and expression evaluation.", animation: <MiniStackPreview /> },
    { id: 'queue', title: "Queue", description: "Explore FIFO, circular buffers, and task scheduling.", animation: <MiniQueuePreview /> },
    { id: 'tree', title: "Trees", description: "Visualize binary trees, BSTs, and traversals.", animation: <MiniTreePreview /> },
    { id: 'graph', title: "Graphs", description: "Master BFS, DFS, and shortest path algorithms.", animation: <MiniGraphPreview /> },
  ];

  return (
    <div className="min-h-screen bg-soft-lavender dark:bg-black pt-32 pb-20 transition-colors duration-500">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-black mb-4 text-slate-900 dark:text-white"
            >
              Viz<span className="text-dark-lavender">Code</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl text-slate-500 dark:text-gray-400 font-medium italic"
            >
              Think in logic. See every step.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass p-6 rounded-[32px] flex items-center gap-6 border-slate-200 dark:border-white/10"
          >
            <div className="text-center">
              <div className="text-3xl font-black text-dark-lavender dark:text-lavender">{solvedCount}</div>
              <div className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-gray-500 font-black italic">Solved</div>
            </div>
            <div className="w-px h-10 bg-slate-200 dark:bg-white/10" />
            <div className="text-center">
              <div className="text-3xl font-black text-slate-900 dark:text-white">0</div>
              <div className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-gray-500 font-black italic">Streak</div>
            </div>
          </motion.div>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module, i) => (
            <Link key={module.id} to={`/module/${module.id}`}>
              <DSACard {...module} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
