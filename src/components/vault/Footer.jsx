import React from "react";

export default function Footer() {
  return (
    <footer id="legal" className="py-12 px-6 md:px-12 lg:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="font-heading font-bold text-lg text-[#F8FAFC] tracking-[-0.02em]">
            KINETIC VAULT
          </span>
        </div>

        <p className="font-mono text-[10px] text-[#94A3B8]/40">
          © {new Date().getFullYear()} KINETIC VAULT — ALL RIGHTS RESERVED
        </p>

        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[10px] text-[#94A3B8]/60">
            SYSTEM STATUS: ONLINE
          </span>
        </div>
      </div>
    </footer>
  );
}