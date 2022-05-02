import { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Divider, Menu } from "react-native-paper";
import { useTheme } from "styled-components/native";
import { Button } from "../Button";
import { Typography } from "../Typography";
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
          padding: 0,
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
              <Divider style={{ margin: 4, marginLeft: 16, marginRight: 16 }} />
            );
          }

          return (
            <Menu.Item
              style={styles.menuItemStyle}
              contentStyle={styles.menuItemStyle}
              titleStyle={styles.menuItemStyle}
              key={item.label}
              title={<Typography.Body>{item.label}</Typography.Body>}
              onPress={item.onPress}
            />
          );
        })}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  menuItemStyle: {
    padding: 0,
    margin: 0,
    height: 24,
  },
});
