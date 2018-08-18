import React, {Component} from 'react';
import axios from 'axios'
import Dropzone from 'react-dropzone'
import ImagePreview from './imagePreview'
import '../StyleSheets/style.css'
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import {API_URL, PHOTO_URL, albumPush, postRequests, abPostPayload, postAlbums} from './Actions/Actions'

class Upload  extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      }
    constructor(props) {
        super(props)
        const { cookies } = props
        this.state = {
            photos: [],
            title: ''
    }
    this.postRequests = postRequests.bind(this)
    this.albumPush = albumPush.bind(this)
}

    handleDrop = files => {
        const uploaders = files.map(file => {
            const formData = new FormData()
            formData.append('file', file)
            formData.append("filename", file.name)
            return axios.post(`${API_URL}/upload`, formData, {
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
    saveAlbum = (e) => {
        e.preventDefault()
        const {cookies} = this.props
        const token = cookies.get('token')
        const value = cookies.get('user')
        const { _id } = value
        this.postRequests(postAlbums, abPostPayload(this.state, _id), token, this.albumPush )
    }

    handleChange = e => {
        this.setState({title: e.target.value})
    }
    discardAlbum = e => {
        e.preventDefault()
        this.props.history.push('/dashboard')
    }

render() {
    const { photos } = this.state
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
                {photos.map((el, i) => {
                    return (
                        <ImagePreview key = {i} photos = {`${API_URL}${PHOTO_URL}${el}`} />
                    )

                })}
                
                </Dropzone><br/>
                {photos.length > 0 ? <div><button onClick = {this.saveAlbum} >Save Album</button> <button onClick = {this.discardAlbum}>Discard</button></div> : null}
        </div>

    )
}}

export default withCookies(Upload)

