import axios from 'axios';
/*=====================================
ACTIONS
======================================*/

export const sliderPayload = [
     'resize',
     'resize', 
     'dragleave',
     'keydown',
     'keydown',
]
export const albumScrollPayload = [
    'keydown', 'keydown'
]
export const actionPayload = function(a, b , c, d, e) {
    return [a, b, c, d, e,]
}

export function windowListeners(payload, payload2, listener) {
  for (var i = 0; i < payload.length; i++){
       listener(payload[i], payload2[i])
  }
}

/*===============================================
URLS
===============================================*/

//export const API_URL = 'http://192.168.0.3:3001'
export const API_URL = 'http://localhost:3001'
export const PHOTO_URL = '/public/images'
export function UPLOAD(id, pid) {
    return `/upload/${id}/${pid}`
}
export const postAlbums = '/albums'
export function getAlbums(id) {
    return '/albums/one/' + id }
export function listAlbums(id) {
    return '/albums/' + id
}
export function putImage(id) {
    return '/profile/' + id
}

export const DELETE_PHOTO = '/delete'

/*=================================================
HEADERS
=================================================*/

export const imageHeader = { "X-Requested-With": "XMLHttpRequest" }
export function authHeader(token) {
    return {Authorization: token}
}
/*================================================
REQUEST BODY PAYLOADS
================================================*/

export const abPostPayload = (data, id) => {
   return  {collectionId: id, title: data.title, photos: data.photos}
}
export function deletePhoto(data) {
    return {data: {data}}
}
/*================================================
SETSTATE PAYLOADS
================================================*/
export function setProfileImage(value) {
    this.setState(prevState => {
        return {user: {...prevState.user, profileImage: value.profile.profileImage}, togglePreview: !this.state.togglePreview}
    })
}


export const albumsPayload = (value) => { 
    return {
        images: value.photos, loading: false
    }
}

export const albumListPayload = (value) => {
    return {
        albums: value, loading: false
    }
}
export function setImageState(value) {
    console.log(value)
    this.setState(prevState => {
        return {photos: [...prevState.photos, value], loading: false}
    })
}
//push
export function albumPush(value) {
    this.props.history.push('/album/' + value)
}
//error handler
export function errorHandler(data, status, history, func) {
    if(status === 401) {
        alert(`${data}`)
        return history.push('/login')
    }
    if (status === 404 ) {
        return history.push('/404')
    }
    return alert(`${data}`)
}

/*=====================================================
AJAX REQUESTS
=====================================================*/

//LOGIN / REGISTER REQUESTS=========================== 

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
    
    .catch(err => {
        let data = err.response.data
        let status = err.response.status
        errorHandler(data.error, status, this.props.history)
    })
}

//GET REQUESTS <=====================================

export function getRequests(url, payload, token){
    let data = {}
    axios.get(`${API_URL}${url}`, {
        headers: {Authorization: token}
    }).then(res => {
        data = res.data
        this.setState(payload(data))
    })
    .catch(err  => {
        let data = err.response.data
        let status = err.response.status
        errorHandler(data, status, this.props.history)
    })
}

//POST REQUESTS====================================>

export function postRequests(url, payload, header, action) {
    let data = {}
    axios.post(`${API_URL}${url}`, payload, {
        headers: header
    }).then(res => {
        data = res.data
        action(data)
    })
    .catch(err => {
        let data = err.response.data
        let status = err.response.status
        errorHandler(data, status, this.props.history)
    })
}

export function putRequests(url, payload, header, action) {
    let data = {} 
    axios.put(`${API_URL}${url}`, payload, {
        headers: header
    }).then(res => {
        data = res.data
        action(data)
    })
    .catch(err => {
        let data = err.response.data
        let status = err.response.status
        errorHandler(data, status)
    })
}

export function deleteRequests(url, payload) {
    let data = {}
    axios.delete(`${API_URL}${url}`, payload, {
    })
    .catch(err => {
        let data = err.response.data
        let status = err.response.status
        errorHandler(data, status)
    })
}