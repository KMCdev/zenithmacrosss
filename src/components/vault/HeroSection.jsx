const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, CheckCircle, Shield } from "lucide-react";

const HERO_IMAGE = "https://media.db.com/images/public/6a479ca749b4b3e0734dfc59/c0c2ecbd3_generated_01bd816e.png";

export default function HeroSection({ zenithComplete, onZenithClick }) {
  return (
    <section id="status" className="min-h-screen flex items-center relative overflow-hidden px-6 md:px-12 lg:px-20">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FDBA74]/5 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-500/5 rounded-full blur-[96px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 items-center py-24">
        {/* Left: App Visual (60%) */}
        <motion.div
          className="lg:col-span-3 relative"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src={HERO_IMAGE}
              alt="Abstract 3D digital rendering of crystallized geometric data blocks"
              className="w-full h-auto object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-transparent" />
          </div>
          <motion.div
            className="absolute -bottom-4 -right-4 glass-panel rounded-xl px-4 py-3 flex items-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
          >
            <Shield className="w-4 h-4 text-[#FDBA74]" />
            <span className="text-xs font-mono text-[#94A3B8]">VERIFIED_ASSET</span>
          </motion.div>
        </motion.div>

        {/* Right: Status Terminal (40%) */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="space-y-8">
            <div>
              <p className="text-[#FDBA74] font-mono text-sm tracking-[0.2em] uppercase mb-4">
                // ZENITH MACROS — SECURE DISTRIBUTION
              </p>
              <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-[#F8FAFC] leading-[1.05] tracking-[-0.04em]">
                Get Zenith<br />
                <span className="text-[#FDBA74]">Macros.</span>
              </h1>
            </div>

            <p className="text-[#94A3B8] font-mono text-sm leading-relaxed max-w-sm">
              Create a free Zenith account first, then download the app instantly. Two steps. Zero friction.
            </p>

            {/* Status indicators */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${zenithComplete ? "bg-emerald-400" : "bg-[#FDBA74] pulse-glow"}`} />
                <span className="font-mono text-xs text-[#94A3B8]">
                  STEP_01 — IDENTITY VERIFICATION {zenithComplete ? "✓ COMPLETE" : "PENDING"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${zenithComplete ? "bg-[#FDBA74]" : "bg-white/10"}`} />
                <span className="font-mono text-xs text-[#94A3B8]">
                  STEP_02 — SECURE ACQUISITION {zenithComplete ? "UNLOCKED" : "LOCKED"}
                </span>
              </div>
            </div>

            {/* CTA Button */}
            {!zenithComplete ? (
              <motion.button
                onClick={onZenithClick}
                className="group relative w-full py-5 px-8 bg-[#FDBA74] text-[#0A0A0B] font-heading font-bold text-sm tracking-[0.15em] uppercase rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#FDBA74] focus:ring-offset-2 focus:ring-offset-[#0A0A0B] transition-all hover:bg-[#FCD9A8]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  INITIATE IDENTITY HANDSHAKE
                  <ExternalLink className="w-4 h-4" />
                </span>
              </motion.button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full py-5 px-8 border border-emerald-400/30 bg-emerald-400/5 text-emerald-400 font-heading font-bold text-sm tracking-[0.15em] uppercase rounded-lg flex items-center justify-center gap-3"
              >
                <CheckCircle className="w-5 h-5" />
                IDENTITY VERIFIED
              </motion.div>
            )}

            <p className="text-[#94A3B8]/50 font-mono text-[10px]">
              PROTOCOL v2.4.1 — ENCRYPTED CHANNEL — ZERO-KNOWLEDGE
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}