import styled from "styled-components/native";
import { Typography } from "../Typography";

export interface TagProps {}

export const Tag: React.FC<TagProps> = ({ children }) => (
  <Border>
    <Root>
      <Label>{children}</Label>
    </Root>
  </Border>
);

const Border = styled.View`
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.section.separator};
  overflow: hidden;
`;

const Root = styled.View`
  padding: 3px 6px;
  background: ${({ theme }) => theme.colors.section.background};
`;

const Label = styled(Typography.Tag.Label)``;
