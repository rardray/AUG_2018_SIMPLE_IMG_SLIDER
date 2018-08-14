import React from 'react'
import '../../StyleSheets/App.css'

const Logout = (props) => {
   const { cookies, clearInfo } = props
   const handleClick = ()=>{
       cookies.remove('token')
       cookies.remove('user')
       clearInfo()
   }
    return (
        <div  className = 'nav-link' onClick = {handleClick} style = {{float: 'right'}}>Log Out</div>
    )
}

export default Logout;