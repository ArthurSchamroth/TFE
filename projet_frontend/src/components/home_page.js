import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';
import SimpleMap from './Map/Map';
import Footer from './footer/footer';
import './home_page.css'

function HomePage(){
    const [token, setToken] = useCookies([('mr-token')]);

    return(
        <>
            <div className='App'>
                <h1>BIENVENUE MSKN</h1>
            </div>
            <Footer/>
        </>
        
    )
}

export default HomePage;