import React from "react";
import MusicNavbar from "./MusicNavbar";
import AudioPlayer from "./AudioPlayer";
import WorkoutGraph from "./WorkoutGraph";
import "../css/App.css";

function App() {
  var width = 1000;
  var height = 500;
  return (
    <div className="App">
      <div className="main-container">
        <MusicNavbar className="navbar"/>
        <div className="row2">
          <h1>Workout Planner</h1>
          <WorkoutGraph
            className="workout-graph"
            // data={testInteravalData}
            width={width}
            height={height}
            size={[width, height]}
          />
          <AudioPlayer className="audio-player" />
        </div>
      </div>
    </div>
  );
}

export default App;
