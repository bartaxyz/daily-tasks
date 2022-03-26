import React from "react";
import { View } from "react-native";
import { Button, Section, Tabs, Tag, Task, Typography } from "../../components";
import { useData } from "../../db/DataProvider";

export const TabBar = ({ state, descriptors, navigation, position }: any) => {
  const { overdueTasks } = useData();

  console.log({ overdueTasks });

  const tabs = state.routes.map((route: any, index: number) => {
    const { options } = descriptors[route.key];

    const label =
      options.tabBarLabel !== undefined
        ? options.tabBarLabel
        : options.title !== undefined
        ? options.title
        : route.name;

    const selected = state.index === index;

    const onPress = () => {
      const event = navigation.emit({
        type: "tabPress",
        target: route.key,
        canPreventDefault: true,
      });

      if (!selected && !event.defaultPrevented) {
        // The `merge: true` option makes sure that the params inside the tab screen are preserved
        navigation.navigate({ name: route.name, merge: true });
      }
    };

    return {
      label,
      onPress,
      selected,
    };
  });

  const versionTag = <Tag>v0.0.1 Beta</Tag>;

  return (
    <React.Fragment>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 8,
        }}
      >
        <View style={{ opacity: 0 }}>{versionTag}</View>

        <Tabs tabs={tabs} />

        {versionTag}
      </View>

      <Section.Separator />

      <Section.Content inset="S">
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

        {overdueTasks.map(({ body, id }) => (
          <Task key={id}>{body}</Task>
        ))}
      </Section.Content>

      <Section.Separator />
    </React.Fragment>
  );
};
