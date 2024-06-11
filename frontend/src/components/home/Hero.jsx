import React from 'react'
import { Link } from 'react-router-dom'
const Hero = () => {
  return (
    <div className='h-auto flex flex-col lg:flex-row'>
      <div className='w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center p-4'>
        <h1 className='text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold text-yellow-100 text-center lg:text-left'>
          Discover Your Next Great Reads
        </h1>
        <p className='mt-4 text-white text-lg sm:text-xl font-semibold text-center lg:text-left'>
          Discover captivating stories, enriching knowledge, and endless <br className='hidden lg:block' /> inspiration in our curated collection of books.
        </p>
        <div className='w-full flex justify-center lg:hidden mt-4'>
          <img src='/2.png' alt='photo' className='max-w-full h-[300px] sm:h-[400px]' />
        </div>
        <div className="mt-8 flex justify-center lg:justify-start">
          <Link to='/books'>
          <button className='text-white font-extrabold text-xl sm:text-2xl bg-zinc-800 border border-yellow-100 px-8 py-2 hover:bg-yellow-800 rounded-full'>
            Discover Books
          </button>
          </Link>
        </div>
      </div>
      <div className='hidden lg:flex w-full lg:w-3/6 items-center justify-center h-auto lg:ml-[50px]'>
        <img src='/2.png' alt='photo' className='max-w-full h-[500px] lg:h-[600px]' />
      </div>
    </div>
  )
}

export default Hero
