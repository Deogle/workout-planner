import React from "react";
import ChartIcon from "../img/addchart-white-18dp.svg";
import { addInterval } from "../redux/actions";
import { connect } from "react-redux";

const IconComponent = (props) => {
  return (
    <img
      className={"audio-input-img" + (props.active ? " interactable" : "")}
      alt="Upload"
      src={ChartIcon}
      onClick={()=>{return props.active ? props.onIntervalAdd({intensity:Math.random()*100,duration:20}):null}}
    />
  );
};

const InteravlTabIcon = (props) => {
  return <IconComponent onIntervalAdd={props.onIntervalAdd} active={props.active}/>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIntervalAdd: interval => {
      dispatch(addInterval(interval));
    }
  };
};

export default connect(null,mapDispatchToProps)(InteravlTabIcon);
