import {
  DEFAULT_BACKGROUND_COLORS,
  DEFAULT_FILTER_COLORS,
} from "@/constants/colors";

type EventColor = keyof typeof DEFAULT_FILTER_COLORS | string;
type BackgroundColor = keyof typeof DEFAULT_BACKGROUND_COLORS | string;

export const getEventColorClass = (color?: EventColor): string => {
  if (color && color in DEFAULT_FILTER_COLORS) {
    return DEFAULT_FILTER_COLORS[color as keyof typeof DEFAULT_FILTER_COLORS]
      .bgClass;
  }
  return "bg-zinc-900 dark:bg-zinc-50";
};

export const getEventBackgroundColorClass = (
  color?: BackgroundColor
): string => {
  if (color && color in DEFAULT_BACKGROUND_COLORS) {
    return DEFAULT_BACKGROUND_COLORS[
      color as keyof typeof DEFAULT_BACKGROUND_COLORS
    ].bgClass;
  }
  return "bg-zinc-900/10 dark:bg-zinc-50/10";
};

export const getEventBorderColorClass = (color?: BackgroundColor): string => {
  if (color && color in DEFAULT_BACKGROUND_COLORS) {
    return DEFAULT_BACKGROUND_COLORS[
      color as keyof typeof DEFAULT_BACKGROUND_COLORS
    ].borderClass;
  }
  return "border-zinc-900/10 dark:border-zinc-50/10";
};
