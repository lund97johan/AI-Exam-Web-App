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
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
