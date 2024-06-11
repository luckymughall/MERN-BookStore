import React from 'react'
import Hero from '../components/home/Hero'
import Recentlyadded from '../components/home/Recentlyadded'

const Home = () => {
  return (
    <div className='px-10 py-2'>
      <Hero></Hero>
      <Recentlyadded></Recentlyadded>
    </div>
    
  )
}

export default Home