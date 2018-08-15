import React from 'react'
import '../StyleSheets/style.css'
const ImagePreview = props => {
    return (
        <div className = 'preview-container'>
            <img src = {props.photos}  className = 'image-preview'/>
        </div>
    )
}

export default ImagePreview;