import React, {useState} from 'react';
import axios from 'axios';
import './LoginForm.css';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";

function LoginForm(props) {

    const [state , setState] = useState({
        username : "",
        password : "",
        userType : 9,
        successMessage: null
    })

    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const checkAccount = () => {
        if(state.username.length && state.password.length && state.userType.length) {
            axios.post(API_BASE_URL + '/api/login', {username:state.username, password:state.password, userType: state.userType}    )
                .then(function (response) {
                    if (response.status === 200) {
                        setState(prevState => ({
                            ...prevState,
                            'successMessage' : 'Login successful. Redirecting to home page..'
                        }));
                        localStorage.token = response.data.token;
                        redirectToHome();
                    } else {
                        props.showError("Some error occurred");
                    }
                })
                .catch(function (error) {
                    window.alert(error);
                });
        } else {
            props.showError('Please enter valid username, user type, and password');
        }
    }

    const redirectToHome = () => {
        if(state.userType === '1'){
            props.updateTitle('Member Homepage');
            props.history.push('/UserHomePage');
        }
        else if(state.userType === '2'){
            props.updateTitle('Trainer Homepage');
            props.history.push('/TrainerHomePage');
        }
        else if(state.userType === '3'){
            props.updateTitle('Gym Owner Homepage');
            props.history.push('/GymOwnerHomePage');
        }
        else{
            props.updateTitle('Home');
            props.history.push('/home');
        }
    }

    const redirectToRegister = () => {
        props.history.push('/register'); 
        props.updateTitle('Register');
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        checkAccount()
    }

    return(
        <div className="card">
            <form>
                <div className="form-group text-left">
                    <label htmlFor="exampleUserType">User Type</label>
                    <br/>
                    <select className="User Type" 
                        id="userType"
                        value={state.userType} 
                        onChange={handleChange}>
                        <option value="">choose an option</option>
                        <option value="1">Member</option>
                        <option value="3">Owner</option>
                        <option value="2">Trainer</option>
                    </select>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputUserName1">Username</label>
                    <input type="username" 
                       className="form-control" 
                       id="username" 
                       aria-describedby="usernameHelp" 
                       placeholder="Enter username" 
                       value={state.username}
                       onChange={handleChange}
                />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <br/>
                    <input type="password" 
                       className="form-control" 
                       id="password" 
                       placeholder="Password"
                       value={state.password}
                       onChange={handleChange} 
                    />
                </div>
                <div className="form-check">
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >Submit</button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="registerMessage">
                <span>Dont have an account? </span>
                <span className="loginText" onClick={() => redirectToRegister()}>Register</span> 
            </div>
        </div>
    )
}

export default withRouter(LoginForm);