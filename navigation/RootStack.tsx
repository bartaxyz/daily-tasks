import React from "react";
import { Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "styled-components/native";
import { RootStackParamList } from "../types";
import { AuthStack } from "./AuthStack";
import { HomeStack } from "./HomeStack";
import { FinishModal } from "./components/FinishModal/FinishModal";
import { WelcomeScreen } from "../screens/WelcomeScreen/WelcomeScreen";
import { LoadingScreen } from "../screens/LoadingScreen";
import { FinishModalProvider } from "./components/FinishModal/FinishProvider";
import { TaskModalProvider } from "./components/TaskModal/TaskModalProvider";
import { TaskModal } from "./components/TaskModal/TaskModal";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  const { colors } = useTheme();

  return (
    <FinishModalProvider>
      <TaskModalProvider>
        <Stack.Navigator
          initialRouteName="Loading"
          screenOptions={{
            header: () => null,
            contentStyle: {
              backgroundColor: Platform.select({
                web: "transparent",
                default: colors.background.default,
              }),
            },
          }}
        >
          <Stack.Screen name="Loading" component={LoadingScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Auth" component={AuthStack} />

          <Stack.Screen
            name="Home"
            options={{ title: "Home" }}
            component={HomeStack}
          />
        </Stack.Navigator>

        {Platform.select({
          web: null,
          default: (
            <React.Fragment>
              <TaskModal />
            </React.Fragment>
          ),
        })}
        <FinishModal />
      </TaskModalProvider>
    </FinishModalProvider>
  );
};
