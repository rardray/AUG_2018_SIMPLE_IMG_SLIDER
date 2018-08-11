import React, { Component } from 'react';
import '../StyleSheets/App.css';
import Slider from './Slider'
import '../StyleSheets/App.css'
import $ from 'jquery';
import {windowListeners} from './Actions/Actions'

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
       <Slider/>
       </div>
    );
  }
}

export default App;
