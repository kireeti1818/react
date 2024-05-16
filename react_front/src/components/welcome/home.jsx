import { useNavigate } from 'react-router-dom';


export function Home()
{
    const Navigate = useNavigate();
    return(
        <>
            <div>Hello</div>
            <button onClick={() => { Navigate("/plans") }}>Plan</button>
        </>
    )
}