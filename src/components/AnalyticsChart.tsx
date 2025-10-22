import { AnalyticsData } from '@/utils/mockData';

interface AnalyticsChartProps {
  title: string;
  data: AnalyticsData[];
  dataKey: keyof AnalyticsData;
  color: string;
  type?: 'line' | 'bar';
}

const AnalyticsChart = ({ title, data, dataKey, color, type = 'line' }: AnalyticsChartProps) => {
  if (data.length === 0) return null;

  const maxValue = Math.max(...data.map((d) => Number(d[dataKey])));
  const points = data.map((d, i) => ({
    x: (i / (data.length - 1)) * 100,
    y: 100 - (Number(d[dataKey]) / maxValue) * 80,
    value: d[dataKey],
    label: d.timestamp,
  }));

  return (
    <div className="bg-card rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-foreground mb-4">{title}</h3>
      
      <div className="relative h-64 bg-muted rounded-lg p-4">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {type === 'line' ? (
            <>
              {/* Line path */}
              <polyline
                points={points.map((p) => `${p.x},${p.y}`).join(' ')}
                fill="none"
                stroke={color}
                strokeWidth="0.5"
                vectorEffect="non-scaling-stroke"
              />
              
              {/* Area fill */}
              <polygon
                points={`0,100 ${points.map((p) => `${p.x},${p.y}`).join(' ')} 100,100`}
                fill={color}
                opacity="0.1"
              />
              
              {/* Data points */}
              {points.map((point, i) => (
                <circle
                  key={i}
                  cx={point.x}
                  cy={point.y}
                  r="1"
                  fill={color}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </>
          ) : (
            // Bar chart
            <>
              {points.map((point, i) => {
                const barWidth = 80 / data.length;
                return (
                  <rect
                    key={i}
                    x={point.x - barWidth / 2}
                    y={point.y}
                    width={barWidth}
                    height={100 - point.y}
                    fill={color}
                    opacity="0.8"
                  />
                );
              })}
            </>
          )}
        </svg>
        
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-muted-foreground pr-2">
          <span>{maxValue}</span>
          <span>{Math.floor(maxValue / 2)}</span>
          <span>0</span>
        </div>
        
        {/* X-axis labels */}
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>{data[0]?.timestamp}</span>
          <span>{data[Math.floor(data.length / 2)]?.timestamp}</span>
          <span>{data[data.length - 1]?.timestamp}</span>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart;
