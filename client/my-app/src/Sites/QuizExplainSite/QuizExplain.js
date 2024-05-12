import * as React from "react";

import {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom'; //  Link
import {ReturnHeader} from "../../App";
import {ReturnFooter} from "../../App";
import {useAuth} from "../../AuthProvider";
import { useParams } from 'react-router-dom';


function QuizExplain({quizData, quizAnswers, quizResults}){
    const { user } = useAuth(); // Get user info from context
    const navigate = useNavigate();

    useEffect(() => {
        // Ensure there's a user logged in before fetching quizzes
        if (!user) {
            console.log("No user logged in, redirecting...");
            navigate("/login")
            return;
        }
    },[user]);

    return(
        <div className='App'>
            <ReturnHeader/>
            <div className='App-body'>
                <ShowResults/>
            </div>
            <ReturnFooter/>
        </div>
    )
}

function ShowResults(){
    return(
        <div>
            <h1>Results</h1>
        </div>
    )
}

export default QuizExplain;