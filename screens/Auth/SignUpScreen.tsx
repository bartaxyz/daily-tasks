import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import { useTheme } from "styled-components/native";
import { Button, Section, Typography } from "../../components";
import { useAuth } from "../../db/useAuth";

export const SignUpScreen = () => {
  const { navigate } = useNavigation();
  const { colors } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("Home" as any);
    }
  }, [user]);

  const signUp = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.error(error);
      });
  };

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
            value={email}
            dense={true}
            mode="outlined"
            activeOutlineColor={colors.primary}
            outlineColor={colors.text.secondary}
            autoComplete={false}
            onChange={(event) => setEmail(event.nativeEvent.text)}
          />
        </View>

        <Typography.Body color={colors.text.secondary}>
          Password
        </Typography.Body>
        <TextInput
          value={password}
          dense={true}
          mode="outlined"
          activeOutlineColor={colors.primary}
          outlineColor={colors.text.secondary}
          autoComplete="password"
          secureTextEntry={true}
          onChange={(event) => setPassword(event.nativeEvent.text)}
        />

        <View
          style={{
            marginTop: 24,
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Button onPress={signUp}>Sign Up</Button>
        </View>
      </Section.Content>

      <Button onPress={() => navigate("LogIn" as any)}>Log In</Button>
    </View>
  );
};
