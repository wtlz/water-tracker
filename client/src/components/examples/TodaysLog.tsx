import TodaysLog from '../TodaysLog';

export default function TodaysLogExample() {
  const entries = [
    { id: '1', amount: 200, timestamp: new Date('2025-11-02T08:30:00') },
    { id: '2', amount: 450, timestamp: new Date('2025-11-02T11:15:00') },
    { id: '3', amount: 850, timestamp: new Date('2025-11-02T14:00:00') },
    { id: '4', amount: 350, timestamp: new Date('2025-11-02T16:45:00') },
  ];

  return (
    <TodaysLog 
      entries={entries} 
      onDeleteEntry={(id) => console.log('Delete entry:', id)}
    />
  );
}
