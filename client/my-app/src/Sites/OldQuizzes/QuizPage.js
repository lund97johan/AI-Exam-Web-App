import * as React from "react";
import "./oldQuizzes.css";
import {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom'; //  Link
import app, {ReturnHeader} from "../../App";
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
    const { user } = useAuth(); // Get user info from context
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Ensure there's a user logged in before fetching quizzes
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
    }, [user]); // Depend on `user` to re-run when the user state changes

    return (
        <div className="quiz-container">
            {quizzes.length > 0 ? (
                quizzes.map((quiz, index) => (
                    <div key={index} className="quiz-item">
                        <div className="quiz-input">
                            <input className='quiz' type='text' value={quiz.title} disabled />
                            <Link to={`/quiz/${encodeURIComponent(quiz)}`} className='quiz-button'>
                                Take Quiz
                            </Link>
                        </div>
                        <button className='remove-button'>Remove Quiz</button>
                    </div>
                ))
            ) : (
                <p>No quizzes available</p> // Show a message if no quizzes are found
            )}
        </div>
    );
}

export default OldQuizzes;
