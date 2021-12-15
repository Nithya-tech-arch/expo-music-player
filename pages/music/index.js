import React from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import MusicPlayer from '../../component/MusicPlayer';

const Mp3 = () => {
    return (
        <MusicPlayer />
    );
};

export default Mp3;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});