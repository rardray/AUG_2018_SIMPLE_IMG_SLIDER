import React, {Component} from 'react';
import axios from 'axios'
import Dropzone from 'react-dropzone'
import ImagePreview from './imagePreview'
import '../StyleSheets/style.css'


class Upload  extends Component {
    constructor(props) {
        super(props)
        this.state = {
            photos: []
    }
}
    handleDrop = files => {
        console.log('clicked')
        console.log(this.state.photos)
        const uploaders = files.map(file => {
            const formData = new FormData()
            formData.append('file', file)
            formData.append("filename", file.name)
            return axios.post('http://192.168.0.7:3001/upload', formData, {
                headers: { "X-Requested-With": "XMLHttpRequest" },
            }).then(res =>   {
                const data = res.data
                const url = data.secure_url
                console.log(data)
                this.setState(prevState => {
                    return {photos: [...prevState.photos, data]}
                })
            })

        })
        axios.all(uploaders).then(() =>{})
    }


render() {
    return (
        <div style= {{textAlign: 'center', justifyContent: 'center', display: 'inline-block', width: '100%'}}>
            <Dropzone
                className = 'drop-zone'
                onDrop ={this.handleDrop}
                multiple
                accept = 'image/*'
                >
                <p>Drop your files here or click to upload</p>
                </Dropzone>
                {this.state.photos.map((el, i) => {
                    return (
                        <ImagePreview key = {i} photos = {el} />
                    )

                })}
        </div>

    )
}}

export default Upload

