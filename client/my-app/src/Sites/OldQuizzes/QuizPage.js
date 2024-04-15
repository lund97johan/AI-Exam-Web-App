import * as React from "react";
import { useParams } from 'react-router-dom';

function QuizPage() {
  const { quizName } = useParams(); 
  return (
    <div>
      <h1>{quizName}</h1> {/* Display the quiz name */}
      {/* Y */}
    </div>
  );
}

export default QuizPage;
