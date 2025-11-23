import React from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useAuth, useUser } from '@clerk/clerk-expo';

export default function DailyTasks() {
  const { signOut } = useAuth();
  const { user } = useUser();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <View style={styles.container}>
      <Text>Daily Tasks</Text>
      <Text>{user?.emailAddresses[0].emailAddress}</Text>
      <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  signOutButton: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
  },
});
