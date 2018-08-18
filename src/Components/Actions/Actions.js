import axios from 'axios';

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

//urls
//export const API_URL = 'http://192.168.0.3:3001'
export const API_URL = 'http://localhost:3001'
export const PHOTO_URL = '/public/images'

export function getAlbums(id) {
    return '/albums/one/' + id }

export function listAlbums(id) {
    return '/albums/' + id
}
export const postAlbums = '/albums'
   
//post request payloads

export const abPostPayload = (data, id) => {
   return  {collectionId: id, title: data.title, photos: data.photos}
}
//setState payloads
export const albumsPayload = (value) => { 
    return {
        images: value.photos
    }
}

export const albumListPayload = (value) => {
    return {
        albums: value
    }
}
//push
export function albumPush(value) {
    this.props.history.push('/album/' + value)
}
//error handler
export function errorHandler(data, status, history) {
    if(status === 401) {
        alert(`${data}`)
        return history.push('/login')
    }
    if (status === 404 ) {
        return history.push('/404')
    }
    return alert(`${data}`)
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
    
    .catch(err => {
        let data = err.response.data
        let status = err.response.status
        errorHandler(data, status, this.props.history)
    })
}

export function getRequests(url, payload, token){
    let data = {}
    axios.get(`${API_URL}${url}`, {
        headers: {Authorization: token}
    }).then(res => {
        data = res.data
        this.setState(payload(data))

        console.log(data)
    })
    .catch(err  => {
        let data = err.response.data
        let status = err.response.status
        errorHandler(data, status, this.props.history)
    })
}
export function postRequests(url, payload, header, action) {
    let data = {}
    axios.post(`${API_URL}${url}`, payload, {
    headers: { Authorization: header }
    }).then(res => {
    data = res.data
    action(data)
    console.log(data)
})
.catch(err => {
    data = err.data
    console.log(data)
})
}