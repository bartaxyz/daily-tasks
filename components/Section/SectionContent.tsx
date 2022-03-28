import { ViewProps } from "react-native";
import styled from "styled-components/native";

export interface SectionContentProps extends ViewProps {
  inset: "XXS" | "XS" | "S" | "M";
  maxWidth?: 560;
}

export const SectionContent: React.FC<SectionContentProps> = ({ ...props }) => (
  <Root {...props} />
);

const Root = styled.View<SectionContentProps>`
  max-width: ${({ maxWidth }) =>
    typeof maxWidth !== "undefined" ? maxWidth : undefined}px;
  width: ${({ maxWidth }) =>
    typeof maxWidth !== "undefined" ? "100%" : undefined};
  margin: ${({ maxWidth }) =>
    typeof maxWidth !== "undefined" ? "auto" : 0};
  padding: ${({ inset }) =>
    inset === "XXS"
      ? "4px"
      : inset === "XS"
      ? "8px"
      : inset === "S"
      ? "12px"
      : "24px"};
`;
