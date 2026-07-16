import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className='text-center mt-25 flex flex-col gap-2'>
        <h1 className='text-4xl'>404</h1>
        <h2 className='uppercase'>Page Not Found</h2>
        <p className='text-slate-500'>The page you're looking for doesn't exist.</p>

        <Link to="/" className='text-blue-500'>Go Back Home</Link>
    </div>
  )
}

export default PageNotFound