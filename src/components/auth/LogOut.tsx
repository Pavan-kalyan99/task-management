import React from 'react'
import { Button } from '@mui/material'
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseAuth/Firebase';

const LogOut:React.FC = () => {
    const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign the user out
      
      console.log('User logged out');
      navigate('/'); // Redirect to the login page
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className='bg-orange-500 text-white rounded m-1'>
      <Button onClick={handleLogout}  variant="contained" color="error" >LogOut</Button>
    </div>
  )
}

export default LogOut
