import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode"

const google = window.google;
// require('dotenv').config()
console.log(process.env)
console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID)


const Login = () => {
  // state isnt good for using across components, if authentication system is outside of google use global state/redox/cache instead of state.
  const [ user, setUser ] = useState({});
  
  function handleCallbackResponse(response){
    // JSON web token: response.credential => get google acc info
    console.log("encoded JWT ID token: ", response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
  }

  useEffect(() =>{
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

  }, [] );

  return (
    <div className="App">
      <div id="signInDiv"></div>
      {
        user &&
        <div>
          <img src = {user.picture} alt={user.name} ></img>
          <h3>{user.name}</h3>
        </div>
      }
    </div>
  );
}

export default Login