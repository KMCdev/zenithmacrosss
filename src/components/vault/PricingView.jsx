import React from "react";
import { motion } from "framer-motion";
import { Check, Lock, UserPlus } from "lucide-react";

const INCLUDED = [
  "All 5 macro categories",
  "Macro profiles system",
  "Focus Lock & Char Pause",
  "23+ precision modules",
  "Full dashboard access",
  "Triggerfon module",
  "Configurable keybinds & delays",
  "Discord community access",
];

const PLANS = [
  {
    id: "free",
    label: "Free",
    price: "0",
    period: "forever",
    sub: "Full access — free forever",
    features: ["All macros & modules", "Full dashboard access", "Instant delivery"],
    locked: false,
    highlight: false,
    badge: null,
  },
  {
    id: "monthly",
    label: "Monthly",
    price: "5",
    period: "per month",
    sub: "Full access — cancel anytime",
    features: ["All macros & modules", "Priority support", "Early access"],
    locked: true,
    highlight: true,
    badge: "MOST POPULAR",
  },
  {
    id: "lifetime",
    label: "Lifetime",
    price: "25",
    period: "one-time payment",
    sub: "Pay once — access forever",
    features: ["Everything in Monthly", "Never pay again", "All future updates"],
    locked: true,
    highlight: false,
    badge: "BEST VALUE",
  },
];

export default function PricingView({ user, onRegisterClick, onDownload }) {
  return (
    <div className="px-6 md:px-12 py-16 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <span className="inline-block text-xs font-semibold text-violet-400 border border-violet-500/30 bg-violet-500/10 px-3 py-1 rounded-full mb-5 tracking-widest uppercase">
          ✦ PRICING
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
          Simple pricing.<br />
          <span>Full access, </span>
          <span className="text-violet-400">every plan.</span>
        </h1>
        <p className="text-white/50 text-base max-w-lg mx-auto">
          No feature tiers. Every plan includes all modules, all categories, and dashboard access from day one.
        </p>
      </div>

      <div className="bg-[#13132b]/60 border border-white/5 rounded-2xl p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <p className="text-white/70 text-sm font-medium mb-3 md:mb-0">Everything included in every plan</p>
          <p className="text-white/30 text-xs">No credits. No hidden limits.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-4">
          {INCLUDED.map((f) => (
            <div key={f} className="flex items-center gap-2">
              <Check className="w-3 h-3 text-violet-400 flex-shrink-0" />
              <span className="text-white/60 text-xs">{f}</span>
            </div>
          ))}
        </div>
      </div>

      {!user && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-amber-500/10 border border-amber-500/20 rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3"
        >
          <div className="flex-1">
            <p className="text-amber-400 text-sm font-semibold">Create an account first</p>
            <p className="text-white/40 text-xs mt-0.5">Free and takes 30 seconds. Required before downloading.</p>
          </div>
          <button
            onClick={onRegisterClick}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold px-4 py-2 rounded-lg transition-colors flex-shrink-0"
          >
            <UserPlus className="w-4 h-4" />
            Create Account
          </button>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PLANS.map((plan, i) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`relative rounded-2xl p-6 flex flex-col border transition-all ${
              plan.highlight ? "bg-[#1a1040] border-violet-500/40" : "bg-[#13132b]/80 border-white/5"
            } ${plan.locked ? "opacity-50" : ""}`}
          >
            {plan.badge && (
              <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-widest px-3 py-1 rounded-full ${
                plan.highlight ? "bg-violet-500 text-white" : "bg-emerald-500 text-white"
              }`}>
                ✦ {plan.badge}
              </div>
            )}
            {plan.locked && <Lock className="absolute top-4 right-4 w-4 h-4 text-white/20" />}

            <div className="mb-5">
              <h3 className="text-xl font-bold text-white mb-1">{plan.label}</h3>
              <p className="text-white/40 text-xs">{plan.sub}</p>
            </div>
            <div className="mb-6">
              <span className="text-5xl font-bold text-white">${plan.price}</span>
              <p className="text-white/40 text-xs mt-1">{plan.period}</p>
            </div>
            <ul className="space-y-2.5 flex-1 mb-6">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5">
                  <Check className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />
                  <span className="text-white/60 text-sm">{f}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={!plan.locked ? (user ? onDownload : onRegisterClick) : undefined}
              disabled={plan.locked}
              className={`w-full py-3 rounded-xl text-sm font-semibold transition-colors disabled:cursor-not-allowed ${
                plan.locked
                  ? "bg-white/5 text-white/20"
                  : plan.highlight
                  ? "bg-violet-600 hover:bg-violet-500 text-white"
                  : "bg-white/10 hover:bg-white/15 text-white"
              }`}
            >
              {plan.locked ? (
                <span className="flex items-center justify-center gap-2">
                  <Lock className="w-3.5 h-3.5" /> Coming Soon
                </span>
              ) : user ? (
                "Download Now"
              ) : (
                "Create Account to Get"
              )}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}