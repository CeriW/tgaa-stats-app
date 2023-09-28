import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, SafeAreaView, StatusBar } from 'react-native';

export default function App() {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await formatAchievements();
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
        {/* <Text style={{ color: '#fff' }}>{JSON.stringify(dataList)}</Text> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const steamGameID = 1158850;
const apiKey = '9C744478D34930318FB5C67B3613E409';

const apiAddresses = {
  achievementNames: `https://corsproxy.io/?http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v0002/?key=${apiKey}&appid=${steamGameID}&l=english&format=json`,
  achievementPercentages: `https://corsproxy.io/?http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=${steamGameID}&format=json`,
};

async function fetchData(apiUrl) {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

const formatAchievements = async () => {
  const info = await fetchData(apiAddresses.achievementNames);
  const percentages = await fetchData(apiAddresses.achievementPercentages);

  const formattedData = info.game.availableGameStats.achievements.map((item, index) => {
    return { ...item, percent: percentages.achievementpercentages.achievements[index].percent };
  });

  return formattedData;
};

const AchievementList = ({ dataList }) => {
  return (
    <View style={{ paddingTop: 30 }}>
      {dataList.map((item, index) => (
        <AchievementCard key={index} achievement={item} />
      ))}
    </View>
  );
};

const AchievementCard = ({ achievement }) => {
  // const isHidden = (achievement.hidden > 0).toString();

  const backgroundPie = `linear-gradient(red 0%, red ${Math.round(achievement.percent)}%, green ${Math.round(
    achievement.percent
  )}%, green 100%)`;
  console.log(backgroundPie);

  return (
    <View style={styles.achievementCard}>
      <Image src={achievement.icon} style={{ width: 50, height: 50 }} />
      <View style={{ flexShrink: 1, flexGrow: 1 }}>
        <Text style={(styles.text, styles.h3)}>{achievement.displayName}</Text>
        <Text style={styles.text}>{achievement.description}</Text>
      </View>
      <Text style={(styles.text, styles.percentMarker)}>{Math.round(achievement.percent)}%</Text>
    </View>
  );
};

const colours = {
  blue: '#0d1725',
  gold: '#c7ba7a',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.blue,
    padding: 10,
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
