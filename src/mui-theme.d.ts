import type { SimplePaletteColorOptions } from "@mui/material/styles";
import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    size: Record<string, string>;
    lineHeight: Record<string, number>;
    fontWeightLighter: number;
    fontWeightLight: number;
    fontWeightRegular: number;
    fontWeightMedium: number;
    fontWeightBold: number;
  }

  interface TypographyVariantsOptions {
    size?: TypographyVariants["size"];
    lineHeight?: TypographyVariants["lineHeight"];
    fontWeightLighter?: number;
    fontWeightLight?: number;
    fontWeightRegular?: number;
    fontWeightMedium?: number;
    fontWeightBold?: number;
  }

  interface TypeBackground {
    card?: string;
    sidenav?: string;
  }

  interface Palette {
    dark: SimplePaletteColorOptions & { focus?: string };
    light: SimplePaletteColorOptions & { focus?: string };
    meena?: {
      sidenavBg?: string;
      primary?: string;
      secondary?: string;
      icon?: string;
      tertiary?: string;
      fourth?: string;
      background?: string;
      activeBg?: string;
      hoverBg?: string;
      border?: string;
    };
    white: { main: string; focus?: string };
    transparent: { main: string };
    black: { main: string; focus?: string; light?: string };
    gradients: Record<string, { main: string; state: string }>;
    coloredShadows: Record<string, string>;
    badgeColors: Record<string, { background: string; text: string }>;
    socialMediaColors: Record<string, unknown>;
    inputBorderColor?: string;
    red?: Record<string, string>;
    orange?: Record<string, string>;
    amber?: Record<string, string>;
    blue?: Record<string, string>;
    tabs?: { indicator?: { boxShadow?: string } };
  }

  interface Theme {
    functions: {
      boxShadow: (...args: unknown[]) => string;
      hexToRgb: (color: string) => string;
      linearGradient: (...args: unknown[]) => string;
      pxToRem: (size: number) => string;
      rgba: (...args: unknown[]) => string;
    };
    boxShadows: Record<string, unknown>;
    borders: Record<string, unknown>;
  }

  interface ThemeOptions {
    functions?: Theme["functions"];
    boxShadows?: Theme["boxShadows"];
    borders?: Theme["borders"];
  }
}
