import axios from "axios";

axios.defaults.withCredentials = true;

export class UserRepository {
    //remember to change URL 
    url = 'http://ec2-3-139-91-59.us-east-2.compute.amazonaws.com:8000';

    config = {
        withCredentials: true
    };

    getUser(userToken){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/api/UserDashboard`, {
                params: { token: userToken }
            })
                .then(x => resolve(x.data && x.data.length === 1 ? x.data[0] : undefined))
                .catch(error => {
                    reject(error);
                });
        })
    }

    getUserByID(userID){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/api/d/profiles/${userID}`, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    reject(error);
                });
        })
    }

    getUserSessions(userToken){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/api/UserSessions`, {
                params: { token: userToken }
            })
                .then(x => resolve(x.data))
                .catch(error => {
                    reject(error);
                });
        })
    }

    updateUser(firstName, lastName, age, gender, phone, email,description,pfp){
        return new Promise((resolve, reject) => {
            let body = {

                firstName : firstName,
                lastName: lastName,
                age: age,
                gender: gender,
                phone: phone,
                email: email,
                description: description,
                pfp:pfp
                

            }
            console.log(localStorage.token)
            console.log(firstName)
            axios.put(`${this.url}/api/UserDashboard/edit?token=${localStorage.token}`,body,this.config)
                
                .then(x => resolve(x.data))
                .catch(error => {
                    alert("Error updating profile!");
                    reject(error);
                });
        });
    }

    createUser(username,password,userType,firstName,lastName,age,gender,phone,email,pfp,description) {
        return new Promise((resolve, reject) => {
            let body = {
                username: username,
                password: password,
                firstName: firstName,
                userType: userType,
                lastName: lastName,
                age: age,
                gender: gender,
                phone: phone,
                email: email,
                pfp: pfp,
                description: description
            };
            
            axios.post(`${this.url}/api/register`, body, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert("Error creating user!");
                    reject(error);
                });
        });
    }



}