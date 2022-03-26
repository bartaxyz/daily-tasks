import React, { useCallback, useState } from "react";
import { TextInput, TextInputProps } from "react-native";
import styled, { useTheme } from "styled-components/native";
import { Svg, Path } from "react-native-svg";
import { debounce } from "lodash";
import { Checkbox } from "../Checkbox/Checkbox";
import { Typography } from "../Typography";

export interface TaskProps {
  children?: string;
  variant?: "normal" | "add";
  status?: "none" | "done" | "error";
}

export const Task: React.FC<TaskProps> = ({
  children,
  variant = "normal",
  status,
}) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  const onChangeHandlerDebounced = (inputValue: string) => {
    // Update value
    // Send request
  };

  const debounceCallback = useCallback(
    debounce(onChangeHandlerDebounced, 1000),
    []
  );

  const onChangeHandler: TextInputProps["onChange"] = (event) => {
    setValue(event.nativeEvent.text);
    debounceCallback(event.nativeEvent.text);
  };

  return (
    <Root
      variant={variant}
      status={status}
      onPress={() => {
        setFocused(true);
      }}
    >
      <CheckboxRoot>
        {variant === "normal" ? (
          <Checkbox checked={status === "done"} />
        ) : (
          <AddSign />
        )}
      </CheckboxRoot>

      {variant === "normal" && !focused ? (
        <Typography.Task.Label
          textDecorationLine={status === "done" ? "line-through" : "none"}
        >
          {children}
        </Typography.Task.Label>
      ) : (
        <TextInput value={value} onChange={onChangeHandler}></TextInput>
      )}
    </Root>
  );
};

const Root = styled.Pressable<Pick<TaskProps, "status" | "variant">>`
  padding: 12px;
  flex-direction: row;
  align-items: center;
  opacity: ${({ variant, status }) =>
    variant === "add" || status === "done" ? 0.25 : 1};
`;

const CheckboxRoot = styled.View`
  margin-right: 12px;
`;

const AddIcon = ({ ...props }) => {
  const { colors } = useTheme();
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M1 8H15M8 1V15"
        stroke={colors.checkbox.unchecked.outline}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

const AddSign = styled(AddIcon)`
  width: 16px;
  height: 16px;
  position: relative;
`;
