"use client";

import { RotatingLines, ProgressBar } from "react-loader-spinner";

export const RotatingLoader = () => {
  return (
    <RotatingLines
      visible={true}
      width="96"
      strokeWidth="5"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
    />
  );
};

export const ProgressLoader = () => {
  return (
    <ProgressBar
      visible={true}
      height="80"
      width="80"
      ariaLabel="progress-bar-loading"
    />
  );
};
