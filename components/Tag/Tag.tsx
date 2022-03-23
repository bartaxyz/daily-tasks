import styled from "styled-components/native";
import { TAB_HEIGHT } from "../Tabs";
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
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.section.separator};
  overflow: hidden;
  height: ${TAB_HEIGHT}px;
`;

const Root = styled.View`
  padding: 3px 6px;
  flex: 1;
`;

const Label = styled(Typography.Tag.Label)``;
