import React, {Component} from 'react';
import {getRequests, albumListPayload, listAlbums} from './Actions/Actions'
import axios from 'axios'
import Albums from './Albums'
import { DialogTitle } from '../../node_modules/@material-ui/core';
import '../StyleSheets/style.css'

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {albums: [], width: ''}
        this.getRequests = getRequests.bind(this)
    }

    componentDidMount() {
        const { token, user } = this.props
        this.getRequests(listAlbums(user._id), albumListPayload, token)
        
    }
    selectAlbum = (id, e) => {
        e.preventDefault()
        this.props.history.push(`/album/${id}`)
    }
    render() {
        return(
            <div>{this.state.albums.map((el, i) => {
                return <Albums key = {i} photo = {el.photos} profile = {el.collectionId.profile} title = { el.collectionTitle } handleClick = {this.selectAlbum.bind(this, el._id)} width = {this.state.width}/>
            })}</div>
        )
    }
}

export default Dashboard