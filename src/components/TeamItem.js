import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { backgroundColor, textColors } from "../style/colors";

const TeamItem = ({ onPress, item }) => {
  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View style={styles.itemContainer}>
        <View style={styles.itemImageContainer}>
          <Image
            style={styles.itemImage}
            source={{
              uri: item.team_badge,
            }}
          />
        </View>
        <Text style={styles.itemText}>{item.team_name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    gap: 10,
    alignItems: "center",
    backgroundColor: backgroundColor.primary,
    borderBottomColor: backgroundColor.secondary,
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 17,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
    padding: 8,
    color: textColors.primary,
  },
  itemImageContainer: {
    borderRadius: 5,
    padding: 5,
    backgroundColor: backgroundColor.image
  },
  itemImage: {
    width: 30,
    height: 30,
    resizeMode: "stretch"
  },
});

export default TeamItem;
