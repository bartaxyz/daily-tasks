import Svg, { Path } from "react-native-svg";
import styled, { useTheme } from "styled-components/native";

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

export const MoreSign = styled(MoreIcon)`
  width: 16px;
  height: 16px;
  position: relative;
`;
