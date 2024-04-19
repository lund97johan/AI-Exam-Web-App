import * as React from "react";
import "./oldQuizzes.css";
import { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { ReturnHeader } from "../../App";
import { ReturnFooter } from "../../App";

function OldQuizzes() {
  const [selectedQuiz, setSelectedQuiz] = useState(""); 

  // Function to handle quiz selection and navigation
  const handleQuizSelection = (quizName) => {
    setSelectedQuiz(quizName);
  }

  return (
    <div className='App'>
      <ReturnHeader />
      <div className='App-body'>
        <div className="quiz-container">
          <div className="quiz-item">
            <div className="quiz-input">
              <input
                className='quiz'
                type='text'
                placeholder='Quiz 1'
                disabled
              />
              {/* Use Link to navigate to Quiz page with the selected quiz name */}
              <Link to={`/quiz/${encodeURIComponent("Quiz 1")}`} className='quiz-button' onClick={() => handleQuizSelection("Quiz 1")}>TA Quiz</Link>
              <button className='remove-button'>Remove Quiz</button>
            </div>
          </div>
          <div className="quiz-item">
            <div className="quiz-input">
              <input
                className='quiz'
                type='text'
                placeholder='Quiz 2'
                disabled
              />
              {/* Use Link to navigate to Quiz page with the selected quiz name */}
              <Link to={`/quiz/${encodeURIComponent("Quiz 2")}`} className='quiz-button' onClick={() => handleQuizSelection("Quiz 2")}>TA Quiz</Link>
              <button className='remove-button'>Remove Quiz</button>
            </div>
          </div>
          <div className="quiz-item">
            <div className="quiz-input">
              <input
                className='quiz'
                type='text'
                placeholder='Quiz 3'
                disabled
              />
              {/* Use Link to navigate to Quiz page with the selected quiz name */}
              <Link to={`/quiz/${encodeURIComponent("Quiz 3")}`} className='quiz-button' onClick={() => handleQuizSelection("Quiz 3")}>TA Quiz</Link>
              <button className='remove-button'>Remove Quiz</button>
            </div>
          </div>
        </div>
      </div>
      <ReturnFooter />
    </div>
  );
}

export default OldQuizzes;
