import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components/native";
import "react-native-gesture-handler";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import { Navigation } from "./navigation";
import { darkTheme } from "./theme/dark/theme";
import { defaultTheme } from "./theme/default/theme";
import { isElectron } from "./utils/platform";

import "./firebase";
import { View } from "react-native";
import { lighten, saturate } from "polished";

let ipcRenderer: Electron.IpcRenderer;

if (isElectron) {
  ipcRenderer = require("electron").ipcRenderer;
}

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
    const color = saturate(0.2)(systemAccentColor);
    darkTheme.colors.primary = color;
    defaultTheme.colors.primary = color;
  }

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ThemeProvider theme={colorScheme === "dark" ? darkTheme : defaultTheme}>
        <Navigation colorScheme={colorScheme} />
      </ThemeProvider>
    );
  }
}
