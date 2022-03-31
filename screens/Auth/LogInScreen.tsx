import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { useTheme } from "styled-components/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  Button,
  Section,
  Typography,
  TextInput,
  Spacer,
} from "../../components";
import { useEffect, useState } from "react";
import { useAuth } from "../../db/useAuth";
import { ActivityIndicator } from "react-native-paper";

const errorCodeMessages: { [key: string]: string } = {
  "auth/invalid-email": "Invalid email address",
  "auth/user-disabled": "User is disabled",
  "auth/user-not-found": "User not found",
  "auth/wrong-password": "Wrong password",
  /** Sign up error message */
  "auth/email-already-in-use": "Email is already in use",
};

export const getErrorMessageFromCode = (code: string = "") => {
  return errorCodeMessages[code] || "Unknown error";
};

export const LogInScreen = () => {
  const { navigate } = useNavigation();
  const { colors } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ code: string; message: string }>();

  const onLogin = async () => {
    setLoading(false);
    navigate("Home" as any);
  };

  useEffect(() => {
    if (user) {
      onLogin();
    }
  }, [user]);

  const authenticate = () => {
    setLoading(true);

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        onLogin();
      })
      .catch((error: { code: string; message: string }) => {
        setError(error);
        const errorCode = error.code;
        const errorMessage = error.message;

        console.error(error);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.background.default,
          flex: 1,
        }}
      >
        <ActivityIndicator size={20} color={colors.text.secondary} />
      </View>
    );
  }

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background.default,
        flex: 1,
      }}
    >
      <Section.Content inset="M">
        <Typography.Title textAlign="center">Login</Typography.Title>

        <Spacer height={16} />

        <TextInput
          autoCompleteType="email"
          label="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          textContentType="emailAddress"
          value={email}
          onChange={(event) => setEmail(event.nativeEvent.text)}
        />

        <Spacer height={12} />

        <TextInput
          autoCompleteType="password"
          label="Password"
          textContentType="password"
          value={password}
          secureTextEntry={true}
          onChange={(event) => setPassword(event.nativeEvent.text)}
        />

        <View
          style={{
            marginTop: 24,
            marginBottom: 12,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {!!error?.code && (
            <Typography.Caption
              color={colors.text.error}
              style={{ marginRight: 8 }}
            >
              {getErrorMessageFromCode(error?.code)}
            </Typography.Caption>
          )}

          <Button onPress={authenticate}>Log In</Button>
        </View>
      </Section.Content>

      <Section.Separator />

      <Button onPress={() => navigate("SignUp" as any)}>Sign Up</Button>
    </View>
  );
};
