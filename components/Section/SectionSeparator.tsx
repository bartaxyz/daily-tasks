import styled, { useTheme } from "styled-components/native";

export interface SectionSeparatorProps {}

export const SectionSeparator: React.FC<SectionSeparatorProps> = ({
  ...props
}) => {
  const theme = useTheme();

  return <Root theme={theme} {...props} />;
};

const Root = styled.View<SectionSeparatorProps>`
  height: 1px;
  background: ${({ theme }) => theme.colors.section.separator};
`;
