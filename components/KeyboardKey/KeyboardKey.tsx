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

  const label = keyMapKeys.includes(children)
    ? keyMap[children as keyof typeof keyMap]
    : children;

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
      <Background>
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

const Background = styled.View`
  background-color: ${({ theme }) => theme.colors.keyboardKey.background};
  padding: 2px;
  padding-left: 3px;
  padding-right: 3px;
`;
