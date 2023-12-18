import { StyleSheet, View } from "react-native";
import { backgroundColor } from "../style/colors";

const InfoDivider = ({ size }) => {
  return (
    <View style={[styles.container, size && { borderBottomWidth: size }]} />
  );
};
const styles = StyleSheet.create({
  container: {
    borderBottomColor: backgroundColor.secondary,
    borderBottomWidth: 1,
    paddingHorizontal: 5
  },
});
export default InfoDivider;
