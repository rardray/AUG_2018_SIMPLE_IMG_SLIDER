import React from 'react';
import '../StyleSheets/style.css'
const SlideShow = (props) => {
    return (
        <div>
            <h4 className = 'slideshow' onClick = { props.startSlideShow} >Start SlideShow</h4><h4 className = 'slideshow' onClick = {props.stopSlideShow}>Stop SlideShow</h4>
            </div>
    )
}

export default SlideShow