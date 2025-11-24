import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
  return (
    <NativeTabs iconColor={'#DE483A'}>
      <NativeTabs.Trigger name="home/index">
        <Label>Home</Label>
        <Icon
          sf={{ default: 'house', selected: 'house.fill' }}
          drawable="custom_android_drawable"
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="tasks/index">
        <Label>Tasks</Label>
        <Icon
          sf={{ default: 'square.grid.2x2', selected: 'square.grid.2x2.fill' }}
          drawable="custom_android_drawable"
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="habits/index">
        <Label>Habits</Label>
        <Icon
          sf={{ default: 'infinity.circle', selected: 'infinity.circle.fill' }}
          drawable="custom_android_drawable"
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="finances/index">
        <Label>Finances</Label>
        <Icon
          sf={{ default: 'dollarsign.circle', selected: 'dollarsign.circle.fill' }}
          drawable="custom_android_drawable"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
