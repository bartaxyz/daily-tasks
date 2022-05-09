import { useRef } from "react";
import { Pressable } from "react-native";
import { useActive, useHover } from "react-native-web-hooks";
import { useTheme } from "styled-components/native";
import { Typography } from "../Typography";

interface TaskActionButtonMenuItemProps {
  onPress?: () => void;
}

export const TaskActionButtonMenuItem: React.FC<
  TaskActionButtonMenuItemProps
> = ({ children, ...props }) => {
  const ref = useRef<any>() as any;
  const hover = useHover(ref);
  const active = useActive(ref);

  const { colors } = useTheme();

  return (
    <Pressable
      ref={ref as any}
      style={{
        padding: 12,
        paddingTop: 0,
        paddingBottom: 8,
        margin: 0,
        height: 24,
        borderRadius: 4,
        backgroundColor: hover && !active ? colors.primary : "transparent",
        minWidth: 80,
      }}
      {...props}
    >
      <Typography.Body
        color={hover && !active ? "white" : colors.text.default}
        style={{ marginTop: -8 }}
      >
        {children}
      </Typography.Body>
    </Pressable>
  );
};
