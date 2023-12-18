import { useRef } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";

const TextInputTeam = (props) => {
  const inputRef = useRef();

  return (
    <View style={styles.searchSection}>
      <Icon style={styles.searchIcon} name="search" size={20} color="white" />
      <TextInput
        {...props}
        ref={inputRef}
        underlineColorAndroid="transparent"
      />
      <Icon
        onPress={() => {
          inputRef.current.clear();
          inputRef.current.focus();
        }}
        style={styles.clearIcon}
        name="times-circle"
        size={25}
        color="white"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: "row",
    backgroundColor: "#575757",
  },
  searchIcon: {
    padding: 10,
    alignSelf: "flex-start",
  },
  clearIcon: {
    flex: 1,
    marginRight: 0,
    padding: 8,
    textAlign: "right",
  },
});

export default TextInputTeam;
