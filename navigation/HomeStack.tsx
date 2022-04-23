import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DataProvider } from "../db/DataProvider";
import { BacklogScreen } from "../screens/BacklogScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { TodayScreen } from "../screens/TodayScreen";
import { StatusBar } from "./components/StatusBar";
import { TabBar } from "./components/TabBar";
import { useTheme } from "styled-components/native";
import { Typography } from "../components";
import React from "react";

export type MainTabsParamList = {
  Today: undefined;
  Backlog: undefined;
  Profile: undefined;
};

const BottomTabs = createBottomTabNavigator<MainTabsParamList>();

const Tab = createMaterialTopTabNavigator<MainTabsParamList>();

export const HomeStackWithoutData = () => {
  const { colors } = useTheme();

  return (
    <React.Fragment>
      {Platform.select({
        web: (
          <Tab.Navigator
            initialRouteName="Today"
            tabBar={Platform.select({
              web: TabBar,
              default: undefined,
            })}
            screenOptions={{
              swipeEnabled: Platform.select({ web: false, default: true }),
            }}
          >
            <Tab.Screen name="Backlog" component={BacklogScreen} />
            <Tab.Screen name="Today" component={TodayScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
          </Tab.Navigator>
        ),
        default: (
          <BottomTabs.Navigator
            initialRouteName="Today"
            screenOptions={{
              tabBarStyle: {
                backgroundColor: colors.background.default,
                paddingBottom: 8,
                paddingTop: 8,
                height: 64,
              },
            }}
          >
            <BottomTabs.Screen
              name="Backlog"
              options={{
                tabBarIcon: ({ focused, size }) => (
                  <Ionicons
                    name="albums-outline"
                    size={size}
                    color={focused ? colors.primary : colors.text.default}
                  />
                ),
                tabBarLabel: ({ focused, ...props }) => (
                  <Typography.Caption
                    color={focused ? colors.primary : colors.text.default}
                  >
                    Backlog
                  </Typography.Caption>
                ),
              }}
              component={BacklogScreen}
            />
            <BottomTabs.Screen
              name="Today"
              options={{
                tabBarIcon: ({ focused, size }) => (
                  <Ionicons
                    name="sunny-outline"
                    size={size}
                    color={focused ? colors.primary : colors.text.default}
                  />
                ),
                tabBarLabel: ({ focused, ...props }) => (
                  <Typography.Caption
                    color={focused ? colors.primary : colors.text.default}
                  >
                    Today
                  </Typography.Caption>
                ),
              }}
              component={TodayScreen}
            />
            <BottomTabs.Screen
              name="Profile"
              options={{
                tabBarIcon: ({ focused, size }) => (
                  <Ionicons
                    name="person-circle-outline"
                    size={size}
                    color={focused ? colors.primary : colors.text.default}
                  />
                ),
                tabBarLabel: ({ focused, ...props }) => (
                  <Typography.Caption
                    color={focused ? colors.primary : colors.text.default}
                  >
                    Profile
                  </Typography.Caption>
                ),
              }}
              component={ProfileScreen}
            />
          </BottomTabs.Navigator>
        ),
      })}
      {Platform.select({ web: <StatusBar />, default: null })}
    </React.Fragment>
  );
};

export const HomeStack = () => {
  return (
    <DataProvider>
      <HomeStackWithoutData />
    </DataProvider>
  );
};
