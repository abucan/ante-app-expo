import { Redirect } from 'expo-router';

import { useAuth } from '@clerk/clerk-expo';

export default function Index() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={'/daily-tasks'} />;
  }
  return <Redirect href={'/sign-in'} />;
}
