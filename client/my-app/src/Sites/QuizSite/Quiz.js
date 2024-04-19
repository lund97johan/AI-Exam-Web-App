import * as React from "react";
import "./Quiz.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {ReturnHeader} from "../../App";
import {ReturnFooter} from "../../App";
import { useParams } from 'react-router-dom'; // Add this line

function Quiz(){
    const { quizName } = useParams(); // Add this line
    return(
        <div className='App'>
            <ReturnHeader/>
              <div className='App-body'>
              <ReturnQuiz quizName={quizName}/> {/* Pass quizName as prop */}
            </div>
            <ReturnFooter/>
        </div>
    )
}

function ReturnQuiz({ quizName }){
    return(
        <div className='Quiz-body'>
             <h1>Here is {quizName}</h1> {/* Display the selected quiz name */}
            <div className='Quiz-nrOfQuestions' style={{gridColumn: 3}}>
                <div className='Quiz-nrOfQuestions-text'>
                    number of questions
                </div>
            </div>
            <div className="Quiz-question-number-text" style={{gridColumn: 2}}>
                <div className='Quiz-question-nr' style={{gridColumn: 2}}>
                    <h1>Question 1</h1>
                </div>
            </div>
            <div className="Quiz-question-text-container" style={{gridColumn: 2}}>
                <div className='Quiz-question' style={{gridColumn: 2}}>
                    <h2>What is the capital of Sweden?</h2>
                </div>
            </div>
            <div className="Quiz-question-container" style={{gridColumn: 2}}>
                <div className='Quiz-question-potanswer' style={{gridColumn: 2}}>
                    baghdad
                </div>
                <label className='Quiz-question-answer-box-container' style={{gridColumn: 3}}>
                    <input type="checkbox"/>
                    <span className="Quiz-question-answer-box"></span>
                </label>
            </div>
            <div className="Quiz-question-container" style={{gridColumn: 2}}>
                <div className='Quiz-question-potanswer' style={{gridColumn: 2}}>
                    damascus
                </div>
                <label className='Quiz-question-answer-box-container' style={{gridColumn: 3}}>
                    <input type="checkbox"/>
                    <span className="Quiz-question-answer-box"></span>
                </label>
            </div>
            <div className="Quiz-question-container" style={{gridColumn: 2}}>
                <div className='Quiz-question-potanswer' style={{gridColumn: 2}}>
                    mosul
                </div>
                <label className='Quiz-question-answer-box-container' style={{gridColumn: 3}}>
                    <input type="checkbox"/>
                    <span className="Quiz-question-answer-box"></span>
                </label>
            </div>
            <div className="Quiz-question-container" style={{gridColumn: 2}}>
                <div className='Quiz-question-potanswer' style={{gridColumn: 2}}>
                    cairo
                </div>
                <label className='Quiz-question-answer-box-container' style={{gridColumn: 3}}>
                    <input type="checkbox"/>
                    <span className="Quiz-question-answer-box"></span>
                </label>
            </div>
            <div className="Quiz-question-button-container-container" style={{gridColumn: 2}}>
                <div className="Quiz-question-button-container" style={{justifyContent: "left"}} id="rightbutton">
                    <button className='Quiz-button'>Previous</button>
                </div>
                <div className="Quiz-question-button-container" style={{justifyContent: "right"}} id="leftbutton">
                    <button className='Quiz-button'>Next</button>
                </div>
            </div>
            
        </div>
    )
}

function ReturnButton({moveRight, column}){
    //if move right == true, then the button should be on the right side
    //if move right == false, then the button should be on the left side
    if(moveRight){
        return(
            <div className="Quiz-question-button-container" style={{gridColumn: column, gridRow: 8, justifyContent: "left"}}>
                <button className='Quiz-button'>Previous</button>
            </div>
        )
    }else{
        return(
            <div className="Quiz-question-button-container" style={{gridColumn: column, gridRow: 8, justifyContent: "right"}}>
                <button className='Quiz-button'>Next</button>
            </div>
        )   
    }
}

export default Quiz;
