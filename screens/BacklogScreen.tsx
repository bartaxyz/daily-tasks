import { View } from "react-native";
import { useTheme } from "styled-components/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { Section, Typography } from "../components";
import { TaskList } from "../components/TaskList";
import { useData } from "../db/DataProvider";

const Tab = createMaterialTopTabNavigator();

const BacklogTab = () => {
  const { backlogTasks } = useData();

  if (backlogTasks.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography.Title>No Backlog Tasks</Typography.Title>
      </View>
    );
  }

  return <TaskList tasks={backlogTasks} context="backlog" />;
};

const TrashTab = () => {
  const { deletedTasks } = useData();
  const { colors } = useTheme();

  if (deletedTasks.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography.Body
          color={colors.text.secondary}
          style={{ margin: 12 }}
          textAlign="center"
        >
          Your trash is empty.
        </Typography.Body>
      </View>
    );
  }

  return (
    <Section.Content inset="S">
      <TaskList tasks={deletedTasks} context="trash" />
    </Section.Content>
  );
};

export const BacklogScreen = () => {
  const { projects, backlogTasks, deletedTasks, deleteTask } = useData();
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        // tabBarScrollEnabled: true,
        tabBarStyle: {
          overflow: "hidden",
        },
        tabBarItemStyle: {
          margin: 0,
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.primary,
          borderRadius: 1000,
        },
        tabBarLabelStyle: {
          // fontSize: 12,
          textTransform: "none",
        },
        tabBarInactiveTintColor: colors.text.default,
        tabBarActiveTintColor: colors.primary,
      }}
    >
      <Tab.Screen
        name="BacklogTab"
        options={{
          title: "Backlog",
        }}
        component={BacklogTab}
      />
      <Tab.Screen
        name="TrashTab"
        options={{
          title: "Trash",
        }}
        component={TrashTab}
      />
    </Tab.Navigator>
  );
};
