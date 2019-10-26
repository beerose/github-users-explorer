import React, { ComponentProps, useMemo, useState } from "react";
import {
  ThemeProvider as EmotionThemeProvider,
  useTheme as useThemeEmotion,
} from "emotion-theming";
import emotionStyled, { CreateStyled } from "@emotion/styled";

const themeSpec = {
  colorModes: {
    default: {
      text: "#1a110f",
      background: "#e4f2f7",
    },
    inverted: {
      text: "#e4f2f7",
      background: "#1a110f",
    },
  },
};

type ThemeSpec = typeof themeSpec;
type ColorMode = keyof ThemeSpec["colorModes"];
interface Theme extends Omit<ThemeSpec, "colorModes"> {
  colors: ThemeSpec["colorModes"][ColorMode];
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
