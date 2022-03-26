import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { DataProvider } from "../db/DataProvider";
import { BacklogScreen } from "../screens/BacklogScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { TodayScreen } from "../screens/TodayScreen";
import { TabBar } from "./components/TabBar";

export type MainTabsParamList = {
  Today: undefined;
  Backlog: undefined;
  Profile: undefined;
};

const Tab = createMaterialTopTabNavigator<MainTabsParamList>();

export const HomeStack = () => (
  <DataProvider>
    <Tab.Navigator
      initialRouteName="Today"
      tabBar={TabBar}
      screenOptions={{ swipeEnabled: false }}
    >
      <Tab.Screen name="Backlog" component={BacklogScreen} />
      <Tab.Screen name="Today" component={TodayScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  </DataProvider>
);
