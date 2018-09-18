import React from 'react';
import '../StyleSheets/style.css';

const ImagePreview = props => {
    return (
        <div className = 'preview-containeri'>
            <img  src = {props.photos}  alt = {`${props.photos}`} className = 'image-preview'/>
        </div>
    )
};

export default ImagePreview;