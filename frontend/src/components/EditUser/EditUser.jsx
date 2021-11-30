import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import './EditUser.css';
import { UserRepository } from '../../api/UserRepository';
import { Link } from 'react-router-dom';


export default class EditUser extends React.Component{

    userRepo = new UserRepository();

    
    constructor(props) {
        super(props);
        this.state = {};
        this.state.firstName = "";
        this.state.lastName = "";
        this.state.gender = "";
        this.state.age = 0;
        this.state.phone = "";
        this.state.email = "";
        this.state.photo = "https://via.placeholder.com/500";
        this.state.token = localStorage.token;
        this.state.profileID = 0;

    
}

    initalizeProfile(){
        console.log(this.state.token);
        this.userRepo.getUser(this.state.token).then(account => {
            let accArray = account;
            console.log(accArray);
            if(accArray){
                this.setState({ age: accArray.age });
                this.setState({ profileID : accArray.profileID})
                if (accArray.firstName.length > 0)
                    this.setState({ firstName: accArray.firstName });
                if (accArray.lastName.length > 0)
                    this.setState({ lastName: accArray.lastName });
                if (accArray.gender.length > 0)
                    this.setState({ gender: accArray.gender });
                if (accArray.email.length > 0)
                    this.setState({ email: accArray.email });
                if (accArray.phone.length > 0)
                    this.setState({ phone: accArray.phone });
                if (accArray.pfp.length > 0)
                    this.setState({ photo: accArray.pfp });

            }


        })
        

}


    componentDidMount(){
        this.initalizeProfile();
    }

    handleChange = (e) => {
        const {id , value} = e.target   
        this.setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    handleSubmitClick = (e) =>{
            console.log(this.state.token)
            console.log(this.state.profileID)
            this.userRepo.updateUser(this.state.firstName,this.state.lastName,this.state.age,this.state.gender,this.state.phone,this.state.email,this.state.description,this.state.pfp)
            //FIX THIS
            this.props.history.push('/UserHomePage')

        
    }



    render(){

        return(
            <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
                <form>
                    
                <div className="form-group text-left">
                        <label htmlFor="pfp">Profile Image Link</label>
                        <input type="pfp" 
                            className="form-control" 
                            id="pfp" 
                            placeholder="Enter Image URL"
                            value={this.state.pfp}
                            onChange={this.handleChange} 
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="firstName">First Name</label>
                        <input type="firstName" 
                            className="form-control" 
                            id="firstName" 
                            placeholder="Enter First Name"
                            value={this.state.firstName}
                            onChange={this.handleChange} 
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="lastName" 
                            className="form-control" 
                            id="lastName" 
                            placeholder="Enter Last Name"
                            value={this.state.lastName}
                            onChange={this.handleChange} 
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="birthday">Age</label>
                        <input type="age"
                            className = "form-control"
                            id = "age"
                            placeholder="Enter Age"
                            value = {this.state.age}
                            onChange = {this.handleChange}
                            />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="gender">Gender</label>
                        <input type="gender" 
                            className="form-control" 
                            id="gender" 
                            placeholder="Enter Gender"
                            value={this.state.gender}
                            onChange={this.handleChange} 
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="phoneNumber" 
                            className="form-control" 
                            id="phone" 
                            placeholder="Enter Phone Number"
                            value={this.state.phone}
                            onChange={this.handleChange} 
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="email">Email</label>
                        <input type="email" 
                            className="form-control" 
                            id="email" 
                            placeholder="Enter email"
                            value={this.state.email}
                            onChange={this.handleChange} 
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="description">Description</label>
                        <input type="description" 
                            className="form-control" 
                            id="description" 
                            placeholder="Tell us about yourself!"
                            value={this.state.description}
                            onChange={this.handleChange} 
                        />
                    </div>
                    <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={this.handleSubmitClick}
                >
                    Update Account
                </button>
                    
                </form>
                <div className="alert alert-success mt-2" style={{display: this.state.successMessage ? 'block' : 'none' }} role="alert">
                    {this.state.successMessage}
                </div>
                
                
            </div>
        )
        
    }

}
