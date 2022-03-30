import { useNavigation, useRoute } from "@react-navigation/native";
import { View } from "react-native";
import { Button, Section, Typography } from "../components";
import { useAuth } from "../db/useAuth";

const DataRow: React.FC<{ label: string; value?: string }> = ({
  label,
  value,
}) => (
  <View
    style={{
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    }}
  >
    <View style={{ flex: 1, marginRight: 12 }}>
      <Typography.Caption textAlign="right">{label}:</Typography.Caption>
    </View>
    <View style={{ flex: 3 }}>
      <Typography.Caption>{value}</Typography.Caption>
    </View>
  </View>
);

export const ProfileScreen = () => {
  const { user, logOut } = useAuth();
  const { navigate } = useNavigation();

  const logOutHandler = () => {
    logOut();
    navigate("Auth" as any);
  };

  return (
    <Section separator="none" style={{ flex: 1 }}>
      <Section.Content inset="M" maxWidth={560} style={{ flex: 1 }}>
        <Section.Content
          inset="M"
          style={{ flex: 1, alignContent: "space-between" }}
        >
          <Typography.Title textAlign="center">
            Profile {user?.displayName}
          </Typography.Title>

          <View style={{ height: 12 }} />

          <Section.Content inset="M">
            <DataRow label="Email" value={user?.email || undefined} />
            <View style={{ height: 12 }} />
            <DataRow label="UID" value={user?.uid} />
          </Section.Content>

          <Section.Content inset="S">
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Button onPress={logOutHandler}>Log Out</Button>
            </View>
          </Section.Content>
        </Section.Content>
      </Section.Content>
    </Section>
  );
};
