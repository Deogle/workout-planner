/*
* action types
*/
export const ADD_AUDIO = 'ADD_AUDIO'
export const REMOVE_AUDIO = 'REMOVE_AUDIO'
export const UPDATE_DURATION = 'UPDATE_DURATION'

/**
 * action creators
 */
export const addAudio =  file => {
    return { type: ADD_AUDIO, filename:file.filename,resource_url:file.resource_url}
}

export const removeAudio = file => {
    return { type: REMOVE_AUDIO, filename:file.filename,resource_url:file.resource_url}
}

export const updateAudioDuration = action => {
    return { type: UPDATE_DURATION, filename:action.filename,duration:action.duration}
}
