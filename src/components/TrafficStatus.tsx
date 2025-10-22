import { Car, Bike, Bus, Users } from 'lucide-react';
import { TrafficStatus as TrafficStatusType } from '@/utils/mockData';

interface TrafficStatusProps {
  status: TrafficStatusType[];
}

const TrafficStatus = ({ status }: TrafficStatusProps) => {
  const getCongestionColor = (level: string) => {
    switch (level) {
      case 'Low':
        return 'text-status-active';
      case 'Medium':
        return 'text-status-warning';
      case 'High':
        return 'text-status-error';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-foreground mb-6">Live Traffic Status</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {status.map((item) => (
          <div key={item.direction} className="bg-muted rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-foreground">{item.direction}</h3>
              <span className={`text-sm font-medium ${getCongestionColor(item.congestion)}`}>
                {item.congestion} Congestion
              </span>
            </div>
            
            <div className="grid grid-cols-4 gap-3">
              <div className="text-center space-y-1">
                <Car className="w-6 h-6 mx-auto text-primary" />
                <p className="text-sm font-semibold text-foreground">{item.vehicles.cars}</p>
                <p className="text-xs text-muted-foreground">Cars</p>
              </div>
              
              <div className="text-center space-y-1">
                <Bike className="w-6 h-6 mx-auto text-primary" />
                <p className="text-sm font-semibold text-foreground">{item.vehicles.bikes}</p>
                <p className="text-xs text-muted-foreground">Bikes</p>
              </div>
              
              <div className="text-center space-y-1">
                <Bus className="w-6 h-6 mx-auto text-primary" />
                <p className="text-sm font-semibold text-foreground">{item.vehicles.buses}</p>
                <p className="text-xs text-muted-foreground">Buses</p>
              </div>
              
              <div className="text-center space-y-1">
                <Users className="w-6 h-6 mx-auto text-primary" />
                <p className="text-sm font-semibold text-foreground">{item.vehicles.pedestrians}</p>
                <p className="text-xs text-muted-foreground">People</p>
              </div>
            </div>
            
            <div className="pt-2 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Wait Time: <span className="font-semibold text-foreground">{item.waitTime}s</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrafficStatus;
