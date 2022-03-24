import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPersonWalking} from '@fortawesome/free-solid-svg-icons';
import {navItems} from './navItems';
import Button from "./button";
import Dropdown from './dropdown';
import './navbar.css';

function NavBar(){
    const [dropdown, setDropdown] = useState(true);

    return(
        <>
            <nav className="navbar">
                <Link to="/patients" className="navbar-logo">
                    Thomas 
                    <FontAwesomeIcon icon={faPersonWalking} />
                </Link>
                <ul className="nav-items">
                    {navItems.map(item => {
                        if(item.title === "Spécialisations"){
                            return(
                                <li key={item.id} className={item.cName}
                                onMouseEnter={()=>{setDropdown(true)}}
                                onMouseLeave={()=>{setDropdown(false)}}>
                                    <Link to={item.path}>{item.title}</Link>
                                    {dropdown && <Dropdown/>}
                                </li>)
                        }
                        return(
                        <li key={item.id} className={item.cName}>
                            <Link to={item.path}>{item.title}</Link>
                        </li>)
                    })}
                </ul>
                <Button/>
            </nav>
            
        </>
    );
}

export default NavBar;