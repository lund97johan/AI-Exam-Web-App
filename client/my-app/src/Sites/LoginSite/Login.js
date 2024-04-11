
import * as React from "react";
import "./Login.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {ReturnHeader} from "../../App";
import {ReturnFooter} from "../../App";

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
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleClick() {
      navigate("/register");
    }
  
  
  
    const handleLogin = async (event)=>{
      event.preventDefault();
      const loginDetails = {username, password};
      try {
        const response = await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginDetails),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`); // Handle non-200 responses
        }
    
        const data = await response.json();
        if (data.success) {
          console.log('Login successful');
          navigate('/');
        } else {
          console.log('Login failed', data.message);
        }
      } catch (error) {
        console.error('Login error:', error);
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
            <button className='LoginButton' type='submit' onClick={handleClick}>Login</button> 
           {/* <button className='LoginButton' type='submit' onClick={handleLogin}>Login</button> */}
        </div>  
      </div>
      </div>
      
    )
  }

 export default Login;