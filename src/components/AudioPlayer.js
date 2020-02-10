import React from "react";

//TODO: this class needs to be reduxed
class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.WIDTH = 640;
    this.HEIGHT = 180;

    this.state = {
      playing: false,
      buffLen: 0,
      files: [
        "./example_audio/tick.mp3",
        "./example_audio/coffee_shop_tune.mp3"
        // "./example_audio/low_fi_tune.mp3"
      ] /** this is just for debugging, these should be from redux store */,
      tracks: [],
      dataArrays: [],
      analysers: [],
      currTrack: 0,
      percentTime: 0,
      duration: 0,
      source: null,
      canvasCtx: null,
      playerCanvasCtx: null
    };
  }

  // Probably don't need to load tracks on start, maybe on first click of
  // the play/pause button. This interface will eventually be scrapped anyways.
  componentDidMount() {
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    const canvas = this.refs.canvas;
    const playerCanvas = this.refs.player_canvas;
    const playerCanvasCtx = playerCanvas.getContext("2d");
    const ctx = canvas.getContext("2d");

    this.setState(
      {
        canvasCtx: ctx,
        playerCanvasCtx: playerCanvasCtx
      },
      () => {
        this.loadTracks();
      }
    );
  }

  // TODO HIGH PRIORITY: testing
  loadTracks = () => {
    var tracks = [];
    var analysers = [];
    var dataArrays = [];
    for (var track of this.state.files) {
      var audioElement = new Audio(track);

      audioElement.onended = () => {
        this.playNextTrack();
      };

      audioElement.ontimeupdate = () => {
        this.getCurrentTime();
      };

      var src = this.audioContext.createMediaElementSource(audioElement);
      var analyser = this.audioContext.createAnalyser();

      src.connect(analyser);

      analyser.connect(this.audioContext.destination);
      tracks.push(audioElement);

      analyser.fftSize = 256;
      analyser.minDecibels = -90;
      analyser.maxDecibels = -10;
      analyser.smoothingTimeConstant = 0.99;

      var buffLen = analyser.frequencyBinCount;
      var dataArray = new Float32Array(buffLen);

      dataArrays.push(dataArray);
      analysers.push(analyser);
    }
    this.setState({
      tracks: tracks,
      analysers: analysers,
      dataArrays: dataArrays,
      buffLen: buffLen
    });
  };

  loadGraph = () => {
    var canvasCtx = this.state.canvasCtx;
    canvasCtx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
    this.draw();
  };

  //TODO make this smoother
  drawPlayer = () => {
    requestAnimationFrame(this.drawPlayer);
    var playerCanvasCtx = this.state.playerCanvasCtx;

    playerCanvasCtx.clearRect(0, 0, this.WIDTH, 100);
    playerCanvasCtx.fillStyle = "rgb(250,250,250)";
    playerCanvasCtx.fillRect(0, 0, this.WIDTH, 100);

    //draw the sound graph

    //timeline dimensions
    var timeline_start = 50;
    var timeline_end = 50 - 5;
    var timeline_width = this.HEIGHT * 3;
    var timeline_height = 5;

    playerCanvasCtx.fillStyle = "rgb(200,200,200)";
    playerCanvasCtx.fillRect(
      timeline_start,
      timeline_end,
      timeline_width,
      timeline_height
    );

    //circle dimensions
    //x positiion will be the percentage of timeline equal to percentage of song
    var circle_x = 50 + timeline_width * this.state.percentTime;
    var circle_y = 50 - 2;
    var circle_radius = 10;
    var circle_startAngle = 0;
    var circle_endAngle = 2 * Math.PI;

    playerCanvasCtx.fillStyle = "rgb(255,50,0)";
    playerCanvasCtx.beginPath();
    playerCanvasCtx.arc(
      circle_x,
      circle_y,
      circle_radius,
      circle_startAngle,
      circle_endAngle
    );
    playerCanvasCtx.fill();
    playerCanvasCtx.closePath();

    //draw the timestamps
    playerCanvasCtx.font = "15px Arial";
    playerCanvasCtx.fillStyle = "rgb(0,0,0)";

    var track = this.state.tracks[this.state.currTrack];
    var formattedCurrentTime = 0;

    if (track) {
      track = track.currentTime;
      formattedCurrentTime = this.formatTime(track);
    }

    playerCanvasCtx.fillText(formattedCurrentTime, 10, 53);
    playerCanvasCtx.fillText(
      this.formatTime(this.state.duration),
      this.WIDTH - 40,
      53
    );
  };

  seekOnClick = e => {
    e.preventDefault();

    const playerCanvas = this.refs.player_canvas;
    //timeline dimensions
    var timeline_x = 50;
    var timeline_y = 50 - 5;
    var timeline_width = this.HEIGHT * 3;
    var timeline_height = 5;

    //adjust this value to allow less precise clicking
    //measured in pixels
    var tolerance = 10;

    var x = e.pageX - playerCanvas.offsetLeft;
    var y = e.pageY - playerCanvas.offsetTop;

    if (
      y > (timeline_y-tolerance) &&
      y < (timeline_y) + (timeline_height+tolerance) &&
      x > timeline_x &&
      x < timeline_x + timeline_width
    ) {
      //seek to percentage of track based on percentage x is of total timeline length
      var percentageTimeline = x-timeline_x;
      percentageTimeline = percentageTimeline/(timeline_width);

      console.log(`clicked timeline! setting to ${percentageTimeline} percent of song`);
      this.seekTrack(percentageTimeline);
    }

    console.log(`Clicked!: X:${x} Y:${y} `);
  };

  seekTrack = percentTime => {
    var track = this.state.tracks[this.state.currTrack];
    if(track){
      track.currentTime = (percentTime * track.duration);
    }
  }

  formatTime = timeInSeconds => {
    var timeStr;
    var time = Math.floor(timeInSeconds);
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time % 60);
    timeStr = minutes + ":" + (seconds > 9 ? seconds : "0" + seconds);
    return timeStr;
  };

  draw = () => {
    if (this.state.playing === true) {
      requestAnimationFrame(this.draw);
    }

    var analyser = this.state.analysers[this.state.currTrack];
    var dataArray = this.state.dataArrays[this.state.currTrack];
    var bufferLen = this.state.buffLen;

    if (!analyser) {
      return;
    }

    analyser.getFloatFrequencyData(dataArray);
    var canvasCtx = this.state.canvasCtx;
    canvasCtx.fillStyle = "rgb(255,255,255)";
    canvasCtx.fillRect(0, 0, this.WIDTH, this.HEIGHT);

    var barWidth = (this.WIDTH / bufferLen) * 2.5;
    var barHeight;
    var x = 0;
    for (var i = 0; i < bufferLen; i++) {
      barHeight = (dataArray[i] / 2) * 2.5;
      canvasCtx.fillStyle =
        "rgb(" + (Math.abs(barHeight * 1.5) + 50) + ",50,50)";
      canvasCtx.fillRect(x, this.HEIGHT - barHeight / 2, barWidth, barHeight);

      x += barWidth + 1;
    }
  };

  // TODO: Testing
  playPause = () => {

    if(this.audioContext.state === "suspended"){
      this.audioContext.resume().then(()=>{
        return;
      })
    }
    if (this.state.playing) {
      this.setState({ playing: false }, () => {
        this.state.tracks[this.state.currTrack].pause();
      });
    } else {
      this.setState({ playing: true }, () => {
        this.state.tracks[this.state.currTrack].play();
      });
    }
  };

  // TODO: Testing
  playNextTrack = () => {
    this.setState(
      {
        currTrack: this.state.currTrack + 1
      },
      () => {
        console.log(this.state.tracks[this.state.currTrack]);
        if (this.state.tracks[this.state.currTrack] !== undefined) {
          this.state.tracks[this.state.currTrack].play();
        }else {
          this.setState(
            {
              currTrack: 0
            }, () => {
              this.state.tracks[this.state.currTrack].play();
            }
          );
        }
      }
    );
  };

  // TODO: Testing
  getCurrentTime = () => {
    var track = this.state.tracks[this.state.currTrack];
    this.setState({
      curr_time: track.currentTime,
      duration: Math.floor(track.duration),
      percentTime: track.currentTime / track.duration
    });
  };

  render() {
    if (this.state.canvasCtx) {
      this.loadGraph();
    }
    if (this.state.playerCanvasCtx) {
      this.drawPlayer();
    }
    return (
      <div>
        <button onClick={this.playPause}>Play/Pause</button>
        <br />
        {/* This should probably be cleaner / refactored to not be 500iq */}
        <p>
          Current song:{" "}
          {
            this.state.files[this.state.currTrack] !== undefined ? this.state.files[this.state.currTrack]
            .split("/")[2]
            .split(".mp3")[0]
            : ""
          }
        </p>
        <canvas ref="canvas" width={this.WIDTH} height={this.HEIGHT} />
        <br />
        <canvas
          onClick={this.seekOnClick}
          ref="player_canvas"
          width={this.WIDTH}
          height={100}
        />
      </div>
    );
  }
}

export default AudioPlayer;
