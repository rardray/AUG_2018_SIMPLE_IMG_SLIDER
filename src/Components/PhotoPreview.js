import React from 'react';
import {API_URL} from './Actions/Actions';
import {PHOTO_URL} from './Actions/Actions';

const PhotoPreview = (props) => {
   const {windowHeight, preview, cancelPreview, submit } = props
    return (
    <div style = {{
            width: '100%', 
            backgroundColor: 'rgba(50, 50, 50, .75)', 
            height: windowHeight,  
            zIndex: 7, 
            position: 'absolute', 
            top: 0, 
            display: 'block', 
            paddingTop: 20}}>
        <div className = 'preview-container' >
                    <img className = 'preview' 
                        src = {`${API_URL}${PHOTO_URL}${preview}`}
                        alt = {`${preview}`}/>
                    <button onClick = { cancelPreview}
                        className = 'btn btn-primary form-control'
                        style = {{display: 'inline-block', width: '50%'}} >discard</button>
                    <button onClick = {submit} 
                        className = 'btn btn-primary form-control' style = {{display: 'inline-block', width: '50%'}}>Update Profile Picture</button>
                    </div>
                        <div  onClick = {cancelPreview} style = {{height: '100%', width: '100%'}}>
                        </div>
                    </div>)
}

export default PhotoPreview;