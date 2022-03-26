import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import { useTheme } from "styled-components/native";
import { Button, Section, Typography } from "../../components";

export const SignUpScreen = () => {
  const { navigate } = useNavigation();
  const { colors } = useTheme();

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
        <Typography.Title textAlign="center">Sign Up</Typography.Title>

        <View style={{ marginTop: 16, marginBottom: 12 }}>
          <Typography.Body color={colors.text.secondary}>Email</Typography.Body>
          <TextInput
            style={{ backgroundColor: "transparent", color: "white" }}
            dense={true}
            mode="outlined"
            activeOutlineColor={colors.primary}
            outlineColor={colors.text.secondary}
            autoComplete={false}
          />
        </View>

        <Typography.Body color={colors.text.secondary}>
          Password
        </Typography.Body>
        <TextInput
          style={{ backgroundColor: "transparent", color: "white" }}
          dense={true}
          mode="outlined"
          activeOutlineColor={colors.primary}
          outlineColor={colors.text.secondary}
          autoComplete="password"
          secureTextEntry={true}
        />

        <View
          style={{
            marginTop: 24,
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Button onPress={() => null}>Sign Up</Button>
        </View>
      </Section.Content>

      <Button onPress={() => navigate("LogIn" as any)}>Log In</Button>
    </View>
  );
};
