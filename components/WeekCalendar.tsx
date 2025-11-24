import { useCallback, useMemo, useRef, useState } from 'react';

import { Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native';

import { getStartOfWeekForIndex, getStartOfWeekUTC } from '@/utils/week';

import WeekView from './WeekView';

type WeekCalendarProps = {
  value: Date;
  onChangeValue: (value: Date) => void;
  onWeekChange?: (startOfWeek: Date) => void;
};

const SCREEN_WIDTH = Dimensions.get('window').width;
const TOTAL_WEEKS = 520;
const CENTER_INDEX = Math.floor(TOTAL_WEEKS / 2);

const today = new Date();
const baseStartOfWeek = getStartOfWeekUTC(today);

function WeekCalendar({ onChangeValue, onWeekChange, value }: WeekCalendarProps) {
  const listRef = useRef<FlatList<number>>(null);

  const [currentIndex, setCurrentIndex] = useState<number>(CENTER_INDEX);

  const data = useMemo(() => Array.from({ length: TOTAL_WEEKS }, (_, i) => i - CENTER_INDEX), []);

  const getStartOfWeekByListIndex = useCallback(
    (listIndex: number) => {
      const offset = data[listIndex];
      return getStartOfWeekForIndex(baseStartOfWeek, offset);
    },
    [data],
  );

  const handleMomentumEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = e.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / SCREEN_WIDTH);

      if (index !== currentIndex) {
        setCurrentIndex(index);
        const startOfWeek = getStartOfWeekByListIndex(index);
        onWeekChange?.(startOfWeek);
      }
    },
    [currentIndex, getStartOfWeekByListIndex, onWeekChange],
  );

  const renderItem = useCallback(
    ({ index, item }: { item: number; index: number }) => {
      const startOfWeek = getStartOfWeekForIndex(baseStartOfWeek, item);
      return (
        <View style={{ width: SCREEN_WIDTH }}>
          <WeekView startOfWeek={startOfWeek} selectedDate={value} onSelectDay={onChangeValue} />
        </View>
      );
    },
    [baseStartOfWeek, value, onChangeValue],
  );

  return (
    <FlatList
      ref={listRef}
      data={data}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.toString()}
      getItemLayout={(_, index) => ({ index, length: SCREEN_WIDTH, offset: SCREEN_WIDTH * index })}
      initialScrollIndex={CENTER_INDEX}
      renderItem={renderItem}
      onMomentumScrollEnd={handleMomentumEnd}
    />
  );
}

export { WeekCalendar };
