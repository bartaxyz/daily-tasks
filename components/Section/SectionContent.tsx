import { Platform, ViewProps } from "react-native";
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
    typeof maxWidth !== "undefined" ? `${maxWidth}px` : "auto"};
  width: ${({ maxWidth }) =>
    typeof maxWidth !== "undefined" ? "100%" : "auto"};
  margin: ${({ maxWidth }) => (typeof maxWidth !== "undefined" ? "auto" : 0)};
  padding: ${({ inset }) =>
    inset === "XXS"
      ? "4px"
      : inset === "XS"
      ? Platform.select({ web: "8px", default: "12px" })
      : inset === "S"
      ? Platform.select({ web: "12px", default: "16px" })
      : "24px"};
`;
