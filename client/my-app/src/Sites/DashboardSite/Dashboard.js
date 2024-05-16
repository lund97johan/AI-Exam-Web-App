import * as React from "react";
import "./Dashboard.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReturnHeader } from "../../App";
import { ReturnFooter } from "../../App";
import { useAuth } from "../../AuthProvider";

function Dashboard() {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();    
    
    // Commenting out entire useState and function related to uploading
    /*
    const [uploading, setUploading] = useState(false);
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        setUploading(true);

        fetch('api/upload', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.JSON())
        .then(data => {
            setUploading(false);
            if(data.imageURL) {
                setUser(prevState => ({ ...prevState, imageURL: data.imageURL }));
                alert('Image uploaded successfully');
            }
        })
        .catch(() => {
            setUploading(false);
            alert('Failed to upload image');
        });
    };
    */

    return (
        <div className='App'>
            <ReturnHeader/>
            <div className='App-body'>
                {user ? (
                    <div className="user-details"> 
                        <h1>Welcome, {user.firstname} {user.lastname}!</h1>

                        {/* Commenting out the JSX for the profile picture upload since it's not implemented yet */}
                        {/*
                        <img src={user.profilePicture || 'default-profile.png'} alt="Profile" className="profile-pic" />
                        <label htmlFor="file-input" className="upload-button">
                            {uploading ? "Uploading..." : "Upload Photo"}   
                        </label>
                        <input id="file-input" type="file" onChange={handleImageUpload} disabled={uploading} style={{ display: 'none' }}/>
                        */}
                        <p>User ID: {user.user_id}</p>
                        <p>Username: {user.username}</p>
                        <p>Email: {user.email}</p>
                        <p>Account creation: {user.created_at}</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <ReturnFooter/>
        </div>
    );
}

export default Dashboard;
