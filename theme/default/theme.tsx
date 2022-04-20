import { lighten, rgba } from "polished";

const colors = {
  primary: "#3685F9",
  background: {
    default: "#FFFFFF",
  },
  text: {
    default: "#000000",
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
      default: colors.text.default,
      secondary: rgba("#000000", 0.5),
      error: "#FF0000",
    },

    /** Component Colors */
    button: {
      background: {
        secondary: "#FFFFFF",
        secondaryPressed: "#DDD",
        tertiary: "transparent",
        tertiaryHover: rgba("#000000", 0.1),
        tertiaryPressed: rgba("#000000", 0.2),
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
        tick: rgba("#272727", 1),
      },
    },
    iconButton: {
      background: "transparent",
      backgroundHover: rgba(colors.primary, 0.1),
      backgroundActive: rgba(colors.primary, 0.2),
      foreground: colors.text.default,
      foregroundHover: colors.primary,
      foregroundActive: colors.primary,
    },
    keyboardKey: {
      background: lighten(0.975, "#000000"),
      backgroundPressed: lighten(0.85, "#000000"),
      separator: rgba(colors.text.default, 0.1),
    },
    section: {
      background: rgba(colors.background.default, 0.1),
      separator: rgba("#000000", 0.1),
    },
    sidebar: {
      background: "transparent",
      button: {
        background: "transparent",
        backgroundActive: rgba("#000000", 0.1),
        foreground: "#38343D",
      },
      title: {
        foreground: rgba(colors.text.default, 0.3),
      },
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
      },
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
