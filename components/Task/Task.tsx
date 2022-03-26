import React, { useState } from "react";
import styled, { useTheme } from "styled-components/native";
import { Svg, Path } from "react-native-svg";
import { Checkbox } from "../Checkbox/Checkbox";
import { Typography } from "../Typography";
import { TextInput } from "react-native";

export interface TaskProps {
  children?: string;
  variant?: "normal" | "add";
  status?: "none" | "done" | "error";
}

export const Task: React.FC<TaskProps> = ({
  children,
  variant = "normal",
  status,
}) => {
  return (
    <Root variant={variant} status={status}>
      <CheckboxRoot>
        {variant === "normal" ? (
          <Checkbox checked={status === "done"} />
        ) : (
          <AddSign />
        )}
      </CheckboxRoot>

      {/* <TextInput value="boo"></TextInput> */}
      <Typography.Task.Label
        textDecorationLine={status === "done" ? "line-through" : "none"}
      >
        {children}
      </Typography.Task.Label>
    </Root>
  );
};

const Root = styled.View<Pick<TaskProps, "status" | "variant">>`
  padding: 12px;
  flex-direction: row;
  align-items: center;
  opacity: ${({ variant, status }) =>
    variant === "add" || status === "done" ? 0.25 : 1};
`;

const CheckboxRoot = styled.View`
  margin-right: 12px;
`;

const AddIcon = ({ ...props }) => {
  const { colors } = useTheme();
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M1 8H15M8 1V15"
        stroke={colors.checkbox.unchecked.outline}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

const AddSign = styled(AddIcon)`
  width: 16px;
  height: 16px;
  position: relative;
`;
