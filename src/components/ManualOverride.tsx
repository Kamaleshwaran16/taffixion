import { useEffect, useState } from 'react';
import { Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ManualOverride as ManualOverrideType } from '@/utils/mockData';

interface ManualOverrideProps {
  onOverride: (direction: string, signal: string) => void;
}

const ManualOverride = ({ onOverride }: ManualOverrideProps) => {
  const [overrides, setOverrides] = useState<ManualOverrideType[]>([]);
  const directions = ['North', 'South', 'East', 'West'];
  const signals = ['red', 'yellow', 'green'];

  useEffect(() => {
    // Update timers every second
    const timer = setInterval(() => {
      setOverrides((prev) => {
        const now = new Date();
        return prev
          .map((override) => ({
            ...override,
            remainingTime: Math.max(
              0,
              Math.floor((override.expiresAt.getTime() - now.getTime()) / 1000)
            ),
          }))
          .filter((override) => override.remainingTime > 0);
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOverride = (direction: string, signal: string) => {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 15000); // 15 seconds

    const newOverride: ManualOverrideType = {
      direction: direction as 'North' | 'South' | 'East' | 'West',
      signal: signal as 'red' | 'yellow' | 'green',
      timestamp: now,
      expiresAt,
      remainingTime: 15,
    };

    // Remove existing override for this direction
    setOverrides((prev) => [
      ...prev.filter((o) => o.direction !== direction),
      newOverride,
    ]);

    // Call parent handler to actually apply the override
    onOverride(direction, signal);
  };

  const handleClearAll = () => {
    setOverrides([]);
    console.log('All overrides cleared');
  };

  const getActiveOverride = (direction: string) => {
    return overrides.find((o) => o.direction === direction);
  };

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'red':
        return 'bg-signal-red';
      case 'yellow':
        return 'bg-signal-yellow';
      case 'green':
        return 'bg-signal-green';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-foreground">Manual Override</h2>
        {overrides.length > 0 && (
          <Button
            onClick={handleClearAll}
            variant="outline"
            size="sm"
            className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            Clear All Overrides
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {directions.map((direction) => {
          const activeOverride = getActiveOverride(direction);

          return (
            <div key={direction} className="bg-muted rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-foreground">{direction}</h3>
                {activeOverride && (
                  <div className="flex items-center gap-2">
                    <Circle className={`w-3 h-3 ${getSignalColor(activeOverride.signal)} rounded-full animate-pulse`} />
                    <span className="text-sm font-medium text-foreground">
                      {activeOverride.remainingTime}s
                    </span>
                  </div>
                )}
              </div>

              {activeOverride && (
                <div className="mb-3">
                  <div className="h-2 bg-background rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getSignalColor(activeOverride.signal)} transition-all duration-1000`}
                      style={{ width: `${(activeOverride.remainingTime / 15) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-2">
                {signals.map((signal) => (
                  <Button
                    key={signal}
                    onClick={() => handleOverride(direction, signal)}
                    variant={activeOverride?.signal === signal ? 'default' : 'outline'}
                    size="sm"
                    className={`capitalize ${
                      activeOverride?.signal === signal
                        ? `${getSignalColor(signal)} text-white hover:opacity-90`
                        : ''
                    }`}
                  >
                    {signal}
                  </Button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ManualOverride;
