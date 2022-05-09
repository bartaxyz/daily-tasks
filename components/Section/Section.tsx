import { rgba } from "polished";
import React from "react";
import { Platform, View, ViewProps } from "react-native";
import styled, { useTheme } from "styled-components/native";
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
  const { colors } = useTheme();

  const background = hasBackground ? (
    <Background {...props} />
  ) : (
    <View {...props} />
  );

  const content =
    separator === "around"
      ? Platform.select({
          web: <Border {...props}>{background}</Border>,
          default: background,
        })
      : background;

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
  border-radius: ${Platform.select({ android: "4px", default: "6px" })};
  border: 1px solid ${({ theme }) => theme.colors.section.separator};
  overflow: hidden;
`;

const Background = styled.View<SectionProps>`
  border-radius: ${Platform.select({ web: "0px", default: "12px" })};
  background: ${({ theme, separator }) =>
    Platform.select({
      web: theme.colors.background.default,
      default:
        separator === "around"
          ? rgba(theme.colors.section.separator, 0.025)
          : theme.colors.section.background,
    })};
`;

const Separator = styled.View`
  height: 1px;
  background: ${({ theme }) => theme.colors.section.separator};
`;
