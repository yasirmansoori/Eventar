import { SPINNER_COMPONENTS, SpinnerVariant } from "../types/spinner.types";

interface LoadingStateProps {
  spinnerComponent?: SpinnerVariant;
}

const LoadingState: React.FC<LoadingStateProps> = ({
  spinnerComponent = SpinnerVariant.SQUARE,
}) => {
  const Spinner = SPINNER_COMPONENTS[spinnerComponent];
  return <Spinner />;
};

export default LoadingState;
