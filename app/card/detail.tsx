import { Button, Dimensions, StyleSheet, View } from "react-native";
import { memo, useCallback, useRef, useState } from "react";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import Animated from "react-native-reanimated";
import { parallaxLayout } from "./parallax";
import { Image } from "expo-image";
const width = Dimensions.get("window").width;

const PAGE_WIDTH = width / 3;
const ProductDetailScreen = memo(() => {
  const carouselRef = useRef<ICarouselInstance>(null);
  const [data, setData] = useState([
    { image: require("./death.png"), type: "false", _id: "1" },
    { image: require("./lovers.png"), type: "true", _id: "2" },
    { image: require("./death.png"), type: "false", _id: "3" },
    { image: require("./lovers.png"), type: "true", _id: "4" },
    { image: require("./death.png"), type: "false", _id: "5" },
    { image: require("./lovers.png"), type: "true", _id: "6" },
    { image: require("./death.png"), type: "false", _id: "7" },
    { image: require("./lovers.png"), type: "true", _id: "8" },
  ]);
  console.log(data);
  const onRandom = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * data.length);
    carouselRef.current?.scrollTo({
      animated: true,
      count: randomIndex,
      onFinished: () => {
        setTimeout(() => {
          const newData = [...data];
          newData.splice(randomIndex, 1);
          setData(newData);
        }, 500);
      },
    });
  }, [data]);

  return (
    <View style={styles.root}>
      <Carousel
        ref={carouselRef}
        style={{
          width,
          height: 240,
          justifyContent: "center",
          alignItems: "center",
        }}
        width={PAGE_WIDTH}
        data={data}
        renderItem={({ item, index, animationValue }) => {
          return (
            <CustomItem
              key={index}
              source={item}
              animationValue={animationValue}
            />
          );
        }}
        customAnimation={parallaxLayout(
          {
            size: PAGE_WIDTH,
            vertical: false,
          },
          {
            parallaxScrollingScale: 1,
            parallaxScrollingOffset: 70,
            parallaxAdjacentItemScale: 0.5,
          }
        )}
        scrollAnimationDuration={1200}
      />
      <Button title="SEE" onPress={onRandom} />
    </View>
  );
});

interface ItemProps {
  source: { image: string; _id: string; type: string };
  animationValue: Animated.SharedValue<number>;
}
const CustomItem: React.FC<ItemProps> = ({ source, animationValue }) => {
  return (
    <View
      style={{
        flex: 1,
        borderRadius: 10,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={source.image}
        resizeMode={"contain"}
        style={{ width: "80%", height: "80%" }}
      />
    </View>
  );
};

ProductDetailScreen.displayName = "ProductDetailScreen";

export { ProductDetailScreen };

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
