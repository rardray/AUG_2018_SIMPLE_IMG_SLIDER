import React, { Component } from 'react';
import '../StyleSheets/App.css';
import Slider from './Slider'
import '../StyleSheets/App.css'
import $ from 'jquery';

class App extends Component {
  render() {
    return (
      <div className = 'App'>
       <Slider/>
       </div>
    );
  }
}

export default App;
