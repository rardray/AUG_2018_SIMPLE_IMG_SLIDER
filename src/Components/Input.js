import React, { Component } from 'react';

const url = 'login'
const payload = (data) => {
    return {user: data}
}
class Input extends Component {
    constructor(props) {
        super(props)
        this.state = {email: '', password: ''}
    }
   
    handleChange = (e) => {
        const target = e.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]:  value
        })
    }

    handleSubmit = e => {
        if(!this.state.email || !this.state.password) {
            return
        }
        e.preventDefault()
        const { email, password } = this.state
        this.props.loginUser(this.state, url, payload)
    }
    render() {
        return (
            <div className = 'card-footer'>
                <input 
                    name = 'email' 
                    type = 'text' 
                    placeholder = 'email' 
                    className= 'form-control' 
                    value = {this.state.email} 
                    onChange = {this.handleChange}/>
                    <br/>
                <input 
                    name = 'password' 
                    value = {this.state.password} 
                    onChange = {this.handleChange} 
                    type = 'password' 
                    placeholder = 'password' 
                    className = 'form-control'/>
                    <br/>
                <button onClick = {this.handleSubmit} className = 'btn btn-primary form-control'>Send</button>
            </div>
        )
    }
}
export default Input