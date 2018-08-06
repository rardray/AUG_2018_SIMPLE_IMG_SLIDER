import React, { Component } from 'react';
import '../StyleSheets/App.css';
import Slider from './Slider'
import Image from './SliderComponents/images/DSC_0025.JPG';
import './style.css'
import '../StyleSheets/App.css'
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
