import React, { useEffect, useState } from "react";
import { ActivityIndicator, Modal } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { rgba } from "polished";
import { useTheme } from "styled-components/native";
import { RootStackParamList } from "../types";
import { AuthStack } from "./AuthStack";
import { HomeStack } from "./HomeStack";
import { FinishModal, FinishModalProvider } from "./components/FinishModal";
import { View } from "react-native";
import { Typography } from "../components";
import { useAuth } from "../db/useAuth";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  const { colors } = useTheme();

  return (
    <FinishModalProvider>
      <Stack.Navigator
        initialRouteName="Loading"
        screenOptions={{
          header: () => null,
        }}
      >
        <Stack.Screen
          name="Loading"
          component={() => {
            const { isUserLoaded, user } = useAuth();
            const { navigate } = useNavigation();

            useEffect(() => {
              /**
               * If user is logged in already, skip the login screen
               */
              if (isUserLoaded) {
                if (user) {
                  navigate("Home" as any);
                } else {
                  navigate("Auth" as any);
                }
              }
            }, [isUserLoaded]);

            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator color={colors.primary} size={16} />
              </View>
            );
          }}
        ></Stack.Screen>
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen
          name="Home"
          options={{ title: "Home" }}
          component={HomeStack}
        />
        {/*       <Stack.Screen
        name="Today"
        component={TodayScreen}
        options={{ headerShown: false, headerBackground: () => null }}
      /> */}
        {/*
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
      */}
      </Stack.Navigator>

      <FinishModal />
    </FinishModalProvider>
  );
};
