import { ADD_AUDIO, REMOVE_AUDIO, UPDATE_DURATION } from "../actions";

const initialState = {
  musicFiles: [],
  totalDuration: 0,
};

const app = (state = initialState, action) => {
  switch (action.type) {
    case ADD_AUDIO:
      let index = state.musicFiles.findIndex(
        (val) => val.filename === action.filename
      );
      if (index === -1)
        return {
          ...state,
          musicFiles: state.musicFiles.concat({
            filename: action.filename,
            resource_url: action.resource_url,
            duration: 0,
          }),
        };
      return state;

    case REMOVE_AUDIO:
      return {
        ...state,
        musicFiles: state.musicFiles.filter(
          (item, index) => item.filename !== action.filename
        ),
      };
    case UPDATE_DURATION:
      return updateDuration(state, action);
    default:
      return state;
  }
};

const updateDuration = (state, action) => {
  const index = state.musicFiles.findIndex(
    (file) => file.filename === action.filename
  );
  console.log(state.musicFiles);
  console.log(index);
  return {
    ...state,
    musicFiles: [
      ...state.musicFiles.slice(0, index),
      {
        ...state.musicFiles[index],
        duration:action.duration
      },
      ...state.musicFiles.slice(index + 1),
    ],
    totalDuration: state.musicFiles.reduce((a, b) => {
      if(b.filename === action.filename){
          return a+action.duration;
      } else {
          return a+b.duration;
      }
    }, 0),
  };
};

export default app;
