import axios from "axios";

axios.defaults.withCredentials = true;

export class GymRepository{
    //remember to change URL 
    url = 'ec2-3-139-91-59.us-east-2.compute.amazonaws.com:8000';

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
            axios.get(`${this.url}/api/d/gymInfo/${gymID}`, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    reject(error);
                })
        })
    }

    getAmenities(){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/api/d/amenities`, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    reject(error);
                })
        })

    }



}