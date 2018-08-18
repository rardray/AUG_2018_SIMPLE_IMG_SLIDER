import React, {Component} from 'react';
import { getRequests, 
        albumListPayload, 
        listAlbums, 
        albumScrollPayload, 
        actionPayload, 
        windowListeners } from './Actions/Actions'
import Albums from './Albums'
import '../StyleSheets/style.css';
import AlbumsBar from './AlbumsBar'
import Dots from './SliderComponents/Dots'

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {albums: [], width: '', translate: 0, index: 0}
        this.getRequests = getRequests.bind(this)
    }

    componentDidMount() {
        const { token, user } = this.props
        this.getRequests(listAlbums(user._id), albumListPayload, token)
        windowListeners(albumScrollPayload, actionPayload(this.keyRight, this.keyLeft), window.addEventListener)
    }
    componentWillUnmount() {
        windowListeners(albumScrollPayload, actionPayload(this.keyRight, this.keyLeft), window.removeEventListener)
    }
    selectAlbum = (id, e) => {
        e.preventDefault()
        this.props.history.push(`/album/${id}`)
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

    render() {
        const {translate} = this.state
            return(
                <div style = {{
                        position: 'absolute', 
                        bottom: 0, 
                        overflow: 'hidden', 
                        whiteSpace: 'nowrap', 
                        width: '100%'}}>
                <AlbumsBar/>
                    <div style = {{ 
                        transform: `translateX(${translate}px`,
                        transition: 'transform ease-out 0.45s',
                        zIndex: -1}}>
                         <div>{this.state.albums.map((el, i) => {
                            return <Albums 
                                key = {i} 
                                photo = {el.photos} 
                                profile = {el.collectionId.profile} 
                                title = { el.collectionTitle } 
                                handleClick = {this.selectAlbum.bind(this, el._id)} 
                                width = {this.state.width}/>
                            })}
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
        )
    }
}

export default Dashboard