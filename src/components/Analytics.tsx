import { useEffect, useState } from 'react';
import { TrendingUp, Users, Clock, TrendingDown } from 'lucide-react';
import AnalyticsChart from './AnalyticsChart';
import {
  generatePerformanceMetrics,
  generateAnalyticsData,
  PerformanceMetrics,
  AnalyticsData,
} from '@/utils/mockData';

const Analytics = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [chartData, setChartData] = useState<AnalyticsData[]>([]);

  useEffect(() => {
    setMetrics(generatePerformanceMetrics());
    setChartData(generateAnalyticsData(24));
  }, []);

  if (!metrics) return null;

  return (
    <div className="space-y-6">
      {/* Performance Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-status-active/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-status-active" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ambulances</p>
              <p className="text-2xl font-bold text-foreground">{metrics.ambulancesPrioritized}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Prioritized today</p>
        </div>

        <div className="bg-card rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pedestrians</p>
              <p className="text-2xl font-bold text-foreground">{metrics.pedestrianCrossings}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Safe crossings today</p>
        </div>

        <div className="bg-card rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-status-warning/10 rounded-lg">
              <Clock className="w-6 h-6 text-status-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Wait Time</p>
              <p className="text-2xl font-bold text-foreground">{metrics.avgWaitTime}s</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Average wait time</p>
        </div>

        <div className="bg-card rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-secondary/10 rounded-lg">
              <TrendingDown className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Congestion</p>
              <p className="text-2xl font-bold text-foreground">{metrics.congestionReduction}%</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Reduction achieved</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart
          title="Wait Time Trends"
          data={chartData}
          dataKey="waitTime"
          color="hsl(var(--status-warning))"
        />
        <AnalyticsChart
          title="Congestion Levels"
          data={chartData}
          dataKey="congestion"
          color="hsl(var(--status-error))"
        />
      </div>

      <AnalyticsChart
        title="Signal Utilization"
        data={chartData}
        dataKey="utilization"
        color="hsl(var(--primary))"
        type="bar"
      />

      {/* Performance Summary */}
      <div className="bg-card rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">Performance Summary</h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">System Efficiency</span>
              <span className="font-semibold text-foreground">94%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-status-active w-[94%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Traffic Flow Optimization</span>
              <span className="font-semibold text-foreground">87%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[87%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Emergency Response</span>
              <span className="font-semibold text-foreground">98%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-secondary w-[98%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
