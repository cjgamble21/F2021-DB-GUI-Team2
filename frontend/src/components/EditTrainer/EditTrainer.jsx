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
        this.state.workouts = ["bench press", "squats"];
        this.state.trainerId="";
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
                    this.setState({ email: accArray.email });
                if (accArray.pfp)
                this.setState({ pfp: accArray.pfp });
                if (accArray.description)
                    this.setState({ description: accArray.description });
            }
        })
    }

    componentDidMount() {
        this.initalizeProfile();
    }

    handleChange = (e) => {
        const {id , value} = e.target   
        this.setState(prevState => ({
            ...prevState,
            [id] : value
        }))
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

    handleSubmitClick = (e) => {
        this.trainerRepo.updateTrainer(this.state.firstName, this.state.lastName, this.state.age, this.state.gender, this.state.phone, this.state.email, this.state.pfp, this.state.description)
            //.then(this.props.history.push('/TrainerHomePage'));
    }

    render() {
        return (
            <div id="editTrainerPage" className="mt-5">
                <div id="trainerCard">
                    <div>
                        <div id="trainerPhoto" className="justify-content-center">
                            <img src={this.state.pfp} alt="trainer-photo" className="rounded-circle w-50 m-auto mb-3" />
                            <div className="form-group">
                                <label htmlFor="pfpUrl">Profile Picture Url</label>
                                <input type="text"
                                    id="pfpUrl"
                                    className="form-control m-auto"
                                    value={this.state.pfp}
                                    onChange={this.handleChange} />                            </div>
                        </div>
                        <div id="trainerInfo">
                            <div>
                                <form>
                                    <fieldset className="d-flex justify-content-around">
                                        <div className="form-group ">
                                            <label htmlFor="firstName">First Name</label>
                                            <input type="text"
                                                id="firstName"
                                                className="form-control"
                                                value={this.state.firstName}
                                                onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group ">
                                            <label htmlFor="lastName">Last Name</label>
                                            <input type="text"
                                                id="lastName"
                                                className="form-control"
                                                value={this.state.lastName}
                                                onChange={this.handleChange} />
                                        </div>
                                    </fieldset>
                                    <fieldset className="d-flex justify-content-around">
                                        <div className="form-group ">
                                            <label htmlFor="gender">Gender</label>
                                            <select value={this.state.gender}
                                                id="gender"
                                                className="form-control"
                                                onChange={this.handleChange}>
                                                <option>M</option>
                                                <option>F</option>
                                            </select>
                                        </div>
                                        <div className="form-group ">
                                            <label htmlFor="age">Age</label>
                                            <input type="number"
                                                id="age"
                                                className="form-control"
                                                value={this.state.age}
                                                min="18"
                                                onChange={this.handleChange} />
                                        </div>
                                    </fieldset>
                                    <fieldset className="d-flex justify-content-around">
                                        <div className="form-group ">
                                            <label htmlFor="email">Email</label>
                                            <input type="text"
                                                id="email"
                                                className="form-control"
                                                value={this.state.email}
                                                onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group ">
                                            <label htmlFor="phoneNumber">Phone Number</label>
                                            <input type="tel"
                                                id="phoneNumber"
                                                className="form-control"
                                                value={this.state.phone}
                                                onChange={this.handleChange} />
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="trainerBody" className="mb-4">
                    <h2>About Me</h2>
                    <textarea className="form-control mb-5"
                        value={this.state.description}
                        onChange={this.handleChange}  />
                    <h2>Workouts</h2>
                    <this.ListItems items={this.state.workouts} />
                </div>
                <div className="d-flex justify-content-around">
                    <button className="btn btn-primary"
                        onClick={this.handleSubmitClick}>Save Changes</button>
                    <Link to="/TrainerHomePage" className="btn btn-danger">
                        Cancel
                    </Link>
                </div>
            </div>
        )
    }
}
