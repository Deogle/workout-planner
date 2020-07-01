import React from "react";
import { getMusicFiles } from "../redux/selectors";
import IntervalListItem from "./IntervalListItem";
import { connect } from "react-redux";

const IntervalList = (props) => {
  return (
    <div className="navbar-list">
      {props.intervals && props.intervals.length > 0
        ? props.intervals.map((interval) => {
            return (
              <IntervalListItem
                key={`interval-${interval.id}`}
                interval={interval}
              />
            );
          })
        : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  const musicFiles = getMusicFiles(state);
  var intervals = []
  for(var file of musicFiles){
    for(var interval of file.intervals){
      intervals.push(interval)
    }
  }
  return { musicFiles, intervals };
};

export default connect(mapStateToProps)(IntervalList);
