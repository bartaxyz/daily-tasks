import { useNavigation, useRoute } from "@react-navigation/native";
import {
  EmailAuthProvider,
  getAuth,
  linkWithCredential,
  updateCurrentUser,
} from "firebase/auth";
import React, { useState } from "react";
import { Platform, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useTheme } from "styled-components/native";
import {
  Button,
  KeyboardKey,
  Section,
  Spacer,
  TextInput,
  Typography,
} from "../components";
import { useData } from "../db/DataProvider";
import { useAuth } from "../db/useAuth";
import { useAsyncStorage } from "../hooks/useAsyncStorage";
import { confirm } from "../utils/confirm";
import { getErrorMessageFromCode } from "./Auth/LogInScreen";

const DataRow: React.FC<{
  label: string;
  header?: boolean;
  value?: string | React.ReactNode;
}> = ({ label, value, header }) => (
  <View
    style={{
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      margin: 4,
      marginLeft: 0,
      marginRight: 0,
    }}
  >
    <View style={{ flex: 1, marginRight: 12 }}>
      <Typography.Caption
        textAlign="right"
        fontWeight={header ? "bold" : "normal"}
      >
        {label}
      </Typography.Caption>
    </View>
    <View style={{ flex: 2 }}>
      <Typography.Caption>{value}</Typography.Caption>
    </View>
  </View>
);

export const ProfileScreen = () => {
  const { user, logOut, setUser } = useData();
  const { colors } = useTheme();
  const { navigate } = useNavigation();
  const [value] = useAsyncStorage("userPreferences", {
    showKeyboardShortcuts: false,
  });

  console.log({ value });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ code: string; message: string }>();

  const isGuest = user?.isAnonymous;

  const logOutHandler = () => {
    if (!user) return;

    /**
     * If user has no email, we need to prompt them that it would remove all their data
     */
    if (!user.email) {
      confirm({
        message:
          "You are in guest mode. If you log out, you'll lose all data. Are you sure you want to log out?",
        onConfirm: () => {
          logOut();
          (navigate as any)("Auth", { screen: "SignUp" });
        },
      });
    }

    if (user.email) {
      logOut();
      (navigate as any)("Auth", {
        screen: "LogIn",
        params: { mode: "login" },
      });
    }
  };

  const convertGuestToUser = () => {
    if (!user) return;

    if (user.email) {
      return;
    }

    const credential = EmailAuthProvider.credential(email, password);

    const auth = getAuth();

    if (!auth?.currentUser) return;

    setLoading(true);
    setError(undefined);

    linkWithCredential(auth.currentUser, credential)
      .then((usercred) => {
        setLoading(false);
        const user = usercred.user;
        console.log("Anonymous account successfully upgraded", user);

        setUser({ ...user, isAnonymous: false });
      })
      .catch((error) => {
        setError(error);
        console.log("Error upgrading anonymous account", error);
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
    <Section separator="none" style={{ flex: 1 }}>
      <Section.Content
        inset="S"
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 0,
        }}
      >
        <Typography.Title textAlign="center">
          Profile {user?.displayName}
        </Typography.Title>

        <Button onPress={logOutHandler}>Log Out</Button>
      </Section.Content>

      {!isGuest && (
        <Section separator="top" style={{ marginTop: 0 }}>
          <Section.Content inset="S">
            <DataRow label="Email" value={user?.email || undefined} />
            <DataRow label="UID" value={user?.uid} />
          </Section.Content>
        </Section>
      )}

      {isGuest && (
        <Section separator="top" style={{ marginTop: 0 }}>
          <Section.Content inset="M">
            <Typography.Body>Create an account</Typography.Body>

            <Spacer height={8} />

            <Typography.Caption
              style={{
                opacity: 0.5,
              }}
            >
              Preserve your data by creating an account
            </Typography.Caption>

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

            <Spacer height={24} />

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
                <Button onPress={convertGuestToUser}>Create Account</Button>
              )}
            </View>
          </Section.Content>
        </Section>
      )}

      <View style={{ height: 16 }} />

      {Platform.OS === "web" && false && (
        <React.Fragment>
          <Typography.Caption textAlign="center">
            Keyboard Shortcuts
          </Typography.Caption>

          <Section separator="around">
            <Section.Content inset="S">
              <DataRow label="General" header={true} />
              <DataRow
                label="Preferences"
                value={
                  <React.Fragment>
                    <KeyboardKey>cmd</KeyboardKey> +{" "}
                    <KeyboardKey>,</KeyboardKey>
                  </React.Fragment>
                }
              />

              <View style={{ height: 16 }} />

              <DataRow label="Tasks" header={true} />
              <DataRow
                label="Move between tasks"
                value={
                  <React.Fragment>
                    <Typography.Caption fontWeight="bold">
                      Down
                    </Typography.Caption>{" "}
                    <KeyboardKey>tab</KeyboardKey> /{" "}
                    <Typography.Caption fontWeight="bold">
                      Up
                    </Typography.Caption>{" "}
                    <KeyboardKey>Shift</KeyboardKey> +{" "}
                    <KeyboardKey>Tab</KeyboardKey>
                  </React.Fragment>
                }
              />
              <DataRow
                label="Delete empty task"
                value={<KeyboardKey>backspace</KeyboardKey>}
              />
              <DataRow
                label="Select task"
                value={
                  <React.Fragment>
                    hold <KeyboardKey>alt</KeyboardKey>
                  </React.Fragment>
                }
              />
              <DataRow
                label="Move task up"
                value={
                  <React.Fragment>
                    <KeyboardKey>alt</KeyboardKey> +{" "}
                    <KeyboardKey>up</KeyboardKey>
                  </React.Fragment>
                }
              />
              <DataRow
                label="Move task down"
                value={
                  <React.Fragment>
                    <KeyboardKey>alt</KeyboardKey> +{" "}
                    <KeyboardKey>down</KeyboardKey>
                  </React.Fragment>
                }
              />
            </Section.Content>
          </Section>
        </React.Fragment>
      )}
    </Section>
  );
};
