import React from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';


import MusicPlayer from './component/MusicPlayer';
import Ionicons from 'react-native-vector-icons/Ionicons';
const App=()=>{
  return(
    <View style={styles.container}>
      <StatusBar barStyle="light-content"/>
      <MusicPlayer/>
    </View>
  );
};

export default App;
const styles=StyleSheet.create({
  container:{
    flex: 1,
  },
});