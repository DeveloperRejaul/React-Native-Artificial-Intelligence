import "react-native-gesture-handler";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as tf from "@tensorflow/tfjs";
import { fetch, decodeJpeg } from "@tensorflow/tfjs-react-native";
import * as mobilenet from "@tensorflow-models/mobilenet";

export default function App() {
  const [isTfReady, setIsTfReady] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);
  const [result, setResult] = useState("");
  const image = useRef(null);

  useEffect(() => {
    const load = async () => {
      try {
        // Load tensorflow and mobilenet
        await tf.ready();
        setIsTfReady(true);
        const model = await mobilenet.load();
        setIsModelReady(true);

        // Start inference and show result.
        const image1 = require("./src/assist/img/basketball.jpg");
        const image3 = require("./src/assist/img/rejaul-photo.jpg");
        const image2 = require("./src/assist/img/rejaul-03.jpg");
        const image5 = require("./src/assist/img/Rejaul-Internet.jpg");
        const image4 = require("./src/assist/img/AbuBakkar.jpg");

        const imageAssetPath = Image.resolveAssetSource(image5);
        const response = await fetch(
          imageAssetPath.uri,
          {},
          { isBinary: true }
        );
        const imageDataArrayBuffer = await response.arrayBuffer();
        const imageData = new Uint8Array(imageDataArrayBuffer);
        const imageTensor = decodeJpeg(imageData);
        const prediction = await model.classify(imageTensor);
        if (prediction && prediction.length > 0) {
          setResult(
            `${prediction[0].className} (${prediction[0].probability.toFixed(
              3
            )})`
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    load();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{!isTfReady ? "tf is Loading..." : "Loaded"}</Text>
      <Text>{!isModelReady ? "Model is Loading..." : "Loaded"}</Text>
      {isTfReady && result === "" && <Text>Classifying...</Text>}
      {result !== "" && <Text>{result}</Text>}
      <Text>Hello World</Text>
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
