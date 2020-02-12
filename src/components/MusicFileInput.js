import React from 'react';
import { connect } from 'react-redux';
import { addAudio } from '../redux/actions';

class MusicFileInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            file: React.createRef()
        }
    }

    handleUpload = e => {
        e.preventDefault();
        if (this.state.file) {
            this.createAudio(this.state.file.current.files[0])
            .then(file=>{
                this.props.addAudio(file);
            })
        }
    }

    createAudio = file => {
        return new Promise((resolve, reject) => {
            var audioFile = new Audio(`./example_audio/${file.name}`);
            audioFile.onloadedmetadata = () => {
                resolve({
                    filename: file.name,
                    resource_url: `./example_audio/${file.name}`,
                    start_time: 0,
                    end_time: audioFile.duration
                })
            }
        })
    }

    render() {
        return (
            <div>
                <span style={{ marginLeft: "70px" }}><input id="audio_file" type="file" accept=".mp3" ref={this.state.file} onChange={this.handleUpload} /></span>
                <p>Upload some mp3 files</p>
            </div>
        )
    }
}

export default connect(null, { addAudio })(MusicFileInput);