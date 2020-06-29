import React from "react";
import { connect } from "react-redux";
import { getMusicFiles } from "../redux/selectors";
import MusicFileListItem from "./MusicFileListItem";
import { removeAudio, updateAudioOrder } from "../redux/actions";
import { SortableContainer } from "react-sortable-hoc";
import arrayMove from 'array-move';

const MusicListContainer = (props) => {
    const onSortEnd = ({newIndex,oldIndex}) => {
        if(newIndex === oldIndex){
            return;
        }
        var idxs = [...Array(props.musicFiles.length).keys()];
        idxs = arrayMove(idxs,oldIndex,newIndex)
        props.onUpdateAudioOrder(idxs);
    }
    return <MusicList onSortEnd={onSortEnd} {...props}/>
}

const MusicList = SortableContainer((props) => {
  return (
    <ul className="music-file-list">
      {props.musicFiles.map((file, index) => {
        return (
          <MusicFileListItem
            key={`music-file-${index}`}
            index={index}
            filename={file.filename}
          />
        );
      })}
    </ul>
  );
});

const mapStateToProps = (state) => {
  const musicFiles = getMusicFiles(state);
  return { musicFiles};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRemoveAudio: (file) => {
      dispatch(removeAudio(file));
    },
    onUpdateAudioOrder: (idxs) => {
      dispatch(updateAudioOrder(idxs));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicListContainer);
