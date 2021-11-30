import axios from "axios";

axios.defaults.withCredentials = true;

export class GymRepository{
    //remember to change URL 
    url = 'http://localhost:8000';

    config = {
        withCredentials: true
    };

    getGyms(){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/api/d/gymInfo`, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    reject(error);
                });
        })
    }

    getGym(gymID){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/api/getGyms/${gymID}`, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    reject(error);
                })
        })
    }

}