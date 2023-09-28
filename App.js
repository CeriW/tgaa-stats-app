import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, SafeAreaView, StatusBar, Pressable } from 'react-native';

import { getFormattedAchievements } from './data.js';

export default function App() {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getFormattedAchievements();
        setDataList(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colours.gold} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.h1}>The Great Ace Attorney Chronicles</Text>
        <Text style={styles.h2}>player achievements</Text>
        <AchievementList dataList={dataList} />
      </ScrollView>
    </SafeAreaView>
  );
}

const AchievementList = ({ dataList }) => {
  return (
    <View style={{ paddingTop: 30, paddingBottom: 30 }}>
      {dataList.map((item, index) => (
        <AchievementCard key={index} achievement={item} />
      ))}
    </View>
  );
};

const AchievementCard = ({ achievement }) => {
  const isHidden = achievement.hidden > 0;
  const [showAchievement, toggleHiddenAchievement] = useState(!isHidden);

  const displayStyle = showAchievement ? null : { opacity: 0.25 };

  const toggleCard = () => {
    const toggle = isHidden ? !showAchievement : true;
    toggleHiddenAchievement(toggle);
  };

  return (
    <Pressable onPress={toggleCard}>
      <View style={styles.achievementCard}>
        <Image src={achievement.icon} style={{ width: 50, height: 50, ...displayStyle }} />
        <View style={{ flexShrink: 1, flexGrow: 1 }}>
          <Text style={(styles.text, styles.h3)}>
            {showAchievement ? achievement.displayName : 'Hidden achievement'}
          </Text>
          <Text style={styles.text}>{showAchievement ? achievement.description : 'Click to reveal'}</Text>
        </View>
        <Text style={(styles.text, styles.percentMarker)}>{Math.round(achievement.percent)}%</Text>
      </View>
    </Pressable>
  );
};

const colours = {
  blue: '#0d1725',
  gold: '#c7ba7a',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.blue,
    paddingLeft: 10,
    paddingRight: 10,
  },
  h1: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colours.gold,
    textAlign: 'center',
    paddingTop: 30,
  },
  h2: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  h3: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colours.gold,
  },
  achievementCard: {
    backgroundColor: '#000',
    color: 'red',
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderRadius: 7,
  },
  text: {
    color: '#fff',
  },
  percentMarker: {
    fontSize: 25,
    fontWeight: 'bold',
    backgroundColor: colours.gold,
    padding: 5,
    borderRadius: 5,
  },
});
