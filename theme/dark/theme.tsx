import { rgba } from "polished";
import { defaultTheme } from "../default/theme";

const colors = {
  background: {
    default: "#282828",
  },
};

export const darkTheme: typeof defaultTheme = {
  ...defaultTheme,
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
      background: colors.background.default,
      separator: rgba("#FFFFFF", 0.15),
    },
  },
};
