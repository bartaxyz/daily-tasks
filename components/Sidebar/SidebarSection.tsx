import { ViewProps } from "react-native";
import styled from "styled-components/native";

export interface SidebarSectionProps extends ViewProps {}

export const SidebarSection: React.FC<SidebarSectionProps> = (props) => (
  <Root {...props} />
);

const Root = styled.View<SidebarSectionProps>`
  margin-top: 10px;
  margin-bottom: 6px;
  margin-left: 10px;
  margin-right: 10px;
`;
