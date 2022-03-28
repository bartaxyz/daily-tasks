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
    "M6.55971 16.3372H13.4466C14.7335 16.3372 15.4429 15.6466 15.4429 14.3597V8.27009C16.0331 8.11314 16.3658 7.62347 16.3658 6.92662V6.01004C16.3658 5.16253 15.8761 4.61635 15.0286 4.61635H4.97768C4.16155 4.61635 3.63421 5.16253 3.63421 6.01004V6.92662C3.63421 7.62347 3.96694 8.11314 4.56334 8.26381V14.3597C4.56334 15.6529 5.26646 16.3372 6.55971 16.3372ZM5.22252 7.18401C4.92746 7.18401 4.80818 7.05218 4.80818 6.76339V6.16699C4.80818 5.87821 4.92746 5.74637 5.22252 5.74637H14.79C15.0788 5.74637 15.1981 5.87821 15.1981 6.16699V6.76339C15.1981 7.05218 15.0788 7.18401 14.79 7.18401H5.22252ZM6.60993 15.1569C6.08259 15.1569 5.79381 14.8744 5.79381 14.3408V8.31403H14.2125V14.3408C14.2125 14.8744 13.9174 15.1569 13.3901 15.1569H6.60993ZM7.97852 10.8754H12.034C12.3291 10.8754 12.5426 10.6682 12.5426 10.3606V10.1597C12.5426 9.85212 12.3291 9.64495 12.034 9.64495H7.97852C7.68345 9.64495 7.47001 9.85212 7.47001 10.1597V10.3606C7.47001 10.6682 7.68345 10.8754 7.97852 10.8754Z",
  folder:
    "M4.86475 15.5476H15.2798C16.4914 15.5476 17.1945 14.8444 17.1945 13.501V7.04102C17.1945 5.69754 16.4851 4.99442 15.1291 4.99442H9.3095C8.85749 4.99442 8.58754 4.89397 8.23598 4.60519L7.88442 4.31641C7.43869 3.95229 7.11223 3.83301 6.45306 3.83301H4.67641C3.49616 3.83301 2.79932 4.52358 2.79932 5.84821V13.501C2.79932 14.8507 3.50872 15.5476 4.86475 15.5476ZM4.04862 5.95494C4.04862 5.38365 4.36879 5.08231 4.92752 5.08231H6.12033C6.56606 5.08231 6.82973 5.18903 7.18757 5.47782L7.53913 5.77288C7.97859 6.12444 8.31759 6.25 8.97677 6.25H15.0475C15.6251 6.25 15.9452 6.55134 15.9452 7.15402V7.52441H4.04862V5.95494ZM4.94636 14.2983C4.36879 14.2983 4.04862 13.9969 4.04862 13.388V8.62305H15.9452V13.3943C15.9452 13.9969 15.6251 14.2983 15.0475 14.2983H4.94636Z",
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
      <Path d={iconPath} fill={colors.primary} />
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
