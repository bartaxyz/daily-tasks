import { useState } from "react";
import {
  GestureResponderEvent,
  Platform,
  PressableProps,
  StyleSheet,
} from "react-native";
import { Button as RNPButton } from "react-native-paper";
import styled from "styled-components/native";
import { Typography } from "../Typography";

export interface ButtonProps extends PressableProps {
  variant?: "primary" | "secondary";
}

const PRIMARY_BACKGROUND = "#3685F9";
const SECONDARY_BACKGROUND = "#FFFFFF";

const PRIMARY_FOREGROUND = "#FFFFFF";
const SECONDARY_FOREGROUND = "#3D3D3D";

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "secondary",
  disabled,
  onPressIn,
  onPressOut,
  ...props
}) => {
  const background =
    variant === "primary" ? PRIMARY_BACKGROUND : SECONDARY_BACKGROUND;
  const foreground =
    variant === "primary" ? PRIMARY_FOREGROUND : SECONDARY_FOREGROUND;

  if (Platform.OS === "android") {
    return (
      <RNPButton
        mode={variant === "primary" ? "contained" : "outlined"}
        onPress={props.onPress as any}
        disabled={disabled}
      >
        {children}
      </RNPButton>
    );
  }

  const [pressed, setPressed] = useState(false);

  const onPressInHandler = (event: GestureResponderEvent) => {
    if (onPressIn) {
      onPressIn(event);
    }
    setPressed(true);
  };
  const onPressOutHandler = (event: GestureResponderEvent) => {
    if (onPressOut) {
      onPressOut(event);
    }
    setPressed(false);
  };

  return (
    <Root
      background={background}
      variant={variant}
      pressed={pressed}
      disabled={disabled}
      onPressIn={onPressInHandler}
      onPressOut={onPressOutHandler}
      style={{
        shadowOpacity: 0.1,
        shadowRadius: 0.5,
        shadowColor: variant === "secondary" ? foreground : background,
        shadowOffset: { height: 1.5, width: 0 },
      }}
      {...props}
    >
      <Label variant={variant}>{children}</Label>
    </Root>
  );
};

const Root = styled.Pressable<{
  background: string;
  variant: ButtonProps["variant"];
  pressed: boolean;
}>`
  height: 20px;
  padding: 0 14px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: ${({ pressed, variant, theme }) =>
    pressed
      ? variant === "primary"
        ? theme.colors.button.background.primaryPressed
        : theme.colors.button.background.secondaryPressed
      : variant === "primary"
      ? theme.colors.button.background.primary
      : theme.colors.button.background.secondary};
  border-width: ${StyleSheet.hairlineWidth};
  border-color: rgba(0, 0, 0, 0.12);

  border-top-width: 1px;
  border-top-color: ${({ theme, variant }) =>
    theme.name === "dark" && variant === "secondary"
      ? "#5D5D5D"
      : "rgba(0, 0, 0, 0.05)"};
`;

const Label = styled(Typography.Button.Label)<{
  variant: ButtonProps["variant"];
}>`
  margin-top: -3px;
  letter-spacing: -0.25px;
  color: ${({ variant, theme }) =>
    variant === "primary"
      ? theme.colors.button.label.primary
      : theme.colors.button.label.secondary};
`;
