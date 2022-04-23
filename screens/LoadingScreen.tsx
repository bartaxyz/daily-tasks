import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useTheme } from "styled-components/native";
import { useAuth } from "../db/useAuth";

export const LoadingScreen = () => {
  const { isUserLoaded, user } = useAuth();
  const { navigate } = useNavigation();
  const { colors } = useTheme();

  if (user) {
    navigate("Home" as any);
  }

  useEffect(() => {
    /**
     * If user is logged in already, skip the login screen
     */
    if (isUserLoaded) {
      if (user) {
        navigate("Home" as any);
      } else {
        navigate("Welcome" as any);
      }
    }
  }, [isUserLoaded]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator color={colors.primary} size={16} />
    </View>
  );
};
