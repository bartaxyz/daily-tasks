import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "styled-components/native";
import { RootStackParamList } from "../types";
import { AuthStack } from "./AuthStack";
import { HomeStack } from "./HomeStack";
import { FinishModal } from "./components/FinishModal/FinishModal";
import { Platform } from "react-native";
import { WelcomeScreen } from "../screens/WelcomeScreen/WelcomeScreen";
import { LoadingScreen } from "../screens/LoadingScreen";
import { FinishModalProvider } from "./components/FinishModal/FinishProvider";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  const { colors } = useTheme();

  return (
    <FinishModalProvider>
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

      <FinishModal />
    </FinishModalProvider>
  );
};
