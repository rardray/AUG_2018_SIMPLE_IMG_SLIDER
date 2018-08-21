import React from 'react';
import '../StyleSheets/App.css'
import { NavLink, withRouter } from 'react-router-dom';
  import Logout from './LoginComponents/Logout'
  import HomeIcon from './HomeIcon'
  

const NavBar = (props) => {
    const {authorized, cookies, clearInfo, firstName, lastName, history } = props
    return (
<div className = 'nav-bar' >{authorized ? 
    <div>
        <HomeIcon history = {history} />
        <NavLink  
            className= 'nav-link' 
            exact to = '/upload' >
            New Photo Album
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