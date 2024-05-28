import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { NormalAppBar } from "../../components/header/normal-app-bar";
import { Image } from "expo-image";
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Colors } from "../../constants/colors";

const ProductDetailScreen = () => {
  const scale = useSharedValue<number>(1);
  const background = useSharedValue<number>(1);
  const buttonY = useSharedValue<number>(100);
  const [finished, setFinished] = React.useState<boolean>(false);

  const handlePress = () => {
    if (!finished) {
      scale.value = withSpring(4, {}, () => {
        runOnJS(setFinished)(true);
      });
      buttonY.value = withSpring(0);
      background.value = withTiming(0, { duration: 1000 });
    } else {
      scale.value = withSpring(1, {}, () => {
        runOnJS(setFinished)(false);
      });
      buttonY.value = withSpring(100);
      background.value = withTiming(1, { duration: 1000 });
    }
  };

  const bottomStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: buttonY.value }],
  }));

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedBox = useAnimatedStyle(() => ({
    height: scale.value * 50,
  }));

  const backgroundStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      background.value,
      [0, 1],
      ["rgba(0,0,0,0.5)", "white"]
    ),
  }));

  return (
    <>
      <NormalAppBar title="A" />
      <Animated.View style={[styles.container, backgroundStyle]}>
        <Animated.View style={animatedBox} />
        <Animated.View style={[animatedStyle]}>
          <TouchableOpacity onPress={handlePress}>
            <Image
              source={
                "https://images.pexels.com/photos/23169741/pexels-photo-23169741/free-photo-of-a-green-plant-growing-on-a-wall.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              }
              style={styles.image}
            />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={animatedBox} />
        <Animated.Text>БАЛАЙ@2</Animated.Text>
      </Animated.View>
      <Animated.View style={[styles.buttonContainer, bottomStyle]}>
        <Button title="GOLD" color={"red"} />
        <Button title="DIGG" color={"blue"} />
      </Animated.View>
    </>
  );
};

export { ProductDetailScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 80,
    height: 80,
    alignSelf: "center",
    borderRadius: 10,
  },
  h50: {
    height: 50,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 50,
    backgroundColor: Colors.black75,
    paddingBottom: 50,
  },
});
