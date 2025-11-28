// src/components/WeekView.tsx
import React from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import dayjs from '@/utils/dayjs';
import { getWeekDays } from '@/utils/week';

type WeekViewProps = {
  startOfWeek: Date;
  selectedDate: Date;
  onSelectDay: (day: Date) => void;
};

function WeekView({ onSelectDay, selectedDate, startOfWeek }: WeekViewProps) {
  const days = getWeekDays(startOfWeek);

  const formatWeekdayShort = (date: Date) => dayjs(date).format('ddd');
  const formatDayOfMonth = (date: Date) => dayjs(date).format('D');

  return (
    <View style={styles.container}>
      {days.map((date) => {
        const selected = dayjs(date).isSame(selectedDate, 'day');

        return (
          <TouchableOpacity
            key={date.toISOString()}
            style={[styles.dayContainer, selected && styles.daySelected]}
            onPress={() => onSelectDay(date)}
          >
            <Text style={[styles.weekdayText, selected && styles.weekdaySelectedText]}>
              {formatWeekdayShort(date)}
            </Text>
            <Text style={[styles.dayText, selected && styles.daySelectedText]}>
              {formatDayOfMonth(date)}
            </Text>
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
    paddingHorizontal: 24,
  },
  dayContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    gap: 2,
    padding: 14,
  },
  daySelected: {
    backgroundColor: '#DE483A',
    borderRadius: 12,
  },
  daySelectedText: {
    color: '#FFFFFF',
  },
  dayText: {
    fontFamily: 'BricolageGrotesqueBold',
    fontSize: 18,
    textAlign: 'center',
  },
  weekdaySelectedText: {
    color: '#FFFFFF',
  },
  weekdayText: {
    fontFamily: 'BricolageGrotesqueRegular',
    fontSize: 12,
    textAlign: 'center',
    textTransform: 'uppercase',
    width: '100%',
  },
});
