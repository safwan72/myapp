import React from 'react'
import Navbar from '../../Home/Header/Navbar';
import './cart.css';
import MyCart from './MyCart';
const Cart = () => {
    return (
        <>
        <Navbar/>
        <div className='cartheader'>
                <div style={{paddingTop:'100px',paddingBottom:'100px',}}>

            <div className='container my-5 py-5'> 
        <h1 className='text-center mt-5'> Cart </h1>
            </div>
            </div>
        </div>
        <MyCart/>
        </>
    )
}

export default Cart
