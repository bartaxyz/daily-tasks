import Svg, { Circle, Path } from "react-native-svg";
import styled, { useTheme } from "styled-components/native";
import { CHECKBOX_SIZE } from "../../Checkbox";

const InactiveIcon = ({ ...props }) => {
  const { colors } = useTheme();

  return (
    <Svg
      width={CHECKBOX_SIZE}
      height={CHECKBOX_SIZE}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <Circle
        cx="8"
        cy="8"
        r="7"
        stroke={colors.checkbox.unchecked.outline}
        strokeOpacity="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const InactiveSign = styled(InactiveIcon)`
  width: 16px;
  height: 16px;
  position: relative;
`;
