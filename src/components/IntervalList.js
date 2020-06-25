import React from "react";
import { getIntervals } from "../redux/selectors";
import IntervalListItem from "./IntervalListItem";
import { connect } from "react-redux";

const IntervalList = (props) => {
  console.log(props.intervals);
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
  const intervals = getIntervals(state);
  return { intervals };
};

export default connect(mapStateToProps)(IntervalList);
