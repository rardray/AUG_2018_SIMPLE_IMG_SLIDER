import React from 'react';

const RightArrow = (props) => {
    return (
        <div className = 'right-arrow' onClick = { props.nextSlide } >
        <i className = 'fa fa-arrow-right fa-2x' aria-hidden = 'true' ></i>
        </div>)
}

export default RightArrow;