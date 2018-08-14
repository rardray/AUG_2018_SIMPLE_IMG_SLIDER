import React, {Component} from 'react';
import $ from 'jquery'
const width = () => {
    if($(window).height()>$(window).width()) {
        return '275%'
    }
    return '100%'
}
const position = () => {
    if($(window).height() > $(window).width()){
        return '6%'
    }
    return '35%'
}

class Login extends Component {
    render() {
       const {title} = this.props
        return (
            
            <div className = 'containter' 
                    style = {{ 
                        justifyContent: 'center', 
                        textAlign: 'center', 
                        display: 'inline-block', 
                        width: width(), 
                        position: 'fixed', 
                        left: position(), 
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