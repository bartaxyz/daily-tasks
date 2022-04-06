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
  trash:
    "M8.5 3C8.22386 3 8 3.22386 8 3.5V5H12V3.5C12 3.22386 11.7761 3 11.5 3H8.5ZM13 5V3.5C13 2.67157 12.3284 2 11.5 2H8.5C7.67157 2 7 2.67157 7 3.5V5H5.50672C5.50265 4.99995 5.49857 4.99995 5.49448 5H4.5C4.22386 5 4 5.22386 4 5.5C4 5.77614 4.22386 6 4.5 6H5.04751L5.91243 14.6493C5.98911 15.4161 6.63436 16 7.40499 16H12.595C13.3656 16 14.0109 15.4161 14.0876 14.6493L14.9525 6H15.5C15.7761 6 16 5.77614 16 5.5C16 5.22386 15.7761 5 15.5 5H14.5055C14.5014 4.99995 14.4974 4.99995 14.4933 5H13ZM13.9475 6H12.5H7.5H6.05249L6.90747 14.5498C6.93303 14.8054 7.14811 15 7.40499 15H12.595C12.8519 15 13.067 14.8054 13.0925 14.5498L13.9475 6ZM8.14805 14.1287C8.418 14.1287 8.5875 13.9592 8.58122 13.7081L8.39289 7.14139C8.38661 6.89028 8.21083 6.72705 7.95343 6.72705C7.68976 6.72705 7.52026 6.89655 7.52654 7.14767L7.71487 13.7144C7.72115 13.9655 7.89693 14.1287 8.14805 14.1287ZM10 14.1287C10.2637 14.1287 10.4458 13.9655 10.4458 13.7144V7.14767C10.4458 6.89655 10.2637 6.72705 10 6.72705C9.73636 6.72705 9.56058 6.89655 9.56058 7.14767V13.7144C9.56058 13.9655 9.73636 14.1287 10 14.1287ZM11.852 14.135C12.1031 14.135 12.2789 13.9655 12.2852 13.7144L12.4735 7.14767C12.4798 6.89655 12.3103 6.73333 12.0466 6.73333C11.7892 6.73333 11.6135 6.89655 11.6072 7.14767L11.4188 13.7144C11.4126 13.9592 11.5821 14.135 11.852 14.135Z",
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
  justify-content: flex-start;
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
  margin-left: 6px;
  margin-right: 4px;
`;

const Label = styled(Typography.Sidebar.Button.Label)`
  color: ${({ theme }) => theme.colors.sidebar.button.foreground};
`;
