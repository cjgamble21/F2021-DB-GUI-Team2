import React, { useState } from 'react';
import axios from 'axios';
import './TrainerHomePage.css';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";
import { TrainerRepository } from '../../api/TrainerRepository';

//function TrainerHomePage(props)
export default class Login extends React.Component {

    trainerRepo = new TrainerRepository;

    constructor(props) {
        super(props);
        this.state = {};
        this.state.editMode = false;
        this.state.firstName = "John";
        this.state.lastName = "Doe";
        this.state.phone = "111-111-1111";
        this.state.email = "email@email.com";
        this.state.photo = "https://via.placeholder.com/250";
        this.state.credentials = ["foo", "bar"];
        this.state.workouts = ["bar", "foo"];
        this.state.token = localStorage.token;

        this.toggleEditMode = this.toggleEditMode.bind(this);
    }

    toggleEditMode () {
        this.setState({ editMode: !this.state.editMode })
    };

    initalizeProfile(){
        console.log(this.state.token);
        this.trainerRepo.getTrainer(this.state.token).then(account => {
            let accArray = account;
            console.log(account);
            if(accArray){
                if (accArray.firstName.length > 0)
                    this.setState({ firstName: accArray.firstName });
                if (accArray.lastName.length > 0)
                    this.setState({ lastName: accArray.lastName });
                // if (accArray.age)
                //     req.body.args.age = req.body.age;
                // if (accArray.gender)
                //     req.body.args.gender = req.body.gender;
                // if (accArray.phone)
                //     req.body.args.phone = req.body.phone;
                // if (accArray.email)
                //     req.body.args.email = req.body.email;
                // if (accArray.pfp)
                //     req.body.args.pfp = req.body.pfp;
                // if (accArray.description)
                //     req.body.args.description = req.body.description;

            }


        })
            

    }
    
    componentDidMount(){
        this.initalizeProfile();
    }

    

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
                        <h3>Contact Info</h3>
                        <p>{this.state.email}</p>
                        <p>{this.state.phoneNumber}</p>
                    </div> )}
                    {this.state.editMode && (
                    <div id="basicTrainerInfo">
                        <input type="text" 
                        value = {this.state.firstName}
                        onChange={e => this.setState({ firstName: e.target.value })}/>
                        <input type="text" 
                        value = {this.state.lastName}
                        onChange={e => this.setState({ lastName: e.target.value })}/>
                        <label>Gender</label>
                        <select value={this.state.gender}
                        onChange={e => this.setState({ gender: e.target.value })}>
                            <option>M</option>
                            <option>F</option>
                        </select>
                        <label>Age</label>
                        <input type="text" 
                        value={this.state.age}
                        onChange={e => this.setState({ age: e.target.value })}/>
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