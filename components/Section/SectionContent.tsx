import { ViewProps } from "react-native";
import styled from "styled-components/native";

export interface SectionContentProps extends ViewProps {
  inset: "XXS" | "XS" | "S" | "M";
}

export const SectionContent: React.FC<SectionContentProps> = ({ ...props }) => (
  <Root {...props} />
);

const Root = styled.View<SectionContentProps>`
  padding: ${({ inset }) =>
    inset === "XXS"
      ? "4px"
      : inset === "XS"
      ? "8px"
      : inset === "S"
      ? "12px"
      : "24px"};
`;
