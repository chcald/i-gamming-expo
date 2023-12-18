import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";

import InfoDivider from "../components/InfoDivider";
import TeamDescription from "../components/TeamDescription";

import * as data from "../assets/matches.json";
import InfoTeamRowItem from "../components/InfoTeamRowItem";
import { backgroundColor, textColors } from "../style/colors";

const ResultScreen = ({ route }) => {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);

  const { team } = route.params;
  useEffect(() => {
    setMatches(data.matches);
  }, []);

  useEffect(() => {
    setFilteredMatches(
      matches.filter((value) => value.team_key === team.team_key)
    );
  }, [matches, team]);

  return (
    <ScrollView style={styles.scrollViewContainer}>
      <View style={styles.container}>
        {filteredMatches.map((item, index) => (
          <View key={index} style={styles.matchContainer}>
            <View style={styles.rowContainer}>
              <Image
                style={styles.flagLogoImage}
                source={{
                  uri: item.country_logo,
                }}
              />
              <Text style={styles.textItem}>{item.country_name}</Text>
            </View>
            <View style={styles.rowContainer}>
              <Image
                style={styles.leagueLogoImage}
                source={{
                  uri: item.league_logo,
                }}
              />
              <Text style={styles.textItem}>{item.league_name}</Text>
            </View>
            <View style={styles.rowContainer}>
              <Image
                style={styles.teamLogoImage}
                source={{
                  uri: item.team_home_badge,
                }}
              />
              <Text style={styles.textItem}>vs</Text>
              <Image
                style={styles.teamLogoImage}
                source={{
                  uri: item.team_away_badge,
                }}
              />
            </View>
            <InfoTeamRowItem label={"Time:"} value={item.match_time} />
            <InfoTeamRowItem label={"Date:"} value={item.match_date} />

            <InfoDivider size={5} />
          </View>
        ))}
        {filteredMatches.length === 0 && (
          <Text style={styles.textMessage}>No Matches Found</Text>
        )}
        <InfoDivider size={2} />
        <TeamDescription team={team} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: backgroundColor.primary,
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    paddingTop: 100,
    justifyContent: "center",
    backgroundColor: backgroundColor.primary,
  },
  matchContainer: {
    flex: 1,
    marginBottom: 30,
    width: "100%",
  },
  rowContainer: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  textItem: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: textColors.primary,
  },
  textMessage: {
    paddingVertical: 30,
    fontSize: 20,
    color: textColors.primary,
    textAlign: "center",
  },
  flagLogoImage: {
    width: 20,
    height: 15,
    marginTop: 14,
    resizeMode: "stretch",
  },
  leagueLogoImage: {
    width: 40,
    height: 35,
    marginTop: -8,
    resizeMode: "stretch",
  },
  teamLogoImage: {
    width: 30,
    height: 30,
    resizeMode: "stretch",
  },
});

export default ResultScreen;
