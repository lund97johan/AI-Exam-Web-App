import * as React from "react";
import ContactForm from "./ContactForm";
import "./ContactUs.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReturnHeader } from "../../App";
import { ReturnFooter } from "../../App";

/*function ContactUs() {
    return (
        <div className='App'>
            <ReturnHeader />
            <div className='App-body'>
                <text className="ContactUsText" style={{ color: "white", fontSize: 50 }}>PLEASE SEND US ALL THE EMAILS TO jestru-2@student.ltu.se</text>
            </div>
            <ReturnFooter />
        </div>
    )
} */

function ContactUs() {
    return (
        <div className='App'>
            <ReturnHeader />
            <div className='App-body'>
                <ContactForm />
            </div>
            <ReturnFooter />
        </div>
    );
}

export default ContactUs;
