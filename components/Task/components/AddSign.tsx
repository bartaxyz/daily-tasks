import Svg, { Path } from "react-native-svg";
import styled, { useTheme } from "styled-components/native";
import { CHECKBOX_SIZE } from "../../Checkbox";

const AddIcon = ({ ...props }) => {
  const { colors } = useTheme();

  return (
    <Svg
      width={CHECKBOX_SIZE}
      height={CHECKBOX_SIZE}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <Path
        d="M1 8H15M8 1V15"
        stroke={colors.checkbox.unchecked.outline}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const AddSign = styled(AddIcon)`
  width: 16px;
  height: 16px;
  position: relative;
`;
