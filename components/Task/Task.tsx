import React, { useCallback, useEffect, useState } from "react";
import { Platform, TextInput, TextInputProps } from "react-native";
import styled, { useTheme } from "styled-components/native";
import { Svg, Path } from "react-native-svg";
import { debounce } from "lodash";
import { Checkbox } from "../Checkbox/Checkbox";
import { Typography } from "../Typography";

export interface TaskProps {
  editable?: boolean;
  children?: string;
  variant?: "normal" | "add";
  status?: "none" | "done" | "error";
  onTaskPress?: () => void;
  onValueChange?: (text: string) => void;
  onStatusChange?: (status: "none" | "done" | "error") => void;
  onDelete?: () => void;
  onEnterPress?: () => void;
}

const addTaskPlaceholderText = "Add a task";

export const Task: React.FC<TaskProps> = ({
  editable = true,
  children,
  variant = "normal",
  status,
  onTaskPress,
  onValueChange,
  onStatusChange,
  onDelete,
  onEnterPress,
}) => {
  const { colors } = useTheme();
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const [textInputHeight, setTextInputHeight] = useState(0);

  useEffect(() => {
    setValue(children || "");
  }, [children]);

  const onChangeHandlerDebounced = (text: string) => {
    if (onValueChange) onValueChange(text);
  };

  const debounceCallback = useCallback(
    debounce(onChangeHandlerDebounced, 1000),
    []
  );

  const onChangeHandler: TextInputProps["onChange"] = (event) => {
    const { text } = event.nativeEvent;

    setValue(text);
    debounceCallback(text);
  };

  const onKeyPressHandler: TextInputProps["onKeyPress"] = (event) => {
    const { key } = event.nativeEvent;

    console.log(event);

    if (key === "Backspace") {
      if (value.length === 0) {
        onDelete && onDelete();
      }
    }

    if (key === "Enter") {
      onEnterPress && onEnterPress();
    }
  };

  const onFocus = () => {
    setFocused(true);
  };

  const onBlur = () => {
    setFocused(false);
  };

  const onCheckboxChange = (checked: boolean) => {
    console.log({ checked });
    if (onStatusChange) onStatusChange(checked ? "done" : "none");
  };

  return (
    <Root
      variant={variant}
      status={status}
      onPress={() => {
        setFocused(true);
        if (onTaskPress) onTaskPress();
      }}
    >
      <CheckboxRoot>
        {variant === "normal" ? (
          <Checkbox checked={status === "done"} onChange={onCheckboxChange} />
        ) : (
          <AddSign />
        )}
      </CheckboxRoot>

      {editable && variant !== "add" ? (
        <TextInput
          value={value}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
          multiline={true}
          editable={editable}
          onFocus={onFocus}
          onBlur={onBlur}
          style={[
            {
              flex: 1,
              textDecorationLine: status === "done" ? "line-through" : "none",
              padding: 8,
              paddingTop: 7,
              paddingLeft: 0,
              height: textInputHeight,
              fontSize: 13,
              color: colors.text.default,
            },
            Platform.select({ web: { outlineWidth: 0 } as any }),
          ]}
          onContentSizeChange={(event) => {
            setTextInputHeight(event.nativeEvent.contentSize.height);
          }}
        />
      ) : (
        <Typography.Task.Label
          style={{ padding: 8, paddingTop: 7, paddingLeft: 0 }}
          textDecorationLine={status === "done" ? "line-through" : "none"}
        >
          {variant === "add" ? addTaskPlaceholderText : children}
        </Typography.Task.Label>
      )}

      {/* {variant === "normal" && !focused ? (
        <Typography.Task.Label
          textDecorationLine={status === "done" ? "line-through" : "none"}
        >
          {children}
        </Typography.Task.Label>
      ) : (
        <TextInput
          value={value}
          onChange={onChangeHandler}
          onBlur={onBlur}
        />
      )} */}
    </Root>
  );
};

const Root = styled.Pressable<Pick<TaskProps, "status" | "variant">>`
  padding: 8px;
  padding-top: 0;
  padding-bottom: 8px;
  flex-direction: row;
  align-items: start;
  opacity: ${({ variant, status }) =>
    variant === "add" || status === "done" ? 0.25 : 1};
`;

const CheckboxRoot = styled.View`
  margin: 8px;
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
