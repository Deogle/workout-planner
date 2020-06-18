import React from "react";
import MusicFileInput from "./MusicFileInput";
import MusicList from "./MusicList";
import AudioPlayer from "./AudioPlayer";
import WorkoutGraph from "./WorkoutGraph";
import "../css/App.css";

var testInteravalData = [
  {
    intensity:10,
    duration:120
  },
  {
    intensity:20,
    duration:30
  },
  {
    intensity:30,
    duration:60,
  },
  {
    intensity:40,
    duration:30
  },
  {
    intensity:50,
    duration:120
  },
  {
    intensity:60,
    duration:60,
  },
  {
    intensity:70,
    duration:60,
  },
  {
    intensity:80,
    duration:60,
  },
  {
    intensity:100,
    duration:60,
  }
]

function App() {
  return (
    <div className="App">
      <h1>Workout Planner</h1>
      <MusicFileInput/>
      <MusicList className="test" />
      <WorkoutGraph data={testInteravalData} width={1000} height={250} size={[250,250]}/>
      <AudioPlayer className="test"/>
    </div>
  );
}

export default App;