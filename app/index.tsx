import { api } from '@/convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';
import { Redirect } from 'expo-router';

export default function Index() {
  const tasks = useQuery(api.tasks.get);
  const createTask = useMutation(api.tasks.create);

  return <Redirect href={'/sign-in'} />;
}
