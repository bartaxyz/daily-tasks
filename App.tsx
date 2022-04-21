import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components/native";
import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import { Navigation } from "./navigation";
import { darkTheme } from "./theme/dark/theme";
import { defaultTheme } from "./theme/default/theme";

import "./firebase";
import { StatusBarProvider } from "./utils/providers/StatusBarProvider";
import { useSystemAccentColor } from "./utils/useSystemAccentColor";
import { Environment } from "./utils/Environment";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const systemAccentColor = useSystemAccentColor();

  if (systemAccentColor) {
    const color = systemAccentColor;
    darkTheme.colors.primary = color;
    defaultTheme.colors.primary = color;
  }

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ThemeProvider theme={colorScheme === "dark" ? darkTheme : defaultTheme}>
        <StatusBarProvider>
          <Environment />
          <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
          <Navigation colorScheme={colorScheme} />
        </StatusBarProvider>
      </ThemeProvider>
    );
  }
}
