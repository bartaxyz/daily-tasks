import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TodayScreen } from "../screens/TodayScreen";
import { RootStackParamList } from "../types";
import { AuthStack } from "./AuthStack";
import { HomeStack } from "./HomeStack";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Auth"
      screenOptions={{
        header: () => null,
      }}
    >
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen
        name="Home"
        options={{ title: "Home" }}
        component={HomeStack}
      />
      {/*       <Stack.Screen
        name="Today"
        component={TodayScreen}
        options={{ headerShown: false, headerBackground: () => null }}
      /> */}
      {/*
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
      */}
    </Stack.Navigator>
  );
};
