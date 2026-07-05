import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TABS = [
  {
    name: "Crystal",
    count: 11,
    desc: "End crystal PvP automation",
    macros: [
      {
        abbr: "SA", name: "Single Anchor", desc: "Place, charge, and explode one anchor",
        keys: [{ label: "Activate Key", value: "R" }, { label: "Anchor key", value: "4" }, { label: "Glowstone key", value: "5" }, { label: "Totem key", value: "Z" }],
        actions: ["PLACE", "CHARGE", "EXPLODE"],
      },
      {
        abbr: "SFA", name: "Safe Anchor", desc: "Place, charge, flick down, place glowstone, sw...",
        keys: [{ label: "Activate Key", value: "R" }, { label: "Mode", value: "Classic" }, { label: "Anchor key", value: "4" }, { label: "Glowstone key", value: "5" }, { label: "Totem key", value: "9" }],
        actions: ["PLACE", "CHARGE", "FLICK", "GLOW"],
      },
      {
        abbr: "AP", name: "Airplace", desc: "Loop place, charge, and explode anchors sequentially",
        keys: [{ label: "Activate Key", value: "G" }, { label: "Anchor key", value: "4" }, { label: "Glowstone key", value: "5" }, { label: "Totem key", value: "9" }, { label: "Sequence Runs", value: "2" }],
        actions: ["LOOP PLACE", "LOOP CHARGE", "LOOP DETONATE"],
      },
      {
        abbr: "DA", name: "Double Anchor", desc: "Place, charge, and explode two anchors in sequence",
        keys: [{ label: "Activate Key", value: "G" }, { label: "Anchor key", value: "4" }, { label: "Glowstone key", value: "5" }, { label: "Totem key", value: "9" }],
        actions: ["DBL PLACE", "DBL CHARGE", "DBL DETONATE"],
      },
      {
        abbr: "AP", name: "Anchor Pearl", desc: "Anchor sequence followed by instant pearl launch",
        keys: [{ label: "Activate Key", value: "Y" }, { label: "Anchor key", value: "4" }, { label: "Glowstone key", value: "5" }, { label: "Pearl key", value: "6" }, { label: "Totem key", value: "9" }],
        actions: ["ANCHOR", "PEARL", "ESCAPE"],
      },
      {
        abbr: "HC", name: "Hit Crystal", desc: "Obsidian block placement, crystal drop, and sword swipe",
        keys: [{ label: "Activate Key", value: "U" }, { label: "Obsidian key", value: "2" }, { label: "Crystal key", value: "3" }, { label: "Sword key", value: "1" }],
        actions: ["OBSIDIAN", "CRYSTAL", "SWORD"],
      },
    ],
  },
  {
    name: "Sword",
    count: 5,
    desc: "Sword PvP consistency modules",
    macros: [
      {
        abbr: "ASB", name: "Shield Stun", desc: "Double-click timing to force a reliable shield stun",
        keys: [{ label: "Activate Key", value: "F" }, { label: "Axe key", value: "2" }, { label: "Sword key", value: "1" }, { label: "Double-click (ms)", value: "21" }],
        actions: ["AXE", "SWIPE", "SWORD"],
      },
      {
        abbr: "LS", name: "Lunge Swap", desc: "Lunge swap timing chain for consistent hits",
        keys: [{ label: "Activate Key", value: "C" }, { label: "Sword key", value: "1" }, { label: "Spear key", value: "3" }],
        actions: ["SWAP", "ATTACK"],
      },
      {
        abbr: "TB", name: "Triggerbot", desc: "Pixel crosshair detection with Normal and S-Tap...",
        keys: [{ label: "Activate Key", value: "X" }],
        actions: ["DETECT", "ATTACK"],
      },
      {
        abbr: "SW", name: "Stun Web", desc: "Stun chain into web placement for corner control",
        keys: [{ label: "Activate Key", value: "V" }, { label: "Web key", value: "7" }, { label: "Sword key", value: "1" }],
        actions: ["STUN", "WEB"],
      },
    ],
  },
  {
    name: "Mace",
    count: 5,
    desc: "Mace combo automation",
    macros: [
      {
        abbr: "ES", name: "Elytra Swap", desc: "Fast elytra swap timing sequence for slam setups",
        keys: [{ label: "Activate Key", value: "Q" }, { label: "Elytra key", value: "5" }, { label: "Return key", value: "1" }, { label: "Delay (ms)", value: "50" }],
        actions: ["SWAP", "SLAM"],
      },
      {
        abbr: "PC", name: "Pearl Catch", desc: "Pearl throw followed by immediate slam sequen...",
        keys: [{ label: "Activate Key", value: "E" }, { label: "Pearl key", value: "6" }, { label: "Wind key", value: "7" }, { label: "Delay (ms)", value: "50" }],
        actions: ["THROW", "SLAM"],
      },
      {
        abbr: "SS", name: "Stun Slam", desc: "Stun routing that sets up a guaranteed slam",
        keys: [{ label: "Activate Key", value: "T" }, { label: "Axe key", value: "2" }, { label: "Mace key", value: "3" }, { label: "Tick gap (ms)", value: "55" }],
        actions: ["SETUP", "SLAM"],
      },
      {
        abbr: "ASS", name: "Auto Stun Slam", desc: "Auto-fires Stun Slam the instant the crosshair turns blue on target",
        keys: [{ label: "Activate Key", value: "-" }, { label: "Axe key", value: "2" }, { label: "Mace key", value: "3" }],
        actions: ["DETECT TARGET", "AUTO AXE", "AUTO MACE"],
      },
    ],
  },
  {
    name: "Cart",
    count: 2,
    desc: "Explosive cart sequencing",
    macros: [
      {
        abbr: "IC", name: "Insta Cart", desc: "Bow charge, rail placement, and cart deploy seq...",
        keys: [{ label: "Activate Key", value: "B" }, { label: "Rail key", value: "5" }, { label: "Bow key", value: "4" }, { label: "Cart key", value: "6" }, { label: "Delay (ms)", value: "50" }, { label: "Bow hold (ms)", value: "150" }],
        actions: ["RAIL", "CART", "BOW"],
      },
      {
        abbr: "CB", name: "Crossbow", desc: "Crossbow load and detonation chain timing",
        keys: [{ label: "Activate Key", value: "N" }, { label: "Crossbow key", value: "3" }, { label: "Rail key", value: "5" }, { label: "Cart key", value: "6" }],
        actions: ["FIRE CROSSBOW", "PLACE RAIL", "DEPLOY CART"],
      },
    ],
  },
  {
    name: "UHC",
    count: 3,
    desc: "Ultimate Hardcore macros and utility chains",
    macros: [
      {
        abbr: "G", name: "Gapple Eater", desc: "Auto eat Golden Apple and swap back quickly",
        keys: [{ label: "Activate Key", value: "V" }, { label: "Gapple slot", value: "8" }, { label: "Return slot", value: "1" }, { label: "Eat delay (ms)", value: "1680" }],
        actions: ["SWAP", "USE", "RETURN"],
      },
      {
        abbr: "DR", name: "Drain", desc: "Fluid drain with reset spacing for controlled removal",
        keys: [{ label: "Activate Key", value: "H" }, { label: "Bucket key", value: "5" }, { label: "Sword key", value: "1" }],
        actions: ["BUCKET", "DRAIN", "SWORD"],
      },
      {
        abbr: "LW", name: "Lava Web", desc: "Synchronized lava and web placement timing",
        keys: [{ label: "Activate Key", value: "J" }, { label: "Lava key", value: "4" }, { label: "Web key", value: "7" }],
        actions: ["LAVA", "WEB"],
      },
      {
        abbr: "LV", name: "Lava", desc: "Quick lava placement helper for rapid utility",
        keys: [{ label: "Activate Key", value: "K" }, { label: "Lava key", value: "4" }, { label: "Sword key", value: "1" }],
        actions: ["PLACE", "RETREAT"],
      },
    ],
  },
];

