import React, { useEffect, useRef } from "react";
import { Checkbox as RNPCheckbox } from "react-native-paper";
import {
  Animated,
  Platform,
  Pressable,
  PressableProps,
  UIManager,
  View,
} from "react-native";
import styled, { useTheme } from "styled-components/native";
import { Svg, Path } from "react-native-svg";

Animated.createAnimatedComponent(Pressable);

export interface CheckboxProps extends PressableProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  tabIndex?: number;
  disabled?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  tabIndex,
  disabled,
  ...props
}) => {
  const { colors } = useTheme();
  const ref = useRef<View>(null);

  useEffect(() => {
    ref.current?.setNativeProps({
      tabIndex,
    });
  }, [ref.current]);

  if (Platform.OS === "android") {
    return (
      <View style={{ margin: -8 }}>
        <RNPCheckbox
          color={colors.primary}
          status={checked ? "checked" : "unchecked"}
          uncheckedColor={colors.text.default}
          onPress={disabled ? undefined : () => props.onChange(!checked)}
          // disabled={disabled}
        />
      </View>
    );
  }

  const onPress = () => {
    props.onChange(!checked);
  };

  return (
    <Root ref={ref} onPress={onPress} {...props}>
      <Check checked={checked} />
      {/* {checked ? <Check /> : <Unchecked checked={checked} />} */}
    </Root>
  );
};

const Root = styled.Pressable``;

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface CheckIconProps {
  checked: boolean;
}
const CheckIcon: React.FC<CheckIconProps> = ({ checked, ...props }) => {
  const { colors } = useTheme();

  /**
   * Animate dashoffset in and out
   */
  const tickDashOffset = useRef(new Animated.Value(20)).current;
  const circleDashOffset = useRef(new Animated.Value(56)).current;

  useEffect(() => {
    Animated.timing(tickDashOffset, {
      toValue: checked ? 0 : 20,
      duration: 160,
      useNativeDriver: true,
    }).start();

    Animated.timing(circleDashOffset, {
      toValue: checked ? 56 : 0,
      duration: 160,
      useNativeDriver: true,
    }).start();
  }, [checked]);

  return (
    <View {...props}>
      <Svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        style={{ position: "absolute", top: 0, left: 0 }}
        {...{ tabIndex: "-1" }}
      >
        <AnimatedPath
          d="M2 8L6 12L14 4"
          stroke={colors.checkbox.checked.tick}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={[20, 20]}
          strokeDashoffset={tickDashOffset}
          strokeOpacity={0.5}
          {...{ tabIndex: "-1" }}
        />
      </Svg>

      <Svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        style={{ position: "absolute", top: 0, left: 0 }}
        collapsable={undefined}
        {...{ tabIndex: "-1" }}
      >
        <AnimatedPath
          d="M15.4196 6.90468C16.0245 11.0024 13.193 14.8147 9.09532 15.4196C4.99759 16.0245 1.18534 13.193 0.580411 9.09532C-0.0245188 4.99759 2.80695 1.18534 6.90468 0.580411C11.0024 -0.0245188 14.8147 2.80695 15.4196 6.90468Z"
          stroke={colors.checkbox.checked.tick}
          strokeWidth={1}
          strokeOpacity={circleDashOffset.interpolate({
            inputRange: [0, 56],
            outputRange: [0.3, 0],
          })}
          strokeDasharray={[56, 56]}
          strokeDashoffset={circleDashOffset}
          {...{ tabIndex: "-1" }}
        />
      </Svg>
    </View>
  );
};

const Check = styled(CheckIcon)`
  position: relative;
  width: 16px;
  height: 16px;
  position: relative;
`;
