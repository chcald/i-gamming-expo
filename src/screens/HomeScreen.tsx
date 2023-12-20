import { useState, useEffect, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, TextInputProps } from "react-native";

import * as data from "../assets/teams.json";
import Autocomplete from "react-native-autocomplete-input";
import TeamTextInput from "../components/TeamTextInput";
import TeamItem from "../components/TeamItem";
import { backgroundColor, textColors } from "../style/colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Routes";

export type Team = {
  team_key?: string;
  team_name?: string;
  team_country?: string;
  team_founded?: string;
  team_badge?: string;
};

export type ResultScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  "ResultScreen"
>;

const HomeScreen = () => {
  const [teams, setTeams] = useState<Array<Team>>([]);
  const [selectedValue, setSelectedValue] = useState<Team>({});
  const [placeholder, setPlaceholder] = useState<string>("Enter the team name");
  const [query, setQuery] = useState<string>("");

  const { navigate } = useNavigation<ResultScreenProps>();

  useEffect(() => {
    return setTeams(data?.teams);
  }, []);

  const suggestions: Array<Team> = useMemo(() => {
    if (query) {
      // Making a case insensitive regular expression
      const regex: RegExp = new RegExp(`${query.trim()}`, "i");

      // Setting the filtered team array according the query
      return teams?.filter((team: Team) => team?.team_name.search(regex) >= 0);
    } else {
      // If the query is null then return blank
      return [];
    }
  }, [query, teams]);

  const onPressTeam = (item: Team) => {
    setSelectedValue(item);

    navigate({
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
          renderItem: ({ item }: { item: Team }) => (
            <TeamItem onPress={() => onPressTeam(item)} item={item} />
          ),
        }}
        placeholderTextColor={textColors.primary}
        renderTextInput={(props: TextInputProps) => (
          <TeamTextInput {...props} />
        )}
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
