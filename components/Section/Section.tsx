import React from "react";
import { View } from "react-native";
import styled, { useTheme } from "styled-components/native";
import { SectionContent, SectionContentProps } from "./SectionContent";
import { SectionSeparator, SectionSeparatorProps } from "./SectionSeparator";

export interface SectionProps {
  separator: "none" | "top" | "bottom" | "vertical" | "around";
  hasBackground?: boolean;
}

export const Section: React.FC<SectionProps> & {
  Content: React.FC<SectionContentProps>;
  Separator: React.FC<SectionSeparatorProps>;
} = (props) => {
  const theme = useTheme();
  const { separator, hasBackground = true } = props;

  const background = hasBackground ? (
    <Background theme={theme} {...props} />
  ) : (
    <View {...props} />
  );

  console.log({ theme });

  const content =
    separator === "around" ? (
      <Border {...props}>{background}</Border>
    ) : (
      background
    );

  return (
    <Root {...props}>
      {(separator === "top" || separator === "vertical") && (
        <Separator theme={theme} />
      )}
      {content}
      {(separator === "bottom" || separator === "vertical") && (
        <Separator theme={theme} />
      )}
    </Root>
  );
};

Section.Content = SectionContent;
Section.Separator = SectionSeparator;

const Root = styled.View<SectionProps>`
  flex: 1;
  flex-direction: column;
  align-items: stretch;
  margin: ${({ separator }) => (separator === "around" ? "12px" : 0)};
`;

const Border = styled.View<SectionProps>`
  flex: 1;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.section.separator};
  overflow: hidden;
`;

const Background = styled.View<SectionProps>`
  background: ${({ theme }) => theme.colors.background.default};
  flex: 1;
`;

const Separator = styled.View`
  height: 1px;
  background: ${({ theme }) => theme.colors.section.separator};
`;
