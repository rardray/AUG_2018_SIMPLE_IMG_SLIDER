import React, { Component } from 'react';

const url = 'register'
const payload = (data) => {
    return {authorized: true, user: data}
}
class RegisterInput extends Component {
    constructor(props) {
        super(props)
        this.state = {firstName: '', lastName: '', email: '', password: '', profileImage: 'http://localhost:3001/public/default.jpg', about: ''}
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
        this.props.loginUser(this.state, url, payload)
    }
    render() {
        return (
            <div className = 'card-footer'>
                <input 
                    name = 'firstName' 
                    type = 'text' 
                    placeholder = 'First Name' 
                    className= 'form-control' 
                    value = {this.state.firstName} 
                    onChange = {this.handleChange}/>
                    <br/>
                <input 
                    name = 'lastName' 
                    value = {this.state.lastName} 
                    onChange = {this.handleChange} 
                    type = 'text' 
                    placeholder = 'Last Name' 
                    className = 'form-control'/>
                    <br/>
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
                <button onClick = {this.handleSubmit} className = 'btn btn-primary form-control'>Register</button>
            </div>
        )
    }
}
export default RegisterInput