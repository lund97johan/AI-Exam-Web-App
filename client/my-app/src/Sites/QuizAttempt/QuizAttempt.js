import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './QuizAttempt.css';

function QuizAttempt() {
    const { attemptId } = useParams();
    const [attemptDetails, setAttemptDetails] = useState(null);

    useEffect(() => {
        // Simulate fetching data
        const fetchAttemptDetails = async () => {
            // Here you would fetch data from the server using fetch or axios
            // This is a dummy placeholder for the purpose of this example
            const data = {
                score: '5/10',
                attempt_time: new Date().toLocaleString(),
                answers: ['Answer 1', 'Answer 2', 'Answer 3']  // Placeholder answers
            };
            setAttemptDetails(data);
        };

        fetchAttemptDetails();
    }, [attemptId]);

    return (
        <div className="attempt-details-container">
            {attemptDetails ? (
                <div>
                    <h1>Details for Attempt ID: {attemptId}</h1>
                    <p>Score: {attemptDetails.score}</p>
                    <p>Attempt Time: {attemptDetails.attempt_time}</p>
                    <ul>
                        {attemptDetails.answers.map((answer, index) => (
                            <li key={index}>{answer}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Loading attempt details...</p>
            )}
        </div>
    );
}

export default QuizAttempt;