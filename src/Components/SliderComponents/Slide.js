import React from 'react';
import '../../StyleSheets/style.css';


const Slide = (  props ) => {
    const styles = {
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: "50% 60%",
        width: '100%',
        justifyContent: 'center'
    };
    return (
        <div className =  'slide' 
            style = {styles} >
        <img style = 
            { props.flex} src={props.image}
            alt = {props.image}
            onClick = {props.handleClick} />
        </div>
    )
};

export default Slide;