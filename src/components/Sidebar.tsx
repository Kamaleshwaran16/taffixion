import { LayoutDashboard, BarChart3, FileText, Settings, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo & Branding */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3 mb-2">
          <Activity className="w-8 h-8 text-sidebar-primary" />
          <div>
            <h1 className="text-xl font-bold text-sidebar-foreground">
              Traffic Control
            </h1>
            <p className="text-xs text-sidebar-foreground/70">
              Government of Odisha
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              variant="ghost"
              className={`w-full justify-start gap-3 h-12 ${
                isActive 
                  ? 'bg-sidebar-accent text-sidebar-primary font-semibold' 
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <p className="text-xs text-sidebar-foreground/50 text-center">
          Version 1.0.0
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
