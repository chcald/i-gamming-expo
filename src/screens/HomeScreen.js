import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import * as data from "../assets/teams.json";
import Autocomplete from "react-native-autocomplete-input";
import TextInputTeam from "../components/TextInputTeam";
import RenderItemTeam from "../components/RenderItemTeam";
import { backgroundColor, textColors } from "../style/colors";

const HomeScreen = () => {
  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [selectedValue, setSelectedValue] = useState({});
  const [placeholder, setPlaceholder] = useState("Enter the team name");

  const navigation = useNavigation();

  useEffect(() => {
    setTeams(data?.teams);
  }, []);

  const findFootballTeam = (query) => {
    if (query) {
      // Making a case insensitive regular expression
      const regex = new RegExp(`${query.trim()}`, "i");
      // Setting the filtered team array according the query
      setFilteredTeams(
        teams?.filter((team) => team?.team_name.search(regex) >= 0)
      );
    } else {
      // If the query is null then return blank
      setFilteredTeams([]);
    }
  };

  const onPressTeam = (item) => {
    setSelectedValue(item);
    setFilteredTeams([]);

    navigation.navigate({
      name: "ResultScreen",
      params: {
        team: item,
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
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
          data={filteredTeams}
          // Default value if you want to set something in input
          defaultValue={
            JSON.stringify(selectedValue) === "{}"
              ? ""
              : selectedValue.team_name
          }
          // Onchange of the text changing the state of the query
          // Which will trigger the findFootballTeam method
          // To show the suggestions
          onChangeText={(text) => findFootballTeam(text)}
          flatListProps={{
            keyExtractor: (_, idx) => idx.toString(),
            renderItem: ({ item }) => (
              <RenderItemTeam onPress={onPressTeam} item={item} />
            ),
          }}
          renderTextInput={(props) => <TextInputTeam {...props} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: backgroundColor.primary,
  },
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
