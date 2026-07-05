import React from "react";
import { Check, Lock, Star } from "lucide-react";

const PLANS = [
  {
    id: "free",
    label: "Free",
    price: "0",
    period: "forever",
    features: ["All macros & modules", "Full dashboard access", "Instant delivery"],
    locked: false,
    active: true,
  },
  {
    id: "monthly",
    label: "Monthly",
    price: "5",
    period: "per month",
    features: ["All macros & modules", "Priority support", "Early access"],
    locked: true,
    active: false,
  },
  {
    id: "lifetime",
    label: "Lifetime",
    price: "25",
    period: "one-time",
    features: ["Everything in Monthly", "Never pay again", "All future updates"],
    locked: true,
    active: false,
  },
];

export default function SubscriptionView() {
  return (
    <div className="p-6 md:p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Subscription</h1>
        <p className="text-white/50 text-sm">Your current plan and available upgrades.</p>
      </div>

      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-5 py-4 flex items-center gap-3 mb-8">
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
        <p className="text-emerald-400 text-sm font-semibold">You are on the Free Forever plan — full access included.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-2xl p-6 border flex flex-col ${
              plan.active
                ? "bg-[#1a1040] border-violet-500/40"
                : "bg-[#13132b]/80 border-white/5 opacity-50"
            }`}
          >
            {plan.active && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-widest px-3 py-1 rounded-full bg-violet-500 text-white flex items-center gap-1">
                <Star className="w-2.5 h-2.5" /> CURRENT
              </div>
            )}
            {plan.locked && <Lock className="absolute top-4 right-4 w-4 h-4 text-white/20" />}
            <h3 className="text-lg font-bold text-white mb-1">{plan.label}</h3>
            <div className="mb-4">
              <span className="text-4xl font-bold text-white">${plan.price}</span>
              <p className="text-white/40 text-xs mt-1">{plan.period}</p>
            </div>
            <ul className="space-y-2 flex-1 mb-5">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />
                  <span className="text-white/60 text-sm">{f}</span>
                </li>
              ))}
            </ul>
            <button
              disabled={plan.locked || plan.active}
              className={`w-full py-2.5 rounded-xl text-sm font-semibold ${
                plan.active
                  ? "bg-violet-600/40 text-violet-300 cursor-default"
                  : "bg-white/5 text-white/20 cursor-not-allowed"
              }`}
            >
              {plan.active ? "Active Plan" : plan.locked ? <span className="flex items-center justify-center gap-1"><Lock className="w-3 h-3" />Coming Soon</span> : "Select"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}