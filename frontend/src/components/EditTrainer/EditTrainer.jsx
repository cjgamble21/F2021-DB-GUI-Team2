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
        this.state.pfp = "";
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
        this.trainerRepository.updateTrainer(this.state)
            .then(() => this.props.history.push('/TrainerHomePage'));
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
                                className="form-control-file"
                                onChange={e => this.setState({ photo: e.target.value })} />
                        </div>
                        <div id="trainerInfo" className="col-md-8">
                            <div className="card-body">
                                <form>
                                    <fieldset className="d-flex">
                                        <div className="form-group d-grid">
                                            <label htmlFor="firstName">First Name</label>
                                            <input type="text"
                                                id="firstName"
                                                value={this.state.firstName}
                                                onChange={e => this.setState({ firstName: e.target.value })} />
                                        </div>
                                        <div className="form-group d-grid">
                                            <label htmlFor="lastName">Last Name</label>
                                            <input type="text"
                                                id="lastName"
                                                value={this.state.lastName}
                                                onChange={e => this.setState({ lastName: e.target.value })} />
                                        </div>
                                    </fieldset>
                                    <fieldset className="d-flex">
                                        <div className="form-group d-grid">
                                            <label className="card-title" htmlFor="gender">Gender</label>
                                            <select value={this.state.gender}
                                                id="gender"
                                                onChange={e => this.setState({ gender: e.target.value })}>
                                                <option>M</option>
                                                <option>F</option>
                                            </select>
                                        </div>
                                        <div className="form-group d-grid">
                                            <label className="card-title" htmlFor="age">Age</label>
                                            <input type="number"
                                                id="age"
                                                value={this.state.age}
                                                min="18"
                                                onChange={e => this.setState({ age: e.target.value })} />
                                        </div>
                                    </fieldset>                                    <fieldset className="d-flex">
                                        <div className="form-group d-grid">
                                            <label htmlFor="email">Email</label>
                                            <input type="email"
                                                id="email"
                                                value={this.state.email}
                                                onChange={e => this.setState({ email: e.target.value })} />
                                        </div>
                                        <div className="form-group d-grid">
                                            <label htmlFor="phoneNumber">Phone Number</label>
                                            <input type="tel"
                                                id="phoneNumber"
                                                value={this.state.phoneNumber}
                                                onChange={e => this.setState({ phoneNumber: e.target.value })} />
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="trainerBody">
                    <h2>Credentials</h2>
                    <this.ListItems items={this.state.credentials} />
                    <h2>Workouts</h2>
                    <this.ListItems items={this.state.workouts} />
                </div>
                <button className="btn btn-primary"
                    onClick={this.onSaveSubmit}>Save Changes</button>
                <Link to="/TrainerHomePage">
                    <button className="btn btn-danger">Cancel</button>
                </Link>
            </div>
        )
    }
}
