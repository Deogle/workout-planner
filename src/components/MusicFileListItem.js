import React from "react";
import { connect } from "react-redux";
import DeleteIcon from "../img/clear-white-18dp.svg";
import { removeAudio } from "../redux/actions";
import { getMusicFiles, getCurrentSong } from "../redux/selectors";
import { SortableElement } from "react-sortable-hoc";

const MusicFileListItem = SortableElement((props) => (
  <div
    style={
      props.currentSong === props.filename ? { backgroundColor: "green" } : {}
    }
  >
    <li className="music-file-list-item">
      <span>{props.filename.split(".")[0]}</span>
      <img
        onClick={() => {
          props.onRemoveAudio({ filename: props.filename });
        }}
        alt="song"
        src={DeleteIcon}
      />
    </li>
  </div>
));

const mapStateToProps = (state) => {
  const currentSong = getCurrentSong(state);
  const musicFiles = getMusicFiles(state);
  return { musicFiles, currentSong };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRemoveAudio: (file) => {
      dispatch(removeAudio(file));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicFileListItem);
