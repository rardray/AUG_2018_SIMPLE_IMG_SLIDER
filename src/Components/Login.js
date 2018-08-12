import React, {Component} from 'react';
import Input from './Input'


class Login extends Component {
    state = {
        email: '',
        password: '',
    }
        
    render() {
        return (
            <div className = 'containter'>
                <div className = 'row'>
                    <div className = 'col-4'>
                        <div className = 'card' >
                            <div className = 'card-body'>
                                <div className = 'card-title'>Login</div>
                                    <hr/>
                                        <div className = 'messages'>
                                        </div>
                                    </div>
                                   <Input loginUser = {this.props.loginUser}/>
                                </div>
                            </div>
                        </div>
                    </div>
                )
    }
}

export default Login;