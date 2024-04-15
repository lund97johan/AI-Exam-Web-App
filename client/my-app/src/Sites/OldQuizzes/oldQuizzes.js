
import * as React from "react";
import "./oldQuizzes.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {ReturnHeader} from "../../App";
import {ReturnFooter} from "../../App";

function OldQuizzes() {
  return (
    <div className='App'>
    <ReturnHeader />
    <div className='App-body'>
      <div className="quiz-container">
        <div className="quiz-item">
          <div className="quiz-input">
            <input
              className='quiz'
              type='text'
              placeholder='Quiz 1'
              disabled
            />
            <button className='quiz-button'>TA Quiz</button>
          </div>
          <button className='remove-button'>Remove Quiz</button>
        </div>
        <div className="quiz-item">
          <div className="quiz-input">
            <input
              className='quiz'
              type='text'
              placeholder='Quiz 2'
              disabled
            />
            <button className='quiz-button'>TA Quiz</button>
          </div>
          <button className='remove-button'>Remove Quiz</button>
        </div>
        <div className="quiz-item">
          <div className="quiz-input">
            <input
              className='quiz'
              type='text'
              placeholder='Quiz 3'
              disabled
            />
            <button className='quiz-button'>TA Quiz</button>
          </div>
          <button className='remove-button'>Remove Quiz</button>
        </div>
      </div>
    </div>
    <ReturnFooter />
  </div>
);
}

/*

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
  }*/

 export default OldQuizzes;