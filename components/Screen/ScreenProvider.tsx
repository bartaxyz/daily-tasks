import React, { PropsWithChildren } from "react";
import { Platform } from "react-native";
// import { SafeAreaProvider } from "react-native-safe-area-context";

export const ScreenProvider: React.FC<PropsWithChildren> = ({ children }) =>
  Platform.select({
    web: <React.Fragment>{children}</React.Fragment>,
    // default: <SafeAreaProvider>{children}</SafeAreaProvider>,
    default: <React.Fragment>{children}</React.Fragment>,
  });
