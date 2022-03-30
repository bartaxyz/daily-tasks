import { useEffect, useState } from "react";
import { Animated, View } from "react-native";
import { useNavigationState } from "@react-navigation/native";
import { Button, Section, Typography } from "../../components";
import { useTasks } from "../../db/useTasks";
import { TAB_BAR_ANIMATION_DURATION } from "./TabBar";

export const StatusBar = () => {
  const {} = useTasks();
  const [maxHeight, setMaxHeight] = useState(0);
  const [animatedValue] = useState(new Animated.Value(0));

  const navigationState = useNavigationState((state) => state);

  useEffect(() => {
    const homeRouteState = navigationState.routes.find(
      (route) => route.name === "Home"
    )?.state;

    const isStatusBarVisible =
      homeRouteState?.routes.findIndex((route) => route.name === "Today") ===
      homeRouteState?.index;

    if (isStatusBarVisible) {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: TAB_BAR_ANIMATION_DURATION,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: TAB_BAR_ANIMATION_DURATION,
        useNativeDriver: false,
      }).start();
    }
  }, [navigationState]);

  return (
    <Animated.View
      style={{
        maxHeight: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, maxHeight],
        }),
        overflow: "hidden",
      }}
    >
      <View
        onLayout={(event) => {
          const height = event.nativeEvent.layout.height;
          if (maxHeight < height) {
            setMaxHeight(height);
          }
        }}
      >
        <Section separator="top" hasBackground={false}>
          <Section.Content inset="S">
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography.Body>Ready to finish your day?</Typography.Body>
              <Button onPress={() => {}}>Finish Today</Button>
            </View>
          </Section.Content>
        </Section>
      </View>
    </Animated.View>
  );
};
