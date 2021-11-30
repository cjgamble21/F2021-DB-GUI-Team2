import axios from "axios";

axios.defaults.withCredentials = true;

export class TrainerRepository {
    //remember to change URL 
    url = 'http://localhost:8000';

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
            axios.get(`${this.url}/api/getTrainers`, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    reject(error);
                });
        })
    }

    getTrainer(trainerToken){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/api/TrainerDashboard`, {
                params: { token: trainerToken }
            })
                .then(x => resolve(x.data && x.data.length === 1 ? x.data[0] : undefined))
                .catch(error => {
                    reject(error);
                });
        })
    }

    getTrainerByID(trainerId){
        return new Promise((resolve, reject) => {
            let body = {profileID: trainerId};
            axios.get(`${this.url}/api/getTrainers`, body, this.config)
                .then(x => resolve(x.data ? x.data[0] : undefined))
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

    updateTrainer(firstName, lastName, age, gender, phone, email, pfp, description){
        return new Promise((resolve, reject) => {
            let body = {
                firstName : firstName,
                lastName: lastName,
                age: age,
                gender: gender,
                phone: phone,
                email: email,
                pfp: pfp,
                description: description
            }
            axios.put(`${this.url}/api/TrainerDashboard/edit?token=${localStorage.token}`,body,this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert("Error updating profile!");
                    reject(error);
                });
        });
    }

}