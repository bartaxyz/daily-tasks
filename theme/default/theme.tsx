import { rgba } from "polished";

const colors = {
  primary: "#3685F9",
  background: {
    default: "#FFFFFF",
  },
};

export const defaultTheme = {
  colors: {
    /** Overall Colors */
    primary: colors.primary,
    background: {
      default: colors.background.default,
      transparent: rgba(colors.background.default, 0.75),
    },
    text: {
      default: "#000000",
    },

    /** Component Colors */
    button: {
      background: {
        primary: colors.primary,
        primaryPressed: rgba(colors.primary, 0.5),
        secondary: "#FFFFFF",
        secondaryPressed: "#72706F",
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
        tick: colors.primary,
      },
    },
    section: {
      background: colors.background.default,
      separator: rgba("#000000", 0.12),
    },
  },
};

export type Theme = typeof defaultTheme;
