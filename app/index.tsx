import { api } from '@/convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';
import { Button, Text, View } from 'react-native';

export default function Index() {
  const tasks = useQuery(api.tasks.get);
  const createTask = useMutation(api.tasks.create);

  const handleCreateTask = () => {
    createTask({ text: 'New Task' });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {tasks?.map(({ _id, text }) => (
        <Text key={_id}>{text}</Text>
      ))}
      <Button title='Create Task' onPress={handleCreateTask} />
    </View>
  );
}
