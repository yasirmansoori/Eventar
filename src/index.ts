import { Eventar } from "./components/calendar-layout";
import { DEFAULT_BACKGROUND_COLORS } from "./constants/colors";
import { useEvents } from "./hooks/useEvents";
import { CalendarEvent } from "./types/calendar";
import { SpinnerVariant } from "./types/spinner.types";
import {
  getEventBackgroundColorClass,
  getEventColorClass,
} from "./utils/color-utils";

export {
  useEvents,
  Eventar,
  SpinnerVariant,
  DEFAULT_BACKGROUND_COLORS,
  getEventColorClass,
  getEventBackgroundColorClass,
};

export type { CalendarEvent };
