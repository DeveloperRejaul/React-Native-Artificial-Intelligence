import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  Avatar,
  Button,
  HStack,
  Pressable,
  Stack,
  VStack,
  Text,
  Spinner,
  Heading,
  useToast,
} from "native-base";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { AntDesign } from "@expo/vector-icons";
import * as tf from "@tensorflow/tfjs";
import { fetch, decodeJpeg } from "@tensorflow/tfjs-react-native";
import * as mobilenet from "@tensorflow-models/mobilenet";
import { IMAGE1, IMAGE2 } from "./constences";

const ICD2 = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [fill, setFill] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const toast = useToast();

  const imageClassify = async () => {
    try {
      setLoading(true);
      // Load tensor and model
      await tf.ready();
      const model = await mobilenet.load();

      setLoading(false);
      toast.show({
        title: "Successful ",
        placement: "top",
        bg: "primary.600",
        color: "white",
      });
    } catch (error) {
      // !error Log here
      setError(true);
      toast.show({
        title: "Error ochre ",
        placement: "top",
        bg: "error.400",
        color: "white",
      });
      console.log("🚀 ~ file: ICD2.js:23 ~ imageClassify ~ error:", error);
    }
  };

  const pickImage = async (imageNumber) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      imageNumber === IMAGE1 && setImage1(result.assets[0].uri);
      imageNumber === IMAGE2 && setImage2(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <View>
      <HStack justifyContent={"center"} alignItems={"center"} space={3}>
        <Pressable onPress={() => pickImage(IMAGE1)}>
          <Avatar
            size="100"
            bg="green.500"
            source={{
              uri: image1,
            }}
          >
            Image 1
          </Avatar>
        </Pressable>
        <AntDesign name="retweet" size={30} color="#00d10a" />
        <Pressable onPress={() => pickImage(IMAGE2)}>
          <Avatar
            size="100"
            bg="green.500"
            source={{
              uri: image2,
            }}
          >
            Image 2
          </Avatar>
        </Pressable>
      </HStack>

      <Stack alignItems={"center"} my={5}>
        <AnimatedCircularProgress
          size={120}
          width={15}
          fill={fill}
          tintColor="#00e0ff"
          onAnimationComplete={() => console.log("onAnimationComplete")}
          backgroundColor="#3d5875"
        >
          {(fill) => <Text>{fill}</Text>}
        </AnimatedCircularProgress>
      </Stack>

      <VStack justifyContent={"center"} alignItems={"center"} space={3}>
        {error && <Text color={"error.400"}> Something Wrong.. </Text>}
        <Button w={"80"} onPress={imageClassify}>
          {loading ? (
            <HStack space={2} alignItems="center">
              <Spinner accessibilityLabel="Loading posts" color="emerald.500" />
              <Heading color="primary.500" fontSize="md">
                Loading..
              </Heading>
            </HStack>
          ) : (
            "Compare Image"
          )}
        </Button>
      </VStack>
    </View>
  );
};

export default ICD2;

const styles = StyleSheet.create({});
