import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

export default function Finances() {
  return (
    <View style={styles.container}>
      <Text>Finances</Text>
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
