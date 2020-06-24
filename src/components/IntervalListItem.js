import React from "react";
import {formatTime} from "../util/time"

const IntervalListItem = (props) => {
  return (
    <div className="interval-list-item">
      <span>Duration: {formatTime(props.interval.duration)} Intensity: {Math.round(props.interval.intensity)} Cues: {props.interval.cues}</span>
    </div>
  );
};
export default IntervalListItem;
