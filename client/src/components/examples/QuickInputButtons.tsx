import QuickInputButtons from '../QuickInputButtons';

export default function QuickInputButtonsExample() {
  return (
    <QuickInputButtons 
      presetVolumes={[150, 200, 450, 850, 1000]} 
      onAddWater={(amount) => console.log('Added water:', amount)}
    />
  );
}
