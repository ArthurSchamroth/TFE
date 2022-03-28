import React, {useState} from "react";
import {FaWalking} from 'react-icons/fa';
import {GiHamburgerMenu} from 'react-icons/gi';
import {GrClose} from 'react-icons/gr';
import './navbar.css';
import {useCookies} from 'react-cookie';

function Navbar(){
    const [menu_mobile, setmenu_mobile] = useState(false)
    const [token, setToken] = useCookies([('mr-token')]);
    return(
        <>
        <nav>
            <ul className="links_container">
                <a href="#" className="hamburger_menu"><GiHamburgerMenu/></a>
                <a href="/login"><li className="links_logo">Thomas <FaWalking/></li></a>
                <a href="/login"><li className="links">A propos</li></a>
                <a href="/login"><li className="links">Spécialisations</li></a>
                <a href="/login"><li className="links">A propos</li></a>
                {token['mr-token'] ? 
                <a href="/login"><li className="links_login">Profil de </li></a> :
                <a href="/login"><li className="links_login">Connexion</li></a>
                }
                
            </ul>
        </nav>
        <nav>
            <ul className="links_container_mobile">
                {menu_mobile ? 
                <>
                <a href="/login"><li className="links_logo">Thomas <FaWalking/></li></a>
                <a href="/login"><li className="links">A propos</li></a>
                <a href="/login"><li className="links">Spécialisations</li></a>
                <a href="/login"><li className="links">A propos</li></a>
                <a href="/login"><li className="links_login">Connexion</li></a>
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