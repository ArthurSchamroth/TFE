import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';
import Map from "./Map/Map";
import Footer from './footer/footer';
import Navbar from './navbar/navbar';
import './home_page.css'

function HomePage(){
    const [token, setToken] = useCookies([('mr-token')]);

    if(token["mr-token"]){
        console.log("oui")
    }

    return(
        <>
            <Navbar/>
            <div className='App'>
                <div className="container">
                    <h1>BIENVENUE MSKN</h1>
                    <h1>DESCRIPTION</h1>
                    <h1>ICI C'EST LA CARTE</h1>
                </div>
            </div>
        </>
    )
}

export default HomePage;