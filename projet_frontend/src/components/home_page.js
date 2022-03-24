import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';
import NavBar from './navbar/navbar';

function HomePage(){
    const [token, setToken] = useCookies([('mr-token')]);

    return(
        <>  
            <NavBar/>
            <div className='App'>
                <h1>BIENVENUE MSKN</h1>
            </div>
        </>
        
    )
}

export default HomePage;