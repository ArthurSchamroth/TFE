import React, {useState} from 'react'
import{specilisationDropdown} from './navItems';
import{Link} from 'react-router-dom';
import './dropdown.css';

function Dropdown() {
    const[dropdown, setDropdown] = useState(false);

    return (
        <>
            <ul className={dropdown ? 
            "services-submenu clicked" :
            "services-submenu"} onClick={()=>setDropdown(!dropdown)}>
                {specilisationDropdown.map(item => {
                    return(
                        <li key={item.id}>
                            <Link onClick={()=>setDropdown(!dropdown)} to={item.path} className={item.cName}>{item.title}</Link>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default Dropdown;