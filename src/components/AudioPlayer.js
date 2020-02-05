import React from "react";
import BufferLoader from "../util/BufferLoader";

//TODO: this class needs to be reduxed
class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      files: ['./example_audio/coffee_shop_tune.mp3','./example_audio/low_fi_tune.mp3'], /** Should probably contain more than just resource url */
      tracks: [],
      bufferList:null,
      source:null
    };
  }

  componentDidMount() {
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    this.loadTracks();
  }

  /** This version of loadTracks uses the BufferLoader class and AudioBufferNodes */
  // loadTracks = () => {
  //   this.bufferLoader = new BufferLoader(
  //     this.audioContext,
  //     this.state.tracks,
  //     this.finishedLoading
  //   );
  //   this.bufferLoader.load();
  // }

  /** 
   * This version of loadTracks uses Audio elements and mediaElementSourceNodes
   */
  loadTracks = () => {
    var tracks = []
    for(var track of this.state.files){
      var audioElement = new Audio(track);
      audioElement.onended(()=>{
        alert('track ended');
      })
      var src = this.audioContext.createMediaElementSource(audioElement);
      src.connect(this.audioContext.destination);
      tracks.push(audioElement);
      
    }
    this.setState({
      tracks:tracks
    })
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
