import { useNavigate } from 'react-router-dom';


export function Header()
{
    const Navigate = useNavigate();
    return(
        <div>
            <button onClick={() => { Navigate("/login") }}>Login</button>
            <button onClick={() => { Navigate("/signup") }}>Signup</button>
        </div>
    )
}