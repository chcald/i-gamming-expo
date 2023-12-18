import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import * as data from "../assets/teams.json";
import Autocomplete from "react-native-autocomplete-input";
import TextInputTeam from "../components/TextInputTeam";
import RenderItemTeam from "../components/RenderItemTeam";

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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#303030" }}>
      <View style={styles.container}>
        <View>
          <Text style={styles.textTitle}>Team:</Text>
        </View>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          inputContainerStyle={{
            backgroundColor: "#303030",
          }}
          listContainerStyle={{ borderColor:'blue',backgroundColor: "black" }}
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
          placeholderTextColor="white"
          flatListProps={{
            keyExtractor: (_, idx) => idx.toString(),
            renderItem: ({ item, index }) => (
              <RenderItemTeam
                onPress={onPressTeam}
                isLast={filteredTeams?.length !== index + 1}
                item={item}
              />
            ),
          }}
          renderTextInput={(props) => <TextInputTeam {...props} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 40,
    backgroundColor: "#303030",
  },
  autocompleteContainer: {
    backgroundColor: "#303030",
    borderWidth: 0,
  },
  autocompleteStyle: {
    backgroundColor: "#575757",
    color: "white",
    fontSize: 18,
    paddingLeft: 10,
    justifyContent: "center",
  },
  textTitle: {
    color: "white",
    paddingBottom: 5,
    fontSize: 20,
  },
});

export default HomeScreen;
