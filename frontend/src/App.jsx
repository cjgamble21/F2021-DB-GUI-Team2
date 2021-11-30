import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import Home from './components/Home/Home';
import GymOwnerHomePage from './components/GymOwnerHomePage/GymOwnerHomePage'
import TrainerHomePage from './components/TrainerHomePage/TrainerHomePage';
import UserHomePage from './components/UserHomePage/UserHomePage';
import Gym from './components/Gym/Gym';
import EditTrainer from './components/EditTrainer/EditTrainer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AlertComponent from './components/AlertComponent/AlertComponent'; 
import { routes } from './routes';


// React functional component
function App () {

  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);

  // state for storage of the information on the webpage of forms and list, uses hooks
  const [number, setNumber] = useState("")
  const [values, setValues] = useState([])

  // ENTER YOUR EC2 PUBLIC IP/URL HERE
  const ec2_url = ''
  // CHANGE THIS TO TRUE IF HOSTING ON EC2, MAKE SURE TO ADD IP/URL ABOVE
  const ec2 = false;
  // USE localhost OR ec2_url ACCORDING TO ENVIRONMENT
  const url = ec2 ? ec2_url : 'localhost'

  return (
    <Router>
    <div className="App">
    {/* <GymOwnerHomePage></GymOwnerHomePage> */}
        <div className="container d-flex align-items-center flex-column">
          <Route component={Header}></Route>
          <Switch>
          { routes.map((route, index) => <Route key={ index } exact { ...route }></Route>) }
          
          </Switch>
          <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
        </div>
    </div>
    </Router>
  );
}

export default App;