import * as React from "react";
import "./QuizScore.css";
import {useEffect, useState} from 'react';
import {  useNavigate, useParams, useLocation } from 'react-router-dom'; //  Link
import {ReturnHeader} from "../../App";
import {ReturnFooter} from "../../App";
import {useAuth} from "../../AuthProvider";



function QuizScore() {
    const location = useLocation();
    const { quiz, userAnswers, score, passed, totalQuestions} = location.state || {};
    const navigate = useNavigate();
    const { user } = useAuth();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const currentQuestion = quiz.questions[currentQuestionIndex];
    console.log("QuizScore", quiz, userAnswers, score, passed, totalQuestions);

    function handleBackButton() {
        if (currentQuestionIndex === 0) {
            navigate("/Dashboard");
        }else{
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    }





    if (!quiz) {
        console.log("No quiz data available, redirecting...");
        navigate("/");
        return null;
    }

    return (
        <div className='App'>
            <ReturnHeader/>
            <div className='App-body'>
                <div className='Quiz-body'>
                    <div className='Quiz-nrOfQuestions' style={{gridColumn: 3}}>
                        <div className='Quiz-nrOfQuestions-text'>
                            Number of questions: {quiz.questions.length}
                        </div>
                    </div>


                    <div className="Quiz-question-number-text" style={{gridColumn: 2, gridRow: 1}}>
                        <div className='Quiz-question-nr' style={{gridColumn: 2}}>
                            <h1>Question {currentQuestionIndex + 1}</h1>
                        </div>
                    </div>
                    <div className="Quiz-question-text-container" style={{gridColumn: 2}}>
                        <div className='Quiz-question' style={{gridColumn: 2}}>
                            <h2>{currentQuestion.text}</h2>
                        </div>
                    </div>
                    {currentQuestion.answers.map((answer, index) => (
                        <div key={index} className={'Quiz-question-container'} style={{ gridColumn: 2 }}>
                                {/*  */}
                                {userAnswers[currentQuestion.question_id] && userAnswers[currentQuestion.question_id].answerId === answer.answer_id ? (
                                    answer.is_correct ? (
                                        <>
                                            <div className='Quiz-question-potanswer' style={{gridColumn: 2,color: "#61dafb"}}>
                                                <h3>{answer.text}</h3>
                                            </div>
                                            <div className='Quiz-question-correct' style={{gridColumn: 3}}>
                                                <h3>nice!</h3> {/* */}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className='Quiz-question-potanswer' style={{gridColumn: 2, color:"#ff0000"}}>
                                                <h3>{answer.text}</h3>
                                            </div>
                                            <div className='Quiz-question-incorrect' style={{gridColumn: 3}}>
                                                <h3>wrong.</h3> {/*  */}
                                            </div>
                                        </>

                                    )
                                ) : (
                                    (answer.is_correct && (
                                        <>
                                            <div className='Quiz-question-potanswer' style={{gridColumn: 2}}>
                                                <h3>{answer.text}</h3>
                                            </div>
                                            <div className='Quiz-question-correct' style={{gridColumn: 3}}>
                                                <h3>this is correct
                                                    head!</h3> {/* I */}
                                            </div>
                                        </>

                                    )) || <div className='Quiz-question-potanswer' style={{gridColumn: 2}}>
                                        <h3>{answer.text}</h3>
                                    </div> //
                                )}
                        </div>
                    ))}


                    <div className="Quiz-question-button-container-container" style={{gridColumn: 2}}>
                        <div className="Quiz-question-button-container" style={{justifyContent: "left"}}
                             id="rightbutton">
                            <button className='Quiz-button'
                                    onClick={() => handleBackButton()}>Previous
                            </button>
                        </div>
                        <div className="Quiz-question-button-container" style={{justifyContent: "right"}}
                             id="leftbutton">
                            <button className='Quiz-button' onClick={() => {
                                if (currentQuestionIndex >= quiz.questions.length - 1) {
                                    navigate("/Dashboard");
                                } else {
                                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                                }
                            }}
                            >Next
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            <ReturnFooter/>
        </div>
    );
}

function ReturnCorrectAnswerBox({row}) {
    return (
        <div className='Quiz-question-container' style={{gridRow: row}}>
            <div className={'Quiz-question-potanswer'}>
                <h3>Correct Answer</h3>
            </div>
        </div>
    );
}



export default QuizScore;