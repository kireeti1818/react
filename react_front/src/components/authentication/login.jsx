import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

    
function Login(){
    const Navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:18185/login', { email, password });
            if (res.data.success=="true")
            {
                localStorage.setItem('token', res.data.token);
                alert(res.data.message)
                Navigate("/plans");
            }
            else if (res.data.success=="false"){
                alert(res.data.message)
            }
            else if (res.data.success=="error"){
                alert("Try after 10mins "+res.data.message)
            }
            
        } 
        catch (err) {
            console.error(err);
        }
  };

  return (
    <form onSubmit={handleLogin}>
    <label htmlFor="planName">Email:</label>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
      />
      <br></br>
    <label htmlFor="planName">password : </label>
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
      <br></br>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
