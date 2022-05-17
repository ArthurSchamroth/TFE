import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';
import Navbar from '../navbar/navbar';
import './home_page.css';
import CookieConsent from "react-cookie-consent";
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
                            Situé sur Bruxelles, je peux, pour certaines circonstances, me rendre à domicile pour une première entrevue avec les patients.<br/>
                            Si vous désirez prendre rendez-vous avec moi, ce site vous permet de vous inscrire et d'avoir un suivi complet avec moi.
                        </p>
                        <div>
                            <img src="/photo_presentation.png" className="photo_presentation" alt="photo_de_presentation"/>
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
                    <div className="mapContainer">
                        <MapGH/>
                    </div>
                </div>
                <CookieConsent debug={true} buttonStyle={{backgroundColor: "#005eb6", color: "white", borderRadius:"10px", marginRight: "15px"}} buttonText="J'accepte">
                    Ce site utilise des cookies afin d'enregistrer votre connexion et que vous n'ayez plus à vous connecter manuellement la prochaine fois.
                </CookieConsent>
                <Footer/>
            </div>
            
        </>
    )
}

export default HomePage;