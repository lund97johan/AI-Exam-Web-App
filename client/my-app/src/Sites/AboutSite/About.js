
import * as React from "react";
import "./About.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {ReturnHeader} from "../../App";
import {ReturnFooter} from "../../App";

function About(){
  return(
      <div className='App'>
          <ReturnHeader/>
          <div className='App-body'>
              <div className="about-main">
                  <div className="hello-textbox">
                      <p>Welcome to aiwebexam.com, your one-stop destination for quiz summaries!

                      Our website is designed to help students like you get a clear understanding of various quizzes and assessments you might encounter throughout your academic journey. Whether you're preparing for exams, looking to brush up on your knowledge, or simply curious about different subjects, we've got you covered.

                      At aiwebexam.com, we believe that concise summaries are key to effective learning. Instead of sifting through lengthy textbooks or lecture notes, our summaries provide you with the essential information you need to know. Think of us as your personal study companion, simplifying complex topics into digestible chunks.</p>
                  </div>
                  <ReturnBilderBoxes/>
              </div>
          </div>
          <ReturnFooter/>
      </div>
  )
}

function ReturnBilderBoxes() {
    return (
        <div className="about-rightside">
            <div className="about-rightside-containers">
                <div className="picture-box-container">
                    <div className="picture-box">
                        <img src="../Henrik.jpg" alt="Hänki" className="quiz-image-hanki"/>
                        <p className="quiz-text">Hänki</p>
                    </div>
                </div>
                <div className="picture-box-container">
                    <div className="picture-box">
                        <img src="../Johan.jpg" alt="john" className="quiz-image"/>
                        <p className="quiz-text">John</p>
                    </div>
                </div>
            </div>
            <div className="about-rightside-containers">
                <div className="picture-box-container">
                    <div className="picture-box">
                        <img src="../Jesper.jpg" alt="jeppe" className="quiz-image"/>
                        <p className="quiz-text">Jeppe</p>
                    </div>
                </div>
                <div className="picture-box-container">
                    <div className="picture-box">
                        <img src="../Nils.jpg" alt="nils" className="quiz-image"/>
                        <p className="quiz-text">Nilsfri</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function SetInStartBox() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
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
        <button className='LoginButton' type='submit' onClick={handleLogin}>Login</button>
        </div>
      </div>
      </div>
      
    )
  }

 export default About;