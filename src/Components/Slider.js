import React, { Component } from 'react';
import Slide from './SliderComponents/Slide'
import RightArrow from './SliderComponents/RightArrow';
import LeftArrow from './SliderComponents/LeftArrow';
import './style.css'
import $ from 'jquery'
import Dots from './SliderComponents/Dots'


class Slider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            images: ['DSC_0119', 'DSC_0026', 'DSC_0124', 'DSC_0131', 'DSC_0130', 'DSC_0129', 'DSC_0128'],
            currentIndex: 0,
            translateValue: 0,
            width: '',
            height: ''
    }}
    nextSlide = () => {
        if(this.state.currentIndex === this.state.images.length -1) { //<--- returns to beginning of slide if at last slide
            return this.setState({
                currentIndex: 0,
                translateValue: 0, 
            })
        }
        this.setState(prevState => ({
            currentIndex: prevState.currentIndex + 1,
            translateValue: prevState.translateValue + - (this.slideWidth())
        }))
    }
    componentWillMount() {
        this.adjustHeight()
    }

    componentDidMount() {
        window.addEventListener('resize', this.adjustHeight)
        window.addEventListener('resize', this.resetValues)
        window.addEventListener('dragleave', this.nextSlide)
        window.addEventListener('keydown', this.keyRight)
        window.addEventListener('keydown', this.keyLeft)
    }

    adjustHeight = () => {
        this.setState({width: $(window).width(), height: $(window).height() })
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
    resetValues = () => {
        this.setState({currentIndex: 0, translateValue: 0})
    }
    slideWidth = () => {
        return document.querySelector('.slide').clientWidth //<--- finds width of class 'slide'
    }
    keyRight = (e) => {
        if(e.keyCode == 39) {
            return this.nextSlide()
        }
    }
    keyLeft = (e) => {
        if(e.keyCode == 37) {
            return this.prevSlide()
        }
    }
    render() {
        const pictureWrap = () => {
            if(  this.state.width < this.state.height) {
                return '95%'
            } else  if (this.state.width < 1000) {
                return '80%'
            } else {
                return "60%"
            }
        }
        return (
            <div className= "slider">
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