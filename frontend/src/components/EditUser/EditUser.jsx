// import React, { useState } from 'react';
// import { withRouter } from "react-router-dom";
// import './EditUser.css';


// export class EditUser extends React.Component{





//     render(){

//         return(
//             <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
//                 <form>
//                     <div className="form-group text-left">
//                         <br/>
//                         <label htmlFor="exampleUserType">User Type</label>
//                         <br/>
//                         <select className="User Type" 
//                             id="userType"
//                             value={state.userType} 
//                             onChange={handleChange}>
//                             <option value="">choose an option</option>
//                             <option value="1">Member</option>
//                             <option value="3">Owner</option>
//                             <option value="2">Trainer</option>
//                         </select>
//                     </div>
//                     <div className="form-group text-left">
//                         <label htmlFor="username">Username</label>
//                         <input type="username" 
//                            className="form-control" 
//                            id="username" 
//                            aria-describedby="usernameHelp" 
//                            placeholder="Enter username" 
//                            onChange={handleChange}
//                     />
//                     </div>
//                     <div className="form-group text-left">
//                         <label htmlFor="password">Password</label>
//                         <input type="password" 
//                             className="form-control" 
//                             id="password" 
//                             placeholder="Password"
//                             value={state.password}
//                             onChange={handleChange} 
//                         />
//                     </div>
//                     <div className="form-group text-left">
//                         <label htmlFor="confirmPassword">Confirm Password</label>
//                         <input type="password" 
//                             className="form-control" 
//                             id="confirmPassword" 
//                             placeholder="Confirm Password"
//                             value={state.confirmPassword}
//                             onChange={handleChange} 
//                         />
//                     </div>
//                     <div className="form-group text-left">
//                         <label htmlFor="firstName">First Name</label>
//                         <input type="firstName" 
//                             className="form-control" 
//                             id="firstName" 
//                             placeholder="Enter First Name"
//                             value={state.firstName}
//                             onChange={handleChange} 
//                         />
//                     </div>
//                     <div className="form-group text-left">
//                         <label htmlFor="lastName">Last Name</label>
//                         <input type="lastName" 
//                             className="form-control" 
//                             id="lastName" 
//                             placeholder="Enter Last Name"
//                             value={state.lastName}
//                             onChange={handleChange} 
//                         />
//                     </div>
//                     <div className="form-group text-left">
//                         <label htmlFor="birthday">Age</label>
//                         <input type="age"
//                             className = "form-control"
//                             id = "age"
//                             placeholder="Enter Age"
//                             value = {state.age}
//                             onChange = {handleChange}
//                             />
//                     </div>
//                     <div className="form-group text-left">
//                         <label htmlFor="gender">Gender</label>
//                         <input type="gender" 
//                             className="form-control" 
//                             id="gender" 
//                             placeholder="Enter Gender"
//                             value={state.gender}
//                             onChange={handleChange} 
//                         />
//                     </div>
//                     <div className="form-group text-left">
//                         <label htmlFor="phone">Phone Number</label>
//                         <input type="phoneNumber" 
//                             className="form-control" 
//                             id="phone" 
//                             placeholder="Enter Phone Number"
//                             value={state.phone}
//                             onChange={handleChange} 
//                         />
//                     </div>
//                     <div className="form-group text-left">
//                         <label htmlFor="email">Email</label>
//                         <input type="email" 
//                             className="form-control" 
//                             id="email" 
//                             placeholder="Enter email"
//                             value={state.email}
//                             onChange={handleChange} 
//                         />
//                     </div>
//                     <div className="form-group text-left">
//                         <label htmlFor="description">Description</label>
//                         <input type="description" 
//                             className="form-control" 
//                             id="description" 
//                             placeholder="Tell us about yourself!"
//                             value={state.description}
//                             onChange={handleChange} 
//                         />
//                     </div>
//                     <button 
//                         type="submit" 
//                         className="btn btn-primary"
//                         onClick={handleSubmitClick}
//                     >
//                         Register
//                     </button>
//                 </form>
//                 <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
//                     {state.successMessage}
//                 </div>
//                 <div className="mt-2">
//                     <span>Already have an account? </span>
//                     <span className="loginText" onClick={() => redirectToLogin()}>Login here</span> 
//                 </div>
                
//             </div>
//         )
        
//     }

// }
// export default withRouter(EditUser);