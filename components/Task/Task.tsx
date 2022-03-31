import React, { useCallback, useEffect, useRef, useState } from "react";
import { Platform, TextInput, TextInputProps } from "react-native";
import styled, { useTheme } from "styled-components/native";
import { Svg, Path } from "react-native-svg";
import { debounce } from "lodash";
import { Checkbox } from "../Checkbox/Checkbox";
import { Typography } from "../Typography";

export interface TaskProps {
  editable?: boolean;
  children?: string;
  variant?: "normal" | "add" | "more";
  status?: "none" | "done" | "error" | "deleted" | "backlog";
  onTaskPress?: () => void;
  onValueChange?: (text: string) => void;
  onStatusChange?: (status: "none" | "done" | "error") => void;
  onDelete?: () => void;
  onEnterPress?: () => void;
  onOrderUp?: () => void;
  onOrderDown?: () => void;
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
  onOrderUp,
  onOrderDown,
}) => {
  const { colors } = useTheme();
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const [textInputHeight, setTextInputHeight] = useState(0);
  const keyboardShortcutMode = useRef<"none" | "ordering">("none");

  useEffect(() => {
    setValue(children || "");
  }, [children]);

  const onChangeHandlerDebounced = (text: string) => {
    if (onValueChange) onValueChange(text);
  };

  const debounceCallback = useCallback(
    debounce(onChangeHandlerDebounced, 250),
    []
  );

  const onChangeHandler: TextInputProps["onChange"] = (event) => {
    const { text } = event.nativeEvent;

    setValue(text);
    debounceCallback(text);
  };

  const onKeyPressHandler: TextInputProps["onKeyPress"] = (event) => {
    const { key } = event.nativeEvent;

    if (key === "Alt") {
      keyboardShortcutMode.current = "ordering";
    }
    if (keyboardShortcutMode.current === "ordering") {
      if (key === "Alt") {
      } else if (key === "ArrowUp") {
        if (onOrderUp) onOrderUp();
      } else if (key === "ArrowDown") {
        if (onOrderDown) onOrderDown();
      } else {
        keyboardShortcutMode.current = "none";
      }
    }

    if (key === "Backspace") {
      if (value.length === 0) {
        onDelete && onDelete();
      }
    }

    if (key === "Enter") {
      event.preventDefault();
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
        ) : variant === "add" ? (
          <AddSign />
        ) : (
          <MoreSign />
        )}
      </CheckboxRoot>

      {editable && variant !== "add" && variant !== "more" ? (
        <TextInput
          value={value.replace(/\n/g, "")}
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
              paddingTop: Platform.select({ web: 8, default: 6 }),
              paddingLeft: 0,
              height: Platform.select({
                web: textInputHeight,
                default: undefined,
              }),
              fontSize: Platform.select({ web: 12, default: 14 }),
              color: colors.text.default,
            },
            Platform.select({ web: { outlineWidth: 0 } as any, default: {} }),
          ]}
          onContentSizeChange={(event) => {
            setTextInputHeight(event.nativeEvent.contentSize.height);
          }}
        />
      ) : (
        <Typography.Task.Label
          style={{ padding: 8, paddingLeft: 0 }}
          fontSize={Platform.select({ web: 12, default: 14 })}
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
  padding: 4px;
  padding-top: 4px;
  padding-bottom: 4px;
  flex-direction: row;
  align-items: flex-start;
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

const MoreIcon = ({ ...props }) => {
  const { colors } = useTheme();
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M5 10C5 10.5523 4.55228 11 4 11C3.44772 11 3 10.5523 3 10C3 9.44772 3.44772 9 4 9C4.55228 9 5 9.44772 5 10Z"
        fill={colors.checkbox.unchecked.outline}
      />
      <Path
        d="M11 10C11 10.5523 10.5523 11 10 11C9.44772 11 9 10.5523 9 10C9 9.44772 9.44772 9 10 9C10.5523 9 11 9.44772 11 10Z"
        fill={colors.checkbox.unchecked.outline}
      />
      <Path
        d="M17 10C17 10.5523 16.5523 11 16 11C15.4477 11 15 10.5523 15 10C15 9.44772 15.4477 9 16 9C16.5523 9 17 9.44772 17 10Z"
        fill={colors.checkbox.unchecked.outline}
      />
    </Svg>
  );
};

const MoreSign = styled(MoreIcon)`
  width: 16px;
  height: 16px;
  position: relative;
`;
