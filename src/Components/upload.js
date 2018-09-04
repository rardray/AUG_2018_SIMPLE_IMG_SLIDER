import React, {Component} from 'react';
import axios from 'axios'
import Dropzone from 'react-dropzone'
import ImagePreview from './imagePreview'
import '../StyleSheets/style.css'
import {API_URL, PHOTO_URL, albumPush, postRequests, abPostPayload, postAlbums, UPLOAD, imageHeader, setImageState} from './Actions/Actions'
import ImageCompressor from 'image-compressor.js'
import Progress from './Progress'

class Upload  extends Component {
    constructor(props) {
        super(props)
        this.state = {
            photos: [],
            title: '',
            loading: false
            
    }

    this.postRequests = postRequests.bind(this)
    this.albumPush = albumPush.bind(this)
    this.setImageState = setImageState.bind(this)
}
    async run() { this.setState({loading: true}) }  
    handleDrop = files => {
       
        this.run().then(()=> {const  uploaders = files.map(file => {
            const postRequests = this.postRequests
            const setImageState = this.setImageState
        new ImageCompressor(file, {
            quality: .5,
            maxHeight: 1600,
            maxWidth: 1600,
            success(result) {
                const formData = new FormData()
                formData.append('file', result)
                formData.append('filename', result.name)
                return postRequests(UPLOAD, formData, imageHeader, setImageState)
                }
            })
        }
    )
        axios.all(uploaders).then(() =>{})
     })
    }
    saveAlbum = (e) => {
        e.preventDefault()
        const { user, token } = this.props
        const { _id } = user
        this.postRequests(postAlbums, abPostPayload(this.state, _id), {Authorization: token}, this.albumPush )
    }

    handleChange = e => {
        this.setState({title: e.target.value})
    }
    discardAlbum = e => {
        e.preventDefault()
        this.props.history.push('/dashboard')
    }

render() {
    const { photos, loading } = this.state
    return (
        <div style= {{textAlign: 'center', justifyContent: 'center', display: 'inline-block', width: '100%'}}>
            
            <input 
                className = 'form-control' 
                style = {{maxWidth: '40%', display: 'inline-block'}}
                name = 'title' 
                placeholder = 'enter name for photo album' 
                value = {this.state.title} 
                onChange = {this.handleChange.bind(this)} />
            <br/>
            <Dropzone
                className = 'drop-zone'
                onDrop ={this.handleDrop}
                multiple
                accept = 'image/*'
                >
                <p>Drop your files here or click to upload</p>
                 <div className = {loading ? 'loader-visible' : 'loader-hidden'}><Progress/> </div> 
                {photos.map((el, i) => {
                    return (
                    <ImagePreview  key = {i}  photos = {`${API_URL}${PHOTO_URL}${el}`} />
                    )

                })}
                
                </Dropzone><br/>
                {photos.length > 0 ? <div><button onClick = {this.saveAlbum} >Save Album</button> <button onClick = {this.discardAlbum}>Discard</button></div> : null}
        </div>

    )
}}

export default Upload
