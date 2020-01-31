import React from 'react';
import MusicFileInput from './MusicFileInput';
import MusicList from './MusicList';
import AudioPlayer from './AudioPlayer'
import '../css/App.css';

function App() {
  return (
    <div className="App">
      <h1>Workout Planner</h1>
      <MusicFileInput />
      <MusicList />
      <AudioPlayer/>
    </div>
  );
}

export default App;
