import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';
import './404_page_error.css';

function PageError404(){
    const [token, setToken] = useCookies([('mr-token')]);

    return(
        <>
            <div className='App'>
                <img width='50%' height='50%' src="https://img-19.commentcamarche.net/HFhPLdd3Hhn7wWa_oUWyCTEhRgI=/1500x/smart/efc07c4f29b94e688dedeabd4e61a6b9/ccmcms-commentcamarche/25209205.jpg" alt="erreur_404" />
                <a id='error_message' href="/">Cette page est inconnue, cliquez ici pour être redirigé vers la page d'accueil.</a>
            </div>
        </>
    )
}

export default PageError404;