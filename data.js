const steamGameID = 1158850;
const apiKey = '9C744478D34930318FB5C67B3613E409';

const apiAddresses = {
  achievementNames: `http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v0002/?key=${apiKey}&appid=${steamGameID}&l=english&format=json`,
  achievementPercentages: `http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=${steamGameID}&format=json`,
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

export const getFormattedAchievements = async () => {
  const info = await fetchData(apiAddresses.achievementNames);
  const percentages = await fetchData(apiAddresses.achievementPercentages);

  const formattedData = info.game.availableGameStats.achievements.map((item, index) => {
    return { ...item, percent: percentages.achievementpercentages.achievements[index].percent };
  });

  return formattedData;
};
