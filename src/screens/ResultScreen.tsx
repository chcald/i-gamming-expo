import { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import InfoDivider from "../components/InfoDivider";
import TeamDescription from "../components/TeamDescription";
import InfoTeamRowItem from "../components/InfoTeamRowItem";
import TeamMatchMainInfo from "../components/TeamMatchMainInfo";

import * as data from "../assets/matches.json";

type Matches = {
  match_id?: string;
  country_id?: string;
  country_name?: string;
  team_key?: string;
  league_id?: string;
  league_name?: string;
  match_date?: string;
  match_time?: string;
  match_hometeam_name?: string;
  match_awayteam_name?: string;
  match_stadium?: string;
  match_referee?: string;
  team_home_badge?: string;
  team_away_badge?: string;
  league_logo?: string;
  country_logo?: string;
  league_year?: string;
  score?: string;
  goalscorer?: GoalScorer[];
};

type GoalScorer = {
  time?: string;
  home_scorer?: string;
  home_assist?: string;
  score?: string;
  away_scorer?: string;
  away_assist?: string;
};

import { backgroundColor, textColors } from "../style/colors";
import { Team } from "./HomeScreen";

const ResultScreen = ({ route }) => {
  const [matches, setMatches] = useState<Array<Matches>>([]);
  const [filteredMatches, setFilteredMatches] = useState<Array<Matches>>([]);

  const { team }: { team: Team } = route.params;
  useEffect(() => setMatches(data.matches), []);

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
            <TeamMatchMainInfo
              match_hometeam_name={item.match_hometeam_name}
              team_home_badge={item.team_home_badge}
              match_awayteam_name={item.match_awayteam_name}
              team_away_badge={item.team_away_badge}
              league_logo={item.league_logo}
              country_logo={item.country_logo}
              league_name={item.league_name}
              country_name={item.country_name}
            />
            <InfoDivider />
            <InfoTeamRowItem label={"Time:"} value={item.match_time} />
            <InfoTeamRowItem label={"Date:"} value={item.match_date} />
            <InfoTeamRowItem label={"League year:"} value={item.league_year} />
            <InfoTeamRowItem label={"Referee:"} value={item.match_referee} />
            <InfoTeamRowItem
              label={"Match place:"}
              value={item.match_stadium}
            />
            <InfoDivider />
            <Text style={styles.textItem}>Goal Scorer</Text>
            {item.goalscorer.map((gs, index) => (
              <View key={index}>
                <InfoTeamRowItem
                  label={"Home Scorer:"}
                  value={gs.home_scorer || "no info"}
                />
                <InfoTeamRowItem
                  label={"Home Assist:"}
                  value={gs.home_assist || "no info"}
                />
                <InfoTeamRowItem
                  label={"Away Assist:"}
                  value={gs.away_assist || "no info"}
                />
                <InfoTeamRowItem
                  label={"Away Scorer:"}
                  value={gs.away_scorer || "no info"}
                />
                <InfoTeamRowItem
                  label={"Score:"}
                  value={gs.score || "no info"}
                />
                <InfoTeamRowItem label={"Time:"} value={`${gs.time}'`} />
                <InfoDivider />
              </View>
            ))}
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
  textItem: {
    padding: 10,
    fontSize: 18,
    textAlign: "center",
    color: textColors.primary,
  },
  textMessage: {
    paddingVertical: 30,
    fontSize: 20,
    color: textColors.primary,
    textAlign: "center",
  },
});

export default ResultScreen;
