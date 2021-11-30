import React, { useState } from 'react';
import axios from 'axios';
import './UserHomePage.css';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";
import { TrainerRepository } from '../../api/TrainerRepository';
import { UserRepository } from '../../api/UserRepository';
import { Link } from 'react-router-dom';
import { GymRepository } from '../../api/GymRepository';
import { Rating } from '../Ratings/rating';
import { RatingRepository } from '../../api/RatingRepository';


export default class UserHomePage extends React.Component {

    trainerRepo = new TrainerRepository();
    userRepo = new UserRepository();
    gymRepo = new GymRepository();

    ratingsRepo = new RatingRepository();
    

    constructor(props) {
        super(props);
        this.state = {};
        this.state.firstName = "";
        this.state.lastName = "";
        this.state.gender = "";
        this.state.age = 0;
        this.state.phone = "";
        this.state.email = "";
        this.state.photo = "";
        this.state.token = localStorage.token;
        this.state.gyms = [];
        this.state.sessions = [];
        this.state.trainers = [];


        this.redirectToEdit = this.redirectToEdit.bind(this);
        this.getSessionTrainer = this.getSessionTrainer.bind(this);
    }

    initalizeProfile() {
        this.userRepo.getUser(this.state.token).then(account => {
            let accArray = account;

            if(accArray){
                this.setState({ age: accArray.age });
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

                this.setState({ photo: accArray.pfp });

            }
        })
    }

    initializeGyms() {
        this.gymRepo.getGyms().then(gyms => {

            var gymsList = [];
            {gyms.map((gym) => {
                var averageRating = 0

                this.ratingsRepo.getRatings(gym.gymID).then(ratings => {
                    ratings.forEach((rating) => {
                        averageRating += rating.rating
                    })
                    averageRating /= ratings.length

                    gym.averageRating = averageRating
                    gymsList.push(gym)
                })
            })
            }

            setTimeout(() => {
                this.setState({gyms: gymsList})
            }, 500)


        })

    }

    initializeSessions() {
        this.userRepo.getUserSessions(this.state.token).then(sessions => {
            var sessionsList = [];
            console.log(sessions)

            {sessions.map((session) => {

                this.userRepo.getUserByID(session.trainerID).then(trainer => {
                    console.log(trainer)
                    session.trainerName = trainer[0].firstName + " " + trainer[0].lastName
                    sessionsList.push(session)
                })
            })
            }

            setTimeout(() => {
                sessionsList = sessionsList.sort((session1, session2)=>{
                    return session1.date.localeCompare(session2.date)
                })
                this.setState({sessions: sessionsList})
            }, 1000)


        })
    }


    componentDidMount() {
        this.initalizeProfile();
        this.initializeGyms();
        this.initializeSessions();
    }

    redirectToEdit = () => {
        this.props.history.push('/UserHomePage/edit');
    }

    getSessionTrainer = (trainerID) => {
        for (let i = 0; i < this.state.trainers.length; i++) {
            console.log(this.state.trainers[i]);
            if (trainerID == this.state.trainers[i].profileID) {
                return (
                    this.state.trainers[i].firstName + " " + this.state.trainers[i].lastName
                );
            }
        }
    }


    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    ListItems (props) {
        const toList = props.items;
        const listItems = toList.map((item, index) =>
            <li key={index}>{item}</li>
        );
        return (
            <ul>{listItems}</ul>
        );
        };
    
        render(){
            return(<>
    
                    <div className = "row">
                        <div className = "col-sm-6">
                            <div className = "card w-70">
                                <div id="userPhoto">
                                    <img className = "card-img-top rounded-circle" src={this.state.photo} alt="user-photo"/>
    
                                </div>
    
                                <div id="basicUserInfo">
                                    <h2>{this.state.firstName} {this.state.lastName}</h2>
                                    <p>Gender {this.state.gender}</p>
                                    <p>Age {this.state.age}</p>
                                    <h3>Contact Info</h3>
                                    <p>{this.state.email}</p>
                                    <p>{this.state.phone}</p>
                                </div> 
    
    
                                    {/* <Link to={'/UserHomePage/edit'} className = "btn btn-primary">Edit Profile</Link> */}
    
                                    <span className="loginText" onClick={() => this.redirectToEdit()}>Edit here</span> 
    
                            </div>
                        </div>
    
                        <div className = "col-sm-6 align-self-center">
                            <div className = "card w-100 border-light mb-3">
                            <table className = "table table-hover">
                                <caption> Upcoming Appointments</caption>
                                <thead className = "table-dark">
                                    <tr>
                                        <th>Name</th>
                                        <th>Location</th>
                                        <th>Date</th>
                                        <th>Hourly Rate</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.sessions.map((session, index) => 
                                            <tr key={index}>
                                                <td><Link to= "/TrainerHomePage">{session.trainerName}</Link></td>
                                                <td>Dallas,TX</td>
                                                <td>{session.date.substr(5,2)}/{session.date.substr(8,2)}/{session.date.substr(0,4)}</td>
                                                <td>${session.price}</td>
                                                
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
    
                    <div className="row">
                <table className="table table-image table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Rating</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            this.state.gyms.map((gym, index) =>
                                <tr key={index}>
                                    <td className="w-25">
                                        <img src={gym.logo} className="img-fluid img-thumbnail" alt="Sheep" />
                                    </td>
                                    <td><Link to={"/Gym/" + gym.gymID}>{gym.name}</Link></td>
                                    <td>{gym.address}</td>
                                    <td><Rating value={gym.averageRating}></Rating></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            </>);
        }
}