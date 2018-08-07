import React from 'react';
import DSC_0025 from './images/DSC_0025.JPG'
//import './Slide.css'
import '../style.css'
import $ from 'jquery'


const Slide = (  props ) => {
    console.log(props.image)
    const styles = {
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: "50% 60%",
        width: '100%',
        justifyContent: 'center'
    }
    return (
        <div className =  'slide' style = {styles} >
        <img style = {{ width: props.flex, height: 'auto', dislpay: 'inline-block', padding: 20, verticalAlign: 'center', margin: 'auto'}} src={require('./images/' + props.image + '.JPG')} />
        </div>
    )
}

export default Slide