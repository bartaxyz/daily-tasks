import { createContext, PropsWithChildren, useContext, useState } from "react";
import { KeyboardKeyProps } from "../../components";

export interface KeyboardShortcut {
  prefix?: string;
  combination: KeyboardKeyProps["children"][];
  suffix?: string;
}

export interface StatusBarContextType {
  keyboardShortcuts: KeyboardShortcut[];
  setKeyboardShortcuts: React.Dispatch<
    React.SetStateAction<KeyboardShortcut[]>
  >;
  clearKeyboardShortcuts: () => void;
}

export const StatusBarContext = createContext<StatusBarContextType>({
  keyboardShortcuts: [],
  setKeyboardShortcuts: () => {},
  clearKeyboardShortcuts: () => {},
});

export const useStatusBar = () => useContext(StatusBarContext);

export const StatusBarProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [keyboardShortcuts, setKeyboardShortcuts] = useState<
    KeyboardShortcut[]
  >([]);

  const clearKeyboardShortcuts = () => {
    setKeyboardShortcuts([]);
  };

  return (
    <StatusBarContext.Provider
      value={{
        keyboardShortcuts,
        setKeyboardShortcuts,
        clearKeyboardShortcuts,
      }}
    >
      {children}
    </StatusBarContext.Provider>
  );
};
