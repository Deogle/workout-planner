import React from "react";

//TODO: we gotta
class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      pause: true
    };
    this.url = "../../example_audio/low_fi_tune.mp3";
    this.audio = new Audio(this.url);
  }

  play = () => {
    this.setState({
      play: true,
      pause: false
    });
    this.audio.play();
  };

  pause = () => {
      this.setState({
          play:false,
          pause:true
      });
      this.audio.pause()
  }

  render() {
    return (
      <div>
        <button onClick={this.play}>Play</button>
        <button onClick={this.pause}>Pause</button>
      </div>
    );
  }
}

export default AudioPlayer;
