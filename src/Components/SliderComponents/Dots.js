import React from 'react';
import '../style.css';

const Dots = (props) => {
    const {index, currentIndex, resetValues } = props
    const highlightDots = () => {
        if(currentIndex === index) {
            return true
        } else {
            return false
        }
    }
    const first = () => {
        if(index === 0) {
            return true
        }
        return false
    }
    return (
        <div 
            className = {highlightDots() ? 'hdots' : 'dots'} 
            name = {index} 
            onClick = { first() ? resetValues : '' } >
          <p>{index}</p>
        </div>
    )
}

export default Dots;