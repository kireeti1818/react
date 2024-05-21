import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css'; 

export function Home() {
    const navigate = useNavigate();
    return (
        <div className="centerContainer">
            <div className="container">
                <div>Submi</div>
                <button className="Button" onClick={() => { navigate("/plans") }}>Plan</button>
            </div>
        </div>
    );
}
