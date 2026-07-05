import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, CheckCircle, Check } from "lucide-react";

const PLANS = [
  {
    id: "free",
    label: "Free",
    price: "$0",
    period: "forever",
    description: "Get started with Zenith Macros",
    features: [
      "Access to Zenith Macros app",
      "Full dashboard access",
      "Instant delivery",
      "Discord community access",
    ],
    locked: false,
    cta: "DOWNLOAD FREE",
  },
  {
    id: "monthly",
    label: "Monthly",
    price: "$5",
    period: "per month",
    description: "Full access — cancel anytime",
    features: [
      "All macros & modules",
      "Full dashboard access",
      "Instant delivery",
      "Cancel anytime",
    ],
    locked: true,
    cta: "GET MONTHLY",
    badge: null,
  },
  {
    id: "lifetime",
    label: "Lifetime",
    price: "$25",
    period: "one-time",
    description: "Pay once — access forever",
    features: [
      "Everything in Monthly",
      "Never pay again",
      "All future updates",
      "Priority support",
    ],
    locked: true,
    cta: "GET LIFETIME",
    badge: "BEST VALUE",
  },
];

export default function PaymentSection({ zenithComplete, onPaymentComplete }) {
  const [selected, setSelected] = useState("free");

  const handleContinue = () => {
    if (!zenithComplete || selected !== "free") return;
    onPaymentComplete();
  };

  return (
    <section className="py-32 px-6 md:px-12 lg:px-20 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FDBA74]/3 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-[#FDBA74] font-mono text-sm tracking-[0.2em] uppercase mb-4">
            // SECURE ACQUISITION
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#F8FAFC] tracking-[-0.04em]">
            Choose your plan.
          </h2>
          <p className="font-mono text-sm text-[#94A3B8] mt-3">
            Select Free to download now. Paid plans coming soon.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative glass-panel rounded-2xl p-6 transition-all ${
                plan.locked
                  ? "opacity-40 cursor-not-allowed"
                  : `cursor-pointer ${selected === plan.id ? "border-[#FDBA74]/60 ring-1 ring-[#FDBA74]/30" : "hover:border-white/20"}`
              }`}
              onClick={() => !plan.locked && setSelected(plan.id)}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FDBA74] text-[#0A0A0B] font-mono text-[9px] font-bold tracking-[0.15em] px-3 py-1 rounded-full">
                  {plan.badge}
                </div>
              )}

              {plan.locked && (
                <div className="absolute top-4 right-4">
                  <Lock className="w-4 h-4 text-[#94A3B8]/50" />
                </div>
              )}

              {!plan.locked && selected === plan.id && (
                <div className="absolute top-4 right-4">
                  <CheckCircle className="w-4 h-4 text-[#FDBA74]" />
                </div>
              )}

              <div className="mb-4">
                <p className="font-heading font-bold text-lg text-[#F8FAFC] mb-1">{plan.label}</p>
                <p className="font-mono text-xs text-[#94A3B8]">{plan.description}</p>
              </div>

              <div className="mb-5">
                <span className="font-heading font-bold text-3xl text-[#FDBA74]">{plan.price}</span>
                <span className="font-mono text-xs text-[#94A3B8] ml-2">{plan.period}</span>
              </div>

              <ul className="space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-[#FDBA74] flex-shrink-0" />
                    <span className="font-mono text-[11px] text-[#94A3B8]">{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="relative max-w-sm mx-auto">
          {!zenithComplete && (
            <div className="absolute inset-0 bg-[#0A0A0B]/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-3 rounded-xl">
              <Lock className="w-5 h-5 text-[#94A3B8]/50" />
              <p className="font-mono text-xs text-[#94A3B8]">Complete Step 1 first</p>
              <a href="#status" className="font-mono text-xs text-[#FDBA74] underline underline-offset-4">
                Go to verification ↑
              </a>
            </div>
          )}
          <motion.button
            onClick={handleContinue}
            disabled={!zenithComplete}
            className="w-full py-4 bg-[#FDBA74] text-[#0A0A0B] font-heading font-bold text-sm tracking-[0.15em] uppercase rounded-xl disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#FDBA74] focus:ring-offset-2 focus:ring-offset-[#0A0A0B] transition-all hover:bg-[#FCD9A8]"
            whileHover={zenithComplete ? { scale: 1.02 } : {}}
            whileTap={zenithComplete ? { scale: 0.98 } : {}}
          >
            DOWNLOAD FREE — ZENITH MACROS
          </motion.button>
        </div>
      </div>
    </section>
  );
}