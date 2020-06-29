import React from "react";
import { connect } from "react-redux";
import { getMusicFiles, getCurrentSong, getCurrentTime } from "../redux/selectors";
import { formatTime } from "../util/time";
import { setCurrentTime, setCurrentSong } from "../redux/actions";

//TODO: this class needs to be reduxed
class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.WIDTH = 640;
    this.HEIGHT = 180;

    this.state = {
      playing: false,
      tracks: [],
      currTrack: 0,
      percentTime: 0,
      duration: 0,
      source: null,
      canvasCtx: null,
      playerCanvasCtx: null
    };
  }

  //Load tracks and add canvases contexts to state
  componentDidMount() {
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    // const canvas = this.refs.canvas;
    const playerCanvas = this.refs.player_canvas;
    const playerCanvasCtx = playerCanvas.getContext("2d");
    const ctx = null //canvas.getContext("2d");

    this.setState(
      {
        canvasCtx: ctx,
        playerCanvasCtx: playerCanvasCtx
      }
    );
  }

  //Check if there has been a change in the redux store, if so, update component state
  componentDidUpdate() {
    if(this.state.tracks.length !== this.props.musicFiles.length){
      this.loadTracks();
    }
    for(var i = 0; i< this.state.tracks.length;i++){
      var track = this.state.tracks[i];
      var musicFile = this.props.musicFiles
    }
  }

  // TODO HIGH PRIORITY: testing
  loadTracks = () => {
    var tracks = [];
    //load tracks
    for (var track of this.props.musicFiles) {
      var audioElement = new Audio(track.resource_url);

      audioElement.onended = () => {
        this.playNextTrack();
      };

      audioElement.ontimeupdate = () => {
        this.getCurrentTime();
      };

      var src = this.audioContext.createMediaElementSource(audioElement);
      src.connect(this.audioContext.destination);
      console.log(audioElement);
      tracks.push(audioElement);
      this.setState({
        tracks:tracks
      })
    }
  };

  loadGraph = () => {
    var canvasCtx = this.state.canvasCtx;
    canvasCtx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
    this.draw();
  };

  drawPlayer = () => {
    requestAnimationFrame(this.drawPlayer);
    var playerCanvasCtx = this.state.playerCanvasCtx;

    playerCanvasCtx.clearRect(0, 0, this.WIDTH, 100);
    playerCanvasCtx.fillStyle = "transparent";
    playerCanvasCtx.fillRect(0, 0, this.WIDTH, 100);

    //draw the sound graph

    //timeline dimensions
    var timeline_width = this.HEIGHT * 3;
    var timeline_height = 2;
    var timeline_start = 50;
    var timeline_end = 50 - timeline_height;

    playerCanvasCtx.fillStyle = "rgb(200,200,200)";
    playerCanvasCtx.fillRect(
      timeline_start,
      timeline_end,
      timeline_width,
      timeline_height
    );

    //circle dimensions
    //x positiion will be the percentage of timeline equal to percentage of song
    // var circle_x = 50 + timeline_width * this.state.percentTime;
    // var circle_y = 50 - 2;
    // var circle_radius = 10;
    // var circle_startAngle = 0;
    // var circle_endAngle = 2 * Math.PI;

    // playerCanvasCtx.fillStyle = "#ff7961";
    // playerCanvasCtx.beginPath();
    // playerCanvasCtx.arc(
    //   circle_x,
    //   circle_y,
    //   circle_radius,
    //   circle_startAngle,
    //   circle_endAngle
    // );
    // playerCanvasCtx.fill();
    // playerCanvasCtx.closePath();
    
    //fill line
    playerCanvasCtx.fillStyle = "#d50000"
    playerCanvasCtx.fillRect(timeline_start,timeline_end,timeline_width * this.state.percentTime ,timeline_height)

    //draw the timestamps
    playerCanvasCtx.font = "15px Roboto";
    playerCanvasCtx.fillStyle = "#f1f1f1";

    var track = this.state.tracks[this.state.currTrack];
    var formattedCurrentTime = 0;

    if (track) {
      track = track.currentTime;
      formattedCurrentTime = formatTime(track);
    }

    playerCanvasCtx.fillText(formattedCurrentTime, 10, 53);
    playerCanvasCtx.fillText(
      formatTime(this.state.duration),
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
      y > (timeline_y - tolerance) &&
      y < (timeline_y) + (timeline_height + tolerance) &&
      x > timeline_x &&
      x < timeline_x + timeline_width
    ) {
      //seek to percentage of track based on percentage x is of total timeline length
      var percentageTimeline = x - timeline_x;
      percentageTimeline = percentageTimeline / (timeline_width);
      this.seekTrack(percentageTimeline);
    }
  };

  seekTrack = percentTime => {
    var track = this.state.tracks[this.state.currTrack];
    if (track) {
      track.currentTime = (percentTime * track.duration);
    }
  }

  // TODO: Testing
  playPause = () => {
    if(this.props.musicFiles[this.state.currTrack] === undefined){
      return;
    }
    if (this.audioContext.state === "suspended") {
      this.audioContext.resume().then(() => {
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
        if (this.state.tracks[this.state.currTrack] !== undefined) {
          this.state.tracks[this.state.currTrack].play();
          
          this.props.setCurrentSong({filename:this.state.tracks[this.state.currTrack].currentSrc.split("/")[4]})
        }
        else {
          this.setState(
            {
              currTrack: 0,
            },()=>{
              this.state.tracks[this.state.currTrack].play();
              this.props.setCurrentSong({filename:this.state.tracks[this.state.currTrack].currentSrc.split("/")[4]})
            }
          );
        }
      }
    );
  };

  getCurrentTime = () => {
    var track = this.state.tracks[this.state.currTrack];
    this.props.setCurrentTime({time:track.currentTime})
    this.setState({
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
      <div className={this.props.className}>
        <canvas
          style={{maxWidth:this.WIDTH}}
          onClick={this.seekOnClick}
          ref="player_canvas"
          width={this.WIDTH}
          height={100}
        />
        <button onClick={this.playPause}>Play/Pause</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const musicFiles = getMusicFiles(state);
  const currentSong = getCurrentSong(state);
  const currentTimeState = getCurrentTime(state);
  return { musicFiles, currentSong, currentTimeState };
}

export default connect(mapStateToProps,{setCurrentSong,setCurrentTime})(AudioPlayer);
