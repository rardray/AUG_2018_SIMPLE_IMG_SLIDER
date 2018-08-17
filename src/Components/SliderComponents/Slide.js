import React from 'react';
import '../../StyleSheets/style.css'
import $ from 'jquery'


const Slide = (  props ) => {
    const styles = {
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: "50% 60%",
        width: '100%',
        justifyContent: 'center'
    }
    const height = $(window).height() * .9
    return (
        <div className =  'slide' 
            style = {styles} >
        <img style = 
            { props.flex} src={props.image}
            alt = {props.image} />
        </div>
    )
}

export default Slide