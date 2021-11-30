import React from 'react';
import { withRouter, Link, Redirect } from "react-router-dom";
import { TrainerRepository } from '../../api/TrainerRepository';

export default class EditTrainer extends React.Component {

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
        this.state.pfp = "https://via.placeholder.com/500";
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

    ListItems(props) {
        const toList = props.items;
        const listItems = toList.map((item) =>
            <li><input type="text" value={item} /></li>
        );
        return (
            <ul className="list-unstyled">{listItems}</ul>
        );
    };

    onSaveSubmit() {
        this.trainerRepository.updateTrainer(this.token, this.firstName,
            this.lastName, this.age, this.gender, this.phone, this.email, this.pfp, this.description)
            .then();
    }

    render() {
        return (
            <div id="editTrainerPage" className="mt-5">
                <div id="trainerCard">
                    <div>
                        <div id="trainerPhoto" className="d-grid justify-content-center">
                            <img src={this.state.pfp} alt="trainer-photo" className="rounded-circle w-50 m-auto mb-3" />
                            <label htmlFor="pfpUrl">Profile Picture Url</label>
                            <input type="text"
                                id="pfpUrl"
                                className="form-control m-auto"
                                value={this.state.pfp}
                                onChange={e => this.setState({ photo: e.target.value })} />
                        </div>
                        <div id="trainerInfo">
                            <div>
                                <form>
                                    <fieldset className="d-flex justify-content-evenly">
                                        <div className="form-group d-grid">
                                            <label htmlFor="firstName">First Name</label>
                                            <input type="text"
                                                id="firstName"
                                                className="form-control"
                                                value={this.firstName}
                                                onChange={e => this.setState({ firstName: e.target.value })} />
                                        </div>
                                        <div className="form-group d-grid">
                                            <label htmlFor="lastName">Last Name</label>
                                            <input type="text"
                                                id="lastName"
                                                className="form-control"
                                                value={this.state.lastName}
                                                onChange={e => this.setState({ lastName: e.target.value })} />
                                        </div>
                                    </fieldset>
                                    <fieldset className="d-flex justify-content-evenly">
                                        <div className="form-group d-grid">
                                            <label htmlFor="gender">Gender</label>
                                            <select value={this.state.gender}
                                                id="gender"
                                                className="form-select"
                                                onChange={e => this.setState({ gender: e.target.value })}>
                                                <option>M</option>
                                                <option>F</option>
                                            </select>
                                        </div>
                                        <div className="form-group d-grid">
                                            <label htmlFor="age">Age</label>
                                            <input type="number"
                                                id="age"
                                                className="form-control"
                                                value={this.state.age}
                                                min="18"
                                                onChange={e => this.setState({ age: e.target.value })} />
                                        </div>
                                    </fieldset>
                                    <fieldset className="d-flex justify-content-evenly">
                                        <div className="form-group d-grid">
                                            <label htmlFor="email">Email</label>
                                            <input type="email"
                                                id="email"
                                                className="form-control"
                                                value={this.state.email}
                                                onChange={e => this.setState({ email: e.target.value })} />
                                        </div>
                                        <div className="form-group d-grid">
                                            <label htmlFor="phoneNumber">Phone Number</label>
                                            <input type="tel"
                                                id="phoneNumber"
                                                className="form-control"
                                                value={this.state.phoneNumber}
                                                onChange={e => this.setState({ phoneNumber: e.target.value })} />
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="trainerBody" className="mb-4">
                    <h2>About Me</h2>
                    <textarea className="form-control mb-5" />
                    <h2>Workouts</h2>
                    <this.ListItems items={this.state.workouts} />
                </div>
                <div className="d-flex justify-content-evenly">
                    <button className="btn btn-primary"
                        onClick={this.onSaveSubmit}>Save Changes</button>
                    <Link to="/TrainerHomePage" className="btn btn-danger">
                        Cancel
                    </Link>
                </div>
            </div>
        )
    }
}
