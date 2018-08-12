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

const API_URL = 'localhost:3001/'
class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  }
  constructor(props) {
    super(props)
    const { cookies } = props
    this.state = {
    windowHeight: null,
    user: cookies.get('user') || []
  }
  this.loginUser = loginUser.bind(this)
}
  


  componentWillMount() {
    this.adjustHeight()

  }
  componentDidMount(){
    windowListeners({a: 'resize'}, this.adjustHeight)
    console.log(this.state.windowHeight)
  }
  adjustHeight = () =>{
    this.setState({windowHeight: $(window).height()})
  }
  
  render() {
    return (
      <div className = 'App' style = {{minHeight: this.state.windowHeight}}>
       <Route exact path = '/login' render = {(props) => <Login {...props} loginUser = {this.loginUser} />} />
       <Route exact path = '/slider' component = {Slider} />
       </div>
    );
  }
}

export default withCookies(App);
