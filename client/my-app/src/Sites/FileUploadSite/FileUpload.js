import React, {useEffect, useState} from 'react';
import './FileUpload.css';

import {ReturnHeader} from "../../App";
import {ReturnFooter} from "../../App";
import { useAuth } from '../../AuthProvider';
import {useNavigate} from "react-router-dom";

function FileUpload(){
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    return(
        <div className='App'>
            <ReturnHeader/>
            <div className='App-body'>
                <ReturnFileUpload/>
            </div>
            <ReturnFooter/>
        </div>
    )
}

function ReturnFileUpload() {
    const [file, setFile] = useState(null);
    const { user } = useAuth();
    const [nrQuestions, setNrQuestions] = useState(0);


    const handleFileChange = (e) => {
        setFile(e.target.files[0])

    };
    const handleFileUpload = () => {

        const formData = new FormData();
        formData.append('file', file);
        if (user) {
            formData.append('userId', user.user_id);  // Append user ID from context
        }
    
        // Get the file name
        const fileName = file.name;
        // Append the file name as the "title" to the form data
        formData.append('title', fileName);
        formData.append('nrQuestions', nrQuestions);
        //send data to server
        fetch('/upload', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert('File uploaded successfully');
        })
        .catch(error => console.error('Error uploading file', error));
    };
    const changeNrQuestions = (e) => {
        setNrQuestions(e.target.value);
    }

    return (

        <div className={'file-upload-body'} >
            <div className={'file-upload-body-container'} style={{gridColumn: 2, gridRow: 1}}>
                <div className={'about-us-fileupload-container'}>
                    <div className={'about-us-fileupload-text'}>
                        Welcome to Our Easy Upload Portal! click and open to drop your files here or use the upload button below to get started. Our tool will help you generate quiz questions from your documents in just a few clicks.
                    </div>
                </div>
            </div>
            <div className={'file-upload-body-container'} style={{gridColumn: 2, gridRow: 2}}>
                <div className={'file-upload-upload-container'}>
                    <input className={'fileuploadtext'} type="file" onChange={handleFileChange}/>
                    <button onClick={handleFileUpload}>Upload File</button>
                </div>
                <div className={'nr-of-questions-container'}>
                    <span>
                            <select className={'nr-selector'} onChange={(e) => setNrQuestions(e.target.value)}>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </span>
                    <div className={'nr-questions'}>{nrQuestions} :   Number of questions to be generated</div>
                </div>

            </div>
        </div>


    )
        ;


}

export default FileUpload;