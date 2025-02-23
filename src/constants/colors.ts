export const DEFAULT_FILTER_COLORS = {
  teal: { label: "Teal", bgClass: "bg-teal-500", value: "teal" },
  orange: { label: "Orange", bgClass: "bg-orange-500", value: "orange" },
  blue: { label: "Blue", bgClass: "bg-blue-500", value: "blue" },
  red: { label: "Red", bgClass: "bg-red-500", value: "red" },
  purple: { label: "Purple", bgClass: "bg-purple-500", value: "purple" },
  yellow: { label: "Yellow", bgClass: "bg-yellow-500", value: "yellow" },
  green: { label: "Green", bgClass: "bg-green-500", value: "green" },
} as const;

export const DEFAULT_BACKGROUND_COLORS = {
  blue: {
    label: "Blue",
    bgClass: "bg-blue-100 dark:bg-blue-900",
    borderClass: "border-blue-500 dark:border-blue-400",
  },
  green: {
    label: "Green",
    bgClass: "bg-green-100 dark:bg-green-900",
    borderClass: "border-green-500 dark:border-green-400",
  },
  yellow: {
    label: "Yellow",
    bgClass: "bg-yellow-100 dark:bg-yellow-900",
    borderClass: "border-yellow-500 dark:border-yellow-400",
  },
  purple: {
    label: "Purple",
    bgClass: "bg-purple-100 dark:bg-purple-900",
    borderClass: "border-purple-500 dark:border-purple-400",
  },
  red: {
    label: "Red",
    bgClass: "bg-red-100 dark:bg-red-900",
    borderClass: "border-red-500 dark:border-red-400",
  },
  orange: {
    label: "Orange",
    bgClass: "bg-orange-100 dark:bg-orange-900",
    borderClass: "border-orange-500 dark:border-orange-400",
  },
} as const;
