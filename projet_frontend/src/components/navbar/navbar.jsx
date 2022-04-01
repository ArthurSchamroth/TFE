import React, {useState, useEffect} from "react";
import {FaWalking} from 'react-icons/fa';
import {GiHamburgerMenu} from 'react-icons/gi';
import {GrClose} from 'react-icons/gr';
import {CgProfile} from 'react-icons/cg';
import './navbar.css';
import {useCookies} from 'react-cookie';
import { API } from "../../api-service";

function Navbar(){
    const [menu_mobile, setmenu_mobile] = useState(false)
    const [token, setToken] = useCookies([('mr-token')]);
    const [pseudo, setPseudo] = useState('')

    useEffect(()=>{
        API.gettingDataFromToken({'token': token['mr-token']})
        .then(function(resp){
            return resp.json()
        }).then(function(resp){
            const a = (resp["prenom"] + " " + resp["nom"])
            setPseudo(a)
        })
    }, []);

    return(
        <>
        <nav>
            <ul className="links_container">
                <a href="#" className="hamburger_menu"><GiHamburgerMenu/></a>
                <a href="/"><li className="links_logo">Thomas Penning<FaWalking/></li></a>
                <a href="/"><li className="links">A propos</li></a>
                <a href="/"><li className="links">Spécialisations</li></a>
                <a href="/"><li className="links">A propos</li></a>
                {token['mr-token'] ? 
                <a href="/espace_prive" className="profile_button"><CgProfile/>        {pseudo}</a> : 
                <a href="/login"><li className="links_login">Connexion</li></a>
                }
                
            </ul>
        </nav>
        <nav>
            <ul className="links_container_mobile">
                {menu_mobile ? 
                <>
                <a href="/"><li className="links_logo">Thomas <FaWalking/></li></a>
                <a href="/"><li className="links">A propos</li></a>
                <a href="/"><li className="links">Spécialisations</li></a>
                <a href="/"><li className="links">A propos</li></a>
                {token['mr-token'] ? 
                <a href="/espace_prive" className="profile_button"><CgProfile/>        {pseudo}</a> : 
                <a href="/login"><li className="links_login">Connexion</li></a>
                }
                <GrClose onClick={()=>setmenu_mobile(!menu_mobile)} className="hamburger_menu"/>
                </> : 
                <>
                    <a href="/login"><li className="links_logo">Thomas <FaWalking/></li></a>
                    <GiHamburgerMenu onClick={()=>setmenu_mobile(!menu_mobile)} className="hamburger_menu"/>
                </>}
            </ul>
        </nav>
    </>
    )
}

    

export default Navbar;