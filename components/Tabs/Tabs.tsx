import React, { useRef } from "react";
import { PressableProps, View } from "react-native";
import styled from "styled-components/native";
import { useHover, useActive } from "react-native-web-hooks";
import { Typography } from "../Typography";

export interface Tab {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

export interface TabsProps {
  tabs: Tab[];
}

export const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const ref = useRef<View>(null);
  const hover = useHover(ref);

  return (
    <Root ref={ref} hover={hover}>
      <Background hover={hover} />
      {tabs.map(({ label, selected, onPress }, index) => (
        <React.Fragment key={label}>
          {index > 0 && <TabSeparator />}

          <TabButton selected={!!selected} hover={hover} onPress={onPress}>
            {label}
          </TabButton>
        </React.Fragment>
      ))}
    </Root>
  );
};

export const TAB_HEIGHT = 22;

interface RootProps {
  hover: boolean;
}
const Root = styled.View<RootProps>`
  height: ${TAB_HEIGHT}px;
  width: 240px; /* temporary */
  flex-direction: row;
  justify-content: space-around;
  justify-items: stretch;
  align-items: center;
  border-radius: 5px;
`;
const Background = styled.View<RootProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: ${({ hover, theme }) =>
    hover ? theme.colors.tabs.backgroundHover : theme.colors.tabs.background};
  border: 1px solid
    ${({ theme, hover }) =>
      hover ? theme.colors.tabs.borderHover : theme.colors.tabs.border};
  border-radius: 5px;
`;

interface TabButtonProps extends PressableProps {
  hover: boolean;
  selected: boolean;
}

const TabButton: React.FC<TabButtonProps> = ({
  children,
  hover,
  selected,
  ...props
}) => {
  const ref = useRef<View>(null);
  const active = useActive(ref);

  return (
    <TabButtonRoot
      ref={ref}
      hover={hover}
      active={active}
      selected={selected}
      {...props}
    >
      <TabButtonLabel hover={hover} active={active} selected={selected}>
        {children}
      </TabButtonLabel>
    </TabButtonRoot>
  );
};

interface TabButtonStyledProps {
  hover: boolean;
  active: boolean;
  selected: boolean;
}

const TabButtonRoot = styled.Pressable<TabButtonStyledProps>`
  height: ${TAB_HEIGHT}px;
  flex: 1;
  justify-content: center;
  align-items: center;
  background: ${({ theme, selected, active }) =>
    active
      ? theme.colors.tabs.button.backgroundActive
      : selected
      ? theme.colors.tabs.button.backgroundSelected
      : theme.colors.tabs.button.background};
  border-radius: 5px;
`;

const TabButtonLabel = styled(Typography.Body)<TabButtonStyledProps>`
  color: ${({ theme, selected, active }) =>
    active
      ? theme.colors.tabs.button.foregroundActive
      : selected
      ? theme.colors.tabs.button.foregroundSelected
      : theme.colors.tabs.button.foreground};
  margin-top: -2px;
`;

const TabSeparator = styled.View`
  height: 14px;
  width: 1px;
  background: ${({ theme }) => theme.colors.tabs.separator.background};
`;
