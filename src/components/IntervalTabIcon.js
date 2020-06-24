import React from "react";
import ChartIcon from "../img/addchart-white-18dp.svg";

const IconComponent = (props) => {
  return (
    <img
      className={"audio-input-img" + (props.active ? " interactable" : "")}
      alt="Upload"
      src={ChartIcon}
    />
  );
};

const InteravlTabIcon = (props) => {
  return <IconComponent />;
};
export default InteravlTabIcon;
