import React, { Component } from 'react';

class Input extends Component {
    constructor(props) {
        super(props)
        this.state = {author: '', message: ''}
    }
    handleChange = (e) => {
        const target = e.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]:  value
        })
        console.log(this.state)
    }

    handleSubmit = e => {
        if(!this.state.author || !this.state.message) {
            return
        }
        e.preventDefault()
        const { author, message } = this.state
        this.props.handleComment(author, message)
        this.setState({message: ''})
    }
    render() {
        return (
            <div className = 'card-footer'>
                <input 
                    name = 'author' 
                    type = 'text' 
                    placeholder = 'author' 
                    className= 'form-control' 
                    value = {this.state.author} 
                    onChange = {this.handleChange}/>
                    <br/>
                <input 
                    name = 'message' 
                    value = {this.state.message} 
                    onChange = {this.handleChange} 
                    type = 'text' 
                    placeholder = 'message' 
                    className = 'form-control'/>
                    <br/>
                <button onClick = {this.handleSubmit} className = 'btn btn-primary form-control'>Send</button>
            </div>
        )
    }
}
export default Input