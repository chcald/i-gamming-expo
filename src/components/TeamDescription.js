import { View, Text, StyleSheet } from "react-native";
import InfoTeamRowItem from "./InfoTeamRowItem";
import { backgroundColor, textColors } from "../style/colors";

const TeamDescription = ({ team }) => {
  const { team_name, team_country, team_founded, team_badge } = team;

  return (
    <View style={styles.descriptionContainer}>
      <Text style={styles.textTitle}>Info Team: </Text>
      <InfoTeamRowItem label={"Team:"} value={team_name} />
      <InfoTeamRowItem label={"Country:"} value={team_country} />
      <InfoTeamRowItem label={"Badge:"} value={team_badge} isImage />
      <InfoTeamRowItem label={"Founded:"} value={team_founded} />
    </View>
  );
};

const styles = StyleSheet.create({
  descriptionContainer: {
    flex: 1,
    paddingTop: 20,
    width: "100%",
    backgroundColor: backgroundColor.primary,
  },
  textTitle: {
    paddingVertical: 30,
    fontSize: 20,
    color: textColors.primary,
    textAlign: "center",
  },
});

export default TeamDescription;
