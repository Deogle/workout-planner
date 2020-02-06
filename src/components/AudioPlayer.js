import React from "react";

//TODO: this class needs to be reduxed
class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.WIDTH  = 640;
    this.HEIGHT = 425;

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
      source: null,
      canvasCtx: null
    };
  }

  // Probably don't need to load tracks on start, maybe on first click of 
  // the play/pause button. This interface will eventually be scrapped anyways.
  componentDidMount() {
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");

    this.setState({
      canvasCtx:ctx
    },()=>{
      this.loadTracks();
    })
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
      var analyser = this.audioContext.createAnalyser();
      analyser.connect(src.connect(this.audioContext.destination));
      tracks.push(audioElement);
      // this.loadGraph(analyser);
    }
    this.setState({
      tracks: tracks
    });
  };

  loadGraph = analyser => {
    analyser.fftSize = 2048;
    var buffLen = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(buffLen);
    var canvasCtx = this.state.canvasCtx;
    canvasCtx.clearRect(0,0,this.WIDTH,this.HEIGHT);
    this.draw(analyser,dataArray,buffLen);
  }

  draw = (analyser,dataArray,bufferLen) => {
    var drawVisual = requestAnimationFrame(this.draw);
    analyser.getByteFrequencyData(dataArray);
    var canvasCtx = this.state.canvasCtx;

    canvasCtx.fillStyle = 'rgb(0,0,0)';
    canvasCtx.fillRect(0,0,this.WIDTH,this.HEIGHT);

    var barWidth = (this.WIDTH/bufferLen) * 2.5;
    var barHeight;
    var x = 0;
    for(var i = 0; i < bufferLen; i++){
      barHeight = dataArray[i]/2;

        canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
        canvasCtx.fillRect(x,this.HEIGHT-barHeight/2,barWidth,barHeight);

        x += barWidth + 1;
    }
    
  }
  
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
        <canvas ref="canvas" width = {640} height = {425} />
      </div>
    );
  }
}

export default AudioPlayer;
