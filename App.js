import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>The Great Ace Attorney Chronicles</Text>
      <Text style={styles.h2}>player achievements</Text>
    </View>
  );
}

const colours = {
  blue: '#0d1725',
  gold: '#c7ba7a',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },

  h1: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colours.gold,
    textAlign: 'center',
  },

  h2: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
});
