import * as React from "react";
import "./oldQuizzes.css";
import {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom'; //  Link
import {ReturnHeader} from "../../App";
import {ReturnFooter} from "../../App";
import {useAuth} from "../../AuthProvider";


function OldQuizzes() {
  return (
      <div className='App'>
          <ReturnHeader/>
              <div className='App-body'>
                  <ReturnQuizzes/>
              </div>
          <ReturnFooter/>
      </div>
  );
}

function ReturnQuizzes() {
    const { user } = useAuth();
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        if (!user) {
            console.log("No user logged in, redirecting...");
            navigate("/login")
            return;
        }

        const fetchQuizzes = async () => {
            try {
                const response = await fetch(`/getQuiz?userId=${user.user_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',

                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setQuizzes(data.quizzes);
                } else {
                    console.error(data.message || 'Failed to fetch quizzes');
                }
            } catch (error) {
                console.error('Network or server error', error);
            }
        };

        fetchQuizzes();
        console.log('fetching quizzes');
    }, [user]);

    const handleRemoveClick = (quizId) => {
        navigate(`/remove_quiz/${quizId}`);
    };

    const handlePreviousAttemptsClick = (quizId, quizTitle) => {
        navigate(`/quiz_attempts/${quizId}`,
            {
            state: {
                quizName: quizTitle
            }
        });
    };

    return (
        <div className="quiz-container">
            {quizzes.length > 0 ? (
                quizzes.map((quiz, index) => (
                    <div key={index} className="quiz-item">
                        <div className="quiz-input">
                            <input className='quiz' type='text' value={quiz.title} disabled />
                            <Link to={`/quiz/${quiz.id}`} className="quiz-button">Take Quiz</Link>
                        </div>
                        <button className='previous-attempts-button' onClick={() => handlePreviousAttemptsClick(quiz.id, quiz.title)}>
                            View Previous Attempts
                        </button>
                        <button className='remove-button' onClick={() => handleRemoveClick(quiz.id)}>
                            Remove Quiz
                        </button>
                    </div>
                ))
            ) : (
                <p>No quizzes available</p>
            )}
        </div>
    );
}

export default OldQuizzes;