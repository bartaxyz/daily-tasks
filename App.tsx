import { View, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider, useTheme } from "styled-components/native";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { Today } from "./screens/Today";
import { darkTheme } from "./theme/dark/theme";
import { defaultTheme } from "./theme/default/theme";

const Component = () => {
  const theme = useTheme();

  console.log({ booo: theme });
  return null;
};

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  console.log({ theme: colorScheme === "dark" ? darkTheme : defaultTheme });

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ThemeProvider theme={colorScheme === "dark" ? darkTheme : defaultTheme}>
        <Component />
        <Today />
      </ThemeProvider>
    );
  }
}
