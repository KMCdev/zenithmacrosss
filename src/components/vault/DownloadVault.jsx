import React from "react";
import { motion } from "framer-motion";
import { Download, CheckCircle, X, Shield, Cpu } from "lucide-react";

const DOWNLOAD_URL = "https://github.com/KMCdev/api.github.io/releases/download/v1/Netmacros.exe";

export default function DownloadVault({ visible, onClose }) {
  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 22 }}
        className="relative bg-[#13132b] border border-violet-500/20 rounded-2xl p-8 max-w-md w-full"
      >
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Icon */}
        <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-violet-600/20 border border-violet-500/20 flex items-center justify-center">
          <Download className="w-7 h-7 text-violet-400" />
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-widest">Verified</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Ready to Download</h2>
          <p className="text-white/50 text-sm">Zenith Macros — Netmacros.exe</p>
        </div>

        {/* Info pills */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/5 rounded-full px-3 py-1.5">
            <Shield className="w-3 h-3 text-violet-400" />
            <span className="text-white/50 text-xs">Safe & Verified</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/5 rounded-full px-3 py-1.5">
            <Cpu className="w-3 h-3 text-violet-400" />
            <span className="text-white/50 text-xs">Windows (.exe)</span>
          </div>
        </div>

        {/* Download button */}
        <a
          href={DOWNLOAD_URL}
          download
          className="flex items-center justify-center gap-3 w-full py-4 bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm rounded-xl transition-colors"
        >
          <Download className="w-5 h-5" />
          Download Netmacros.exe
        </a>

        <p className="text-center text-white/20 text-xs mt-4">
          v1.0 · Windows only · Free forever
        </p>
      </motion.div>
    </motion.div>
  );
}