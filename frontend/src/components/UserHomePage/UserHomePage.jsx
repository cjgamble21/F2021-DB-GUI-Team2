import React, { useState } from 'react';
import axios from 'axios';
import './UserHomePage.css';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";
import { TrainerRepository } from '../api/TrainerRepository';

//function UserHomePage(props) {}
export default class UserHomePage extends React.Component {

    //const trainerRepo = new TrainerRepository();
    
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            firstName: "John",
            lastName : "Lawrimore",
            gender: "Male",
            age: "22",
            email: "foo@bar.net",
            phoneNumber: "123-456-7890",
            photo: "https://via.placeholder.com/250"
    };

    this.toggleEditMode = this.toggleEditMode.bind(this);
}

    toggleEditMode () {
        this.setState({ editMode: !this.state.editMode })
    };

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    ListItems (props) {
    const toList = props.items;
    const listItems = toList.map((item) =>
        <li>{item}</li>
    );
    return (
        <ul>{listItems}</ul>
    );
    };

    render(){
        return(
            <div class="float-container">
                <div className = "row">
                    <div className = "col-sm-6">
                        <div className = "card">
                            <div id="userPhoto">
                                <img className = "card-img-top" src={this.state.photo} alt="user-photo"/>
                                {this.state.editMode && (
                                <input type="file"
                                onChange={e => this.setState({ photo: e.target.value })}/>
                                )}
                            </div>
                            {!this.state.editMode && (
                            <div id="basicUserInfo">
                                <h2>{this.state.firstName} {this.state.lastName}</h2>
                                <p>Gender {this.state.gender}</p>
                                <p>Age {this.state.age}</p>
                                <h3>Contact Info</h3>
                                <p>{this.state.email}</p>
                                <p>{this.state.phoneNumber}</p>
                            </div> )}
                            {this.state.editMode && (
                            <div id="basicUserInfo">
                                <input type="text" 
                                value = {this.state.firstName}
                                onChange={e => this.setState({ firstName: e.target.value })}/>
                                <input type="text" 
                                value = {this.state.lastName}
                                onChange={e => this.setState({ lastName: e.target.value })}/>
                                <label>Gender</label>
                                <select value={this.state.gender}
                                onChange={e => this.setState({ gender: e.target.value })}>
                                    <option>M</option>
                                    <option>F</option>
                                </select>
                                <label>Age</label>
                                <input type="text" 
                                value={this.state.age}
                                onChange={e => this.setState({ age: e.target.value })}/>
                                <h3>Contact Info</h3>
                                <input type="text" 
                                value = {this.state.email}
                                onChange={e => this.setState({ email: e.target.value })}/>
                                <input type="text" 
                                value = {this.state.phoneNumber}
                                onChange={e => this.setState({ phoneNumber: e.target.value })}/>

                                {!this.state.editMode && (
                                <button type="button" class="btn btn-primary" onClick = {this.toggleEditMode}>Edit Info</button>
                                )}
                                {this.state.editMode && (
                                <button type="button" class="btn btn-primary" onClick = {this.toggleEditMode}>Save Changes</button>
                                )}
                            </div> )}
                        </div>
                    </div>
                </div>
                
                
                <div className = "row">
                    <div className = "col-sm-6">
                        <div className = "card">
                            <table className = "table table-hover">
                                <thead className = "table-dark">
                                    <tr>
                                        <th>Name</th>
                                        <th>Location</th>
                                        <th>Workouts</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Bob the Builder</td>
                                        <td>Dallas,TX</td>
                                        <td>Cardio,Strength</td>
                                    </tr>
                                    <tr>
                                        <td>Dora the Explorer</td>
                                        <td>Houston,TX</td>
                                        <td>Walking,Critical Thinking</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}