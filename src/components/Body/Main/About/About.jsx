import React from 'react';
import Banner from '../../Home/Header/Banner'
import Navbar from '../../Home/Header/Navbar';

const About = () => {
    return (
        <div>
            <Navbar/>
                  <div className='headerbanner'>
            <Banner captionhead='Our Restaurant' mainhead='About US' para='A Restaurant Taking Care of you as well as your Family. Stay Safe and healthy.' buttontext='Explore Now'/>
        </div>
        </div>    )
}

export default About
