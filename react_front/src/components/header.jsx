import { useNavigate } from 'react-router-dom';
import './header.css'
import { useEffect, useState } from 'react';

export function Header()
{
    const [token, setToken] = useState('');
    const Navigate = useNavigate();
    useEffect(()=>{
        setToken(localStorage.getItem('token'));
    },[localStorage.getItem('token')])
    const username = localStorage.getItem('username');
    function handleLogout()
    {
        setToken(localStorage.getItem(''))
        localStorage.removeItem('token');
    }
    return(
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <span style={{ fontSize: '20px', fontWeight: 'bold', marginRight: '30px', marginLeft:'20px' }}>Submi</span>
                    <button className="headerButton1"  onClick={() => { Navigate("/") }}>Home</button>
                    <button className="headerButton1" onClick={() => { Navigate("/plans") }}>Plans</button>
                    <button className="headerButton1"  onClick={() => { Navigate("/plans/new") }}>Create</button>
                </div>
                {token==null? (
                <div>
                    <button className="headerButton" onClick={() => { Navigate("/login") }}>Login</button>
                    <button className="headerButton" onClick={() => { Navigate("/signup") }}>Signup</button>
                </div>
                ) : (
                    <div className="paste-button">
                        <button className="profileButton">{username}▼</button>
                        <div className="dropdown-content">
                            <center>
                                <p className="top">{username}</p>
                                <a className="middle" href="#" onClick={handleLogout}>Logout</a>
                            </center>
                        </div>
                    </div>
                )
                }
                
            </div>
            <hr></hr>
        </>
    );
}