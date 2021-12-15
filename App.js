import React from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import UserNav from './navigation/userNav';
import { AuthProvider } from './storage/authProvider'
const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <AuthProvider>
        <UserNav />
      </AuthProvider>
    </SafeAreaProvider>

  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});