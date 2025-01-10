import React, { useState, useEffect } from 'react';
import { getAuth, User } from 'firebase/auth';
import AlertMessage from './messages/AlertMessage';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  return (
    <div className='text-red-500 m-1 font-sans flex justify-between items-center'>
      <AlertMessage/>
      <div>
        <h1 className='text-blue-700 text-2xl font-bold'>Task Buddy</h1>
      </div>
      <div className='flex m-1'>
        <div className='rounded-full'>
          <div>
            {user && user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'User'}
               width='50'
               height='50'
               className='rounded-full'
              />
            ) : (
              <span>No Image</span>
            )}
          </div>
        </div>
        <p className='text-center mt-3 text-ellipsis overflow-hidden whitespace-nowrap w-16 lg:w-40'>{user?.displayName || 'No Name'}</p>
      </div>
    
    </div>
  );
};

export default Header;
