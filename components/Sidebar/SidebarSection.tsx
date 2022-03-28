import { ViewProps } from "react-native";
import styled from "styled-components/native";

export interface SidebarSectionProps extends ViewProps {}

export const SidebarSection: React.FC<SidebarSectionProps> = (props) => (
  <Root {...props} />
);

const Root = styled.View<SidebarSectionProps>`
  margin-bottom: 16px;
`;
