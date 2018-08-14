import React from 'react';
import '../style.css'
import $ from 'jquery'


const Slide = (  props ) => {
    const styles = {
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: "50% 60%",
        width: '100%',
        justifyContent: 'center'
    }
    return (
        <div className =  'slide' style = {styles} >
        <img style = 
            {{ width: props.flex, 
            height: 'auto', 
            dislpay: 'inline-block', 
            padding: 20, 
            borderRadius: 50, 
            verticalAlign: 'center', 
            margin: 'auto'}} src={props.image} />
        </div>
    )
}

export default Slide