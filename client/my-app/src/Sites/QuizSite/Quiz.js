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
function ShowQuizScore(){
    return(
        <div className='App'>
            <ReturnHeader/>
              <div className='App-body'>
                <ReturnQuizScore/>
            </div>
            <ReturnFooter/>
        </div>
    )
}

function ReturnQuizScore({Score, MaximumScore, QuizId}){
    return(
        <>
            <div className={Score >= MaximumScore ? 'Quiz-nrOfQuestions' : 'Quiz-nrOfQuestions-fail'}
                 style={{gridColumn: 2, gridRow: 2}}>
                <div className='Quiz-nrOfQuestions-text'>
                    {Score >= MaximumScore ? 'Congratulations! you passed the test' : 'You failed!'}
                </div>
            </div>
            <div className='Quiz-nrOfQuestions' style={{gridColumn: 2, gridRow: 3}}>
                <div className='Quiz-nrOfQuestions-text'>
                    Your score: {Score} of {MaximumScore}
                </div>
            </div>
            <div className="redo-quiz-button" style={{gridColumn: 2, gridRow: 5, justifySelf:"left"}}>
                <Link to={`/quiz/${QuizId}`}>
                    <button className='Quiz-button'>Redo test</button>
                </Link>
            </div>
            <div className='finish-test-button' style={{gridColumn: 2, gridRow: 5, justifySelf:"right"}}>
                <Link to='/dashboard'>
                    <button className='Quiz-button'>Finish test</button>
                </Link>
            </div>
        </>
    )
}

function ReturnQuiz() {
    // State and variables
    const {quizId} = useParams();
    const {user} = useAuth();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState({}); // State to store selected answers
    const [showScore, setShowScore] = useState(false);
    const [finalScore, setFinalScore] = useState(0); // State for the final score
    const [maximumScore, setMaximumScore] = useState(0); // State for the maximum possible score
    // This useEffect will log the selectedAnswer state every time it changes
    useEffect(() => {
        console.log('Selected Answers:', selectedAnswer);
    }, [selectedAnswer]);

    // Fetching quiz data
    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }

        const fetchQuiz = async () => {
            setSelectedAnswer({});
            setCurrentQuestionIndex(0);
            setShowScore(false);
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
                    console.log("Quiz:", data.quiz);
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

    // Handle selection of an answer
    const handleAnswerSelect = (questionId, answerId, isCorrect) => {
        console.log(`Updating answer for question ${questionId}: ${answerId}, Correct: ${isCorrect}`);
        setSelectedAnswer(prevAnswers => {
            const updatedAnswers = {...prevAnswers, [questionId]: { answerId, isCorrect }};
            console.log('New State:', updatedAnswers);
            return updatedAnswers;
        });
    };

    const calculateScore = () => {
        let score = 0;
        Object.values(selectedAnswer).forEach(answer => {
            console.log("Answer:", answer);
            if (answer.isCorrect) {
                score += 1;
            }
        });
        return score;
    };
    const resetQuiz = () => {
        // Reset relevant states
        setSelectedAnswer({});
        setCurrentQuestionIndex(0);
        setShowScore(false); // Assuming you have access to setShowScore here
        setFinalScore(0);
        setMaximumScore(0);

    };

    const submitQuiz = async () => {
        const finalScore = calculateScore();
        console.log("Final Score:", finalScore); // Log the final score to debug
        setFinalScore(calculateScore());
        setMaximumScore(quiz.questions.length);
        setShowScore(true);
    };

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const updateCurrentQuestionIndex = () => {
        setCurrentQuestionIndex(Math.min(currentQuestionIndex + 1, quiz.questions.length - 1))
    }
    return (
        <div className='Quiz-body'>
            {showScore ? (
                <>
                    <div className={finalScore >= maximumScore ? 'Quiz-Result-Text-Pass' : 'Quiz-Result-Text-Fail'}
                         style={{gridColumn: 2, gridRow: 2}}>
                            {finalScore >= maximumScore ? 'Congratulations! you passed the test' : 'You failed!'}
                    </div>
                    <div className='Quiz-Result-Score-Container' style={{gridColumn: 2, gridRow: 3}}>
                        <div className='Quiz-Result-Score'>
                            Your score: {finalScore} of {maximumScore}
                        </div>
                    </div>

                    <div className="redo-quiz-button" style={{gridColumn: 2, gridRow: 5, justifySelf: "left", marginLeft: "20vh"}}>
                        <button className='Quiz-button' onClick={resetQuiz}>Redo test</button>
                    </div>
                    <div className='finish-test-button' style={{gridColumn: 2, gridRow: 5, justifySelf:"right", marginRight: "20vh"}}>
                        <Link to='/dashboard'>
                            <button className='Quiz-button'>Finish test</button>
                        </Link>
                    </div>
                </>
            ) : (
                            <>
                            <div className='Quiz-nrOfQuestions' style={{ gridColumn: 3 }}>
                        <div className='Quiz-nrOfQuestions-text'>
                            Number of questions: {quiz.questions.length}
                        </div>
                    </div>
                <div className="Quiz-question-number-text" style={{ gridColumn: 2, gridRow: 1 }}>
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
                            <input
                                type="radio"
                                name={`question_${currentQuestion.question_id}`}
                                value={answer.answer_id}
                                checked={selectedAnswer[currentQuestion.question_id]?.answerId === answer.answer_id}
                                onChange={() => handleAnswerSelect(currentQuestion.question_id, answer.answer_id, answer.is_correct)}
                            />
                            <span className="Quiz-question-answer-box"></span>
                        </label>
                    </div>
                ))}
                <div className="Quiz-question-button-container-container" style={{ gridColumn: 2 }}>
                    <div className="Quiz-question-button-container" style={{ justifyContent: "left" }} id="rightbutton">
                        <button className='Quiz-button' onClick={() => setCurrentQuestionIndex(Math.max(currentQuestionIndex - 1, 0))}>Previous</button>
                    </div>
                    <div className="Quiz-question-button-container" style={{ justifyContent: "right" }} id="leftbutton">
                        <button className='Quiz-button' onClick={() => {
                            if (currentQuestionIndex >= quiz.questions.length - 1) {
                                submitQuiz();
                            } else {
                                setCurrentQuestionIndex(currentQuestionIndex + 1);
                            }
                        }}
                        >Next</button>
                    </div>
                </div>

                </>
            )}
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
                    Stockholm
                </div>
                <label className='Quiz-question-answer-box-container' style={{gridColumn: 3}}>
                    <input type="checkbox"/>
                    <span className="Quiz-question-answer-box"></span>
                </label>
            </div>
            <div className="Quiz-question-container" style={{gridColumn: 2}}>
                <div className='Quiz-question-potanswer' style={{gridColumn: 2}}>
                    Luleå
                </div>
                <label className='Quiz-question-answer-box-container' style={{gridColumn: 3}}>
                    <input type="checkbox"/>
                    <span className="Quiz-question-answer-box"></span>
                </label>
            </div>
            <div className="Quiz-question-container" style={{gridColumn: 2}}>
                <div className='Quiz-question-potanswer' style={{gridColumn: 2}}>
                    Kalvträsk
                </div>
                <label className='Quiz-question-answer-box-container' style={{gridColumn: 3}}>
                    <input type="checkbox"/>
                    <span className="Quiz-question-answer-box"></span>
                </label>
            </div>
            <div className="Quiz-question-container" style={{gridColumn: 2}}>
                <div className='Quiz-question-potanswer' style={{gridColumn: 2}}>
                    Malmö
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
