import { View } from "react-native";
import { Button, Section, Typography } from "../../../components";

export const LogInAsGuestBanner = () => {
  return (
    <Section.Content inset="M">
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Typography.Body>Or start as a guest</Typography.Body>
          <View style={{ marginTop: 4 }} />
          <Typography.Caption>
            (your data will be lost once you log out)
          </Typography.Caption>
        </View>

        <Button>Log In As Guest</Button>
      </View>
    </Section.Content>
  );
};
