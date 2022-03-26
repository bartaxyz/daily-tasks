import Constants from "expo-constants";
import { ScrollView, View } from "react-native";

import { Section, Task, Typography, Button } from "../components";
import { useData } from "../db/DataProvider";

export const TodayScreen = () => {
  const { todayTasks: tasks } = useData();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ marginTop: Constants.statusBarHeight }} />

      <Section separator="none" style={{ flex: 1 }}>
        <Section.Content
          inset="S"
          style={{ flex: 1, alignContent: "space-between" }}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: 12,
              }}
            >
              <Typography.Title>Today</Typography.Title>
              {/* <Button onPress={() => {}}>Finish Today</Button> */}
            </View>

            {tasks.map(({ status, body, id }) => (
              <Task key={id} status={status}>
                {body}
              </Task>
            ))}

            <Task variant="add">Add task</Task>
          </View>

          <View style={{ flex: 1 }} />
        </Section.Content>

        <Section separator="around">
          <Section.Content inset="S">
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography.Body>Ready to finish your day?</Typography.Body>
              <Button onPress={() => {}}>Finish Today</Button>
            </View>
          </Section.Content>
        </Section>
      </Section>
    </ScrollView>
  );
};
