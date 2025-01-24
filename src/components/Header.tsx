import React, { useState, useEffect } from 'react';
import { getAuth, User } from 'firebase/auth';
import AlertMessage from './messages/AlertMessage';
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [user, setUser] = useState<User | null>(null);
  const [theme,setTheme]=useState('light');

// selecting theme
  // Apply the theme class to the root element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const toggleTheme = () => {
    // console.log('t:',theme);
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  return (
    <div className='text-red-500 bg-slate-300 dark:text-slate-100 dark:bg-slate-700 m-1 font-sans flex justify-between items-center'>
      <AlertMessage/>
      <div>
        <h1 className='light:text-blue-700 text-2xl font-bold p-1'>Task Buddy</h1>
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
        <div className="text-center">
      <button
        className="p-2 bg-gray-200 dark:bg-slate-200 dark:text-slate-700 rounded-md" title={`${theme} Mode`}
        onClick={toggleTheme}
      >{theme=='light'?         <MdOutlineLightMode />
        :<MdDarkMode />
}

      </button>
    </div>
      </div>
    
    </div>
  );
};

export default Header;
