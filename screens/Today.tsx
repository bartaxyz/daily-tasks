import Constants from "expo-constants";
import { Platform, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Section, Task, Typography, Button, Tag } from "../components";

export const Today = () => {
  const versionTag = <Tag>v0.0.1 Beta</Tag>;

  return (
    <SafeAreaProvider>
      <View style={{ marginTop: Constants.statusBarHeight }} />

      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS !== "web" ? 24 : 14,
        }}
      >
        {Platform.OS !== "android" && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 24,
              marginLeft: 24,
            }}
          >
            <View style={{ opacity: 0 }}>{versionTag}</View>

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                  width: 124 * 2,
                  borderRadius: 6,
                  borderWidth: 1,
                }}
              >
                <Button style={{ width: 124 }}>Backlog</Button>
                <Button style={{ width: 124 }}>Today</Button>
              </View>
            </View>

            {versionTag}
          </View>
        )}

        <Section.Content inset="M">
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: 12,
            }}
          >
            <Typography.Title>Overdue</Typography.Title>
            <Button variant="primary" onPress={() => {}}>
              Finish Overdue
            </Button>
          </View>

          <Task>Wash the dishes</Task>
        </Section.Content>

        <Section separator="top">
          <Section.Content inset="M">
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: 12,
              }}
            >
              <Typography.Title>Today</Typography.Title>
              <Button onPress={() => {}}>Finish Today</Button>
            </View>

            <Task status="done">Do the laundry</Task>
            <Task>Do the homework for biology class</Task>
            <Task variant="add">Add task</Task>
          </Section.Content>
        </Section>
      </View>
    </SafeAreaProvider>
  );
};
