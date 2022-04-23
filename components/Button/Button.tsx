import { lighten, rgba } from "polished";
import { useRef, useState } from "react";
import {
  GestureResponderEvent,
  Platform,
  PressableProps,
  View,
} from "react-native";
import { Button as RNPButton } from "react-native-paper";
import styled, { useTheme } from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { Typography } from "../Typography";
import { useHover } from "react-native-web-hooks";

export interface ButtonProps extends PressableProps {
  variant?: "primary" | "secondary" | "tertiary";
  tabindex?: number | string;
}

const PRIMARY_BACKGROUND = "#3685F9";
const SECONDARY_BACKGROUND = "#FFFFFF";
const TERTIARY_BACKGROUND = "transparent";

const PRIMARY_FOREGROUND = "#FFFFFF";
const SECONDARY_FOREGROUND = "#3D3D3D";
const TERTIARY_FOREGROUND = "#FFFFFF";

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "secondary",
  disabled,
  onPressIn,
  onPressOut,
  tabindex,
  ...props
}) => {
  const { colors } = useTheme();
  const background =
    variant === "primary"
      ? PRIMARY_BACKGROUND
      : variant === "secondary"
      ? SECONDARY_BACKGROUND
      : TERTIARY_BACKGROUND;
  const foreground =
    variant === "primary"
      ? PRIMARY_FOREGROUND
      : variant === "secondary"
      ? SECONDARY_FOREGROUND
      : TERTIARY_FOREGROUND;

  if (Platform.OS === "ios") {
    return (
      <RNPButton
        color={colors.primary}
        mode={variant === "primary" ? "contained" : "contained"}
        onPress={props.onPress as any}
        disabled={!!disabled}
        {...(props as any)}
      >
        {children}
      </RNPButton>
    );
  }

  if (Platform.OS === "android") {
    return (
      <RNPButton
        color={colors.primary}
        mode={variant === "primary" ? "contained" : "contained"}
        onPress={props.onPress as any}
        disabled={!!disabled}
      >
        {children}
      </RNPButton>
    );
  }

  const buttonRef = useRef<View>(null);
  const [pressed, setPressed] = useState(false);
  const hover = useHover(buttonRef);

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
    <Border variant={variant} {...{ tabindex }}>
      <Root
        ref={buttonRef}
        background={background}
        variant={variant}
        pressed={pressed}
        hover={hover}
        disabled={disabled}
        onPressIn={onPressInHandler}
        onPressOut={onPressOutHandler}
        style={{
          shadowOpacity: 0.025,
          shadowRadius: 4,
          shadowColor: variant === "secondary" ? foreground : background,
          shadowOffset: { height: variant === "secondary" ? 2 : 1.5, width: 0 },
        }}
        {...{ tabindex }}
        {...props}
      >
        <Gradient
          variant={variant}
          colors={
            variant === "secondary" || variant === "tertiary"
              ? []
              : [rgba("#9B9B9B", 0.05), rgba("#000000", 0.05)]
          }
          {...{ tabindex }}
        >
          <Label variant={variant} {...{ tabindex }}>
            {children}
          </Label>
        </Gradient>
      </Root>
    </Border>
  );
};

const Border = styled.View<{ variant: ButtonProps["variant"] }>`
  border-radius: 5px;
  border-width: ${({ variant }) => (variant === "secondary" ? "1px" : "0")};
  border-color: ${({ variant }) =>
    rgba(0, 0, 0, variant === "secondary" ? 0.12 : 0)};

  border-top-width: ${({ variant }) => (variant === "secondary" ? "1px" : "0")};
  border-top-color: ${({ theme, variant }) =>
    theme.name === "dark" && variant === "secondary"
      ? "#5D5D5D"
      : variant !== "tertiary"
      ? "rgba(0, 0, 0, 0.05)"
      : "transparent"};
`;

const Gradient = styled(LinearGradient)<{ variant: ButtonProps["variant"] }>`
  border-radius: 5px;
  height: 100%;
  width: 100%;
  padding: 0 ${({ variant }) => (variant !== "tertiary" ? 14 : 8)}px;
  justify-content: center;
  align-items: center;
`;

const Root = styled.Pressable<{
  background: string;
  variant: ButtonProps["variant"];
  pressed: boolean;
  hover: boolean;
}>`
  height: 20px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: ${({ pressed, hover, variant, theme }) => {
    const { colors } = theme;

    if (variant === "primary") {
      if (pressed) {
        return lighten(0.075, colors.primary);
      }
      return colors.primary;
    }

    if (variant === "secondary") {
      if (pressed) {
        return colors.button.background.secondaryPressed;
      }
      return colors.button.background.secondary;
    }

    if (variant === "tertiary") {
      if (pressed) {
        return colors.button.background.tertiaryPressed;
      } else if (hover) {
        return colors.button.background.tertiaryHover;
      }
      return colors.button.background.tertiary;
    }

    return "transparent";
  }};
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
