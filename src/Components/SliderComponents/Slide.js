import React from 'react';
import DSC_0025 from './images/DSC_0025.JPG'
//import './Slide.css'
import '../style.css'


const Slide = (  {image}  ) => {
    console.log(image)
    const styles = {
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: "50% 60%",
        width: '100%',
        justifyContent: 'center'
    }
    return (
        <div className =  'slide' style = {styles} >
        <img style = {{ width: '50%', height: 'auto', dislpay: 'inline-block', padding: 'auto',margin: 'auto'}} src={require('./images/' + image + '.JPG')} />
        </div>
    )
}

export default Slide