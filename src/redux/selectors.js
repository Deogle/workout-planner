export const getMusicFiles = store => store.musicFiles;
//This can be refactored
export const getTotalDuration = store => {
    return store.musicFiles.reduce((a,b)=>{return a+b.duration},0)
};
export const getCurrentTime = store => store.currentTime;
export const getCurrentSong = store => store.currentSong;
export const getIntervals = store => store.intervals;