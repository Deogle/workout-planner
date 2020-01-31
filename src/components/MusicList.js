import React from 'react'
import { connect } from "react-redux";
import { getMusicFiles } from "../redux/selectors";
import MusicFile from "./MusicFile";

const MusicList = ({musicFiles}) => {
    return (
        <div>
            <ul>
                { musicFiles && musicFiles.length
                    ? musicFiles.map((file,index)=>{
                        return <MusicFile key={`musicFile-${file.filename}`} file={file}/>;
                    })
                    : "No files added"
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