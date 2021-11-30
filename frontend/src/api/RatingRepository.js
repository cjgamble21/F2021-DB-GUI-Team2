import axios from "axios";

axios.defaults.withCredentials = true;

export class RatingRepository{
    //remember to change URL 
    url = 'ec2-3-139-91-59.us-east-2.compute.amazonaws.com:8000';

    config = {
        withCredentials: true
    };

    

    getRatings(gymID){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/api/d/reviews/gymID/${gymID}`, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    reject(error);
                })
        })
    }

}