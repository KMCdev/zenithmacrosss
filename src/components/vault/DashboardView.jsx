import React from "react";
import { motion } from "framer-motion";
import { Lock, Download, MessageCircle, UserPlus } from "lucide-react";

export default function DashboardView({ user, onRegisterClick, onViewPricing, onDownload }) {
  return (
    <div className="p-6 md:p-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">
          {user ? `Welcome back, ${user.username}.` : "Welcome to Zenith Macros."}
        </h1>
        <p className="text-white/50 text-sm">Your Zenith Macros account at a glance.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { label: "PLAN", value: user ? "Free" : "—" },
          { label: "STATUS", value: user ? "Active" : "—" },
          { label: "TIME REMAINING", value: user ? "Lifetime" : "—" },
          { label: "PRICE", value: "$0" },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#13132b]/80 border border-white/5 rounded-xl p-4">
            <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2">{stat.label}</p>
            <p className="text-white font-semibold text-sm">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main card */}
      {user ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#13132b]/80 border border-violet-500/20 rounded-xl p-6 flex flex-col md:flex-row md:items-center gap-5"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-white mb-1">Account active — ready to download</p>
            <p className="text-white/50 text-sm">Your Zenith account is linked. Download the app anytime.</p>
          </div>
          <button
            onClick={onDownload}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors flex-shrink-0"
          >
            <Download className="w-4 h-4" />
            Download Now
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#13132b]/80 border border-white/5 rounded-xl p-6 flex flex-col md:flex-row md:items-center gap-5"
        >
          <div className="w-10 h-10 rounded-full bg-violet-600/20 flex items-center justify-center flex-shrink-0">
            <Lock className="w-5 h-5 text-violet-400" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-white mb-1">No account linked</p>
            <p className="text-white/50 text-sm">Create a free account to get started. Takes 30 seconds.</p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={onRegisterClick}
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              Create Account
            </button>
            <a
              href="https://discord.gg/knd5D932Dr"
              target="_blank"
              rel="noreferrer"
              className="border border-white/10 text-white/60 hover:text-white text-sm px-5 py-2.5 rounded-lg transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Discord
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
}