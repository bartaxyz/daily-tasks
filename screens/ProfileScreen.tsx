import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Platform, View } from "react-native";
import { useTheme } from "styled-components/native";
import { Button, KeyboardKey, Section, Typography } from "../components";
import { useAuth } from "../db/useAuth";
import { useAsyncStorage } from "../hooks/useAsyncStorage";

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
  const { user, logOut } = useAuth();
  const { navigate } = useNavigation();
  const [value] = useAsyncStorage("userPreferences", {
    showKeyboardShortcuts: false,
  });

  console.log({ value });

  const logOutHandler = () => {
    logOut();
    navigate("Auth" as any);
  };

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

      <Section separator="around" style={{ marginTop: 0 }}>
        <Section.Content inset="S">
          <DataRow label="Email" value={user?.email || undefined} />
          <DataRow label="UID" value={user?.uid} />
        </Section.Content>
      </Section>

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
