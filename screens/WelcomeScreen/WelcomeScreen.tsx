import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Logo, Screen, Section, Typography } from "../../components";
import { LogInAsGuestBanner } from "./components/LogInAsGuestBanner";

export const WelcomeScreen = () => {
  const { navigate } = useNavigation();

  return (
    <Screen>
      <Section.Content
        inset="M"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <View
          style={{
            flex: 1,
            maxWidth: 240,
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
          }}
        >
          <Logo />

          <View style={{ marginTop: 16 }} />

          <Typography.Headline>Daily Tasks</Typography.Headline>

          <View style={{ marginTop: 8 }} />

          <Typography.Body textAlign="center" style={{ opacity: 0.5 }}>
            Opinionated task app to help you get through the day
          </Typography.Body>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography.Body>Get started</Typography.Body>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Button
              onPress={() =>
                (navigate as any)("Auth", {
                  screen: "LogIn",
                  params: { mode: "login" },
                })
              }
            >
              Log In
            </Button>
            <View style={{ width: 8 }} />
            <Typography.Body>or</Typography.Body>
            <View style={{ width: 8 }} />
            <Button
              onPress={() =>
                (navigate as any)("Auth", {
                  screen: "LogIn",
                  params: { mode: "signup" },
                })
              }
            >
              Sign Up
            </Button>
          </View>
        </View>
      </Section.Content>

      <Section.Separator />

      <LogInAsGuestBanner />
    </Screen>
  );
};
