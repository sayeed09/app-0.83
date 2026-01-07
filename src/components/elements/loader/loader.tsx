import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Loader = (): React.ReactElement => (
  <SafeAreaView style={styles.container}>
    <ActivityIndicator animating size="large" color="#006e5a" />
  </SafeAreaView>
);

export default Loader;
