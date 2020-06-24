import React from "react";
import MusicFileInput from "./MusicFileInput";
import MusicList from "./MusicList";

const MusicNavbar = props => {
    return(
        <div className={props.className}>
            <MusicFileInput className="" />
            <MusicList className="test" />
        </div>
    )
}

export default MusicNavbar