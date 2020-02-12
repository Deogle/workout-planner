/*
* action types
*/
export const ADD_AUDIO = 'ADD_AUDIO'
export const REMOVE_AUDIO = 'REMOVE_AUDIO'

/**
 * action creators
 */
export const addAudio =  file => {
    return { type: ADD_AUDIO, filename:file.filename,resource_url:file.resource_url,start_time:file.start_time,end_time:file.end_time}
}

export const removeAudio = file => {
    return { type: REMOVE_AUDIO, filename:file.filename,resource_url:file.resource_url,start_time:file.start_time,end_time:file.end_time}
}
