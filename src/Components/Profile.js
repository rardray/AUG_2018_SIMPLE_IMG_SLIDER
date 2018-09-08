import React from 'react';
import DropZone from 'react-dropzone';
import { API_URL, PHOTO_URL } from './Actions/Actions';


const Profile = (props) => {
   
    const {user} = props
    return(
        
        <div style = {{display: 'inline-block', position: 'absolute', left: 0, width: '15%'}}>
            <DropZone 
                className = "profile-drop"
                onDrop = {props.handleDrop}
                accept = 'image/*' 
                style = {{ backgroundImage: `url(${API_URL}${PHOTO_URL}${user.profileImage}`}}
                />
            <h5 id = 'user' name = 'user'>hi {user.firstName} {user.lastName} </h5>
            <p>{user.email}</p>
            <p>{user.info? user.info : 'no information'}</p>
        </div>
    )
}



export default Profile; 