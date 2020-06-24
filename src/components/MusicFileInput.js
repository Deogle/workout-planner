import React from "react";
import { connect } from "react-redux";
import {
  addAudio,
  updateAudioDuration,
  setCurrentSong,
} from "../redux/actions";
import { getTotalDuration, getMusicFiles } from "../redux/selectors";
import { formatTime } from "../util/time";
import UploadIcon from "../img/add_to_photos-white-18dp.svg";

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
      this.props.onAddAudio(this.createAudio(this.state.file.current.files[0]));
      if (this.props.musicFiles.length === 0) {
        this.props.onSetCurrentSong({
          filename: this.state.file.current.files[0].name,
        });
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
      this.props.onUpdateAudioDuration({
        filename: file.name,
        duration: audio_obj.duration,
      });
    };
    return audio;
  };

  render() {
    return (
      <div className={this.props.class}>
        <input
          id="audio_file_input"
          type="file"
          accept=".mp3"
          ref={this.state.file}
          onChange={this.handleUpload}
          style={{ display: "none" }}
        />

        <label htmlFor="audio_file_input">
          <img
            className="audio-input-img"
            alt="Upload"
            src={UploadIcon}
          />
        </label>
        {/* <p>Total Playlist Time: {formatTime(this.props.totalDuration)}</p> */}
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
    onUpdateAudioDuration: (dur) => {
      dispatch(updateAudioDuration(dur));
    },
    onSetCurrentSong: (song) => {
      dispatch(setCurrentSong(song));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicFileInput);
