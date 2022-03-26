import { useRef } from "react";
import { PressableProps, View } from "react-native";
import { useActive, useHover } from "react-native-web-hooks";
import styled from "styled-components/native";
import { TAB_HEIGHT } from "../Tabs";
import { ToolbarButtonIcon } from "./ToolbarButtonIcon";

export interface ToolbarButtonProps extends PressableProps {
  iconPath: string;
}

export const ToolbarButton: React.FC<ToolbarButtonProps> = (props) => {
  const { iconPath } = props;
  const ref = useRef<View>(null);
  const hover = useHover(ref);
  const active = useActive(ref);

  return (
    <Root ref={ref} hover={hover} active={active} {...props}>
      <ToolbarButtonIcon path={iconPath} hover={hover} active={active} />
    </Root>
  );
};

type RootProps = ToolbarButtonProps & {
  hover: boolean;
  active: boolean;
};
const Root = styled.Pressable<RootProps>`
  width: 38px;
  height: ${TAB_HEIGHT}px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;

  background: ${({ theme, hover, active }) =>
    active
      ? theme.colors.toolbar.button.backgroundActive
      : hover
      ? theme.colors.toolbar.button.backgroundHover
      : theme.colors.toolbar.button.background};
`;
