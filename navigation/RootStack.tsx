import React, { useState } from "react";
import { Modal } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { rgba } from "polished";
import { useTheme } from "styled-components/native";
import { RootStackParamList } from "../types";
import { AuthStack } from "./AuthStack";
import { HomeStack } from "./HomeStack";
import { FinishModal, FinishModalProvider } from "./components/FinishModal";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  return (
    <FinishModalProvider>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{
          header: () => null,
        }}
      >
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
