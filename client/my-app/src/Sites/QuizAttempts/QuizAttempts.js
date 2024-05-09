import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './QuizAttempts.css';

function QuizAttempts() {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const [attempts, setAttempts] = useState([]);

    useEffect(() => {
        const fetchAttempts = async () => {
            try {
                const response = await fetch(`/api/quiz_attempts/${quizId}`);
                const data = await response.json();
                if (response.ok) {
                    setAttempts(data.attempts);
                } else {
                    console.error('Failed to fetch attempts:', data.message);
                }
            } catch (error) {
                console.error('Network or server error:', error);
            }
        };

        fetchAttempts();
    }, [quizId]);

    return (
        <div className="attempts-container">
            <h1>Quiz Attempts for Quiz ID: {quizId}</h1>
            {attempts.length > 0 ? (
                attempts.map((attempt, index) => (
                    <div key={index} className="attempt-item">
                        <div className="attempt-details">
                            <p>Score: {attempt.score}</p>
                            <p>Attempt Time: {new Date(attempt.attempt_time).toLocaleString()}</p>
                        </div>
                        <button onClick={() => navigate(`/quiz_attempt/${attempt.attempt_id}`)}>
                            View Attempt
                        </button>
                    </div>
                ))
            ) : (
                <p>No attempts found for this quiz.</p>
            )}
        </div>
    );
}

export default QuizAttempts;