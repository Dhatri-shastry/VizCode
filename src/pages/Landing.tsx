import { motion } from "motion/react";
import { Play } from "lucide-react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import DSACard from "../components/DSACard";
import MiniArrayPreview from "../components/previews/MiniArrayPreview";
import MiniLinkedListPreview from "../components/previews/MiniLinkedListPreview";
import MiniStackPreview from "../components/previews/MiniStackPreview";
import MiniQueuePreview from "../components/previews/MiniQueuePreview";
import MiniTreePreview from "../components/previews/MiniTreePreview";
import MiniGraphPreview from "../components/previews/MiniGraphPreview";

export default function Landing() {
  const dsaCards = [
    {
      id: "Array",
      title: "Array",
      description: "Linear data structure consisting of a collection of elements, each identified by at least one array index or key.",
      animation: <MiniArrayPreview />
    },
    {
      id: "Linked List",
      title: "Linked List",
      description: "Linear collection of data elements whose order is not given by their physical placement in memory.",
      animation: <MiniLinkedListPreview />
    },
    {
      id: "Stack",
      title: "Stack",
      description: "Abstract data type that serves as a collection of elements, with two main principal operations: push and pop.",
      animation: <MiniStackPreview />
    },
    {
      id: "Queue",
      title: "Queue",
      description: "Collection of entities that are maintained in a sequence and can be modified by the addition of entities at one end.",
      animation: <MiniQueuePreview />
    },
    {
      id: "Tree",
      title: "Tree",
      description: "Widely used abstract data type that represents a hierarchical structure with a set of connected nodes.",
      animation: <MiniTreePreview />
    },
    {
      id: "Graph",
      title: "Graph",
      description: "Abstract data type that is meant to implement the undirected graph and directed graph concepts from mathematics.",
      animation: <MiniGraphPreview />
    }
  ];

  return (
    <div className="min-h-screen transition-colors duration-500">
      <Navbar />
      <Hero />
      
      <section id="modules" className="max-w-7xl mx-auto px-6 py-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-32"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-dark-lavender/10 text-dark-lavender font-bold text-xs uppercase tracking-widest mb-6">
            Core Modules
          </div>
          <h2 className="text-5xl lg:text-7xl font-black mb-8 text-slate-900 dark:text-white tracking-tighter">
            Master the <span className="text-dark-lavender">Fundamentals</span>
          </h2>
          <p className="text-xl text-slate-500 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Interactive visualizations for every core data structure. 
            Understand the logic, not just the syntax. Watch how data moves and changes in real-time.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {dsaCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <DSACard {...card} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Feature Section */}
      <section className="bg-slate-50 dark:bg-white/5 py-40 border-y border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-black mb-8 text-slate-900 dark:text-white tracking-tight">
              Real-time <br />
              <span className="text-dark-lavender">Code Analysis</span>
            </h2>
            <p className="text-xl text-slate-500 dark:text-gray-400 mb-10 leading-relaxed">
              Every step of your code is mapped to its visual representation. 
              Debug with clarity and see exactly how your algorithms perform.
            </p>
            <ul className="space-y-4">
              {['Step-by-step execution', 'Line-by-line highlighting', 'State change tracking', 'Complexity analysis'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-700 dark:text-gray-300 font-bold">
                  <div className="w-6 h-6 rounded-full bg-dark-lavender/20 flex items-center justify-center text-dark-lavender">
                    ✓
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <div className="glass rounded-[40px] p-8 aspect-video flex items-center justify-center overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-dark-lavender/20 to-transparent" />
            <div className="relative z-10 text-center">
              <div className="w-20 h-20 bg-dark-lavender rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-dark-lavender/40">
                <Play className="w-8 h-8 text-white fill-current" />
              </div>
              <p className="text-dark-lavender font-black text-xl uppercase tracking-widest">Live Demo</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 text-center border-t border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center gap-3 mb-8">
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-8 h-8 bg-dark-lavender rounded-lg" 
            />
            <span className="text-2xl font-black text-slate-900 dark:text-white">VizCode</span>
          </div>
          <p className="text-slate-500 dark:text-gray-500 mb-8">© 2026 VizCode. Built for the next generation of engineers.</p>
          <div className="flex justify-center gap-8">
            {['Twitter', 'GitHub', 'Discord'].map(item => (
              <a key={item} href="#" className="text-slate-400 hover:text-dark-lavender font-bold transition-colors italic">{item}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
