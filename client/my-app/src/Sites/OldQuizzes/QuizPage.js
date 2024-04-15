import * as React from "react";
import { useParams } from 'react-router-dom';

function QuizPage() {
  const { quizName } = useParams(); 
  return (
    <div>
      <h1>{quizName}</h1> {/* Display the quiz name */}
      {/* You can include  input field and "TA Quiz" button here */}
    </div>
  );
}

export default QuizPage;