function MacroCard({ macro, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      className="bg-[#0f0f24] border border-white/8 rounded-xl p-5"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-violet-600/20 border border-violet-500/20 flex items-center justify-center">
            <span className="text-violet-300 text-xs font-bold">{macro.abbr}</span>
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">{macro.name}</h3>
            <p className="text-white/40 text-xs">{macro.desc}</p>
          </div>
        </div>
        <div className="w-8 h-4 rounded-full bg-white/10 flex-shrink-0 mt-1" />
      </div>

      <div className="space-y-2 mb-4">
        {macro.keys.map((k) => (
          <div key={k.label} className="flex items-center justify-between">
            <span className="text-white/40 text-xs">{k.label}</span>
            <span className="bg-[#1a1a35] border border-white/10 text-white/80 text-xs px-2 py-0.5 rounded font-mono">
              {k.value}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-white/5 pt-3">
        <p className="text-[10px] text-white/20 uppercase tracking-widest mb-2">ACTIONS</p>
        <div className="flex flex-wrap gap-1.5">
          {macro.actions.map((a) => (
            <span key={a} className="text-[10px] font-bold text-cyan-400 border border-cyan-400/30 bg-cyan-400/5 px-2 py-0.5 rounded tracking-wide">
              {a}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function MacrosView() {
  const [selectedTab, setSelectedTab] = useState("Crystal");
  const current = TABS.find((t) => t.name === selectedTab);

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">Macros</h1>
        <p className="text-white/50 text-sm">Select a category to browse macros.</p>
      </div>

      <div className="flex items-center gap-1 mb-6 border-b border-white/5 pb-2 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setSelectedTab(tab.name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedTab === tab.name
                ? "bg-violet-600/20 text-white border border-violet-500/30"
                : "text-white/40 hover:text-white hover:bg-white/5"
            }`}
          >
            {tab.name}
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
              selectedTab === tab.name ? "bg-violet-500/40 text-violet-200" : "bg-white/8 text-white/30"
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTab}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.2 }}
        >
          <div className="mb-5">
            <h2 className="text-xl font-bold text-white mb-0.5">{current.name}</h2>
            <p className="text-white/40 text-sm">{current.desc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {current.macros.map((macro, i) => (
              <MacroCard key={macro.name + i} macro={macro} index={i} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}