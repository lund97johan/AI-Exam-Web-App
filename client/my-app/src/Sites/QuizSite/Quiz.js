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
                <ReturnQuiz/>
            </div>
            <ReturnFooter/>
        </div>
    )
}

function ReturnQuiz() {
    // State and variables
    const {quizId} = useParams();
    const {user} = useAuth();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState({});
    const [showScore, setShowScore] = useState(false);
    const [finalScore, setFinalScore] = useState(0);
    const [maximumScore, setMaximumScore] = useState(0);
    const [failure, setFailure] = useState(false);

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

        setSelectedAnswer({});
        setCurrentQuestionIndex(0);
        setShowScore(false);
        setFinalScore(0);
        setMaximumScore(0);
        setFailure(false)
    };

    const submitQuiz = async () => {
        const finalScore = calculateScore();
        console.log("Final Score:", finalScore);
        setFinalScore(finalScore);
        setMaximumScore(quiz.questions.length);
        setShowScore(true);
        if (finalScore < quiz.questions.length) {
            setFailure(true);
        }


        const submissionData = {
            userId: user.id,
            quizId: quiz.quiz_id,
            answers: selectedAnswer,
            score: finalScore,
            totalQuestions: quiz.questions.length
        };

        console.log(submissionData);


        try {
            const response = await fetch('/submitQuizAnswers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData)
            });

            const responseData = await response.json();
            if (response.ok) {
                console.log('Submission successful:', responseData);

            } else {
                console.error('Failed to submit quiz:', responseData.message);
            }
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
    };

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const updateCurrentQuestionIndex = () => {
        setCurrentQuestionIndex(Math.min(currentQuestionIndex + 1, quiz.questions.length - 1))
    }
    return (
        <div className='Quiz-body'>
            {showScore ? (
                <>
                    <div className={failure ?  'Quiz-Result-Text-Fail': 'Quiz-Result-Text-Pass'}
                         style={{gridColumn: 2, gridRow: 2}}>
                        {failure ?  'You failed!' : 'Congratulations! you passed the test' }
                    </div>
                    <div className='Quiz-Result-Score-Container' style={{gridColumn: 2, gridRow: 3}}>
                        <div className='Quiz-Result-Score'>
                            Your score: {finalScore} of {maximumScore}
                        </div>
                    </div>
                    {failure ? <>
                        <div className='Quiz-Result-Text' style={{gridColumn: 2, gridRow: 4, justifySelf: 'left', marginLeft: '1vh'}}>
                            You can now view the correct answers
                        </div>
                        <div className='finish-test-button'
                             style={{gridColumn: 2, gridRow: 4, justifySelf: "right", marginRight: "1vh"}}>
                            <button className='Quiz-button' onClick={() => {
                                navigate('/QuizScore', {
                                    state: {
                                        quiz: quiz,
                                        userAnswers: selectedAnswer,
                                        score: finalScore,
                                        passed: failure,
                                        totalQuestions: quiz.questions.length
                                    }
                                });
                            }}>see correct answers
                            </button>
                        </div>
                    </> : null


                    }
                    <div className="redo-quiz-button"
                         style={{gridColumn: 2, gridRow: 5, justifySelf: "left", marginLeft: "1vh"}}>
                        <button className='Quiz-button' onClick={resetQuiz}>Redo test</button>
                    </div>
                    <div className='finish-test-button'
                         style={{gridColumn: 2, gridRow: 5, justifySelf: "right", marginRight: "1vh"}}>
                    <Link to='/dashboard'>
                            <button className='Quiz-button'>Finish test</button>
                        </Link>
                    </div>
                </>
            ) : (
                <>
                    <div className='Quiz-nrOfQuestions' style={{gridColumn: 3}}>
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
