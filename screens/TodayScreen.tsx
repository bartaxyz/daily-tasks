import Constants from "expo-constants";
import React, { useState } from "react";
import { ActivityIndicator, Animated, ScrollView, View } from "react-native";
import { Svg, Path } from "react-native-svg";
import { useTheme } from "styled-components/native";

import { Section, Task, Typography, Button, Tag } from "../components";
import { useData } from "../db/DataProvider";

export const TodayScreen = () => {
  const {
    todayTasks: tasks,
    updateTaskBody,
    updateTaskStatus,
    createTask,
    tasksSynced,
  } = useData();

  const [syncAnimatedValue] = useState(new Animated.Value(0));

  const { colors } = useTheme();

  if (tasksSynced) {
    Animated.timing(syncAnimatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  } else {
    Animated.timing(syncAnimatedValue, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }

  return (
    <React.Fragment>
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

                {tasksSynced && (
                  <Animated.View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                      opacity: syncAnimatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                      }),
                    }}
                  >
                    <Typography.Caption
                      color={colors.text.secondary}
                      style={{ marginRight: 8, marginTop: -2 }}
                    >
                      Synced
                    </Typography.Caption>

                    <Svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      style={{ marginTop: -4, marginBottom: -4 }}
                    >
                      <Path
                        d="M14.5201 14.7565C16.4788 14.7565 18.0232 13.3189 18.0232 11.5234C18.0232 10.1862 17.2635 8.99969 16.0142 8.47863C16.0205 5.64102 13.9739 3.59442 11.3435 3.59442C9.67355 3.59442 8.41797 4.45449 7.63323 5.59707C6.03864 5.17017 4.36244 6.3567 4.29967 8.12707C2.86203 8.38446 1.97684 9.67143 1.97684 11.2472C1.97684 13.1557 3.64676 14.7503 5.84403 14.7503L14.5201 14.7565ZM14.5201 13.501H5.85031C4.35617 13.501 3.24498 12.4588 3.24498 11.2472C3.24498 9.9916 4.01716 9.06247 5.29785 9.06247C5.39202 9.06247 5.42969 9.01225 5.42341 8.92436C5.38574 7.05982 6.72294 6.41948 8.07268 6.84637C8.1543 6.87149 8.20452 6.85265 8.24219 6.7836C8.8637 5.69124 9.78027 4.84372 11.3372 4.84372C13.3085 4.84372 14.7147 6.40692 14.8089 8.23379C14.8277 8.5728 14.8026 8.93692 14.7775 9.23826C14.7649 9.32615 14.8026 9.37637 14.8842 9.38892C16.0205 9.60865 16.755 10.4122 16.755 11.5234C16.755 12.622 15.7819 13.501 14.5201 13.501ZM9.54171 12.1449C9.76144 12.1449 9.95606 12.0382 10.0816 11.8373L12.5488 7.88223C12.6179 7.76923 12.6932 7.62483 12.6932 7.47416C12.6932 7.17283 12.4295 6.94682 12.1157 6.94682C11.921 6.94682 11.739 7.05355 11.6197 7.26072L9.5166 10.745L8.44936 9.38265C8.33008 9.21942 8.16685 9.13153 7.97224 9.13153C7.66462 9.13153 7.4135 9.37637 7.4135 9.69026C7.4135 9.83466 7.46373 9.97277 7.57045 10.1046L8.9767 11.8436C9.13365 12.0508 9.31571 12.1449 9.54171 12.1449Z"
                        fill={colors.text.secondary}
                      />
                    </Svg>
                  </Animated.View>
                )}

                {/* <Button onPress={() => {}}>Finish Today</Button> */}
              </View>

              {tasks.map(({ status, body, id }) => (
                <Task
                  key={id}
                  status={status}
                  onValueChange={(body) => {
                    updateTaskBody({ id, body });
                  }}
                  onStatusChange={(status) => {
                    updateTaskStatus({ id, status });
                  }}
                >
                  {body}
                </Task>
              ))}

              <Task
                variant="add"
                onTaskPress={() => {
                  console.log("createTask");
                  console.log(createTask({ body: "" }));
                }}
              />
            </View>

            <View style={{ flex: 1 }} />
          </Section.Content>
        </Section>
      </ScrollView>

      <Section separator="none">
        {tasks.length > 0 && (
          <Section separator="around" style={{ marginTop: 0 }}>
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
        )}
      </Section>
    </React.Fragment>
  );
};
