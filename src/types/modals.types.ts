import CardEventModal from "@/components/modals/card-event-modal";
import CompactEventModal from "@/components/modals/compact-event-modal";
import SimpleEventModal from "@/components/modals/simple-event-modal";

export enum CustomModalsVariants {
  COMPACT = "compact",
  CARD = "card",
  SIMPLE = "simple",
}

export const Modals = {
  Card: CardEventModal,
  Compact: CompactEventModal,
  Simple: SimpleEventModal,
} as const;

export { CardEventModal, CompactEventModal, SimpleEventModal };
