import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components/native";
import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import { Navigation } from "./navigation";
import { darkTheme } from "./theme/dark/theme";
import { defaultTheme } from "./theme/default/theme";
// import electron from 'electron';

import "./firebase";
import { KeyboardProvider } from "./utils/providers/KeyboardProvider";
import { StatusBarProvider } from "./utils/providers/StatusBarProvider";

/** TODO: Fix this somehow for other environments than Electron */
let ipcRenderer: Electron.IpcRenderer = require("electron").ipcRenderer;

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [systemAccentColor, setSystemAccentColor] = useState<string>();

  useEffect(() => {
    if (ipcRenderer) {
      ipcRenderer.invoke("get-accent-color").then((color) => {
        setSystemAccentColor(color);
      });
    }
  }, []);

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
          <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
          <Navigation colorScheme={colorScheme} />
        </StatusBarProvider>
      </ThemeProvider>
    );
  }
}
