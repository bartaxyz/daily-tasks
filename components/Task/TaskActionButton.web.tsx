import { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Divider, Menu } from "react-native-paper";
import { useTheme } from "styled-components/native";
import { Button } from "../Button";
import { Typography } from "../Typography";
import { TaskActionButtonMenuItem } from "./TaskActionButtonMenuItem";
import { TaskActionButtonProps } from "./types";
import { useTaskMenu } from "./utils/useTaskMenu";

export const TaskActionButton: React.FC<TaskActionButtonProps> = ({
  taskId,
  context,
}) => {
  const { menu } = useTaskMenu(taskId, context);
  const { colors } = useTheme();
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  if (menu.length === 0) {
    return null;
  }

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        contentStyle={{
          shadowColor: "transparent",
          borderWidth: 1,
          borderColor: colors.section.separator,
          borderRadius: 8,
          padding: 8,
          paddingTop: 0,
          paddingBottom: 0,
          minWidth: 146,
          backgroundColor: "transparent",
          ...Platform.select({
            web: { backdropFilter: "blur(24px)" },
            default: {},
          }),
        }}
        anchor={
          <Button variant="tertiary" onPress={openMenu} {...{ tabindex: "-1" }}>
            &middot;&middot;&middot;
          </Button>
        }
      >
        {menu.map((item) => {
          if (item.id === "separator") {
            return (
              <Divider style={{ margin: 8, marginLeft: 12, marginRight: 12 }} />
            );
          }

          return (
            <TaskActionButtonMenuItem key={item.label} onPress={item.onPress}>
              {item.label}
            </TaskActionButtonMenuItem>
          );
        })}
      </Menu>
    </View>
  );
};
