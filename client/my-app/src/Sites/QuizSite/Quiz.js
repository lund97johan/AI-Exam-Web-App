import * as React from "react";
import "./Quiz.css";
import {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom'; //  Link
import {ReturnHeader} from "../../App";
import {ReturnFooter} from "../../App";
import {useAuth} from "../../AuthProvider";
import { useParams } from 'react-router-dom';


function Quiz(){
    return(
        <div className='App'>
            <ReturnHeader/>
              <div className='App-body'>
                <ReturnQuiz/>
            </div>
            <ReturnFooter/>
        </div>
    )
}
function ReturnQuiz() {
    const { quizId } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // For navigating questions

    useEffect(() => {
        if (!user) {
            console.log("Redirecting because no user is logged in.");
            navigate("/login");
            return;
        }

        const fetchQuiz = async () => {
            try {
                const response = await fetch(`/getQuizDetailed/${quizId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                if (response.ok) {
                    setQuiz(data.quiz);
                } else {
                    console.error(data.message || 'Failed to fetch quiz');
                }
            } catch (error) {
                console.error('Network or server error', error);
            }
        };

        fetchQuiz();
    }, [quizId, user, navigate]);

    if (!quiz) {
        return <div>Loading...</div>;
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];

    return (
        <div className='Quiz-body'>
            <div className='Quiz-nrOfQuestions' style={{ gridColumn: 3 }}>
                <div className='Quiz-nrOfQuestions-text'>
                    Number of questions: {quiz.questions.length}
                </div>
            </div>
            <div className="Quiz-question-number-text" style={{ gridColumn: 2 }}>
                <div className='Quiz-question-nr' style={{ gridColumn: 2 }}>
                    <h1>Question {currentQuestionIndex + 1}</h1>
                </div>
            </div>
            <div className="Quiz-question-text-container" style={{ gridColumn: 2 }}>
                <div className='Quiz-question' style={{ gridColumn: 2 }}>
                    <h2>{currentQuestion.text}</h2>
                </div>
            </div>
            {currentQuestion.answers.map((answer, index) => (
                <div key={index} className="Quiz-question-container" style={{ gridColumn: 2 }}>
                    <div className='Quiz-question-potanswer' style={{ gridColumn: 2 }}>
                        {answer.text}
                    </div>
                    <label className='Quiz-question-answer-box-container' style={{ gridColumn: 3 }}>
                        <input type="checkbox" name={`question_${currentQuestion.id}`} value={answer.id} />
                        <span className="Quiz-question-answer-box"></span>
                    </label>
                </div>
            ))}
            <div className="Quiz-question-button-container-container" style={{ gridColumn: 2 }}>
                <div className="Quiz-question-button-container" style={{ justifyContent: "left" }} id="rightbutton">
                    <button className='Quiz-button' onClick={() => setCurrentQuestionIndex(Math.max(currentQuestionIndex - 1, 0))}>Previous</button>
                </div>
                <div className="Quiz-question-button-container" style={{ justifyContent: "right" }} id="leftbutton">
                    <button className='Quiz-button' onClick={() => setCurrentQuestionIndex(Math.min(currentQuestionIndex + 1, quiz.questions.length - 1))}>Next</button>
                </div>
            </div>
        </div>
    );
}


/*
function ReturnQuiz(){
    const {quizId} = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    useEffect(() => {
        if (!user) {
            console.log("Redirecting because no user is logged in.");
            navigate("/login");
            return;
        }

        const fetchQuiz = async () => {
            try {
                const response = await fetch(`/getQuizDetailed/${quizId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                if (response.ok) {
                    setQuiz(data.quiz);
                    const initialAnswers = {};
                    data.quiz.questions.forEach((question) => {
                        initialAnswers[question.id] = null;
                    });
                } else {
                    console.error(data.message || 'Failed to fetch quiz');
                }
            } catch (error) {
                console.error('Network or server error', error);
            }
        };
    });

    return(
        <div className='Quiz-body'>
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
*/


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
