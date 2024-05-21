import { jwtDecode } from 'jwt-decode';

const checkTokenExpiration = (token) => {
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000; 

  if (decodedToken.exp < currentTime) {
    console.log('Token has expired.');
    return "false";
  }

  console.log('Token is still valid.');
  return "true";
};

export default function isAuthen()
{
    const token = localStorage.getItem('token');
    if (token) {
        return checkTokenExpiration(token);
    }
    else {
        return "false";
    }
}
