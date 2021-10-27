import React, { useState } from 'react';
import axios from 'axios';
import './GymOwnerHomePage.css';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";

<<<<<<< Updated upstream
function GymOwnerHomePage(props) {}
=======
function GymOwnerHomePage(props) {
    const [state , setState] = useState({
        username : "",
        gymnname : "",
        description : "",
        amenities : null,
        PTs : null
    })
    const loadData = (e) => {
        axios.get(API_BASE_URL, { headers: { 'token': localStorage.getItem(ACCESS_TOKEN_NAME) }})
        .then(function (response) {
            if(response.status !== 200){
              redirectToLogin()
            }
        })
        .catch(function (error) {
          redirectToLogin()
        });
    }
    const redirectToLogin = () => {
      props.updateTitle('Login')
      props.history.push('/login'); 
    }
    return(
      <div className="GymPage">
        
      </div>
    )
}
>>>>>>> Stashed changes
export default withRouter(GymOwnerHomePage);