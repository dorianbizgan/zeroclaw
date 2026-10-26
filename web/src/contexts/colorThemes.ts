import themesData from './themes.json';

export type ColorThemeId =
  | 'warm-light' | 'warm-dark'
  | 'operator-dark' | 'operator-light'
  | 'default-dark' | 'default-light' | 'oled-black'
  | 'icy-blue'
  | 'nord-dark' | 'nord-light'
  | 'dracula' | 'monokai'
  | 'solarized-dark' | 'solarized-light'
  | 'kanagawa-wave' | 'kanagawa-dragon' | 'kanagawa-lotus'
  | 'rose-pine' | 'rose-pine-moon' | 'rose-pine-dawn'
  | 'night-owl'
  | 'everforest-dark' | 'everforest-light'
  | 'cobalt2'
  | 'flexoki-dark' | 'flexoki-light'
  | 'hacker-green'
  | 'material-dark' | 'material-light'
  | 'oxocarbon';

export interface ColorThemeDef {
  id: ColorThemeId;
  name: string;
  scheme: 'dark' | 'light';
  preview: [string, string, string, string, string];
  vars: Record<string, string>;
}

export const colorThemes: ColorThemeDef[] = themesData as unknown as ColorThemeDef[];

export const colorThemeMap: Record<ColorThemeId, ColorThemeDef> =
  Object.fromEntries(colorThemes.map(t => [t.id, t])) as Record<ColorThemeId, ColorThemeDef>;

// Fork defaults live in the theme catalogue; all upstream palettes remain available.
export const DEFAULT_DARK_THEME: ColorThemeId = 'warm-dark';
export const DEFAULT_LIGHT_THEME: ColorThemeId = 'warm-light';
