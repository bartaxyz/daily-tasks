import React from "react";
import { Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface ScreenProps {
  children?: React.ReactNode;
}

export const Screen: React.FC<ScreenProps> = ({ children }) => {
  return Platform.select({
    web: <React.Fragment>{children}</React.Fragment>,
    android: <React.Fragment>{children}</React.Fragment>,
    default: (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ backgroundColor: "red", flex: 1, padding: 1 }}>
          {children}
        </View>
      </SafeAreaView>
    ),
  });
};
