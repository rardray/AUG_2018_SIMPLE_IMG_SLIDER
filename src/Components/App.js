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
import { CookiesProvider } from 'react-cookie';
import Login from './Login'

class App extends Component {
  state = {
    windowHeight: null
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
       <Route exact path = '/login' component = {Login} />
       <Route exact path = '/slider' component = {Slider} />
       </div>
    );
  }
}

export default withRouter(App);
