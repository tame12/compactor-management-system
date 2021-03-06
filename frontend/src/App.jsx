import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
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


  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const isAuthenticated = false
  // componentDidMount() {
  //   function on(event, callback) {
  //     document.addEventListener(event, (e) => callback(e.detail));
  //   }
  //   on("logged in", (data) =>
  //     setIsAuthenticated(true)
  //   )
  // }

  // function handleCallbackResponse(response) {
  //   // JSON web token: response.credential => get google acc info
  //   console.log("encoded JWT ID token: ", response.credential);
  //   var userObject = jwt_decode(response.credential);
  //   console.log(userObject);
  //   console.log("user: ", user);
  //   setUser(userObject);
  //   console.log("user Object has been set.");
  // }

  // const isAuthenticated = false

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const setUser = (data) => {
  //   // ??????? take parameter passed from Child component
  //   setIsAuthenticated(data);
  // };

  useEffect(() => {
    const token = sessionStorage.getItem("token")
    if (token !== null) {
      setIsAuthenticated(token)
    }
  });

  let loggedOutRoutes = 
    <Routes>
      {/* <Route exact path="/Login" element={<Login />} /> */}
      {/* <Route exact path="/stock-out" element={<Login setUser={setUser} />} />
      <Route exact path="/stock-in" element={<Login setUser={setUser} />} />
      <Route exact path="/logs" element={<Login setUser={setUser} />} />
      <Route exact path="/" element={<Login setUser={setUser} />} /> */}
      <Route exact path="/stock-out" element={<Login/>} />
      <Route exact path="/stock-in" element={<Login/>} />
      <Route exact path="/logs" element={<Login/>} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/" element={<Login/>} />
    </Routes>

  let guardedRoutes = 
    <Routes>
      <Route exact path="/stock-out" element={<StockOut isAuthenticated={isAuthenticated} />} />
      <Route exact path="/stock-in" element={<StockIn isAuthenticated={isAuthenticated} />} />
      <Route exact path="/logs" element={<Logs />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/" element={<Dashboard />} />
    </Routes>

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
        <NavbarComponent isAuthenticated={isAuthenticated}/>
        {isAuthenticated ? guardedRoutes: loggedOutRoutes}
      </Router>
    </div>
  );


}

// const mapStateToProps = state => {
//   return {
//     isAuthenticated: isAuthenticated(state),
//   };
// }

// export default withRouter(connect(mapStateToProps)(App));

export default App;