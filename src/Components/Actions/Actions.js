
import $ from 'jquery'

export const sliderPayload = {
    a: 'resize',
    b: 'resize', 
    c: 'dragleave',
    d: 'keydown',
    e: 'keydown',
}


export function windowListeners(payload, a, b, c, d, e) {
    window.addEventListener(payload.a, a)
    window.addEventListener(payload.b, b)
    window.addEventListener(payload.c, c)
    window.addEventListener(payload.d, d)
    window.addEventListener(payload.e, e)
}