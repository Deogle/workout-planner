import React from "react";
import { connect } from "react-redux";
import { formatTime } from "../util/time";
import EditIcon from "../img/edit-white-18dp.svg";
import SaveIcon from "../img/save_alt-white-18dp.svg";
import { updateInterval } from "../redux/actions";
import { getMusicFiles } from "../redux/selectors";

const IntervalListItem = (props) => {
  const [editable, setEditable] = React.useState(false);
  const [cues,setCues] = React.useState(props.interval.cues);
  var intensity = props.interval.intensity;

  const handleSetEditable = (new_editable) => {
    props.onUpdateInterval({
      id: props.interval.id,
      intensity: intensity,
      cues: cues,
      duration: props.interval.duration,
    });
    setEditable(new_editable);
  };

  var time = formatTime(props.interval.duration);
  console.log("rendering interval item");
  return (
    <div className="interval-list-item">
      <img
        onClick={() => {
          handleSetEditable(!editable);
        }}
        className="interval-edit-icon"
        alt="edit"
        src={editable ? SaveIcon : EditIcon}
      />
      <div>
        Duration: {time} <br></br>
        Intensity:{" "}
        {editable ? (
          <input
            className="interval-list-item-input"
            onChange={(e) => {
              intensity = (e.target.value);
            }}
            placeholder={props.interval.intensity}
          />
        ) : (
          Math.round(props.interval.intensity)
        )}{" "}
        <br></br>
        Cues:{" "}
        {editable ? (
          <textarea
            className="interval-list-item-input"
            onChange={(e) => {
              setCues(e.target.value);
            }}
           placeholder={cues}
          />
        ) : (<p style={{marginTop:"0px",maxWidth:"300px"}}>{props.interval.cues}</p>)}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateInterval: (interval) => {
      dispatch(updateInterval(interval));
    },
  };
};

export default connect(null, mapDispatchToProps)(IntervalListItem);
