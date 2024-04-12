import React, { useState } from 'react';
import './FileUpload.css';

import {ReturnHeader} from "../../App";
import {ReturnFooter} from "../../App";

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

const handleFileChange = (e) => {
    setFile(e.target.files[0])

};

const handleFileUpload = () => {
    const formData = new FormData();
    formData.append('file', file);

    fetch('/upload', { method: 'POST', body: formData })
    .then(response => response.json)
    .then(data => console.log(data))
.catch(error => console.error ('Error uploading file', error));
};

return (
    <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Upload File</button>
    </div>
);


}

export default FileUpload;