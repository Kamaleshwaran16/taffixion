import { useEffect, useState } from 'react';
import TrafficSignals from './TrafficSignals';
import TrafficStatus from './TrafficStatus';
import EmergencyAlert from './EmergencyAlert';
import ManualOverride from './ManualOverride';
import {
  generateTrafficSignals,
  generateTrafficStatus,
  TrafficSignal,
  TrafficStatus as TrafficStatusType,
  ManualOverride as ManualOverrideType,
} from '@/utils/mockData';

const Dashboard = () => {
  const [signals, setSignals] = useState<TrafficSignal[]>([]);
  const [status, setStatus] = useState<TrafficStatusType[]>([]);
  const [activeOverrides, setActiveOverrides] = useState<ManualOverrideType[]>([]);

  useEffect(() => {
    // Initialize data
    setSignals(generateTrafficSignals());
    setStatus(generateTrafficStatus());

    // Update data every 5 seconds, but respect overrides
    const interval = setInterval(() => {
      const newSignals = generateTrafficSignals();
      
      // Apply active overrides to the generated signals
      const now = new Date();
      const currentOverrides = activeOverrides.filter(
        (override) => override.expiresAt.getTime() > now.getTime()
      );
      
      const signalsWithOverrides = newSignals.map((signal) => {
        const override = currentOverrides.find((o) => o.direction === signal.direction);
        if (override) {
          return {
            ...signal,
            status: override.signal,
          };
        }
        return signal;
      });
      
      setSignals(signalsWithOverrides);
      setStatus(generateTrafficStatus());
    }, 5000);

    return () => clearInterval(interval);
  }, [activeOverrides]);

  const handleOverride = (direction: string, signal: string) => {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 15000);

    const newOverride: ManualOverrideType = {
      direction: direction as 'North' | 'South' | 'East' | 'West',
      signal: signal as 'red' | 'yellow' | 'green',
      timestamp: now,
      expiresAt,
      remainingTime: 15,
    };

    // Update active overrides
    setActiveOverrides((prev) => [
      ...prev.filter((o) => o.direction !== direction),
      newOverride,
    ]);

    // Immediately update the signal
    setSignals((prev) =>
      prev.map((s) =>
        s.direction === direction ? { ...s, status: signal as 'red' | 'yellow' | 'green' } : s
      )
    );

    console.log(`Override applied: ${direction} - ${signal}`);
  };

  const handleAcknowledgeAlert = (id: string) => {
    console.log(`Alert acknowledged: ${id}`);
  };

  return (
    <div className="space-y-6">
      <TrafficSignals signals={signals} />
      <TrafficStatus status={status} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EmergencyAlert onAcknowledge={handleAcknowledgeAlert} />
        <ManualOverride onOverride={handleOverride} />
      </div>
    </div>
  );
};

export default Dashboard;
