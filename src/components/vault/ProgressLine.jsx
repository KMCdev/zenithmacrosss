import React from "react";
import { motion } from "framer-motion";

export default function ProgressLine({ step }) {
  const progress = step === 0 ? 0 : step === 1 ? 50 : 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-white/5">
      <motion.div
        className="h-full bg-[#FDBA74]"
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      <div className="absolute top-0 left-0 right-0 h-full overflow-hidden">
        <motion.div
          className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{ x: ["-100%", "400%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
}