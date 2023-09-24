import { useState } from "react";
import "./App.css";
import axios from "axios";
// Notes:
//1-We need to grab info from the registration input , you can search how to do that using UseState
//2-Send that info to the backend by creating a route #endpoint where it send that data to our mysql database
//3-use axios to make http request whenever the button register is clicked to send the info to the backend to be sent to the database
//Registration Process Finished
//Login Process
//1-Grab info from the login input
//2-Send that info to the backend after the login button is clicked where our endpoint checks if the info exists in the db if not sends console.logs an error
//Adding Security
//1-hash password using bcrypt dependency , hash password using it then store it hashed and use saltRounds for better security
//2-For login use bcrypt.compare funcion
function App() {
  const [regiUsername, setRegiUsername] = useState("");
  const [regiPassword, setRegiPassword] = useState("");
  const [logUsername, setLogUsername] = useState("");
  const [logPassword, setLogPassword] = useState("");
  const regiData = {
    username: regiUsername,
    password: regiPassword,
  };
  const logData = {
    username: logUsername,
    password: logPassword,
  };
  const login = (data) => {
    axios
      .post("http://localhost:3001/auth/login", data)
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const register = (data) => {
    axios
      .post(`http://localhost:3001/auth`, data)
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="register">
        <h2>Registration</h2>
        <input
          placeholder="Username..."
          type="text"
          onChange={(event) => {
            setRegiUsername(event.target.value);
          }}
        ></input>
        <input
          placeholder="Password..."
          type="password"
          onChange={(event) => {
            setRegiPassword(event.target.value);
          }}
        ></input>
        <button onClick={() => register(regiData)} type="submit">
          Register
        </button>
      </div>
      <div className="login">
        <h2>Sign In</h2>
        <input
          placeholder="Username..."
          type="text"
          onChange={(event) => {
            setLogUsername(event.target.value);
          }}
        ></input>
        <input
          placeholder="Password..."
          type="password"
          onChange={(event) => {
            setLogPassword(event.target.value);
          }}
        ></input>
        <button type="submit" onClick={() => login(logData)}>
          Sign In
        </button>
      </div>
    </div>
  );
}

export default App;
