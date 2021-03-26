import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import ButtonComponent from "./Btn";
import DisplayDuration from "./Display";
import StopButton from "./StopBtn";

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // define variable to hold object of all integer values possible by button press
  const [allComponents, setAllComponents] = useState({
    focusAdjust: 5,
    breakAdjust: 1,
    focusVal: 25,
    focusMin: 5,
    focusMax: 60,
    breakVal: 5,
    breakMin: 1,
    breakMax: 15,
    focusBreak: 1, // determine whether on focus or break: boolean
    secondsRemaining: 25 * 60,
    hasStarted: false, // the first time play is pressed, it should switch to true, stop switches to false
  });

  useInterval(
    () => {
      // if focusBreak is true (on focus) and secondsRemaining is 0,
      // change focusBreak to false (on break)
      // then set secondsRemaining to breakVal * 60. play the sound.
      // and vice versa

      if (allComponents.focusBreak && allComponents.secondsRemaining === 0) {
        setAllComponents({
          ...allComponents,
          focusBreak: 0,
          secondsRemaining: allComponents.breakVal * 60,
        });
        new Audio(
          `https://vgmsite.com/soundtracks/donkey-kong-country-snes/zzprueftal/23%20Fanfare.mp3`
        ).play();
      } else if (
        !allComponents.focusBreak &&
        allComponents.secondsRemaining === 0
      ) {
        setAllComponents({
          ...allComponents,
          focusBreak: 1,
          secondsRemaining: allComponents.focusVal * 60,
        });
        new Audio(
          `https://vgmsite.com/soundtracks/donkey-kong-country-snes/tzzbepdfam/29%20Extra%20Life%20Balloon.mp3`
        ).play();
      } else {
        setAllComponents({
          ...allComponents,
          secondsRemaining: allComponents.secondsRemaining - 1,
        });
      }
    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    if (!allComponents.hasStarted) {
      setAllComponents({ ...allComponents, hasStarted: true });
    }
    setIsTimerRunning((prevState) => !prevState);
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span
              className="input-group-text"
              data-testid="duration-focus"
              value="duration-focus"
            >
              Focus Duration:{" "}
              {allComponents.focusVal >= 10
                ? allComponents.focusVal
                : `0${allComponents.focusVal}`}
              :00
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <ButtonComponent
                allComponents={allComponents}
                setAllComponents={setAllComponents}
                dataTestid="decrease-focus"
                className="oi oi-minus"
              />
              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <ButtonComponent
                allComponents={allComponents}
                setAllComponents={setAllComponents}
                dataTestid="increase-focus"
                className="oi oi-plus"
              />
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                {/* TODO: Update this text to display the current break session duration */}
                Break Duration:{" "}
                {allComponents.breakVal >= 10
                  ? allComponents.breakVal
                  : `0${allComponents.breakVal}`}
                :00
              </span>
              <div className="input-group-append">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <ButtonComponent
                  allComponents={allComponents}
                  setAllComponents={setAllComponents}
                  dataTestid="decrease-break"
                  className="oi oi-minus"
                />
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <ButtonComponent
                  allComponents={allComponents}
                  setAllComponents={setAllComponents}
                  dataTestid="increase-break"
                  className="oi oi-plus"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
            <StopButton
              allComponents={allComponents}
              setAllComponents={setAllComponents}
              setIsTimerRunning={setIsTimerRunning}
            />
          </div>
        </div>
      </div>
      <div>
        <DisplayDuration
          isTimerRunning={isTimerRunning}
          allComponents={allComponents}
        />
      </div>
    </div>
  );
}

export default Pomodoro;
