import React from 'react';
import {API_URL} from './Actions/Actions';
import {PHOTO_URL} from './Actions/Actions';
const PhotoPreview = (props) => {
   const {windowHeight, preview, cancelPreview } = props
    return (
    <div style = {{width: '100%', backgroundColor: 'rgba(50, 50, 50, .75)', height: windowHeight,  zIndex: 7, position: 'absolute', top: 0, display: 'block', paddingTop: 20}}><div className = 'preview-container' onM >
                    <img className = 'preview' src = {`${API_URL}${PHOTO_URL}${preview}`}/>
                    <button onClick = { cancelPreview} >discard</button><button>Update Profile Picture</button>
                    </div>
                        <div  onClick = {cancelPreview} style = {{height: '100%', width: '100%'}}>
                        </div>
                    </div>)
}

export default PhotoPreview;