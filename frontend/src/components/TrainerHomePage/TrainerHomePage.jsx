import React, { useState } from 'react';
import axios from 'axios';
import './TrainerHomePage.css';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

//function TrainerHomePage(props)
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            firstName: "John",
            lastName: "Doe",
            gender: "Male",
            age: "22",
            email: "foo@bar.net",
            phoneNumber: "123-456-7890",
            photo: "https://via.placeholder.com/150",
            credentials: ["foo", "bar"],
            workouts: ["bar", "foo"]
        };

        this.toggleEditMode = this.toggleEditMode.bind(this);
    }

    toggleEditMode() {
        this.setState({ editMode: !this.state.editMode })
    };

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    ListItems(props) {
        const toList = props.items;
        const listItems = toList.map((item) =>
            <li className="list-group-item">{item}</li>
        );
        return (
            <ul className="list-group list-group-flush">{listItems}</ul>
        );
    };

    render() {
        return (
            <div id="trainerPage">
                <div id="trainerInfoCard">
                    <div id="trainerCardContent">
                        <div id="trainerPhoto">
                            <img src={this.state.photo}
                                className="card-img-top"
                                alt="trainer-photo" />
                            {this.state.editMode && (
                                <input type="file"
                                    onChange={e => this.setState({ photo: e.target.value })} />
                            )}
                        </div>
                        {!this.state.editMode && (
                            <div id="basicTrainerInfo">
                                <div id="trainerName">
                                    <h1>{this.state.firstName} {this.state.lastName}</h1>
                                </div>
                                <div id="trainerAttribute-list">
                                    <div id="trainerGender" className="trainerAttribute">
                                        <h3>Gender</h3>
                                        <p>{this.state.gender}</p>
                                    </div>
                                    <div id="trainerAge" className="trainerAttribute">
                                        <h3>Age</h3>
                                        <p>{this.state.age}</p>
                                    </div>
                                    <div id="trainerContact" className="trainerAttribute">
                                        <h3>Contact Info</h3>
                                        <p>{this.state.email}</p>
                                        <p>{this.state.phoneNumber}</p>
                                    </div>
                                </div>
                            </div>)}
                        {this.state.editMode && (
                            <div id="basicTrainerInfo">
                                <div id="trainerName">
                                    <input type="text"
                                        value={this.state.firstName}
                                        onChange={e => this.setState({ firstName: e.target.value })} />
                                    <input type="text"
                                        value={this.state.lastName}
                                        onChange={e => this.setState({ lastName: e.target.value })} />
                                </div>
                                <div id="trainerAttribute-list">
                                    <div id="trainerGender" className="trainerAttribute">
                                        <h3>Gender</h3>
                                        <select value={this.state.gender}
                                            onChange={e => this.setState({ gender: e.target.value })}>
                                            <option>M</option>
                                            <option>F</option>
                                        </select>
                                    </div>
                                    <div id="trainerAge" className="trainerAttribute">
                                        <h3>Age</h3>
                                        <input type="number" min="18"
                                            value={this.state.age}
                                            onChange={e => this.setState({ age: e.target.value })} />
                                    </div>
                                    <div id="trainerContact" className="trainerAttribute">
                                        <h3>Contact Info</h3>
                                        <input type="text"
                                            value={this.state.email}
                                            onChange={e => this.setState({ email: e.target.value })} />
                                        <input type="tel"
                                            value={this.state.phoneNumber}
                                            onChange={e => this.setState({ phoneNumber: e.target.value })} />
                                    </div>
                                </div>
                            </div>)}
                    </div>
                    {!this.state.editMode && (
                        <button onClick={this.toggleEditMode}>Edit Info</button>
                    )}
                    {this.state.editMode && (
                        <div id="editModeButtons">
                            <button onClick={this.toggleEditMode}>Save Changes</button>
                            <button onClick={this.toggleEditMode}>Cancel</button>
                        </div>
                    )}
                </div>
                <div id="trainerCredentials">
                    <div id="credentials">
                        <h2>Credentials</h2>
                        <this.ListItems items={this.state.credentials} />
                    </div>
                    <div id="workouts">
                        <h2>Workouts</h2>
                        <this.ListItems items={this.state.workouts} />
                    </div>
                </div>
                <h1>Appointments</h1>
                <Calendar />
            </div>
        )
    }
}