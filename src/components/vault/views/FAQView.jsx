import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Is Zenith Macros free?",
    a: "Yes. The Free Forever plan gives you full access to all 23+ modules and all 5 macro categories with no time limit.",
  },
  {
    q: "What games does Zenith Macros support?",
    a: "Zenith Macros is designed to work with a wide range of FPS and action games. Check our Discord for the full compatibility list.",
  },
  {
    q: "Is it safe to use?",
    a: "Zenith Macros is built with user safety in mind. All downloads are verified and integrity-checked before distribution.",
  },
  {
    q: "How do I get support?",
    a: "Join our Discord server at discord.gg/knd5D932Dr and open a support ticket. Our team typically responds within a few hours.",
  },
  {
    q: "Will there be future updates?",
    a: "Yes. Lifetime plan holders get all future updates for free. Free plan holders receive core updates.",
  },
];

export default function FAQView() {
  const [open, setOpen] = useState(null);

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">FAQ</h1>
        <p className="text-white/50 text-sm">Common questions answered.</p>
      </div>

      <div className="space-y-2">
        {FAQS.map((faq, i) => (
          <div key={i} className="bg-[#13132b]/80 border border-white/5 rounded-xl overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <span className="text-white text-sm font-medium">{faq.q}</span>
              <ChevronDown
                className={`w-4 h-4 text-white/30 flex-shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`}
              />
            </button>
            {open === i && (
              <div className="px-5 pb-4 text-white/50 text-sm leading-relaxed border-t border-white/5 pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}