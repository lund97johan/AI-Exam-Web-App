import * as React from "react";
import "./Register.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {ReturnHeader} from "../../App";
import {ReturnFooter} from "../../App";

function Register(){
    return(
        <div className='App'>
            <ReturnHeader/>
              <div className='App-body'>
                <div className='Register-body'>
                    
                </div>
            </div>
            <ReturnFooter/>
        </div>
    )
}

export default Register;