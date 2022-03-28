import styled from "styled-components/native";
import { Typography, TypographyProps } from "../Typography";

export interface SidebarTitleProps extends TypographyProps {}

export const SidebarTitle: React.FC<SidebarTitleProps> = (props) => (
  <Title {...props} />
);

const Title = styled(Typography.Sidebar.Title)`
  color: ${({ theme }) => theme.colors.sidebar.title.foreground};
  margin-bottom: 2px;
  margin-left: 5px;
`;
