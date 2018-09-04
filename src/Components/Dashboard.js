import React, {Component} from 'react';
import { getRequests, 
        albumListPayload, 
        listAlbums, 
        albumScrollPayload, 
        actionPayload, 
        windowListeners, 
        putRequests,
        putImage,
        authHeader,
        postRequests,
        UPLOAD,
        imageHeader,
        setProfileImage,
        API_URL,
        PHOTO_URL} from './Actions/Actions'
import Albums from './Albums'
import '../StyleSheets/style.css';
import AlbumsBar from './AlbumsBar';
import Dots from './SliderComponents/Dots';
import Profile from './Profile';
import ImageCompressor from 'image-compressor.js';
import $ from 'jquery';
import PhotoPreview from './PhotoPreview';
const height = function() {return $(window).height()}
const width = function() { return $(window).width()}
class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {albums: [], width: '', translate: 0, index: 0, user: [], preview: '', togglePreview: false }
        this.getRequests = getRequests.bind(this)
        this.postRequests = postRequests.bind(this)
        this.setProfileImage = setProfileImage.bind(this)
    }

    componentDidMount() {
        const { token, user } = this.props
        this.setState({loading: true, user: user})
        this.getRequests(listAlbums(user._id), albumListPayload, token)
        windowListeners(albumScrollPayload, actionPayload(this.keyRight, this.keyLeft), window.addEventListener)
       
    }
    componentWillUnmount() {
        windowListeners(albumScrollPayload, actionPayload(this.keyRight, this.keyLeft), window.removeEventListener)
    }
    selectAlbum = (id, e) => {
        e.preventDefault()
        this.props.history.push(`/album/${id}`)
        console.log(this.state.albums)
    }
    scrollAlbumRight = () => {
        const { index, albums } = this.state
        if(index === albums.length -1) {
            return
        }
        this.setState(prevState => {
            return {index: prevState.index + 1, translate: prevState.translate + -(345)}
        })
    }
    scrollAlbumLeft = () => {
        const { index } = this.state
        if (index === 0 ) {
            return 
        }
        this.setState(prevState => {
            return {index: prevState.index -1, translate: prevState.translate - -(345)}
        })
    }
    keyRight = (e) => {
        if(e.keyCode === 39) {
            return this.scrollAlbumRight()
        }
    }
    keyLeft = (e) => {
        if(e.keyCode === 37) {
            return this.scrollAlbumLeft()
        }
    }
    cancelPreview = (e) => {
        e.preventDefault()
        this.setState({togglePreview: !this.state.togglePreview})
    }
    setPreview = (data) => {
        this.setState({preview: data, togglePreview: !this.state.togglePreview})
    }

    handleDrop = files => {
        const postRequests = this.postRequests;
        const setProfileImage = this.setProfileImage
        const token = this.props.token
        const id = this.state.user._id
        const setPreview = this.setPreview
        new ImageCompressor(files[0], {
            quality: .5,
            maxwidth: 1000,
            maxHeight: 1000,
            success(result) {
                const formData = new FormData()
                formData.append('file', result)
                formData.append('filename', result.name)
                return postRequests(UPLOAD, formData, imageHeader, setPreview)
            }
        } )
    }

    componentDidUpdate() {
        console.log(this.state.user)
        console.log(height())
        console.log(this.props.windowHeight)
    }
    render() {
        const {windowHeight, cancelPreview} = this.props 
        const {translate, user, togglePreview, preview} = this.state
            return(
                <div >
                {togglePreview ? <PhotoPreview 
                    preview = {preview} 
                    togglePreview = {togglePreview} 
                    windowHeight = {windowHeight}
                    cancelPreview = {this.cancelPreview} /> : null }
                    <Profile handleDrop = {this.handleDrop} user = {user} />
                <div style = {{
                        position: 'absolute', 
                        bottom: 0,  
                        width: '100%'}}>
                <AlbumsBar/>
                <div style = {{overflow: 'scroll', whiteSpace: 'nowrap'}}>
                    <div style = {{ 
                        transform: `translateX(${translate}px`,
                        transition: 'transform ease-out 0.45s',
                        zIndex: -1}}>
                         <div>{this.state.albums.map((el, i) => {
                            return <Albums
                                loading = {this.state.loading} 
                                key = {i} 
                                photo = {el.photos} 
                                profile = {el.collectionId.profile} 
                                title = { el.collectionTitle } 
                                handleClick = {this.selectAlbum.bind(this, el._id)} 
                                width = {this.state.width}
                                date = {el.createdAt}/>
                            })}
                        </div>
                     </div>
                     </div>
                <div style = {{transform: 'translateY(-270px)', zIndex: 5, height: 0 }}>
                    {this.state.albums.map((el, i) => {
                        return (
                         <Dots key = {i} index = {i} currentIndex = {this.state.index}  />
                        )
                     })}
                </div>
            </div>
            </div>
        )
    }
}

export default Dashboard