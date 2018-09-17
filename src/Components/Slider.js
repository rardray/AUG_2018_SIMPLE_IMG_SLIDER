import React, { Component } from 'react';
import Slide from './SliderComponents/Slide'
import RightArrow from './SliderComponents/RightArrow';
import LeftArrow from './SliderComponents/LeftArrow';
import '../StyleSheets/style.css';
import $ from 'jquery';
import Dots from './SliderComponents/Dots';
import SlideShow from './SlideShow';
import {
        windowListeners, 
        removeImage, 
        sliderPayload, 
        actionPayload, 
        getRequests, 
        getAlbums, 
        albumsPayload, 
        PHOTO_URL, 
        putRequests 
    } from './Actions/Actions';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import {API_URL} from './Actions/Actions';
import Progress from './Progress';
import PhotoPreview from './PhotoPreview';
import axios from 'axios'

class Slider extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };
      constructor(props) {
        super(props);
        this.state = {
            title: '',
            images: [],
            currentIndex: 0,
            translateValue: 0,
            width: '',
            height: '',
            loading: false,
            togglePreview: false
    };
        this.setSlideshow = '';
        this.windowListeners = windowListeners.bind(this);
        this.getRequests = getRequests.bind(this);
        this.putRequests = putRequests.bind(this);
        this.removeImage = removeImage.bind(this);
};
   
    componentWillMount() {
        this.adjustHeight();
    };
    
    async setLoader() {return this.setState({loading: true})};

    componentDidMount() {
        this.setLoader().then(()=> {
        const { cookies } = this.props;
        const id = this.props.match.params.id;
        this.getRequests(getAlbums(id), albumsPayload, cookies.get('token'));
        });
        this.windowListeners(
            sliderPayload, actionPayload(
            this.adjustHeight, 
            this.resetValues, 
            this.nextSlide, 
            this.keyRight, 
            this.keyLeft),
            window.addEventListener);
    };

    componentWillUnmount() {
        this.stopSlideShow();
        this.windowListeners(
            sliderPayload,
            actionPayload(
            this.adjustHeight, 
            this.resetValues, 
            this.nextSlide, 
            this.keyRight, 
            this.keyLeft),
            window.removeEventListener);
    };

    adjustHeight = () => {
        this.setState({width: $(window).width(), height: $(window).height() });
    };
    nextSlide = () => {
        if(this.state.currentIndex === this.state.images.length -1) { //<--- returns to beginning of slide if at last slide
            return this.resetValues();
        };
        this.setState(prevState => ({
            currentIndex: prevState.currentIndex + 1,
            translateValue: prevState.translateValue + - (this.slideWidth())
        }));
    };
    prevSlide = () => {
        if(this.state.currentIndex === 0) {
            return this.setState({
                currentIndex: this.state.images.length -1,
                translateValue: (this.state.images.length -1) * -(this.slideWidth())
            });
        };
        this.setState(prevState => ({
            currentIndex: prevState.currentIndex -1,
            translateValue: prevState.translateValue - -(this.slideWidth())
        }));
    };
    startSlideShow = () => {
        this.setSlideshow = setInterval(()=>
            this.nextSlide(), 
            5000
        );
    };
    stopSlideShow = () => {
        clearInterval(this.setSlideshow)
    };
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
        };
    };
    keyLeft = (e) => {
        if(e.keyCode === 37) {
            return this.prevSlide()
        };
    };
    editImage = (e) => {
        e.preventDefault()
        this.setState({togglePreview: !this.state.togglePreview})
    };

    deletePhoto = (e) => {
        e.preventDefault();
        const {cookies} = this.props;
        const id = this.props.match.params.id;
        const url = '/albums/change/' + id;
        console.log(id);
        const value = this.state.images.filter(el => {
            return el  !== this.state.images[this.state.currentIndex]
        });
        console.log(value);
        axios.delete(`http://localhost:3001/delete`, 
            {data: {id: this.state.images[this.state.currentIndex]}});
            this.putRequests(url, {photos: value}, {Authorization: cookies.get('token')}, this.removeImage)
    };
    deleteAlbum = () => {
        const { cookies, user } = this.props;
        const id = this.props.match.params.id;
        axios.delete('http://localhost:3001/albums/delete/' + id, {
            headers: {'Authorization' : cookies.get('token')}
        }).then(()=> axios.delete('http://localhost:3001/delete', {
            data: {id: `/${user._id}/${this.state.title}`}
        } )).then(() => this.props.history.push('/dashboard'));
    };
    render() {
        const {loading, togglePreview} = this.state;
        const pictureWrap = () => {
            if(  this.state.width < this.state.height) {
                return {height: 'auto',
                        width: '100%'};
            } else {
                return {height: $(window).height() * .8,
                        width: 'auto'}
            };
        };
        return (
            <div>
            {togglePreview ? <PhotoPreview
                                b1 = 'Cancel' 
                                b2 = 'Delete Photo' 
                                cancelPreview = {this.editImage} 
                                preview = {this.state.images[this.state.currentIndex]} 
                                windowHeight = {$(window).height()}
                                submit = {this.deletePhoto.bind(this)} /> : null }
            <div className= "slider">
             
                <SlideShow startSlideShow = {this.startSlideShow} stopSlideShow = {this.stopSlideShow}/>
            <div className = 'slider-wrapper' style = {{
                transform: `translateX(${this.state.translateValue}px)`, //<--- moves div to right by calculating previous width.
                transition: 'transform ease-out 0.45s' }} >
                <div className = {loading ? 'loader-visible' : 'loader-hidden'}><Progress/> </div> 
            {this.state.images.map((el, i) => {
                return (
                    <Slide key = {i} image = {`${API_URL}${PHOTO_URL}${el}`} flex = {pictureWrap()} handleClick = {this.editImage.bind(this)} />

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
            <button onClick = {this.deleteAlbum} className = 'btn btn-primary form-control'>Delete</button>
            </div>
        )
    }
};

export default withCookies(Slider);