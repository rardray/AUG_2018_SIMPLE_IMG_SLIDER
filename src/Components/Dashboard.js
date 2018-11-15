import React, {Component} from 'react';
import { getRequests, 
        albumListPayload, 
        listAlbums, 
        albumScrollPayload, 
        actionPayload, 
        windowListeners, 
        putRequests,
        putImage,
        postRequests,
        UPLOAD,
        imageHeader,
        getUsersPayload,
        setProfileImage,
        API_URL,
        PHOTO_URL,
        setFollowing} from './Actions/Actions';
import Albums from './Albums';
import '../StyleSheets/style.css';
import AlbumsBar from './AlbumsBar';
import Dots from './SliderComponents/Dots';
import Profile from './Profile';
import ImageCompressor from 'image-compressor.js';
import PhotoPreview from './PhotoPreview';
import axios from 'axios';
import FriendsBar from './FriendsBar';


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            albums: [], 
            width: '', 
            translate: 0, 
            index: 0, 
            user: [], 
            preview: '', 
            togglePreview: false, 
            friends: [], 
            following: [], 
            followers: [] 
        };
        this.getRequests = getRequests.bind(this);
        this.postRequests = postRequests.bind(this);
        this.setProfileImage = setProfileImage.bind(this);
        this.putRequests = putRequests.bind(this);
        this.setFollowing = setFollowing.bind(this);
    }

    componentDidMount() {
        const { token, user } = this.props;
        this.setState({loading: true, user: user, following: user.following.length, followers: user.followers.length});
        this.getRequests(listAlbums(user._id), albumListPayload, token);
        this.getRequests('/profile/all/' + user._id, getUsersPayload, token );
        windowListeners(albumScrollPayload, actionPayload(this.keyRight, this.keyLeft), window.addEventListener);
    };
    componentWillUnmount() {
        windowListeners(albumScrollPayload, actionPayload(this.keyRight, this.keyLeft), window.removeEventListener);
        this.props.updateUser(this.state.user);
    };

    selectAlbum = (id, e) => {
        e.preventDefault();
        this.props.history.push(`/album/${id}`);
    };

    scrollAlbumRight = () => {
        const { index, albums } = this.state;
        if(index === albums.length -1) {
            return
        };
        this.setState(prevState => {
            return {index: prevState.index + 1, translate: prevState.translate + -(345)}
        });
    };

    scrollAlbumLeft = () => {
        const { index } = this.state;
        if (index === 0 ) {
            return 
        };
        this.setState(prevState => {
            return {index: prevState.index -1, translate: prevState.translate - -(345)}
        });
    };

    keyRight = (e) => {
        if(e.keyCode === 39) {
            return this.scrollAlbumRight()
        };
    };

    keyLeft = (e) => {
        if(e.keyCode === 37) {
            return this.scrollAlbumLeft()
        };
    };

    cancelPreview = (e) => {
        e.preventDefault();
        const id = this.state.preview;
        const { token } = this.props;
        console.log(id);
        axios.delete(`http://localhost:3001/delete`, {
            data: {id}
        } , {
        }).catch(err => err);
        this.setState({togglePreview: !this.state.togglePreview});
    };
    setPreview = (data) => {
        this.setState({preview: data, togglePreview: !this.state.togglePreview});
    };

    handleDrop = files => {
        const postRequests = this.postRequests;
        const setPreview = this.setPreview;
        const id = this.state.user._id;
        const pid = 'profileimage';
        new ImageCompressor(files[0], {
            quality: .5,
            maxwidth: 1000,
            maxHeight: 1000,
            success(result) {
                const formData = new FormData();
                formData.append('file', result);
                formData.append('filename', result.name.replace(/ /g, '_'));
                return postRequests(UPLOAD(id, pid), formData, imageHeader, setPreview)
            }
        });
    };
    changeProfileImage = () => {
        const {token} = this.props;
        const id = this.state.user._id;
        this.putRequests(putImage(id), {profileImage: this.state.preview}, {Authorization: token}, this.setProfileImage);
 }
    followUser = (id, e) => {
        e.preventDefault();
        const {token} = this.props;
        const { _id } = this.state.user;
        if (this.state.user.following.includes(`${id}`)) {
            return
        };
        this.putRequests(`/profile/following/${_id}`, {id: id}, {Authorization: token}, this.setFollowing);
    }

    render() {
        const {windowHeight} = this.props ;
        const {translate, user, togglePreview, preview, following, followers} = this.state;
            return(
                <div >
                {togglePreview ? <PhotoPreview 
                    preview = {preview} 
                    togglePreview = {togglePreview} 
                    windowHeight = {windowHeight}
                    cancelPreview = {this.cancelPreview}
                    submit = {this.changeProfileImage}
                    b1 = 'Discard'
                    b2 = 'Update Profile Image' /> : null }
                    <Profile followers = {followers} following = {following} handleDrop = {this.handleDrop} user = {user} />
                    {this.state.friends.slice(0,3).map((el, i) => {
                        return <FriendsBar
                            key = {i}
                            name = {el.name}
                            email = {el.email} 
                            profileImage = {`${API_URL}${PHOTO_URL}${el.profileImage}`}
                            handleClick = {this.followUser.bind(this, el.id)}/>
                    })}
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
};

export default Dashboard;