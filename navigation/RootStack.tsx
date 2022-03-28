import React from "react";
import { Modal } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { rgba } from "polished";
import { useTheme } from "styled-components/native";
import { RootStackParamList } from "../types";
import { AuthStack } from "./AuthStack";
import { HomeStack } from "./HomeStack";
import { Section, Task, Typography } from "../components";
import { IconButton } from "../components/IconButton";
import { View } from "react-native";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  const { colors } = useTheme();

  return (
    <React.Fragment>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{
          header: () => null,
        }}
      >
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen
          name="Home"
          options={{ title: "Home" }}
          component={HomeStack}
        />
        {/*       <Stack.Screen
        name="Today"
        component={TodayScreen}
        options={{ headerShown: false, headerBackground: () => null }}
      /> */}
        {/*
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
      */}
      </Stack.Navigator>

      <Modal
        visible={false}
        style={{
          backdropFilter: "blur(16px)",
          backgroundColor: rgba(colors.section.background, 0.5),
        }}
        contentContainerStyle={{
          backdropFilter: "blur(16px)",
          backgroundColor: rgba(255, 255, 255, 0.1),
          borderRadius: 10,
          maxWidth: 320,
          margin: "auto",
          borderWidth: 1,
          borderColor: colors.section.separator,
        }}
      >
        <Section.Content inset="XS">
          <Typography.Title
            textAlign="center"
            style={{ marginTop: 24, marginBottom: 12 }}
          >
            Let's sort all your overdue tasks
          </Typography.Title>
          <Typography.Caption textAlign="center" color={colors.text.secondary}>
            One by one, to make it simple and efficient
          </Typography.Caption>
        </Section.Content>

        <Section separator="around">
          <Section.Content inset="XS">
            <Task status="none">Do the laundry</Task>
          </Section.Content>

          <Section.Separator />

          <Section.Content inset="XS">
            <Typography.Caption
              textAlign="center"
              color={colors.text.secondary}
              style={{
                margin: 8,
              }}
            >
              Where should this task go?
            </Typography.Caption>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <IconButton label="Backlog" icon="archive" />

              <View style={{ marginLeft: 8, marginRight: 8 }}>
                <IconButton label="Today" icon="sunset" />
              </View>

              <IconButton label="Trash" icon="trash" />
            </View>
          </Section.Content>
        </Section>
      </Modal>
    </React.Fragment>
  );
};
