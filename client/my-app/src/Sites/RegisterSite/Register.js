import * as React from "react";
import "./Register.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {ReturnHeader} from "../../App";
import {ReturnFooter} from "../../App";
import { useAuth } from '../../AuthProvider';

function Register(){
    return(
        <div className='App'>
            <ReturnHeader/>
              <div className='App-body'>
                <ReturnRegister/>
            </div>
            <ReturnFooter/>
        </div>
    )
}

function ReturnRegister(){
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    function showPassword() {
        var x = document.getElementById("TheSecretPassword");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    const handleRegister = async (event)=>{
        event.preventDefault();
        const registerDetails = {username, email, firstName, lastName, password};
        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerDetails),
            });

            const data = await response.json();
            if (data.success) {
                console.log('Register successful');
                login(data.user);
                navigate('/');
            } else {
                console.log('Register failed:', data.message);
                alert(data.message);  // Display error message to the user
            }
        } catch (error) {
            console.error('Register error:', error);
        }
    };

    return (
        <div className='Register-main'>
            <div className="RegisterTitleContainer">
                <div className="RegisterTitle">Register</div>
            </div>
            <div className="RegisterBox">  
                <div className='RegisterRow' style={{gridColumn: 1}}>
                    <div className='RegisterText'>First Name:</div>
                </div>
                <div className='RegisterRow' style={{gridColumn: 2}}>
                    <input className="Registerbox-default" 
                    type="text"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}>
                    </input>
                </div>
                <div className='RegisterRow' style={{gridColumn: 1}}>
                    <div className='RegisterText'>Last Name:</div>
                </div>
                <div className='RegisterRow' style={{gridColumn: 2}}>
                <input className="Registerbox-default" 
                    type="text"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}>
                    </input>
                </div>
                <div className='RegisterRow' style={{gridColumn: 1}}>
                    <div className='RegisterText'>Email:</div>
                </div>
                <div className='RegisterRow' style={{gridColumn: 2}}>
                <input className="Registerbox-default" 
                    type="text"
                    placeholder="JohnDoe@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}>
                    </input>
                </div>
                <div className='RegisterRow' style={{gridColumn: 1}}>
                    <div className='RegisterText'>Username:</div>
                </div>
                <div className='RegisterRow' style={{gridColumn: 2}}>
                    <input className="Registerbox-default" 
                    type="text"
                    placeholder="John123"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}>
                    </input>
                </div>
                <div className='RegisterRow' style={{gridColumn: 1}}>
                    <div className='RegisterText'>Password:</div>
                </div>
                <div className='RegisterRow' style={{gridColumn: 2}}>
                <input className="Registerbox-default" 
                    type="password"
                    placeholder="MySecretPassword"
                    value={password}
                    id="TheSecretPassword"
                    onChange={(e) => setPassword(e.target.value)}>
                    </input>
                </div>
                <div className='RegisterRowCheckBox' style={{gridColumn: 3}}>
                    <input type="checkbox" onClick={showPassword}/> show password
                </div>

                <div className='RegisterRow' style={{gridColumn: 2}}>
                    <button className='RegisterButton' type='submit' onClick={handleRegister}>Register</button>
                </div>
            </div>
        </div>
    )
}

export default Register;