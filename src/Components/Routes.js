import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import Input from './Input'
import RegisterInput from './RegisterInput';
import SignUp from './SignUp';
import Login from './LoginComponents/Login';
import Slider from './Slider'
import Upload from './upload'
import Dashboard from './Dashboard'
import error404 from './404'

const Routes = (props) => {
    const { loginUser, history, token, user } = props
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
         <Route exact path = '/album/:id' component = {Slider} />
         <Route exact path = '/upload' render = {(props) => <Upload {...props} token = {token} user = {user} />} />
         <Route exact path = '/dashboard' render = {(props) => <Dashboard {...props} token = {token} user = {user}/>} />
         <Route exact path = '/404' component = {error404} />
         </div>
    )
}

export default withRouter(Routes)