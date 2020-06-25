import React from "react";
import { connect } from "react-redux";
import {
  addAudio,
  setCurrentSong,
  addInterval,
} from "../redux/actions";
import { getTotalDuration, getMusicFiles } from "../redux/selectors";
import UploadIcon from "../img/add_to_photos-white-18dp.svg";

const UploadIconComponent = (props) => {
  return (
    <img
      className={"audio-input-img" + (props.active ? " interactable" : "")}
      alt="Upload"
      src={UploadIcon}
    />
  );
};

class MusicFileInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: React.createRef(),
    };
  }

  handleUpload = (e) => {
    e.preventDefault();
    if (this.state.file) {
      for (var file of this.state.file.current.files) {
        //this.props.onFetchAudio({filename:file.name,resource_url:`./example_audio/${file.name}`})
        this.createAudio(file);
      }
    }
  };

  createAudio = (file) => {
    var audio = {
      filename: file.name,
      resource_url: `./example_audio/${file.name}`,
    };
    var audio_obj = new Audio(audio.resource_url);
    audio_obj.onloadeddata = () => {
      audio.duration = audio_obj.duration;
      if (this.props.musicFiles.length === 0) {
        this.props.onSetCurrentSong({
          filename:audio.filename,
        });
      }
      this.props.onAddAudio(audio);
      this.props.onAddInterval({
        duration: audio_obj.duration,
        intensity: Math.random() * 100,
      });
    };
    return audio;
  };

  render() {
    return (
      <div className={this.props.class}>
        {this.props.active ? (
          <div>
            <input
              id="audio_file_input"
              type="file"
              accept=".mp3"
              ref={this.state.file}
              onChange={this.handleUpload}
              multiple
              style={{ display: "none" }}
            />
            <label htmlFor="audio_file_input">
              <UploadIconComponent active={this.props.active} />
            </label>
          </div>
        ) : (
          <UploadIconComponent active={this.props.active} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const totalDuration = getTotalDuration(state);
  const musicFiles = getMusicFiles(state);
  return { totalDuration, musicFiles };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddAudio: (file) => {
      dispatch(addAudio(file));
    },
    onSetCurrentSong: (song) => {
      dispatch(setCurrentSong(song));
    },
    onAddInterval: (interval) => {
      dispatch(addInterval(interval));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicFileInput);
