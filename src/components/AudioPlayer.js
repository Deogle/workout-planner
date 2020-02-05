import React from "react";

//TODO: this class needs to be reduxed
class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      files: [
        "./example_audio/tick.mp3",
        "./example_audio/coffee_shop_tune.mp3",
        "./example_audio/low_fi_tune.mp3"
      ] /** this is just for debugging, these should be from redux store */,
      tracks: [],
      curr_track: 0,
      bufferList: null,
      source: null
    };
  }

  // Probably don't need to load tracks on start, maybe on first click of 
  // the play/pause button. This interface will eventually be scrapped anyways.
  componentDidMount() {
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    this.loadTracks();
  }

  // TODO HIGH PRIORITY: testing
  loadTracks = () => {
    var tracks = [];
    for (var track of this.state.files) {
      var audioElement = new Audio(track);
      audioElement.onended = () => {
        this.playNextTrack();
      };
      var src = this.audioContext.createMediaElementSource(audioElement);
      src.connect(this.audioContext.destination);
      tracks.push(audioElement);
    }
    this.setState({
      tracks: tracks
    });
  };

  // TODO: Testing
  playPause = () => {
    if (this.state.playing) {
      this.setState({ playing: false }, () => {
        this.state.tracks[this.state.curr_track].pause();
      });
    } else {
      this.setState({ playing: true }, () => {
        this.state.tracks[this.state.curr_track].play();
      });
    }
  };

  // TODO: Testing
  playNextTrack = () => {
    this.setState(
      {
        curr_track: this.state.curr_track + 1
      },
      () => {
        console.log(this.state.tracks[this.state.curr_track])
        this.state.tracks[this.state.curr_track].play();
      }
    );
  };

  render() {
    return (
      <div>
        <button onClick={this.playPause}>Play/Pause</button>
        {/* This should probably be cleaner / refactored to not be 500iq */}
        <p>Current song: {this.state.files[this.state.curr_track].split('/')[2]}</p>
        {/* Also stupid */}
        <p>Duration {this.state.tracks.length > 0 ? this.state.tracks[this.state.curr_track].duration : null}</p>
      </div>
    );
  }
}

export default AudioPlayer;
