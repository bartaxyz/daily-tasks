import { Svg, Path } from "react-native-svg";
import { useTheme } from "styled-components/native";

export interface ToolbarButtonIconProps {
  path: string;
  hover: boolean;
  active: boolean;
}

export const ToolbarButtonIcon: React.FC<ToolbarButtonIconProps> = ({
  hover,
  active,
  path,
}) => {
  const { colors } = useTheme();
  const fill = active
    ? colors.toolbar.button.foregroundActive
    : hover
    ? colors.toolbar.button.foregroundHover
    : colors.toolbar.button.foreground;

  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <Path d={path} fill={fill} />
    </Svg>
  );
};
