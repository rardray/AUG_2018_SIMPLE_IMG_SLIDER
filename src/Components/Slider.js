import React, { Component } from 'react';
import Slide from './SliderComponents/Slide'
import RightArrow from './SliderComponents/RightArrow';
import LeftArrow from './SliderComponents/LeftArrow';
import '../StyleSheets/style.css'
import $ from 'jquery'
import Dots from './SliderComponents/Dots'
import SlideShow from './SlideShow'
import {windowListeners, sliderPayload, actionPayload, getRequests, getAlbums, albumsPayload, PHOTO_URL } from './Actions/Actions';
import axios from 'axios';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import {API_URL} from './Actions/Actions'
import Progress from './Progress'
class Slider extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      }
      constructor(props) {
        super(props)
        const { cookies } = props
        this.state = {
            images: [],
            currentIndex: 0,
            translateValue: 0,
            width: '',
            height: '',
            loading: false
    }
        this.setSlideshow = ''
        this.windowListeners = windowListeners.bind(this)
        this.getRequests = getRequests.bind(this)
}
   
    componentWillMount() {
        this.adjustHeight()
    }
    async setLoader() {return this.setState({loading: true})}

    componentDidMount() {
        this.setLoader().then(()=> {
        const { cookies } = this.props
        const id = this.props.match.params.id
        this.getRequests(getAlbums(id), albumsPayload, cookies.get('token'))
        })
   
        this.windowListeners(
            sliderPayload, actionPayload(
            this.adjustHeight, 
            this.resetValues, 
            this.nextSlide, 
            this.keyRight, 
            this.keyLeft),
            window.addEventListener)
     
    }

    componentWillUnmount() {
        this.stopSlideShow()
        this.windowListeners(
            sliderPayload,
            actionPayload(
            this.adjustHeight, 
            this.resetValues, 
            this.nextSlide, 
            this.keyRight, 
            this.keyLeft),
            window.removeEventListener)
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
        const {loading} = this.state
        const pictureWrap = () => {
            if(  this.state.width < this.state.height) {
                return {height: 'auto',
                        width: '100%'}
            } else {
                return {height: $(window).height() * .8,
                        width: 'auto'}
            }
        }
        return (
            <div className= "slider">
                <SlideShow startSlideShow = {this.startSlideShow} stopSlideShow = {this.stopSlideShow}/>
            <div className = 'slider-wrapper' style = {{
                transform: `translateX(${this.state.translateValue}px)`, //<--- moves div to right by calculating previous width.
                transition: 'transform ease-out 0.45s' }} >
                <div className = {loading ? 'loader-visible' : 'loader-hidden'}><Progress/> </div> 
            {this.state.images.map((el, i) => {
                return (
                    <Slide key = {i} image = {`${API_URL}${PHOTO_URL}${el}`} flex = {pictureWrap()} />
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

export default withCookies(Slider)