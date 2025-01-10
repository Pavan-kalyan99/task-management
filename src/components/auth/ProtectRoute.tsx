import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

// Spinner component for loading state
const Spinner: React.FC = () => {
  return (
    <div className="text-4xl font-bold">
      <h1>Loading...</h1>
    </div>
  );
};

// ProtectRoute component to handle route protection
const ProtectRoute: React.FC = () => {
  const auth = getAuth(); // Firebase auth object
  const navigate = useNavigate();
  console.log('user:',auth)
  const [ok, setOk] = useState<boolean>(false); // State to track access permission

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log('no user ')
        setOk(false);
        navigate('/');
      } else {
        setOk(true);
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [auth, navigate]);

  return ok ? <Outlet /> : <Spinner />;
};

export default ProtectRoute;
