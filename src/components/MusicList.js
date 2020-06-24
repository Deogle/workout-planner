import React from 'react'
import { connect } from "react-redux";
import { getMusicFiles } from "../redux/selectors";
import MusicFileListItem from "./MusicFileListItem";

const MusicList = ({musicFiles}) => {
    return (
        <div className="music-file-list">
            <ul>
                { musicFiles && musicFiles.length
                    ? musicFiles.map((file,index)=>{
                        return <MusicFileListItem key={`musicFile-${file.filename}`} file={file}/>;
                    })
                    : null
                }
            </ul>
        </div>
    )
}

const mapStateToProps = state => {
    const musicFiles = getMusicFiles(state);
    return { musicFiles };
}

export default connect(mapStateToProps)(MusicList);