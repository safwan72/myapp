import React from 'react'
import Banner from '../../Home/Header/Banner'
import ContactForm from './ContactForm'
import './contact.css'
import Navbar from '../../Home/Header/Navbar'
const Contact = () => {
    return (
        <div>
            <Navbar/>
                  <div className='headerbanner'>
            <Banner captionhead='Get In Touch' mainhead='Contact US' para='A Restaurant Taking Care of you as well as your Family. Stay Safe and healthy' buttontext='Explore Now'/>
        </div>
        <div className='py-5 contactbody'>

        <ContactForm/>
        </div>
        </div>    )
}

export default Contact
