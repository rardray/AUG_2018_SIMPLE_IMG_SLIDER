import React from 'react';
import '../../StyleSheets/style.css';

const LeftArrow = (props) => {
    return (<div className = 'left-arrow' onClick = { props.prevSlide } >
    <i className = 'fa fa-arrow-left fa-2x' aria-hidden = 'true'></i>
     </div>)
};

export default LeftArrow;