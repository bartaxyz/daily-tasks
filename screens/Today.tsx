import Constants from "expo-constants";
import { Platform, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Section, Task, Typography, Button, Tag, Tabs } from "../components";

export const Today = () => {
  const versionTag = <Tag>v0.0.1 Beta</Tag>;

  return (
    <SafeAreaProvider>
      <View style={{ marginTop: Constants.statusBarHeight }} />

      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS !== "web" ? 24 : 0,
        }}
      >
        {Platform.OS !== "android" && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 8,
            }}
          >
            <View style={{ opacity: 0 }}>{versionTag}</View>

            <Tabs
              tabs={[
                {
                  label: "Backlog",
                },
                {
                  label: "Today",
                },
              ]}
            />

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
            <Button onPress={() => {}}>Finish Overdue</Button>
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
