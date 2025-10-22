import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./components/LoginPage";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Analytics from "./components/Analytics";
import Reports from "./components/Reports";
import Settings from "./components/Settings";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen flex w-full bg-background">
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
          <main className="flex-1 ml-64 p-8">
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'analytics' && <Analytics />}
            {activeTab === 'reports' && <Reports />}
            {activeTab === 'settings' && <Settings />}
          </main>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
