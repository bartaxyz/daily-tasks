import { lighten, rgba } from "polished";

const colors = {
  primary: "#3685F9",
  background: {
    default: "#FFFFFF",
  },
};

export const defaultTheme = {
  name: "default",
  colors: {
    /** Overall Colors */
    primary: colors.primary,
    background: {
      default: colors.background.default,
      transparent: rgba(colors.background.default, 0.75),
    },
    text: {
      default: "#000000",
      secondary: rgba("#000000", 0.5),
      error: "#FF0000",
    },

    /** Component Colors */
    button: {
      background: {
        primary: colors.primary,
        primaryPressed: lighten(0.075)(colors.primary),
        secondary: "#FFFFFF",
        secondaryPressed: "#DDD",
      },
      label: {
        primary: "#FFFFFF",
        secondary: "#3D3D3D",
      },
    },
    checkbox: {
      unchecked: {
        outline: rgba("#272727", 0.5),
        tick: rgba("#272727", 0.5),
      },
      checked: {
        outline: rgba("#272727", 0),
        tick: rgba("#272727", 0.5),
      },
    },
    section: {
      background: rgba(colors.background.default, 0.1),
      separator: rgba("#000000", 0.1),
    },
    tabs: {
      background: "transparent",
      backgroundHover: rgba("#000000", 0.05),
      border: rgba("#000000", 0.1),
      borderHover: "transparent",

      separator: {
        background: rgba("#000000", 0.05),
      },

      button: {
        background: "transparent",
        backgroundSelected: rgba("#000000", 0.05),
        backgroundActive: rgba("#000000", 0.15),
        foreground: "#717171",
        foregroundSelected: "#484848",
        foregroundActive: "#454545",
      },
    },
    textInput: {
      background: rgba("#000000", 0.05),
      foreground: "#000000",
      label: {
        foreground: rgba("#000000", 0.5),
      }
    },
    toolbar: {
      button: {
        background: "transparent",
        backgroundHover: rgba("#000000", 0.05),
        backgroundActive: rgba("#000000", 0.15),
        foreground: "#717171",
        foregroundHover: "#717171",
        foregroundActive: "#454545",
      },
    },
  },
};

export type Theme = typeof defaultTheme;
