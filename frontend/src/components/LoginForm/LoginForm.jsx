import React, {useState} from 'react';
import axios from 'axios';
import './LoginForm.css';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";

function LoginForm(props) {
    const [state , setState] = useState({
        userType: "",
        username : "",
        password : "",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        axios.post(API_BASE_URL + '/api/login', {username:state.username, password:setState.password})
            .then(function (response) {
                if(response.status === 200){
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Login successful. Redirecting to home page..'
                    }))
                    localStorage.setItem(ACCESS_TOKEN_NAME,response.data.token);
                    redirectToHome();
                    props.showError(null)
                }
                else{
                    props.showError("Incorrect Login information");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const redirectToHome = () => {
        if(state.userType === "Member"){
            props.updateTitle('Member Homepage');
            props.history.push('/UserHomePage');
        }
        else if(state.userType === "Trainer"){
            props.updateTitle('Trainer Homepage');
            props.history.push('/TrainerHomePage');
        }
        else if(state.userType === "Owner"){
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
                        <option value="Member">Member</option>
                        <option value="Owner">Owner</option>
                        <option value="Trainer">Trainer</option>
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