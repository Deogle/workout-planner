const formatTime = timeInSeconds => {
    var timeStr;
    var time = Math.floor(timeInSeconds);
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time % 60);
    timeStr = minutes + ":" + (seconds > 9 ? seconds : "0" + seconds);
    return timeStr;
};

module.exports = {
    formatTime
}