import { TrafficSignal } from '@/utils/mockData';

interface TrafficSignalsProps {
  signals: TrafficSignal[];
}

const TrafficSignals = ({ signals }: TrafficSignalsProps) => {
  return (
    <div className="bg-card rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-foreground mb-6">Traffic Signals Status</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {signals.map((signal) => (
          <div key={signal.direction} className="bg-muted rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-foreground">{signal.direction}</h3>
              <span className="text-sm text-muted-foreground">{signal.timer}s</span>
            </div>
            
            <div className="flex justify-center gap-3">
              {/* Red Signal */}
              <div className={`w-12 h-12 rounded-full border-2 transition-all ${
                signal.red 
                  ? 'bg-signal-red shadow-lg shadow-signal-red/50 border-signal-red' 
                  : 'bg-gray-200 border-gray-300'
              }`} />
              
              {/* Yellow Signal */}
              <div className={`w-12 h-12 rounded-full border-2 transition-all ${
                signal.yellow 
                  ? 'bg-signal-yellow shadow-lg shadow-signal-yellow/50 border-signal-yellow' 
                  : 'bg-gray-200 border-gray-300'
              }`} />
              
              {/* Green Signal */}
              <div className={`w-12 h-12 rounded-full border-2 transition-all ${
                signal.green 
                  ? 'bg-signal-green shadow-lg shadow-signal-green/50 border-signal-green' 
                  : 'bg-gray-200 border-gray-300'
              }`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrafficSignals;
