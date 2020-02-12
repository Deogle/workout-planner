import { ADD_AUDIO, REMOVE_AUDIO } from '../actions'

const initialState = {
    musicFiles: []
}

const app = (state = initialState, action) => {
    switch (action.type) {
        case ADD_AUDIO:
            let index = state.musicFiles.findIndex(val => val.filename === action.filename);
            if (index === -1)
                return {
                    ...state,
                    musicFiles: state.musicFiles.concat({
                        filename: action.filename,
                        resource_url: action.resource_url,
                        start_time: action.start_time,
                        end_time: action.end_time
                    })
                };
            return state;

        case REMOVE_AUDIO:
            return {
                ...state,
                musicFiles: state.musicFiles.filter((item, index) => item.filename !== action.filename)
            }
        default:
            return state;
    }
}

export default app;