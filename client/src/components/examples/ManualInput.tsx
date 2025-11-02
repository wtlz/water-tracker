import ManualInput from '../ManualInput';

export default function ManualInputExample() {
  return <ManualInput onAddWater={(amount) => console.log('Added water:', amount)} />;
}
