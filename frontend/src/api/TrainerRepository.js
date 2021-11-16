import axios from "axios";

axios.defaults.withCredentials = true;

export class PostsRepository {

    url = 'http://ec2-3-128-160-107.us-east-2.compute.amazonaws.com:8000';

    config = {
        withCredentials: true
    };

    createTrainer(trainerID, firstName, lastName, age, gender, phone, email, pfp, description) {
        return new Promise((resolve, reject) => {
            let body = {
                TrainerID : trainerID,
                FirstName: firstName,
                LastName: lastName,
                Age: age,
                Gender: gender,
                Phone: phone,
                Email: email,
                Pfp: pfp,
                Description: description
            };

            axios.post(`${this.url}/createTrainer`, body, this.config)
                .then(x => resolve())
                .catch(error => reject(error));
        })
    }

    getTrainers() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/trainers`, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    reject(error);
                });
        })
    }

    getTrainer(trainerID){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/trainersByID/` + trainerID, this.config)
                .then(x => resolve(x.data && x.data.length === 1 ? x.data[0] : undefined))
                .catch(error => {
                    reject(error);
                });
        })
    }

    deleteTrainer(trainerID){
        return new Promise((resolve, reject) => {
            axios.delete(`${this.url}/trainer/${trainerID}/delete`, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert("Error deleting trainer!");
                    reject(error);
                });
        });
    }

    updateTrainer(trainerID, firstName, lastName, age, gender, phone, email, pfp, description){
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