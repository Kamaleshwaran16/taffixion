import { useState } from 'react';
import { Shield, Bell, Download, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const Settings = () => {
  const [settings, setSettings] = useState({
    aiOptimization: true,
    ambulancePriority: true,
    pedestrianSafety: true,
    failSafeMode: false,
    darkMode: false,
    notifications: true,
  });

  const [showWarning, setShowWarning] = useState(false);

  const handleToggle = (key: string) => {
    if (key === 'failSafeMode' && !settings.failSafeMode) {
      setShowWarning(true);
    } else {
      setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    }
  };

  const confirmFailSafe = () => {
    setSettings((prev) => ({ ...prev, failSafeMode: true }));
    setShowWarning(false);
  };

  const handleExportSettings = () => {
    const settingsJson = JSON.stringify(settings, null, 2);
    const blob = new Blob([settingsJson], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `traffic-settings-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* System Settings */}
      <div className="bg-card rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary" />
          System Settings
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <h3 className="font-semibold text-foreground">AI Optimization</h3>
              <p className="text-sm text-muted-foreground">Automatic traffic flow optimization</p>
            </div>
            <Switch
              checked={settings.aiOptimization}
              onCheckedChange={() => handleToggle('aiOptimization')}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <h3 className="font-semibold text-foreground">Ambulance Priority</h3>
              <p className="text-sm text-muted-foreground">Priority routing for emergency vehicles</p>
            </div>
            <Switch
              checked={settings.ambulancePriority}
              onCheckedChange={() => handleToggle('ambulancePriority')}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <h3 className="font-semibold text-foreground">Pedestrian Safety</h3>
              <p className="text-sm text-muted-foreground">Enhanced pedestrian crossing detection</p>
            </div>
            <Switch
              checked={settings.pedestrianSafety}
              onCheckedChange={() => handleToggle('pedestrianSafety')}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
            <div>
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                Fail-Safe Mode
              </h3>
              <p className="text-sm text-muted-foreground">All signals default to red (emergency only)</p>
            </div>
            <Switch
              checked={settings.failSafeMode}
              onCheckedChange={() => handleToggle('failSafeMode')}
            />
          </div>
        </div>
      </div>

      {/* Warning Dialog */}
      {showWarning && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl shadow-2xl p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-8 h-8 text-destructive" />
              <h3 className="text-xl font-bold text-foreground">Warning</h3>
            </div>
            <p className="text-foreground mb-6">
              Enabling Fail-Safe Mode will set all traffic signals to red. This should only be used in emergency situations. Are you sure you want to continue?
            </p>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowWarning(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmFailSafe}
                className="flex-1 bg-destructive hover:bg-destructive/90"
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Preferences */}
      <div className="bg-card rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Bell className="w-6 h-6 text-primary" />
          Preferences
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <h3 className="font-semibold text-foreground">Dark Mode</h3>
              <p className="text-sm text-muted-foreground">Enable dark theme</p>
            </div>
            <Switch
              checked={settings.darkMode}
              onCheckedChange={() => handleToggle('darkMode')}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <h3 className="font-semibold text-foreground">Notifications</h3>
              <p className="text-sm text-muted-foreground">Receive system alerts</p>
            </div>
            <Switch
              checked={settings.notifications}
              onCheckedChange={() => handleToggle('notifications')}
            />
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="bg-card rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">System Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">System Version</p>
            <p className="font-semibold text-foreground">1.0.0</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Last Update</p>
            <p className="font-semibold text-foreground">{new Date().toLocaleDateString()}</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Active Junctions</p>
            <p className="font-semibold text-foreground">4</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Uptime</p>
            <p className="font-semibold text-foreground">99.8%</p>
          </div>
        </div>

        <Button
          onClick={handleExportSettings}
          variant="outline"
          className="w-full mt-6 gap-2"
        >
          <Download className="w-4 h-4" />
          Export Settings
        </Button>
      </div>
    </div>
  );
};

export default Settings;
