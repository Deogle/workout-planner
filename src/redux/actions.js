/*
* action types
*/
export const ADD_AUDIO = 'ADD_AUDIO'
export const REMOVE_AUDIO = 'REMOVE_AUDIO'
export const SET_AUDIO_START = 'SET_AUDIO_START'
export const SET_AUDIO_END = 'SET_AUDIO_END'

/**
 * action creators
 */
export const addAudio = file => {
    return { type: ADD_AUDIO, filename: file.filename, resource_url: file.resource_url, start_time: file.start_time, end_time: file.end_time }
}

export const removeAudio = file => {
    return { type: REMOVE_AUDIO, filename: file.filename, resource_url: file.resource_url, start_time: file.start_time, end_time: file.end_time }
}

export const setAudioStart = file => {
    return { type: SET_AUDIO_START, filename: file.filename, start_time: file.start_time }
}

export const setAudioEnd = file => {
    return { type: SET_AUDIO_END, filename: file.filename, end_time: file.end_time }
}
