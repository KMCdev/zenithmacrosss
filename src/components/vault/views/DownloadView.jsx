import React from "react";
import { motion } from "framer-motion";
import { Download, Shield, Cpu, CheckCircle } from "lucide-react";

const DOWNLOAD_URL = "https://github.com/KMCdev/api.github.io/releases/download/v1/Netmacros.exe";

export default function DownloadView({ user, onRegisterClick }) {
  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Download</h1>
        <p className="text-white/50 text-sm">Get the latest version of Zenith Macros.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#13132b]/80 border border-white/5 rounded-2xl p-8"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-violet-600/20 border border-violet-500/20 flex items-center justify-center">
            <Download className="w-7 h-7 text-violet-400" />
          </div>
          <div>
            <h2 className="font-bold text-white text-lg">Netmacros.exe</h2>
            <p className="text-white/40 text-sm">Zenith Macros v1.0 · Windows</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/5 rounded-full px-3 py-1.5">
            <Shield className="w-3 h-3 text-violet-400" />
            <span className="text-white/50 text-xs">Safe & Verified</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/5 rounded-full px-3 py-1.5">
            <Cpu className="w-3 h-3 text-violet-400" />
            <span className="text-white/50 text-xs">Windows (.exe)</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/5 rounded-full px-3 py-1.5">
            <CheckCircle className="w-3 h-3 text-emerald-400" />
            <span className="text-white/50 text-xs">Free Forever</span>
          </div>
        </div>

        {user ? (
          <motion.a
            href={DOWNLOAD_URL}
            download
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-3 w-full py-4 bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm rounded-xl transition-colors"
          >
            <Download className="w-5 h-5" />
            Download Netmacros.exe
          </motion.a>
        ) : (
          <div>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-4">
              <p className="text-amber-400 text-sm font-semibold mb-1">Account required</p>
              <p className="text-white/40 text-xs">You need a Zenith account before downloading. It's free.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onRegisterClick}
              className="w-full py-4 bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm rounded-xl transition-colors"
            >
              Create Account to Download
            </motion.button>
          </div>
        )}

        <p className="text-center text-white/20 text-xs mt-4">v1.0 · Windows only · Free forever</p>
      </motion.div>
    </div>
  );
}