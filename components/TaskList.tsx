import React from 'react';

import { FlatList, StyleSheet, View } from 'react-native';

import { TaskItem } from './TaskItem';

export type Task = {
  id: string;
  text: string;
  isCompleted: boolean;
};

type TaskListProps = {
  tasks: Task[];
  onToggleTask?: (id: string) => void;
};

export function TaskList({ onToggleTask, tasks }: TaskListProps) {
  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            id={item.id}
            isCompleted={item.isCompleted}
            text={item.text}
            onToggle={onToggleTask}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    gap: 20,
    marginTop: 24,
    paddingHorizontal: 24,
  },
});
