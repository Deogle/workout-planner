import React from 'react';
import { connect } from 'react-redux';
import { addAudio } from '../redux/actions';

class MusicFileInput extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            file: React.createRef()
        }
    }

    handleUpload = e => {
        e.preventDefault();
        if(this.state.file){
            this.props.addAudio(this.state.file.current.files[0].name);
        }
    }
    
    render(){
        return(
            <div>
                <span style={{marginLeft:"70px"}}><input id="audio_file" type="file" accept=".mp3" ref={this.state.file} onChange={this.handleUpload} /></span>
                <p>Upload some mp3 files</p>
            </div>
        )
    }
}

export default connect(null,{ addAudio })(MusicFileInput);