import { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components/native";
import { Typography } from "../Typography";

export interface KeyboardKeyProps {
  children: "backspace" | "alt" | string;
}

/**
 * Key map
 */
const keyMap = {
  backspace: "⌫",
  space: "Space", // "␣",
  alt: "Option ⌥",
  cmd: "Command ⌘",
  enter: "Enter",
  tab: "Tab",
  arrowUp: "↑",
  arrowDown: "↓",
};
const keyMapKeys = Object.keys(keyMap);

export const KeyboardKey: React.FC<KeyboardKeyProps> = ({ children }) => {
  const { colors } = useTheme();
  const [pressed, setPressed] = useState(false);

  const label = keyMapKeys.includes(children)
    ? keyMap[children as keyof typeof keyMap]
    : children;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === children) {
        setPressed(true);
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === children) {
        setPressed(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return (
    <Root
      style={{
        elevation: 2,
        shadowColor: colors.section.separator,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      }}
    >
      <Background pressed={pressed}>
        <Typography.Caption>{label}</Typography.Caption>
      </Background>
    </Root>
  );
};

const Root = styled.View`
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.keyboardKey.separator};
  flex-shrink: 1;
  align-self: flex-start;
  border-radius: 4px;
  overflow: hidden;
`;

const Background = styled.View<{ pressed: boolean }>`
  background-color: ${({ theme, pressed }) =>
    pressed
      ? theme.colors.keyboardKey.backgroundPressed
      : theme.colors.keyboardKey.background};
  padding: 2px;
  padding-left: 3px;
  padding-right: 3px;
`;
