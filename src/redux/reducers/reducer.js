import { ADD_AUDIO, REMOVE_AUDIO } from '../actions'

const initialState = {
    musicFiles: []
}

const app  = (state = initialState,action)=>{
    switch(action.type){
        case ADD_AUDIO:
            return Object.assign({},state, {
                musicFiles: [
                    ...state.musicFiles,
                    {
                        filename: action.filename
                    }
                ]
            })
        case REMOVE_AUDIO:
            return state.filter(val=>val.filename !== action.filename);
        default:
            return state;
    }
}

export default app;