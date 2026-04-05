import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, User } from "firebase/auth";

interface DSACardProps {
  id: string;
  title: string;
  description: string;
  animation: React.ReactNode;
}

export default function DSACard({ id, title, description, animation }: DSACardProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const handleVisualize = () => {
    if (user) {
      navigate(`/module/${id}`);
    } else {
      navigate('/auth');
    }
  };

  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="card-bg-custom rounded-[40px] p-10 border transition-all group hover:shadow-2xl hover:shadow-dark-lavender/10"
    >
      <div className="mb-10 bg-slate-100/50 dark:bg-black/40 rounded-3xl overflow-hidden py-10 flex items-center justify-center border border-slate-200 dark:border-white/5">
        {animation}
      </div>
      
      <h3 className="text-3xl font-black mb-4 text-slate-900 dark:text-white italic">{title}</h3>
      <p className="text-slate-500 dark:text-gray-400 mb-10 leading-relaxed text-lg italic">
        {description}
      </p>
      
      <button 
        onClick={handleVisualize}
        className="flex items-center gap-3 text-dark-lavender font-black text-lg group-hover:gap-5 transition-all italic"
      >
        Visualize Now <ArrowRight className="w-6 h-6" />
      </button>
    </motion.div>
  );
}
