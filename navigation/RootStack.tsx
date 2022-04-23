import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "styled-components/native";
import { RootStackParamList } from "../types";
import { AuthStack } from "./AuthStack";
import { HomeStack } from "./HomeStack";
import { FinishModal, FinishModalProvider } from "./components/FinishModal";
import { Platform, View } from "react-native";
import { useAuth } from "../db/useAuth";
import { useNavigation } from "@react-navigation/native";
import { WelcomeScreen } from "../screens/WelcomeScreen/WelcomeScreen";
import { LoadingScreen } from "../screens/LoadingScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  const { colors } = useTheme();
  const { user } = useAuth();

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

        {!!user && (
          <Stack.Screen
            name="Home"
            options={{ title: "Home" }}
            component={HomeStack}
          />
        )}
      </Stack.Navigator>

      <FinishModal />
    </FinishModalProvider>
  );
};
