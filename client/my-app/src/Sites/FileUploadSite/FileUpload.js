import React, { useState } from 'react';
import './FileUpload.css';

import {ReturnHeader} from "../../App";
import {ReturnFooter} from "../../App";
import { useAuth } from '../../AuthProvider';

function FileUpload(){
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

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload File</button>
        </div>
);


}

export default FileUpload;