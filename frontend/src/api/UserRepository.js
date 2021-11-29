import axios from "axios";

axios.defaults.withCredentials = true;

export class UserRepository {
    //remember to change URL 
    url = 'http://localhost:8000';

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

    updateUser(firstName, lastName, age, gender, phone, email,description,profileID){
        return new Promise((resolve, reject) => {
            let body = {

                firstName : firstName,
                lastName: lastName,
                age: age,
                gender: gender,
                phone: phone,
                email: email,
                description: description,
                userID: profileID

            }
            axios.put(`${this.url}/api/UserDashboard/edit`,body,this.config)
                
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
            console.log(body);
            axios.post(`${this.url}/api/register`, body, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert("Error creating user!");
                    reject(error);
                });
        });
    }



}