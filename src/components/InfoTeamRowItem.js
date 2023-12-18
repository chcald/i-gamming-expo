import { View, Text, Image, StyleSheet } from "react-native";

const InfoTeamRowItem = ({ label, value, isImage }) => {
  return (
    <View style={styles.rowsContainer}>
      <Text style={styles.infoLabel}>{label}</Text>
      {isImage ? (
        <View style={styles.infoBadgeImageContainer}>
          <Image
            style={styles.infoBadgeImage}
            source={{
              uri: value,
            }}
          />
        </View>
      ) : (
        <Text style={styles.infoValue}>{value}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rowsContainer: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: "white",
  },
  infoValue: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  infoBadgeImage: {
    width: 40,
    height: 40,
    marginTop: -20,
  },
  infoBadgeImageContainer: {
    textAlign: "center",
  },
});

export default InfoTeamRowItem;
