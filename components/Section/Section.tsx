import React from "react";
import { View, ViewProps } from "react-native";
import styled from "styled-components/native";
import { SectionContent, SectionContentProps } from "./SectionContent";
import { SectionSeparator, SectionSeparatorProps } from "./SectionSeparator";

export interface SectionProps extends ViewProps {
  separator: "none" | "top" | "bottom" | "vertical" | "around";
  hasBackground?: boolean;
}

export const Section: React.FC<SectionProps> & {
  Content: React.FC<SectionContentProps>;
  Separator: React.FC<SectionSeparatorProps>;
} = (props) => {
  const { separator, hasBackground = true } = props;

  const background = hasBackground ? (
    <Background {...props} />
  ) : (
    <View {...props} />
  );

  const content =
    separator === "around" ? (
      <Border {...props}>{background}</Border>
    ) : (
      background
    );

  return (
    <Root {...props}>
      {(separator === "top" || separator === "vertical") && <Separator />}
      {content}
      {(separator === "bottom" || separator === "vertical") && <Separator />}
    </Root>
  );
};

Section.Content = SectionContent;
Section.Separator = SectionSeparator;

const Root = styled.View<SectionProps>`
  flex-direction: column;
  margin: ${({ separator }) => (separator === "around" ? "12px" : 0)};
`;

const Border = styled.View<SectionProps>`
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.section.separator};
  overflow: hidden;
`;

const Background = styled.View<SectionProps>`
  background: ${({ theme }) => theme.colors.background.default};
`;

const Separator = styled.View`
  height: 1px;
  background: ${({ theme }) => theme.colors.section.separator};
`;
