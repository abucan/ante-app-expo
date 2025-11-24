import React, { useMemo } from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { WeekCalendar } from '@/components/WeekCalendar';
import WeekView from '@/components/WeekView';

export default function Tasks() {
  return (
    <SafeAreaView style={styles.container}>
      <WeekCalendar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
