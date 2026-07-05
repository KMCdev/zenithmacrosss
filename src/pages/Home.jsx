import React, { useState } from "react";
import ZenithNav from "@/components/vault/ZenithNav";
import ZenithSidebar from "@/components/vault/ZenithSidebar";
import DashboardView from "@/components/vault/DashboardView";
import PricingView from "@/components/vault/PricingView";
import RegisterModal from "@/components/vault/RegisterModal";
import DownloadVault from "@/components/vault/DownloadVault";
import InterfaceView from "@/components/vault/views/InterfaceView";
import MacrosView from "@/components/vault/views/MacrosView";
import DownloadView from "@/components/vault/views/DownloadView";
import SubscriptionView from "@/components/vault/views/SubscriptionView";
import AccountView from "@/components/vault/views/AccountView";
import FAQView from "@/components/vault/views/FAQView";

export default function Home() {
  const [user, setUser] = useState(null); // { username, email }
  const [view, setView] = useState("dashboard");
  const [showRegister, setShowRegister] = useState(false);
  const [showDownload, setShowDownload] = useState(false);

  const handleRegisterSuccess = (userData) => {
    setUser(userData);
    setShowRegister(false);
  };

  const handleRegisterClick = () => setShowRegister(true);

  const handleDownload = () => {
    if (!user) {
      setShowRegister(true);
    } else {
      setShowDownload(true);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setView("dashboard");
  };

  const renderView = () => {
    switch (view) {
      case "dashboard":
        return (
          <DashboardView
            user={user}
            onRegisterClick={handleRegisterClick}
            onViewPricing={() => setView("subscription")}
            onDownload={handleDownload}
          />
        );
      case "interface":
        return <InterfaceView />;
      case "macros":
        return <MacrosView />;
      case "subscription":
        return (
          <PricingView
            user={user}
            onRegisterClick={handleRegisterClick}
            onDownload={handleDownload}
          />
        );
      case "download":
        return <DownloadView user={user} onRegisterClick={handleRegisterClick} />;
      case "account":
        return <AccountView user={user} onLogout={handleLogout} />;
      case "faq":
        return <FAQView />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white flex flex-col">
      <ZenithNav
        currentView={view}
        onNavigate={setView}
        onRegisterClick={handleRegisterClick}
        user={user}
      />

      <div className="flex flex-1">
        <ZenithSidebar
          currentView={view}
          onNavigate={setView}
          user={user}
        />
        <main className="flex-1 overflow-auto">
          {renderView()}
        </main>
      </div>

      {showRegister && (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          onSuccess={handleRegisterSuccess}
        />
      )}

      <DownloadVault
        visible={showDownload}
        onClose={() => setShowDownload(false)}
      />
    </div>
  );
}