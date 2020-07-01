import {
  ADD_AUDIO,
  REMOVE_AUDIO,
  UPDATE_AUDIO_ORDER,
  SET_CURR_SONG,
  SET_CURR_TIME,
  ADD_INTERVAL,
  REMOVE_INTERVAL,
  UPDATE_INTERVAL,
  UPDATE_INTERVAL_ORDER
} from "../actions";

const initialState = {
  musicFiles: [],
  intervals: [],
  totalDuration: 0,
  currentSong: undefined,
  currentTime: undefined,
};

const app = (state = initialState, action) => {
  switch (action.type) {
    case ADD_AUDIO:
      let index = state.musicFiles.findIndex(
        (val) => val.filename === action.payload.filename
      );
      if (index === -1)
        return {
          ...state,
          musicFiles: state.musicFiles.concat({
            filename: action.payload.filename,
            resource_url: action.payload.resource_url,
            duration: action.payload.duration,
            intervals: []
          }),
        };
      return state;

    case REMOVE_AUDIO:
      return {
        ...state,
        musicFiles: state.musicFiles.filter(
          (item, index) => item.filename !== action.payload.filename
        ),
      };
    case UPDATE_AUDIO_ORDER:
      return updateAudioOrderReducer(state,action);
    case SET_CURR_TIME:
      return {
        ...state,
        currentTime: action.payload.time,
      };
    case SET_CURR_SONG:
      return {
        ...state,
        currentSong: action.payload.filename,
      };
    case ADD_INTERVAL:
      return addIntervalReducer(state,action);
    case REMOVE_INTERVAL:
      return {
        ...state,
      };
    case UPDATE_INTERVAL:
      return {
        ...state,
      };
    case UPDATE_INTERVAL_ORDER:
      return updateIntervalOrderReducer(state, action);
    default:
      return state;
  }
};

const updateIntervalOrderReducer = (state, action) => {
  return {
    ...state,
    intervals: action.payload.arr.map((i) => state.intervals.slice()[i]),
  };
};

const updateAudioOrderReducer = (state,action) => {
  var newMusicFiles = action.payload.arr.map((i)=>state.musicFiles.slice()[i])
  return {
    ...state,
    musicFiles: newMusicFiles,
    currentSong: newMusicFiles[0].filename
  }
}

const addIntervalReducer = (state,action)=>{
  var indexOfMusicFile = state.musicFiles.findIndex((file) => file.filename === action.payload.filename)
  return {
    ...state,
    musicFiles:state.musicFiles.map((item,index)=>{
      if(index !== indexOfMusicFile){
        return item;
      }
      return {
        ...item,
        intervals:item.intervals.concat(action.payload)
      }
    })
  }
}

export default app;
