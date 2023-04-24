import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, View } from "react-native";
import ICD1 from "./src/Projects/ImageCalcification/demo1/ICD1";

export default function App() {
  return (
    <View style={styles.container}>
      <ICD1 />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },
});
