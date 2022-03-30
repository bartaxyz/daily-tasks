import { PressableProps } from "react-native";
import styled, { useTheme } from "styled-components/native";
import { Svg, Path } from "react-native-svg";
import { Typography } from "../Typography";

export interface SidebarButtonProps extends PressableProps {
  selected?: boolean;
  icon: keyof typeof icons;
}

const icons = {
  backlog:
    "M4.5 5C4.22386 5 4 5.22386 4 5.5V6.5C4 6.77614 4.22386 7 4.5 7H15.5C15.7761 7 16 6.77614 16 6.5V5.5C16 5.22386 15.7761 5 15.5 5H4.5ZM3 6.5C3 7.15311 3.4174 7.70873 4 7.91465V14.5C4 15.3284 4.67157 16 5.5 16H14.5C15.3284 16 16 15.3284 16 14.5V7.91465C16.5826 7.70873 17 7.15311 17 6.5V5.5C17 4.67157 16.3284 4 15.5 4H4.5C3.67157 4 3 4.67157 3 5.5V6.5ZM15 14.5V8H5V14.5C5 14.7761 5.22386 15 5.5 15H14.5C14.7761 15 15 14.7761 15 14.5ZM7.5 10C7.22386 10 7 10.2239 7 10.5C7 10.7761 7.22386 11 7.5 11H12.5C12.7761 11 13 10.7761 13 10.5C13 10.2239 12.7761 10 12.5 10H7.5Z",
  folder:
    "M4 5.5C4 5.22386 4.22386 5 4.5 5H7.08579C7.21839 5 7.34557 5.05268 7.43934 5.14645L7.85355 5.56066C8.13486 5.84197 8.51639 6 8.91421 6H15.5C15.7761 6 16 6.22386 16 6.5V8H4V5.5ZM3 8.5V5.5C3 4.67157 3.67157 4 4.5 4H7.08579C7.48361 4 7.86514 4.15804 8.14645 4.43934L8.56066 4.85355C8.65443 4.94732 8.78161 5 8.91421 5H15.5C16.3284 5 17 5.67157 17 6.5V8.5V14.5C17 15.3284 16.3284 16 15.5 16H4.5C3.67157 16 3 15.3284 3 14.5V8.5ZM16 9V14.5C16 14.7761 15.7761 15 15.5 15H4.5C4.22386 15 4 14.7761 4 14.5V9H16Z",
};

export const SidebarButton: React.FC<SidebarButtonProps> = ({
  children,
  icon,
  ...props
}) => {
  return (
    <Root {...props}>
      <Icon iconPath={icons[icon]} />
      <Label>{children}</Label>
    </Root>
  );
};

const Root = styled.Pressable<Pick<SidebarButtonProps, "selected">>`
  flex-direction: row;
  align-items: center;
  justify-content: start;
  background: ${({ theme, selected }) =>
    selected
      ? theme.colors.sidebar.button.backgroundActive
      : theme.colors.sidebar.button.background};
  border-radius: 5px;
  height: 28px;
`;

const IconComponent: React.FC<{ iconPath: string }> = ({
  iconPath,
  ...props
}) => {
  const { colors } = useTheme();
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d={iconPath}
        fill={colors.primary}
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </Svg>
  );
};

const Icon = styled(IconComponent)`
  margin-left: 8px;
  margin-right: 4px;
`;

const Label = styled(Typography.Sidebar.Button.Label)`
  color: ${({ theme }) => theme.colors.sidebar.button.foreground};
`;
