import React, { ComponentProps, useMemo, useState } from "react";
import {
  ThemeProvider as EmotionThemeProvider,
  useTheme as useThemeEmotion,
} from "emotion-theming";
import emotionStyled, { CreateStyled } from "@emotion/styled";
import { transparentize } from "polished";

const themeSpec = {
  colorModes: {
    default: {
      text: "#0A090C",
      text09: transparentize(0.9, "#0A090C"),
      text05: transparentize(0.5, "#0A090C"),
      background: "#F0EDEE",
      primary: "#1D4B4D",
      primaryDark: "#07393C",
      secondary: "#DCCFEC",
    },
    inverted: {
      text: "#e4f2f7",
      text09: transparentize(0.9, "#e4f2f7"),
      text05: transparentize(0.5, "#e4f2f7"),
      background: "#1a110f",
      primary: "#1D4B4D",
      primaryDark: "#07393C",
      secondary: "#DCCFEC",
    },
  },
  breakpoints: {
    mobile: "520px",
  },
};

type ThemeSpec = typeof themeSpec;
type ColorMode = keyof ThemeSpec["colorModes"];
interface Theme extends Omit<ThemeSpec, "colorModes"> {
  colors: ThemeSpec["colorModes"][ColorMode];
  colorMode: ColorMode;
  setColorMode: (colorMode: ColorMode) => void;
}

interface ThemeProviderProps
  extends Omit<ComponentProps<typeof EmotionThemeProvider>, "theme"> {
  theme?: ThemeSpec;
}

export const ThemeProvider = ({
  theme = themeSpec,
  ...rest
}: ThemeProviderProps) => {
  const [colorMode, setColorMode] = useState<ColorMode>("default");

  const value: Theme = useMemo(() => {
    return {
      colorMode,
      setColorMode,
      colors: theme.colorModes[colorMode],
      ...theme,
    };
  }, [theme, colorMode]);

  return <EmotionThemeProvider theme={value} {...rest} />;
};

export const styled = emotionStyled as CreateStyled<Theme>;
export const useTheme = useThemeEmotion as () => Theme;
