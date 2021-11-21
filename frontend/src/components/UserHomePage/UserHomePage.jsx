import React, { useState } from 'react';
import axios from 'axios';
import './UserHomePage.css';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";
import { TrainerRepository } from '../../api/TrainerRepository';
import { Link } from 'react-router-dom';

//function UserHomePage(props) {}
export default class UserHomePage extends React.Component {

    trainerRepo = new TrainerRepository();
    
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            userToken:'',
            firstName: "John",
            lastName : "Lawrimore",
            gender: "Male",
            age: "22",
            email: "foo@bar.net",
            phoneNumber: "123-456-7890",
            photo: "https://via.placeholder.com/500",
            trainers: []
    };

    this.toggleEditMode = this.toggleEditMode.bind(this);
}
//     componentDidMount(){
//         this.trainerRepo.getTrainer(window.username)
//         .then(profile => {
//             console.log(profile)
//             let userProfile = profile[0]
//             this.setState(userProfile)
//     })
// }

    toggleEditMode () {
        this.setState({ editMode: !this.state.editMode })
    };

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

    render(){
        return(<>
            
                <div className = "row">
                    <div className = "col-sm-6">
                        <div className = "card w-70">
                            <div id="userPhoto">
                                <img className = "card-img-top rounded-circle" src={this.state.photo} alt="user-photo"/>
                                {this.state.editMode && (
                                <input type="file"
                                onChange={e => this.setState({ photo: e.target.value })}/>
                                )}
                            </div>
                            {!this.state.editMode && (
                            <div id="basicUserInfo">
                                <h2>{this.state.firstName} {this.state.lastName}</h2>
                                <p>Gender {this.state.gender}</p>
                                <p>Age {this.state.age}</p>
                                <h3>Contact Info</h3>
                                <p>{this.state.email}</p>
                                <p>{this.state.phoneNumber}</p>
                            </div> )}
                            {this.state.editMode && (
                            <div id="basicUserInfo">
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

                            {!this.state.editMode && (
                                <button className="btn btn-primary" onClick = {this.toggleEditMode}>Edit Info</button>
                                )}
                                {this.state.editMode && (
                                <button type="button" class="btn btn-primary" onClick = {this.toggleEditMode}>Save Changes</button>
                                )}
                        </div>
                    </div>
                
                
                
                                 
                    <div className = "col-sm-6 align-self-center">
                        <div className = "card w-100 border-light mb-3">
                            <table className = "table table-hover">
                                <caption> Trainer List</caption>
                                <thead className = "table-dark">
                                    <tr>
                                        <th>Name</th>
                                        <th>Location</th>
                                        <th>Workouts</th>
                                        <th>Hourly Rate</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><Link to= "/TrainerHomepage">Bob the Builder</Link></td>
                                        <td>Dallas,TX</td>
                                        <td>Cardio, Strength</td>
                                        <td>$50</td>
                                        
                                    </tr>
                                    <tr>
                                        <td><Link to= "/TrainerHomepage">Dora the Explorer</Link></td>
                                        <td>Houston,TX</td>
                                        <td>Walking, Critical Thinking</td>
                                        <td>$60</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className = "row">
                    <table className = "table table-image table-hover">
                        <thead class="thead-dark">
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Rating</th>
                            </tr>

                        </thead>
                        <tbody>

                            <tr>
                                <td className = "w-25">
                                <img src="https://dmn-dallas-news-prod.cdn.arcpublishing.com/resizer/VTPjV_pQiFWY-M3I_hKalJJ2-jg=/1660x934/smart/filters:no_upscale()/arc-anglerfish-arc2-prod-dmn.s3.amazonaws.com/public/OVEHMMLGRU52CVDGZ6GDOVMNNU.jpg" className="img-fluid img-thumbnail" alt="Sheep"/>
                                </td>
                                <td><Link to = "/Gym">LifeTime Fitness</Link></td>
                                <td>5910 N US 75-Central Expy 1000, Dallas, TX 75206</td>
                            </tr>

                            <tr>
                                <td className = "w-25">
                                <img src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/sheep-3.jpg" className="img-fluid img-thumbnail" alt="Sheep"/>
                                </td>
                                <td><Link to = "/Gym">24 Hour Fitness</Link></td>
                                <td>11100 Central Expressway Dallas, TX 75206</td>

                            </tr>
                        </tbody>


                    </table>



                </div>
            
            
        </>);
    }
}