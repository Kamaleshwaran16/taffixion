export interface TrafficSignal {
  direction: 'North' | 'South' | 'East' | 'West';
  red: boolean;
  yellow: boolean;
  green: boolean;
  timer: number;
}

export interface VehicleCount {
  cars: number;
  bikes: number;
  buses: number;
  pedestrians: number;
}

export interface TrafficStatus {
  direction: string;
  vehicles: VehicleCount;
  congestion: 'Low' | 'Medium' | 'High';
  waitTime: number;
}

export interface EmergencyAlert {
  id: string;
  type: 'ambulance' | 'fire' | 'police';
  location: string;
  timestamp: Date;
  priority: 'high' | 'critical';
  countdown: number;
}

export interface ManualOverride {
  direction: 'North' | 'South' | 'East' | 'West';
  signal: 'red' | 'yellow' | 'green';
  timestamp: Date;
  expiresAt: Date;
  remainingTime: number;
}

export interface PerformanceMetrics {
  ambulancesPrioritized: number;
  pedestrianCrossings: number;
  avgWaitTime: number;
  congestionReduction: number;
}

export interface AnalyticsData {
  timestamp: string;
  waitTime: number;
  congestion: number;
  utilization: number;
}

export interface ReportData {
  date: string;
  direction: string;
  vehicles: number;
  avgWaitTime: number;
  congestion: string;
  incidents: number;
}

export const generateTrafficSignals = (): TrafficSignal[] => {
  const directions: Array<'North' | 'South' | 'East' | 'West'> = ['North', 'South', 'East', 'West'];
  const activeDirection = directions[Math.floor(Math.random() * 4)];
  
  return directions.map(direction => ({
    direction,
    red: direction !== activeDirection,
    yellow: false,
    green: direction === activeDirection,
    timer: Math.floor(Math.random() * 60) + 10,
  }));
};

export const generateTrafficStatus = (): TrafficStatus[] => {
  const directions = ['North', 'South', 'East', 'West'];
  const congestionLevels: Array<'Low' | 'Medium' | 'High'> = ['Low', 'Medium', 'High'];
  
  return directions.map(direction => ({
    direction,
    vehicles: {
      cars: Math.floor(Math.random() * 100) + 20,
      bikes: Math.floor(Math.random() * 50) + 10,
      buses: Math.floor(Math.random() * 20) + 2,
      pedestrians: Math.floor(Math.random() * 30) + 5,
    },
    congestion: congestionLevels[Math.floor(Math.random() * 3)],
    waitTime: Math.floor(Math.random() * 120) + 30,
  }));
};

export const generateEmergencyAlert = (): EmergencyAlert => {
  const types: Array<'ambulance' | 'fire' | 'police'> = ['ambulance', 'fire', 'police'];
  const locations = ['North Junction', 'South Junction', 'East Junction', 'West Junction'];
  
  return {
    id: `ALERT-${Date.now()}`,
    type: types[Math.floor(Math.random() * types.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    timestamp: new Date(),
    priority: 'high',
    countdown: 15,
  };
};

export const generatePerformanceMetrics = (): PerformanceMetrics => ({
  ambulancesPrioritized: Math.floor(Math.random() * 50) + 120,
  pedestrianCrossings: Math.floor(Math.random() * 200) + 800,
  avgWaitTime: Math.floor(Math.random() * 30) + 45,
  congestionReduction: Math.floor(Math.random() * 15) + 25,
});

export const generateAnalyticsData = (hours: number = 24): AnalyticsData[] => {
  const data: AnalyticsData[] = [];
  for (let i = 0; i < hours; i++) {
    const hour = i % 24;
    data.push({
      timestamp: `${hour.toString().padStart(2, '0')}:00`,
      waitTime: Math.floor(Math.random() * 60) + 40,
      congestion: Math.floor(Math.random() * 40) + 30,
      utilization: Math.floor(Math.random() * 30) + 60,
    });
  }
  return data;
};

export const generateReportData = (days: number = 30): ReportData[] => {
  const data: ReportData[] = [];
  const directions = ['North', 'South', 'East', 'West'];
  const congestionLevels = ['Low', 'Medium', 'High'];
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    directions.forEach(direction => {
      data.push({
        date: date.toISOString().split('T')[0],
        direction,
        vehicles: Math.floor(Math.random() * 5000) + 1000,
        avgWaitTime: Math.floor(Math.random() * 90) + 30,
        congestion: congestionLevels[Math.floor(Math.random() * 3)],
        incidents: Math.floor(Math.random() * 5),
      });
    });
  }
  
  return data;
};
