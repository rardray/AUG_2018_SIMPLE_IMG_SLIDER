import React, { Component } from 'react';
import '../StyleSheets/App.css';
import '../StyleSheets/App.css'
import $ from 'jquery';
import {windowListeners} from './Actions/Actions';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import {loginUser} from './Actions/Actions'
import NavBar from './NavBar';
import Routes from './Routes';

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  }
  constructor(props) {
    super(props)
    const { cookies } = props
    this.state = { windowHeight: null, user: cookies.get('user') || [], authorized: false }
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
    return (
      <div>
        <NavBar 
          authorized = {this.state.authorized} 
          firstName = {this.state.user.firstName} 
          lastName = {this.state.user.lastName} 
          clearInfo = {this.clearInfo} 
          cookies = {this.props.cookies}/>
      <div className = 'App' style = {{minHeight: this.state.windowHeight}}>
      <Routes loginUser = {this.loginUser} history = {this.props.history} />
       </div>
       </div>
    );
  }
}

export default withCookies(App);
