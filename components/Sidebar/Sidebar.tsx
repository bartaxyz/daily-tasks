import React from "react";
import styled from "styled-components/native";
import { SidebarButton, SidebarButtonProps } from "./SidebarButton";
import { SidebarSection, SidebarSectionProps } from "./SidebarSection";
import { SidebarTitle, SidebarTitleProps } from "./SidebarTitle";

export interface SidebarProps {
  children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> & {
  Button: React.FC<SidebarButtonProps>;
  Section: React.FC<SidebarSectionProps>;
  Title: React.FC<SidebarTitleProps>;
} = ({ ...props }) => {
  return <Root {...props} />;
};

Sidebar.Button = SidebarButton;
Sidebar.Section = SidebarSection;
Sidebar.Title = SidebarTitle;

const Root = styled.View`
  flex: 1;
  max-width: 240px;
  height: 100%;
  border-right-width: 1px;
  border-right-color: ${({ theme }) => theme.colors.section.separator};
`;
