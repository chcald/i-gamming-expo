import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";

const RenderItemTeam = ({ onPress, item, isLast }) => {
  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View
        style={[
          styles.itemContainer,
          isLast && styles.itemBorderBottom,
        ]}
      >
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
    backgroundColor: "#303030",
  },
  itemBorderBottom: {
    borderBottomColor: "#575757",
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 17,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
    padding: 8,
    color: "white",
  },
  itemImageContainer: {
    borderRadius: 5,
    padding: 5,
    backgroundColor: "white",
  },
  itemImage: {
    width: 30,
    height: 30,
    resizeMode: "stretch",
  },
});

export default RenderItemTeam;
