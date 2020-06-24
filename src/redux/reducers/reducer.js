import {
  ADD_AUDIO,
  REMOVE_AUDIO,
  UPDATE_DURATION,
  SET_CURR_SONG,
  SET_CURR_TIME,
  ADD_INTERVAL,
  REMOVE_INTERVAL,
  UPDATE_INTERVAL,
  UPDATE_INTERVAL_ORDER,
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
            duration: 0,
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
    case UPDATE_DURATION:
      return updateDuration(state, action);
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
      return {
        ...state,
        intervals:state.intervals.concat(action.payload)

      };
    case REMOVE_INTERVAL:
      return {
        ...state,
      };
    case UPDATE_INTERVAL:
      return {
        ...state,
      };
    case UPDATE_INTERVAL_ORDER:
      return updateIntervalOrder(state,action);
    default:
      return state;
  }
};

const updateDuration = (state, action) => {
  const index = state.musicFiles.findIndex(
    (file) => file.filename === action.payload.filename
  );
  return {
    ...state,
    musicFiles: [
      ...state.musicFiles.slice(0, index),
      {
        ...state.musicFiles[index],
        duration: action.payload.duration,
      },
      ...state.musicFiles.slice(index + 1),
    ],
    totalDuration: state.musicFiles.reduce((a, b) => {
      if (b.filename === action.payload.filename) {
        return a + action.payload.duration;
      } else {
        return a + b.duration;
      }
    }, 0),
  };
};


const updateIntervalOrder = (state,action) => {
  console.log("SORTING",action.payload.arr);
  return {
    ...state,
    intervals:action.payload.arr.map(i=>state.intervals.slice()[i])
  }
}

export default app;
