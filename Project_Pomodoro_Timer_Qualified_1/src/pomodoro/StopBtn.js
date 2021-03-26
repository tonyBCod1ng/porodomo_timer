import React from "react";

export default function StopBtn({
  allComponents,
  setAllComponents,
  setIsTimerRunning,
}) {
  const doTheMagic = () => {
    if (allComponents.hasStarted === true) {
      setAllComponents({
        ...allComponents,
        hasStarted: false,
        focusBreak: 1,
        secondsRemaining: allComponents.focusVal * 60,
      });
      setIsTimerRunning(false);
    }
  };

  return (
    <button
      type="button"
      className="btn btn-secondary"
      title="Stop the session"
      onClick={doTheMagic}
    >
      <span className="oi oi-media-stop" />
    </button>
  );
}
