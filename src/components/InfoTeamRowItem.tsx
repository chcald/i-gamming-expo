import { View, Text, Image, StyleSheet } from "react-native";
import { textColors } from "../style/colors";

type InfoTeamRowItemProps = {
  label: string;
  value: string;
  isImage?: boolean;
};

const InfoTeamRowItem = ({ label, value, isImage }: InfoTeamRowItemProps) => {
  return (
    <View style={styles.rowsContainer}>
      <Text style={styles.infoLabel}>{label}</Text>
      {isImage ? (
        <View>
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
    color: textColors.primary,
  },
  infoValue: {
    fontSize: 16,
    color: textColors.primary,
    fontWeight: "bold",
  },
  infoBadgeImage: {
    width: 40,
    height: 40,
    marginTop: -20,
  },
});

export default InfoTeamRowItem;
