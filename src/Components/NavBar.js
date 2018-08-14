import React from 'react';
import '../StyleSheets/App.css'

const NavBar = (props) => {
    return (
<div className = 'nav-bar' >{this.state.authorized ? 
    <div><NavLink  className= 'nav-link' exact to = '/upload' >Add Photos</NavLink>
      <Logout cookies = {this.props.cookies} clearInfo = {this.clearInfo}/>
      <span className = 'nav-link' style = {{float: 'right'}}>{this.state.user.firstName} {this.state.user.lastName}</span>
    </div>  : <div className = 'nav-link' onClick = {this.clearInfo} style = {{float: 'right'}}>Login</div> }</div>
    )
}

export default NavBar;