import { ADD_AUDIO, REMOVE_AUDIO } from '../actions'

const initialState = {
    musicFiles: []
}

const app  = (state = initialState,action)=>{
    switch(action.type){
        case ADD_AUDIO:
            //no duplicate audio, for now todo lol
            let index = state.musicFiles.findIndex(val => val === action.filename);
            if(index === -1)
                return {
                    ...state,
                    musicFiles: state.musicFiles.concat(action.filename)
                };
            return state;
            
        case REMOVE_AUDIO:
            return {
                ...state,
                musicFiles: state.musicFiles.filter((item,index)=>item !== action.filename)
            }
        default:
            return state;
    }
}

export default app;