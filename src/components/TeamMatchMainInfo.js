import { View, Text, Image, StyleSheet } from "react-native";
import { backgroundColor, textColors } from "../style/colors";

const TeamMatchMainInfo = ({
  match_hometeam_name,
  team_home_badge,
  match_awayteam_name,
  team_away_badge,
  league_logo,
  country_logo,
  league_name,
  country_name,
}) => {
  return (
    <>
      <View style={styles.matchTeamsContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.textItem}>{match_hometeam_name}</Text>
          <Image
            style={styles.teamLogoImage}
            source={{
              uri: team_home_badge,
            }}
          />
        </View>
        <Text style={styles.textItem}>vs</Text>
        <View style={styles.rowContainer}>
          <Text style={styles.textItem}>{match_awayteam_name}</Text>
          <Image
            style={styles.teamLogoImage}
            source={{
              uri: team_away_badge,
            }}
          />
        </View>
      </View>
      <View style={styles.rowContainer}>
        <Image
          style={styles.leagueLogoImage}
          source={{
            uri: league_logo,
          }}
        />
        <Text style={styles.textItem}>{league_name}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Image
          style={styles.flagLogoImage}
          source={{
            uri: country_logo,
          }}
        />
        <Text style={styles.textItem}>{country_name}</Text>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  matchTeamsContainer: {
    paddingVertical: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: backgroundColor.secondary,
  },
  rowContainer: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
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
    marginTop: -6,
    resizeMode: "stretch",
  },
  teamLogoImage: {
    width: 30,
    height: 30,
    resizeMode: "stretch",
  },
  textItem: {
    padding: 10,
    fontSize: 18,
    textAlign: "center",
    color: textColors.primary,
  },
});

export default TeamMatchMainInfo;
