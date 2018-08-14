import React from 'react';
import '../StyleSheets/App.css'
import { NavLink, withRouter } from 'react-router-dom';
  import Logout from './LoginComponents/Logout'

const NavBar = (props) => {
    const {authorized, cookies, clearInfo, firstName, lastName } = props
    return (
<div className = 'nav-bar' >{authorized ? 
    <div>
        <NavLink  
            className= 'nav-link' 
            exact to = '/upload' >
            Add Photos
        </NavLink>
      <Logout 
        cookies = {cookies} 
        clearInfo = {clearInfo}/>
      <span 
        className = 'nav-link' 
        style = {{float: 'right'}}>{firstName} {lastName}</span>
    </div>  
        : 
    <div 
        className = 'nav-link' 
        onClick = {clearInfo} 
        style = {{float: 'right'}}>Login</div> }</div>
    )
}

export default withRouter(NavBar);