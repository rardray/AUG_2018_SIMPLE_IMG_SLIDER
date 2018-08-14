import axios from 'axios';

export const sliderPayload = {
    a: 'resize',
    b: 'resize', 
    c: 'dragleave',
    d: 'keydown',
    e: 'keydown',
}

const API_URL = 'http://192.168.0.7:3001'


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
