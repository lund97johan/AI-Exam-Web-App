

import './App.css';

import {useEffect, useState} from 'react';
import {Link } from "react-router-dom";
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';


function App(){
    const {user, logout} = useAuth();// Use the custom hook correctly
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate("/dashboard");
            return;
        }
    });
    return(
        <div className='App'>
            <ReturnHeader/>
            <div className='App-body'>
              <LoginOrRegisterColumns column={3} row={2}/>
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

function ReturnHeader() {
    const { user } = useAuth(); // Get user authentication status

    return (
        <div className='App-header'>
            <div className='Header-container'>

                <div className='Header-text' style={{gridColumn: 3}}>
                    <Link to="/BotInfo">What can our bot do?</Link>
                </div>
                <div className='Header-text'>
                    <Link to='/About'>About</Link>
                </div>
                <div className='Header-text'>
                    {/* Conditional rendering of the Home link based on user status */}
                    <Link to={user ? "/dashboard" : "/"}>
                        Home
                    </Link>
                </div>
                <div className='Header-text'>
                    <Link to="/contactus">Contact Us</Link>
                </div>
                <LoggedInUser/>
            </div>
        </div>
    );
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
        <div className='Header-text-dropdown' style={{gridColumn: 7}}>
            {user.username}'s profile {/* Dropdown menus now visible only to logged-in users */}
            <i className="arrow down"></i>
            <div className='Header-text-dropdown-content'>
                <div className='Header-text-dropdown-content-grid'>
                    <text>
                        <Link to="/dashboard">Profile</Link>
                    </text>
                    <text>
                        <Link to="/old_quizzes">Old Quizzes</Link>
                    </text>
                    <text>
                        <Link to='/' onClick={handleLogout}>Logout</Link>
                    </text>
                </div>
            </div>
        </div>
    );
  }
}

function useLoggedInUser() {
    const {user} = useAuth();
    return user;
}

function LoginOrRegisterColumns({column, row}) {
    return (
        <div className="testMain">
            <div className='LoginRow' style={{gridColumn: 3, gridRow: 1}}>
                <text className='LoginText'>Welcome to our AI quizbuilder website, login or register to start creating
                    tenta quizzes
                </text>
            </div>
            <div className="LoginOrRegisterColumns" style={{gridColumn: column, gridRow: row}}>
                <div className="LoginRow">
                    <Link to="/login">
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