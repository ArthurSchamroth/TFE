import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';
import Navbar from '../navbar/navbar';
import './home_page.css';
import {SiGmail} from 'react-icons/si';
import {AiFillPhone} from 'react-icons/ai';
import {BsTwitter} from 'react-icons/bs';
import {MdOutlineHomeWork} from 'react-icons/md';
import MapGH from '../Map/Map';
import Footer from '../footer/footer';

function HomePage(){
    const [token, setToken] = useCookies([('mr-token')]);

    return(
        <>
            <Navbar/>
            <div className='App'>
                <div className="container">
                    <h1>Présentation</h1>
                    <div className="presentationContainer">
                        <p className='text_presentation'>
                            Diplômé en Kinésithérapie en 1998 de l’école supérieure I.S.E.K. à Auderghem.<br/>
                            J'ai directement enchainé avec une formation de cinq ans pour devenir Ostéopathe au C.B.O (Collège Belge d'Ostéopathie) d'où j'obtiendrai mon diplôme en 2003.<br/>
                            Situé sur Bruxelles, je peux, pour certaines circonstances, me rendre à domicile pour une première entrevue avec les patients.
                        </p>
                        <div>
                            <img src="https://scontent.fbru2-1.fna.fbcdn.net/v/t39.30808-6/255918807_2862100080754684_5695316897273823915_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=bRd-CIvThfEAX9eTY_g&_nc_ht=scontent.fbru2-1.fna&oh=00_AT8x3nJFGzHfuyQ4q088YKY-VTmV8EqRzOA3s8hLm-hCLg&oe=624FA4CD"
                            className="photo_presentation" alt="photo_de_presentation"/>
                        </div>
                    </div>

                    <h1>Spécialisations</h1>
                    <div className="specialisationsContainer">

                        <div className="fiche_specialisation">
                            <div className='text_specialisation'>
                                <h2>Kinésithérapie</h2>
                                <p>Traitement des affections osseuses, articulaires, musculaires, par des mouvements imposés combinés à des massages.</p>
                            </div>
                        </div>

                        <div className="fiche_specialisation">
                            <div className='text_specialisation'>
                                <h2>Ostéopathie</h2>
                                <p>L'ostéopathie est une approche diagnostique et thérapeutique manuelle des dysfonctions de mobilité articulaire et tissulaire en général dans le cadre de leur participation à l'apparition des maladies.</p>
                            </div>
                        </div>

                        <div className="fiche_specialisation">
                            <div className='text_specialisation'>
                                <h2>Kinésithérapie respiratoire</h2>
                                <p>La kinésithérapie respiratoire est une technique principalement axée sur le développement, le maintien et le rétablissement de l'amplitude respiratoire maximale et des capacités fonctionnelles d'une personne. Dans un premier temps, le kinésithérapeute évalue l'amplitude respiratoire, puis établit un diagnostic.</p>
                            </div>
                        </div>

                        <div className="fiche_specialisation">
                            <div className='text_specialisation'>
                                <h2>Pédiatrie</h2>
                                <p>Etude du développement psycho-moteur et physiologique normal de l'enfant, ainsi que toute la pathologie qui y a trait (maladies infantiles), de la naissance à la période postpubertaire où il devient adulte.</p>
                            </div>
                        </div>
                        
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
                    <div className="mapContainer">
                        <MapGH/>
                    </div>
                </div>
                <Footer/>
            </div>
            
        </>
    )
}

export default HomePage;