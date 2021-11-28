
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import Home from './components/Home/Home';
import GymOwnerHomePage from './components/GymOwnerHomePage/GymOwnerHomePage'
import UserHomePage from './components/TrainerHomePage/UserHomePage';
import TrainerHomePage from './components/TrainerHomePage/TrainerHomePage';


export const routes = [
    { path: '/', component: LoginForm},
    { path: '/login', component: LoginForm },
    { path: '/register', component: RegistrationForm },
    { path: '/UserHomePage/:userID' ,exact : true, component: UserHomePage},
    { path: '/TrainerHomePage/:trainerID' ,exact : true, component: TrainerHomePage},
    { path: '/GymOwnerHomePage/:ownerID' ,exact : true, component: GymOwnerHomePage},



];
export default routes;