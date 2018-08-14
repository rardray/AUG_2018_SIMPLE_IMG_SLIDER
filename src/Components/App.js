import React, { Component } from 'react';
import '../StyleSheets/App.css';
import Slider from './Slider'
import '../StyleSheets/App.css'
import $ from 'jquery';
import {windowListeners} from './Actions/Actions';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  withRouter
} from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Login from './Login'
import {loginUser} from './Actions/Actions'
import Input from './Input'
import RegisterInput from './RegisterInput';
import SignUp from './SignUp';
import Logout from './Logout'

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  }
  constructor(props) {
    super(props)
    const { cookies } = props
    this.state = {
    windowHeight: null,
    user: cookies.get('user') || [],
    authorized: false
  }
  this.loginUser = loginUser.bind(this)
}
   componentWillMount() {
    this.adjustHeight()

  }
  componentDidMount(){
    const {cookies} = this.props
    if(cookies.get('token')) {
      this.setState({authorized: true})
    } else {
      this.props.history.push('/login')
    }
    windowListeners({a: 'resize'}, this.adjustHeight)
  }
  adjustHeight = () =>{
    this.setState({windowHeight: $(window).height()})
  }
  clearInfo = () => {
    this.setState({authorized: false, user: ''})
    this.props.history.push('/login')
  }
  render() {
    const {cookies} = this.props
    return (
      <div>
        <div className = 'nav-bar' >{this.state.authorized ? 
          <div><NavLink  className= 'nav-link' exact to = '/upload' >Add Photos</NavLink>
            <Logout cookies = {this.props.cookies} clearInfo = {this.clearInfo}/>
            <span className = 'nav-link' style = {{float: 'right'}}>{this.state.user.firstName} {this.state.user.lastName}</span>
          </div>  : <div className = 'nav-link' onClick = {this.clearInfo} style = {{float: 'right'}}>Login</div> }</div>
      <div className = 'App' style = {{minHeight: this.state.windowHeight}}>
       <Route exact path = '/login' render = {(props) => 
          <Login {...props} title = 'Login' >
          <Input {...props} loginUser = {this.loginUser}/>
          <SignUp history = {this.props.history}/> 
          </Login>} />
       <Route exact path = '/register' render = {(props) => 
          <Login {...props} title = 'Register'>
          <RegisterInput {...props} loginUser = {this.loginUser}/> 
          </Login>} />
       <Route exact path = '/slider' component = {Slider} />
       </div>
       </div>
    );
  }
}

export default withCookies(App);
