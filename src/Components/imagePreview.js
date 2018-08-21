import React from 'react'
import '../StyleSheets/style.css'
import Progress from './Progress'
import Loader from './Loader'

const ImagePreview = props => {
    return (
        <div className = 'preview-container'>
            <img  src = {props.photos}  className = 'image-preview'/>
        </div>
    )
}

export default ImagePreview;