import React from "react";
import { LayoutDashboard, CreditCard, Download, Monitor, Cpu, User, MessageCircle } from "lucide-react";

const NAV = [
  { icon: LayoutDashboard, label: "Overview", view: "dashboard" },
  { icon: Monitor, label: "Interface", view: "interface" },
  { icon: Cpu, label: "Macros", view: "macros" },
  { icon: CreditCard, label: "Subscription", view: "subscription" },
  { icon: Download, label: "Download", view: "download" },
  { icon: User, label: "Account", view: "account" },
];

export default function ZenithSidebar({ currentView, onNavigate, user }) {
  return (
    <aside className="w-[220px] flex-shrink-0 border-r border-white/5 bg-[#0d0d1a] flex-col min-h-[calc(100vh-56px)] hidden md:flex">
      {/* User */}
      <div className="p-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs font-bold">
            {user?.username ? user.username[0].toUpperCase() : "?"}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">{user?.username || "Guest"}</p>
            <span className="text-[10px] bg-violet-600/40 text-violet-300 px-2 py-0.5 rounded-full font-medium">
              FREE FOREVER
            </span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5">
        {NAV.map((item) => (
          <button
            key={item.label}
            onClick={() => onNavigate(item.view)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
              currentView === item.view
                ? "bg-violet-600/20 text-white"
                : "text-white/50 hover:text-white hover:bg-white/5"
            }`}
          >
            <item.icon className="w-4 h-4 flex-shrink-0" />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Bottom — Discord only */}
      <div className="p-3 border-t border-white/5">
        <a
          href="https://discord.gg/knd5D932Dr"
          target="_blank"
          rel="noreferrer"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:text-white hover:bg-white/5 transition-colors"
        >
          <MessageCircle className="w-4 h-4 flex-shrink-0" />
          Discord Support
        </a>
      </div>
    </aside>
  );
}