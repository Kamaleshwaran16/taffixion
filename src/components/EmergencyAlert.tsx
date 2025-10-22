import { useEffect, useState } from 'react';
import { AlertTriangle, Ambulance, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmergencyAlert as EmergencyAlertType, generateEmergencyAlert } from '@/utils/mockData';

interface EmergencyAlertProps {
  onAcknowledge: (id: string) => void;
}

const EmergencyAlert = ({ onAcknowledge }: EmergencyAlertProps) => {
  const [alerts, setAlerts] = useState<EmergencyAlertType[]>([]);
  const [stats, setStats] = useState({ total: 0, acknowledged: 0 });

  useEffect(() => {
    // Generate initial alert
    const initialAlert = generateEmergencyAlert();
    setAlerts([initialAlert]);

    // Generate new alerts periodically
    const interval = setInterval(() => {
      const newAlert = generateEmergencyAlert();
      setAlerts((prev) => [...prev, newAlert].slice(-3)); // Keep last 3 alerts
      setStats((prev) => ({ ...prev, total: prev.total + 1 }));
    }, Math.random() * 10000 + 15000); // 15-25 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Update countdown timers
    const timer = setInterval(() => {
      setAlerts((prev) =>
        prev.map((alert) => ({
          ...alert,
          countdown: Math.max(0, alert.countdown - 1),
        }))
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAcknowledge = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    setStats((prev) => ({ ...prev, acknowledged: prev.acknowledged + 1 }));
    onAcknowledge(id);
  };

  const handleTestAlert = () => {
    const testAlert = generateEmergencyAlert();
    setAlerts((prev) => [...prev, testAlert].slice(-3));
    setStats((prev) => ({ ...prev, total: prev.total + 1 }));
  };

  return (
    <div className="bg-card rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-warning" />
          Emergency Alerts
        </h2>
        <Button
          onClick={handleTestAlert}
          variant="outline"
          size="sm"
          className="text-sm"
        >
          Test Alert
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-muted rounded-lg p-3">
          <p className="text-sm text-muted-foreground">Total Alerts</p>
          <p className="text-2xl font-bold text-foreground">{stats.total}</p>
        </div>
        <div className="bg-muted rounded-lg p-3">
          <p className="text-sm text-muted-foreground">Acknowledged</p>
          <p className="text-2xl font-bold text-secondary">{stats.acknowledged}</p>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="space-y-3">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <AlertCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No active alerts</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 space-y-3"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <Ambulance className="w-6 h-6 text-destructive mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground capitalize">
                      {alert.type} Emergency
                    </h3>
                    <p className="text-sm text-muted-foreground">{alert.location}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {alert.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-destructive text-destructive-foreground text-xs font-semibold rounded">
                  {alert.priority.toUpperCase()}
                </span>
              </div>

              {/* Countdown Progress */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Auto-clear in:</span>
                  <span className="font-semibold text-foreground">{alert.countdown}s</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-destructive transition-all duration-1000"
                    style={{ width: `${(alert.countdown / 15) * 100}%` }}
                  />
                </div>
              </div>

              <Button
                onClick={() => handleAcknowledge(alert.id)}
                className="w-full bg-destructive hover:bg-destructive/90"
                size="sm"
              >
                Acknowledge & Clear
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EmergencyAlert;
