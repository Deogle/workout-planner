import {uuidv4} from '../util/uuid';
/*
* action types
*/
export const ADD_AUDIO = 'ADD_AUDIO'
export const REMOVE_AUDIO = 'REMOVE_AUDIO'
export const UPDATE_DURATION = 'UPDATE_DURATION'
export const SET_CURR_SONG = 'SET_CURR_SONG'
export const SET_CURR_TIME = 'SET_CURR_TIME'
export const ADD_INTERVAL = 'ADD_INTERVAL'
export const REMOVE_INTERVAL = 'REMOVE_INTERVAL'
export const UPDATE_INTERVAL = 'UPDATE_INTERVAL'
export const UPDATE_INTERVAL_ORDER = 'UPDATE_INTERVAL_ORDER'
/**
 * audio action creators
 */
export const addAudio =  file => {
    return { type: ADD_AUDIO, payload:{filename:file.filename,resource_url:file.resource_url}}
}

export const removeAudio = file => {
    return { type: REMOVE_AUDIO, payload:{filename:file.filename}}
}

export const updateAudioDuration = obj => {
    return { type: UPDATE_DURATION, payload:{filename:obj.filename,duration:obj.duration}}
}

/**
 * interval action creators
 */
export const addInterval = interval => {
    return {type: ADD_INTERVAL, payload:{id:uuidv4(),intensity:interval.intensity,duration:interval.duration,cues:""}}
}
export const removeInterval = interval => {
    return {type: REMOVE_INTERVAL, payload:{id:interval.id}}
}
export const updateInterval = interval => {
    return {type: UPDATE_INTERVAL, payload:{id:interval.id,intensity:interval.intensity,duration:interval.duration,cues:interval.cues}}
}

export const updateIntervalOrder = order => {
    return {type: UPDATE_INTERVAL_ORDER, payload:{arr:order}}
}

/**
 * Misc action creators
 */
export const setCurrentSong = obj => {
    console.log(obj);
    return {type: SET_CURR_SONG, payload:{filename:obj.filename}}
}

export const setCurrentTime = obj => {
    return {type:SET_CURR_TIME, payload:{time:obj.time}};
}