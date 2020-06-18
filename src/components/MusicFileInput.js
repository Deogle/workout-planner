import React from "react";
import { connect } from "react-redux";
import { addAudio, updateAudioDuration, setCurrentSong } from "../redux/actions";
import { getTotalDuration, getMusicFiles } from "../redux/selectors"
import { formatTime } from "../util/time"

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
      this.props.addAudio(this.createAudio(this.state.file.current.files[0]));
      if(this.props.musicFiles.length === 0){
        this.props.setCurrentSong({filename:this.state.file.current.files[0].name});
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
        this.props.updateAudioDuration({filename:file.name,duration:audio_obj.duration})
    }
    return audio;
  };

  render() {
    return (
      <div className={this.props.class}>
        <span style={{ marginLeft: "70px" }}>
          <input
            id="audio_file"
            type="file"
            accept=".mp3"
            ref={this.state.file}
            onChange={this.handleUpload}
          />
        </span>
        <p>Upload some mp3 files: Total Playlist Time: {formatTime(this.props.totalDuration)}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const totalDuration = getTotalDuration(state);
  const musicFiles = getMusicFiles(state);
  return { totalDuration, musicFiles };
};

export default connect(mapStateToProps, { addAudio, updateAudioDuration, setCurrentSong })(MusicFileInput);
