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
} from '@/utils/mockData';

const Dashboard = () => {
  const [signals, setSignals] = useState<TrafficSignal[]>([]);
  const [status, setStatus] = useState<TrafficStatusType[]>([]);

  useEffect(() => {
    // Initialize data
    setSignals(generateTrafficSignals());
    setStatus(generateTrafficStatus());

    // Update data every 5 seconds
    const interval = setInterval(() => {
      setSignals(generateTrafficSignals());
      setStatus(generateTrafficStatus());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleOverride = (direction: string, signal: string) => {
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
