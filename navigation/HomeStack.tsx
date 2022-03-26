import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { DataProvider } from "../db/DataProvider";
import { BacklogScreen } from "../screens/BacklogScreen";
import { TodayScreen } from "../screens/TodayScreen";
import { TabBar } from "./components/TabBar";

export type MainTabsParamList = {
  Today: undefined;
  Backlog: undefined;
};

const Tab = createMaterialTopTabNavigator<MainTabsParamList>();

export const HomeStack = () => (
  <DataProvider>
    <Tab.Navigator initialRouteName="Today" tabBar={TabBar}>
      <Tab.Screen name="Backlog" component={BacklogScreen} />
      <Tab.Screen name="Today" component={TodayScreen} />
    </Tab.Navigator>
  </DataProvider>
);
