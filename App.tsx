import { ThemeProvider } from "styled-components/native";
import "react-native-gesture-handler";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import { Navigation } from "./navigation";
import { darkTheme } from "./theme/dark/theme";
import { defaultTheme } from "./theme/default/theme";
import "./firebase";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

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
