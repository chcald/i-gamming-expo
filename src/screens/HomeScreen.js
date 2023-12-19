import { useState, useEffect, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";

import { StyleSheet, Text, View } from "react-native";

import * as data from "../assets/teams.json";
import Autocomplete from "react-native-autocomplete-input";
import TeamTextInput from "../components/TeamTextInput";
import TeamItem from "../components/TeamItem";
import { backgroundColor, textColors } from "../style/colors";

const HomeScreen = () => {
  const [teams, setTeams] = useState([]);
  const [selectedValue, setSelectedValue] = useState({});
  const [placeholder, setPlaceholder] = useState("Enter the team name");
  const [query, setQuery] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    setTeams(data?.teams);
  }, []);

  const suggestions = useMemo(() => {
    if (query) {
      // Making a case insensitive regular expression
      const regex = new RegExp(`${query.trim()}`, "i");
      
      // Setting the filtered team array according the query
      return teams?.filter((team) => team?.team_name.search(regex) >= 0);
    } else {
      // If the query is null then return blank
      return [];
    }
  }, [query, teams]);

  const onPressTeam = (item) => {
    setSelectedValue(item);

    navigation.navigate({
      name: "ResultScreen",
      params: {
        team: item,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textTitle}>Team:</Text>
      </View>
      <Autocomplete
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.autocompleteStyle}
        placeholder={placeholder}
        onFocus={() => {
          setSelectedValue({});
          setPlaceholder("");
        }}
        containerStyle={styles.autocompleteContainer}
        // Data to show in suggestion
        data={suggestions}
        // Default value if you want to set something in input
        defaultValue={
          Object.keys(selectedValue).length === 0 ? "" : selectedValue.team_name
        }
        // Onchange of the text changing the state of the query
        // Which will trigger the useMemo method
        // To show the suggestions
        onChangeText={setQuery}
        flatListProps={{
          keyExtractor: (_, idx) => idx.toString(),
          renderItem: ({ item }) => (
            <TeamItem onPress={onPressTeam} item={item} />
          ),
        }}
        placeholderTextColor={textColors.primary}
        renderTextInput={(props) => <TeamTextInput {...props} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 40,
    backgroundColor: backgroundColor.primary,
  },
  autocompleteStyle: {
    backgroundColor: backgroundColor.secondary,
    color: textColors.primary,
    fontSize: 18,
    paddingLeft: 10,
    justifyContent: "center",
  },
  textTitle: {
    color: textColors.primary,
    paddingBottom: 5,
    fontSize: 20,
  },
});

export default HomeScreen;
