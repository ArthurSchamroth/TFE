import React from "react";
import './footer.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHouse, faPhone, faLocationDot, faHeartPulse} from '@fortawesome/free-solid-svg-icons';
import {SiGmail} from 'react-icons/si';
import {AiFillPhone} from 'react-icons/ai';
import {BsTwitter} from 'react-icons/bs';

const Footer = () => (
    <div className="footer">
        <div className="partie_footer">
            <h2>Horaires Cabinet <FontAwesomeIcon icon={faHouse}/></h2>
            <p>Lundi 8h00-12h00 / 13h00-19h</p>
            <p>Mardi 8h00-12h00 / 13h00-19h</p>
            <p>Mercredi 8h00-12h00 / 13h00-18h</p>
            <p>Jeudi 8h00-12h00 / 13h00-19h</p>
            <p>Vendredi 8h00-12h00 / 13h00-18h</p>
        </div>
        <div className="partie_footer">
            <h2>Contacts <FontAwesomeIcon icon={faPhone}/></h2>
            <address>
                <p className="item_footer"><AiFillPhone/> Téléphone : 02 345 72 90</p>
                <p className="item_footer"><FontAwesomeIcon icon={faHeartPulse}/> Doctor Anytime : <a href="https://www.doctoranytime.be/d/osteopathe/thomas-penning">Thomas Penning</a></p>
                <p className='redirection_maps_button' onClick={()=>{
                        window.open('https://www.google.com/maps/@50.8126873,4.3500851,3a,87.9y,208h,89.69t/data=!3m6!1e1!3m4!1s6FUIHSqoe2ybxK5l9Ol4ug!2e0!7i16384!8i8192')
                    }}><FontAwesomeIcon icon={faLocationDot}/> Adresse : Avenue Winston Churchill, 37/15, Uccle, Région de Bruxelles</p>
            </address>
        </div>
    </div>
);

export default Footer;