import React from 'react'
import '../../StyleSheets/App.css'

const Logout = (props) => {
   const { clearInfo } = props
   const handleClick = ()=>{
       clearInfo()
   }
    return (
        <div  className = 'nav-link' onClick = {handleClick} style = {{float: 'right'}}>Log Out</div>
    )
}

export default Logout;