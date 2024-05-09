import React, {createContext, useContext, useEffect, useState} from 'react';

// Create a context for quiz state
const QuizContext = createContext();

// Define a QuizProvider component to manage quiz state
export const QuizProvider = ({ children }) => {
    const [quiz, setQuiz] = useState(null);


    const removecurrentQuiz = () => {
        console.log("quiz removed")
        setQuiz(null);

    };

    useEffect(() => {
        // Optionally add more effects on quiz change
    }, [quiz]);

    return (
        <QuizContext.Provider value={{ quiz, setQuiz }}>
            {children}
        </QuizContext.Provider>
    );
};

// Custom hook to access quiz state
export const useQuiz = () => useContext(QuizContext);

export default QuizProvider;