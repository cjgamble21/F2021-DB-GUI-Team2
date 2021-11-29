import React, {useState} from 'react';
import axios from 'axios';
import './RegistrationForm.css';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";
import { UserRepository } from '../../api/UserRepository';

function RegistrationForm(props) {

    

    const [state , setState] = useState({
        username : "",
        password : "",
        userType : 9,
        confirmPassword: "",
        firstName: "",
        lastName  : "",
        age: 0,
        gender: "",
        phone: "",
        email: "",
        description: "",
        pfp: "https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/sheep-3.jpg",

        successMessage: null
    })
    
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const sendDetailsToServer = () => {
        if(state.username.length && state.password.length && state.userType.length) {
            // axios.post(API_BASE_URL + '/api/register', {username:state.username, password:state.password, userType:state.userType})
            axios.post(API_BASE_URL + '/api/register', {username:state.username, password:state.password, userType:state.userType})

                .then(function (response) {
                    if(response.status === 200){
                        setState(prevState => ({
                            ...prevState,
                            'successMessage' : 'Registration successful. Redirecting to home page..'
                        }))
                        localStorage.setItem(ACCESS_TOKEN_NAME,response.token);
                        redirectToHome();
                        //props.showError(null)
                    } else{
                        //props.showError("Some error ocurred");
                    }
                })
                .catch(function (error) {
                    window.alert(error);
                });    
        } else {
            //props.showError('Please enter valid username, user type, and password')    
        }
        
    }
    const redirectToHome = () => {
        //props.updateTitle('Home')
        props.history.push('/home');
    }
    const redirectToLogin = () => {
        //props.updateTitle('Login')
        props.history.push('/login'); 
    }
    const handleSubmitClick = (e) => {

        const userRepo = new UserRepository();
        
        e.preventDefault();
        if(state.password === state.confirmPassword) {
            //sendDetailsToServer();  
            userRepo.createUser(state.username,state.password,state.userType,state.firstName,state.lastName,state.age,state.gender,state.phone,state.email,state.pfp,state.description)
            .then(function (response) {
                //console.log(response);
                if(response.code === 200){
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Registration successful. Redirecting to home page..'
                    }))
                    localStorage.setItem(ACCESS_TOKEN_NAME,response.token);
                    redirectToHome();
                    //props.showError(null)
                } else{
                    //props.showError("Some error ocurred");
                }
            })
            .catch(function (error) {
                window.alert(error);
            });
            
        } else {
            //props.showError('Passwords do not match');
        }
    }
    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                    <br/>
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
                    <label htmlFor="username">Username</label>
                    <input type="username" 
                       className="form-control" 
                       id="username" 
                       aria-describedby="usernameHelp" 
                       placeholder="Enter username" 
                       onChange={handleChange}
                />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="password">Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="confirmPassword" 
                        placeholder="Confirm Password"
                        value={state.confirmPassword}
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="firstName">First Name</label>
                    <input type="firstName" 
                        className="form-control" 
                        id="firstName" 
                        placeholder="Enter First Name"
                        value={state.firstName}
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="lastName" 
                        className="form-control" 
                        id="lastName" 
                        placeholder="Enter Last Name"
                        value={state.lastName}
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="age">Age</label>
                    <input type="number"
                        className = "form-control"
                        id = "age"
                        placeholder="Enter Age"
                        value = {state.age}
                        onChange = {handleChange}
                        />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="gender">Gender</label>
                    <input type="gender" 
                        className="form-control" 
                        id="gender" 
                        placeholder="Enter Gender"
                        value={state.gender}
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="phoneNumber" 
                        className="form-control" 
                        id="phone" 
                        placeholder="Enter Phone Number"
                        value={state.phone}
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="email">Email</label>
                    <input type="email" 
                        className="form-control" 
                        id="email" 
                        placeholder="Enter email"
                        value={state.email}
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="description">Description</label>
                    <input type="description" 
                        className="form-control" 
                        id="description" 
                        placeholder="Tell us about yourself!"
                        value={state.description}
                        onChange={handleChange} 
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >
                    Register
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="mt-2">
                <span>Already have an account? </span>
                <span className="loginText" onClick={() => redirectToLogin()}>Login here</span> 
            </div>
            
        </div>
    )
}

export default withRouter(RegistrationForm);