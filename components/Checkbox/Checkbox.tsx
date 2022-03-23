import { Checkbox as RNPCheckbox } from "react-native-paper";
import {
  Animated,
  Platform,
  Pressable,
  PressableProps,
  View,
} from "react-native";
import styled from "styled-components/native";

Animated.createAnimatedComponent(Pressable);

export interface CheckboxProps extends PressableProps {
  checked: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, ...props }) => {
  if (Platform.OS === "android") {
    return (
      <View style={{ margin: -8 }}>
        <RNPCheckbox status={checked ? "checked" : "unchecked"} />
      </View>
    );
  }

  return <Root checked={checked} {...props} />;
};

const Root = styled.Pressable<{ checked: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 50px;
  border-color: ${({ theme }) => theme.colors.checkbox.unchecked.outline};
  opacity: 0.5;
  border-width: 1px;
`;
