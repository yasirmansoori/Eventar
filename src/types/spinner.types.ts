import Bars from "../components/spinners/Bars";
import Circle from "../components/spinners/Circle";
import Dots from "../components/spinners/Dots";
import Square from "../components/spinners/Square";

export enum SpinnerVariant {
  SQUARE = "square",
  CIRCLE = "circle",
  DOTS = "dots",
  BARS = "bars",
}

export const SPINNER_COMPONENTS = {
  [SpinnerVariant.SQUARE]: Square,
  [SpinnerVariant.CIRCLE]: Circle,
  [SpinnerVariant.DOTS]: Dots,
  [SpinnerVariant.BARS]: Bars,
} as const;
