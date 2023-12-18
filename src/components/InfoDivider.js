import { StyleSheet, View } from "react-native";

const InfoDivider = ({ size }) => {
  return (
    <View style={[styles.container, size && { borderBottomWidth: size }]} />
  );
};
const styles = StyleSheet.create({
  container: {
    borderBottomColor: "#575757",
    borderBottomWidth: 1,
    paddingHorizontal: 5,
    // width: "100%",
  },
});
export default InfoDivider;
