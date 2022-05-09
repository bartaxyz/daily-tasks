import React from "react";
import { Platform } from "react-native";
// import { SafeAreaProvider } from "react-native-safe-area-context";

export const ScreenProvider: React.FC = ({ children }) =>
  Platform.select({
    web: <React.Fragment>{children}</React.Fragment>,
    // default: <SafeAreaProvider>{children}</SafeAreaProvider>,
    default: <React.Fragment>{children}</React.Fragment>,
  });
