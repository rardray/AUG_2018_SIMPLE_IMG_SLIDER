import axios from 'axios';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { CookiesProvider } from 'react-cookie';
import $ from 'jquery'

export const sliderPayload = {
    a: 'resize',
    b: 'resize', 
    c: 'dragleave',
    d: 'keydown',
    e: 'keydown',
}

const API_URL = 'http://localhost:3001'
const url = 'login'


export function windowListeners(payload, a, b, c, d, e) {
    window.addEventListener(payload.a, a)
    window.addEventListener(payload.b, b)
    window.addEventListener(payload.c, c)
    window.addEventListener(payload.d, d)
    window.addEventListener(payload.e, e)
}

// AJAX requests

export function loginUser(data, url, value){
    const { cookies } = this.props
    let resData = {}
    axios.post(`${API_URL}/auth/${url}`, data )
    .then(response => {
        cookies.set('token', response.data.token, {path: '/'})
        cookies.set('user',response.data.user, {path: '/'})
        resData = response.data.user 
        this.setState(value(resData))
        this.props.history.push('/dashboard')
      
    })
    
    .catch(err => err)
}