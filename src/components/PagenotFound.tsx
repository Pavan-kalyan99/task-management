import React from 'react'
import { Link } from 'react-router-dom';

const PagenotFound:React.FC = () => {
  return (
    <div className='text-3xl'>
      <h1>page Not Found</h1>
      <Link to='/'>Back to Home</Link>
    </div>
  )
}

export default PagenotFound
