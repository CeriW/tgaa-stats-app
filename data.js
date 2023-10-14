const steamGameID = 1158850;

const apiAddresses = {
  achievementNames: `https://corsproxy.io/?https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v0002/?key=5D11ACA4E02BD8C39DE0125B15906AA2&appid=${steamGameID}&l=english&format=json`,
  achievementPercentages: `https://corsproxy.io/?https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=${steamGameID}&format=json`,
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

  return mergeArrays(info.game.availableGameStats.achievements, percentages.achievementpercentages.achievements);
};

// Merge the two returned arrays according to their name properties.
// The Steam API does not return the achievements in the same order for both calls.
const mergeArrays = (array1, array2) => {
  const mergedArray = [];

  // Create a map from array2 for faster lookup
  const map = new Map();
  array2.forEach((item) => {
    map.set(item.name, item.percent);
  });

  // Merge array1 with values from array2 based on matching 'name'
  array1.forEach((item1) => {
    const item2Percent = map.get(item1.name);
    if (item2Percent !== undefined) {
      mergedArray.push({
        ...item1,
        percent: item2Percent,
      });
    } else {
      mergedArray.push(item1);
    }
  });

  return mergedArray;
};
