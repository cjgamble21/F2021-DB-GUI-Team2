import React from 'react';
import { withRouter } from "react-router-dom";

export default class EditTrainer extends React.Component {
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
    }

    render() {
        return (
            <div id="editTrainerPage">
                <h1>Trainer Edit Page</h1>
                <div id="trainerCard" className="card mb-3 align-baseline">
                    <div className="row g-0">
                        <div id="trainerPhoto" className="col-md-4 align-self-center">
                            <img src={this.state.photo} alt="trainer-photo" className="img-fluid rounded-start" />
                            <input type="file"
                                onChange={e => this.setState({ photo: e.target.value })} />
                        </div>
                        <div id="trainerInfo" className="col-md-8">
                            <div className="card-body">
                                <input type="text"
                                    value={this.state.firstName}
                                    onChange={e => this.setState({ firstName: e.target.value })} />
                                <input type="text"
                                    value={this.state.lastName}
                                    onChange={e => this.setState({ lastName: e.target.value })} />
                                <label className="card-title">Gender</label>
                                <select value={this.state.gender}
                                    onChange={e => this.setState({ gender: e.target.value })}>
                                    <option>M</option>
                                    <option>F</option>
                                </select>
                                <label className="card-title">Age</label>
                                <input type="text"
                                    value={this.state.age}
                                    onChange={e => this.setState({ age: e.target.value })} />
                                <h3 className="card-title">Contact Info</h3>
                                <input type="text"
                                    value={this.state.email}
                                    onChange={e => this.setState({ email: e.target.value })} />
                                <input type="text"
                                    value={this.state.phoneNumber}
                                    onChange={e => this.setState({ phoneNumber: e.target.value })} />
                            </div>
                        </div>
                        <button className="btn btn-primary"
                            onClick={this.toggleEditMode}>Save Changes</button>
                    </div>
                </div>
                <div id="trainerBody">
                    <h2>Credentials</h2>
                    <this.ListItems items={this.state.credentials} />
                    <h2>Workouts</h2>
                    <this.ListItems items={this.state.workouts} />
                </div>
            </div>
        )
    }
}
