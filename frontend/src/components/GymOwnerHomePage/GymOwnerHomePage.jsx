import React, { useState } from 'react';
import axios from 'axios';
import './GymOwnerHomePage.css';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";

export default class GynOwnerHomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            gymName: "John Doe",
            description: "description",
            logourl: "https://via.placeholder.com/250",
            trainers: ["foo", "bar"],
            activities: ["bar", "foo"],
            amenities: ["bar", "foo", "foo"]
        };

        this.toggleEditMode = this.toggleEditMode.bind(this);
    }

    toggleEditMode() {
        this.setState({ editMode: !this.state.editMode })
    };

    handleChange(e) {
        this.setState({ value: e.target.value });
    }
    render() {
        return (
            <div className="main">
                <h1>{this.state.gymName}</h1>
                <img src={this.state.logoUrl} />
                <p>{this.state.description}</p>
                <ul className="trainerList">{
                    this.state.trainers.map((x, i) => <li key={i}>
                        <div className="trainer">
                            <div className="trainerName">{x.firstName} {x.lastName}</div>
                            <img src={x.photo} className="TrainerPhoto" />
                        </div>
                    </li>)
                }</ul>
                <ul className="amenitiesList">{
                    this.state.amenities.map((x, i) => <li key={i}>
                        <div className="amenityName">{x}</div>
                    </li>)
                }</ul>
                <ul className="activitiesList">{
                    this.state.activities.map((x, i) => <li key={i}>
                        <div className="activityName">{x}</div>
                    </li>)
                }</ul>
            </div>
        )
    }
}