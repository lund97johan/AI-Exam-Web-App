import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "./App";
import Register from "./Sites/RegisterSite/Register";
import Login from "./Sites/LoginSite/Login";
import ContactUs from "./Sites/ContactUsSite/ContactUs";

import BotInfo from './Sites/BotInfoSite/botInfo';
import About from './Sites/AboutSite/About';

import Quiz from './Sites/QuizSite/Quiz';
import FileUpload from './Sites/FileUploadSite/FileUpload';
import AuthProvider from "./AuthProvider";
import OldQuizzes from './Sites/OldQuizzes/OldQuizPage';
import Dashboard from "./Sites/DashboardSite/Dashboard";
import RemoveQuiz from "./Sites/RemoveQuiz/RemoveQuiz";
import QuizAttempts from "./Sites/QuizAttempts/QuizAttempts";
import QuizAttempt from "./Sites/QuizAttempt/QuizAttempt";

import QuizScore  from "./Sites/QuizScoreSite/QuizScore";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/register" element={<Register />}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/contactus' element={<ContactUs/>}/>
          <Route path='/BotInfo' element={<BotInfo/>}/>
          <Route path='/About' element={<About/>}/>
          <Route path='/quiz' element={<Quiz/>}/>
          <Route path='/old_quizzes' element={<OldQuizzes/>}/>
          <Route path='/FileUpload' element={<FileUpload/>}/>
          <Route path='/quiz/:quizId' element={<Quiz/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/remove_quiz/:quizId' element={<RemoveQuiz/>}/>
          <Route path='/QuizScore' element={<QuizScore/>}/>
          <Route path='/quiz_attempts/:quizId' element={<QuizAttempts/>}/>
          <Route path='/quiz_attempt/:attemptId' element={<QuizAttempt/>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
