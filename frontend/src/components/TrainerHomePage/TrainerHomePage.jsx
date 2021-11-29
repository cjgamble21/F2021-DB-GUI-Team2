import React, { useState } from 'react';
import axios from 'axios';
import './TrainerHomePage.css';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import { withRouter, Link } from "react-router-dom";
import { TrainerRepository } from '../../api/TrainerRepository';
import EditTrainer from '../EditTrainer/EditTrainer';

//function TrainerHomePage(props)
export default class TrainerHomePage extends React.Component {

    trainerRepo = new TrainerRepository;

    constructor(props) {
        super(props);
        this.state = {};
        this.state.firstName = "";
        this.state.lastName = "";
        this.state.age = "";
        this.state.gender = "";
        this.state.phone = "";
        this.state.email = "";
        this.state.pfp = "";
        this.state.credentials = [];
        this.state.workouts = [];
        this.state.token = localStorage.token;
    }

    initalizeProfile() {
        console.log(this.state.token);
        this.trainerRepo.getTrainer(this.state.token).then(account => {
            let accArray = account;
            console.log(accArray);
            if (accArray) {
                if (accArray.firstName.length > 0)
                    this.setState({ firstName: accArray.firstName });
                if (accArray.lastName.length > 0)
                    this.setState({ lastName: accArray.lastName });
                if (accArray.age)
                    this.setState({ age: accArray.age });
                if (accArray.gender)
                    this.setState({ gender: accArray.gender });
                if (accArray.phone)
                    this.setState({ phone: accArray.phone });
                if (accArray.email)
                    this.setState({ pfp: accArray.email });
                // if (accArray.pfp)
                // this.setState({ pfp: accArray.pfp });
                if (accArray.description)
                    this.setState({ description: accArray.description });
            }
        })
    }

    componentDidMount() {
        this.initalizeProfile();
    }



    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    ListItems(props) {
        const toList = props.items;
        const listItems = toList.map((item) =>
            <li>{item}</li>
        );
        return (
            <ul className="list-unstyled">{listItems}</ul>
        );
    };

    render() {
        return (
            <div id="trainerPage">
                <h1>Trainer Home Page</h1>
                <div id="trainerCard" className="card mb-3 align-baseline">
                    <div className="row g-0">
                        <div id="trainerPhoto" className="col-md-4 align-self-center">
                            <img src={this.state.pfp} alt="trainer-photo" className="img-fluid rounded-start" />
                        </div>
                        <div id="trainerInfo" className="col-md-8">
                            <div className="card-body">
                                <h4 className="card-title">{this.state.firstName} {this.state.lastName}</h4>
                                <p className="card-title">Gender</p>
                                <p className="card-text"> {this.state.gender}</p>
                                <p className="card-title">Age</p>
                                <p className="card-text">{this.state.age}</p>
                                <h5 className="card-title">Contact Info</h5>
                                <p>Email: {this.state.email}</p>
                                <p className="card-text">Phone: {this.state.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="trainerBody">
                    <h2>Credentials</h2>
                    <this.ListItems items={this.state.credentials} />
                    <h2>Workouts</h2>
                    <this.ListItems items={this.state.workouts} />
                </div>
                <Link to="/TrainerHomePage/edit"><button className="btn btn-primary">Edit Info</button>
                </Link>
            </div>
        )
    }
}