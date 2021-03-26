import React from "react";

export default function Btn({
  allComponents,
  setAllComponents,
  dataTestid,
  className,
}) {
  function clamp(n, min, max) {
    return n > max ? max : n < min ? min : n;
  }
  const doSomething = () => {
    if (dataTestid === "decrease-focus") {
      const newValue = clamp(
        allComponents.focusVal - allComponents.focusAdjust,
        allComponents.focusMin,
        allComponents.focusMax
      );
      setAllComponents({
        ...allComponents,
        focusVal: newValue,
        secondsRemaining: newValue * 60,
      });
    } else if (dataTestid === "increase-focus") {
      const newValue = clamp(
        allComponents.focusVal + allComponents.focusAdjust,
        allComponents.focusMin,
        allComponents.focusMax
      );
      setAllComponents({
        ...allComponents,
        focusVal: newValue,
        secondsRemaining: newValue * 60,
      });
    } else if (dataTestid === "decrease-break") {
      const newValue = clamp(
        allComponents.breakVal - allComponents.breakAdjust,
        allComponents.breakMin,
        allComponents.breakMax
      );
      setAllComponents({ ...allComponents, breakVal: newValue });
    } else if (dataTestid === "increase-break") {
      const newValue = clamp(
        allComponents.breakVal + allComponents.breakAdjust,
        allComponents.breakMin,
        allComponents.breakMax
      );
      setAllComponents({ ...allComponents, breakVal: newValue });
    }
  };

  return (
    <button
      type="button"
      className="btn btn-secondary"
      data-testid={dataTestid}
      onClick={doSomething}
      disabled={allComponents.hasStarted}
    >
      <span className={className} />
    </button>
  );
}
