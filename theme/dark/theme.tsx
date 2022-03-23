import { rgba } from "polished";
import { defaultTheme } from "../default/theme";

const colors = {
  background: {
    default: "#201F1E",
  },
};

export const darkTheme: typeof defaultTheme = {
  ...defaultTheme,
  name: "dark",
  colors: {
    ...defaultTheme.colors,
    background: {
      ...defaultTheme.colors.background,
      default: colors.background.default,
    },
    text: {
      ...defaultTheme.colors.text,
      default: "#FFFFFF",
    },

    /** Component Colors */
    button: {
      ...defaultTheme.colors.button,
      background: {
        ...defaultTheme.colors.button.background,
        secondary: "#565656",
      },
      label: {
        ...defaultTheme.colors.button.label,
        secondary: "#E6E6E6",
      },
    },
    checkbox: {
      ...defaultTheme.colors.checkbox,
      unchecked: {
        ...defaultTheme.colors.checkbox.unchecked,
        outline: rgba("#FFFFFF", 0.5),
      },
    },
    section: {
      ...defaultTheme.colors.section,
      background: rgba(colors.background.default, 0.5),
      separator: rgba("#FFFFFF", 0.05),
    },
    tabs: {
      ...defaultTheme.colors.tabs,
      backgroundHover: rgba("#FFFFFF", 0.05),
      border: rgba("#FFFFFF", 0.05),

      separator: {
        background: rgba("#FFFFFF", 0.05),
      },

      button: {
        ...defaultTheme.colors.tabs.button,
        backgroundSelected: rgba("#FFFFFF", 0.05),
        backgroundActive: rgba("#FFFFFF", 0.15),
        foreground: "#A3A3A2",
        foregroundSelected: "#EAEBEB",
        foregroundActive: "#EAEBEB",
      },
    },
  },
};
