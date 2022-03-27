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
      default: "#FFFFFF",
      secondary: rgba("#FFFFFF", 0.5),
      error: "#FF0000",
    },

    /** Component Colors */
    button: {
      ...defaultTheme.colors.button,
      background: {
        ...defaultTheme.colors.button.background,
        secondary: "#565656",
        secondaryPressed: "#72706F",
      },
      label: {
        ...defaultTheme.colors.button.label,
        secondary: "#E6E6E6",
      },
    },
    checkbox: {
      ...defaultTheme.colors.checkbox,
      unchecked: {
        outline: rgba("#FFFFFF", 0.5),
        tick: rgba("#FFFFFF", 0.5),
      },
      checked: {
        outline: rgba("#FFFFFF", 0),
        tick: "#FFFFFF",
      },
    },
    section: {
      ...defaultTheme.colors.section,
      background: rgba(colors.background.default, 0.5),
      separator: rgba("#FFFFFF", 0.1),
    },
    tabs: {
      ...defaultTheme.colors.tabs,
      backgroundHover: rgba("#FFFFFF", 0.05),
      border: rgba("#FFFFFF", 0.1),

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
    textInput: {
      background: rgba("#FFFFFF", 0.1),
      foreground: "#FFFFFF",
      label: {
        foreground: rgba("#FFFFFF", 0.5),
      },
    },
    toolbar: {
      button: {
        ...defaultTheme.colors.toolbar.button,
        backgroundHover: rgba("#FFFFFF", 0.05),
        backgroundActive: rgba("#FFFFFF", 0.15),
        foreground: "#A3A3A2",
        foregroundHover: "#EAEBEB",
        foregroundActive: "#EAEBEB",
      },
    },
  },
};
