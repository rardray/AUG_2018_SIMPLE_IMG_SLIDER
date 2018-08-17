import axios from 'axios';

export const sliderPayload = [
     'resize',
     'resize', 
     'dragleave',
     'keydown',
     'keydown',
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
export const API_URL = 'http://192.168.0.3:3001'

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

export function getRequests(url, payload, token){
    let data = {}
    axios.get(`${API_URL}${url}`, {
        headers: {Authorization: token}
    }).then(res => {
        data = res.data
        this.setState(payload(data))
        console.log(data)
    })
    .catch(err => err)
}
export function postRequests(url, payload, token, action) {
    let data = {}
    axios.post(`${API_URL}${url}`, payload, {
    headers: { Authorization: token }
    }).then(res => {
    data = res.data
    action(data)
    console.log(data)
})
}