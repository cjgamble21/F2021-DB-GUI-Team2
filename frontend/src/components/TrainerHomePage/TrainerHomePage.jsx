import React, { useState } from 'react';
import axios from 'axios';
import './TrainerHomePage.css';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";

//function TrainerHomePage(props)
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            firstName: "John",
            lastName : "Doe",
            gender: "Male",
            age: "22",
            rate: "12",
            email: "foo@bar.net",
            phoneNumber: "123-456-7890",
            photo: "https://via.placeholder.com/250",
            credentials: ["foo", "bar"],
            workouts:["bar", "foo"]
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

    render () {
        return(
            <div id="trainerPage">
                <h1>Trainer Home Page</h1>
                <div id="trainerHeader">
                    <div id="trainerPhoto">
                        <img src={this.state.photo} alt="trainer-photo"/>
                        {this.state.editMode && (
                        <input type="file"
                        onChange={e => this.setState({ photo: e.target.value })}/>
                        )}
                    </div>
                    {!this.state.editMode && (
                    <div id="basicTrainerInfo">
                        <h2>{this.state.firstName} {this.state.lastName}</h2>
                        <p>Gender {this.state.gender}</p>
                        <p>Age {this.state.age}</p>
                        <p>Rate: ${this.state.rate}/hr</p>
                        <h3>Contact Info</h3>
                        <p>{this.state.email}</p>
                        <p>{this.state.phoneNumber}</p>
                    </div> )}
                    {/* html for edit mode */}
                    {this.state.editMode && (
                    <div id="basicTrainerInfo">
                        {/* edit name */}
                        <input type="text" 
                        value = {this.state.firstName}
                        onChange={e => this.setState({ firstName: e.target.value })}/>
                        <input type="text" 
                        value = {this.state.lastName}
                        onChange={e => this.setState({ lastName: e.target.value })}/>
                        {/* edit gender */}
                        <label>Gender</label>
                        <select value={this.state.gender}
                        onChange={e => this.setState({ gender: e.target.value })}>
                            <option>M</option>
                            <option>F</option>
                        </select>
                        {/* edit age */}
                        <label>Age</label>
                        <input type="text" 
                        value={this.state.age}
                        onChange={e => this.setState({ age: e.target.value })}/>
                        {/* edit rate */}
                        <label>Rate</label>
                        $<input type="text" 
                        value={this.state.rate}
                        onChange={e => this.setState({ rate: e.target.value })}/>/hr
                        {/* edit contact info */}
                        <h3>Contact Info</h3>
                        <input type="text" 
                        value = {this.state.email}
                        onChange={e => this.setState({ email: e.target.value })}/>
                        <input type="text" 
                        value = {this.state.phoneNumber}
                        onChange={e => this.setState({ phoneNumber: e.target.value })}/>
                    </div> )}
                </div>
                <div id="trainerBody">
                    <h2>Credentials</h2>
                    <this.ListItems items={this.state.credentials}/>
                    <h2>Workouts</h2>
                    <this.ListItems items={this.state.workouts}/>
                </div>
                {!this.state.editMode && (
                <button onClick = {this.toggleEditMode}>Edit Info</button>
                )}
                {this.state.editMode && (
                <button onClick = {this.toggleEditMode}>Save Changes</button>
                )}
            </div>
        )
    }
}