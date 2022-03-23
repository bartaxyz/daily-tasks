import styled from "styled-components/native";

export interface SectionContentProps {
  inset: "S" | "M";
}

export const SectionContent: React.FC<SectionContentProps> = ({ ...props }) => (
  <Root {...props} />
);

const Root = styled.View<SectionContentProps>`
  padding: ${({ inset }) => (inset === "S" ? "12px" : "24px")};
`;
