import { Eventar } from "./components/calendar-layout";
import { DEFAULT_BACKGROUND_COLORS } from "./constants/colors";
import { useEvents } from "./hooks/useEvents";
import { useResources } from "./hooks/useResources";
import { CalendarEvent } from "./types/calendar";
import { Modals } from "./types/modals.types";
import { SpinnerVariant } from "./types/spinner.types";
import {
  getEventBackgroundColorClass,
  getEventColorClass,
} from "./utils/color-utils";

export {
  useEvents,
  useResources,
  Eventar,
  SpinnerVariant,
  DEFAULT_BACKGROUND_COLORS,
  getEventColorClass,
  getEventBackgroundColorClass,
  Modals,
};

export type { CalendarEvent };
