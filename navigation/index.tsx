import * as React from "react";
import { NavigationContainer, Theme } from "@react-navigation/native";
import { ColorSchemeName, View } from "react-native";

import LinkingConfiguration from "./LinkingConfiguration";
import { RootStack } from "./RootStack";

const theme: Theme = {
  dark: false,
  colors: {
    primary: "transparent",
    background: "transparent",
    card: "transparent",
    text: "transparent",
    border: "transparent",
    notification: "transparent",
  },
};

export const Navigation = ({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) => (
  <NavigationContainer linking={LinkingConfiguration} theme={theme}>
    <RootStack />
  </NavigationContainer>
);
