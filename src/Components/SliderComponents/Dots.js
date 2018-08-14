import React from 'react';
import '../../StyleSheets/style.css';

const Dots = (props) => {
    const {index, currentIndex, resetValues } = props
    const highlightDots = () => {
        if(currentIndex === index) {
            return 1
        } else {
            return null 
        }
    }
    const first = () => {
        if(index === 0) {
            return 1
        }
        return null
    }
    return (
        <div 
            className = {highlightDots() ? 'hdots' : 'dots'} 
            name = {index} 
            onClick = { first() ? resetValues : null } >
          <p>{index}</p>
        </div>
    )
}

export default Dots;