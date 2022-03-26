import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogInScreen } from "../screens/Auth/LogInScreen";
import { SignUpScreen } from "../screens/Auth/SignUpScreen";

export type AuthParamList = {
  SignUp: undefined;
  LogIn: undefined;
};

const Stack = createNativeStackNavigator<AuthParamList>();

export const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="LogIn"
    screenOptions={{ header: () => null }}
  >
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="LogIn" component={LogInScreen} />
  </Stack.Navigator>
);
