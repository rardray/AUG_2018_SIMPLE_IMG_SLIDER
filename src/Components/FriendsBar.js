import React from 'react';

const FriendsBar = props => {
    return (
        <div style = {{display: 'inline-block'}}>
        <img onClick = {props.handleClick} src = {props.profileImage} className = 'friends-photo' />
        <div  style = {{textAlign: 'left', display: 'inline-block'}}>
        
            <p className = 'friends-type'>{props.name}</p>
            <p className = 'friends-type'>{props.email}</p>
            </div>
            </div>
    )
};

export default FriendsBar;