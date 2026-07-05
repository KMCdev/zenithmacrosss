import React from "react";

const TABS = ["Interface", "Macros", "Subscription", "Dashboard", "FAQ"];

const VIEW_MAP = {
  Interface: "interface",
  Macros: "macros",
  Subscription: "subscription",
  Dashboard: "dashboard",
  FAQ: "faq",
};

export default function ZenithNav({ currentView, onNavigate, onRegisterClick, user }) {
  return (
    <nav className="border-b border-white/5 bg-[#0d0d1a] px-6 h-14 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded bg-violet-600 flex items-center justify-center">
          <div className="w-2.5 h-2.5 bg-white rounded-sm" />
        </div>
        <span className="font-bold text-sm text-white">Zenith Macros</span>
      </div>

      <div className="hidden md:flex items-center gap-1">
        {TABS.map((item) => (
          <button
            key={item}
            onClick={() => onNavigate(VIEW_MAP[item])}
            className={`px-4 py-1.5 text-sm transition-colors rounded-md ${
              currentView === VIEW_MAP[item]
                ? "text-white bg-white/8"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {user ? (
        <button
          onClick={() => onNavigate("account")}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          {user.username}
        </button>
      ) : (
        <button
          onClick={onRegisterClick}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Create Account
        </button>
      )}
    </nav>
  );
}