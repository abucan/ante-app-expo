import React, { useCallback, useMemo, useState } from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { WeekCalendar } from '@/components/WeekCalendar';
import WeekView from '@/components/WeekView';

export default function Tasks() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSelectDate = useCallback((date: Date) => {
    setSelectedDate(date);
    console.log('selectedDate', date);
  }, []);

  const handleWeekChange = useCallback((startOfWeek: Date) => {
    // load data for this week, update filters, etc.
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.calendarContainer}>
        <WeekCalendar
          value={selectedDate}
          onChangeValue={handleSelectDate}
          onWeekChange={handleWeekChange}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  calendarContainer: {
    height: 80,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
  },
});
