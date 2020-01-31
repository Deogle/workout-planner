/*
* action types
*/
export const ADD_AUDIO = 'ADD_AUDIO'
export const REMOVE_AUDIO = 'REMOVE_AUDIO'

/**
 * action creators
 */
export const addAudio =  filename => {
    return { type: ADD_AUDIO, filename:filename}
}

export const removeAudio = filename => {
    return { type: REMOVE_AUDIO, filename:filename}
}
