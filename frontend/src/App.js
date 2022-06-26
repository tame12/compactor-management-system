import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// Components
import NavbarComponent from './components/Navbar';
// Views
import Dashboard from './UI/views/Dashboard';
import Logs from './UI/views/Logs';
import StockIn from './UI/views/StockIn';
import StockOut from './UI/views/StockOut';
import Login from './UI/views/Login';
// require('dotenv').config()


// console.log(process.env)
// console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID)

// import { useEffect, useState } from 'react';
// import jwt_decode from "jwt-decode"

// const google = window.google;

function App() {
  // state isnt good for using across components, if authentication system is outside of google use global state/redox/cache instead of state.
  // const [ user, setUser ] = useState({});

  // function handleCallbackResponse(response){
  //   // JSON web token: response.credential => get google acc info
  //   console.log("encoded JWT ID token: ", response.credential);
  //   var userObject = jwt_decode(response.credential);
  //   console.log(userObject);
  //   setUser(userObject);
  // }

  // useEffect(() =>{
  //   // global google
  //   google.accounts.id.initialize({
  //     client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  //     callback: handleCallbackResponse
  //   });
  //   // if we have no user: sign in button
  //   // if we have a user: show the logout button
  //   google.accounts.id.renderButton(
  //     document.getElementById("signInDiv"),
  //     { theme: "outline", size:"large" }
  //   );

  // }, [] );

  return (
    <div className="App">
      {/* <div id="signInDiv"></div>
      {
        user &&
        <div>
          <img src = {user.picture} alt={user.name}></img>
          <h3>{user.name}</h3>
        </div>
      } */}
      <Router>
        <NavbarComponent/>
        <Routes>
          <Route exact path="/" element={<Dashboard/>}/>
          <Route exact path="/stock-out" element={<StockOut/>}/>
          <Route exact path="/stock-in" element={<StockIn/>}/>
          <Route exact path="/logs" element={<Logs/>}/>
          <Route exact path="/Login" element={<Login/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
