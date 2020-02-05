import React from "react";
import BufferLoader from "../util/BufferLoader";

//TODO: this class needs to be reduxed
class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      tracks: [],
      bufferList:null,
      source:null
    };
  }

  componentDidMount() {
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    this.bufferLoader = new BufferLoader(
      this.audioContext,
      ["./example_audio/low_fi_tune.mp3"],
      this.finishedLoading
    );
    this.bufferLoader.load();
  }

  finishedLoading = bufferList => {
    console.log(bufferList)
    this.setState({
      bufferList:bufferList
    })
  };

  playPause = () => {
    if (this.audioContext.state === "suspended") {
      this.audioContext.resume();
    }
    if (this.state.playing) {
      this.setState(
        {
          playing: false
        },
        () => {
          this.state.source.stop();
        }
      );
    } else {
      var source = this.audioContext.createBufferSource();
      source.buffer = this.state.bufferList[0];
      source.connect(this.audioContext.destination);    
      this.setState(
        {
          playing: true,
          source:source
        }, () => {
          source.start(0)
        }
      );
      
    }
  };

  render() {
    return (
      <div>
        <button onClick={this.playPause}>Play/Pause</button>
      </div>
    );
  }
}

export default AudioPlayer;
