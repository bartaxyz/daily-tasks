import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import { useTheme } from "styled-components/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Button, Section, Typography } from "../../components";
import { useEffect, useState } from "react";

export const LogInScreen = () => {
  const { navigate } = useNavigation();
  const { colors } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        navigate("Home" as any);
      }
    });
  }, []);

  const authenticate = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
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
        <Typography.Title textAlign="center">Login</Typography.Title>

        <View style={{ marginTop: 16, marginBottom: 12 }}>
          <Typography.Body color={colors.text.secondary}>Email</Typography.Body>
          <TextInput
            value={email}
            style={{ backgroundColor: "transparent", color: "white" }}
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
          style={{ backgroundColor: "transparent", color: "white" }}
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
          <Button onPress={authenticate}>Log In</Button>
        </View>
      </Section.Content>

      <Section.Separator />

      <Button onPress={() => navigate("SignUp" as any)}>Sign Up</Button>
    </View>
  );
};
