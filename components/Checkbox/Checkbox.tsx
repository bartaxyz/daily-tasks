import React from "react";
import { Checkbox as RNPCheckbox } from "react-native-paper";
import {
  Animated,
  Platform,
  Pressable,
  PressableProps,
  View,
} from "react-native";
import styled, { useTheme } from "styled-components/native";
import { Svg, Path } from "react-native-svg";

Animated.createAnimatedComponent(Pressable);

export interface CheckboxProps extends PressableProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, ...props }) => {
  if (Platform.OS === "android") {
    return (
      <View style={{ margin: -8 }}>
        <RNPCheckbox status={checked ? "checked" : "unchecked"} />
      </View>
    );
  }

  const onPress = () => {
    props.onChange(!checked);
  };

  return (
    <Root onPress={onPress} {...props}>
      {checked ? <Check /> : <Unchecked checked={checked} />}
    </Root>
  );
};

const Root = styled.Pressable``;

const Unchecked = styled.View<{ checked: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 50px;
  border-color: ${({ theme }) => theme.colors.checkbox.unchecked.outline};
  opacity: 0.5;
  border-width: 1px;
`;

const CheckIcon = ({ ...props }) => {
  const { colors } = useTheme();
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <Path
        d="M2 8L6 12L14 4"
        stroke={colors.checkbox.checked.tick}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

const Check = styled(CheckIcon)`
  width: 16px;
  height: 16px;
  position: relative;
`;
