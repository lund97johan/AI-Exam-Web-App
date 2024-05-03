
import * as React from "react";
import "./Login.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {ReturnHeader} from "../../App";
import {ReturnFooter} from "../../App";
import { useAuth } from '../../AuthProvider';

function Login(){
    return(
        <div className='App'>
            <ReturnHeader/>
              <div className='App-body'>
                <SetInStartBox/>
              </div>
            <ReturnFooter/>
        </div>
      )
}

function SetInStartBox() {
  const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleClick() {
      navigate("/register");
    }
  
  
  
    const handleLogin = async (event) => {
      event.preventDefault();
      const loginDetails = { username, password };
      try {
          const response = await fetch('/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(loginDetails),
          });
  
          const data = await response.json(); // Parse JSON response
          if (response.ok && data.success) {
              if (data.user) {
                  login(data.user); // Login user with the data received
                  navigate('/dashboard'); // Redirect to home page
              } else {
                  alert('Login successful but no user data returned');
              }
          } else {
              alert(data.message || 'Login failed'); // Show error message
          }
      } catch (error) {
          console.error('Login error:', error);
          alert('Network or server error');
      }
  };
  
    
  
  
    return (
      <div className="testMain">
<div className='StartLoginBox' >
        <div className='LoginRow'>
          <text className='LoginText'>login</text>
        </div>
        <div className='LoginRow'>
          <input 
          className='StartLoginInput'
          type='text'
          placeholder='User Name'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='LoginRow'>
          <input
          className='StartLoginInput'
          type ='password'
          placeholder='Password'
          value={password}
          
          onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='LoginRow'>
        <button className='LoginButton' type='submit' onClick={handleLogin}>Login</button>
           {/*  <button className='LoginButton' type='submit' onClick={handleClick}>Login</button> */}
        </div>  
      </div>
      </div>
      
    )
  }

 export default Login;