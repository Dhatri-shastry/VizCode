import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { LogOut, Moon, Sun, Target } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(auth.currentUser);
  // Default to light theme if not set
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : false;
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    window.dispatchEvent(new Event('themechange'));
  }, [isDark]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const navItems = ['Algorithms', 'Data Structures', 'Complexity'];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-soft-lavender/80 dark:bg-black/80 backdrop-blur-lg border-b border-dark-lavender/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-10 h-10 bg-dark-lavender rounded-xl flex items-center justify-center shadow-lg shadow-dark-lavender/30"
          >
            <Target className="text-white w-6 h-6" />
          </motion.div>
          <span className="text-slate-900 dark:text-white font-black text-2xl tracking-tight">
            Viz<span className="text-dark-lavender">Code</span>
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link 
              key={item} 
              to={user ? "/dashboard" : "/auth"} 
              className="relative text-slate-600 dark:text-gray-400 hover:text-dark-lavender dark:hover:text-white transition-colors font-bold text-sm tracking-wide group"
            >
              {item}
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-dark-lavender rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-all text-slate-600 dark:text-gray-400"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {user.photoURL ? (
                  <img src={user.photoURL} className="w-10 h-10 rounded-full border-2 border-dark-lavender/20" alt="Profile" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-dark-lavender flex items-center justify-center text-white font-black text-sm">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <button 
                onClick={handleLogout}
                className="p-2.5 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl text-slate-400 hover:text-red-500 transition-all"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link to="/auth">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-dark-lavender text-white px-8 py-3 rounded-xl font-black text-sm shadow-lg shadow-dark-lavender/30 hover:shadow-dark-lavender/50 transition-all"
              >
                Start Now
              </motion.button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
