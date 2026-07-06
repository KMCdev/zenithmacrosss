import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Lock, CheckCircle, Loader2 } from "lucide-react";

const FIREBASE_URL = "https://zenithmacrosaccount-default-rtdb.firebaseio.com/users.json";

export default function RegisterModal({ onClose, onSuccess, defaultMode = "register" }) {
  const [mode, setMode] = useState(defaultMode); // "register" | "login"
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const switchMode = (m) => {
    setMode(m);
    setError("");
    setForm({ username: "", email: "", password: "" });
  };

  const handleRegister = async () => {
    if (!form.username || !form.email || !form.password) {
      setError("All fields are required.");
      return false;
    }
    const checkRes = await fetch(FIREBASE_URL);
    const existing = await checkRes.json();
    if (existing) {
      const users = Object.values(existing);
      if (users.some((u) => u.email === form.email)) {
        setError("An account with this email already exists.");
        return false;
      }
      if (users.some((u) => u.username?.toLowerCase() === form.username.toLowerCase())) {
        setError("That username is already taken.");
        return false;
      }
    }
    const res = await fetch(FIREBASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: form.username,
        email: form.email,
        password: form.email + form.password,
        createdAt: Date.now(),
      }),
    });
    if (!res.ok) throw new Error("Failed to register.");
    return { username: form.username, email: form.email };
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      setError("Email and password are required.");
      return false;
    }
    const checkRes = await fetch(FIREBASE_URL);
    const existing = await checkRes.json();
    if (!existing) {
      setError("No account found with that email.");
      return false;
    }
    const users = Object.values(existing);
    const match = users.find(
      (u) => u.email === form.email && u.password === form.email + form.password
    );
    if (!match) {
      setError("Incorrect email or password.");
      return false;
    }
    return { username: match.username, email: match.email };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = mode === "register" ? await handleRegister() : await handleLogin();
      if (!result) return;
      setDone(true);
      setTimeout(() => onSuccess(result), 1200);
    } catch {
      setError("Something went wrong. Please try again.");
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
        <button onClick={onClose} className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors">
          <X className="w-4 h-4" />
        </button>

        <AnimatePresence mode="wait">
          {done ? (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 15 }}>
                <CheckCircle className="w-14 h-14 text-emerald-400 mx-auto mb-4" />
              </motion.div>
              <h2 className="text-xl font-bold text-white mb-2">
                {mode === "register" ? "Account Created!" : "Welcome back!"}
              </h2>
              <p className="text-white/50 text-sm">Logging you in...</p>
            </motion.div>
          ) : (
            <motion.div key={mode} initial={{ opacity: 0, x: mode === "login" ? 20 : -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {/* Mode toggle */}
              <div className="flex bg-white/5 rounded-xl p-1 mb-6">
                <button
                  type="button"
                  onClick={() => switchMode("register")}
                  className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${mode === "register" ? "bg-violet-600 text-white" : "text-white/40 hover:text-white"}`}
                >
                  Create Account
                </button>
                <button
                  type="button"
                  onClick={() => switchMode("login")}
                  className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${mode === "login" ? "bg-violet-600 text-white" : "text-white/40 hover:text-white"}`}
                >
                  Sign In
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === "register" && (
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
                )}

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
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-400 text-xs">
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : mode === "register" ? "Create Account" : "Sign In"}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}