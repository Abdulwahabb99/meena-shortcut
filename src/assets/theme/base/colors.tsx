/**
 * Meena Intranet - Global colors
 * Use these colors across the application via theme.palette.meena
 */

const colors = {
  // Meena brand colors - use theme.palette.meena
  meena: {
    sidenavBg: "#F3EEFF",
    primary: "#8C56FF",
    secondary: "#6B47F5",
    icon: "#831ED2",
    tertiary: "#AF98DB",
    fourth: "#9389F7",
    background: "#F8F7FC",
    activeBg: "rgba(140, 86, 255, 0.12)",
    hoverBg: "rgba(140, 86, 255, 0.06)",
    border: "rgba(140, 86, 255, 0.1)",
  },

  background: {
    default: "#F8F7FC",
  },

  text: {
    main: "#737373",
    focus: "#737373",
  },

  transparent: {
    main: "transparent",
  },

  white: {
    main: "#ffffff",
    focus: "#ffffff",
  },

  black: {
    light: "#000000",
    main: "#000000",
    focus: "#000000",
  },

  primary: {
    main: "#8C56FF",
    focus: "#6B47F5",
  },

  secondary: {
    main: "#6B47F5",
    focus: "#8C56FF",
  },

  info: {
    main: "#262626",
    focus: "#262626",
  },

  success: {
    main: "#4CAF50",
    focus: "#67bb6a",
  },

  warning: {
    main: "#fb8c00",
    focus: "#fc9d26",
  },

  error: {
    main: "#F44335",
    focus: "#f65f53",
  },

  light: {
    main: "#F3EEFF",
    focus: "#F3EEFF",
  },

  dark: {
    main: "#171717",
    focus: "#171717",
  },

  grey: {
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
  },

  main: {
    100: "#DBF0E3",
    200: "#B9E1CC",
    300: "#8CCAAC",
    400: "#5AAD89",
    500: "#3C9D76",
    600: "#297356",
    700: "#205C47",
    800: "#1B4A39",
    900: "#0C211B",
  },

  green: {
    100: "#E7FAF4",
    200: "#CFF4E8",
    300: "#9FE9D2",
    400: "#70DEBB",
    500: "#10C88E",
    600: "#0DA072",
    700: "#0A7855",
  },

  orange: {
    100: "#FFF5EF",
    200: "#FFEADC",
    300: "#FFB580",
    400: "#FF9040",
    500: "#FF6B00",
    600: "#BF5000",
    700: "#803600",
  },

  red: {
    100: "#FEE4E2",
    200: "#FECDCA",
    300: "#FCA19B",
    400: "#F97066",
    500: "#D92C20",
    600: "#B42318",
    700: "#912018",
  },

  blue: {
    50: "#E0F2F7",
    100: "#C9ECF6",
    200: "#A3E0F1",
    300: "#4DB8D8",
    400: "#1AA5CE",
    500: "#0097C1",
    600: "#0082A8",
    700: "#006E8F",
    800: "#005875",
    900: "#00415A",
  },

  /** Split out so TS does not widen `gradients.info` to palette `info` ({ main, focus }). */
  gradients: {
    primary: { main: "#8C56FF", state: "#6B47F5" },
    secondary: { main: "#747b8a", state: "#495361" },
    info: { main: "#42424a", state: "#191919" },
    success: { main: "#66BB6A", state: "#43A047" },
    warning: { main: "#FFA726", state: "#FB8C00" },
    error: { main: "#EF5350", state: "#E53935" },
    light: { main: "#F3EEFF", state: "#AF98DB" },
    dark: { main: "#42424a", state: "#191919" },
  } as const,

  socialMediaColors: {
    facebook: { main: "#3b5998", dark: "#344e86" },
    twitter: { main: "#55acee", dark: "#3ea1ec" },
    instagram: { main: "#125688", dark: "#0e456d" },
    linkedin: { main: "#0077b5", dark: "#00669c" },
    pinterest: { main: "#cc2127", dark: "#b21d22" },
    youtube: { main: "#e52d27", dark: "#d41f1a" },
    vimeo: { main: "#1ab7ea", dark: "#13a3d2" },
    slack: { main: "#3aaf85", dark: "#329874" },
    dribbble: { main: "#ea4c89", dark: "#e73177" },
    github: { main: "#24292e", dark: "#171a1d" },
    reddit: { main: "#ff4500", dark: "#e03d00" },
    tumblr: { main: "#35465c", dark: "#2a3749" },
  },

  badgeColors: {
    primary: { background: "#F3EEFF", text: "#8C56FF" },
    secondary: { background: "#d7d9e1", text: "#6c757d" },
    info: { background: "#aecef7", text: "#095bc6" },
    success: { background: "#bce2be", text: "#339537" },
    warning: { background: "#ffd59f", text: "#c87000" },
    error: { background: "#fcd3d0", text: "#f61200" },
    light: { background: "#ffffff", text: "#c7d3de" },
    dark: { background: "#8097bf", text: "#1e2e4a" },
  },

  coloredShadows: {
    primary: "#8C56FF",
    secondary: "#6B47F5",
    info: "#191919",
    success: "#4caf4f",
    warning: "#ff9900",
    error: "#f44336",
    light: "#adb5bd",
    dark: "#404040",
  },

  inputBorderColor: "#d2d6da",

  tabs: {
    indicator: { boxShadow: "#ddd" },
  },
};

export default colors;
