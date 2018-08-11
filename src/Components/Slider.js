import React, { Component } from 'react';
import Slide from './SliderComponents/Slide'
import RightArrow from './SliderComponents/RightArrow';
import LeftArrow from './SliderComponents/LeftArrow';
import './style.css'
import $ from 'jquery'
import Dots from './SliderComponents/Dots'
import SlideShow from './SlideShow'
import {windowListeners, sliderPayload } from './Actions/Actions';

class Slider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            images: ['DSC_0119', 'DSC_0026', 'DSC_0124', 'DSC_0131', 'DSC_0130', 'DSC_0129', 'DSC_0128', 'DSC_0105'],
            currentIndex: 0,
            translateValue: 0,
            width: '',
            height: ''
    }
        this.setSlideshow = ''
        this.windowListeners = windowListeners.bind(this)
}
   
    componentWillMount() {
        this.adjustHeight()
    }

    componentDidMount() {
        this.windowListeners(
            sliderPayload, 
            this.adjustHeight, 
            this.resetValues, 
            this.nextSlide, 
            this.keyRight, 
            this.keyLeft)
     
    }

    componentWillUnmount() {
        this.stopSlideShow()
    }

    adjustHeight = () => {
        this.setState({width: $(window).width(), height: $(window).height() })
    }
    nextSlide = () => {
        if(this.state.currentIndex === this.state.images.length -1) { //<--- returns to beginning of slide if at last slide
            return this.resetValues()
        }
        this.setState(prevState => ({
            currentIndex: prevState.currentIndex + 1,
            translateValue: prevState.translateValue + - (this.slideWidth())
        }))
    }
    prevSlide = () => {
        if(this.state.currentIndex === 0) {
            return this.setState({
                currentIndex: this.state.images.length -1,
                translateValue: (this.state.images.length -1) * -(this.slideWidth())
            })
        }
        this.setState(prevState => ({
            currentIndex: prevState.currentIndex -1,
            translateValue: prevState.translateValue - -(this.slideWidth())
        }))
    }
    startSlideShow = () => {
        this.setSlideshow = setInterval(()=>
            this.nextSlide(), 
            5000
        )
        console.log('was activated')
    }
    stopSlideShow = () => {
        clearInterval(this.setSlideshow)
    }
    resetValues = () => {
        this.setState({currentIndex: 0, translateValue: 0})
    }
    slideWidth = () => {
        return document.querySelector('.slide').clientWidth //<--- finds width of class 'slide'
    }
    //key listeners
    keyRight = (e) => {
        if(e.keyCode === 39) {
            return this.nextSlide()
        }
    }
    keyLeft = (e) => {
        if(e.keyCode === 37) {
            return this.prevSlide()
        }
    }
    render() {
        const pictureWrap = () => {
            if(  this.state.width < this.state.height) {
                return '95%'
            } else if (this.state.width < 1000) {
                return '80%'
            } else {
                return "60%"
            }
        }
        return (
            <div className= "slider">
                <SlideShow startSlideShow = {this.startSlideShow} stopSlideShow = {this.stopSlideShow}/>
            <div className = 'slider-wrapper' style = {{
                transform: `translateX(${this.state.translateValue}px)`, //<--- moves div to right by calculating previous width.
                transition: 'transform ease-out 0.45s' }} >
            {this.state.images.map((el, i) => {
                return (
                    <Slide key = {i} image = {el} flex = {pictureWrap()} />
                )
            })}
            </div>
                 <LeftArrow prevSlide = { this.prevSlide } />
            {this.state.images.map((el, i) => {
                return (
                    <Dots key = {i} index = {i} currentIndex = {this.state.currentIndex} resetValues = {this.resetValues} />
                )
            })}
            <RightArrow nextSlide = { this.nextSlide } />

            </div>
        )
    }
}

export default Slider