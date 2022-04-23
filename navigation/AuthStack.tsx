import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogInScreen } from "../screens/Auth/LogInScreen";

export type AuthParamList = {
  LogIn: undefined;
};

const Stack = createNativeStackNavigator<AuthParamList>();

export const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="LogIn"
    screenOptions={{ header: () => null }}
  >
    <Stack.Screen name="LogIn" component={LogInScreen} />
  </Stack.Navigator>
);
