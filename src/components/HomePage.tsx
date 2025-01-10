import React from 'react';
import { signInWithPopup } from 'firebase/auth';  // Correct import for popup sign-in
import { auth, googleProvider } from './firebaseAuth/Firebase';  // Import auth and googleProvider
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { FaClipboardList } from "react-icons/fa6";

const HomePage:React.FC= () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      navigate('/dashboard');  // Redirect to dashboard after successful login
    } catch (error) {
      console.error('Error during Google sign-in:', error?.message);
    }
  };


  return (
    <div className="bg-slate-200 h-screen flex items-center justify-center">
      <div className="text-center">
        {/* Title */}
        <div className='flex  justify-center'>

        <FaClipboardList  className='m-2 text-fuchsia-900' style={{width:50,height:50}}/>
        <h1 className="text-2xl mt-4 font-bold mb-4 text-fuchsia-900">TaskBuddy</h1>
        </div>

        <div>
          <p className='m-1 p-2 w-80'>Streamline your workflow and track progress effortlessly with our all-in-one task management app</p>
        </div>
        
        {/* Login Button */}
        <div className="flex w-full justify-center items-center">
  {/* Button Container */}
  <div className="w-72  text-center">
    <div className="flex justify-center items-center bg-slate-900 text-white p-3 rounded">
      <div className="text-2xl">
        <FcGoogle />
      </div>
      <button
        onClick={handleGoogleSignIn}
        className=" m-1 font-bold text-sm md:text-base"
      >
        Continue with Google
      </button>
    </div>
  </div>
</div>

      </div>
    </div>
      )
}

export default HomePage
