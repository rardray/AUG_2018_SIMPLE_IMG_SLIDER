import React, {Component} from 'react';
import Input from './Input'


class Login extends Component {
 
    render() {
       const {title} = this.props
        return (
            
            <div className = 'containter' 
                    style = {{ 
                        justifyContent: 'center', 
                        textAlign: 'center', 
                        display: 'inline-block', 
                        width: '100%', 
                        position: 'fixed', 
                        left:'35%', 
                        right: '20%', 
                        top: '20%',
                        
                        }}>
                <div className = 'row' >
                    <div className = 'col-4' >
                        <div className = 'card' >
                            <div className = 'card-body'>
                                <div className = 'card-title'>{title}</div>
                                    <hr/>
                                        <div className = 'messages'>
                                        </div>
                                    </div>
                                   {this.props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                )
    }
}

export default Login;