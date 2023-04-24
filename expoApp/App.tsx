import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, View } from "react-native";
import { NativeBaseProvider } from "native-base";

import ICD1 from "./src/Projects/ImageCalcification/demo1/ICD1";
import ICD2 from "./src/Projects/ImageCalcification/demo2/ICD2";

export default function App() {
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <ICD2 />
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
