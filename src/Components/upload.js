import React, {Component} from 'react';
import axios from 'axios'
import Dropzone from 'react-dropzone'
import ImagePreview from './imagePreview'
import '../StyleSheets/style.css'
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { userInfo } from 'os';

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
}

    handleDrop = files => {
        console.log('clicked')
        console.log(this.state.photos)
        const uploaders = files.map(file => {
            const formData = new FormData()
            formData.append('file', file)
            formData.append("filename", file.name)
            return axios.post('http://192.168.0.3:3001/upload', formData, {
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
        const value = cookies.get('user')
        const { _id } = value
        const {photos, title } = this.state
        const JWT = cookies.get('token')
        axios.post('http://192.168.0.3:3001/albums', {collectionId: _id, title: title, photos: photos}, {
            headers: { Authorization: cookies.get('token') }
        }  ).then(res => {
            const id = res.data
            this.props.history.push('/album/' + id)
        })
    }

    handleChange = e => {
        this.setState({title: e.target.value})
    }


render() {
    const { photos } = this.state
    return (
        <div style= {{textAlign: 'center', justifyContent: 'center', display: 'inline-block', width: '100%'}}>
            <input name = 'title' placeholder = 'enter name for phot album' value = {this.state.title} onChange = {this.handleChange.bind(this)} />
            <Dropzone
                className = 'drop-zone'
                onDrop ={this.handleDrop}
                multiple
                accept = 'image/*'
                >
                <p>Drop your files here or click to upload</p>
                {photos.map((el, i) => {
                    return (
                        <ImagePreview key = {i} photos = {el} />
                    )

                })}
                
                </Dropzone><br/>
                {photos.length > 0 ? <div><button onClick = {this.saveAlbum} >Save Album</button> <button>Discard</button></div> : null}
        </div>

    )
}}

export default withCookies(Upload)

