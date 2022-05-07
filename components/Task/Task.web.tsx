import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Platform,
  Pressable,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import styled, { useTheme } from "styled-components/native";
import { debounce } from "lodash";
import { Checkbox } from "../Checkbox/Checkbox";
import { Typography } from "../Typography";
import { useActive, useHover } from "react-native-web-hooks";
import { rgba } from "polished";
import { useStatusBar } from "../../utils/providers/StatusBarProvider";
import { TaskActionButton } from "./TaskActionButton";
import { AddSign } from "./components/AddSign";
import { MoreSign } from "./components/MoreSign";
import { TaskProps, addTaskPlaceholderText } from "./Task";

export const Task: React.FC<TaskProps> = ({
  id,
  context,
  editable = true,
  children,
  variant = "normal",
  status,
  textInputPropOverrides,
  textInputRef,
  onTaskPress,
  onValueChange,
  onFinishedValueChange,
  onStatusChange,
  onDelete,
  onEnterPress,
  onOrderUp,
  onOrderDown,
}) => {
  const { colors } = useTheme();
  const rootRef = useRef<View | null>(null);
  const textInputInnerRef = useRef<TextInput | null>(null);
  const active = useActive(rootRef);
  const hover = useHover(rootRef);
  const firstFocusedRender = useRef<boolean>(false);
  const [focused, setFocused] = useState(false);
  const [selected, setSelected] = useState(false);
  const [shift, setShift] = useState(false);
  const [internalValue, setInternalValue] = useState("");
  const [textInputHeight, setTextInputHeight] = useState(0);
  const { setKeyboardShortcuts, clearKeyboardShortcuts } = useStatusBar();

  const [heightAnimatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    rootRef.current?.setNativeProps({
      tabIndex: -1,
    });
  }, [rootRef.current]);

  useEffect(() => {
    firstFocusedRender.current = false;
  }, [firstFocusedRender.current]);

  const selection = useRef({ start: 0, end: 0 });

  const onSelectionChangeHandler: TextInputProps["onSelectionChange"] = (
    event
  ) => {
    selection.current = event.nativeEvent.selection;
  };

  useEffect(() => {
    if (!focused) {
      setInternalValue(children || "");
    }
  }, [children]);

  const onChangeHandlerDebounced = (text: string) => {
    if (onValueChange) onValueChange(text);
  };

  const debounceCallback = useCallback(
    debounce(onChangeHandlerDebounced, 100),
    []
  );

  const onChangeHandler: TextInputProps["onChange"] = (event) => {
    const { text } = event.nativeEvent;

    setInternalValue(text);
    debounceCallback(text);
  };

  const pressedKeys = useRef<string[]>([]);
  const keyboardCombination = (combination: string[]) => {
    /**
     * return if combination is exactly the same as pressed keys
     */
    if (pressedKeys.current.length !== combination.length) return false;
    for (let i = 0; i < combination.length; i++) {
      if (combination[i] !== pressedKeys.current[i]) return false;
    }
    return true;
  };

  const onKeyPressHandler: TextInputProps["onKeyPress"] = (event) => {
    const key = event.nativeEvent.key.toLowerCase();

    if (pressedKeys.current.indexOf(key) === -1) {
      pressedKeys.current.push(key);
    }

    console.log({ key }, pressedKeys.current);

    if (keyboardCombination(["alt", " "])) {
      console.log("SPACE");
    }

    if (keyboardCombination(["alt"])) {
      setSelected(true);
    }

    if (keyboardCombination(["alt", "shift"])) {
      setShift(true);
    }

    if (keyboardCombination(["alt", "shift", "arrowup"])) {
      event.preventDefault();
      if (onOrderUp) onOrderUp();
    } else if (keyboardCombination(["alt", "shift", "arrowdown"])) {
      event.preventDefault();
      if (onOrderDown) onOrderDown();
    } else if (keyboardCombination(["alt", "backspace"])) {
      event.preventDefault();
      if (onDelete) {
        clearKeyboardShortcuts();
        onDelete();
      }
    } else if (keyboardCombination(["alt", " "])) {
      console.log("ASDJF");
      event.preventDefault();
      onCheckboxChange(status === "none" ? true : false);
    } else if (keyboardCombination(["enter"])) {
      event.preventDefault();
      textInputInnerRef.current?.blur();
      if (onEnterPress)
        onEnterPress({
          textBeforeSelect: internalValue.slice(0, selection.current.start),
          textAfterSelect: internalValue.slice(selection.current.end),
        });
    } else if (keyboardCombination(["backspace"])) {
      if (internalValue.length === 0) {
        event.preventDefault();
        if (onDelete) {
          clearKeyboardShortcuts();
          onDelete();
        }
      }
    }
  };

  const onKeyUpHandler: TextInputProps["onKeyPress"] = (event) => {
    const key = event.nativeEvent.key.toLowerCase();

    if (pressedKeys.current.indexOf(key) !== -1) {
      pressedKeys.current.splice(pressedKeys.current.indexOf(key), 1);
    }

    if (key === "shift") {
      setShift(false);
    }

    if (key === "alt") {
      setSelected(false);
    }
  };

  useEffect(() => {
    if (focused && !selected) {
      setKeyboardShortcuts([
        {
          prefix: "Hold",
          combination: ["alt"],
          suffix: "to select task",
        },
      ]);
    } else if (focused && selected && !shift) {
      setKeyboardShortcuts([
        {
          prefix: "Hold",
          combination: ["shift"],
          suffix: "for more",
        },
        {
          combination: ["backspace"],
          suffix: "to delete",
        },
        {
          combination: ["space"],
          suffix: "to finish",
        },
      ]);
    } else if (focused && selected && shift) {
      setKeyboardShortcuts([
        {
          combination: ["arrowUp"],
          suffix: "to order up",
        },
        {
          combination: ["arrowDown"],
          suffix: "to order down",
        },
      ]);
    } else {
      clearKeyboardShortcuts();
    }
  }, [focused, selected, shift]);

  const onFocus = () => {
    setFocused(true);

    setInternalValue(children || "");
  };

  const onBlur = () => {
    pressedKeys.current = [];
    setFocused(false);
    if (onFinishedValueChange) onFinishedValueChange(internalValue);
  };

  const onCheckboxChange = (checked: boolean) => {
    if (onStatusChange) onStatusChange(checked ? "done" : "none");
  };

  const [selectedAnimatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    if (selected) {
      Animated.timing(selectedAnimatedValue, {
        toValue: 1,
        duration: 80,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(selectedAnimatedValue, {
        toValue: 0,
        duration: 80,
        useNativeDriver: false,
      }).start();
    }
  }, [selected]);

  return (
    <Root
      ref={rootRef}
      active={active}
      hover={hover}
      selected={selected}
      variant={variant}
      status={status}
      onPress={() => {
        setFocused(true);
        if (onTaskPress) onTaskPress();
      }}
      style={{
        backgroundColor: selectedAnimatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [
            rgba(colors.text.default, 0),
            rgba(colors.text.default, 0.075),
          ],
        }),
        /* height: Platform.select({
          web: heightAnimatedValue,
          default: "auto",
        } as any), */
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

        {editable && variant !== "add" && variant !== "more" ? (
          <TextInput
            ref={(ref) => {
              textInputInnerRef.current = ref;
              if (textInputRef) {
                textInputRef(ref);
              }
            }}
            value={internalValue.replace(/\n/g, "")}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            {...(Platform.OS === "web" ? { onKeyUp: onKeyUpHandler } : {})}
            onSelectionChange={onSelectionChangeHandler}
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
                  default: "auto",
                } as any),
                fontSize: Platform.select({ web: 12, default: 14 }),
                color: colors.text.default,
                opacity: status === "done" ? 0.25 : 1,
              },
              Platform.select({
                web: { outlineWidth: 0 } as any,
                default: {},
              }),
            ]}
            onContentSizeChange={(event) => {
              setTextInputHeight(event.nativeEvent.contentSize.height);
            }}
            {...textInputPropOverrides}
          />
        ) : (
          <Typography.Task.Label
            style={{
              flex: 1,
              padding: 8,
              paddingLeft: 0,
              opacity:
                variant === "add" ? (active ? 1 : hover ? 0.5 : 0.25) : 1,
            }}
            fontSize={Platform.select({ web: 12, default: 14 })}
            textDecorationLine={status === "done" ? "line-through" : "none"}
          >
            {variant === "add" ? addTaskPlaceholderText : children}
          </Typography.Task.Label>
        )}

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
  selected: boolean;
}
const Root = styled(Animated.createAnimatedComponent(Pressable))<RootProps>`
  flex-direction: row;
  align-items: flex-start;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.section.background};
  overflow: hidden;
`;

const CheckboxRoot = styled.View`
  margin: ${Platform.select({ ios: 0, default: 8 })}px;
  margin-top: ${Platform.select({ ios: 4, default: 8 })}px;
  margin-right: 12px;
`;
