import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Lock, CheckCircle, Loader2 } from "lucide-react";

const FIREBASE_URL = "https://zenithmacrosaccount-default-rtdb.firebaseio.com/users.json";

export default function RegisterModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.username || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }
    setLoading(true);
    try {
      // Fetch existing users to check for duplicates
      const checkRes = await fetch(FIREBASE_URL);
      const existing = await checkRes.json();
      if (existing) {
        const users = Object.values(existing);
        if (users.some((u) => u.email === form.email)) {
          setError("An account with this email already exists.");
          setLoading(false);
          return;
        }
        if (users.some((u) => u.username?.toLowerCase() === form.username.toLowerCase())) {
          setError("That username is already taken.");
          setLoading(false);
          return;
        }
      }

      const payload = {
        username: form.username,
        email: form.email,
        password: form.email + form.password,
        createdAt: Date.now(),
      };
      const res = await fetch(FIREBASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to register.");
      setDone(true);
      setTimeout(() => {
        onSuccess({ username: form.username, email: form.email });
      }, 1500);
    } catch (err) {
      if (!err.message.includes("exists") && !err.message.includes("taken")) {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.92, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 24, opacity: 0 }}
        transition={{ type: "spring", damping: 22, stiffness: 280 }}
        className="relative bg-[#13132b] border border-violet-500/20 rounded-2xl p-8 max-w-md w-full shadow-2xl shadow-violet-900/20"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 15 }}
              >
                <CheckCircle className="w-14 h-14 text-emerald-400 mx-auto mb-4" />
              </motion.div>
              <h2 className="text-xl font-bold text-white mb-2">Account Created!</h2>
              <p className="text-white/50 text-sm">Welcome to Zenith Macros.</p>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 1 }} animate={{ opacity: 1 }}>
              <div className="mb-6">
                <div className="w-12 h-12 rounded-xl bg-violet-600/20 border border-violet-500/20 flex items-center justify-center mb-4">
                  <User className="w-6 h-6 text-violet-400" />
                </div>
                <h2 className="text-xl font-bold text-white mb-1">Create your account</h2>
                <p className="text-white/40 text-sm">Free forever — takes 30 seconds.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-widest">Username</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="text"
                      value={form.username}
                      onChange={(e) => setForm({ ...form, username: e.target.value })}
                      placeholder="YourName"
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-widest">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-widest">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="password"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 transition-colors"
                    />
                  </div>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400 text-xs"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Account"}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}