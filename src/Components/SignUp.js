import React from 'react';

const SignUp = (props) => {
    const handleClick = () => {
        props.history.push('/register')
    }
    return (
        <div>
            <p style = {{cursor: 'pointer'}} onClick = {handleClick}>Sign Up</p>
        </div>
    )
}

export default SignUp