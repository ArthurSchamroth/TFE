import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';
import './404_page_error.css';

function PageError404(){
    const [token, setToken] = useCookies([('mr-token')]);

    return(
        <>
            <div className='App'>
                <a id='error_message' href="/">Cette page est inconnue, cliquez ici pour être redirigé vers la page d'accueil.</a>
            </div>
        </>
    )
}

export default PageError404;