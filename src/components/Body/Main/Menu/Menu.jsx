import React from 'react'
import Banner from '../../Home/Header/Banner'
import Navbar from '../../Home/Header/Navbar';
import ListMenu from './ListMenu'
import './menu.css';
const Menu = () => {
    return (
        <div>
            <Navbar/>
                  <div className='headerbanner'>
            <Banner captionhead='Get In Touch' mainhead='Our Main Menu' para='We Care for Your Appettite and Produce the best for you.' buttontext='Explore Now'/>
        </div>
        <div>
            <ListMenu/>
        </div>
        </div>    )
}

export default Menu
