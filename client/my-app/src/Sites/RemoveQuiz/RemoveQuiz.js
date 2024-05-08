import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './RemoveQuiz.css';

function RemoveQuiz() {
    const { quizId } = useParams();  // Get the quiz ID from URL parameters
    const navigate = useNavigate();

    const handleRemoveQuiz = () => {
        fetch(`/remove_quiz/${quizId}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                navigate('/old_quizzes'); // Navigate back to quizzes list after removal
            })
            .catch(error => console.error('Error removing quiz:', error));
    };

    const handleCancel = () => {
        navigate('/old_quizzes');  // Navigate back without doing anything
    };

    return (
        <div className="remove-quiz-container">
            <div className="remove-quiz-content">
                <h1>Are you sure you want to remove this quiz?</h1>
                <div>
                    <button className="button cancel-button" onClick={handleCancel}>Cancel</button>
                    <button className="button remove-button" onClick={handleRemoveQuiz}>Remove</button>
                </div>
            </div>
        </div>
    );
}

export default RemoveQuiz;