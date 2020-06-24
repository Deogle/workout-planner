import React from 'react';
import { connect } from "react-redux";
import DeleteIcon from '../img/clear-white-18dp.svg';
import { removeAudio } from '../redux/actions';
import { getCurrentSong } from '../redux/selectors'

const MusicFileListItem = props => (
    <li className="music-file-list-item" style={props.currentSong === props.file.filename?{backgroundColor:"green"}:{}}>
        <span>{props.file.filename}</span>
        <img onClick={()=>{props.onRemoveAudio({filename:props.file.filename})}} alt="test" src={DeleteIcon}/>
    </li>
)

const mapStateToProps = (state) => {
  const currentSong = getCurrentSong(state);
  return { currentSong };

}

const mapDispatchToProps = (dispatch) => {
    return {
      onRemoveAudio: (file) => {
        dispatch(removeAudio(file));
      }
    };
  };

export default connect(mapStateToProps,mapDispatchToProps)(MusicFileListItem);