import React from 'react';
import '../StyleSheets/style.css'

const HomeIcon = (props) => {
    const { history } = props
    const handleClick = () => {
        return history.push('/dashboard')
    }
    return (
        <div className = 'home-icon' onClick = {handleClick}>

        </div>
    )
}

export default HomeIcon;