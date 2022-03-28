import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';
import Navbar from '../navbar/navbar';
import './home_page.css';
import {SiGmail} from 'react-icons/si';
import {AiFillPhone} from 'react-icons/ai';
import {BsTwitter} from 'react-icons/bs';
import MapContainer from '../Map/Map';

function HomePage(){
    const [token, setToken] = useCookies([('mr-token')]);

    return(
        <>
            <Navbar/>
            <div className='App'>
                <div className="container">
                    <div className="presentationContainer">
                        <h1>Présentation</h1>
                    </div>


                    <div className="specialisationsContainer">
                        <h1>Spécialisations</h1>
                    </div>


                    <div className="methodeContainer">
                        <h1>Façon de travailler</h1>
                    </div>


                    <div className="contactContainer">
                        <h1>CONTACTS</h1>
                        <div className="tableau_contact">
                            <div className='contacts'>
                                <h2>Contacts</h2> 
                                <address>
                                    <SiGmail/> Email : <a href="mailto:schamrotharthur@gmail.com">schamrotharthur@gmail.com</a><br/>
                                    <AiFillPhone/> Téléphone : <a href="tel:+32477834954">0477834954</a><br/>
                                    <BsTwitter/> Twitter : <a href="https://twitter.com/ArthurSchamroth">Arthur Schamroth</a><br/>
                                </address>
                            </div>
                            <div className="email_section">
                                <h2>Email</h2>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage;