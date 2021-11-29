import axios from "axios";

axios.defaults.withCredentials = true;

export class TrainerRepository {
    //remember to change URL 
    url = 'http://ec2-3-128-160-107.us-east-2.compute.amazonaws.com:8000';

    config = {
        withCredentials: true
    };

    getUser(userID){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/user/` + userID, this.config)
                .then(x => resolve(x.data && x.data.length === 1 ? x.data[0] : undefined))
                .catch(error => {
                    reject(error);
                });
        })
    }

    updateUser(userID, firstName, lastName, age, gender, phone, email, pfp, description){
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/trainer/${trainerID}/changeinfo`, {trainerID, firstName, lastName, age, gender, phone, email, pfp, description}, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert("Error updating profile!");
                    reject(error);
                });
        });
    }


}