import React, { useCallback, useMemo, useState } from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Task, TaskList } from '@/components/TaskList';
import { WeekCalendar } from '@/components/WeekCalendar';

export default function Tasks() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSelectDate = useCallback((date: Date) => {
    setSelectedDate(date);
    console.log('selectedDate', date);
  }, []);

  const handleWeekChange = useCallback((startOfWeek: Date) => {
    // load data for this week, update filters, etc.
  }, []);

  // DELETE LATER
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', isCompleted: false, text: 'Sample task' },
    { id: '2', isCompleted: true, text: 'Sample task' },
    { id: '3', isCompleted: false, text: 'Sample task' },
    { id: '4', isCompleted: false, text: 'Sample task' },
  ]);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.calendarContainer}>
        <WeekCalendar
          value={selectedDate}
          onChangeValue={handleSelectDate}
          onWeekChange={handleWeekChange}
        />
      </View>
      <TaskList tasks={tasks} onToggleTask={() => {}} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  calendarContainer: {
    height: 80,
    overflow: 'hidden',
  },
  safeAreaContainer: {
    flex: 1,
  },
});
