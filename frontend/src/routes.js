
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import Home from './components/Home/Home';
import GymOwnerHomePage from './components/GymOwnerHomePage/GymOwnerHomePage'
import UserHomePage from './components/UserHomePage/UserHomePage';
import TrainerHomePage from './components/TrainerHomePage/TrainerHomePage';
import EditUser from './components/EditUser/EditUser';
import EditTrainer from './components/EditTrainer/EditTrainer';
import Gym from './components/Gym/Gym';


export const routes = [
    { path: '/', component: LoginForm},
    { path: '/login', component: LoginForm },
    { path: '/register', component: RegistrationForm },
    { path: '/UserHomePage' ,exact : true, component: UserHomePage},
    { path: '/TrainerHomePage' ,exact : true, component: TrainerHomePage},
    { path: '/GymOwnerHomePage' ,exact : true, component: GymOwnerHomePage},
    { path: '/UserHomePage/edit' ,exact : true, component: EditUser},
    { path: '/TrainerHomePage/edit' ,exact : true, component: EditTrainer},
    { path: '/Gym/:id' ,exact : true, component: Gym}
];
export default routes;