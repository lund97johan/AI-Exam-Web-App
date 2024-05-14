import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './QuizAttempt.css';

function QuizAttempt() {
    const { attemptId } = useParams();
    const [attemptDetails, setAttemptDetails] = useState(null);

    useEffect(() => {
        fetch(`/api/quiz_attempt/${attemptId}`)
            .then(response => response.json())
            .then(data => setAttemptDetails(data))
            .catch(error => console.error('Error fetching attempt details:', error));
    }, [attemptId]);

    if (!attemptDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {attemptDetails.questions.map((question, index) => {
                const correctAnswer = question.answers?.find(a => a.is_correct) || { answer_text: 'No answer found' };
                const userAnswer = question.answers?.find(a => a.answer_id === question.userAnswer) || { answer_text: 'No answer selected' };
                return (
                    <div key={index}>
                        <p>{index + 1}: {question.question_text}</p>
                        <p>Correct answer: {correctAnswer.answer_text}</p>
                        <p>Your Answer: {userAnswer.answer_text}</p>
                    </div>
                );
            })}
            <p>Final Score: {attemptDetails.score}</p>
        </div>
    );
}

export default QuizAttempt;