import React, { Component } from 'react';
import Slide from './SliderComponents/Slide'
import RightArrow from './SliderComponents/RightArrow';
import LeftArrow from './SliderComponents/LeftArrow';
import DSC_0025 from './SliderComponents/images/DSC_0025.JPG'
import DSC_0026 from './SliderComponents/images/DSC_0026.JPG'
import './style.css'
const url = `url(./SliderComponents/images/DSC_0025.JPG)`


class Slider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            images: ['DSC_0119', 'DSC_0026', 'DSC_0124', 'DSC_0131'],
            currentIndex: 0,
            translateValue: 0
    }}
    nextSlide = () => {
        if(this.state.currentIndex === this.state.images.length -1) { //<--- returns to beginning of slide if at last slide
            return this.setState({
                currentIndex: 0,
                translateValue: 0
            })
        }
        this.setState(prevState => ({
            currentIndex: prevState.currentIndex + 1,
            translateValue: prevState.translateValue + - (this.slideWidth())
        }))
    }
    componentDidMount() {
    }
    prevSlide = () => {
        if(this.state.currentIndex === 0) {
            return this.setState({
                currentIndex: this.state.images.length -1,
                translateValue: 0
            })
        }
        this.setState(prevState => ({
            currentIndex: prevState.currentIndex -1,
            translateValue: prevState.translateValue - -(this.slideWidth())
        }))
       
    }

    slideWidth = () => {
        return document.querySelector('.slide').clientWidth //<--- finds width of class 'slide'
    }
    render() {
        return (
            <div className= "slider">
            <div className = 'slider-wrapper' style = {{
                transform: `translateX(${this.state.translateValue}px)`, //<--- moves div to right by calculating previous width.
                transition: 'transform ease-out 0.45s' }} >
            {this.state.images.map((el, i) => {
                return (
                    <Slide key = {i} image = {el} />
                )
            })}
            </div>
            <LeftArrow prevSlide = { this.prevSlide } />
            <RightArrow nextSlide = { this.nextSlide } />

            </div>
        )
    }
}

export default Slider