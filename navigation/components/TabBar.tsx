import React, { useEffect, useState } from "react";
import { Animated, Platform, View, Text } from "react-native";
import { useTheme } from "styled-components/native";
import {
  Section,
  Spacer,
  Tabs,
  Tag,
  Toolbar,
  Typography,
} from "../../components";
import { useData } from "../../db/DataProvider";
import { useAuth } from "../../db/useAuth";
import { OverdueSection } from "./OverdueSection";

export const TAB_BAR_ANIMATION_DURATION = 200;

export const TabBar = ({ state, descriptors, navigation, position }: any) => {
  const { user, overdueTasks } = useData();
  const { colors } = useTheme();
  const [animatedValue] = useState(new Animated.Value(0));
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    if (overdueTasks.length > 0 && state.index === 1) {
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
  }, [overdueTasks]);

  const itemsInTabs = state.routes.filter(
    (route: any) => route.name !== "Profile"
  ).length;

  const tabs = state.routes
    .slice(0, itemsInTabs)
    .map((route: any, index: number) => {
      const { options } = descriptors[route.key];

      const label =
        options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
          ? options.title
          : route.name;

      const selected = state.index === index;

      const onPress = () => {
        const event = navigation.emit({
          type: "tabPress",
          target: route.key,
          canPreventDefault: true,
        });

        if (!selected && !event.defaultPrevented) {
          // The `merge: true` option makes sure that the params inside the tab screen are preserved
          navigation.navigate({ name: route.name, merge: true });
        }
      };

      return {
        label,
        onPress,
        selected,
      };
    });

  const onProfilePress = () => {
    navigation.navigate("Profile");
  };

  const versionTag = (
    <View style={{ flexDirection: "row" }}>
      <Toolbar.Button
        style={{ marginRight: 8, marginLeft: 8 }}
        onPress={onProfilePress}
        iconPath="M9.99372 16.2444C13.5533 16.2444 16.4913 13.3064 16.4913 9.75307C16.4913 6.19978 13.547 3.26172 9.98744 3.26172C6.43415 3.26172 3.50237 6.19978 3.50237 9.75307C3.50237 13.3064 6.44042 16.2444 9.99372 16.2444ZM9.99372 11.9252C8.22335 11.9252 6.84849 12.5593 6.18303 13.2875C5.32923 12.3647 4.80817 11.1217 4.80817 9.75307C4.80817 6.87151 7.11216 4.56124 9.98744 4.56124C12.869 4.56124 15.1855 6.87151 15.1918 9.75307C15.1918 11.1217 14.6708 12.3647 13.8107 13.2938C13.1452 12.5593 11.7704 11.9252 9.99372 11.9252ZM9.99372 10.8956C11.2116 10.9082 12.1596 9.86607 12.1596 8.5226C12.1596 7.25446 11.2054 6.1935 9.99372 6.1935C8.78836 6.1935 7.82784 7.25446 7.83412 8.5226C7.84039 9.86607 8.78208 10.8894 9.99372 10.8956Z"
      />
      <Tag>v0.0.2</Tag>
    </View>
  );

  return (
    <View
      style={{
        backgroundColor: Platform.select({
          web: "transparent",
          default: colors.background.default,
        }),
      }}
    >
      <Toolbar>
        <View style={{ opacity: 0 }}>{versionTag}</View>

        <View style={{ maxWidth: 120 * itemsInTabs, flex: 1 }}>
          <Tabs tabs={tabs} />
        </View>

        {versionTag}
      </Toolbar>

      {user?.isAnonymous && (
        <Section separator="top" hasBackground={false}>
          <Section.Content inset="S" style={{ flexDirection: "row" }}>
            <Typography.Body color={colors.text.warning}>⚠️</Typography.Body>
            <Spacer width={8} />
            <Typography.Body color={colors.text.warning}>
              You're in guest mode.{" "}
              <Text
                onPress={() => {
                  navigation.navigate("Profile");
                }}
                style={{
                  textDecorationLine: "underline",
                }}
              >
                Sign in to preserve your data.
              </Text>
            </Typography.Body>
          </Section.Content>
        </Section>
      )}

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
          <Animated.View
            style={{
              opacity: animatedValue.interpolate({
                inputRange: [0, 0.1, 1],
                outputRange: [0, 1, 1],
              }),
            }}
          >
            <Section.Separator />
          </Animated.View>

          <OverdueSection />
        </View>
      </Animated.View>

      <Section.Separator />
    </View>
  );
};
