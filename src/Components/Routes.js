import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import Input from './Input'
import RegisterInput from './RegisterInput';
import SignUp from './SignUp';
import Login from './LoginComponents/Login';
import Slider from './Slider'

const Routes = (props) => {
    const { loginUser, history } = props
    return (
        <div>
        <Route exact path = '/login' render = {(props) => 
            <Login {...props} title = 'Login' >
            <Input {...props} loginUser = {loginUser}/>
            <SignUp history = {history}/> 
            </Login>} />
         <Route exact path = '/register' render = {(props) => 
            <Login {...props} title = 'Register'>
            <RegisterInput {...props} loginUser = {loginUser}/> 
            </Login>} />
         <Route exact path = '/slider' component = {Slider} />
         </div>
    )
}

export default withRouter(Routes)