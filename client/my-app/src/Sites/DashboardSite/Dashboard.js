
import * as React from "react";
import "./Dashboard.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {ReturnHeader} from "../../App";
import {ReturnFooter} from "../../App";




function Dashboard() {
    return(
        <div className='App'>
            <ReturnHeader/>
            <div className='App-body'>

            </div>
            <ReturnFooter/>
        </div>
    )
}

export default Dashboard;