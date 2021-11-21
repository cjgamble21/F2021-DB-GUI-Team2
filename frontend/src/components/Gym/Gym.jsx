import React, { useState } from 'react';
import axios from 'axios';
import './Gym.css';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";

export default class Gym extends React.Component {

    render(){
        return(<> 
            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                    <img src="https://images.unsplash.com/photo-1540496905036-5937c10647cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" class="d-block w-100" alt="..."/>
                    </div>
                    <div class="carousel-item">
                    <img src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80" class="d-block w-100" alt="..."/>
                    </div>
                    <div class="carousel-item">
                    <img src="https://images.unsplash.com/photo-1558611848-73f7eb4001a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" class="d-block w-100" alt="..."/>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>

            <div class="card border-light">
                <h2 class="card-header">Welcome to LifeTime Fitness!</h2>
                <div class="card-body">
                    <h5 class="card-title">A Destination Like No Other</h5>
                    <p class="card-text">Discover everything you’ll find in a luxury gym — and so much more. With the expertise of Life Time and an incredible community at your side, you can take your healthy lifestyle further than you ever thought possible.</p>
                </div>
            </div>

            <div class="card-group">
                <div class="card border-light rounded">
                    <img src="https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" class="card-img-top rounded" alt="..."/>
                    <div class="card-body">
                    <h5 class="card-title">Spacious Fitness Floor</h5>
                    <p class="card-text">All the building blocks of fitness — cardio and strength machines, free weights, functional training areas and more.</p>
                    
                    </div>
                </div>
                <div class="card border-light rounded">
                    <img src="https://images.unsplash.com/photo-1623874514711-0f321325f318?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" class="card-img-top rounded" alt="..."/>
                    <div class="card-body">
                    <h5 class="card-title">Upscale Amenities</h5>
                    <p class="card-text">Details like spacious locker rooms, fresh towel service and premium toiletries give our destinations a welcoming, resort-like feel.</p>
                    
                    </div>
                </div>
                <div class="card border-light rounded">
                    <img src="https://previews.123rf.com/images/anatols/anatols1204/anatols120400019/13138871-active-children-climbing-up-the-gymnastic-wall-bars.jpg" class="card-img-top rounded" alt="..."/>
                    <div class="card-body">
                    <h5 class="card-title">Kids and Family</h5>
                    <p class="card-text">Camps, classes, fitness and more. Create memories and be active as a family — or enjoy some time to yourself while we watch the kids.</p>
                    
                    </div>
                </div>
            </div>

            

        
            
        </>)
    }
}