import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ logout, token }) => {
    return (
        <header>
            <nav className='navLinks'>
                <h3 className='navLinks3'>FitnessTracker</h3>

                {
                    token ? (
                        <>
                            <Link to='/home' className='navLinks2'>Home</Link>
                            <Link to='/cart' className='navLinks2'>Cart</Link>
                            <Link to='/login' className='navLinks2'>Login</Link>
                            <Link to='/products' className='navLinks2'>Products</Link>
                            <Link to='/register' className='navLinks2'>Register</Link>
                            <Link to='/createAudioBooks' className='navLinks2'>CreateAudioBooks</Link>
                            <Link to='/createProducts' className='navLinks2'>CreateProducts</Link>
                            <Link to='/editAudioBook' className='navLinks2'>EditAudioBook</Link>
                            <Link to='/editProduct' className='navLinks2'>EditProduct</Link>
                         </>
                    ) : 
                 
                    
                
            </nav>
        </header>
    )
}