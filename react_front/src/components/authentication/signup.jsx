import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

    
function Signup(){
    const Navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:18185/signup', { "fullname":name,email, password });
            console.log(res.data)
            if (res.data.success=="true")
            {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('token', res.data.username);
                alert(res.data.message)
                Navigate("/plans");
            }
            else if (res.data.success=="false"){
                alert(res.data.message)
            }
            
        } 
        catch (err) {
            console.error(err);
        }
  };

  return (
    <form onSubmit={handleLogin}>
        <label htmlFor="name">Fullname :</label>
        <input 
        type="name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required 
        />
        <br></br>
        <label htmlFor="email">Email :</label>
        <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
        />
        <br></br>
        <label htmlFor="password">password : </label>
        <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
        />
        <br></br>
        <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
