import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode"
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

import login_image from "../img/login-page.png";

const google = window.google;

// require('dotenv').config()

// please dont print me when pushing cos its automatically deployed into a public URL :c
// console.log(process.env)
// console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID)

const Login = (props) => {
  // state isnt good for using across components, if authentication system is outside of google use global state/redux/cache instead of state.
  // const [ user, setUser ] = useState({});
  const [isLoggedIn, setIsLoggedin] = useState()
  
  function handleCallbackResponse(response){
    // JSON web token: response.credential => get google acc info
    // console.log("encoded JWT ID token: ", response.credential);
    var userObject = jwt_decode(response.credential);
    // console.log(userObject);
    // console.log("user: ",user);
    // setUser(userObject);
    // console.log("user Object has been set.");
    // props.setUser(response.credential)
    sessionStorage.setItem("token", response.credential)
    window.location.reload(true)
  }

  const callbackLogout = (e) => {
    // console.log('logout')
    sessionStorage.removeItem("token")
    window.location.reload(true)
  }

  useEffect(() =>{

    const token = sessionStorage.getItem("token")
    if (token === null) {

      // global google
      google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleCallbackResponse
      });
      // if we have no user: sign in button
      // if we have a user: show the logout button
      google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outline", size:"large" }
      );
      setIsLoggedin(false)
    } else {
      setIsLoggedin(true)
    }

  }, [] );
  
  if(!isLoggedIn){
  return (
    <div className="App">
        <div className="container border-0 mt-5">
          <div className="row">
            <div className="col-md-7 d-md-block d-none">
              <img src={login_image} alt={"not found"} className="w-100"></img>
            </div>
            <div className="col-md-5 ">
              <div className="container bg-light border-light rounded h-100">
                <div className="row text-center pt-5 text-secondary"><h1>WELCOME</h1></div>
                <div className="row text-center"><p>Login to your <em>gmail account</em> here</p></div>
                <div id="signInDiv" className="btn d-flex justify-content-center align-items-center" type="button"> </div>
              </div>
            </div>
          </div>
        </div>
      {/* {
        user &&
        <div>
          <img src = {user.picture} alt={user.name} ></img>
          <h3>{user.name}</h3>
        </div>
      } */}
    </div>
  );
  } else {
  return (
    <div className="App">
      <div className="container border-0 mt-5">
        <div className="row">
          <div className="col-md-7 d-md-block d-none">
            <img src={login_image} alt={"not found"} className="w-100"></img>
          </div>
          <div className="col-md-5 ">
            <div className="container bg-light border-light rounded h-100">
              {/* <div className="row text-center pt-5 text-secondary"><h1>WELCOME</h1></div>
              <div className="row text-center"><p>Login to your <em>gmail account</em> here</p></div>
              <div id="signInDiv" className="btn d-flex justify-content-center align-items-center" type="button"> </div> */}
              {/* <div> Thanks for stopping by, we hope to see you again :)</div> */}
              <div className="btn d-flex justify-content-center align-items-center btn-secondary" type="button" onClick={callbackLogout}>
                Logout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  }
}

export default Login