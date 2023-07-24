// HomePage.js
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
let token = "";
const logo = require('./favicon0.png');
export let FinToken = axios.defaults.headers.common['Authorization'] = null;

export const HomePage = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUserExist, setIsUserExist] = useState(false);
  const [searchError, setSearchError] = useState('');

  const LogIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://servergc.onrender.com/login', { username, password });
       localStorage.setItem('username',username)
       token = response.data;
       token = token.token
      if (token) {
        FinToken = axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('token', FinToken.toString())
        setIsUserExist(true);
        setSearchError('');
        window.location.href = "/modify"
        
      } else {
        setIsUserExist(false);
        setSearchError('Invalid username or password');
      }
    } catch (error) {
      setSearchError('Server error');
      setIsUserExist(false);
      alert("FailLogin")
    }
  };

  return (
  <div>
  <Link to = "/" class="logout"><button><h3><b>Home</b></h3></button></Link>
  <img src={logo} class="logo" />  

  <div class = "login-box">
    <form onSubmit = {LogIn}>
    <h2>Log In:</h2>

      <div class="user-box">
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <label>Username</label>
      </div>

      <div class="user-box">
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <label>Password</label>
      </div>
      <button class='btn'>Submit</button>
        
    </form>   

    {isUserExist ? (
          console.log("userislogin")
        ) : (
          console.log(searchError)
        )}
    
  </div>
  
</div>
  
)};

export default HomePage;
