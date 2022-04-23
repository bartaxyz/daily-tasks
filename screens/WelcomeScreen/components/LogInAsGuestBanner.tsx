import { View } from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";
import { Button, Section, Typography } from "../../../components";
import { useNavigation } from "@react-navigation/native";

export const LogInAsGuestBanner = () => {
  const { navigate } = useNavigation();

  const logInAsGuest = () => {
    signInAnonymously(getAuth())
      .then(() => {
        console.log("Logged in as guest");
        navigate("Home" as any);
      })
      .catch((error) => {
        console.log("Error logging in as guest", error);
      });
  };

  return (
    <Section.Content inset="M">
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexShrink: 1, marginRight: 16 }}>
          <Typography.Body>Or start as a guest</Typography.Body>
          <View style={{ marginTop: 8 }} />
          <View style={{ maxWidth: 280 }}>
            <Typography.Caption style={{ opacity: 0.5 }}>
              You'll have to create a full account to preserve data created in
              the guest mode.
            </Typography.Caption>
          </View>
        </View>

        <Button onPress={logInAsGuest}>Log In As Guest</Button>
      </View>
    </Section.Content>
  );
};
