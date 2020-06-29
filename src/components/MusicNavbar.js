import React from "react";
import MusicFileInput from "./MusicFileInput";
import MusicList from "./MusicList";
import NavbarTabs from "./NavbarTabs";
import InteravlTabIcon from "./IntervalTabIcon.js";
import IntervalList from "./IntervalList.js";

const MusicNavbar = (props) => {
  const [active, setActive] = React.useState("left");
  var leftActive = active === "left" ? true : false;
  var rightActive = active === "right" ? true : false;
  return (
    <div className={props.className}>
      <NavbarTabs
        setActive={setActive}
        active={active}
        left={<MusicFileInput active={leftActive} />}
        right={<InteravlTabIcon active={rightActive} />}
      />
      {active === "left" ? (
        <MusicList/>
      ) : (
        <IntervalList />
      )}
    </div>
  );
};

export default MusicNavbar;
