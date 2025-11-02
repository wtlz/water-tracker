import HistoryChart from '../HistoryChart';

export default function HistoryChartExample() {
  const data = [
    { date: '2025-10-27', amount: 2800, goal: 3000 },
    { date: '2025-10-28', amount: 3200, goal: 3000 },
    { date: '2025-10-29', amount: 2600, goal: 3000 },
    { date: '2025-10-30', amount: 3400, goal: 3000 },
    { date: '2025-10-31', amount: 2900, goal: 3000 },
    { date: '2025-11-01', amount: 3100, goal: 3000 },
    { date: '2025-11-02', amount: 1850, goal: 3000 },
  ];

  return <HistoryChart data={data} />;
}
