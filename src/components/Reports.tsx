import { useState, useEffect } from 'react';
import { Download, Calendar, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateReportData, ReportData } from '@/utils/mockData';

const Reports = () => {
  const [reportData, setReportData] = useState<ReportData[]>([]);
  const [dateRange, setDateRange] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [downloadStatus, setDownloadStatus] = useState('');

  useEffect(() => {
    const days = dateRange === 'daily' ? 1 : dateRange === 'weekly' ? 7 : 30;
    setReportData(generateReportData(days));
  }, [dateRange]);

  const handleExportCSV = () => {
    const headers = ['Date', 'Direction', 'Vehicles', 'Avg Wait Time', 'Congestion', 'Incidents'];
    const csvContent = [
      headers.join(','),
      ...reportData.map((row) =>
        [row.date, row.direction, row.vehicles, row.avgWaitTime, row.congestion, row.incidents].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `traffic-report-${dateRange}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    setDownloadStatus('CSV exported successfully!');
    setTimeout(() => setDownloadStatus(''), 3000);
  };

  const handleExportPDF = () => {
    const reportText = [
      'TRAFFIC MANAGEMENT REPORT',
      `Generated: ${new Date().toLocaleString()}`,
      `Period: ${dateRange}`,
      '',
      'SUMMARY STATISTICS',
      `Total Vehicles: ${reportData.reduce((sum, row) => sum + row.vehicles, 0)}`,
      `Average Wait Time: ${Math.floor(reportData.reduce((sum, row) => sum + row.avgWaitTime, 0) / reportData.length)}s`,
      `Total Incidents: ${reportData.reduce((sum, row) => sum + row.incidents, 0)}`,
      '',
      'DETAILED DATA',
      reportData.map((row) => `${row.date} | ${row.direction} | ${row.vehicles} vehicles | ${row.avgWaitTime}s | ${row.congestion}`).join('\n'),
    ].join('\n');

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `traffic-report-${dateRange}-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    setDownloadStatus('Report exported successfully!');
    setTimeout(() => setDownloadStatus(''), 3000);
  };

  const totalVehicles = reportData.reduce((sum, row) => sum + row.vehicles, 0);
  const avgWaitTime = Math.floor(reportData.reduce((sum, row) => sum + row.avgWaitTime, 0) / reportData.length);
  const totalIncidents = reportData.reduce((sum, row) => sum + row.incidents, 0);

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="bg-card rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">Traffic Reports</h2>
            <p className="text-sm text-muted-foreground">Generate and export traffic statistics</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex gap-2">
              <Button
                variant={dateRange === 'daily' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDateRange('daily')}
                className="gap-2"
              >
                <Calendar className="w-4 h-4" />
                Daily
              </Button>
              <Button
                variant={dateRange === 'weekly' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDateRange('weekly')}
              >
                Weekly
              </Button>
              <Button
                variant={dateRange === 'monthly' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDateRange('monthly')}
              >
                Monthly
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleExportCSV}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                CSV
              </Button>
              <Button
                onClick={handleExportPDF}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <FileText className="w-4 h-4" />
                Report
              </Button>
            </div>
          </div>
        </div>

        {downloadStatus && (
          <div className="mt-4 p-3 bg-secondary/10 text-secondary rounded-lg text-sm">
            {downloadStatus}
          </div>
        )}
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl shadow-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Vehicles</p>
          <p className="text-3xl font-bold text-foreground">{totalVehicles.toLocaleString()}</p>
        </div>
        <div className="bg-card rounded-xl shadow-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">Avg Wait Time</p>
          <p className="text-3xl font-bold text-foreground">{avgWaitTime}s</p>
        </div>
        <div className="bg-card rounded-xl shadow-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Incidents</p>
          <p className="text-3xl font-bold text-foreground">{totalIncidents}</p>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-card rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Direction</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Vehicles</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Wait Time</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Congestion</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Incidents</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {reportData.slice(0, 20).map((row, index) => (
                <tr key={index} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-foreground">{row.date}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{row.direction}</td>
                  <td className="px-6 py-4 text-sm text-right text-foreground">{row.vehicles.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-right text-foreground">{row.avgWaitTime}s</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      row.congestion === 'Low' ? 'bg-status-active/10 text-status-active' :
                      row.congestion === 'Medium' ? 'bg-status-warning/10 text-status-warning' :
                      'bg-status-error/10 text-status-error'
                    }`}>
                      {row.congestion}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-right text-foreground">{row.incidents}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
