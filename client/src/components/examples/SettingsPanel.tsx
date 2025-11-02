import SettingsPanel from '../SettingsPanel';

export default function SettingsPanelExample() {
  return (
    <SettingsPanel 
      dailyGoal={3000}
      presetVolumes={[150, 200, 450, 850, 1000]}
      onSaveSettings={(goal, presets) => console.log('Saved:', { goal, presets })}
    />
  );
}
