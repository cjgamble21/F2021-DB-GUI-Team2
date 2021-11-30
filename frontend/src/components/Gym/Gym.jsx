import React, { useState } from 'react';
import axios from 'axios';
import './Gym.css';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import { Link } from "react-router-dom";
import { RatingRepository } from '../../api/RatingRepository';
import { Rating } from '../Ratings/rating';
import { GymRepository } from '../../api/GymRepository';
import { TrainerRepository } from '../../api/TrainerRepository';

export default class Gym extends React.Component {

    ratingsRepo = new RatingRepository();
    gymRepo = new GymRepository();
    trainerRepo = new TrainerRepository();

    
    constructor(props) {
        super(props);
        this.state = {};
        this.state.name = "";
        this.state.description = "";
        this.state.logo = "";
        this.state.ratings = [];
        this.state.trainers = [];
        this.state.amenities = [];
        this.state.gymID = this.props.match.params.id
    }

    initializeRatings(){
        
        this.ratingsRepo.getRatings(this.state.gymID).then(ratings => {
            console.log(ratings)
            this.setState({ratings:ratings})
        })
    }

    initializeGym()
    {
        
        this.gymRepo.getGym(this.state.gymID).then(gym => {
            let accArray = gym;
            
            if(accArray){
                this.setState({ name: accArray[0].name });
                this.setState({ description: accArray[0].description });
            }

        })

        this.gymRepo.getAmenities().then(amenities =>{
            let  accArray3 = amenities
            console.log(accArray3)
            this.setState({amenities:accArray3})
        })
    }
    initializeTrainers(){
        this.trainerRepo.getTrainers().then(trainers =>{
            let accArray2 = trainers
            console.log(accArray2)
            this.setState({trainers:accArray2})
        })
        
    }
    

    componentDidMount(){
        this.initializeRatings();
        this.initializeGym();
        this.initializeTrainers();
        
    }

    render(){
        return(<> 
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img src="https://images.unsplash.com/photo-1540496905036-5937c10647cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                    <img src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                    <img src="https://images.unsplash.com/photo-1558611848-73f7eb4001a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" className="d-block w-100" alt="..."/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <div className="card border-light">
                <h2 className="card-header">Welcome to {this.state.name}!</h2>
                <div className="card-body">
                    <h5 className="card-title">A Destination Like No Other</h5>
                    <p className="card-text">{this.state.description}</p>
                </div>
            </div>

            <div className="card-group">
                {this.state.amenities.map((amenity,index) => 

                <div className="card border-light rounded" key = {index}>
                <img src={amenity.image} className="card-img-top rounded" alt="..."/>
                <div className="card-body">
                <h5 className="card-title">{amenity.title}</h5>
                <p className="card-text">{amenity.description}</p>
                
                </div>
            </div>
                )}
                
            </div>

            <div className = "row">
                <table className = "table table-image table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>Message</th>
                            <th>Rating</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            this.state.ratings.map((rating, index) => 
                                <tr key={index}>
                                    <td className = "w-25">
                                    <p>{rating.message}</p>
                                    </td>
                                    <td><Rating value={rating.rating}></Rating></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div><div className = "row">
                <table className = "table table-image table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Rating</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            this.state.trainers.map((trainers, index) => 
                                <tr key={index}>
                                    <td className = "w-25">
                                    <p>{trainers.name}</p>
                                    </td>
                                    {/* <td><Rating value={trainers.rating}></Rating></td> */}
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>)
    }
}