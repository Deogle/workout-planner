import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getTotalDuration,
  getCurrentTime,
  getCurrentSong,
  getMusicFiles,
} from "../redux/selectors";
import { scaleLinear } from "d3-scale";
import { scaleThreshold } from "d3-scale";
import { select, event } from "d3-selection";
import { drag } from "d3-drag";

class WorkoutGraph extends Component {
  componentDidMount() {
    this.createChart();
  }

  componentDidUpdate() {
    this.createChart();
  }

  buildGraphData = (data) => {
    var sum = 0;
    for (var datum of data) {
      sum += datum.duration;
    }
    //calculate width as percentage of sum of duration
    for (var i = 0; i < data.length; i++) {
      data[i].width = (data[i].duration / sum) * this.props.width;
    }
    //calculate x location
    for (var j = 0; j < data.length; j++) {
      if (j === 0) {
        data[j].x = 0;
      } else {
        data[j].x = data[j - 1].x + data[j - 1].width;
      }
    }
    return data;
  };

  createChart = () => {
    const data = this.buildGraphData(this.props.data);
    const node = this.node;
    data.reduce((a, b) => {
      if (a.intensity) {
        return Math.max(a.intensity, b.intensity);
      } else {
        return Math.max(a, b.intensity);
      }
    });

    const calculateColor = (data) => {
      const min = 0;
      const max = 100;
      const d = (max - min) / 100;
      return scaleThreshold()
        .range([
          "#1976d2",
          "#2679ce",
          "#2f7cca",
          "#377fc7",
          "#3d82c3",
          "#4284bf",
          "#4787bc",
          "#4b8ab8",
          "#4f8db5",
          "#5390b1",
          "#5693ad",
          "#5a95aa",
          "#5d98a6",
          "#609ba3",
          "#629e9f",
          "#65a19c",
          "#68a399",
          "#6aa695",
          "#6da992",
          "#6fac8e",
          "#72ae8b",
          "#75b188",
          "#77b484",
          "#7ab681",
          "#7cb97e",
          "#7fbc7a",
          "#82be77",
          "#85c174",
          "#88c371",
          "#8bc66d",
          "#8ec86a",
          "#92cb67",
          "#95cd64",
          "#99cf61",
          "#9dd25d",
          "#a1d45a",
          "#a5d657",
          "#aad854",
          "#aeda51",
          "#b3dc4e",
          "#b8de4b",
          "#bee049",
          "#c4e246",
          "#cae444",
          "#d0e541",
          "#d7e73f",
          "#dee83d",
          "#e6e93c",
          "#eeea3b",
          "#f6eb3b",
          "#ffe739",
          "#ffe437",
          "#ffe035",
          "#ffdc33",
          "#ffd831",
          "#ffd42f",
          "#ffd12d",
          "#ffcd2b",
          "#ffc92a",
          "#ffc528",
          "#fec126",
          "#febe24",
          "#feba22",
          "#fdb620",
          "#fdb21f",
          "#fcaf1d",
          "#fbab1b",
          "#fba71a",
          "#faa318",
          "#fa9f16",
          "#f99c14",
          "#f89813",
          "#f79411",
          "#f69010",
          "#f58c0e",
          "#f5880c",
          "#f4850b",
          "#f38109",
          "#f27d08",
          "#f07906",
          "#ef7505",
          "#ee7104",
          "#ed6d03",
          "#ec6802",
          "#eb6402",
          "#e96001",
          "#e85c01",
          "#e75700",
          "#e65300",
          "#e44e00",
          "#e34900",
          "#e14400",
          "#e03f00",
          "#de3900",
          "#dd3400",
          "#db2d00",
          "#da2600",
          "#d81d00",
          "#d71200",
          "#d50000",
        ])
        .domain([
          min + d * 1,
          min + d * 2,
          min + d * 3,
          min + d * 4,
          min + d * 5,
          min + d * 6,
          min + d * 7,
          min + d * 8,
          min + d * 9,
          min + d * 10,
          min + d * 11,
          min + d * 12,
          min + d * 13,
          min + d * 14,
          min + d * 15,
          min + d * 16,
          min + d * 17,
          min + d * 18,
          min + d * 19,
          min + d * 20,
          min + d * 21,
          min + d * 22,
          min + d * 23,
          min + d * 24,
          min + d * 25,
          min + d * 26,
          min + d * 27,
          min + d * 28,
          min + d * 29,
          min + d * 30,
          min + d * 31,
          min + d * 32,
          min + d * 33,
          min + d * 34,
          min + d * 35,
          min + d * 36,
          min + d * 37,
          min + d * 38,
          min + d * 39,
          min + d * 40,
          min + d * 41,
          min + d * 42,
          min + d * 43,
          min + d * 44,
          min + d * 45,
          min + d * 46,
          min + d * 47,
          min + d * 48,
          min + d * 49,
          min + d * 50,
          min + d * 51,
          min + d * 52,
          min + d * 53,
          min + d * 54,
          min + d * 55,
          min + d * 56,
          min + d * 57,
          min + d * 58,
          min + d * 59,
          min + d * 60,
          min + d * 61,
          min + d * 62,
          min + d * 63,
          min + d * 64,
          min + d * 65,
          min + d * 66,
          min + d * 67,
          min + d * 68,
          min + d * 69,
          min + d * 70,
          min + d * 71,
          min + d * 72,
          min + d * 73,
          min + d * 74,
          min + d * 75,
          min + d * 76,
          min + d * 77,
          min + d * 78,
          min + d * 79,
          min + d * 80,
          min + d * 81,
          min + d * 82,
          min + d * 83,
          min + d * 84,
          min + d * 85,
          min + d * 86,
          min + d * 87,
          min + d * 88,
          min + d * 89,
          min + d * 90,
          min + d * 91,
          min + d * 92,
          min + d * 93,
          min + d * 94,
          min + d * 95,
          min + d * 96,
          min + d * 97,
          min + d * 98,
          min + d * 99,
        ])(data);
    };

    const calculateLineX = () => {
      //calculate line x position as percentage of total duration offset by current song location and duration
      var line_x = -1;
      if (this.props.musicFiles.length < 1) {
        return line_x;
      }
      var index = this.props.musicFiles.findIndex(
        (file) => file.filename === this.props.currentSong
      );
      var totalDuration = this.props.totalDuration;
      var currTime = this.props.currentTime;
      var currTimeTotal =
        this.props.musicFiles.slice(0, index).reduce((a, b) => {
          return a + b.duration;
        }, 0) + currTime;
      var percTotalTime = currTimeTotal / totalDuration;
      line_x = this.props.width * percTotalTime;
      if (!line_x) {
        return -1;
      }
      return line_x;
    };

    const calculateSongLine = (song) => {
      var index = this.props.musicFiles.findIndex(
        (file) => file.filename === song.filename
      );
      var totalDur = this.props.totalDuration;
      var timeTotal = this.props.musicFiles
        .slice(0, index + 1)
        .reduce((a, b) => {
          return a + b.duration;
        }, 0);
      var percTime = timeTotal / totalDur;
      return this.props.width * percTime;
    };


    const calculateTextX = song => {
      var index = this.props.musicFiles.findIndex(
        (file) => file.filename === song.filename
      );
      if(this.props.musicFiles.length <= 1 || index === 0){
        return calculateSongLine(song) /2;
      }
      var song_prev_x = calculateSongLine(this.props.musicFiles[index-1]);
      var curr_x = calculateSongLine(this.props.musicFiles[index]);
      var text_x = ((curr_x-song_prev_x)/2)+song_prev_x
      console.log(text_x)
      return text_x
    }

    const yScale = scaleLinear()
      .domain([0, 150])
      .range([0, this.props.size[1]]);
    select(node)
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("id", (d, i) => `rect-${i}`);

    select(node).selectAll("line").remove();
    //draw current time line
    select(node)
      .append("line")
      .attr("x1", calculateLineX())
      .attr("x2", calculateLineX())
      .attr("y1", 0)
      .attr("y2", 1000)
      .attr("stroke", "white")
      .attr("fill", "white");

    //draw song deliniation lines
    select(node).selectAll("text").remove();
    for (var song of this.props.musicFiles) {
      var x_val = calculateSongLine(song);
      select(node)
        .append("line")
        .attr("x1", x_val)
        .attr("x2", x_val)
        .attr("y1", 0)
        .attr("y2", 1000)
        .attr("stroke", "white")
        .attr("fill", "white");
      if (x_val) {
        var text_x = calculateTextX(song);
        select(node)
          .append("text")
          .attr("x", text_x)
          .attr("y", this.props.height / 2)
          .attr("fill", "white")
          .style("text-anchor", "middle")
          .text(song.filename);
      }
    }

    //select(node).selectAll("rect").data(data).exit().remove();

    select(node)
      .selectAll("rect")
      .data(data)
      .attr("style", (d) => `fill:${calculateColor(d.intensity)}`)
      .attr("x", (d, i) => d.x)
      .attr("y", (d) => this.props.size[1] - yScale(d.intensity))
      .attr("height", (d) => yScale(d.intensity))
      .attr("width", (d) => d.width);

    //setup click and drag events
    var curr_id = "";
    select(node)
      .selectAll("rect")
      .on("mousedown", (d, i) => {
        curr_id = event.target.id;
      })
      .on("click", (d, i) => {
        this.createChart();
      });
    //drag handler - TODO: always bring dragged element to front
    var dragHandler = drag()
      .on("drag", (d) => {
        var id = curr_id;
        if (curr_id)
          select(node)
            .select(`#${id}`)
            .attr("x", (d, i) => event.x);
      })
      .on("end", () => {
        //check event x relative to other interval elements, rearrange array, and redraw
        var datum = data[curr_id.split("-")[1]];
        datum.x = event.x;
        data.sort((a, b) => {
          return a.x - b.x;
        });
        this.createChart();
      });

    dragHandler(select(node).selectAll("rect"));
  };

  render() {
    return (
      <div className={this.props.className}>
        <svg
          ref={(node) => (this.node = node)}
          width={this.props.width}
          height={this.props.height}
          style={{ backgroundColor: "black", verticalAlign: "top" }}
        ></svg>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const totalDuration = getTotalDuration(state);
  const currentTime = getCurrentTime(state);
  const currentSong = getCurrentSong(state);
  const musicFiles = getMusicFiles(state);

  return { musicFiles, totalDuration, currentTime, currentSong };
};

export default connect(mapStateToProps)(WorkoutGraph);
