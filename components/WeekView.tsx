// src/components/WeekView.tsx
import React from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { format, isSameDay } from 'date-fns';

import { getWeekDays } from '../utils/week';

type WeekViewProps = {
  startOfWeek: Date;
  selectedDate: Date;
  onSelectDay: (day: Date) => void;
};

function WeekView({ onSelectDay, selectedDate, startOfWeek }: WeekViewProps) {
  const days = getWeekDays(startOfWeek);

  return (
    <View style={styles.container}>
      {days.map((date) => {
        const selected = isSameDay(date, selectedDate);

        return (
          <TouchableOpacity
            key={date.toISOString()}
            style={[styles.dayContainer, selected && styles.daySelected]}
            onPress={() => onSelectDay(date)}
          >
            <Text style={styles.weekdayText}>{format(date, 'EEE')}</Text>
            <Text style={styles.dayText}>{format(date, 'd')}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default React.memo(WeekView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayContainer: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 8,
  },
  daySelected: {
    borderRadius: 16,
    borderWidth: 1,
  },
  dayText: {
    fontSize: 16,
    fontWeight: '600',
  },
  weekdayText: {
    fontSize: 12,
  },
});
