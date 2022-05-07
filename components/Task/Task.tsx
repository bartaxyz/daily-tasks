import React, { useRef, useState } from "react";
import {
  Animated,
  Platform,
  Pressable,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import styled from "styled-components/native";
import { Checkbox } from "../Checkbox/Checkbox";
import { Typography } from "../Typography";
import { useActive, useHover } from "react-native-web-hooks";
import { TaskActionButton } from "./TaskActionButton";
import { AddSign } from "./components/AddSign";
import { MoreSign } from "./components/MoreSign";

export interface TaskProps {
  id: string;
  context: "today" | "overdue" | "backlog" | "trash" | "project" | "none";
  editable?: boolean;
  children?: string;
  variant?: "normal" | "add" | "more";
  status?: "none" | "done" | "error" | "deleted" | "backlog";
  textInputPropOverrides?: TextInputProps;
  textInputRef?: (ref: TextInput | null) => void;
  onTaskPress?: () => void;
  onValueChange?: (text: string) => void;
  onFinishedValueChange?: (text: string) => void;
  onStatusChange?: (status: "none" | "done" | "error") => void;
  onDelete?: () => void;
  onEnterPress?: (selection: {
    textBeforeSelect: string;
    textAfterSelect: string;
  }) => void;
  onOrderUp?: () => void;
  onOrderDown?: () => void;
}

export const addTaskPlaceholderText = "Add a task";

export const Task: React.FC<TaskProps> = ({
  id,
  context,
  editable = true,
  children,
  variant = "normal",
  status,
  onTaskPress,
  onStatusChange,
}) => {
  const rootRef = useRef<View | null>(null);
  const active = useActive(rootRef);
  const hover = useHover(rootRef);
  const [selected] = useState(false);

  const [heightAnimatedValue] = useState(new Animated.Value(0));

  const onCheckboxChange = (checked: boolean) => {
    if (onStatusChange) onStatusChange(checked ? "done" : "none");
  };

  return (
    <Root
      ref={rootRef}
      active={active}
      hover={hover}
      variant={variant}
      status={status}
      onPress={() => {
        if (onTaskPress) onTaskPress();
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          flex: 1,
          padding: 4,
        }}
        onLayout={({ nativeEvent }) => {
          Animated.timing(heightAnimatedValue, {
            toValue: nativeEvent.layout.height,
            duration: 80,
            useNativeDriver: false,
          }).start();
        }}
      >
        <CheckboxRoot>
          {variant === "normal" ? (
            <Checkbox
              tabIndex={-1}
              checked={status === "done"}
              onChange={onCheckboxChange}
              disabled={!editable}
            />
          ) : variant === "add" ? (
            <AddSign />
          ) : (
            <MoreSign />
          )}
        </CheckboxRoot>

        <Typography.Task.Label
          style={{
            flex: 1,
            padding: 8,
            paddingLeft: 0,
            opacity: variant === "add" ? (active ? 1 : hover ? 0.5 : 0.25) : 1,
          }}
          fontSize={Platform.select({ web: 12, default: 14 })}
          textDecorationLine={status === "done" ? "line-through" : "none"}
        >
          {variant === "add" ? addTaskPlaceholderText : children}
        </Typography.Task.Label>

        {/** Actions */}
        {variant !== "add" && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingTop: 6,
              paddingRight: 8,
              opacity: hover || selected ? 1 : 0,
            }}
          >
            <TaskActionButton taskId={id} context={context} />
          </View>
        )}
      </View>
    </Root>
  );
};

interface RootProps extends Pick<TaskProps, "status" | "variant"> {
  hover: boolean;
  active: boolean;
}
const Root = styled(Pressable)<RootProps>`
  flex-direction: row;
  align-items: flex-start;
  // background-color: ${({ theme }) => theme.colors.section.background};
  overflow: hidden;
  padding: 4px 16px;
`;

const CheckboxRoot = styled.View`
  margin: ${Platform.select({ ios: 0, default: 8 })}px;
  margin-top: ${Platform.select({ ios: 6, default: 8 })}px;
  margin-right: 12px;
`;
