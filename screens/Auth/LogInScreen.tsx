import { useNavigation, useRoute } from "@react-navigation/native";
import { View } from "react-native";
import { useTheme } from "styled-components/native";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  Button,
  Section,
  Typography,
  TextInput,
  Spacer,
  Logo,
  Tabs,
  TAB_HEIGHT,
} from "../../components";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../db/useAuth";
import { ActivityIndicator } from "react-native-paper";
import { LogInAsGuestBanner } from "../WelcomeScreen/components/LogInAsGuestBanner";

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
  const { params } = useRoute();

  const [mode, setMode] = useState<"login" | "signup">(
    (params as any).mode || "login"
  );

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
    setError(undefined);

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

  const signUp = () => {
    setLoading(true);
    setError(undefined);

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        console.log(user);
        // ...
      })
      .catch((error) => {
        setError(error);
        const errorCode = error.code;
        const errorMessage = error.message;

        console.error(error);
        setLoading(false);
      });
  };

  const Loading = () => (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <ActivityIndicator size={20} color={colors.text.secondary} />
    </View>
  );

  return (
    <React.Fragment>
      <Section separator="none" hasBackground={false} style={{ flex: 1 }}>
        <Section.Content
          inset="S"
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Logo />

          <Spacer height={24} />

          <View style={{ width: 160 }}>
            <View style={{ height: TAB_HEIGHT }}>
              <Tabs
                tabs={[
                  {
                    label: "Log In",
                    selected: mode === "login",
                    onPress: () => {
                      setError(undefined);
                      setMode("login");
                    },
                  },
                  {
                    label: "Sign Up",
                    selected: mode === "signup",
                    onPress: () => {
                      setError(undefined);
                      setMode("signup");
                    },
                  },
                ]}
              />
            </View>

            <Spacer height={24} />

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
                marginTop: 16,
                marginBottom: 12,
                // flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                height: 48,
              }}
            >
              {!!error?.code ? (
                <Typography.Caption
                  color={colors.text.error}
                  style={{ marginRight: 8 }}
                >
                  {getErrorMessageFromCode(error?.code)}
                </Typography.Caption>
              ) : (
                <View />
              )}

              {loading ? (
                <Loading />
              ) : (
                <Button onPress={mode === "login" ? authenticate : signUp}>
                  {mode === "login" ? "Log In" : "Sign Up"}
                </Button>
              )}
            </View>
          </View>
        </Section.Content>
      </Section>

      <Section.Separator />

      <LogInAsGuestBanner />
    </React.Fragment>
  );
};
