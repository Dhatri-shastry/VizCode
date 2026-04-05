import React, { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Github, Mail } from "lucide-react";
import { auth, googleProvider, githubProvider, db, OperationType, handleFirestoreError } from "../firebase";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSocialLogin = async (provider: any) => {
    try {
      setLoading(true);
      setError(null);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Create user doc if it doesn't exist
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          solvedProblems: [],
          lastActive: Date.now()
        });
      }
      
      navigate('/dashboard');
    } catch (err: any) {
      console.error("Social login error:", err);
      if (err.code === 'auth/unauthorized-domain') {
        setError("This domain is not authorized. Please add the current URL to 'Authorized Domains' in your Firebase Console.");
      } else {
        setError(err.message || "An error occurred during social login.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const user = result.user;
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: user.email?.split('@')[0],
          solvedProblems: [],
          lastActive: Date.now()
        });
      }
      navigate('/dashboard');
    } catch (err: any) {
      console.error("Email auth error:", err);
      if (err.code === 'auth/email-already-in-use') {
        setError("This email is already in use. Please sign in instead.");
      } else if (err.code === 'auth/invalid-credential') {
        setError("Invalid email or password. Please try again.");
      } else {
        setError(err.message || "An error occurred during authentication.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-soft-lavender flex items-center justify-center p-6 font-sans italic transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[40px] p-10 shadow-2xl overflow-hidden border-2 border-slate-100"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black mb-2 text-slate-900">Viz<span className="text-dark-lavender">Code</span></h1>
          <p className="text-slate-500 font-medium italic">Think in logic. See every step.</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-red-50 border-2 border-red-100 text-red-600 p-4 rounded-2xl mb-6 text-sm font-bold italic text-center"
          >
            {error}
          </motion.div>
        )}

        <form className="space-y-6" onSubmit={handleEmailAuth}>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-2 italic">Email address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              className="w-full bg-white text-black border-2 border-gray-200 rounded-2xl px-6 py-4 focus:border-dark-lavender outline-none transition-all placeholder:text-gray-400 font-medium"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-2 italic">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-white text-black border-2 border-gray-200 rounded-2xl px-6 py-4 focus:border-dark-lavender outline-none transition-all placeholder:text-gray-400 font-medium"
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="w-full bg-dark-lavender text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-dark-lavender/20 mt-2 disabled:opacity-50 uppercase tracking-widest"
          >
            {loading ? "Processing..." : (isLogin ? "Sign In" : "Create Account")}
          </motion.button>
        </form>

        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-4 text-gray-400 font-black tracking-widest italic">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <button 
            onClick={() => handleSocialLogin(googleProvider)}
            disabled={loading}
            className="flex items-center justify-center gap-3 py-4 rounded-2xl border-2 border-gray-100 hover:border-dark-lavender hover:bg-gray-50 transition-all disabled:opacity-50 font-bold text-gray-700 italic"
          >
            <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" referrerPolicy="no-referrer" />
            Sign in with Google
          </button>
          <button 
            onClick={() => handleSocialLogin(githubProvider)}
            disabled={loading}
            className="flex items-center justify-center gap-3 py-4 rounded-2xl border-2 border-gray-100 hover:border-dark-lavender hover:bg-gray-50 transition-all disabled:opacity-50 font-bold text-gray-700 italic"
          >
            <Github className="w-5 h-5 text-black" />
            Sign in with GitHub
          </button>
        </div>

        <p className="text-center mt-10 text-gray-500 font-medium italic">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-dark-lavender font-black hover:underline"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
