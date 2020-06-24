import React from "react";
import MusicFileInput from "./MusicFileInput";
import MusicList from "./MusicList";
import NavbarTabs from "./NavbarTabs";

const MusicNavbar = props => {
    return(
        <div className={props.className}>
            <NavbarTabs>
                <MusicFileInput className="" />
                <MusicFileInput className="" />
                {/* <IntervalInput className=""/> */}
            </NavbarTabs>
            <MusicList className="test" />
        </div>
    )
}

export default MusicNavbar