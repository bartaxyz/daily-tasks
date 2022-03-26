import React from "react";
import styled from "styled-components/native";
import { ToolbarButton, ToolbarButtonProps } from "./ToolbarButton";

export interface ToolbarProps {}

export const Toolbar: React.FC<ToolbarProps> & {
  Button: React.FC<ToolbarButtonProps>;
} = (props) => <Root {...props} />;

Toolbar.Button = ToolbarButton;

const Root = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 8px;
`;
