import React from "react";

export default function ShowProgressBar({ allComponents }) {
  const focusSecondsTotal = allComponents.focusVal * 60;
  const breakSecondsTotal = allComponents.breakVal * 60;

  let percentage = 0;

  if (allComponents.focusBreak) {
    percentage =
      100 - (allComponents.secondsRemaining / focusSecondsTotal) * 100;
  } else {
    percentage =
      100 - (allComponents.secondsRemaining / breakSecondsTotal) * 100;
  }

  return (
    <div className="row mb-2">
      <div className="col">
        <div className="progress" style={{ height: "20px" }}>
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={percentage} // TODO: Increase aria-valuenow as elapsed time increases
            style={{ width: `${percentage}%` }} // TODO: Increase width % as elapsed time increases
          />
        </div>
      </div>
    </div>
  );
}
