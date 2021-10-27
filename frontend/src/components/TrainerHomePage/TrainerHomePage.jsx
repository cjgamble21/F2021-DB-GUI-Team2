import React, { useState } from 'react';
import axios from 'axios';
import './TrainerHomePage.css';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";

function TrainerHomePage(props) {
    const [state , setState] = useState({
        firstName: "",
        lastName : "",
        gender: "",
        contactInfo: "",
        credentials:"",

    })

    return(
        <div id="trainer">
            <h1>Trainer Home Page</h1>
            <div id="trainerHeader">
                <img src="https://via.placeholder.com/150"/>
                <h2>John Doe</h2>
                <p>Gender Male</p>
                <p>Age 22</p>
            </div>
            <div id="trainerBody">
                <ul>Credentials
                    <li>foo</li>
                    <li>bar</li>
                </ul>
                <ul>Workouts
                    <li>foo</li>
                    <li>bar</li>
                </ul>
            </div>
        </div>
    )
}
export default withRouter(TrainerHomePage);