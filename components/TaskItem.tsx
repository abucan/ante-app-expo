import React from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type TaskItemProps = {
  id: string;
  text: string;
  isCompleted: boolean;
  onToggle?: (id: string) => void;
};

export function TaskItem({ id, isCompleted, onToggle, text }: TaskItemProps) {
  return (
    <TouchableOpacity
      style={[styles.container, isCompleted && styles.completed]}
      onPress={() => onToggle?.(id)}
      activeOpacity={0.7}
    >
      <View style={styles.container}>
        <View style={styles.checkbox} />
        <View>
          <Text style={styles.text}>{text}</Text>
          <Text style={styles.description}>{text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    borderColor: '#CCCCCC',
    borderRadius: 48,
    borderWidth: 2,
    height: 20,
    width: 20,
  },
  completed: {
    opacity: 0.6,
  },
  container: {
    alignItems: 'flex-start',
    backgroundColor: 'smokewhite',
    borderColor: '#E0E0E0',
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  description: {
    color: '#666666',
    fontSize: 12,
  },
  text: {
    fontSize: 16,
  },
});
