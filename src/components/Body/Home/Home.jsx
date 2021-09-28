import React from 'react'
import Featured from './Featured/Featured'
import Banner from './Header/Banner'
import Navbar from './Header/Navbar'
import Section from './Section/Section'
const Home = () => {
    return (
        <div>
            <Navbar/>
                  <div className='headerbanner'>
            <Banner captionhead='Enjoy Your Delicious Meal' mainhead='Treat Yourself' para='A Restaurant Taking Care of you as well as your Family. Stay Safe and healthy' buttontext='Explore Now'/>
        </div>
        <Featured/>
        <Section/>
        </div>
    )
}

export default Home
