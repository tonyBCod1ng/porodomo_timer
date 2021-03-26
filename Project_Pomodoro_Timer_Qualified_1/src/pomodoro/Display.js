import React from "react";
import { minutesToDuration, secondsToDuration } from "../utils/duration";
import ProgressBar from "./ShowProgressBar";

export default function DisplayDuration({ isTimerRunning, allComponents }) {
  function theHappening() {
    let titleText = "";
    if (allComponents.focusBreak) {
      titleText = `Focusing for ${minutesToDuration(
        allComponents.focusVal
      )} minutes`;
    } else if (!allComponents.focusBreak) {
      titleText = `On Break for ${minutesToDuration(
        allComponents.breakVal
      )} minutes`;
    }

    let subTitleText = `${secondsToDuration(
      allComponents.secondsRemaining
    )} remaining`;

    return (
      <>
        <div className="row mb-2">
          <div className="col">
            {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
            <h2 data-testid="session-title">{titleText}</h2>
            {/* TODO: Update message below to include time remaining in the current session */}
            <p className="lead" data-testid="session-sub-title">
              {subTitleText}
            </p>
          </div>
        </div>
        {isTimerRunning ? null : <h2>PAUSED</h2>}
        <ProgressBar allComponents={allComponents} />
      </>
    );
  }

  if (allComponents.hasStarted) {
    return theHappening();
  } else {
    return null;
  }
}
