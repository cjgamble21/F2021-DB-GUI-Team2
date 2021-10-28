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
            contactInfo: ["foo@bar.net","123-456-7890"],
            photo: "https://via.placeholder.com/250",
            credentials: ["foo", "bar"],
            workouts:["bar", "foo"]
    };

    this.toggleEditMode = this.toggleEditMode.bind(this);
}

    toggleEditMode () {
        this.setState({ editMode: !this.state.editMode })
    };

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
                        <img src={this.state.photo}/>
                        {this.state.editMode && (
                        <p>Edit Photo</p>
                        )}
                    </div>
                    <div id="basicTrainerInfo">
                        <h2>{this.state.firstName} {this.state.lastName}</h2>
                        <p>Gender {this.state.gender}</p>
                        <p>Age {this.state.age}</p>
                        <h3>Contact Info</h3>
                        <this.ListItems items={this.state.contactInfo}/>
                    </div>
                </div>
                <div id="trainerBody">
                    <h2>Credentials</h2>
                    <this.ListItems items={this.state.credentials}/>
                    <h2>Workouts</h2>
                    <this.ListItems items={this.state.workouts}/>
                </div>
                <button onClick = {this.toggleEditMode}>Edit Info</button>
            </div>
        )
    }
}