import { motion } from "motion/react";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useState, useEffect } from "react";

export default function Hero() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);
  
  const planets = [
    { name: "Arrays", orbit: 220, duration: 30, delay: 0 },
    { name: "Stack", orbit: 300, duration: 45, delay: 15 },
    { name: "Queue", orbit: 380, duration: 60, delay: 30 },
    { name: "Trees", orbit: 460, duration: 75, delay: 45 },
    { name: "Graphs", orbit: 540, duration: 90, delay: 60 },
  ];

  const handleStart = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-soft-lavender dark:bg-black">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center w-full z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-dark-lavender/10 text-dark-lavender font-black text-xs uppercase tracking-widest mb-10 border border-dark-lavender/20">
            <div className="w-2 h-2 rounded-full bg-dark-lavender animate-pulse" />
            Interactive Learning Platform
          </div>
          
          <h1 className="text-7xl lg:text-[100px] font-black tracking-tighter mb-10 leading-[0.85] text-slate-900 dark:text-white">
            VizCode <br />
            <span className="text-dark-lavender">See the Logic</span>
          </h1>
          
          <p className="text-2xl text-slate-500 dark:text-gray-400 font-medium italic leading-relaxed max-w-xl mb-14">
            "Algorithms are the heartbeat of logic. Every line of code is a step towards mastering the art of efficient thinking."
          </p>
          
          <div className="flex flex-wrap gap-6">
            <motion.button 
              onClick={handleStart}
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(124,58,237,0.3)",
                  "0 0 40px rgba(124,58,237,0.5)",
                  "0 0 20px rgba(124,58,237,0.3)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="bg-dark-lavender text-white px-12 py-6 rounded-[24px] font-black text-xl flex items-center gap-4 shadow-2xl shadow-dark-lavender/40 hover:-translate-y-1 hover:shadow-dark-lavender/60 transition-all"
            >
              <Play className="w-7 h-7 fill-current" /> Start Visualizing
            </motion.button>
            <a 
              href="#modules"
              className="bg-white dark:bg-white/5 text-slate-900 dark:text-white px-12 py-6 rounded-[24px] font-black text-xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 hover:-translate-y-1 transition-all flex items-center justify-center"
            >
              Learn More
            </a>
          </div>
        </motion.div>

        <div className="relative h-[800px] flex items-center justify-center lg:justify-end [perspective:1000px]">
          <div className="relative w-full h-full flex items-center justify-center [transform:rotateX(20deg)]">
            {/* Sun */}
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 40px rgba(124,58,237,0.2)",
                  "0 0 80px rgba(124,58,237,0.4)",
                  "0 0 40px rgba(124,58,237,0.2)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute w-32 h-32 bg-gradient-to-br from-dark-lavender to-indigo-600 rounded-full flex items-center justify-center z-20 shadow-2xl [transform:rotateX(-20deg)]"
            >
              <span className="text-white font-black text-3xl tracking-widest uppercase">DSA</span>
            </motion.div>

            {/* Orbits & Planets */}
            {planets.map((planet) => (
              <div 
                key={planet.name} 
                className="orbit-line" 
                style={{ width: planet.orbit, height: planet.orbit }}
              >
                <motion.div
                  className="absolute w-full h-full"
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: planet.duration, 
                    repeat: Infinity, 
                    ease: "linear",
                    delay: -planet.delay
                  }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ 
                        duration: planet.duration, 
                        repeat: Infinity, 
                        ease: "linear",
                        delay: -planet.delay
                      }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="planet group flex-shrink-0 aspect-square [transform:rotateX(-20deg)]"
                      >
                        <span className="text-white text-[8px] font-black uppercase tracking-tighter text-center leading-none px-1">
                          {planet.name}
                        </span>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Background Decorative Elements */}
      <motion.div 
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-dark-lavender/5 rounded-full blur-[180px] -z-0" 
      />
      <motion.div 
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[150px] -z-0" 
      />
    </section>
  );
}
