import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Box, HelpCircle, FileText } from "lucide-react";

const DOCK_ITEMS = [
  { icon: Activity, label: "Status", href: "#status" },
  { icon: Box, label: "The App", href: "#app" },
  { icon: HelpCircle, label: "Support", href: "mailto:support@kineticvault.io" },
  { icon: FileText, label: "Legal", href: "#legal" },
];

export default function FloatingDock() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      {/* Hover trigger zone */}
      <div
        className="fixed bottom-0 left-0 right-0 h-20 z-50"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        <AnimatePresence>
          {visible && (
            <motion.nav
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 glass-panel rounded-2xl px-2 py-2 flex items-center gap-1"
            >
              {DOCK_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex flex-col items-center gap-1 px-4 py-2 rounded-xl hover:bg-white/5 transition-colors focus:outline-none focus:ring-1 focus:ring-[#FDBA74]"
                >
                  <item.icon className="w-5 h-5 text-[#94A3B8] group-hover:text-[#FDBA74] transition-colors" />
                  <span className="font-mono text-[10px] text-[#94A3B8] group-hover:text-[#F8FAFC] transition-colors">
                    {item.label}
                  </span>
                </a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile: always visible bottom bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-white/5 px-2 py-2 flex items-center justify-around">
        {DOCK_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex flex-col items-center gap-1 px-3 py-1.5"
          >
            <item.icon className="w-4 h-4 text-[#94A3B8]" />
            <span className="font-mono text-[9px] text-[#94A3B8]">{item.label}</span>
          </a>
        ))}
      </nav>
    </>
  );
}