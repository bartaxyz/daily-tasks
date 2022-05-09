import React, { useEffect, useState } from "react";
import { Animated, Platform, View } from "react-native";
import { useNavigationState } from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import { Button, KeyboardKey, Section, Typography } from "../../components";
import { useData } from "../../db/DataProvider";
import { useStatusBar } from "../../utils/providers/StatusBarProvider";
import { TAB_BAR_ANIMATION_DURATION } from "./TabBar";
import { useFinishModal } from "./FinishModal/FinishProvider";

const MIN_HEIGHT = 38;

export const StatusBar = () => {
  const { keyboardShortcuts } = useStatusBar();

  const { todayTasks } = useData();
  const { showFinishModal } = useFinishModal();
  const [maxHeight, setMaxHeight] = useState(MIN_HEIGHT);
  const [animatedValue] = useState(new Animated.Value(0));

  const { colors } = useTheme();

  const navigationState = useNavigationState((state) => state);

  useEffect(() => {
    const homeRouteState = navigationState.routes.find(
      (route) => route.name === "Home"
    )?.state;

    const isStatusBarVisible =
      keyboardShortcuts.length !== 0 ||
      Platform.select({
        web:
          homeRouteState?.routes.findIndex(
            (route) => route.name === "Today"
          ) === homeRouteState?.index &&
          todayTasks.filter((task) => task.status !== "done").length > 0,
        default: true,
      });

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
  }, [navigationState, todayTasks, keyboardShortcuts]);

  const onFinishToday = () => {
    showFinishModal({
      mode: "today",
      tasks: todayTasks,
    });
  };

  return (
    <Animated.View
      style={{
        height: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, maxHeight],
        }),
        overflow: "hidden",
      }}
    >
      <View
        style={{ height: "100%", flex: 1 }}
        /* onLayout={(event) => {
          const height = event.nativeEvent.layout.height;
          if (maxHeight < height) {
            setMaxHeight(height);
          }
        }} */
      >
        <Section separator="top" hasBackground={false} style={{ flex: 1 }}>
          <Section.Content inset="XS" style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "nowrap",
                flex: 1,
              }}
            >
              {keyboardShortcuts.length !== 0 ? (
                <View
                  style={{
                    flexGrow: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    flexWrap: "nowrap",
                    flex: 1,
                  }}
                >
                  {keyboardShortcuts.map(
                    ({ prefix, combination, suffix }, index, arr) => (
                      <React.Fragment key={index}>
                        <Typography.Caption
                          fontSize={10}
                          style={{
                            marginLeft: index === 0 ? 0 : 8,
                            marginRight: index === arr.length - 1 ? 0 : 8,
                            flexWrap: "nowrap",
                          }}
                          key={index}
                        >
                          {prefix}
                          {prefix && " "}
                          {combination.map((key) => (
                            <KeyboardKey key={key}>{key}</KeyboardKey>
                          ))}
                          {suffix && " "}
                          {suffix}
                        </Typography.Caption>

                        {index !== arr.length - 1 && (
                          <View
                            style={{
                              width: 1,
                              height: 16,
                              backgroundColor: colors.section.separator,
                            }}
                          />
                        )}
                      </React.Fragment>
                    )
                  )}
                  {/* <Typography.Caption style={{ marginRight: 24 }}>
                    + <KeyboardKey>backspace</KeyboardKey> to remove task
                  </Typography.Caption>

                  <Typography.Caption style={{ marginRight: 24 }}>
                    + <KeyboardKey>space</KeyboardKey> to mark as done
                  </Typography.Caption> */}
                </View>
              ) : (
                <React.Fragment>
                  <Typography.Body>Ready to finish your day?</Typography.Body>
                </React.Fragment>
              )}

              {keyboardShortcuts.length < 2 && (
                <View style={{ marginLeft: 64 }}>
                  <Button onPress={onFinishToday}>Finish Today</Button>
                </View>
              )}
            </View>
          </Section.Content>
        </Section>
      </View>
    </Animated.View>
  );
};
