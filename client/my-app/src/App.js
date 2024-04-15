

import './App.css';

import { useState } from 'react';
import {Link } from "react-router-dom";
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';


function App(){
  return (
    <div className='App'>
      <ReturnHeader/>
      <div className='App-body'>
        <LoginOrRegisterColumns column={3} row ={2}/>
      </div>
      <ReturnFooter/>
       
    </div>
  )
}

function ReturnMenu(){
  return (
    <div className='Header-text'>
      <text>tjena</text>
    </div>
  )
}


function ReturnFooter(){
  return(
    <div className='App-footer'>
       <text className='Footer-text'>
          © 2024 Tenta QuizBuilder. All rights reserved.
       </text>
       <text className='Footer-text'>
        By Group 18:
       </text>
       <div className='Footer-container'>
          <text className='Footer-text'>
            Henrik Ravnborg
          </text>
          <text className='Footer-text'>
            Jesper Truedsson
          </text>
          <text className='Footer-text'>
            Johan Lund
          </text>
          <text className='Footer-text'>
            Mattias Fridsén 
          </text>
          <text className='Footer-text'>
            Nils Fritzner
          </text>
       </div>
    </div>
  )
}

function ReturnDropDown({gridColumn = 2, gridRow = 1}){
  return(
    <div className='Header-text-dropdown' style={{gridColumn: {gridColumn}}}> tjena  {/* dropdown menyers nu poggers */}
          <div className='Header-text-dropdown-content'>
            <div className='Header-text-dropdown-content-grid'>
              <text >test</text>
              <text >test</text>
              <text >test</text>
            </div>
          </div>
        </div>
  )
}

function ReturnHeader(){
  return (
    <div className='App-header'>
      <div className='Header-container'>
      <div className='Header-text-dropdown' style={{gridColumn: 1}}> tjena  {/* dropdown menyers nu poggers */}
          <div className='Header-text-dropdown-content'>
            <div className='Header-text-dropdown-content-grid'>
              <text >
                <Link to ="/quiz">
                Ta Quiz
                </Link>
                </text>
              <text >
                <Link to = "/FileUpload">
                File Upload
                </Link>
              </text>
              <text >test</text>
            </div>
          </div>
        </div>
        <div className='Header-text' style={{gridColumn: 4}}>
          <Link to ="/BotInfo">
            What can our bot do?
          </Link>
        </div>
        <div className='Header-text'>
          <Link to ="/">
            Home
          </Link>
        </div>
        <div className='Header-text'>
            <Link to='/About'>
              About
            </Link>
          </div>
        <div className='Header-text'>
          <Link to ="/contactus">
          Contact Us
          </Link>
        </div>

        <LoggedInUser/>
      </div>
    </div>
  )
}

function LoggedInUser() {
  const {user, logout} = useAuth();// Use the custom hook correctly
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function from the AuthProvider
  };
  if (!user) {
    return (
      <div className='Header-text'>
        <Link to="/login">
          Login
        </Link>
      </div>
    );
  } else {
    return (
      <div className='Header-loggedin-container'>
        <div className='Header-text'>
          <Link to="/dashboard"> {/* Assuming you have a dashboard route */}
            Welcome, {user.username} {/* Display user information */}
          </Link>
        </div>
        <div className='Header-text' onClick={handleLogout}>
          <Link to="/">
          Logout
          </Link>
        </div>
      </div>
    );
  }
}

function useLoggedInUser() {
  const { user } = useAuth();
  return user;
}

function LoginOrRegisterColumns({ column, row }) {
  return(
    <div className="testMain">
      <div className='LoginRow' style={{gridColumn: 3, gridRow: 1}}>
        <text className='LoginText'>Welcome to our AI quizbuilder website, login or register to start creating tenta quizzes</text>
      </div>
      <div className="LoginOrRegisterColumns" style={{ gridColumn: column, gridRow: row }}>
        <div className="LoginRow">
          <Link to ="/login">
          <button className="LoginButton">Login</button>
          </Link>
        </div>
        <div className="LoginRow" >
          <div className ="LoginText" style={{color: "white", fontSize: 20}}
          >OR</div>
        </div>
        <div className="LoginRow">
          <Link to ="/register">
          <button className="LoginButton">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function SetInStartBox() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      const data = await response.json();
      if (data.success){
        console.log('login successful');
      }else{
        console.log('login failed', data.message);
      }
  }catch(error){
    console.log('login error', error);
  }
};
  


  return (
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
        type ='text'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className='LoginRow'>
      <button className='LoginButton' type='submit' onClick={handleLogin}>Login</button>
      </div>
    </div>
  )
}


function LoginButton(){
  return (
    <button className='LoginButton' type='loginButton'>login</button>
  )
}

export default App;
export {ReturnHeader};
export {ReturnFooter};