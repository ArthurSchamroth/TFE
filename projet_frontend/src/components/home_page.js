import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';
import Navbar from './navbar/navbar';

function HomePage(){
    const [token, setToken] = useCookies([('mr-token')]);

    return(
        <>
            <Navbar/>
            <div className='App'>
                <h1>BIENVENUE MSKN</h1>
            </div>
        </>
        
    )
}

export default HomePage;