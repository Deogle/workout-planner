import React from "react";
import { connect } from "react-redux";
import PlayArrow from "../img/play_arrow-white-18dp.svg";
import DeleteIcon from "../img/clear-white-18dp.svg"
import IntervalListItem from "../components/IntervalListItem";
import { removeAudio } from "../redux/actions";
import { getMusicFiles, getCurrentSong } from "../redux/selectors";
import { SortableElement } from "react-sortable-hoc";

const MusicFileListItem = SortableElement((props) => {
  const [showDetails,changeShowDetails] = React.useState(false);
  return (
    <div>
      <div
        style={
          props.currentSong === props.file.filename
            ? { backgroundColor: "green" }
            : {}
        }
      >
        <li className="music-file-list-item">
          <img onClick={()=>{changeShowDetails(!showDetails)}} alt="show details" src={PlayArrow}/>
          <span>{props.file.filename.split(".")[0]}</span>
          <img
            onClick={() => {
              props.onRemoveAudio({ filename: props.file.filename });
            }}
            alt="remove song"
            src={DeleteIcon}
          />
        </li>
      </div>
      {/* change to only show if detail option selected */}
      <div style={showDetails ? {}:{display:"none"}}>
        {props.file
          ? props.file.intervals.map((interval, index) => {
              return <IntervalListItem interval={interval} />;
            })
          : null}
      </div>
    </div>
  );
});

const mapStateToProps = (state) => {
  const currentSong = getCurrentSong(state);
  const musicFiles = getMusicFiles(state);
  return { musicFiles, currentSong };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRemoveAudio: (file) => {
      console.log(`removing ${file}`);
      dispatch(removeAudio(file));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicFileListItem);
