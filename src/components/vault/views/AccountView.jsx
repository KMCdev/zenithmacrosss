import React from "react";
import { User, Mail, Shield, LogOut } from "lucide-react";

export default function AccountView({ user, onLogout }) {
  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Account</h1>
        <p className="text-white/50 text-sm">Your profile and account settings.</p>
      </div>

      <div className="bg-[#13132b]/80 border border-white/5 rounded-2xl p-6 mb-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xl font-bold text-white">
            {user?.username ? user.username[0].toUpperCase() : "?"}
          </div>
          <div>
            <p className="font-bold text-white text-lg">{user?.username || "Guest"}</p>
            <span className="text-[10px] bg-violet-600/40 text-violet-300 px-2 py-0.5 rounded-full font-medium">FREE FOREVER</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-white/3 rounded-lg px-4 py-3">
            <User className="w-4 h-4 text-white/30" />
            <div>
              <p className="text-[10px] text-white/30 uppercase tracking-widest">Username</p>
              <p className="text-white text-sm">{user?.username || "—"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/3 rounded-lg px-4 py-3">
            <Mail className="w-4 h-4 text-white/30" />
            <div>
              <p className="text-[10px] text-white/30 uppercase tracking-widest">Email</p>
              <p className="text-white text-sm">{user?.email || "—"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/3 rounded-lg px-4 py-3">
            <Shield className="w-4 h-4 text-white/30" />
            <div>
              <p className="text-[10px] text-white/30 uppercase tracking-widest">Plan</p>
              <p className="text-white text-sm">Free Forever</p>
            </div>
          </div>
        </div>
      </div>

      {user && (
        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-white/40 hover:text-red-400 text-sm transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      )}
    </div>
  );
}