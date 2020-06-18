/*
* action types
*/
export const ADD_AUDIO = 'ADD_AUDIO'
export const REMOVE_AUDIO = 'REMOVE_AUDIO'
export const UPDATE_DURATION = 'UPDATE_DURATION'
export const SET_CURR_SONG = 'SET_CURR_SONG'
export const SET_CURR_TIME = 'SET_CURR_TIME'
/**
 * action creators
 */
export const addAudio =  file => {
    return { type: ADD_AUDIO, payload:{filename:file.filename,resource_url:file.resource_url}}
}

export const removeAudio = file => {
    return { type: REMOVE_AUDIO, payload:{filename:file.filename,resource_url:file.resource_url}}
}

export const updateAudioDuration = obj => {
    return { type: UPDATE_DURATION, payload:{filename:obj.filename,duration:obj.duration}}
}

export const setCurrentSong = obj => {
    console.log(obj);
    return {type: SET_CURR_SONG, payload:{filename:obj.filename}}
}

export const setCurrentTime = obj => {
    return {type:SET_CURR_TIME, payload:{time:obj.time}};
}
