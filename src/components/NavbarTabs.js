import React from'react'

const NavbarTabs = props => {
    return (
        <div className="navbar-tabs">
            <div onClick={()=>{props.setActive("left")}} className={"tab tab-left "+(props.active === "left" ? "" : "tab-inactive")}>
                {props.left}
            </div>
            <div onClick={()=>{props.setActive("right")}} className={"tab tab-right "+(props.active === "right" ? "" : "tab-inactive")}>
                {props.right}
            </div>
        </div>
    )
}
export default NavbarTabs