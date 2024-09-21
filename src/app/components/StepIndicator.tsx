import React from "react";

interface StepIndicatorProps {
  step: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ step }) => {
  const activeStyleIndicator =
    "bg-blue-700 text-black text-2xl px-4 mx-2 rounded-lg border border-blue-700";
  const inActiveStyleIndicator =
    "bg-white text-black text-2xl px-4 mx-2 rounded-lg border";
  return (
    <div className="flex">
      <h1
        className={step === 1 ? activeStyleIndicator : inActiveStyleIndicator}
      >
        Step 1
      </h1>
      <h1
        className={step === 2 ? activeStyleIndicator : inActiveStyleIndicator}
      >
        Step 2
      </h1>
      <h1
        className={step === 3 ? activeStyleIndicator : inActiveStyleIndicator}
      >
        Step 3
      </h1>
    </div>
  );
};

export default StepIndicator;
