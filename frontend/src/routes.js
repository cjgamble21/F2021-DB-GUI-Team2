
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import Home from './components/Home/Home';
import GymOwnerHomePage from './components/GymOwnerHomePage/GymOwnerHomePage'
import UserHomePage from './components/TrainerHomePage/UserHomePage';
import TrainerHomePage from './components/TrainerHomePage/TrainerHomePage';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AlertComponent from './components/AlertComponent/AlertComponent'; 

export const routes = [
    { path: '/', component: LoginForm},
    { path: '/login', component: LoginForm },
    { path: '/register', component: RegistrationForm },
    { path: '/UserHomePage/:userID' ,exact : true, component: UserHomePage},
    { path: '/TrainerHomePage/:trainerID' ,exact : true, component: TrainerHomepage},


];
export default routes;