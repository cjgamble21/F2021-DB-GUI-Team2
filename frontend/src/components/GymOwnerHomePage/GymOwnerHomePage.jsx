import React, { useState } from 'react';
import axios from 'axios';
import {Card} from 'bootstrap';
import './GymOwnerHomePage.css';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";

export default class GymOwnerHomePage extends React.Component {
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

    handleRemoveTrainer(id) {
        const newList = this.trainers.filter((item) => item.firstName !== id);
        this.setState({ trainers : newList});
    }
    handleRemoveAmenity(id) {
        const newList = this.amenities.filter((item) => item.firstName !== id);
        this.setState({ amenities : newList});
    }
    handleRemoveActivity(id) {
        const newList = this.trainers.filter((item) => item.firstName !== id);
        this.setState({ trainers : newList});
    }

    render() {
        return (
            <div className="main">
                <img src={this.state.logoUrl} />
                {!this.state.editMode && (
                <div id="ownerInfo">
                    <h1>{this.state.gymName}</h1>
                    <p>{this.state.description}</p>
                    <ul className="trainerList">{
                        this.state.trainers.map((x, i) => <li key={i}>
                            <div className="trainer">
                                <div className="trainerName">{x.firstName} {x.lastName}</div>
                                <img src={x.photo} className="TrainerPhoto" />
                            </div>
                        </li>)
                    }</ul>
                    <Card>
                        <ul className="amenitiesList">{
                            this.state.amenities.map((x, i) => <li key={i}>
                                <div className="amenityName">{x}</div>
                            </li>)
                        }</ul>
                    </Card>
                    <Card className="activitiesList">
                        <ul className="activitiesList">{
                            this.state.activities.map((x, i) => <li key={i}>
                                <div className="activityName">{x}</div>
                            </li>)
                        }</ul>
                    </Card>
                </div>)}
                {this.state.editMode && (
                    <div id="ownerInfo">
                        <input type="text" 
                                value = {this.state.gymName}
                                onChange={e => this.setState({ gymName: e.target.value })}/>
                         <input type="text" 
                                value = {this.state.description}
                                onChange={e => this.setState({ description: e.target.value })}/>
                        //I dont know how to add a trainer
                        <ul className="trainerList">{
                            this.state.trainers.map((x, i) => <li key={i}>
                                <div className="trainer">
                                    <div className="trainerName">{x.firstName} {x.lastName}</div>
                                    <img src={x.photo} className="TrainerPhoto" />
                                    <button type="button"
                                        className="btn btn-sm btn-danger"
                                        onClick={ () => this.handleRemoveTrainer(x.firstName) }>
                                        X</button>
                                </div>
                            </li>)
                        }</ul>
                        <Card>
                            <ul className="amenitiesList">{
                                this.state.amenities.map((x, i) => <li key={i}>
                                    <div className="amenityName">{x}</div>
                                    <button type="button"
                                        className="btn btn-sm btn-danger"
                                        onClick={ () => this.handleRemoveAmenity(x) }>
                                        X</button>
                                </li>)
                            }</ul>
                        </Card>
                        <Card className="activitiesList">
                            <ul className="activitiesList">{
                                this.state.activities.map((x, i) => <li key={i}>
                                    <div className="activityName">{x}</div>
                                    <button type="button"
                                        className="btn btn-sm btn-danger"
                                        onClick={ () => this.handleRemoveActivity(x) }>
                                        X</button>
                                </li>)
                            }</ul>
                        </Card>
                        
                    </div>)}
            </div>
        )
    }
}