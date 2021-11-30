import axios from "axios";

axios.defaults.withCredentials = true;

export class RatingRepository{
    //remember to change URL 
    url = 'http://localhost:8000';

    config = {
        withCredentials: true
    };

    

    getRatings(gymID){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/api/getRatings/${gymID}`, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    reject(error);
                })
        })
    }

}