import React from 'react';
import { connect } from "react-redux";
import DeleteIcon from '../img/clear-white-18dp.svg';
import { removeAudio } from '../redux/actions';

const MusicFileListItem = props => (
    <li className="music-file-list-item">
        <span>{props.file.filename}</span>
        <img onClick={()=>{props.onRemoveAudio({filename:props.file.filename})}} alt="test" src={DeleteIcon}/>
    </li>
)


const mapDispatchToProps = (dispatch) => {
    return {
      onRemoveAudio: (file) => {
        dispatch(removeAudio(file));
      }
    };
  };

export default connect(null,mapDispatchToProps)(MusicFileListItem);